import { Component } from "./Component";
import { Node } from "./Node";

export class Line extends Component {
  private origin: Node;
  private destination: Node;
  private weight: number;

  constructor(origin: Node, destination: Node, weight: number) {
    super(origin.getPosition().x,
          origin.getPosition().y,
          `${ origin.getName() } -> ${ destination.getName() }`);

    this.origin = origin;
    this.destination = destination;
    this.weight = weight;
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