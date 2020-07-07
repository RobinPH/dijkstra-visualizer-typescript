import React from "react";
import { render } from "react-dom";
import { Visualizer } from "../../Visualizer";

type NewNodeProps = {
  visualizer: Visualizer;
}

type NewNodeState = {
  x: number;
  y: number;
  radius: number;
  name: string;
}

export class NewNode extends React.Component<NewNodeProps, NewNodeState> {
  constructor(props: NewNodeProps) {
    super(props);

    this.state = {
      x: 250,
      y: 250,
      radius: 15,
      name: this.props.visualizer.newNodeName(),
    }

    this.newNode = this.newNode.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.radiusChange = this.radiusChange.bind(this);
    this.xPositionChange = this.xPositionChange.bind(this);
    this.yPositionChange = this.yPositionChange.bind(this);
  }

  newNode(event: React.FormEvent) {
    event.preventDefault();

    const { x, y, radius, name } = this.state;

    this.props.visualizer.addNode(x, y, radius, name);

    this.setState({
      name: this.props.visualizer.newNodeName(),
    })
  }

  nameChange(event: React.FormEvent<HTMLInputElement>) {
    const newName = event.currentTarget.value;

    this.setState({ name: newName });
  }

  radiusChange(event: React.FormEvent<HTMLInputElement>) {
    const newRadius = parseInt(event.currentTarget.value);

    if (isNaN(newRadius)) return;

    this.setState({ radius: newRadius });
  }

  xPositionChange(event: React.FormEvent<HTMLInputElement>) {
    const newX = parseInt(event.currentTarget.value);

    if (isNaN(newX)) return;

    this.setState({ x: newX });
  }

  yPositionChange(event: React.FormEvent<HTMLInputElement>) {
    const newY = parseInt(event.currentTarget.value);

    if (isNaN(newY)) return;
    
    this.setState({ y: newY });
  }

  static getDerivedStateFromProps(nextProps: NewNodeProps, prevState: NewNodeState) {
    return {
      name: nextProps.visualizer.newNodeName(),
    }
  }

  render() {
    const { x, y, radius, name } = this.state;
    
    return (
      <div className="newNode">
        <div className="container-name">New Node</div>
        <form onSubmit={ this.newNode }>
          <label>Name</label>
          <input type="text" name="name" value={ name } onChange={ this.nameChange } autoComplete="off"></input><br />
          <label>X</label>
          <input type="text" name="x" value={ x } onChange={ this.xPositionChange } autoComplete="off"></input>
          <label>Y</label>
          <input type="text" name="y" value={ y } onChange={ this.yPositionChange } autoComplete="off"></input><br />
          <label>Radius</label>
          <input type="text" name="radius" value={ radius } onChange={ this.radiusChange } autoComplete="off"></input><br />
          <br />
          <button type="submit">New Node</button>
        </form>
      </div>
    )
  }
}