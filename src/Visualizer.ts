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
  private _clickedComponent: Component | null = null;
  private _draggingComponent: Component | null = null;
  private _mouseDown: Boolean = false;
  private _editMode: EditMode = EditMode.DRAG;
  private _propertyEditor: PropertyEditor;
  private _menu: Menu;
  private _currentLineWeight: number = 1;
  private _algorithm: Algorithm = new Dijkstra();
  private _algorithmOption: AlgoOption = AlgoOption.DIRECTIONAL;
  private _algorithmInput: Map<"start" | "end", Node> = new Map();
  private _algoPath: Component[] = new Array();
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

    this._clickedComponent = null;
    this.highlightedComponent = null;
    this._propertyEditor.render();
    this._menu.render();

    if (this._algorithmInput.get("start") == node) this._algorithmInput.delete("start");
    if (this._algorithmInput.get("end") == node) this._algorithmInput.delete("end");

    this.draw();
  }

  addConnection(origin: Node, destination: Node, weight: number = this._currentLineWeight, direction: AlgoOption = this._algorithmOption, weighted: boolean = this.weighted) {
    let line: Line | null = null;
    if (!origin.hasConnectionTo(destination)) {
      
      if (direction == AlgoOption.BIDIRECTIONAL) {
        destination.addChildren(origin, weight, direction, weighted);
      }
      line = origin.addChildren(destination, weight, direction, weighted);
      this.lines.push(line);
    }
    
    this._menu.render();
    this.draw();

    if (line != null) return line;
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

    this._clickedComponent = null;
    this.highlightedComponent = null;
    this._propertyEditor.render();
    this._menu.render();
    this.draw();
  }

  removeLine({ nodes: { origin, destination } }: Line) {
    this.removeConnection(origin, destination);
  }

  flipLineDirection({ weight, direction, nodes: { origin, destination } }: Line) {
    this.removeConnection(origin, destination);
    const flippedLine = this.addConnection(destination, origin, weight, direction);
    if (flippedLine != null) this.clickComponent(flippedLine);
    this.draw();
  }

  async draw() {
    this._canvas.draw([...this.lines, ...this.nodes]);

    const start = this._algorithmInput.get("start");
    const end = this._algorithmInput.get("end");

    if (start != null) this.canvas.drawHandler.draw(start, "lightgreen")
    if (end != null) this.canvas.drawHandler.draw(end, "pink")
  }

  clickComponent(component: Component) {
    component.click(true);
    this._clickedComponent = component
    this._propertyEditor.render(this._clickedComponent);

    this._menu.render();
  }

  removeClickedComponent() {
    this._clickedComponent?.click(false);
    this._clickedComponent = null;
    this._propertyEditor.render();
    this._menu.render();
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
    
    this._algoPath.forEach((component) => component.path = false);  

    if (start == null || end == null) {
      return "Please provide start, and end node.";
    }

    const path = (this._algorithm as Dijkstra).start(start, end);

    if (path != null) {
      let prevNode: Node | null = null;
      for (const node of path) {
        node.path = true;
        this._algoPath.push(node)
        if (prevNode != null) {
          const line = prevNode.childrens.get(node) || node.childrens.get(prevNode)!;
          line.path = true;
          this._algoPath.push(line);
        }
        prevNode = node;
      }
    }
    
    const names = path.map((node) => node.name);

    this.draw();
    return names.length > 0 ? names.join(" ➜ ") : 'No Solution.';
  }

  changeAlgoInput(what: "start" | "end", node: Node) {
    if (this._algorithmInput.get(what == "start" ? "end" : "start") == node) {
      this._algorithmInput.delete(what == "start" ? "end" : "start");
    }
    this._algorithmInput.set(what, node);
    this.draw();
  }

  deleteAllComponents() {
    this._nodes = new Array();
    this._lines = new Array();
    this._algoPath = new Array();
    this._algorithmInput.delete("start");
    this._algorithmInput.delete("end");
    this.removeClickedComponent();
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

  get clickedComponent() {
    return this._clickedComponent;
  }

  get mouseDown() {
    return this._mouseDown;
  }

  set mouseDown(b: Boolean) {
    this._mouseDown = b;
  }

  get components() {
    return [...this.lines, ...this.nodes, ...this._algoPath];
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