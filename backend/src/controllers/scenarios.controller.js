import { z } from 'zod';
import Scenario from '../models/Scenario.js';
const create = z.object({ clientId: z.string().min(4).max(64), name: z.string().min(1).max(80), category: z.enum(['sorting','searching','graph']), payload: z.any() });
export async function createScenario(req, res, next) { try { res.status(201).json(await Scenario.create(create.parse(req.body))); } catch (e) { next(e); } }
export async function listScenarios(req, res, next) {
try { const { clientId } = req.query; if (!clientId) return res.status(400).json({ error: 'clientId required' });
res.json({ scenarios: await Scenario.find({ clientId }).sort({ createdAt: -1 }).limit(100) }); } catch (e) { next(e); }
}
export async function deleteScenario(req, res, next) { try { await Scenario.findByIdAndDelete(req.params.id); res.json({ ok: true }); } catch (e) { next(e); } }
