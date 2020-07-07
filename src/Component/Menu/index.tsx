import React from "react";
import { render } from "react-dom";
import { Visualizer } from "../../Visualizer";
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
    <>
      <Options visualizer={ this.visualizer } />
      <NewNode visualizer={ this.visualizer } />
      <NewLine visualizer={ this.visualizer } />
      <Tools visualizer={ this.visualizer } />
    </>), document.querySelector(this.elementId));
  }
}