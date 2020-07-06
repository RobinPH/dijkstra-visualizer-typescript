import { Node } from "./Node";

export abstract class Component {
  private x: number;
  private y: number;
  private _name: string;
  private highlighted: Boolean = false;
  private clicked: Boolean = false;

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set changeName(name: string) {
    this._name = name;
  }

  get position() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  set position({ x, y }: { x: number; y: number }) {
    if (x != null) this.x = x;
    if (y != null) this.y = y;
  }

  highlight(b: Boolean) {
    this.highlighted = b;
  }

  click(b: Boolean) {
    this.clicked = b;
  }

  isHighlighted() {
    return this.highlighted;
  }

  isClicked() {
    return this.clicked;
  }
}