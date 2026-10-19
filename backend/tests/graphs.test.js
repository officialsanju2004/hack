import test from 'node:test';
import assert from 'node:assert/strict';
import { run as bfs } from '../src/services/algorithms/graphs/bfs.js';
import { run as dfs } from '../src/services/algorithms/graphs/dfs.js';
import { run as dijkstra } from '../src/services/algorithms/graphs/dijkstra.js';
const graph = { nodes: [{ id:'A', x:0, y:0 },{ id:'B', x:100, y:0 },{ id:'C', x:100, y:100 }],
edges: [{ from:'A', to:'B', weight:1 },{ from:'B', to:'C', weight:2 },{ from:'A', to:'C', weight:10 }], start:'A', target:'C' };
test('bfs visits all', () => { const { steps } = bfs({ graph }); assert.equal(steps[steps.length-1].highlights.visited.length, 3); });
test('dfs visits all', () => { const { steps } = dfs({ graph }); assert.equal(steps[steps.length-1].highlights.visited.length, 3); });
test('dijkstra A→C = 3', () => { const { steps } = dijkstra({ graph }); assert.equal(steps[steps.length-1].distances.C, 3); });
