import React from "react";
import { Visualizer, AlgoOption, EditMode } from "../../Visualizer";

type OptionsProps = {
  visualizer: Visualizer;
}

type OptionsState = {
  weight: number
}

export class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps) {
    super(props);

    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const valueDiv = document.querySelector(".weighted .value") as HTMLDivElement;
    if (event.currentTarget.checked) {
      this.props.visualizer.weighted = true;
    } else {
      this.props.visualizer.weighted = false;
    }
  }

  render() {
    return (
      <div className="weighted">
        <div className="container-name">Options</div>
        <label>
          <input type="checkbox" onChange={ this.inputChange } defaultChecked />
          <span />
        </label>
        <div className="value">Custom Weights</div>
      </div>
    )
  }
}