import { Algorithm } from "./Algorithm";
import { Node } from "../Component/Node";
import { AlgoOption } from "../Visualizer";

export class Dijkstra extends Algorithm {
  constructor() {
    super();
  }

  start(start: Node, end: Node) {
    const map: Map<Node, { distance: number; pathVia: Node | null }> = new Map();
    const open: Node[] = [ start ];
    const closed: Node[] = [];
    
    while (open.length > 0) {
      const checkingNode = open.shift();
      closed.push(checkingNode!);

      checkingNode?.childrens.forEach(({ weight, direction, nodes: { origin } }, children) => {
        if (children == start || closed.includes(children)) return;
        if (origin === children && direction !== AlgoOption.BIDIRECTIONAL) return;
        const childrenData = map.get(children);
        const checkingNodeDistance = checkingNode == start ? 0 : map.get(checkingNode)!.distance;
        
        if (childrenData != null ? childrenData.distance > weight + checkingNodeDistance : true) {
          map.set(children, {
            distance: weight + checkingNodeDistance,
            pathVia: checkingNode,
          })
        }

        if (!open.includes(children)) open.push(children);
      })

      open.sort((a, b) => map.get(a)!.distance - map.get(b)!.distance);
    }

    const path: Node[] = new Array();

    if (map.get(end)?.pathVia == null) return path;
    
    for (let pathVia = end; pathVia != null && pathVia != start; pathVia = map.get(pathVia)?.pathVia!) {
      path.push(pathVia)
    }
    path.push(start);
    return path.reverse();
  }
}