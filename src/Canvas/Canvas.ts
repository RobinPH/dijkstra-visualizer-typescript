import { DrawHandler } from "../Handler/Draw";
import { Drawable } from "../Component/Drawable";
import { Node } from "../Component/Node";

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

  draw(components: Drawable[]) {
    let highlighted: Drawable | null = null;
    this.drawBackground();
    
    components.forEach((component) => {
      (component as Node).getChildrens().forEach((children) => {
        this.drawHandler.drawLine((component as Node), children);
      })
    });

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