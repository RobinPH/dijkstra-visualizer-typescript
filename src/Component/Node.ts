import { Drawable } from "./Drawable";

export class Node extends Drawable {
  private x: number;
  private y: number;
  private name: string;
  private childerns: Node[];

  constructor(x: number, y: number, name: string) {
    super();
    this.x = x;
    this.y = y;
    this.name = name;
    this.childerns = new Array();
  }

  addChildren(children: Node) {
    this.childerns.push(children);
  }

  getChildrens() {
    return this.childerns;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  changePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}