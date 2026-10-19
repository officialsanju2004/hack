import { useEffect } from 'react';
import { useStore } from '../store/useStore.js';
export function useAlgorithmMeta(id) { return useStore((s) => s.algorithms.find((a) => a.id === id)) || null; }
export function useLoadAlgorithms() { const f = useStore((s) => s.fetchAlgorithms); useEffect(() => { f(); }, [f]); }
