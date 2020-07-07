import { Component } from "./Component";
import { Node } from "./Node";
import { AlgoOption } from "../Visualizer";

export class Line extends Component {
  private origin: Node;
  private destination: Node;
  private _weight: number;
  private _weighted: Boolean = false;
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
    if (this._weighted) {
      return this._weight;  
    } else {
      const { position: { x: x1, y: y1 } } = this.origin;
      const { position: { x :x2, y: y2 } } = this.destination;
      return Math.hypot(x1 - x2, y1 - y2);
    }
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

  set weighted(b: Boolean) {
    this._weighted = b;
  }
}