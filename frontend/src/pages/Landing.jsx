
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import { useLoadAlgorithms } from '../hooks/useAlgorithm.js';
import { useStore } from '../store/useStore.js';

const GROUPS = [
  {
    key: 'sorting',
    title: 'Sorting',
    blurb:
      'Bubble, Selection, Insertion, Merge, Quick — one comparison at a time.',
  },
  {
    key: 'searching',
    title: 'Searching',
    blurb: 'Linear vs. binary search on your own array.',
  },
  {
    key: 'graph',
    title: 'Graphs',
    blurb: 'Draw your own graph and step through BFS, DFS, Dijkstra.',
  },
];

export default function Landing() {
  useLoadAlgorithms();

  const { algorithms, loadingAlgos } = useStore();
  const navigate = useNavigate();

  return (
    <PageShell>
      <section className="py-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          See algorithms <span className="text-accent">think</span>.
        </h1>

        <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
          AlgoLens turns algorithms into a step-through movie:
          play/pause, rewind, read pseudocode, and predict what
          happens next.
        </p>
      </section>

      {loadingAlgos && (
        <p className="text-center text-slate-400">
          Loading algorithms…
        </p>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <div key={g.key} className="card p-5">
            <h2 className="text-lg font-semibold mb-1">
              {g.title}
            </h2>

            <p className="text-sm text-slate-400 mb-4">
              {g.blurb}
            </p>

            <div className="space-y-2">
              {(algorithms || [])
                .filter((a) => a.category === g.key)
                .map((a) => (
                  <button
                    key={a.id}
                    onClick={() => navigate(`/algo/${a.id}`)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-accent/20 transition"
                  >
                    <div className="text-sm font-medium">
                      {a.name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {a.complexity?.time}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
