import { Canvas } from "./Canvas/Canvas";
import { Node } from "./Component/Node";
import { Drawable } from "./Component/Drawable";
import { Line } from "./Component/Line";

enum EditMode {
  DRAG,
  CONNECT,
}

export class Visualizer {
  private nodes: Node[];
  private lines: Line[];
  private canvas: Canvas;
  private highlightedDrawable: Drawable | null = null;
  private clickedComponent: Drawable | null = null;
  private mouseDown: Boolean = false;
  private editMode: EditMode = EditMode.DRAG;

  constructor(canvas: HTMLCanvasElement) {
    this.nodes = new Array();
    this.lines = new Array();
    this.canvas = new Canvas(canvas);
    this.draw();

    this.componentHighlightHandler();
    this.componentDragHandler();
    this.componentClickHandler();
  }

  addNode(node: Node) {
    this.nodes.push(node);
    this.draw();
  }

  addConnect(origin: Node, destination: Node, weight: number) {
    origin.addChildren(destination, weight);
    this.lines.push(new Line(origin, destination, weight));
  }

  async draw() {
    this.canvas.draw([...this.lines, ...this.nodes]);
    if (this.clickedComponent != null) {
      const { x, y } = this.clickedComponent.getPosition();
      const paragraph = document.querySelector("#clicked-component") as HTMLParagraphElement;
      paragraph.innerText = '';
      paragraph.innerText += `${ this.clickedComponent.getName() } `;
      paragraph.innerText += ` x: ${ x } y: ${ y }`;
      if (this.clickedComponent instanceof Node) {
        paragraph.innerText += ` Children: `;
        this.clickedComponent.getChildrens().forEach((value, key) => {
          paragraph.innerText += ` ${ key.getName() } `;
        })
      }
    }
  }

  get components() {
    return [...this.lines, ...this.nodes];
  }

  highlightComponent(component: Drawable) {
    if (this.highlightedDrawable == null) {
      this.highlightedDrawable = component;
      this.highlightedDrawable.highlight(true);
    }
  }

  checkIfHoveringOnComponent(mouseX: number, mouseY: number, components: Drawable[]) {
    const hoveringOn: Drawable[] = new Array();
    const notHoveringOn: Drawable[] = new Array();

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

  componentHighlightHandler() {
    document.addEventListener("mousemove", (event) => {
      const { hoveringOn, notHoveringOn } = this.checkIfHoveringOnComponent(event.x, event.y, this.components);

      hoveringOn.forEach((component) => { 
        this.highlightComponent(component)
      })
      notHoveringOn.forEach((component) => { 
        if (component == this.highlightedDrawable) this.highlightedDrawable = null;
        component.highlight(false);
      });

      this.draw();
    })
  }

  componentDragHandler() {
    document.addEventListener("mousemove", (event) => {
      if (this.mouseDown
          && this.highlightedDrawable == this.clickedComponent
          && this.highlightedDrawable != null
          && this.clickedComponent != null) {
        this.clickedComponent!.changePosition(event.x, event.y);
        this.clickedComponent!.highlight(true);
      }
    })
  }

  componentClickHandler() {
    document.addEventListener("mouseup", (event) => {
      this.mouseDown = false;
    })

    document.addEventListener("mousedown", (event) => {
      this.mouseDown = true;
      if (this.clickedComponent != null) this.clickedComponent.click(false);
      this.clickedComponent = this.highlightedDrawable;
      if (this.clickedComponent != null) this.clickedComponent!.click(true);
    });
  }
}