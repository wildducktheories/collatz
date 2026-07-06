import { buildSteps } from './collatz.js';
import { buildScene } from './scene.js';

// --- Parse ?a= param, default 27 ---
const params = new URLSearchParams(window.location.search);
if (!params.has('a')) {
  params.set('a', '27');
  window.location.replace('?' + params.toString());
}

const a0 = parseInt(params.get('a'), 10);
const steps = buildSteps(a0);

function fsmState(step) { return step.state; }

const canvas = document.getElementById('canvas');
const scene = buildScene(canvas);

// HUD elements
const hA0   = document.getElementById('h-a0');
const hStep = document.getElementById('h-step');
const hAn   = document.getElementById('h-an');
const hMod8 = document.getElementById('h-mod8');
const hO    = document.getElementById('h-o');
const hE    = document.getElementById('h-e');
const hBeta = document.getElementById('h-beta');

hA0.textContent = a0;

let cur = 0;
let playing = false;
let playTimer = null;
let pulseTimer = null;

// Precompute traversal counts for every prefix length
// traversalHistory[i] = Map(edgeKey -> count) after visiting step i
const traversalHistory = (() => {
  const history = [];
  const counts = new Map();
  for (let i = 0; i < steps.length; i++) {
    if (i > 0) {
      const from = fsmState(steps[i - 1]);
      const to   = fsmState(steps[i]);
      const key  = `${from}->${to}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    history.push(new Map(counts));
  }
  return history;
})();

function updateHUD(i) {
  const s = steps[i];
  hStep.textContent = i;
  hAn.textContent   = s.value;
  hMod8.textContent = s.mod8;
  hO.textContent    = s.o;
  hE.textContent    = s.e;
  hBeta.textContent = s.beta;
}

function showStep(i) {
  cur = Math.max(0, Math.min(steps.length - 1, i));
  updateHUD(cur);

  scene.hidePulse();

  scene.setEdgeCounts(traversalHistory[cur]);

  const state = fsmState(steps[cur]);
  scene.highlightNode(state);

  // Animate pulse along the edge from prev state to current state
  if (cur > 0) {
    const prevState = fsmState(steps[cur - 1]);
    animatePulse(prevState, state, steps[cur - 1].mod24, steps[cur].mod24);
  }
}

function animatePulse(from, to, fromMod24, toMod24) {
  clearInterval(pulseTimer);
  let t = 0;
  pulseTimer = setInterval(() => {
    t += 0.025;
    if (t >= 1) {
      clearInterval(pulseTimer);
      scene.hidePulse();
      // Redraw edges at count-based brightness with no active highlight
      scene.setEdgeCounts(traversalHistory[cur]);
      return;
    }
    scene.animatePulse(from, to, t, fromMod24, toMod24);
  }, 16);
}

function stepForward() {
  if (cur < steps.length - 1) showStep(cur + 1);
  else stopPlay();
}

function stepBack() {
  if (cur > 0) showStep(cur - 1);
}

function startPlay() {
  playing = true;
  document.getElementById('btn-play').textContent = '⏸ pause';
  const ms = parseInt(document.getElementById('speed').value);
  playTimer = setInterval(() => {
    if (cur >= steps.length - 1) { stopPlay(); return; }
    stepForward();
  }, ms);
}

function stopPlay() {
  playing = false;
  clearInterval(playTimer);
  document.getElementById('btn-play').textContent = '▶ play';
}

document.getElementById('btn-play').addEventListener('click', () => {
  if (playing) stopPlay(); else startPlay();
});
document.getElementById('btn-next').addEventListener('click', () => { stopPlay(); stepForward(); });
document.getElementById('btn-prev').addEventListener('click', () => { stopPlay(); stepBack(); });

// Initialise at step 0
showStep(0);
