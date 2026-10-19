
import { COMPLEXITY } from '../../../utils/complexity.js';
import { buildAdj } from './_adj.js';

export const meta = {
  name: 'Dijkstra',
  category: 'graph',
  description: 'Shortest weighted paths using a min-priority queue.',
  pseudocode: [
    'dist[start]=0; others=∞',
    'pq = [(0,start)]',
    'while pq:',
    '  (d,v) = popMin()',
    '  for (u,w) in adj[v]:',
    '    if dist[v]+w < dist[u]: relax',
  ],
  complexity: COMPLEXITY.dijkstra,
};

export function run({ graph }) {
  const { nodes, edges, start, target } = graph;
  const adj = buildAdj(nodes, edges, true);

  const dist = Object.fromEntries(
    nodes.map((n) => [n.id, Infinity])
  );

  dist[start] = 0;

  const pq = [{ id: start, d: 0 }];
  const visited = new Set();
  const steps = [];

  const push = (hl, line, exp) =>
    steps.push({
      graph,
      highlights: hl,
      distances: { ...dist },
      pseudocodeLine: line,
      explanation: exp,
      stats: {
        visited: visited.size,
        steps: steps.length + 1,
      },
    });

  push(
    { current: start },
    0,
    `Start at ${start}.`
  );

  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);

    const { id: v } = pq.shift();

    if (visited.has(v)) continue;

    visited.add(v);

    push(
      { current: v, visited: [...visited] },
      3,
      `Pop ${v}.`
    );

    for (const { to: u, w } of adj[v] || []) {
      const nd = dist[v] + w;

      if (nd < dist[u]) {
        dist[u] = nd;
        pq.push({ id: u, d: nd });

        push(
          {
            current: v,
            edge: [v, u],
            visited: [...visited],
          },
          5,
          `Relax ${u} → ${nd}.`
        );
      }
    }
  }

  push(
    { visited: [...visited] },
    -1,
    target
      ? `Shortest cost to ${target}: ${dist[target]}.`
      : 'All nodes settled.'
  );

  return {
    steps,
    complexity: COMPLEXITY.dijkstra,
  };
}
