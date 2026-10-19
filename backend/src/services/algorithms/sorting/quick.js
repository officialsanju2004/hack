
import { makeStats } from '../../../utils/steps.js';
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Quick Sort',
  category: 'sorting',
  description: 'Partition around pivot, then sort each side.',
  pseudocode: [
    'quickSort(lo, hi):',
    '  if lo >= hi return',
    '  pivot = a[hi]',
    '  partition smaller-left/larger-right',
    '  quickSort(lo, p-1); quickSort(p+1, hi)',
  ],
  complexity: COMPLEXITY.quick,
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

  push({}, 0, 'Start Quick Sort.');

  const qs = (lo, hi) => {
    if (lo >= hi) return;

    const pivot = a[hi];

    push(
      { pivot: [hi], range: [lo, hi] },
      2,
      `Pivot ${pivot} at ${hi}.`
    );

    let i = lo;

    for (let j = lo; j < hi; j++) {
      stats.comparisons++;

      push(
        { compare: [j, hi], pivot: [hi], range: [lo, hi] },
        3,
        `Compare ${a[j]} with pivot ${pivot}.`
      );

      if (a[j] < pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          stats.swaps++;

          push(
            { swapped: [i, j], pivot: [hi], range: [lo, hi] },
            3,
            'Swap into left partition.'
          );
        }

        i++;
      }
    }

    [a[i], a[hi]] = [a[hi], a[i]];
    stats.swaps++;

    push(
      { swapped: [i, hi], current: [i], range: [lo, hi] },
      3,
      `Place pivot at ${i}.`
    );

    qs(lo, i - 1);
    qs(i + 1, hi);
  };

  qs(0, a.length - 1);

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
    complexity: COMPLEXITY.quick,
  };
}
