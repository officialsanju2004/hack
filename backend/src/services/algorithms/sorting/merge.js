
import { makeStats } from '../../../utils/steps.js';
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Merge Sort',
  category: 'sorting',
  description: 'Divide in half, sort each half, then merge.',
  pseudocode: [
    'mergeSort(lo, hi):',
    '  if lo >= hi return',
    '  mid = (lo+hi)/2',
    '  mergeSort(lo, mid); mergeSort(mid+1, hi)',
    '  merge two sorted halves',
  ],
  complexity: COMPLEXITY.merge,
};

export function run(input) {
  const a = [...input.array];
  const stats = makeStats();
  const steps = [];

  const push = (hl, line, exp) =>
    steps.push({
      array: [...a],
      highlights: hl,
      pseudocodeLine: line,
      explanation: exp,
      stats: { ...stats, steps: steps.length + 1 },
    });

  push({}, 0, 'Start Merge Sort.');

  const sort = (lo, hi) => {
    if (lo >= hi) return;

    const mid = (lo + hi) >> 1;

    push(
      { range: [lo, hi], current: [mid] },
      2,
      `Split [${lo}..${hi}] at ${mid}.`
    );

    sort(lo, mid);
    sort(mid + 1, hi);

    merge(lo, mid, hi);
  };

  const merge = (lo, mid, hi) => {
    const L = a.slice(lo, mid + 1);
    const R = a.slice(mid + 1, hi + 1);

    let i = 0;
    let j = 0;
    let k = lo;

    while (i < L.length && j < R.length) {
      stats.comparisons++;

      push(
        { compare: [lo + i, mid + 1 + j], range: [lo, hi] },
        4,
        `Compare ${L[i]} and ${R[j]}.`
      );

      a[k++] = L[i] <= R[j] ? L[i++] : R[j++];

      push(
        { range: [lo, hi], current: [k - 1] },
        4,
        `Place ${a[k - 1]}.`
      );
    }

    while (i < L.length) {
      a[k++] = L[i++];

      push(
        { range: [lo, hi], current: [k - 1] },
        4,
        `Copy ${a[k - 1]}.`
      );
    }

    while (j < R.length) {
      a[k++] = R[j++];

      push(
        { range: [lo, hi], current: [k - 1] },
        4,
        `Copy ${a[k - 1]}.`
      );
    }
  };

  sort(0, a.length - 1);

  steps.push({
    array: [...a],
    highlights: {
      sorted: a.map((_, i) => i),
    },
    pseudocodeLine: -1,
    explanation: 'Array sorted.',
    stats: { ...stats, steps: steps.length + 1 },
  });

  return {
    steps,
    complexity: COMPLEXITY.merge,
  };
}
