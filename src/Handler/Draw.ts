import { Node } from "../Component/Node";
import { Drawable } from "../Component/Drawable";

export class DrawHandler {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw(component: Drawable) {
    if (component instanceof Node) {
      this.drawNode(component);
    }
  }

  drawNode(node: Node) {
    const { x, y } = node.getPosition();
    const radius = 26;

    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = node.isHighlighted() ? 'green' : 'red';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();

    // this.context.rect(x - radius, y - radius, radius * 2, radius * 2)
    // this.context.stroke();
  }

  drawLine(n1: Node, n2: Node) {
    this.context.beginPath();

    const { x: x1, y: y1 } = n1.getPosition();
    const { x: x2, y: y2} = n2.getPosition();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();   
  }
}