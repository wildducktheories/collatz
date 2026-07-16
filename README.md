# Collatz

Jon Seymour \<a\_beautiful\_k\@wildducktheories.com\>

Research notes and papers on the Collatz conjecture.

> *"Mathematics is not yet ready for such problems."* — Paul Erdős

---

## Papers

### Paper 64 — Rigidity of the Syracuse Transition Matrix *(working paper)*
[PDF](https://wildducktheories.github.io/collatz/papers/64-transitions/64-transitions.pdf) | [Source](https://wildducktheories.github.io/collatz/papers/64-transitions/64-transitions.tex)

Proves that the Syracuse transition matrix $T[M]$ — whose $(r,j)$ entry is the
probability that $S(n) \equiv j \pmod{M}$ given $n \equiv r \pmod{M}$ — is
*almost entirely rigid*: for each odd residue $r$ with $v_2(3r+1) = v$, row $r$
is an exact arithmetic identity (independent of any measure or corpus) whenever
$2^{v+1} \mid M$ (ordinary integer divisibility). In that case every odd
$n \equiv r \pmod{M}$ has $v_2(3n+1) = v$ exactly, and the reachable targets
form an arithmetic progression of length $2^v$, each hit with probability
exactly $1/2^v$.

The only non-rigid rows are the *exceptional* residues — those for which $2^{v+1} \nmid M$.
At $M = 2^k$ there is exactly one such residue class, represented by
$r_k = (4^k-1)/3$. The sequence $r_1, r_2, \ldots = 1, 5, 21, 85, \ldots$
converges 2-adically to $-1/3$ — the singularity of the Syracuse map where
$3n+1 = 0$ and $v_2(3n+1) = +\infty$. All main claims machine-verified in
Lean 4/Mathlib by the Aristotle automated proof assistant.

---

### Paper 71 — The Structural Polynomial of a Parity Sequence and Its Applications *(working paper)*
[PDF](https://wildducktheories.github.io/collatz/papers/71-structural-polynomial/71-structural-polynomial.pdf) | [Source](https://wildducktheories.github.io/collatz/papers/71-structural-polynomial/71-structural-polynomial.tex)

Develops a polynomial representation for parity sequences of generalised Collatz-type maps
$(g,h,q)$, working in the ring $\mathbb{Z}[g,h]$ rather than specialising immediately to
numerical values. The central object is the *structural polynomial* $k_w(g,h)$, which encodes
the accumulated additive contribution of the odd steps independently of the parameter $q$.

The main results are: (1) a *path identity* $h^e b = g^o a + q\,k_w(g,h)$; (2) a *geometric
polynomial theorem* showing that Steiner words $\mathrm{St}(\alpha,\beta)$ have
$k(g,h) = (g^\alpha - h^\alpha)/(g-h)$, independent of $\beta$; (3) a *composition rule*
$k_{Q\circ P} = g^{o_Q} k_P + h^{e_P} k_Q$; and (4) a *cycle element identity*
$a = q\,k_w/(h^e - g^o)$ giving the fixed point as a rational function of $(g,h,q)$.

Beyond these core results, the paper develops a system of five equivalent representations of
any parity sequence — its bits (the $p$-value), the structural polynomial $k_w(g,h)$, its
specialisation $k_w(3,2)$, the $\sigma$-polynomial $\sigma_w(u,v)$, and the Collatz orbit
$\phi_w$ — connected by explicitly invertible transformations, and unifies them in a single
diagram. A key illustration is the $5x+1$ cycle at $17$: the cycle element emerges as
$a = 1 \cdot 51/3 = 17$, where the near-miss $2^7 - 5^3 = 3$ is the arithmetic accident
that makes the cycle possible, visible as a polynomial phenomenon.

---

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
