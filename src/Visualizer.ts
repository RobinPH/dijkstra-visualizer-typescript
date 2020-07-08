import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Component } from "./Component/Component";
import { Line } from "./Component/Line";
import { ComponentHandler } from "./Handler/ComponentHandler";
import { ScaleHandler } from "./Handler/ScaleHandler";
import { PropertyEditor } from "./Component/PropertyEditor/Editor";
import { Menu } from "./Component/Menu";
import { Algorithm } from "./Algorithm/Algorithm";
import { Dijkstra } from "./Algorithm/Dijkstra";

export enum EditMode {
  DRAG = "DRAG",
  CONNECT = "CONNECT",
  DELETE = "DELETE",
}

export enum AlgoOption {
  DIRECTIONAL = "DIRECTIONAL",
  BIDIRECTIONAL = "BIDIRECTIONAL"
}

export class Visualizer {
  private _nodes: Node[] = new Array();
  private _lines: Line[] = new Array();
  private _canvas: Canvas;
  private _canvasDocument: HTMLCanvasElement;
  private _highlightedComponent: Component | null = null;
  private _clickedComponent: Component[] = new Array();
  private _draggingComponent: Component | null = null;
  private _mouseDown: Boolean = false;
  private _editMode: EditMode = EditMode.DRAG;
  private _propertyEditor: PropertyEditor;
  private _menu: Menu;
  private _currentLineWeight: number = 1;
  private _algorithm: Algorithm = new Dijkstra();
  private _algorithmOption: AlgoOption = AlgoOption.BIDIRECTIONAL;
  private _algorithmInput: Map<"start" | "end", Node> = new Map();
  private _weighted: boolean = true;

  constructor(canvasId: string) {
    this._canvasDocument = document.querySelector(canvasId) as HTMLCanvasElement;
    this._canvas = new Canvas(this._canvasDocument);
    this.draw();

    new ComponentHandler(this);
    new ScaleHandler(this);
    this._propertyEditor = new PropertyEditor("#property-editor", this);
    this._menu = new Menu("#menu", this);

    this._menu.render();
  }

  addNode(x: number, y: number, radius: number = 15, name: string = this.newNodeName()) {
    this.nodes.push(new Node(x, y, radius, name));
    this.draw();
  }

  addExistingNode(node: Node) {
    this.nodes.push(node);
    this.draw();
  }

  removeNode(node: Node) {
    this._nodes = this.nodes.filter((_node) => _node != node);
    this.removeConnection(node);

    this._nodes.forEach((_node) => {
      _node.childrens.delete(node);
    })

    this._clickedComponent = this._clickedComponent.filter((component) => component != node);
    this._propertyEditor.render();
    this.highlightedComponent = null;

    if (this._algorithmInput.get("start") == node) this._algorithmInput.delete("start");
    if (this._algorithmInput.get("end") == node) this._algorithmInput.delete("end");

    this.draw();
  }

  addConnection(origin: Node, destination: Node, weight: number = this._currentLineWeight, direction: AlgoOption = this._algorithmOption) {
    if (!origin.hasConnectionTo(destination)) {
      if (this._algorithmOption == AlgoOption.BIDIRECTIONAL) {
        destination.addChildren(origin, weight, this._algorithmOption);
      }
      this.lines.push(origin.addChildren(destination, weight, this._algorithmOption));
    }

    this.clearClickedComponents();
    this._menu.render();
    this.draw();
  }

  removeConnection(origin: Node, destination?: Node) {
    this._lines = this.lines.filter((line) => {
      const lineNodes = line.nodes;

      if (destination != null) {
        if (lineNodes.origin == origin && lineNodes.destination == destination) return false;
      } else {
        if (lineNodes.origin == origin || lineNodes.destination == origin) return false;
      }

      return true;
    });

    if (destination) {
      origin.removeChildren(destination);
      destination.removeChildren(origin);
    }

    this._clickedComponent.shift();
    this._propertyEditor.render();
    this.highlightedComponent = null;
    this.draw();

    console.log(this._nodes)
  }

  removeLine({ nodes: { origin, destination } }: Line) {
    this.removeConnection(origin, destination);
  }

  async draw() {
    this._canvas.draw([...this.lines, ...this.nodes]);

    const start = this._algorithmInput.get("start");
    const end = this._algorithmInput.get("end");

    if (start != null) this.canvas.drawHandler.draw(start, "lightgreen")
    if (end != null) this.canvas.drawHandler.draw(end, "pink")
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

  newNodeName() {
    let name: string[] = [];
    
    let n = this.nodes.length;

    do {
      name.push(String.fromCharCode(65 + n % 26));
      n -= n % 26;
      n /= 26;
    } while (n > 0);

    return name.reverse().join("");
  }

  startAlgo() {
    const start = this._algorithmInput.get("start");
    const end = this._algorithmInput.get("end");

    if (start == null || end == null) {
      (document.querySelector("#algo-result") as HTMLDivElement).innerHTML = "Please provide start, and end node.";
      return;
    }

    const path = (this._algorithm as Dijkstra).start(start, end).map((node) => node.name);
    (document.querySelector("#algo-result") as HTMLDivElement).innerHTML = path.length > 0 ? path.join(" -> ") : 'No Solution.';
    this.draw();
  }

  changeAlgoInput(what: "start" | "end", node: Node) {
    this._algorithmInput.set(what, node);
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

    this._propertyEditor.render();
    this._menu.render();
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
  
  get currentLineWeight() {
    return this._currentLineWeight;
  }

  set currentLineWeight(weight: number) {
    this._currentLineWeight = weight;
  }

  get nodes() {
    return this._nodes;
  }

  get lines() {
    return this._lines;
  }

  get algorithmOption() {
    return this._algorithmOption;
  }

  set algorithmOption(option: AlgoOption) {
    this._algorithmOption = option;
  }

  set weighted(b: boolean) {
    this.lines.forEach((line) => {
      line.weighted = b;
    })

    this._weighted = b;

    this.draw();
  }

  get weighted() {
    return this._weighted;
  }

  get algorithmInput() {
    return this._algorithmInput;
  }
}