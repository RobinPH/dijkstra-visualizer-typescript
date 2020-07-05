import { Visualizer } from "../Visualizer";
import { Component } from "../Component/Component";
import { Line } from "../Component/Line";
import { Node } from "../Component/Node";

export class ComponentHandler {
  private visualizer: Visualizer;

  constructor(visualizer: Visualizer) {
    this.visualizer = visualizer

    this.highlightHandler();
    this.dragHandler();
    this.clickHandler();
  }

  highlightComponent(component: Component) {
    if (this.visualizer.highlightedComponent == null) {
      this.visualizer.highlightedComponent = component;
      this.visualizer.highlightedComponent.highlight(true);
    }
  }

  checkIfHoveringOnComponent(mouseX: number, mouseY: number, components: Component[]) {
    const hoveringOn: Component[] = new Array();
    const notHoveringOn: Component[] = new Array();

    for (const component of components) {
      if (component instanceof Node) {
        const { x, y } = component.getPosition();
        if (Math.hypot(x - mouseX, y - mouseY) < 26) {
          hoveringOn.push(component)
        } else {
          notHoveringOn.push(component)
        }
      } else if (component instanceof Line) {
        notHoveringOn.push(component)
      }
    }

    return {
      hoveringOn,
      notHoveringOn,
    };
  }

  highlightHandler() {
    document.addEventListener("mousemove", (event) => {
      const { hoveringOn, notHoveringOn } = this.checkIfHoveringOnComponent(event.x, event.y, this.visualizer.components);

      hoveringOn.forEach((component) => { 
        this.highlightComponent(component)
      })
      notHoveringOn.forEach((component) => { 
        if (component == this.visualizer.highlightedComponent) this.visualizer.highlightedComponent = null;
        component.highlight(false);
      });

      this.visualizer.draw();
    })
  }

  dragHandler() {
    document.addEventListener("mousemove", (event) => {
      if (this.visualizer.mouseDown
          && this.visualizer.highlightedComponent == this.visualizer.clickedComponent
          && this.visualizer.highlightedComponent != null
          && this.visualizer.clickedComponent != null) {
        this.visualizer.clickedComponent!.changePosition(event.x, event.y);
        this.highlightComponent(this.visualizer.clickedComponent);
      }
    })
  }

  clickHandler() {
    document.addEventListener("mouseup", (event) => {
      this.visualizer.mouseDown = false;
    })

    document.addEventListener("mousedown", (event) => {
      this.visualizer.mouseDown = true;
      if (this.visualizer.clickedComponent != null) this.visualizer.clickedComponent.click(false);
      this.visualizer.clickedComponent = this.visualizer.highlightedComponent;
      if (this.visualizer.clickedComponent != null) this.visualizer.clickedComponent!.click(true);
    });
  }
}