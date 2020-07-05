import { Visualizer } from "../Visualizer";
import { Node } from "./Node";
import { Line } from "./Line";

export class PropertyEditor {
  private visualizer: Visualizer;
  private editorDiv: HTMLDivElement;
  
  constructor(editorId: string, visualizer: Visualizer) {
    this.editorDiv = document.querySelector(editorId) as HTMLDivElement;
    this.visualizer = visualizer;
    this.componentEditor();
  }

  componentEditor() {
    const component = this.visualizer.clickedComponents[0];
    this.editorDiv.innerHTML = `
      <div>
        ${ component instanceof Node ? `
          <form id="node-editor">
            <label for="radius">Radius</label><br>
            <input type="text" id="node-radius" name="radius" value=${ component.radius }><br>
          <form>
        ` : `` }
        ${ component instanceof Line ? `
          <form id="line-editor">
            <label for="line">Weight</label><br>
            <input type="text" id="line-weight" name="line" value=${ component.getWeight() }><br>
          <form>
        ` : `` }
      </div>
    `

    const nodeEditor = this.editorDiv.querySelector("#node-editor") as HTMLFormElement;
    if (nodeEditor) {
      nodeEditor.onchange = (event) => {
        event.preventDefault();
        try {
          const radius = parseInt((event.target as HTMLFormElement).value);
          const component = this.visualizer.clickedComponents[0];
          if (component instanceof Node) {
            component.radius = radius;
            this.visualizer.draw();
          }
        } catch {}
      }
    }

    const lineEditor = this.editorDiv.querySelector("#line-editor") as HTMLFormElement;
    if (lineEditor) {
      lineEditor.onchange = (event) => {
        event.preventDefault();
        try {
          const weight = parseInt((event.target as HTMLFormElement).value);
          const component = this.visualizer.clickedComponents[0];
          if (component instanceof Line) {
            component.setWeight(weight);
            this.visualizer.draw();
          }
        } catch {}
      }
    }
  }
}