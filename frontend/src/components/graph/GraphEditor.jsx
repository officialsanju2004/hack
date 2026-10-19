
// import { useRef, useState } from 'react';

// export default function GraphEditor({ value, onChange }) {
//   const svgRef = useRef(null);
//   const [pendingFrom, setPendingFrom] = useState(null);
//   const [mode, setMode] = useState('node');
//   const [weight, setWeight] = useState(1);

//   const pointFromEvent = (e) => {
//     const rect = svgRef.current.getBoundingClientRect();

//     return {
//       x: ((e.clientX - rect.left) / rect.width) * 600,
//       y: ((e.clientY - rect.top) / rect.height) * 400,
//     };
//   };

//   const click = (e) => {
//     const { x, y } = pointFromEvent(e);

//     if (mode === 'node') {
//       const id = String.fromCharCode(65 + value.nodes.length);
//       const nv = {
//         ...value,
//         nodes: [...value.nodes, { id, label: id, x, y }],
//       };

//       if (!value.start) nv.start = id;
//       onChange(nv);
//     } else {
//       const hit = value.nodes.find(
//         (n) => Math.hypot(n.x - x, n.y - y) < 20
//       );

//       if (!hit) return;

//       if (!pendingFrom) {
//         setPendingFrom(hit.id);
//         return;
//       }

//       onChange({
//         ...value,
//         edges: [
//           ...value.edges,
//           {
//             from: pendingFrom,
//             to: hit.id,
//             weight: Number(weight) || 1,
//           },
//         ],
//       });

//       setPendingFrom(null);
//     }
//   };

//   const remove = (id) =>
//     onChange({
//       ...value,
//       nodes: value.nodes.filter((n) => n.id !== id),
//       edges: value.edges.filter(
//         (e) => e.from !== id && e.to !== id
//       ),
//       start: value.start === id ? undefined : value.start,
//     });

//   const clear = () => {
//     onChange({ nodes: [], edges: [], start: undefined });
//     setPendingFrom(null);
//   };

//   return (
//     <div className="card p-3 space-y-2">
//       <div className="flex flex-wrap gap-2 text-xs items-center">
//         <div className="flex rounded overflow-hidden border border-white/10">
//           {['node', 'edge'].map((m) => (
//             <button
//               key={m}
//               onClick={() => {
//                 setMode(m);
//                 setPendingFrom(null);
//               }}
//               className={`px-2 py-1 ${
//                 mode === m
//                   ? 'bg-accent text-base'
//                   : 'bg-transparent text-slate-300'
//               }`}
//             >
//               {m}
//             </button>
//           ))}
//         </div>

//         {mode === 'edge' && (
//           <label className="flex items-center gap-1">
//             weight
//             <input
//               type="number"
//               min="1"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="w-16 bg-black/30 rounded px-1 py-0.5"
//             />
//           </label>
//         )}

//         <button className="btn" onClick={clear}>
//           Clear
//         </button>

//         {value.start && (
//           <span className="text-slate-400">
//             start: <b className="text-accent">{value.start}</b>
//           </span>
//         )}

//         {pendingFrom && (
//           <span className="text-cmp">from: {pendingFrom}</span>
//         )}
//       </div>

//       <svg
//         ref={svgRef}
//         onClick={click}
//         viewBox="0 0 600 400"
//         className="w-full h-80 bg-panel/40 rounded border border-white/10 cursor-crosshair"
//       >
//         {value.edges.map((e, i) => {
//           const a = value.nodes.find((n) => n.id === e.from);
//           const b = value.nodes.find((n) => n.id === e.to);

//           if (!a || !b) return null;

//           const mx = (a.x + b.x) / 2;
//           const my = (a.y + b.y) / 2;

//           return (
//             <g key={i}>
//               <line
//                 x1={a.x}
//                 y1={a.y}
//                 x2={b.x}
//                 y2={b.y}
//                 stroke="#64748b"
//                 strokeWidth={2}
//               />
//               <text
//                 x={mx}
//                 y={my - 4}
//                 fontSize="11"
//                 fill="#94a3b8"
//                 textAnchor="middle"
//               >
//                 {e.weight}
//               </text>
//             </g>
//           );
//         })}

//         {value.nodes.map((n) => (
//           <g
//             key={n.id}
//             onClick={(e) => {
//               e.stopPropagation();
//               if (mode === 'node') remove(n.id);
//             }}
//           >
//             <circle
//               cx={n.x}
//               cy={n.y}
//               r={18}
//               fill={value.start === n.id ? '#fde68a' : '#334155'}
//               stroke="#0b1020"
//               strokeWidth={2}
//             />
//             <text
//               x={n.x}
//               y={n.y + 4}
//               fontSize="12"
//               fill="#0b1020"
//               fontWeight="700"
//               textAnchor="middle"
//             >
//               {n.label}
//             </text>
//           </g>
//         ))}
//       </svg>

//       <div className="text-xs text-slate-400">
//         Click canvas to add node · edge mode: click two nodes · node
//         mode: click node to delete · first node = start.

//         <div className="mt-1">
//           Set start:{' '}
//           {value.nodes.map((n) => (
//             <button
//               key={n.id}
//               onClick={() => onChange({ ...value, start: n.id })}
//               className={`mr-1 px-1.5 rounded ${
//                 value.start === n.id
//                   ? 'bg-accent text-base'
//                   : 'bg-white/10'
//               }`}
//             >
//               {n.id}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useRef, useState } from 'react';

