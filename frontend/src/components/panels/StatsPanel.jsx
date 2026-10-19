export default function StatsPanel({ step, complexity, mode }) {
const stats = step?.stats || {};
return (<div className="card p-4">
<h3 className="text-sm font-semibold text-slate-300 mb-3">Live stats</h3>
<div className="grid grid-cols-2 gap-2 text-xs">
{Object.entries(stats).map(([k, v]) => (<div key={k} className="flex justify-between bg-white/5 rounded px-2 py-1"><span className="text-slate-400 capitalize">{k}</span><span className="font-mono">{v}</span></div>))}
</div>
{complexity && (<div className="mt-3 text-xs text-slate-300 space-y-1">
<div>Time: <span className="text-accent font-mono">{complexity.time}</span></div>
{mode === 'advanced' && (<div className="text-slate-400">Space: <span className="font-mono">{complexity.space}</span> — {complexity.why}</div>)}
</div>)}

  </div>);
}
