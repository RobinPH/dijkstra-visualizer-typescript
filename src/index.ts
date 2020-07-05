import { Node } from "./Component/Node";
import { Visualizer } from "./Visualizer";

const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;

const visualizer = new Visualizer(canvas);
const node1 = new Node(100, 100, "node-1");
const node2 = new Node(20, 40, "node-2");
const node3 = new Node(80, 60, "node-3");
const node4 = new Node(80, 200, "node-4");
const node5 = new Node(150, 300, "node-5");

visualizer.addNode(node1);
visualizer.addNode(node2);
visualizer.addNode(node3);
visualizer.addNode(node4);
visualizer.addNode(node5);

visualizer.addConnection(node1, node2, 5);
visualizer.addConnection(node2, node3, 5);
visualizer.addConnection(node3, node1, 7);
visualizer.addConnection(node3, node4, 10);
visualizer.addConnection(node3, node5, 22);
visualizer.addConnection(node5, node4, 69);
visualizer.addConnection(node5, node2, 1);
visualizer.addConnection(node5, node1, 0.5);