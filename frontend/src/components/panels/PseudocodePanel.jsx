
export default function PseudocodePanel({ pseudocode, line }) {
  if (!pseudocode?.length) return null;

  return (
    <div className="card p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-2">
        Pseudocode
      </h3>

      <pre className="text-xs leading-6 font-mono">
        {pseudocode.map((l, i) => (
          <div
            key={i}
            className={`px-2 rounded ${
              i === line
                ? 'bg-accent/20 text-accent'
                : 'text-slate-400'
            }`}
          >
            <span className="inline-block w-6 text-slate-600">
              {i + 1}
            </span>
            {l}
          </div>
        ))}
      </pre>
    </div>
  );
}
