import { Component } from "./Component";
import { Node } from "./Node";
import { AlgoOption } from "../Visualizer";

export class Line extends Component {
  private origin: Node;
  private destination: Node;
  private _weight: number;
  private _direction: AlgoOption;

  constructor(origin: Node, destination: Node, weight: number, direction: AlgoOption) {
    super(origin.position.x,
          origin.position.y,
          `${ origin.name } -> ${ destination.name }`);

    this.origin = origin;
    this.destination = destination;
    this._weight = weight;
    this._direction = direction;
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

  get direction() {
    return this._direction;
  }

  set direction(d: AlgoOption) {
    this._direction = d;
  }
}