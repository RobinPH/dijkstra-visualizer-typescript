import { Node } from "./Component/Node";
import { Visualizer } from "./Visualizer";

const visualizer = new Visualizer("#canvas");
const node1 = new Node(100, 100, 26, "A");
const node2 = new Node(150, 150, 26, "B");
const node3 = new Node(200, 200, 26, "C");
const node4 = new Node(250, 250, 26, "D");
// const node5 = new Node(300, 300, 26, "E");
// const node6 = new Node(350, 250, 26, "F");
// const node7 = new Node(250, 150, 26, "G");

visualizer.addExistingNode(node1);
visualizer.addExistingNode(node2);
visualizer.addExistingNode(node3);
visualizer.addExistingNode(node4);
// visualizer.addExistingNode(node6);
// visualizer.addExistingNode(node7);
// visualizer.addExistingNode(node5);

// visualizer.addConnection(node1, node2, 5);
// visualizer.addConnection(node1, node7, 0.1);
// visualizer.addConnection(node7, node5, 0.1);
// visualizer.addConnection(node2, node3, 5);
// visualizer.addConnection(node4, node3, 0.1);
// visualizer.addConnection(node3, node6, 0.1);
// visualizer.addConnection(node4, node5, 5);
// visualizer.addConnection(node4, node6, 1);
// visualizer.addConnection(node6, node5, 1);
// visualizer.addConnection(node2, node7, 1);
// visualizer.addConnection(node7, node4, 1);

visualizer.addConnection(node1, node3, 1);
visualizer.addConnection(node3, node2, 1);
visualizer.addConnection(node2, node4, 1);
visualizer.addConnection(node3, node4, 10);