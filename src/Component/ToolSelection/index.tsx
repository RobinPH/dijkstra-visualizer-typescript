import React from "react";
import { render } from "react-dom";
import { Visualizer, EditMode } from "../../Visualizer";

export class ToolSelection {
  private elementId: string;
  public visualizer: Visualizer;

  constructor(elementId: string, visualizer: Visualizer) {
    this.elementId = elementId;
    this.visualizer = visualizer;
  }

  render() {
    render((
    <>
      <Tool visualizer={ this.visualizer } />
    </>), document.querySelector(this.elementId));
  }
}

type ToolProps = {
  visualizer: Visualizer;
}

class Tool extends React.Component<ToolProps> {
  constructor(props: ToolProps) {
    super(props);

    this.toolSelectionChange = this.toolSelectionChange.bind(this);
  }

  toolSelectionChange(event: React.FormEvent) {
    const value = (event.currentTarget.querySelector("input:checked") as HTMLInputElement).value;
    switch (value) {
      case "drag":
        this.props.visualizer.editMode = EditMode.DRAG;
        break;
      case "connect":
        this.props.visualizer.editMode = EditMode.CONNECT;
        break;
      case "delete":
        this.props.visualizer.editMode = EditMode.DELETE;
        break;
      default:
        this.props.visualizer.editMode = EditMode.DRAG;
    }
  }

  render() {
    return (
      <form onChange={ this.toolSelectionChange }>
        <input type="radio" id="drag" name="edit-mode" value="drag" defaultChecked />
        <label >Drag</label><br />
        <input type="radio" id="connect" name="edit-mode" value="connect" />
        <label >Connect</label><br />
        <input type="radio" id="connect" name="edit-mode" value="delete" />
        <label >Delete</label><br />
      </form>
    )
  }
}
