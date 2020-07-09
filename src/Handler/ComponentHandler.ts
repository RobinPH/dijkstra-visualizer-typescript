import { Visualizer, EditMode } from "../Visualizer";
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
    const { x: offsetX, y: offsetY } = this.visualizer.canvas.offset;
    mouseX += window.scrollX - offsetX;
    mouseY += window.scrollY + offsetY;
    for (const component of components) {
      if (component instanceof Node) {
        const { x, y } = component.position;
        if (Math.hypot(x - mouseX, y - mouseY) < component.radius) {
          hoveringOn.push(component);
        } else {
          notHoveringOn.push(component);
        }
      } else if (component instanceof Line) {
        const { origin, destination } = component.nodes;
        const radius = Math.min(origin.radius, destination.radius);
        const { x: oX, y: oY } = origin.position;
        const { x: dX, y: dY } = destination.position;
        const xMin = Math.min(oX, dX);
        const xMax = Math.max(oX, dX);
        const yMin = Math.min(oY, dY);
        const yMax = Math.max(oY, dY);

        if (mouseX < xMin && mouseX > xMax && mouseY < yMin && mouseY > yMax) {
          notHoveringOn.push(component);
          continue;
        }

        const yDif = oY + (oX - mouseX) / (oX - dX) * (dY - oY) - mouseY;
        const xDif = oX + (oY - mouseY) / (oY - dY) * (dX - oX) - mouseX;
        const xConstraint1 = Math.min(oX, dX) + (Math.abs(xMin - xMax) < radius * 2 ? -radius : radius) // 52 = Node's Diameter, 26 = Node's radius
        const xConstraint2 = Math.max(oX, dX) + (Math.abs(xMin - xMax) < radius * 2 ? radius : -radius)
        const yConstraint1 = Math.min(oY, dY) + (Math.abs(yMin - yMax) < radius * 2 ? -radius : radius)
        const yConstraint2 = Math.max(oY, dY) + (Math.abs(yMin - yMax) < radius * 2 ? radius : -radius)
        if ((Math.abs(xDif) < 10 * Math.sqrt(2) || Math.abs(yDif) < 10 * Math.sqrt(2)) 
            && mouseX > xConstraint1 && mouseX < xConstraint2
            && mouseY > yConstraint1 && mouseY < yConstraint2) {
          hoveringOn.push(component);
        } else {
          notHoveringOn.push(component);
        }
      }
    }

    this.visualizer.canvasDocument.style.cursor = hoveringOn.length > 0 ? 'pointer' : 'default';

    return {
      hoveringOn,
      notHoveringOn,
    };
  }

  highlightHandler() {
    this.visualizer.canvasDocument.addEventListener("mousemove", (event) => {
      const { hoveringOn, notHoveringOn } = this.checkIfHoveringOnComponent(event.x, event.y, this.visualizer.components.reverse());
      
      hoveringOn.forEach((component) => { 
        if (this.visualizer.highlightedComponent == null)
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
    this.visualizer.canvasDocument.addEventListener("mousemove", (event) => {
      const clickedComponent = this.visualizer.clickedComponent;
      if (this.visualizer.mouseDown
          && this.visualizer.draggingComponent != null
          && this.visualizer.draggingComponent == clickedComponent) {
            const { x: offsetX, y: offsetY } = this.visualizer.canvas.offset;
            clickedComponent.position = { x: event.x + window.scrollX - offsetX, y: event.y + window.scrollY + offsetY };
            this.highlightComponent(clickedComponent);
      }
    })
  }

  clickHandler() {
    this.visualizer.canvasDocument.addEventListener("mouseup", () => {
      this.visualizer.mouseDown = false;
      if (this.visualizer.draggingComponent) this.visualizer.propertyEditor.render(this.visualizer.draggingComponent);
      this.visualizer.draggingComponent = null;
    })

    this.visualizer.canvasDocument.addEventListener("mousedown", () => {
      this.visualizer.mouseDown = true;

      const highlightedComponent = this.visualizer.highlightedComponent;
      const clickedComponent = this.visualizer.clickedComponent;

      if (highlightedComponent != null) {
        if (this.visualizer.editMode == EditMode.DELETE) {
          if (highlightedComponent instanceof Node) {
            this.visualizer.removeNode(highlightedComponent);
          } else if (highlightedComponent instanceof Line) {
            this.visualizer.removeLine(highlightedComponent)
          }
        } else {
          if (clickedComponent == highlightedComponent) {
            this.visualizer.removeClickedComponent();
          } else if (clickedComponent != null && this.visualizer.editMode == EditMode.CONNECT) {
            if (clickedComponent instanceof Node && highlightedComponent instanceof Node) {
              this.visualizer.addConnection(clickedComponent, highlightedComponent);
            }
          } else {
            this.visualizer.removeClickedComponent();
            this.visualizer.clickComponent(highlightedComponent);
            this.visualizer.draggingComponent = highlightedComponent;
            highlightedComponent.click(true);
          }
        }
      } else {
        this.visualizer.removeClickedComponent();
      }

      this.visualizer.draw();
    });
  }
}