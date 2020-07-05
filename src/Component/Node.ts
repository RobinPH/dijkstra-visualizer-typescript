import { Drawable } from "./Drawable";

export class Node extends Drawable {
  private childerns: Map<Node, number>;

  constructor(x: number, y: number, name: string) {
    super(x, y, name);
    this.childerns = new Map();
  }

  addChildren(children: Node, weight: number) {
    this.childerns.set(children, weight);
  }

  getChildrens() {
    return this.childerns;
  }
}