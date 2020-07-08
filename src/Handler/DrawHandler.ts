import { Node } from "../Component/Node";
import { Component } from "../Component/Component";
import { Line } from "../Component/Line";
import { Canvas } from "../Canvas/Canvas";
import { AlgoOption } from "../Visualizer";

export class DrawHandler {
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.context = this.canvas.context;
  }

  draw(component: Component, color?: string) {
    if (component instanceof Node) {
      this.drawNode(component, color);
    } else if (component instanceof Line) {
      this.drawLine(component, color);
    }
  }

  drawNode(node: Node, color?: string) {
    const { x, y } = node.position;

    this.context.beginPath();
    this.context.arc(x, y, node.radius, 0, 2 * Math.PI, false);

    this.context.fillStyle = color || node.color || "white";

    this.context.fill();
    this.context.lineWidth = node.isClicked() || node.isHighlighted() ? 3 : 2;
    this.context.strokeStyle = '#003300';
    this.context.stroke();

    this.context.lineWidth = 1;
    this.context.font = '16px';

    const name = node.name
    const { width: stringWidth, height: stringHeight } = this.stringMetrics(name);
    this.context.fillStyle = "black";
    this.context.fillText(name, x - stringWidth / 2, y + stringHeight / 2);
  }

  drawLine(line: Line, color?: string) {
    this.context.beginPath();

    const { origin, destination } = line.nodes;
    const { x: x1, y: y1 } = origin.position;
    const { x: x2, y: y2 } = destination.position;

    const degree = Math.atan((x2 - x1) / (y2 - y1));
    const xRatio = Math.sin(degree) * (y2 >= y1 ? 1 : -1);
    const yRatio = Math.cos(degree) * (y2 >= y1 ? 1 : -1);
    const ixRatio = Math.sin(degree + 90 * Math.PI / 180) * (y2 >= y1 ? 1 : -1);
    const iyRatio = Math.cos(degree + 90 * Math.PI / 180) * (y2 >= y1 ? 1 : -1);

    const originEdgeX = x1 + xRatio * origin.radius;
    const originEdgeY = y1 + yRatio * origin.radius;
    const destinationEdgeX = x2 - xRatio * destination.radius;
    const destinationEdgeY = y2 - yRatio * destination.radius;

    const midX = (destinationEdgeX + originEdgeX) / 2;
    const midY = (destinationEdgeY + originEdgeY) / 2;
    
    this.context.moveTo(x1 + xRatio * origin.radius, y1 + yRatio * origin.radius);
    this.context.lineTo(midX - xRatio * 10, midY - yRatio * 10);
    this.context.moveTo(midX + xRatio * 10, midY + yRatio * 10);

    this.context.strokeStyle = color || line.color || "black";
    
    if (line.direction == AlgoOption.BIDIRECTIONAL) {
      this.context.lineTo(destinationEdgeX, destinationEdgeY);
    } else {
      const arrowLength = destination.radius / 2 / 2;
      const arrowX = destinationEdgeX - xRatio * arrowLength;
      const arrowY = destinationEdgeY - yRatio * arrowLength;
      this.context.lineTo(arrowX, arrowY);
      this.context.moveTo(destinationEdgeX, destinationEdgeY);
      this.context.lineTo(arrowX - ixRatio * arrowLength, arrowY - iyRatio * arrowLength);
      this.context.lineTo(arrowX + ixRatio * arrowLength, arrowY + iyRatio * arrowLength);
      this.context.lineTo(destinationEdgeX, destinationEdgeY);
      this.context.fillStyle = line.color || "black";
      this.context.fill();
    }
    
    this.context.lineWidth = line.isClicked() || line.isHighlighted() ? 3 : 2;
    this.context.stroke();

    this.context.font = '24px';
    const weight = (+line.weight.toFixed(2)).toString();
    const { width: stringWidth, height: stringHeight } = this.stringMetrics(weight);

    this.context.fillStyle = line.color || "black";
    this.context.fillText(weight, midX - stringWidth / 2, midY + stringHeight / 2);
  }

  stringMetrics(string: string) {
    const fontMetrics = this.context.measureText(string);
    return {
      width: fontMetrics.actualBoundingBoxRight,
      height: fontMetrics.actualBoundingBoxAscent + fontMetrics.actualBoundingBoxDescent,
    }
  }
}