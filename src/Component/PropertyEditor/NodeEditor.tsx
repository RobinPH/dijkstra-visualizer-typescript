import React from "react";
import { Node } from "../Node";
import { Visualizer } from "../../Visualizer";

type NodeEditorProps = {
  node: Node;
  visualizer: Visualizer;
}

type NodeEditorState = {
  node: Node;
}

export class NodeEditor extends React.Component<NodeEditorProps, NodeEditorState> {
  constructor(props: NodeEditorProps) {
    super(props);

    this.state = {
      node: this.props.node,
    }

    this.nameChange = this.nameChange.bind(this);
    this.radiusChange = this.radiusChange.bind(this);
    this.xPositionChange = this.xPositionChange.bind(this);
    this.yPositionChange = this.yPositionChange.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.startEndChange = this.startEndChange.bind(this);
  }

  nameChange(event: React.FormEvent<HTMLInputElement>) {
    const newName = event.currentTarget.value;

    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.node, (node) => {
        node.name = newName;
      });
      return {}
    });
  }

  radiusChange(event: React.FormEvent<HTMLInputElement>) {
    const newRadius = parseInt(event.currentTarget.value);

    if (isNaN(newRadius)) return;

    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.node, (node) => {
        node.radius = newRadius;
      });
      return {}
    });
  }

  xPositionChange(event: React.FormEvent<HTMLInputElement>) {
    const newX = parseInt(event.currentTarget.value);

    if (isNaN(newX)) return;

    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.node, (node) => {
        node.position = {
          x: newX,
          y: node.position.y,
        }
      });
      return {}
    });
  }

  yPositionChange(event: React.FormEvent<HTMLInputElement>) {
    const newY = parseInt(event.currentTarget.value);

    if (isNaN(newY)) return;
    
    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.node, (node) => {
        node.position = {
          x: node.position.x,
          y: newY,
        }
      });
      return {}
    });
  }

  deleteNode() {
    if (this.state.node) {
      this.props.visualizer.removeNode(this.state.node);
    }
  }

  startEndChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    (document.querySelectorAll(".start-end-container button") as NodeListOf<HTMLButtonElement>).forEach((button) => {
      button.classList.add("disabled");
    });
    switch (event.currentTarget.innerText) {
      case "Start":
        this.props.visualizer.changeAlgoInput("start", this.state.node);
        break;
      case "End":
        this.props.visualizer.changeAlgoInput("end", this.state.node);
        break;
      default:
        break;
    }

    event.currentTarget.classList.remove("disabled");
  }

  static getDerivedStateFromProps(nextProps: NodeEditorProps, prevState: NodeEditorState) {
    const buttons = document.querySelectorAll(".start-end-container button") as NodeListOf<HTMLButtonElement>;
    const algoInput = nextProps.visualizer.algorithmInput;
    buttons.forEach((button) => {
      const classes = button.classList;
      if (button.innerText == "Start") {
        if (algoInput.get("start") != prevState.node) {
          classes.add("disabled");
        } else {
          classes.remove("disabled");
        }
      } else if (button.innerText == "End") {
        if (algoInput.get("end") != prevState.node) {
          classes.add("disabled");
        } else {
          classes.remove("disabled");
        }
      }
    })
    return nextProps.node !== prevState.node ? {
      node: nextProps.node,
    } : null;
  }

  render() {
    const { name, radius, position: { x, y } } = this.state.node;
    return (
      <div className="nodeEditor">
        <div className="container-name">Node Edit</div>
        <form>
          <label>Name</label>
          <input type="text" onChange={ this.nameChange } id="node-name" name="name" value={ name } autoComplete="off"></input><br />
          <label>X</label>
          <input type="text" onChange={ this.xPositionChange } id="node-position-x" name="position-x" value={ x } autoComplete="off"></input>
          <label>Y</label>
          <input type="text" onChange={ this.yPositionChange } id="node-position-y" name="position-y" value={ y } autoComplete="off"></input><br />
          <label>Radius</label>
          <input type="text" onChange={ this.radiusChange } id="node-radius" name="radius" value={ radius } autoComplete="off"></input><br />
          <br />
          <div className="start-end-container">
            <button type="button" onClick={ this.startEndChange } className="disabled">Start</button>
            <button type="button" onClick={ this.startEndChange } className="disabled">End</button>
          </div>
          <button type="button" onClick={ this.deleteNode }>Delete Node</button>
        </form>
      </div>
    )
  }
}