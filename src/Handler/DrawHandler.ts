import { Node } from "../Component/Node";
import { Component } from "../Component/Component";
import { Line } from "../Component/Line";
import { Canvas } from "../Canvas/Canvas";

export class DrawHandler {
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.context = this.canvas.context;
  }

  draw(component: Component) {
    if (component instanceof Node) {
      this.drawNode(component);
    } else if (component instanceof Line) {
      this.drawLine(component);
    }
  }

  drawNode(node: Node) {
    const { x, y } = node.position;

    this.context.beginPath();
    this.context.arc(x, y, node.radius, 0, 2 * Math.PI, false);

    this.context.fillStyle = node.color;

    this.context.fill();
    this.context.lineWidth = node.isClicked() || node.isHighlighted() ? 4 : 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();

    this.context.lineWidth = 1;
    this.context.font = '16px serif';

    const name = node.name
    const { width: stringWidth, height: stringHeight } = this.stringMetrics(name);
    this.context.strokeText(name, x - stringWidth / 2, y + stringHeight / 2);
  }

  drawLine(line: Line) {
    this.context.beginPath();

    const { origin, destination } = line.nodes;
    const { x: x1, y: y1 } = origin.position;
    const { x: x2, y: y2} = destination.position;
    const midX = (x2 + x1) / 2;
    const midY = (y2 + y1) / 2;
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);

    this.context.strokeStyle = line.color;
    
    this.context.lineWidth = line.isClicked() || line.isHighlighted() ? 4 : 2;
    this.context.stroke();

    this.context.strokeStyle = "purple";
    this.context.beginPath();
    this.context.moveTo(midX, midY);
    this.context.lineTo(x2, y2)
    this.context.stroke();

    this.context.font = '32px serif';
    const weight = line.weight.toString();
    const { width: stringWidth, height: stringHeight } = this.stringMetrics(weight);

    this.context.strokeText(weight, midX - stringWidth / 2, midY + stringHeight / 2);
  }

  stringMetrics(string: string) {
    const fontMetrics = this.context.measureText(string);
    return {
      width: fontMetrics.actualBoundingBoxRight,
      height: fontMetrics.actualBoundingBoxAscent + fontMetrics.actualBoundingBoxDescent,
    }
  }
}