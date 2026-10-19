import { listAlgorithms, ALGORITHMS } from '../services/algorithms/index.js';
export function getAlgorithms(_req, res) { res.json({ algorithms: listAlgorithms() }); }
export function getAlgorithm(req, res) {
const a = ALGORITHMS[req.params.id];
if (!a) return res.status(404).json({ error: 'Not found' });
const { run, ...meta } = a; res.json(meta);
}
