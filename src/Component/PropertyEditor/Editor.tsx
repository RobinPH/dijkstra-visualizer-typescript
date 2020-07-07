import React from "react";
import { render } from "react-dom";
import { Visualizer, EditMode } from "../../Visualizer";
import { Component } from "../Component";
import { Node } from "../Node";
import { NodeEditor } from "./NodeEditor";
import { LineEditor } from "./LineEditor";
import { Line } from "../Line";

export class PropertyEditor {
  private editorId: string;
  public visualizer: Visualizer;

  constructor(editorId: string, visualizer: Visualizer) {
    this.editorId = editorId;
    this.visualizer = visualizer;
  }
  
  render(component?: Component) {
    render(component != null ? (
      <>
        { this.visualizer.editMode != EditMode.DELETE && (
          <>
            { component instanceof Node && (<NodeEditor node={ component } visualizer={ this.visualizer } />) }
            { component instanceof Line && (<LineEditor line={ component } visualizer={ this.visualizer } />) }
          </>
        ) }
      </>
    ) : (<></>), document.querySelector(this.editorId));
  }
}