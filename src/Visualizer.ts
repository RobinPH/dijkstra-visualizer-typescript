import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Component } from "./Component/Component";
import { Line } from "./Component/Line";
import { ComponentHandler } from "./Handler/ComponentHandler";

export enum EditMode {
  DRAG = "DRAG",
  CONNECT = "CONNECT",
}

export class Visualizer {
  private nodes: Node[];
  private lines: Line[];
  private canvas: Canvas;
  private _highlightedComponent: Component | null = null;
  private _clickedComponent: Component[] = new Array();
  private _mouseDown: Boolean = false;
  private _editMode: EditMode = EditMode.DRAG;

  constructor(canvas: HTMLCanvasElement) {
    this.nodes = new Array();
    this.lines = new Array();
    this.canvas = new Canvas(canvas);
    this.draw();

    new ComponentHandler(this);

    this.editModeSelectionHandler();
  }

  addNode(node: Node) {
    this.nodes.push(node);
    this.draw();
  }

  addConnection(origin: Node, destination: Node, weight: number) {
    if (origin.hasConnectionTo(destination) == false) {
      origin.addChildren(destination, weight);
      this.lines.push(new Line(origin, destination, weight));
    }
  }

  async draw() {
    this.canvas.draw([...this.lines, ...this.nodes]);
    // if (this.clickedComponents.length != 0) {
    //   const paragraph = document.querySelector("#clicked-component") as HTMLParagraphElement;
    //   paragraph.innerText = '';
    //   for (const clickedComponent of this.clickedComponents) {
    //     const { x, y } = clickedComponent.getPosition();
    //     paragraph.innerText += `\n${ clickedComponent.getName() } `;
    //     paragraph.innerText += ` x: ${ x } y: ${ y }`;
    //     if (clickedComponent instanceof Node) {
    //       paragraph.innerText += ` Children: `;
    //       clickedComponent.getChildrens().forEach((value, key) => {
    //         paragraph.innerText += ` ${ key.getName() } `;
    //       })
    //     }
    //   }
    // }
  }

  get highlightedComponent() {
    return this._highlightedComponent;
  }

  set highlightedComponent(component: Component | null) {
    this._highlightedComponent = component;
  }

  get clickedComponents() {
    return this._clickedComponent;
  }

  editModeSelectionHandler() {
    const form = (document.querySelector("#edit-mode-selection") as HTMLFormElement);
    form.onchange = (event) => {
      const mode = (event.target as HTMLInputElement).value;
      switch (mode) {
        case "drag":
          this._editMode = EditMode.DRAG;
          break;
        case "connect":
          this._editMode = EditMode.CONNECT;
          break;
        default:
          this._editMode = EditMode.DRAG;
          break;
      }
    };
  }

  addClickedComponent(component: Component) {
    if (component != null) {
      const MAX = (this._editMode == EditMode.DRAG ? 1 : 2);
      while (this._clickedComponent.length >= MAX) {
        this._clickedComponent.shift()?.click(false);
      }
      this._clickedComponent?.push(component);
    }
  }

  removeClickedComponent(component: Component) {
    const index = this._clickedComponent.indexOf(component);

    if (index != -1) {
      this._clickedComponent.splice(index, 1);
      component.click(false);
    }
  }

  clearClickedComponents() {
    this._clickedComponent = new Array();
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

  get editMode() {
    return this._editMode;
  }
}