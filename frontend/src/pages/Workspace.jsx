import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import ArrayBars from '../components/viz/ArrayBars.jsx';
import GraphCanvas from '../components/viz/GraphCanvas.jsx';
import Legend from '../components/viz/Legend.jsx';
import PseudocodePanel from '../components/panels/PseudocodePanel.jsx';
import ExplanationPanel from '../components/panels/ExplanationPanel.jsx';
import StatsPanel from '../components/panels/StatsPanel.jsx';
import ControlBar from '../components/controls/ControlBar.jsx';
import InputPanel from '../components/controls/InputPanel.jsx';
import GraphEditor from '../components/graph/GraphEditor.jsx';
import QuizModal from '../components/quiz/QuizModal.jsx';
import CompareView from '../components/compare/CompareView.jsx';
import ScenarioLibrary from '../components/library/ScenarioLibrary.jsx';
import { useStepPlayer } from '../hooks/useStepPlayer.js';
import { useLoadAlgorithms, useAlgorithmMeta } from '../hooks/useAlgorithm.js';
import { useStore } from '../store/useStore.js';
import { api, getClientId } from '../api/client.js';

const DEFAULT_GRAPH = {
nodes: [{ id:'A', label:'A', x:80, y:200 },{ id:'B', label:'B', x:260, y:100 },{ id:'C', label:'C', x:260, y:300 },{ id:'D', label:'D', x:460, y:200 }],
edges: [{ from:'A', to:'B', weight:1 },{ from:'A', to:'C', weight:4 },{ from:'B', to:'D', weight:2 },{ from:'C', to:'D', weight:1 }],
start:'A', target:'D'
};
function genArray(kind, n = 16) {
const base = Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
if (kind === 'reversed') return base.sort((a, b) => b - a);
if (kind === 'nearly') { const a = base.sort((x, y) => x - y); for (let i = 0; i < 2; i++) { const j = Math.floor(Math.random() * n), k = Math.floor(Math.random() * n); [a[j], a[k]] = [a[k], a[j]]; } return a; }
return base;
}
export default function Workspace() {
useLoadAlgorithms(); useStepPlayer();
const { id } = useParams();
const meta = useAlgorithmMeta(id);
const { steps, currentStep, runAlgorithm, mode, error, algorithms } = useStore();
const [graphState, setGraphState] = useState(DEFAULT_GRAPH);
const [quizOpen, setQuizOpen] = useState(false);
const [savingName, setSavingName] = useState('');
const step = steps[currentStep];
const isGraph = meta?.category === 'graph';
useEffect(() => {
if (!meta) return;
if (isGraph) return runAlgorithm(id, { graph: graphState }).catch(() => {});
const arr = [42, 17, 8, 33, 29, 5, 71, 60, 12];
if (meta.category === 'searching') return runAlgorithm(id, { array: [...arr].sort((a, b) => a - b), target: 29 }).catch(() => {});
runAlgorithm(id, { array: arr }).catch(() => {});
// eslint-disable-next-line
}, [meta?.id]);
if (!meta) return <PageShell><p className="text-slate-400">Loading…</p></PageShell>;
const runWithArray = (payload) => { if (payload.error) return useStore.setState({ error: payload.error }); runAlgorithm(id, payload).catch(() => {}); };
const runPreset = (kind) => runWithArray({ array: genArray(kind) });
const runGraph = () => runAlgorithm(id, { graph: graphState }).catch(() => {});
const saveScenario = async () => {
if (!savingName.trim()) return;
const payload = isGraph ? { graph: graphState } : { array: step?.array || [] };
try { await api.post('/scenarios', { clientId: getClientId(), name: savingName, category: meta.category, payload }); setSavingName(''); } catch {}
};
const loadScenario = (s) => {
if (s.category === 'graph') { setGraphState(s.payload.graph); runAlgorithm(id, { graph: s.payload.graph }).catch(() => {}); }
else runAlgorithm(id, { array: s.payload.array }).catch(() => {});
};
return (<PageShell>
<div className="flex items-baseline justify-between mb-3">
<div><h1 className="text-2xl font-semibold">{meta.name}</h1><p className="text-sm text-slate-400">{meta.description}</p></div>
<div className="text-xs text-slate-500">{meta.category}</div>
</div>
{error && <div className="mb-3 text-sm text-swap bg-swap/10 border border-swap/30 rounded p-2">{error}</div>}
<div className="grid lg:grid-cols-3 gap-4">
<div className="lg:col-span-2 space-y-3">
<ControlBar onRun={isGraph ? runGraph : () => runWithArray({ array: step?.array || genArray('random') })} onRandom={() => runPreset('random')} onQuiz={() => setQuizOpen(true)} />
<div className="card p-3">{isGraph ? <GraphCanvas graph={step?.graph || graphState} highlights={step?.highlights} /> : <ArrayBars array={step?.array || []} highlights={step?.highlights} />}</div>
{!isGraph && <Legend />}
<ExplanationPanel text={step?.explanation} mode={mode} />
{isGraph && <GraphEditor value={graphState} onChange={setGraphState} />}
</div>
<div className="space-y-3">
<PseudocodePanel pseudocode={meta.pseudocode} line={step?.pseudocodeLine ?? -1} />
<StatsPanel step={step} complexity={meta.complexity} mode={mode} />
{!isGraph && <InputPanel category={meta.category} onRun={runWithArray} onPreset={runPreset} />}
<div className="card p-3 text-xs space-y-2">
<input value={savingName} onChange={(e) => setSavingName(e.target.value)} placeholder="Save current input as…" className="w-full bg-black/30 p-1.5 rounded border border-white/10" />
<button className="btn w-full" onClick={saveScenario} disabled={!savingName.trim()}>Save</button>
</div>
<ScenarioLibrary onLoad={loadScenario} />
{meta.category !== 'graph' && (<CompareView input={{ array: step?.array || genArray('random') }} algorithms={(algorithms || []).filter((a) => a.category === meta.category)} />)}
</div>
</div>
<QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
</PageShell>);
}
