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

    this.optionsChange = this.optionsChange.bind(this);
  }

  optionsChange(event: React.FormEvent) {
    const value = (event.currentTarget.querySelector("input:checked") as HTMLInputElement).value;
    switch (value) {
      case "directional":
        this.props.visualizer.algorithmOption = AlgoOption.DIRECTIONAL;
        break;
      case "bidirectional":
        this.props.visualizer.algorithmOption = AlgoOption.BIDIRECTIONAL;
        break;
      default:
        this.props.visualizer.algorithmOption = AlgoOption.BIDIRECTIONAL;
    }
  }

  render() {
    return (
      <>
        { this.props.visualizer.editMode == EditMode.CONNECT && (
          <form onChange={ this.optionsChange }>
            <input type="radio" id="bidrectional" name="direction" value="bidirectional" defaultChecked />
            <label >Bidirectional</label><br />
            <input type="radio" id="directional" name="direction" value="directional" />
            <label >Directional</label><br />
          </form>
        ) }
        <button type="button" onClick={ () => this.props.visualizer.startAlgo() }>Start Dijkstra</button><div id="algo-result"></div><br />
      </>
    )
  }
}