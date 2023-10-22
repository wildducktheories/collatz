# A terminating, non-cyclic* path towards the Collatz conjecture

Jon Seymour \<a_beautiful_k\@wildducktheories.com\>

14 October 2023 (updated: 22 October 2023)

## Abstract

_"Mathematics may not be ready for such problems"_ - Paul Erdős on the Collatz conjecture.

It has long been known that the following identity applies to all paths of the Collatz sequence.

$2^{e}x_{n} - 3^{o}x_{0} = k$

where $x_{0}$ is the initial term and $x_{n}$ is the final term and $e$, $o$ and $k$ are path dependent parameters.

This paper derives a formula for k derived from 3 parameter sequences $m_{n}, o_{n}, e_{n}$.

$m_n = x_n\pmod{2}$

$o_{n} = \sum_{k=0}^{k=n}{m_k}$

$e_{n} = n+1 - o_{n}$

$k_{n} = 2^{e_{n-1}}x_{n}-3^{o_{n-1}}x_0=\sum_{i=0}^{i=n-1}{{2^{e_{i}}3^{o_{n-1}-o_i}m_{i}}}$

The resultant identity is not novel, for example see \[1\], but perhaps the technique by which it was derived may be interesting to some.

We also derive a recurrence relation that expresses each $k_{n}$ in terms of $k_{n-1}$

$k_n = 3^{m_{n-1}}k_{n-1}+2^{e_{n-1}}m_{n-1}$

and show that $k_{0} = 0$


\[1\] [First odd term of the sequence lower odd number $n$ related to the $3\cdot n+1$](https://mathoverflow.net/questions/448397/first-odd-term-of-the-sequence-lower-odd-number-n-related-to-the-3-cdot-n1?_gl=1*wy9ddp*_ga*MTAyNzkyMTgxNy4xNjYyNzY2MzQw*_ga_S812YQPLT2*MTY5NzI4NDUzNi40NS4xLjE2OTcyODUyMTMuMC4wLjA.) on [Maths Overflow Net](https://mathoverflow.net/)

# full text

[Notebook](papers/01-terminating-non-cyclic/paper.ipynb), [PDF](papers/01-terminating-non-cyclic/paper.pdf)

# discussion

Please message [@a_beautiful_k](https://twitter.com/a_beautiful_k) on Twitter/X if you would like to comment upon or ask questions about this paper. Other correspondence should be directed by email to authors c/- a_beautiful_k@wildducktheories.com.
