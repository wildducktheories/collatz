# Collatz

Jon Seymour \<a\_beautiful\_k\@wildducktheories.com\>

Research notes and papers on the Collatz conjecture.

> *"Mathematics is not yet ready for such problems."* — Paul Erdős

---

## Papers

### Paper 67 — First-Principles Derivation of the Steiner Sentence Length Distribution *(working paper)*
[PDF](https://wildducktheories.github.io/collatz/papers/67-branch-length-distribution/67-branch-length-distribution.pdf) | [Source](https://wildducktheories.github.io/collatz/papers/67-branch-length-distribution/67-branch-length-distribution.tex)

Proves that Steiner sentences in the Syracuse graph have length distribution
$P(\text{sentence length} = k) = 3^{k-1}/4^k$ for all $k \geq 1$.
A Steiner sentence is the maximal sequence of Steiner circuits between consecutive
nodes $\equiv 5 \pmod{8}$; each circuit in the sentence is a Steiner word.

The proof requires no ergodic theory and no appeal to the Collatz conjecture.
It rests on two classical arithmetic facts: the exact Syracuse transition matrix
mod 8 (rows 1 and 5 are uniform via $\gcd(3,2^j)=1$; rows 3 and 7 have forbidden
transitions forced by mod-16 arithmetic), and a structural invariant $d_3 = d_7$
(equal weight on residue classes 3 and 7 in the surviving distribution) that is
preserved unconditionally by the matrix. Given $d_3 = d_7$, the surviving mass
decays by exactly $3/4$ per step, yielding the formula.

Appendix A provides complete empirical validation: $10^5$ sentences sampled uniformly
over $[1, 10^{15}]$, chi-squared tests (naive $(1/2)^k$: $\chi^2 \approx 10^6$,
rejected; theory: $\chi^2 = 12.9$, $p = 0.61$, consistent), and figures on both
linear and log scales. Supersedes Paper 65.

---

### Paper 66 — 2-adic Valuations of $3n+1$ by Residue Class mod 8 *(working paper)*
[PDF](https://wildducktheories.github.io/collatz/papers/66-syracuse-geometric-means/66-syracuse-geometric-means.pdf) | [Source](https://wildducktheories.github.io/collatz/papers/66-syracuse-geometric-means/66-syracuse-geometric-means.tex)

Proves that the 2-adic valuation $v_2(3n+1)$ under the Syracuse map is exactly
determined — or has an exactly determined expectation — by $n \bmod 8$:
classes 1, 3, 7 have constant valuations 2, 1, 1 (pointwise, for every $n$);
class 5 has exact expected valuation 4 (under natural density),
proved via $\gcd(3, 2^j) = 1$ and the tail-sum formula.

A corollary is the balance identity $c_1 + c_3 + c_5 + c_7 = 8$, whose
multiplicative form $3^4/2^8 = (3/4)^4$ shows the geometric mean of the four
asymptotic contraction ratios $3/2^{c_r}$ equals $3/4$ — the same $3/4$ that
governs the sentence length distribution of Paper 67.

Also proved: the full distribution $P(v_2(3n+1) = j \mid n \equiv 5 \pmod{8}) = 1/2^{j-2}$
for $j \geq 3$ (Proposition 4.1). All results machine-verified in Lean 4/Mathlib
by the Aristotle automated proof assistant.

---

### Paper 33 — A Regular Expression Language for the Collatz Graph *(working paper)*
[PDF](https://wildducktheories.github.io/collatz/papers/33-architecture/33-architecture.pdf) | [Source](https://wildducktheories.github.io/collatz/papers/33-architecture/33-architecture.tex)

The architectural foundation of the programme. Constructs the mod-8 step taxonomy
from first principles, defines Steiner circuits, proves the 7-run length theorem and the
mod-24 parity-prefix completeness result, and states the regular-expression conjecture
`((7*3)?(1|5))*` characterising all odd Collatz paths. Proved results are clearly
distinguished from conjectures and material deferred to later papers.

---

### Paper 65 — The $3^{k-1}/4^k$ Distribution of Steiner Sentence Lengths *(superseded)*
[PDF](https://wildducktheories.github.io/collatz/papers/65-branch-distribution/65-branch-distribution.pdf) | [Source](https://wildducktheories.github.io/collatz/papers/65-branch-distribution/65-branch-distribution.tex)

The first attempt: an empirical discovery that Steiner sentence lengths follow
$P(k) = 3^{k-1}/4^k$ rather than the naive $(1/2)^k$. Samples $10^5$ random
entry points, confirms uniform sentence-start distribution, and reports chi-squared
tests decisively rejecting the naive model. Both conjectures stated here are proved
in Paper 67, which supersedes this paper and incorporates its experimental record.

---

### Paper 27 — A Regular-Language and Tree Representation of Odd Collatz Dynamics
[PDF](https://wildducktheories.github.io/collatz/papers/27-5mod8-regex/27-5mon8-regex.pdf)

Introduces the mod-8 step taxonomy and the regular expression `((7*3)?(1|5))*`
characterising odd Collatz paths. *Superseded by the four-paper campaign
(Papers 1, 5, 8, 0 — in preparation). Retained for reference.*

---

### Paper 21 — Extract Parameters
[PDF](https://wildducktheories.github.io/collatz/papers/21-extract-parameters/extract-parameters.pdf)

---

### Paper 14 — UV Polynomial
[PDF](https://wildducktheories.github.io/collatz/papers/14-uv-polynomial/uv-polynomial.pdf)

---

### Paper 1 (2023) — A Terminating, Non-Cyclic Path Towards the Collatz Conjecture
[PDF](https://wildducktheories.github.io/collatz/papers/01-terminating-non-cyclic/paper.pdf) | [Notebook](https://wildducktheories.github.io/collatz/papers/01-terminating-non-cyclic/paper.ipynb)

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
