import React from "react";
import { Visualizer } from "../../Visualizer";

type NewLineProps = {
  visualizer: Visualizer;
}

type NewLineState = {
  weight: number
}

export class NewLine extends React.Component<NewLineProps, NewLineState> {
  constructor(props: NewLineProps) {
    super(props);

    this.state = {
      weight: 1,
    }

    this.weightChange = this.weightChange.bind(this);
  }

  weightChange(event: React.FormEvent<HTMLInputElement>) {
    const newWeight = parseInt(event.currentTarget.value);

    if (isNaN(newWeight)) return;

    this.setState({ weight: newWeight });
    this.props.visualizer.currentLineWeight = newWeight;
  }

  render() {
    const { weight } = this.state;
    
    return (
      <form>
        <label>Line Weight</label>
        <input type="text" name="name" value={ weight } onChange={ this.weightChange }></input><br />
      </form>
    )
  }
}