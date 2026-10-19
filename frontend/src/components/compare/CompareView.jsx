import { useState } from 'react';
import { api } from '../../api/client.js';
export default function CompareView({ input, algorithms }) {
const [a, setA] = useState('bubble'), [b, setB] = useState('quick');
const [result, setResult] = useState(null), [err, setErr] = useState(null);
const compare = async () => {
setErr(null);
try {
const [ra, rb] = await Promise.all([api.post('/run', { algorithm: a, input }), api.post('/run', { algorithm: b, input })]);
setResult({ a: ra.data, b: rb.data });
} catch (e) { setErr(e.response?.data?.error || e.message); }
};
const row = (data) => { const last = data.steps[data.steps.length - 1]; return (<div className="card p-3 text-xs space-y-1">
<div className="font-semibold text-accent">{data.meta.name}</div>
<div>steps: {last.stats.steps}</div>
<div>comparisons: {last.stats.comparisons ?? '—'}</div>
<div>swaps: {last.stats.swaps ?? '—'}</div>
<div>time: {data.complexity.time}</div>

  </div>); };
  return (<div className="card p-4 space-y-3">
    <h3 className="text-sm font-semibold text-slate-300">Compare two algorithms</h3>
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <select className="bg-black/30 p-1.5 rounded" value={a} onChange={(e) => setA(e.target.value)}>{algorithms.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
      <span>vs</span>
      <select className="bg-black/30 p-1.5 rounded" value={b} onChange={(e) => setB(e.target.value)}>{algorithms.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
      <button className="btn" onClick={compare}>Run comparison</button>
    </div>
    {err && <p className="text-swap text-xs">{err}</p>}
    {result && <div className="grid grid-cols-2 gap-3">{row(result.a)}{row(result.b)}</div>}
  </div>);
}
