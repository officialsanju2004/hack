
import { COMPLEXITY } from '../../../utils/complexity.js';
import { buildAdj } from './_adj.js';

export const meta = {
  name: 'Breadth-First Search',
  category: 'graph',
  description: 'Explore level by level using a queue.',
  pseudocode: [
    'queue = [start]',
    'visited.add(start)',
    'while queue:',
    '  v = dequeue()',
    '  for each neighbor u:',
    '    if not visited: add; enqueue',
  ],
  complexity: COMPLEXITY.bfs,
};

export function run({ graph }) {
  const { nodes, edges, start } = graph;
  const adj = buildAdj(nodes, edges);

  const steps = [];
  let visitedCount = 0;

  const visited = new Set([start]);
  const queue = [start];

  visitedCount++;

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
    { visited: [...visited], queue: [...queue] },
    1,
    `Start at ${start}.`
  );

  while (queue.length) {
    const v = queue.shift();

    push(
      { visited: [...visited], queue: [...queue], current: v },
      3,
      `Dequeue ${v}.`
    );

    for (const to of adj[v] || []) {
      if (!visited.has(to)) {
        visited.add(to);
        visitedCount++;
        queue.push(to);

        push(
          {
            visited: [...visited],
            queue: [...queue],
            current: v,
            edge: [v, to],
          },
          5,
          `Discover ${to} from ${v}.`
        );
      }
    }
  }

  return {
    steps,
    complexity: COMPLEXITY.bfs,
  };
}
