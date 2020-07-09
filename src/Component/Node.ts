import { Component } from "./Component";
import { Line } from "./Line";
import { AlgoOption } from "../Visualizer";

export class Node extends Component {
  private _childerns: Map<Node, Line>;
  private _radius: number;

  constructor(x: number, y: number, radius: number, name: string) {
    super(x, y, name);
    this._childerns = new Map();
    this._radius = radius;
  }

  hasConnectionTo(children: Node) {
    return this._childerns.has(children) || children.childrens.has(this);
  }

  addChildren(children: Node, weight: number, direction: AlgoOption, weighted: boolean) {
    const line = new Line(this, children, weight, direction, weighted);
    this._childerns.set(children, line);
    return line;
  }

  removeChildren(children: Node) {
    this.childrens.delete(children);
  }

  get childrens() {
    return this._childerns;
  }

  set radius(n: number) {
    this._radius = n;
  }

  get radius() {
    return this._radius;
  }
}