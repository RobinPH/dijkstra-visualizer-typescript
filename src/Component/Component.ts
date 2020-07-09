import { Node } from "./Node";
import { Line } from "./Line";

interface IPosition {
  x: number;
  y: number;
}
export abstract class Component {
  private x: number;
  private y: number;
  private _name: string;
  private highlighted: Boolean = false;
  private clicked: Boolean = false;
  private _path: Boolean = false;

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get position() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  set position({ x, y }: IPosition) {
    if (x != null) this.x = x;
    if (y != null) this.y = y;
  }

  get color() {
    if (this.isClicked()) return "#ffcc33";
    if (this.isHighlighted()) return "grey";

    return null;
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

  isPath() {
    return this._path;
  }

  set path(b: boolean) {
    this._path = b;
  }
}