export default function GraphEditor({ value, onChange }) {
  const svgRef = useRef(null);
  const [pendingFrom, setPendingFrom] = useState(null);
  const [mode, setMode] = useState('node');
  const [weight, setWeight] = useState(1);

  const nodes = value?.nodes ?? [];
  const edges = value?.edges ?? [];

  const pointFromEvent = (e) => {
    const rect = svgRef.current.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * 600,
      y: ((e.clientY - rect.top) / rect.height) * 400,
    };
  };

  const addNode = (x, y) => {
    // Generate unique IDs, even if a node was deleted.
    const usedIds = new Set(nodes.map((n) => n.id));
    let id = '';
    let index = 0;

    do {
      let num = index;
      id = '';

      do {
        id = String.fromCharCode(65 + (num % 26)) + id;
        num = Math.floor(num / 26) - 1;
      } while (num >= 0);

      index++;
    } while (usedIds.has(id));

    onChange({
      ...value,
      nodes: [...nodes, { id, label: id, x, y }],
      start: value.start || id,
    });
  };

  const handleCanvasClick = (e) => {
    // Ignore clicks on existing nodes; those are handled separately.
    if (e.target.closest?.('[data-node="true"]')) return;

    const { x, y } = pointFromEvent(e);

    if (mode === 'node') {
      addNode(x, y);
    } else {
      // Clicking empty space cancels the pending edge selection.
      setPendingFrom(null);
    }
  };

  const handleNodeClick = (e, node) => {
    e.stopPropagation();

    if (mode === 'node') {
      onChange({
        ...value,
        nodes: nodes.filter((n) => n.id !== node.id),
        edges: edges.filter(
          (edge) => edge.from !== node.id && edge.to !== node.id
        ),
        start:
          value.start === node.id
            ? nodes.find((n) => n.id !== node.id)?.id
            : value.start,
      });

      setPendingFrom(null);
      return;
    }

    // Edge mode: first click selects the source node.
    if (!pendingFrom) {
      setPendingFrom(node.id);
      return;
    }

    // Clicking the same node cancels selection.
    if (pendingFrom === node.id) {
      setPendingFrom(null);
      return;
    }

    // Prevent duplicate edges in the same direction.
    const alreadyExists = edges.some(
      (edge) => edge.from === pendingFrom && edge.to === node.id
    );

    if (!alreadyExists) {
      onChange({
        ...value,
        edges: [
          ...edges,
          {
            from: pendingFrom,
            to: node.id,
            weight: Math.max(1, Number(weight) || 1),
          },
        ],
      });
    }

    setPendingFrom(null);
  };

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
              type="button"
              onClick={() => {
                setMode(m);
                setPendingFrom(null);
              }}
              className={`px-3 py-1 ${
                mode === m
                  ? 'bg-accent text-base'
                  : 'bg-transparent text-slate-300'
              }`}
            >
              {m === 'node' ? 'Add / Delete Node' : 'Connect Nodes'}
            </button>
          ))}
        </div>

        {mode === 'edge' && (
          <label className="flex items-center gap-1">
            Weight
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-16 bg-black/30 rounded px-2 py-1"
            />
          </label>
        )}

        <button type="button" className="btn" onClick={clear}>
          Clear Graph
        </button>

        <span className="text-slate-400">
          Start:{' '}
          <b className="text-accent">{value.start || 'Not set'}</b>
        </span>

        {mode === 'edge' && (
          <span className="text-cmp">
            {pendingFrom
              ? `Selected ${pendingFrom} — now click destination`
              : 'Click the first node'}
          </span>
        )}
      </div>

      <svg
        ref={svgRef}
        onClick={handleCanvasClick}
        viewBox="0 0 600 400"
        className="w-full h-80 bg-panel/40 rounded border border-white/10 cursor-crosshair"
      >
        {edges.map((edge, i) => {
          const a = nodes.find((n) => n.id === edge.from);
          const b = nodes.find((n) => n.id === edge.to);

          if (!a || !b) return null;

          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;

          return (
            <g key={`${edge.from}-${edge.to}-${i}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#64748b"
                strokeWidth="2"
              />
              <text
                x={mx}
                y={my - 7}
                fontSize="13"
                fill="#fbbf24"
                textAnchor="middle"
              >
                {edge.weight ?? 1}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => (
          <g
            key={node.id}
            data-node="true"
            onClick={(e) => handleNodeClick(e, node)}
            style={{ cursor: 'pointer' }}
          >
            {pendingFrom === node.id && (
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="3"
              />
            )}

            <circle
              cx={node.x}
              cy={node.y}
              r="18"
              fill={
                pendingFrom === node.id
                  ? '#fbbf24'
                  : value.start === node.id
                    ? '#fde68a'
                    : '#334155'
              }
              stroke="#0b1020"
              strokeWidth="2"
            />

            <text
              x={node.x}
              y={node.y + 4}
              fontSize="12"
              fill="#0b1020"
              fontWeight="700"
              textAnchor="middle"
              pointerEvents="none"
            >
              {node.label || node.id}
            </text>
          </g>
        ))}
      </svg>

      <div className="text-xs text-slate-400">
        <p>
          <b>Node mode:</b> Click empty space to add a node; click an
          existing node to delete it.
        </p>
        <p className="mt-1">
          <b>Edge mode:</b> Click the first node, then click the second
          node. A line will connect them.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1">
          <span>Set start:</span>
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => onChange({ ...value, start: node.id })}
              className={`px-2 py-1 rounded ${
                value.start === node.id
                  ? 'bg-accent text-base'
                  : 'bg-white/10'
              }`}
            >
              {node.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

