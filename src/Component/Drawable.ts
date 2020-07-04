import { Node } from "./Node";

export type drawable = Node;

export class Drawable {
  private highlighted: Boolean = false;

  highlight(b: Boolean) {
    this.highlighted = b;
  }

  isHighlighted() {
    return this.highlighted;
  }
}