import { Node } from "../Component/Node";
import { Component } from "../Component/Component";
import { Line } from "../Component/Line";

export class DrawHandler {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  draw(component: Component) {
    if (component instanceof Node) {
      this.drawNode(component);
    } else if (component instanceof Line) {
      this.drawLine(component);
    }
  }

  drawNode(node: Node) {
    const { x, y } = node.getPosition();
    const radius = 26;

    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);

    if (node.isClicked()) {
      this.context.fillStyle = "blue";
    } else if (node.isHighlighted()) {
      this.context.fillStyle = "green";
    } else {
      this.context.fillStyle = "red";
    }

    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();

    // this.context.rect(x - radius, y - radius, radius * 2, radius * 2)
    // this.context.stroke();
  }

  drawLine(line: Line) {
    this.context.beginPath();

    const { origin, destination } = line.nodes;

    const { x: x1, y: y1 } = origin.getPosition();
    const { x: x2, y: y2} = destination.getPosition();
    const midX = (x2 + x1) / 2;
    const midY = (y2 + y1) / 2;
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);

    if (line.isClicked()) {
      this.context.strokeStyle = "blue";
    } else if (line.isHighlighted()) {
      this.context.strokeStyle = "green";
    } else {
      this.context.strokeStyle = "black";
    }

    this.context.stroke();   

    this.context.font = '32px serif';
    this.context.strokeText(line.getWeight().toString(), midX, midY);
  }
}