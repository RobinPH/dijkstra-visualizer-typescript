import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Component } from "./Component/Component";
import { Line } from "./Component/Line";
import { ComponentHandler } from "./Handler/ComponentHandler";
import { ScaleHandler } from "./Handler/ScaleHandler";
import { PropertyEditor } from "./Component/PropertyEditor/Editor";
import { ToolSelection } from "./Component/ToolSelection";

export enum EditMode {
  DRAG = "DRAG",
  CONNECT = "CONNECT",
  DELETE = "DELETE",
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
  private _propertyEditor: PropertyEditor;
  private _toolSelection: ToolSelection;

  constructor(canvasId: string) {
    this.nodes = new Array();
    this.lines = new Array();
    this._canvasDocument = document.querySelector(canvasId) as HTMLCanvasElement;
    this._canvas = new Canvas(this._canvasDocument);
    this.draw();

    new ComponentHandler(this);
    new ScaleHandler(this);
    this._propertyEditor = new PropertyEditor("#property-editor", this);
    this._toolSelection = new ToolSelection("#tool-selection", this);

    this._toolSelection.render();
  }

  addNode(node: Node) {
    this.nodes.push(node);
    this.draw();
  }

  removeNode(node: Node) {
    this.nodes = this.nodes.filter((_node) => _node != node);
    this.removeConnection(node);

    this._clickedComponent = this._clickedComponent.filter((component) => component != node);
    this._propertyEditor.render();
    this.highlightedComponent = null;
    this.draw();
  }

  addConnection(origin: Node, destination: Node, weight: number) {
    if (origin.hasConnectionTo(destination) == false) {
      origin.addChildren(destination, weight);
      this.lines.push(new Line(origin, destination, weight));
      this._biggestWeight = Math.max(this._biggestWeight, weight);
    }
  }

  removeConnection(origin: Node, destination?: Node) {
    this.lines = this.lines.filter((line) => {
      const lineNodes = line.nodes;

      if (destination != null) {
        if (lineNodes.origin == origin && lineNodes.destination == destination) return false;
      } else {
        if (lineNodes.origin == origin || lineNodes.destination == origin) return false;
      }

      return true;
    });

    if (destination) origin.removeChildren(destination);

    this._clickedComponent.shift();
    this._propertyEditor.render();
    this.highlightedComponent = null;
    this.draw();
  }

  removeLine({ nodes: { origin, destination } }: Line) {
    this.removeConnection(origin, destination);
  }

  async draw() {
    this._canvas.draw([...this.lines, ...this.nodes]);
  }

  addClickedComponent(component: Component) {
    if (component != null) {
      const MAX = (this._editMode == EditMode.DRAG ? 1 : 2);
      while (this._clickedComponent.length >= MAX) {
        this._clickedComponent.shift()?.click(false);
      }
      this._clickedComponent?.push(component);
    }
    this._propertyEditor.render(this._clickedComponent[0]);
  }

  removeClickedComponent(component: Component) {
    const index = this._clickedComponent.indexOf(component);

    if (index != -1) {
      this._clickedComponent.splice(index, 1);
      component.click(false);
    }
    this._propertyEditor.render(this._clickedComponent[0]);
  }

  clearClickedComponents() {
    while (this._clickedComponent.length > 0) {
      this._clickedComponent.pop()?.click(false);
    }
    this._propertyEditor.render();
  }

  updateComponent<T>(component: T, callbackfn: (component: T) => void) {
    callbackfn(component);
    this.draw();
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

  set editMode(editMode: EditMode) {
    this._editMode = editMode;
  }

  get canvas() {
    return this._canvas;
  }

  get canvasDocument() {
    return this._canvasDocument;
  }

  get propertyEditor() {
    return this._propertyEditor;
  }
}