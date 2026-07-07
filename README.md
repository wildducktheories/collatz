# Collatz

Jon Seymour \<a\_beautiful\_k\@wildducktheories.com\>

Research notes and papers on the Collatz conjecture.

> *"Mathematics is not yet ready for such problems."* — Paul Erdős

---

## Papers

### Paper 33 — A Regular Expression Language for the Collatz Graph *(working paper)*
[PDF](papers/33-architecture/33-architecture.pdf) | [Source](papers/33-architecture/33-architecture.tex)

The architectural foundation of the four-paper campaign. Constructs the mod-8 step taxonomy
from first principles, defines Steiner circuits, proves the 7-run length theorem and the
mod-24 parity-prefix completeness result, and states the regular-expression conjecture
`((7*3)?(1|5))*` characterising all odd Collatz paths. Proved results are clearly
distinguished from conjectures and material deferred to later papers.

---

### Paper 65 — Steiner Branch Length Distribution *(working paper, speculative stream)*
[PDF](papers/65-branch-distribution/65-branch-distribution.pdf) | [Source](papers/65-branch-distribution/65-branch-distribution.tex)

An empirical investigation of branch length statistics in the mod-8 Steiner circuit graph.
Samples $10^5$ random entry points $n = 8t+5$ and measures the number of Steiner circuits
per branch. The naive geometric$(1/2)$ prediction is decisively rejected; the data fit
$P(\text{length}=k) = \tfrac{1}{3}(3/4)^k$ with high precision. The amplitude and decay
rate are explained structurally via the 3-node 50/50 lemma and a conjectured uniform
entry-state distribution. All claims are explicitly labelled as empirical or conjectural.

---

### Paper 27 — A Regular-Language and Tree Representation of Odd Collatz Dynamics
[PDF](papers/27-5mod8-regex/27-5mon8-regex.pdf)

Introduces the mod-8 step taxonomy and the regular expression `((7*3)?(1|5))*`
characterising odd Collatz paths. *Superseded by the four-paper campaign
(Papers 1, 5, 8, 0 — in preparation). Retained for reference.*

---

### Paper 21 — Extract Parameters
[PDF](papers/21-extract-parameters/extract-parameters.pdf)

---

### Paper 14 — UV Polynomial
[PDF](papers/14-uv-polynomial/uv-polynomial.pdf)

---

### Paper 1 (2023) — A Terminating, Non-Cyclic Path Towards the Collatz Conjecture
[PDF](papers/01-terminating-non-cyclic/paper.pdf) | [Notebook](papers/01-terminating-non-cyclic/paper.ipynb)

Derives the path identity $2^e x_n - 3^o x_0 = k$ and a recurrence relation for $k$.

---

## Apps

### Collatz FSM
[Launch](https://wildducktheories.github.io/collatz/apps/collatz-fsm/dist/) | [Source](apps/collatz-fsm/)

Interactive 3D visualisation of the mod-8 finite state machine underlying the odd Collatz map.
Nodes sit on a sphere with great-circle arc edges; a pulse token traces each step coloured by
mod-24 residue; edge brightness accumulates to leave a visual record of the full orbit.

---

### Collatz Force Graph
[Launch](https://wildducktheories.github.io/collatz/apps/collatz-graph/dist/)

Interactive force-directed visualisation of the Collatz graph.

---

## Contact

Please message [@a\_beautiful\_k](https://twitter.com/a\_beautiful\_k) on Twitter/X
or email a\_beautiful\_k@wildducktheories.com.
