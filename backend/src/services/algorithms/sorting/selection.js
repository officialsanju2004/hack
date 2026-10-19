
import { makeStats } from '../../../utils/steps.js';
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Selection Sort',
  category: 'sorting',
  description: 'Repeatedly select the smallest remaining element.',
  pseudocode: [
    'for i from 0 to n-2:',
    '  min = i',
    '  for j from i+1 to n-1:',
    '    if a[j] < a[min]: min = j',
    '  swap a[i] with a[min]',
  ],
  complexity: COMPLEXITY.selection,
};

export function run(input) {
  const a = [...input.array];
  const n = a.length;
  const stats = makeStats();
  const steps = [];
  const sorted = [];

  const push = (hl, line, exp) =>
    steps.push({
      array: [...a],
      highlights: {
        ...hl,
        sorted: [...sorted],
      },
      pseudocodeLine: line,
      explanation: exp,
      stats: { ...stats, steps: steps.length + 1 },
    });

  push({}, 0, 'Start Selection Sort.');

  for (let i = 0; i < n - 1; i++) {
    let min = i;

    push(
      { current: [i] },
      1,
      `Assume index ${i} is min.`
    );

    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;

      push(
        { compare: [j, min], current: [i] },
        3,
        `Compare a[${j}]=${a[j]} with min ${a[min]}.`
      );

      if (a[j] < a[min]) {
        min = j;

        push(
          { current: [i], minAt: [min] },
          3,
          `New min at ${min}.`
        );
      }
    }

    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      stats.swaps++;

      push(
        { swapped: [i, min] },
        4,
        `Swap a[${i}] and a[${min}].`
      );
    }

    sorted.push(i);
    push({}, 4, `Index ${i} sorted.`);
  }

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
    complexity: COMPLEXITY.selection,
  };
}
