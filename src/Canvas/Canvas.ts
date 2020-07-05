import { DrawHandler } from "../Handler/Draw";
import { Component } from "../Component/Component";
import { Node } from "../Component/Node";
import { Line } from "../Component/Line";

export class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private drawHandler: DrawHandler;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.setupCanvas();

    this.context = this.canvas.getContext('2d')!;

    this.drawHandler = new DrawHandler(this.context);
  }

  private setupCanvas() {
    this.canvas.width = 500;
    this.canvas.height = 500;
  }

  draw(components: Component[]) {
    let highlighted: Component | null = null;
    this.drawBackground();

    components.forEach((component) => {
      if (component.isHighlighted()) {
        highlighted = component
        return;
      }
      this.drawHandler.draw(component);
    })

    if (highlighted) this.drawHandler.draw(highlighted);
  }

  drawBackground() {
    this.context.fillStyle = "lightgray";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}