export function buildAdj(nodes, edges, weighted = false) {
const adj = Object.fromEntries(nodes.map((n) => [n.id, []]));
for (const e of edges) {
adj[e.from]?.push(weighted ? { to: e.to, w: e.weight ?? 1 } : e.to);
if (!e.directed) adj[e.to]?.push(weighted ? { to: e.from, w: e.weight ?? 1 } : e.from);
}
return adj;
}
