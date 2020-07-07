import React from "react";
import { EditMode, Visualizer } from "../../Visualizer";

type ToolsProps = {
  visualizer: Visualizer;
}

export class Tools extends React.Component<ToolsProps> {
  constructor(props: ToolsProps) {
    super(props);

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    (document.querySelectorAll(".tools button") as NodeListOf<HTMLButtonElement>).forEach((button) => {
      button.classList.add("disabled");
    })
    switch (event.currentTarget.innerText) {
      case "Drag":
        this.props.visualizer.editMode = EditMode.DRAG;
        break;
      case "Connect":
        this.props.visualizer.editMode = EditMode.CONNECT;
        break;
      case "Delete":
        this.props.visualizer.editMode = EditMode.DELETE;
        break;
      default:
        this.props.visualizer.editMode = EditMode.DRAG;
    }

    event.currentTarget.classList.remove("disabled");
  }

  render() {
    return (
      <div className="tools">
        <button type="button" onClick={ this.buttonClick }>Drag</button>
        <button type="button" onClick={ this.buttonClick } className="disabled">Connect</button>
        <button type="button" onClick={ this.buttonClick } className="disabled">Delete</button>
      </div>
    )
  }
}