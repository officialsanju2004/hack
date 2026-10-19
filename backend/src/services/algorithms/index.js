import * as bubble from './sorting/bubble.js';
import * as selection from './sorting/selection.js';
import * as insertion from './sorting/insertion.js';
import * as merge from './sorting/merge.js';
import * as quick from './sorting/quick.js';
import * as linear from './searching/linear.js';
import * as binary from './searching/binary.js';
import * as bfs from './graphs/bfs.js';
import * as dfs from './graphs/dfs.js';
import * as dijkstra from './graphs/dijkstra.js';

const modules = { bubble, selection, insertion, merge, quick, linear, binary, bfs, dfs, dijkstra };
export const ALGORITHMS = Object.fromEntries(Object.entries(modules).map(([id, m]) => [id, { id, ...m.meta, run: m.run }]));
export function listAlgorithms() { return Object.values(ALGORITHMS).map(({ run, ...m }) => m); }
