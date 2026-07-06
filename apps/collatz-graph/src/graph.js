import ForceGraph3D from '3d-force-graph';
import { makeNode, walkOeeeFreeTo0mod3, oeeeSeed, pathTo1, T } from './collatz.js';

export function createGraph(container, seedNode = null) {
  let graphNodes = [];
  let graphLinks = [];

  const nodeMap = new Map();
  const edgeSet  = new Set();

  function addNode(n, pos = null) {
    if (nodeMap.has(n)) return;
    const nd = makeNode(n);
    if (pos) { nd.x = pos.x; nd.y = pos.y; nd.z = pos.z; }
    graphNodes.push(nd);
    nodeMap.set(n, nd);
  }

  function addEdge(s, t) {
    const key = `${s}->${t}`;
    if (edgeSet.has(key)) return;
    graphLinks.push({ source: s, target: t });
    edgeSet.add(key);
    const nd = nodeMap.get(s);
    if (nd && nd._next == null) nd._next = t;
  }

  // Seed: plot only the path a -> T(a) -> ... -> 1, or just node 1 if no seed
  if (seedNode != null) {
    const path = pathTo1(seedNode);
    for (const n of path) addNode(n);
    for (let i = 0; i + 1 < path.length; i++) addEdge(path[i], path[i + 1]);
  } else {
    addNode(1);
  }

  const Graph = ForceGraph3D()(container)
    .backgroundColor('#111111')
    .nodeVal(d => d.isMult3 ? d.r * d.r * 2.2 : d.r * d.r)
    .nodeColor(d => d.color)
    .nodeOpacity(1.0)
    .nodeLabel(d => `${d.id} &nbsp; mod8=${d.mod8} &nbsp; mod3=${d.mod3} &nbsp; mod24=${d.id % 24}`)
    .linkColor(() => '#7799bb')
    .linkOpacity(0.8)
    .linkWidth(1.5)
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(1)
    .linkDirectionalArrowColor(() => '#aabbcc')
    .graphData({ nodes: graphNodes, links: graphLinks })
    .onNodeClick(node => expandNode(node));

  setTimeout(() => {
    Graph.d3Force('charge').strength(d => {
      if (d.isRoot) return -30;
      if (d.is5)    return -200;
      return -60;
    });
  }, 100);

  function expandNode(node) {
    const t = node.id;
    const { newNodes, newEdges } = walkOeeeFreeTo0mod3(t);
    const seed = oeeeSeed(t);
    let changed = false;

    for (const n of newNodes) {
      if (!nodeMap.has(n)) {
        addNode(n, {
          x: node.x + (Math.random() - 0.5) * 20,
          y: node.y + (Math.random() - 0.5) * 20,
          z: (node.z || 0) + (Math.random() - 0.5) * 20,
        });
        changed = true;
      }
    }
    for (const e of newEdges) {
      if (!edgeSet.has(`${e.source}->${e.target}`)) {
        addEdge(e.source, e.target);
        changed = true;
      }
    }
    if (seed != null && !nodeMap.has(seed)) {
      addNode(seed, {
        x: node.x + (Math.random() - 0.5) * 20,
        y: node.y + (Math.random() - 0.5) * 20,
        z: (node.z || 0) + (Math.random() - 0.5) * 20,
      });
      if (!edgeSet.has(`${seed}->${t}`)) addEdge(seed, t);
      changed = true;
    }

    if (changed) Graph.graphData({ nodes: graphNodes, links: graphLinks });
  }

  return Graph;
}
