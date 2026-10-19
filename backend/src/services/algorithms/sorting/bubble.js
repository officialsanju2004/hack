
import { makeStats } from '../../../utils/steps.js';
import { COMPLEXITY } from '../../../utils/complexity.js';

export const meta = {
  name: 'Bubble Sort',
  category: 'sorting',
  description: 'Repeatedly swap adjacent out-of-order elements.',
  pseudocode: [
    'for i from 0 to n-1:',
    '  for j from 0 to n-i-2:',
    '    compare a[j] and a[j+1]',
    '    if a[j] > a[j+1]: swap',
    '  mark a[n-1-i] sorted',
  ],
  complexity: COMPLEXITY.bubble,
};

export function run(input) {
  const a = [...input.array];
  const n = a.length;
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

  push({}, 0, `Start Bubble Sort on ${n} elements.`);

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      stats.comparisons++;

      push(
        { compare: [j, j + 1] },
        2,
        `Compare ${a[j]} and ${a[j + 1]}.`
      );

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        stats.swaps++;

        push(
          { swapped: [j, j + 1] },
          3,
          `Swapped ${a[j + 1]} and ${a[j]}.`
        );
      }
    }

    push(
      {
        sorted: Array.from(
          { length: i + 1 },
          (_, k) => n - 1 - k
        ),
      },
      4,
      `Index ${n - 1 - i} sorted.`
    );
  }

  push(
    { sorted: a.map((_, i) => i) },
    -1,
    'Array sorted.'
  );

  return {
    steps,
    complexity: COMPLEXITY.bubble,
  };
}
