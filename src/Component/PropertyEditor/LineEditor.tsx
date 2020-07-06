import React from "react";
import { Line } from "../Line";
import { Visualizer } from "../../Visualizer";

type LineEditorProps = {
  line: Line;
  visualizer: Visualizer;
}

type LineEditorState = {
  line: Line;
}

export class LineEditor extends React.Component<LineEditorProps, LineEditorState> {
  constructor(props: LineEditorProps) {
    super(props);

    this.state = {
      line: this.props.line,
    }

    this.weightChange = this.weightChange.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
  }

  weightChange(event: React.FormEvent<HTMLInputElement>) {
    const newWeight = parseInt(event.currentTarget.value);

    if (isNaN(newWeight)) return;
    
    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.line, (line) => {
        line.weight = newWeight;
      });
      return {}
    });
  }

  removeConnection() {
    if (this.state.line) {
      const { origin, destination } = this.state.line.nodes;
      this.props.visualizer.removeConnection(origin, destination); 
    }
  }

  static getDerivedStateFromProps(nextProps: LineEditorProps, prevState: LineEditorState) {
    return nextProps.line !== prevState.line ? {
      line: nextProps.line,
    } : null;
  }

  render() {
    const line = this.state.line;
    const { weight } = line;
    return (
      <form id="line-editor">
        <label>Weight</label>
        <input type="text" onChange={ this.weightChange } id="line-weight" name="line" value={ weight }></input><br />
        <button type="button" onClick={ this.removeConnection }>Remove Connection</button>
      </form>
    )
  }
}