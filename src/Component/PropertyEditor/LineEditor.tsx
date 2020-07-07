import React from "react";
import { Line } from "../Line";
import { Visualizer, AlgoOption } from "../../Visualizer";

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
    this.directionChange = this.directionChange.bind(this);
  }

  weightChange(event: React.FormEvent<HTMLInputElement>) {
    const newWeight = parseInt(event.currentTarget.value);

    if (isNaN(newWeight)) return;
    
    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.line, (line) => {
        const { origin, destination } = line.nodes;
        line.weight = newWeight;

        for (const node of this.props.visualizer.nodes) {
          if (node == origin) {
            if (node.hasConnectionTo(destination)) node.childrens.get(destination)!.weight = newWeight;
            return;
          }
        }
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

  directionChange(event: React.FormEvent) {
    const value = (event.currentTarget.querySelector("input:checked") as HTMLInputElement).value;
    let direction: AlgoOption;
    switch (value) {
      case "directional":
        direction = AlgoOption.DIRECTIONAL;
        break;
      case "bidirectional":
        direction = AlgoOption.BIDIRECTIONAL;
        break;
      default:
        direction = AlgoOption.BIDIRECTIONAL;
    }

    this.setState(() => {
      this.props.visualizer.updateComponent(this.state.line, (line) => {
        line.direction = direction;
      });
      return {}
    });
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
      <div className="lineEditor">
        <div className="container-name">Line Edit</div>
        <form>
          { this.props.visualizer.weighted ? (
            <> 
              <label>Weight</label>
              <input type="text" onChange={ this.weightChange } id="line-weight" name="line" value={ weight }></input><br />
            </>
          ) : (
            <>
              <i>Turn On <b>Custom Weights</b> to edit its weight.<br /></i>
            </>
          ) }
          <br />
        </form>
        <form onChange={ this.directionChange }>
          <input type="radio" id="bidrectional" name="direction" value="bidirectional" defaultChecked />
          <label >Bidirectional</label><br />
          <input type="radio" id="directional" name="direction" value="directional" />
          <label >Directional</label><br />
        </form><br />
        <button type="button" onClick={ this.removeConnection }>Remove Connection</button>
      </div>
    )
  }
}