import { useEffect } from 'react';
import { useStore } from '../store/useStore.js';
export function useStepPlayer() {
const { playing, speed, currentStep, steps, next, setPlaying } = useStore();
useEffect(() => {
if (!playing) return;
if (currentStep >= steps.length - 1) { setPlaying(false); return; }
const t = setTimeout(() => next(), speed);
return () => clearTimeout(t);
}, [playing, speed, currentStep, steps.length, next, setPlaying]);
useEffect(() => {
const onKey = (e) => {
if (['INPUT','TEXTAREA'].includes(e.target.tagName)) return;
if (e.code === 'Space') { e.preventDefault(); setPlaying(!useStore.getState().playing); }
if (e.code === 'ArrowRight') useStore.getState().next();
if (e.code === 'ArrowLeft') useStore.getState().prev();
if (e.code === 'KeyR') useStore.getState().reset();
};
window.addEventListener('keydown', onKey);
return () => window.removeEventListener('keydown', onKey);
}, [setPlaying]);
}
