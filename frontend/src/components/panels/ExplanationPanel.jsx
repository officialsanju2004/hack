export default function ExplanationPanel({ text, mode }) {
if (!text) return null;
return (<div className="card p-4">
<h3 className="text-sm font-semibold text-slate-300 mb-2">What's happening <span className="text-xs text-slate-500">({mode} mode)</span></h3>
<p className="text-sm text-slate-200 leading-relaxed">{text}</p>

  </div>);
}
