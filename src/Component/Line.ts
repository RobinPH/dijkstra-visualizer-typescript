import { Component } from "./Component";
import { Node } from "./Node";

export class Line extends Component {
  private origin: Node;
  private destination: Node;
  private _weight: number;

  constructor(origin: Node, destination: Node, weight: number) {
    super(origin.position.x,
          origin.position.y,
          `${ origin.name } -> ${ destination.name }`);

    this.origin = origin;
    this.destination = destination;
    this._weight = weight;
  }

  set weight(weight: number) {
    this._weight = weight;
  }

  get weight() {
    return this._weight;
  }

  get nodes() {
    return {
      origin: this.origin,
      destination: this.destination,
    }
  }
}