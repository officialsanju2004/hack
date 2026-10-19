
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Binary Search',
  category: 'searching',
  description: 'Halve a sorted range each comparison.',
  pseudocode: [
    'lo=0; hi=n-1',
    'while lo <= hi:',
    '  mid=(lo+hi)/2',
    '  if a[mid]==target: return mid',
    '  if a[mid]<target: lo=mid+1',
    '  else: hi=mid-1',
    'return -1',
  ],
  complexity: COMPLEXITY.binary,
};

export function run({ array, target }) {
  const a = [...array];
  const steps = [];

  let comparisons = 0;
  let lo = 0;
  let hi = a.length - 1;

  steps.push({
    array: [...a],
    highlights: { range: [lo, hi] },
    pseudocodeLine: 0,
    explanation: `Search ${target}.`,
    stats: { comparisons, steps: 1 },
  });

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    comparisons++;

    steps.push({
      array: [...a],
      highlights: {
        range: [lo, hi],
        current: [mid],
      },
      pseudocodeLine: 2,
      explanation: `mid=${mid}, a[mid]=${a[mid]}.`,
      stats: { comparisons, steps: steps.length + 1 },
    });

    if (a[mid] === target) {
      steps.push({
        array: [...a],
        highlights: { found: [mid] },
        pseudocodeLine: 3,
        explanation: `Found at ${mid}.`,
        stats: { comparisons, steps: steps.length + 1 },
      });

      return {
        steps,
        complexity: COMPLEXITY.binary,
      };
    }

    if (a[mid] < target) {
      lo = mid + 1;

      steps.push({
        array: [...a],
        highlights: { range: [lo, hi] },
        pseudocodeLine: 4,
        explanation: 'Go right.',
        stats: { comparisons, steps: steps.length + 1 },
      });
    } else {
      hi = mid - 1;

      steps.push({
        array: [...a],
        highlights: { range: [lo, hi] },
        pseudocodeLine: 5,
        explanation: 'Go left.',
        stats: { comparisons, steps: steps.length + 1 },
      });
    }
  }

  steps.push({
    array: [...a],
    highlights: { notFound: true },
    pseudocodeLine: 6,
    explanation: 'Not found.',
    stats: { comparisons, steps: steps.length + 1 },
  });

  return {
    steps,
    complexity: COMPLEXITY.binary,
  };
}
