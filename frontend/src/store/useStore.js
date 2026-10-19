import { create } from 'zustand';
import { api } from '../api/client.js';
export const useStore = create((set) => ({
algorithms: [], loadingAlgos: false, activeAlgorithm: null,
steps: [], currentStep: 0, playing: false, speed: 400, mode: 'beginner', error: null,
async fetchAlgorithms() {
set({ loadingAlgos: true });
try { const { data } = await api.get('/algorithms'); set({ algorithms: data.algorithms, loadingAlgos: false }); }
catch (e) { set({ error: e.message, loadingAlgos: false }); }
},
async runAlgorithm(algorithm, input) {
set({ error: null, playing: false, currentStep: 0 });
try { const { data } = await api.post('/run', { algorithm, input }); set({ steps: data.steps, activeAlgorithm: data.meta, currentStep: 0 }); return data; }
catch (e) { const msg = e.response?.data?.error || e.message; set({ error: msg, steps: [] }); throw new Error(msg); }
},
next: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, Math.max(s.steps.length - 1, 0)) })),
prev: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
reset: () => set({ currentStep: 0, playing: false }),
setPlaying: (v) => set({ playing: v }),
setSpeed: (v) => set({ speed: v }),
setMode: (v) => set({ mode: v })
}));
