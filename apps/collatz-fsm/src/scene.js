import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MOD8_COLOR, MOD24_COLOR } from './collatz.js';

const R = 2.5;   // sphere/circle radius
const NODE_R = 0.18;

// Node positions — 1/5/7 on sphere of radius R; 3 at origin
export const POSITIONS = {
  1: new THREE.Vector3(R * Math.cos(Math.PI/3),  R * Math.sin(Math.PI/3),  0),
  3: new THREE.Vector3(0, 0, 0),
  5: new THREE.Vector3(R * Math.cos(-Math.PI/3), R * Math.sin(-Math.PI/3), 0),
  7: new THREE.Vector3(-R, 0, 0),
};

// Nodes on the sphere surface (great-circle arcs between these)
const ON_SPHERE = new Set([1, 5, 7]);

const STATE_COLOR = { ...MOD8_COLOR };

// All directed edges of the FSM
const EDGES = [
  { from: 7, to: 3 },
  { from: 3, to: 1 },
  { from: 3, to: 5 },
  // bidirectional
  { from: 1, to: 5 },
  { from: 5, to: 1 },
  // back-links
  { from: 1, to: 7 },
  { from: 5, to: 7 },
  { from: 1, to: 3 },
  { from: 5, to: 3 },
  // self-loops
  { from: 7, to: 7 },
  { from: 1, to: 1 },
  { from: 5, to: 5 },
];

function edgeKey(from, to) { return `${from}->${to}`; }

export function buildScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, -6, 4);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Ambient + directional light
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 5, 5);
  scene.add(dir);

  // --- Nodes ---
  const nodeMeshes = {};
  const nodeGlow = {};

  for (const [key, pos] of Object.entries(POSITIONS)) {
    const color = STATE_COLOR[key] || '#aaaaaa';
    const geo = new THREE.SphereGeometry(NODE_R, 32, 32);
    const mat = new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.85 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    scene.add(mesh);
    nodeMeshes[key] = mesh;

    // glow ring (initially invisible)
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(NODE_R * 1.3, NODE_R * 1.7, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0 })
    );
    ring.position.copy(pos);
    scene.add(ring);
    nodeGlow[key] = ring;

    const label = makeLabel(String(key));
    label.position.copy(pos).add(new THREE.Vector3(0, 0, NODE_R + 0.15));
    scene.add(label);
  }

  // --- Edges ---
  const edgeMeshes = {};
  const edgePoints = {};  // key -> Vector3[] for pulse sampling

  for (const { from, to } of EDGES) {
    const key = edgeKey(from, to);
    const fromPos = POSITIONS[from];
    const toPos = POSITIONS[to];
    const isSphereArc = from !== to && ON_SPHERE.has(from) && ON_SPHERE.has(to);
    const { line, points } = makeLine(fromPos, toPos, from === to, isSphereArc);
    scene.add(line);
    edgeMeshes[key] = line;
    edgePoints[key] = points;
  }

  // --- Pulse (animated sphere on active edge) ---
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), pulseMat);
  scene.add(pulseMesh);

  // Colours for current lerp
  const _pulseFrom = new THREE.Color();
  const _pulseTo   = new THREE.Color();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  let animFrame;
  function animate() {
    animFrame = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  return {
    highlightNode(key) {
      for (const [k, ring] of Object.entries(nodeGlow)) {
        ring.material.opacity = k == key ? 0.8 : 0;
      }
      // Orient glow ring to face camera
      if (key != null && nodeGlow[key]) {
        nodeGlow[key].lookAt(camera.position);
      }
    },

    animatePulse(from, to, progress, fromMod24, toMod24) {
      const fPos = POSITIONS[from];
      const tPos = POSITIONS[to];
      if (!fPos || !tPos) return;
      pulseMat.opacity = 1;
      // Sample the exact same points array used to draw the edge
      const key = edgeKey(from, to);
      const pts = edgePoints[key];
      if (pts && pts.length >= 2) {
        const idx = progress * (pts.length - 1);
        const lo = Math.floor(idx);
        const hi = Math.min(lo + 1, pts.length - 1);
        const f = idx - lo;
        pulseMesh.position.lerpVectors(pts[lo], pts[hi], f);
      } else {
        pulseMesh.position.lerpVectors(fPos, tPos, progress);
      }
      // Lerp mod-24 colour
      const fc = MOD24_COLOR[fromMod24] ?? '#ffffff';
      const tc = MOD24_COLOR[toMod24]   ?? '#ffffff';
      _pulseFrom.set(fc);
      _pulseTo.set(tc);
      pulseMat.color.lerpColors(_pulseFrom, _pulseTo, progress);
    },

    hidePulse() {
      pulseMat.opacity = 0;
    },

    setEdgeCounts(_counts) {
      for (const line of Object.values(edgeMeshes)) {
        line.material.color.set(0x88aacc);
        line.material.opacity = 0.9;
      }
    },
  };
}

function makeLine(a, b, isSelf, isSphereArc) {
  let points;
  if (isSelf) {
    // Small loop above the node
    points = [];
    for (let i = 0; i <= 32; i++) {
      const t = (i / 32) * Math.PI * 2;
      points.push(new THREE.Vector3(
        a.x + NODE_R * 1.2 * Math.cos(t),
        a.y + NODE_R * 1.2 * Math.sin(t),
        a.z + NODE_R * 2.5 + NODE_R * 1.2 * Math.sin(t)
      ));
    }
  } else if (isSphereArc) {
    // Great-circle arc on the sphere of radius R — slerp unit vectors
    const ua = a.clone().normalize();
    const ub = b.clone().normalize();
    const omega = Math.acos(Math.max(-1, Math.min(1, ua.dot(ub))));
    const N = 48;
    points = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      let p;
      if (omega < 1e-6) {
        p = ua.clone().lerp(ub, t);
      } else {
        const s = Math.sin(omega);
        p = ua.clone().multiplyScalar(Math.sin((1 - t) * omega) / s)
              .addScaledVector(ub, Math.sin(t * omega) / s);
      }
      points.push(p.multiplyScalar(R));
    }
  } else {
    // Straight line — radii to node 3
    points = [a.clone(), b.clone()];
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color: 0x88aacc, transparent: true, opacity: 0.9 });
  return { line: new THREE.Line(geo, mat), points };
}

function makeLabel(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 32, 32);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(0.4, 0.4, 1);
  return sprite;
}
