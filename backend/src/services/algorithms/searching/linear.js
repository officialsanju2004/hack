
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Linear Search',
  category: 'searching',
  description: 'Scan each element until found.',
  pseudocode: [
    'for i from 0 to n-1:',
    '  if a[i] == target: return i',
    'return -1',
  ],
  complexity: COMPLEXITY.linear,
};

export function run({ array, target }) {
  const a = [...array];
  const steps = [];

  let comparisons = 0;
  let found = -1;

  steps.push({
    array: [...a],
    highlights: {},
    pseudocodeLine: 0,
    explanation: `Search for ${target}.`,
    stats: { comparisons, steps: 1 },
  });

  for (let i = 0; i < a.length; i++) {
    comparisons++;

    steps.push({
      array: [...a],
      highlights: { compare: [i] },
      pseudocodeLine: 1,
      explanation: `Check a[${i}]=${a[i]}.`,
      stats: { comparisons, steps: steps.length + 1 },
    });

    if (a[i] === target) {
      found = i;

      steps.push({
        array: [...a],
        highlights: { found: [i] },
        pseudocodeLine: 1,
        explanation: `Found at ${i}.`,
        stats: { comparisons, steps: steps.length + 1 },
      });

      break;
    }
  }

  if (found === -1) {
    steps.push({
      array: [...a],
      highlights: { notFound: true },
      pseudocodeLine: 2,
      explanation: 'Not found.',
      stats: { comparisons, steps: steps.length + 1 },
    });
  }

  return {
    steps,
    complexity: COMPLEXITY.linear,
  };
}
