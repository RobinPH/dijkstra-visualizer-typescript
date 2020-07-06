import { Component } from "./Component";

export class Node extends Component {
  private _childerns: Map<Node, number>;
  private _radius: number;

  constructor(x: number, y: number, radius: number, name: string) {
    super(x, y, name);
    this._childerns = new Map();
    this._radius = radius;
  }

  hasConnectionTo(children: Node) {
    return this._childerns.get(children) != null || children.childrens.get(this) != null;
  }

  addChildren(children: Node, weight: number) {
    this._childerns.set(children, weight);
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