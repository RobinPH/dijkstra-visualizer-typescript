import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Component } from "./Component/Component";
import { Line } from "./Component/Line";
import { ComponentHandler } from "./Handler/ComponentHandler";
import { ScaleHandler } from "./Handler/ScaleHandler";
import { PropertyEditor } from "./Component/PropertyEditor";

export enum EditMode {
  DRAG = "DRAG",
  CONNECT = "CONNECT",
}

export class Visualizer {
  private nodes: Node[];
  private lines: Line[];
  private _canvas: Canvas;
  private _canvasDocument: HTMLCanvasElement;
  private _highlightedComponent: Component | null = null;
  private _clickedComponent: Component[] = new Array();
  private _draggingComponent: Component | null = null;
  private _mouseDown: Boolean = false;
  private _editMode: EditMode = EditMode.DRAG;
  private _biggestWeight: number = 0;
  private propertyEditor: PropertyEditor;

  constructor(canvasId: string) {
    this.nodes = new Array();
    this.lines = new Array();
    this._canvasDocument = document.querySelector(canvasId) as HTMLCanvasElement;
    this._canvas = new Canvas(this._canvasDocument);
    this.draw();

    new ComponentHandler(this);
    new ScaleHandler(this);
    this.propertyEditor = new PropertyEditor("#property-editor", this);

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
      this._biggestWeight = Math.max(this._biggestWeight, weight);
    }
  }

  async draw() {
    this._canvas.draw([...this.lines, ...this.nodes]);
  }

  get highlightedComponent() {
    return this._highlightedComponent;
  }

  set highlightedComponent(component: Component | null) {
    this._highlightedComponent = component;
  }

  get draggingComponent() {
    return this._draggingComponent;
  }

  set draggingComponent(component: Component | null) {
    this._draggingComponent = component;
  }

  get clickedComponents() {
    return this._clickedComponent;
  }

  get biggestWeight() {
    return this._biggestWeight;
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
      this.propertyEditor.componentEditor();
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

  get canvas() {
    return this._canvas;
  }

  get canvasDocument() {
    return this._canvasDocument;
  }
}