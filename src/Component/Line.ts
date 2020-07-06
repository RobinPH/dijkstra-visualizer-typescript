import { Component } from "./Component";
import { Node } from "./Node";

export class Line extends Component {
  private origin: Node;
  private destination: Node;
  private weight: number;

  constructor(origin: Node, destination: Node, weight: number) {
    super(origin.position.x,
          origin.position.y,
          `${ origin.name } -> ${ destination.name }`);

    this.origin = origin;
    this.destination = destination;
    this.weight = weight;
  }

  setWeight(n: number) {
    this.weight = n;
  }

  getWeight() {
    return this.weight;
  }

  get nodes() {
    return {
      origin: this.origin,
      destination: this.destination,
    }
  }
}