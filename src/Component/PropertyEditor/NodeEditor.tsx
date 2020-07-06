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

  static getDerivedStateFromProps(nextProps: NodeEditorProps, prevState: NodeEditorState) {
    return nextProps.node !== prevState.node ? {
      node: nextProps.node,
    } : null;
  }

  render() {
    const { name, radius, position: { x, y } } = this.state.node;
    return (
      <form id="node-editor">
          <label>Name</label>
          <input type="text" onChange={ this.nameChange } id="node-name" name="name" value={ name }></input><br />
          <label>Radius</label>
          <input type="text" onChange={ this.radiusChange } id="node-radius" name="radius" value={ radius }></input><br />
          <label>x</label>
          <input type="text" onChange={ this.xPositionChange } id="node-position-x" name="position-x" value={ x }></input>
          <label>y</label>
          <input type="text" onChange={ this.yPositionChange } id="node-position-y" name="position-y" value={ y }></input><br />
          <button type="button" onClick={ this.deleteNode }>Delete Node</button>
      </form>
    )
  }
}