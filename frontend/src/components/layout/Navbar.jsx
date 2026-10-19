
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore.js';

export default function Navbar() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-panel/60 backdrop-blur sticky top-0 z-20">
      <button
        onClick={() => navigate('/')}
        className="text-lg font-semibold tracking-tight text-accent"
      >
        AlgoLens
      </button>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-slate-400 hidden sm:inline">
          Explanation mode
        </span>

        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {['beginner', 'advanced'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 capitalize ${
                mode === m
                  ? 'bg-accent text-base'
                  : 'bg-transparent text-slate-300 hover:bg-white/5'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <Link to="/" className="text-slate-300 hover:text-white">
          Home
        </Link>
      </div>
    </nav>
  );
}
