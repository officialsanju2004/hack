import { BAR_COLORS } from '../../lib/colors.js';
export default function GraphCanvas({ graph, highlights }) {
if (!graph?.nodes?.length) return (<div className="h-80 grid place-items-center text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">Add nodes on the editor.</div>);
const visited = new Set(highlights?.visited || []);
const current = highlights?.current, edge = highlights?.edge;
return (<svg viewBox="0 0 600 400" className="w-full h-80 bg-panel/40 rounded-xl border border-white/10">
{graph.edges.map((e, i) => {
const a = graph.nodes.find((n) => n.id === e.from), b = graph.nodes.find((n) => n.id === e.to);
if (!a || !b) return null;
const hl = edge && ((edge[0] === e.from && edge[1] === e.to) || (!e.directed && edge[0] === e.to && edge[1] === e.from));
const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
return (<g key={i}>
<line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={hl ? BAR_COLORS.compare : '#475569'} strokeWidth={hl ? 3 : 2} />
{e.weight != null && (<text x={mx} y={my - 6} fontSize="11" fill="#94a3b8" textAnchor="middle">{e.weight}</text>)}
</g>);
})}
{graph.nodes.map((n) => {
const isVisited = visited.has(n.id), isCurrent = current === n.id, isStart = graph.start === n.id;
const fill = isCurrent ? BAR_COLORS.current : isVisited ? BAR_COLORS.sorted : isStart ? BAR_COLORS.compare : '#334155';
return (<g key={n.id}>
<circle cx={n.x} cy={n.y} r={18} fill={fill} stroke="#0b1020" strokeWidth={2} />
<text x={n.x} y={n.y + 4} fontSize="12" textAnchor="middle" fill="#0b1020" fontWeight="700">{n.label || n.id}</text>
</g>);
})}
</svg>);
}
