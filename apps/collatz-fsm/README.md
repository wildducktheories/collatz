# collatz-fsm

An interactive 3D visualisation of the mod-8 finite state machine (FSM) underlying the odd Collatz map T(n) = (3n+1) / 2^v₂(3n+1).

## What it shows

The Collatz orbit of a starting value *a₀* is traced step-by-step through a 3D FSM whose nodes are the four odd mod-8 residues {1, 3, 5, 7}, plus an *init* node (north pole) and a *final* node (south pole).

- **Nodes** sit on a sphere: 1, 5, 7 on the equatorial circle, 3 at the origin, *init* at the north pole, *final* at the south pole.
- **Edges** are great-circle arcs on the sphere (or radii for edges through node 3).
- **Edge brightness** accumulates as edges are traversed — the visual record of the orbit builds up over time.
- **Pulse token** travels along each edge as the step plays, coloured by the mod-24 residue of the current value and lerping to the next.
- **HUD** shows the current step index, value aₙ, mod-8 residue, odd-step count *o*, even-step count *e*, and excess β = e − o.

## Usage

```
# development
npm install
npm run dev

# production build
npm run build
```

Open `http://localhost:5173` (or the port Vite reports). Pass `?a=N` to set the starting value (default 27).

Use the **prev / play / next** controls and the speed selector to step through the orbit. Drag to orbit the camera.

## Mathematical background

See [A Regular Expression Language for the Collatz Graph](../../papers/33-architecture/) for the theory underlying the FSM structure, including the mod-8 step taxonomy and the threefold symmetry of the transition graph.
