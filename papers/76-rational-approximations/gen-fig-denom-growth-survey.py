#!/usr/bin/env python3
"""Generate fig-denom-growth-survey.pdf for Paper 76.

Plots log2(o) vs depth d for both siblings o_{2d} (older) and o_{2d+1} (younger)
across several well-known irrationals.  Overlays the proved lower bound

    log2(o) >= m_min * d + log2(2/3),   m_min = (1/2)*log2(10/3) ~ 0.869

from Corollaries 11.16 and 11.17.  No reference to e+o anywhere.

Run from the papers/76-rational-approximations/ directory:
    python3 gen-fig-denom-growth-survey.py
"""

import math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# ---------------------------------------------------------------------------
# Mediant tree — yields (depth, o_older, o_younger) at each depth
# ---------------------------------------------------------------------------

def mediant_tree_both(theta, max_depth=60):
    """
    Run the mediant tree for target theta.
    Yields (d, o0, o1) where o0 = o_{2d} (older) and o1 = o_{2d+1} (younger).
    """
    n = int(math.floor(theta))
    alpha = theta - n
    if alpha == 0:
        return
    if alpha < 0.5:
        e0, o0 = n + 1, 1
        e1, o1 = n,     1
    else:
        e0, o0 = n,     1
        e1, o1 = n + 1, 1

    yield (0, o0, o1)

    for d in range(1, max_depth + 1):
        A = e0 - theta * o0
        B = e1 - theta * o1
        if B == 0:
            break
        c = -A / B
        if c <= 0:
            break
        w_plus  = math.floor(c) + 1
        w_minus = w_plus - 1

        ep = e0 + w_plus  * e1;  op = o0 + w_plus  * o1
        em = e0 + w_minus * e1;  om = o0 + w_minus * o1

        if abs(ep - theta * op) < abs(em - theta * om):
            e1_new, o1_new = ep, op
            e0_new, o0_new = em, om
        else:
            e1_new, o1_new = em, om
            e0_new, o0_new = ep, op

        yield (d, o0_new, o1_new)

        e0, o0 = e0_new, o0_new
        e1, o1 = e1_new, o1_new


# ---------------------------------------------------------------------------
# Targets
# ---------------------------------------------------------------------------

targets = [
    dict(name=r'$\log_2 3$', theta=math.log(3, 2),           color='tab:blue'),
    dict(name=r'$\log_2 5$', theta=math.log(5, 2),           color='tab:orange'),
    dict(name=r'$\log_3 8$', theta=math.log(8, 3),           color='tab:green'),
    dict(name=r'$\sqrt{2}$', theta=math.sqrt(2),             color='tab:red'),
    dict(name=r'$\phi$',     theta=(1 + math.sqrt(5)) / 2,   color='tab:purple'),
    dict(name=r'$\pi$',      theta=math.pi,                  color='tab:brown'),
    dict(name=r'$e$',        theta=math.e,                   color='tab:pink'),
]

MAX_DEPTH = 60

# ---------------------------------------------------------------------------
# Collect data
# ---------------------------------------------------------------------------

all_data = {}
for t in targets:
    rows = list(mediant_tree_both(t['theta'], max_depth=MAX_DEPTH))
    ds   = [r[0] for r in rows]
    o0s  = [math.log2(r[1]) if r[1] > 1 else 0.0 for r in rows]
    o1s  = [math.log2(r[2]) if r[2] > 1 else 0.0 for r in rows]
    all_data[t['name']] = (ds, o0s, o1s)

# ---------------------------------------------------------------------------
# Plot
# ---------------------------------------------------------------------------

fig, ax = plt.subplots(figsize=(8, 5.5))

for t in targets:
    ds, o0s, o1s = all_data[t['name']]
    # Younger sibling o_{2d+1}: solid line
    ax.plot(ds, o1s, '-',  linewidth=1.2, color=t['color'], label=t['name'])
    # Older sibling o_{2d}: same colour, dotted
    ax.plot(ds, o0s, ':',  linewidth=1.0, color=t['color'])

# Proved lower bound: log2(o) >= m_min*d + log2(2/3)
m_min = math.log2(10 / 3) / 2          # ~ 0.8685
intercept = math.log2(2 / 3)           # ~ -0.585
d_max = MAX_DEPTH
d_range = np.linspace(0, d_max, 200)
y_bound = m_min * d_range + intercept
ax.plot(d_range, y_bound, '--', color='black', linewidth=1.4,
        label=r'lower bound: $m_{\min}\,d + \log_2(2/3)$'
              r'$\;(m_{\min} \approx 0.869)$')

ax.set_xlabel(r'Depth $d$', fontsize=12)
ax.set_ylabel(r'$\log_2 o$', fontsize=12)
ax.set_title(
    r'$\log_2 o$ vs.\ depth $d$: younger sibling $o_{2d+1}$ (solid),'
    r' older $o_{2d}$ (dotted)',
    fontsize=10
)
ax.legend(fontsize=9)
ax.grid(True, linewidth=0.4, alpha=0.5)

fig.tight_layout()
fig.savefig('fig-denom-growth-survey.pdf', bbox_inches='tight')
fig.savefig('fig-denom-growth-survey.png', dpi=150, bbox_inches='tight')
print("Saved fig-denom-growth-survey.pdf and fig-denom-growth-survey.png")
