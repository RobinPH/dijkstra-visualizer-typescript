import { Node } from "./Component/Node";
import { Visualizer } from "./Visualizer";

const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;

const visualizer = new Visualizer(canvas);
const node = new Node(50, 50, "node-1");
const node2 = new Node(70, 70, "node-1");
const node3 = new Node(80, 60, "node-1");

visualizer.addNode(node);
visualizer.addNode(node2);
visualizer.addNode(node3);

node.addChildren(node2);
node2.addChildren(node3);
node3.addChildren(node);