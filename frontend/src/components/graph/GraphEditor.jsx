
import { useRef, useState } from 'react';

export default function GraphEditor({ value, onChange }) {
  const svgRef = useRef(null);
  const [pendingFrom, setPendingFrom] = useState(null);
  const [mode, setMode] = useState('node');
  const [weight, setWeight] = useState(1);

  const pointFromEvent = (e) => {
    const rect = svgRef.current.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * 600,
      y: ((e.clientY - rect.top) / rect.height) * 400,
    };
  };

  const click = (e) => {
    const { x, y } = pointFromEvent(e);

    if (mode === 'node') {
      const id = String.fromCharCode(65 + value.nodes.length);
      const nv = {
        ...value,
        nodes: [...value.nodes, { id, label: id, x, y }],
      };

      if (!value.start) nv.start = id;
      onChange(nv);
    } else {
      const hit = value.nodes.find(
        (n) => Math.hypot(n.x - x, n.y - y) < 20
      );

      if (!hit) return;

      if (!pendingFrom) {
        setPendingFrom(hit.id);
        return;
      }

      onChange({
        ...value,
        edges: [
          ...value.edges,
          {
            from: pendingFrom,
            to: hit.id,
            weight: Number(weight) || 1,
          },
        ],
      });

      setPendingFrom(null);
    }
  };

  const remove = (id) =>
    onChange({
      ...value,
      nodes: value.nodes.filter((n) => n.id !== id),
      edges: value.edges.filter(
        (e) => e.from !== id && e.to !== id
      ),
      start: value.start === id ? undefined : value.start,
    });

  const clear = () => {
    onChange({ nodes: [], edges: [], start: undefined });
    setPendingFrom(null);
  };

  return (
    <div className="card p-3 space-y-2">
      <div className="flex flex-wrap gap-2 text-xs items-center">
        <div className="flex rounded overflow-hidden border border-white/10">
          {['node', 'edge'].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setPendingFrom(null);
              }}
              className={`px-2 py-1 ${
                mode === m
                  ? 'bg-accent text-base'
                  : 'bg-transparent text-slate-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === 'edge' && (
          <label className="flex items-center gap-1">
            weight
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-16 bg-black/30 rounded px-1 py-0.5"
            />
          </label>
        )}

        <button className="btn" onClick={clear}>
          Clear
        </button>

        {value.start && (
          <span className="text-slate-400">
            start: <b className="text-accent">{value.start}</b>
          </span>
        )}

        {pendingFrom && (
          <span className="text-cmp">from: {pendingFrom}</span>
        )}
      </div>

      <svg
        ref={svgRef}
        onClick={click}
        viewBox="0 0 600 400"
        className="w-full h-80 bg-panel/40 rounded border border-white/10 cursor-crosshair"
      >
        {value.edges.map((e, i) => {
          const a = value.nodes.find((n) => n.id === e.from);
          const b = value.nodes.find((n) => n.id === e.to);

          if (!a || !b) return null;

          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;

          return (
            <g key={i}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#64748b"
                strokeWidth={2}
              />
              <text
                x={mx}
                y={my - 4}
                fontSize="11"
                fill="#94a3b8"
                textAnchor="middle"
              >
                {e.weight}
              </text>
            </g>
          );
        })}

        {value.nodes.map((n) => (
          <g
            key={n.id}
            onClick={(e) => {
              e.stopPropagation();
              if (mode === 'node') remove(n.id);
            }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={18}
              fill={value.start === n.id ? '#fde68a' : '#334155'}
              stroke="#0b1020"
              strokeWidth={2}
            />
            <text
              x={n.x}
              y={n.y + 4}
              fontSize="12"
              fill="#0b1020"
              fontWeight="700"
              textAnchor="middle"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="text-xs text-slate-400">
        Click canvas to add node · edge mode: click two nodes · node
        mode: click node to delete · first node = start.

        <div className="mt-1">
          Set start:{' '}
          {value.nodes.map((n) => (
            <button
              key={n.id}
              onClick={() => onChange({ ...value, start: n.id })}
              className={`mr-1 px-1.5 rounded ${
                value.start === n.id
                  ? 'bg-accent text-base'
                  : 'bg-white/10'
              }`}
            >
              {n.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
