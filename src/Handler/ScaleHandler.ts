import { Visualizer } from "../Visualizer";

export class ScaleHandler { 
  private visualizer: Visualizer;

  constructor(visualizer: Visualizer) {
    this.visualizer = visualizer;
    this.scaleHandler();
  }

  scaleHandler() {
    this.visualizer.canvasDocument.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        this.visualizer.canvas.increaseScale();
      } else {
        this.visualizer.canvas.decreaseScale();
      }
    });
  }
}