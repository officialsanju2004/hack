import { useStore } from '../../store/useStore.js';
export default function ControlBar({ onRun, onRandom, onQuiz }) {
const { playing, setPlaying, next, prev, reset, speed, setSpeed, currentStep, steps } = useStore();
const atEnd = currentStep >= steps.length - 1;
return (<div className="card p-3 flex flex-wrap gap-2 items-center">
<button onClick={() => setPlaying(!playing)} disabled={!steps.length || atEnd} className="px-4 py-2 rounded-lg bg-accent text-base font-semibold disabled:opacity-40">{playing ? 'Pause' : 'Play'}</button>
<button onClick={prev} className="btn">◀ Prev</button>
<button onClick={next} className="btn">Next ▶</button>
<button onClick={reset} className="btn">Reset</button>
<button onClick={onRun} className="btn">Run</button>
<button onClick={onRandom} className="btn">Random</button>
<button onClick={onQuiz} className="btn">Quiz me</button>
<div className="flex items-center gap-2 ml-auto text-xs text-slate-300">
<label htmlFor="speed">Speed</label>
<input id="speed" type="range" min="60" max="1000" step="20" value={1020 - speed} onChange={(e) => setSpeed(1020 - Number(e.target.value))} className="accent-accent" />
<span className="font-mono w-16 text-right">{speed}ms/step</span>
</div>
<div className="text-xs text-slate-400 w-full sm:w-auto">Step {steps.length ? currentStep + 1 : 0} / {steps.length} · Space=play · ←/→=step</div>

  </div>);
}
