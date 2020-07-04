import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Drawable } from "./Component/Drawable";

export class Visualizer {
  private nodes: Node[];
  private canvas: Canvas;
  private highlightedDrawable: Drawable | null = null;
  private mouseDown: Boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.nodes = new Array();
    this.canvas = new Canvas(canvas);
    this.draw();

    this.componentHighlightHandler();
    this.componentDragHandler();
  }

  addNode(node: Node) {
    this.nodes.push(node);
    this.draw();
  }

  async draw() {
    this.canvas.draw(this.nodes);
  }

  componentHighlightHandler() {
    document.addEventListener("mousemove", (event) => {
      this.nodes.forEach((node) => {
        const { x: eX, y: eY } = event;
        const { x: nX, y: nY } = node.getPosition();

        if (Math.hypot(nX - eX, nY - eY) < 26) {
          if (this.highlightedDrawable == null) {
            this.highlightedDrawable = node;
            node.highlight(true);
          }
        } else {
          if (node == this.highlightedDrawable) this.highlightedDrawable = null;
          node.highlight(false);
        }
      })
      this.draw();
    })
  }

  componentDragHandler() {
    document.addEventListener("mousedown", (event) => {
      this.mouseDown = true;
    })

    document.addEventListener("mouseup", (event) => {
      this.mouseDown = false;
    })

    document.addEventListener("mousemove", (event) => {
      if (this.mouseDown && this.highlightedDrawable != null) {
        (this.highlightedDrawable as Node).changePosition(event.x, event.y);
      }
    })
  }
}