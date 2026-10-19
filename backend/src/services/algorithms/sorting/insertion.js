
import { makeStats } from '../../../utils/steps.js';
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Insertion Sort',
  category: 'sorting',
  description: 'Grow a sorted prefix by inserting each element into place.',
  pseudocode: [
    'for i from 1 to n-1:',
    '  key = a[i]; j = i-1',
    '  while j >= 0 and a[j] > key:',
    '    a[j+1] = a[j]; j--',
    '  a[j+1] = key',
  ],
  complexity: COMPLEXITY.insertion,
};

export function run(input) {
  const a = [...input.array];
  const n = a.length;
  const stats = makeStats();
  const steps = [];
  const sorted = [0];

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

  push({}, 0, 'Start Insertion Sort.');

  for (let i = 1; i < n; i++) {
    const key = a[i];

    push(
      { current: [i] },
      1,
      `key = ${key}.`
    );

    let j = i - 1;

    while (j >= 0) {
      stats.comparisons++;

      push(
        { compare: [j, i] },
        2,
        `Compare a[${j}]=${a[j]} with key=${key}.`
      );

      if (a[j] > key) {
        a[j + 1] = a[j];

        push(
          { swapped: [j, j + 1] },
          3,
          `Shift ${a[j]} right.`
        );

        j--;
      } else {
        break;
      }
    }

    a[j + 1] = key;
    sorted.push(i);

    push(
      { current: [j + 1] },
      4,
      `Insert ${key} at ${j + 1}.`
    );
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
    complexity: COMPLEXITY.insertion,
  };
}
