import { Component } from "./Component";

export class Node extends Component {
  private childerns: Map<Node, number>;

  constructor(x: number, y: number, name: string) {
    super(x, y, name);
    this.childerns = new Map();
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
}