import { useState } from 'react';
export default function InputPanel({ category, onRun, onPreset }) {
const [text, setText] = useState('5,3,8,1,9,2');
const [target, setTarget] = useState('9');
const submit = () => {
const array = text.split(/[,\s]+/).filter(Boolean).map(Number);
if (array.some((n) => Number.isNaN(n))) return onRun({ error: 'Only integers allowed.' });
if (category === 'searching') return onRun({ array, target: Number(target) });
onRun({ array });
};
return (<div className="card p-4 space-y-3">
<h3 className="text-sm font-semibold text-slate-300">Your input</h3>
<textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-black/30 rounded-lg p-2 text-sm font-mono border border-white/10" placeholder="e.g. 5,3,8,1,9,2" aria-label="Array input" />
{category === 'searching' && (<div className="flex items-center gap-2 text-sm">
<label htmlFor="target">Target:</label>
<input id="target" value={target} onChange={(e) => setTarget(e.target.value)} className="w-24 bg-black/30 rounded p-1.5 border border-white/10 font-mono" />
</div>)}
<div className="flex flex-wrap gap-2 text-xs">
<button className="btn" onClick={submit}>Use input</button>
{['random','nearly','reversed'].map((p) => (<button key={p} className="btn" onClick={() => onPreset(p)}>{p}</button>))}
</div>

  </div>);
}
