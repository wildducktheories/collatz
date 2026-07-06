// Pure Collatz arithmetic — no DOM or graph dependencies

export const MOD8_COLOR = {
  1: '#4caf50',
  3: '#2196f3',
  5: '#f44336',
  7: '#ff9800',
};

function hexToRgb(hex) {
  const c = parseInt(hex.slice(1), 16);
  return [(c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff];
}

// Full-opacity base colour (hex)
export function nodeColorHex(n) {
  if (n === 1) return '#ffffff';
  return MOD8_COLOR[n % 8] || '#aaaaaa';
}

// rgba string with per-class opacity:
//   0 mod 3 (leaves) → high opacity
//   everything else  → low opacity
export function nodeColor(n) {
  if (n % 3 === 0) {
    // Leaves — dim
    const [r, g, b] = hexToRgb(nodeColorHex(n));
    return `rgba(${Math.min(255,r+70)},${Math.min(255,g+70)},${Math.min(255,b+70)},0.25)`;
  }
  // Interior/clickable nodes — bright
  const [r, g, b] = hexToRgb(nodeColorHex(n));
  return `rgba(${r},${g},${b},0.95)`;
}

export function nodeRadius(n) {
  if (n === 1) return 6;
  if (n % 8 === 5) return 5;
  return 3;
}

export function makeNode(n) {
  const isMult3 = n % 3 === 0;
  return {
    id: n,
    label: String(n),
    mod3: n % 3,
    mod8: n % 8,
    color: nodeColor(n),
    r: nodeRadius(n),
    is5: n % 8 === 5,
    isRoot: n === 1,
    isMult3,
  };
}

// T(n) for odd n
export function T(n) {
  let m = 3 * n + 1;
  while (m % 2 === 0) m /= 2;
  return m;
}

// Predecessor of t under T with exactly k halvings: n = (2^k * t - 1) / 3
// Returns null if not a valid positive odd integer.
export function pred(t, k) {
  const num = (2 ** k) * t - 1;
  if (num <= 0 || num % 3 !== 0) return null;
  const n = num / 3;
  return n % 2 === 0 ? null : n;
}

// Unique OEEE-free predecessor (v2 in {1,2}; exactly one valid by mod-3 arithmetic).
// t≡2 mod 3 → v2=1 (O step); t≡1 mod 3 → v2=2 (OE step); t≡0 mod 3 → none.
export function oeeeFreeP(t) {
  return pred(t, 1) ?? pred(t, 2);
}

// Unique OEEE seed predecessor (v2 in {3,4}; exactly one valid).
export function oeeeSeed(t) {
  return pred(t, 3) ?? pred(t, 4);
}

// Walk OEEE-free from startT upward until hitting a 0 mod 3 node (inclusive).
export function walkOeeeFreeTo0mod3(startT) {
  const newEdges = [];
  const newNodes = [];
  let current = startT;
  for (let i = 0; i < 200; i++) {
    const p = oeeeFreeP(current);
    if (p === null) break;
    newEdges.push({ source: p, target: current });
    newNodes.push(p);
    if (p % 3 === 0) break;
    current = p;
  }
  return { newNodes, newEdges };
}

// Return the sequence [a, T(a), T^2(a), ..., 1] for an odd starting node a.
export function pathTo1(a) {
  const path = [];
  let current = a % 2 === 0 ? null : a; // must be odd
  if (current === null) return path;
  for (let i = 0; i < 10000; i++) {
    path.push(current);
    if (current === 1) break;
    current = T(current);
  }
  return path;
}

// Build the initial graph for odd n in [1, N].
// For every node that enters the set (including T-images), follow its path to 1
// so there are no disconnected nodes missing a forward edge.
export function buildInitialGraph(N = 200) {
  const nodeSet = new Set();
  const edgeMap = new Map(); // source -> target, deduped

  // Seed with all odd n up to N
  for (let n = 1; n <= N; n += 2) nodeSet.add(n);

  // Expand: for every node in the set, follow its path until we hit a node
  // already in the set (which already has its edge) or reach 1.
  const toProcess = [...nodeSet];
  while (toProcess.length > 0) {
    const n = toProcess.pop();
    if (n === 1) continue;
    if (edgeMap.has(n)) continue; // already processed
    const t = T(n);
    edgeMap.set(n, t);
    if (!nodeSet.has(t)) {
      nodeSet.add(t);
      toProcess.push(t);
    }
  }

  const nodes = [...nodeSet].sort((a, b) => a - b).map(makeNode);
  const links = [...edgeMap.entries()].map(([s, t]) => ({ source: s, target: t }));
  return { nodes, links };
}
