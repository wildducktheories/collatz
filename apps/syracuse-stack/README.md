# Syracuse Stack

An interactive 3D visualisation of the mod-2^k Syracuse FSM with stacked window-index layers.

## What it shows

Odd residues mod M = 2^k are arranged in a funnel layout across four horizontal rings, one per mod-8 class, ordered by growth potential (5 mod 8 innermost → 7 mod 8 outermost). Layers are stacked along the z-axis, with optional logarithmic spacing.

### Modes

**Normal mode** (no `?a=` parameter):

- **t=∞** (t_max slider at 0): the Ω-admitted single-layer pruned graph — only residues whose deterministic Syracuse walk reaches Ω_M or 1 without obstruction.
- **t=1..8**: the window-index stack — nodes (t, r) where n = M·t + r, stacked in layers. A node is t-admitted if its walk stays within [0, t_max] before reaching a terminal.
- **t=∞ toggle**: the full unreduced graph with no admissibility filter.
- **collapse**: animates the stack collapsing layer by layer — each layer's rings flatten then nodes are eliminated with edges migrating down.

**Path mode** (`?a=<odd integer>&k=<3..12>`):

Shows the exact Syracuse path from n = a to 1, decomposed as (t_i, r_i) pairs where t_i = ⌊aᵢ/M⌋ and r_i = aᵢ mod M. Each step of the path is one node and one edge. Layers are sparsely placed at the actual t values visited — the layer axis is labelled by the window index t, not a dense rank.

The collapse animation in path mode merges the sparse layers down to t=0, showing how the path's window indices decrease to 0 as the walk terminates.

## Controls

| Control | Effect |
|---|---|
| a = field | Odd integer to trace (Enter to render; clear + Enter to exit path mode) |
| k slider | Modulus M = 2^k (k = 3..12) |
| t_max slider | 0 = t=∞ view; 1–8 = window stack depth |
| t=∞ toggle | Show full unreduced graph |
| arcs | Curved arcs for within-ring edges |
| log scale | Logarithmic vertical spacing between layers |
| collapse | Animate stack collapse |

### Keyboard shortcuts

| Key | Effect |
|---|---|
| `n` | Follow edge to successor node |
| `p` | Return to previous node |
| `z` | Clear navigation trail |
| `+` / `-` | Double / halve M (increment / decrement k) |

All panels (HUD, controls, keyboard hints, path info) are draggable. The camera perspective is encoded in the `?v=` URL parameter and updated after each orbit/pan/zoom.

## URL parameters

| Parameter | Effect |
|---|---|
| `?k=5` | Set k (default 5) |
| `?t=3` | Set t_max (default 0 = t=∞) |
| `?a=27` | Path mode: trace the Syracuse path from 27 |
| `?v=...` | Camera perspective (base64-encoded, set automatically) |

## Usage

```
npm install
npm run dev    # development server
npm run build  # production build to dist/
```

## Mathematical background

See the FSM pruning and admissibility theory in the project notebooks (`notebooks/fsm-omega-reachability.ipynb`) for the theory underlying Ω-admissibility, window-index t-admissibility, and the G_M* pruned graph.
