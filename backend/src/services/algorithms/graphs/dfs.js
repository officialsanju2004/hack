
import { COMPLEXITY } from '../../../utils/complexity.js';
import { buildAdj } from './_adj.js';

export const meta = {
  name: 'Depth-First Search',
  category: 'graph',
  description: 'Explore deep along each branch before backtracking.',
  pseudocode: [
    'stack = [start]',
    'while stack:',
    '  v = pop()',
    '  if visited: continue',
    '  visited.add(v)',
    '  push neighbors',
  ],
  complexity: COMPLEXITY.dfs,
};

export function run({ graph }) {
  const { nodes, edges, start } = graph;
  const adj = buildAdj(nodes, edges);

  const steps = [];
  const visited = new Set();
  let visitedCount = 0;

  const stack = [start];

  const push = (hl, line, exp) =>
    steps.push({
      graph,
      highlights: hl,
      pseudocodeLine: line,
      explanation: exp,
      stats: {
        visited: visitedCount,
        steps: steps.length + 1,
      },
    });

  push(
    { visited: [], stack: [...stack] },
    0,
    `Start DFS at ${start}.`
  );

  while (stack.length) {
    const v = stack.pop();

    push(
      { visited: [...visited], stack: [...stack], current: v },
      2,
      `Pop ${v}.`
    );

    if (visited.has(v)) continue;

    visited.add(v);
    visitedCount++;

    push(
      { visited: [...visited], stack: [...stack], current: v },
      4,
      `Visit ${v}.`
    );

    for (const u of adj[v] || []) {
      if (!visited.has(u)) {
        stack.push(u);
      }
    }

    push(
      { visited: [...visited], stack: [...stack] },
      5,
      `Push neighbors of ${v}.`
    );
  }

  return {
    steps,
    complexity: COMPLEXITY.dfs,
  };
}
