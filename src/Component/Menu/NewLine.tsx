import React from "react";
import { Visualizer, AlgoOption } from "../../Visualizer";

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
    this.directionChange = this.directionChange.bind(this);
  }

  weightChange(event: React.FormEvent<HTMLInputElement>) {
    const newWeight = parseInt(event.currentTarget.value);

    if (isNaN(newWeight)) return;

    this.setState({ weight: newWeight });
    this.props.visualizer.currentLineWeight = newWeight;
  }

  directionChange(event: React.FormEvent) {
    const value = (event.currentTarget.querySelector("input:checked") as HTMLInputElement).value;
    let direction: AlgoOption;
    switch (value) {
      case "directional":
        this.props.visualizer.algorithmOption = AlgoOption.DIRECTIONAL;
        break;
      case "bidirectional":
        this.props.visualizer.algorithmOption = AlgoOption.BIDIRECTIONAL;
        break;
      default:
        this.props.visualizer.algorithmOption = AlgoOption.DIRECTIONAL;
    }
  }

  render() {
    const { weight } = this.state;
    
    return (
      <div className="newLine">
        <div className="container-name">New Line</div>
        <form>
          { this.props.visualizer.weighted ? (
            <> 
              <label>Weight</label>
              <input type="text" onChange={ this.weightChange } id="line-weight" name="line" value={ weight }  autoComplete="off"></input><br />
            </>
          ) : (
            <>
              <i>Turn On <b>Custom Weights</b> to add weight.<br /></i>
            </>
          ) }
        </form>
        <br />
        <form onChange={ this.directionChange }>
            <input type="radio" id="bidrectional" name="direction" value="bidirectional" />
            <label >Bidirectional</label><br />
            <input type="radio" id="directional" name="direction" value="directional" defaultChecked />
            <label >Directional</label><br />
          </form>
      </div>
    )
  }
}