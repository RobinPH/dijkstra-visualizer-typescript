import { Node } from "./Component/Node";
import { Visualizer, AlgoOption } from "./Visualizer";

const visualizer = new Visualizer("#canvas");
const node1 = new Node(153, 75, 15, "S");
const node2 = new Node(46, 137, 15, "A");
const node3 = new Node(155, 189, 15, "B");
const node4 = new Node(320, 110, 15, "C");
const node5 = new Node(46, 274, 15, "D");
const node6 = new Node(75, 379, 15, "F");
const node7 = new Node(226, 407, 15, "G");
const node8 = new Node(165, 308, 15, "H");
const node9 = new Node(342, 282, 15, "I");
const node10 = new Node(457, 282, 15, "J");
const node11 = new Node(402, 357, 15, "K");
const node12 = new Node(397, 205, 15, "L");
const node13 = new Node(336, 437, 15, "E");

visualizer.addExistingNode(node1);
visualizer.addExistingNode(node2);
visualizer.addExistingNode(node3);
visualizer.addExistingNode(node4);
visualizer.addExistingNode(node5);
visualizer.addExistingNode(node6);
visualizer.addExistingNode(node7);
visualizer.addExistingNode(node8);
visualizer.addExistingNode(node9);
visualizer.addExistingNode(node10);
visualizer.addExistingNode(node11);
visualizer.addExistingNode(node12);
visualizer.addExistingNode(node13);

visualizer.addConnection(node1, node2, 7, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node1, node3, 2, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node1, node4, 3, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node2, node3, 3, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node2, node5, 4, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node3, node5, 4, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node3, node8, 1, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node4, node12, 2, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node12, node9, 4, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node12, node10, 4, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node9, node10, 6, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node9, node11, 4, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node10, node11, 4, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node11, node13, 5, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node5, node6, 5, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node6, node8, 3, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node8, node7, 2, AlgoOption.DIRECTIONAL);
visualizer.addConnection(node7, node13, 2, AlgoOption.DIRECTIONAL);

// const node1 = new Node(50, 50, 15, "S");
// const node2 = new Node(50 + 30 * 5, 50 + 40 * 5, 15, "S");

// visualizer.addExistingNode(node1);
// visualizer.addExistingNode(node2);

// visualizer.addConnection(node1, node2, 5);