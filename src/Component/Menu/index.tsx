import React from "react";
import { render } from "react-dom";
import { Visualizer, EditMode } from "../../Visualizer";
import { NewLine } from "./NewLine";
import { NewNode } from "./NewNode";
import { Tools } from "./Tools";
import { Options } from "./Options";

export class Menu {
  private elementId: string;
  public visualizer: Visualizer;

  constructor(elementId: string, visualizer: Visualizer) {
    this.elementId = elementId;
    this.visualizer = visualizer;
  }

  render() {
    render((
    <div className="menu">
      <div className="header">
        <div className="startButton"><button type="button" onClick={ () => this.visualizer.startAlgo() }>Start Dijkstra</button><div id="algo-result"></div><br /></div>
        <Tools visualizer={ this.visualizer } />
        <Options visualizer={ this.visualizer } />
      </div>
      <div>
        { this.visualizer.clickedComponent == null && this.visualizer.editMode == EditMode.DRAG && <NewNode visualizer={ this.visualizer } /> }
        { this.visualizer.editMode == EditMode.CONNECT && <NewLine visualizer={ this.visualizer } /> }
      </div>
    </div>), document.querySelector(this.elementId));
  }
}