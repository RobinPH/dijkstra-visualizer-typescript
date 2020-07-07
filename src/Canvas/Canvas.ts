import { DrawHandler } from "../Handler/DrawHandler";
import { Component } from "../Component/Component";
import { Node } from "../Component/Node";
import { Line } from "../Component/Line";

export class Canvas {
  private canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private drawHandler: DrawHandler;
  private _scale: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.setupCanvas();

    this._context = this.canvas.getContext('2d')!;

    this.drawHandler = new DrawHandler(this);
  }

  private setupCanvas() {
    this.canvas.width = window.innerWidth;;
    this.canvas.height = 500;
  }

  draw(components: Component[]) {
    let highlighted: Component | null = null;
    this.drawBackground();

    components.forEach((component) => {
      if (component.isHighlighted() && component instanceof Node) {
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

  increaseScale() {
    this._scale += 0.005;
  }

  decreaseScale() {
    this._scale -= 0.005;
    if (this._scale < 0.5) {
      this._scale = 0.5;
    }
  }

  resetScale() {
    this._scale = 1.0;
  }

  get context() {
    return this._context;
  }

  get scale() {
    return this._scale;
  }
}