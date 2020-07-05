import { Node } from "./Node";

export abstract class Component {
  private x: number;
  private y: number;
  private name: string;
  private highlighted: Boolean = false;
  private clicked: Boolean = false;

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  getName() {
    return this.name;
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