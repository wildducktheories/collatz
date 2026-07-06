// Collatz arithmetic

export const MOD8_COLOR = {
  1: '#4caf50',
  3: '#2196f3',
  5: '#f44336',
  7: '#ff9800',
};

// Mod-24 palette (all 24 residues, matching the LaTeX paper palette)
export const MOD24_COLOR = {
   0: '#EFC1C1',
   1: '#EFCDC1',
   2: '#EFD8C1',
   3: '#EFE4C1',
   4: '#EFEFC1',
   5: '#E4EFC1',
   6: '#D8EFC1',
   7: '#CDEFC1',
   8: '#C1EFC1',
   9: '#C1EFCD',
  10: '#C1EFD8',
  11: '#C1EFE4',
  12: '#C1EFEF',
  13: '#C1E4EF',
  14: '#C1D8EF',
  15: '#C1CDEF',
  16: '#C1C1EF',
  17: '#CDC1EF',
  18: '#D8C1EF',
  19: '#E4C1EF',
  20: '#EFC1EF',
  21: '#EFC1E4',
  22: '#EFC1D8',
  23: '#EFC1CD',
};

// T(n) for odd n — odd Collatz map
export function T(n) {
  let m = 3 * n + 1;
  while (m % 2 === 0) m /= 2;
  return m;
}

// v2(3n+1) — number of even steps for one T-step
export function v2step(n) {
  let m = 3 * n + 1;
  let v = 0;
  while (m % 2 === 0) { m /= 2; v++; }
  return v;
}

// Full orbit of a under T: [a, T(a), T²(a), ..., 1]
export function orbit(a) {
  const path = [a];
  let cur = a;
  for (let i = 0; i < 10000; i++) {
    if (cur === 1) break;
    cur = T(cur);
    path.push(cur);
  }
  return path;
}

// Build step records: for each T-step, record {value, mod8, mod24, o, e, beta, state}
export function buildSteps(a) {
  const path = orbit(a);
  const steps = [];
  let o = 0, e = 0;
  for (let i = 0; i < path.length; i++) {
    const n = path[i];
    const mod8 = n % 8;
    if (i < path.length - 1) {
      const v = v2step(n);
      o += 1;
      e += v;
    }
    const isLast = i === path.length - 1;
    const state = (n === 1 && isLast) ? 'final' : mod8;
    steps.push({ value: n, mod8, mod24: n % 24, o, e, beta: e - o, state });
  }
  return steps;
}
