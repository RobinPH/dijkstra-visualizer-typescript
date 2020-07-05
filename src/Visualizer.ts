import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Component } from "./Component/Component";
import { Line } from "./Component/Line";
import { ComponentHandler } from "./Handler/ComponentHandler";

enum EditMode {
  DRAG,
  CONNECT,
}

export class Visualizer {
  private nodes: Node[];
  private lines: Line[];
  private canvas: Canvas;
  private _highlightedComponent: Component | null = null;
  private _clickedComponent: Component | null = null;
  private _mouseDown: Boolean = false;
  private editMode: EditMode = EditMode.DRAG;

  constructor(canvas: HTMLCanvasElement) {
    this.nodes = new Array();
    this.lines = new Array();
    this.canvas = new Canvas(canvas);
    this.draw();

    new ComponentHandler(this);
  }

  addNode(node: Node) {
    this.nodes.push(node);
    this.draw();
  }

  addConnect(origin: Node, destination: Node, weight: number) {
    origin.addChildren(destination, weight);
    this.lines.push(new Line(origin, destination, weight));
  }

  async draw() {
    this.canvas.draw([...this.lines, ...this.nodes]);
    if (this.clickedComponent != null) {
      const { x, y } = this.clickedComponent.getPosition();
      const paragraph = document.querySelector("#clicked-component") as HTMLParagraphElement;
      paragraph.innerText = '';
      paragraph.innerText += `${ this.clickedComponent.getName() } `;
      paragraph.innerText += ` x: ${ x } y: ${ y }`;
      if (this.clickedComponent instanceof Node) {
        paragraph.innerText += ` Children: `;
        this.clickedComponent.getChildrens().forEach((value, key) => {
          paragraph.innerText += ` ${ key.getName() } `;
        })
      }
    }
  }

  get highlightedComponent() {
    return this._highlightedComponent;
  }

  set highlightedComponent(component: Component | null) {
    this._highlightedComponent = component;
  }

  get clickedComponent() {
    return this._clickedComponent;
  }

  set clickedComponent(component: Component | null) {
    this._clickedComponent = component;
  }

  get mouseDown() {
    return this._mouseDown;
  }

  set mouseDown(b: Boolean) {
    this._mouseDown = b;
  }

  get components() {
    return [...this.lines, ...this.nodes];
  }
}