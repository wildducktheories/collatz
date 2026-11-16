# Rational Approximants — Mediant Tree Visualiser

An interactive 3D visualisation of the mediant tree of rational approximants for
quadratic irrationals θ = √(n² + k).

## Conceptual framework

### Bounded pairs and the mediant tree

For a target θ > 1, a *bounded pair* (r_{2d}, r_{2d+1}) consists of two
Farey-adjacent rational estimates that bracket θ from above and below:

```
r_{2d}   = e_{2d}   / o_{2d}    (the worse bound)
r_{2d+1} = e_{2d+1} / o_{2d+1}  (the better bound, closer to θ)
```

The app labels these **r0** (worse) and **r1** (better) as shorthand for the
depth-d pair. The Farey determinant Δ = e_{2d+1}·o_{2d} − e_{2d}·o_{2d+1} = ±1
is preserved at every step.

At each depth d the algorithm computes the unique *optimal weight* w* — the
integer such that the weighted mediant r_{2d} + w*·r_{2d+1} first crosses θ.
This yields two children:

- **j** = r_{2d} + (w*−1)·r_{2d+1}  — stays on the same side as r_{2d}
- **k** = r_{2d} + w*·r_{2d+1}      — crosses to the opposite side

The better child (smaller relative error) becomes r_{2d+3}; the other becomes
r_{2d+2}. The sequence r_{2d+1} converges to θ exponentially fast.

### Quadratic irrationals θ² = n² + k

The visualiser enumerates all θ² = n² + k with n ≥ 2, |k| < n, excluding
perfect squares. The parameter k/n ∈ (−1, 1) \ {0} measures how far θ² sits
from the perfect square n².

The *norm* of an approximant e/o is defined as:

```
ν(e, o) = e² − o²θ²
```

For a rational approximant bracketing an irrational θ, the norm is never zero.
Its sign indicates which side of θ the approximant lies on, and its magnitude
measures the quality of the approximation: smaller |ν| means closer to θ relative
to the denominator size.

For integer m = 2n/k (the **k|2n family**), the weight sequence is eventually
periodic with period 2, and the norms follow the pattern (1, −k, 1, −k, …)
for r1 at d ≥ 1. For the **general family** the weight sequence may have longer periods.

### Coordinate system

Each approximant (e, o) at depth d is plotted as a point in 3D polar coordinates:

| Axis | Meaning |
|---|---|
| angle | (k/n)·π — the angular position of θ² in the family |
| radius | log₂(o) — log denominator |
| z | log₂(e) — log numerator (or signed norm when norm mode is on) |

As depth increases, both log₂(o) and log₂(e) grow at the same exponential rate,
so their ratio converges to a constant. Points for a given (n, k) therefore lie
along a ray oriented at angle (k/n)·π in the xy-plane, with slope log₂(e)/log₂(o)
in the z direction.

### Colour scheme

One colour per row of the norm summary table:

| Colour | Meaning |
|---|---|
| Yellow | r1 (better bound), d = 0 |
| Green | r1, d odd (norm = 1 for k\|2n family) |
| Blue | r1, d even > 0 (norm = −k for k\|2n family) |
| Magenta | r0 (worse bound), d = 0 |
| Orange | r0, d ≥ 1 |
| Grey | general family (k ∤ 2n) |

### Reference

The theory is developed in full in:

> J. Seymour, *Mediant Trees for Rational Approximation and Sturmian Word Generation*,
> https://wildducktheories.github.io/collatz/papers/76-rational-approximations/76-rational-approximations.pdf (2026).

## Controls

| Control | Effect |
|---|---|
| n_min / n_max sliders | Range of n values to display |
| k_min / k_max sliders | Range of k values to display |
| depth slider | Maximum mediant tree depth |
| show r0 | Show/hide the worse bound (r_{2d}) at each depth |
| lines | Connect successive depths for each (n, k) with line segments |
| general | Show/hide general family (grey points) |
| norm | Switch z-axis from log₂(e) to signed norm e² − o²θ² |

### Keyboard shortcuts

| Key | Effect |
|---|---|
| `+` / `-` | Increase / decrease depth |

Hover over any point to see θ, n, k, family, type (r0/r1), depth, e, o, and norm.

## Usage

```
npm install
npm run dev    # development server at http://localhost:5173
npm run build  # production build to dist/
```
