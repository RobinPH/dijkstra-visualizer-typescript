import { Component } from "./Component";

export class Node extends Component {
  private childerns: Map<Node, number>;
  private _radius: number;

  constructor(x: number, y: number, radius: number, name: string) {
    super(x, y, name);
    this.childerns = new Map();
    this._radius = radius;
  }

  hasConnectionTo(children: Node) {
    return this.childerns.get(children) != null || children.getChildrens().get(this) != null;
  }

  addChildren(children: Node, weight: number) {
    this.childerns.set(children, weight);
  }

  getChildrens() {
    return this.childerns;
  }

  set radius(n: number) {
    this._radius = n;
  }

  get radius() {
    return this._radius;
  }
}