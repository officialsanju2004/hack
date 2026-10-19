import { z } from 'zod';
import QuizAttempt from '../models/QuizAttempt.js';
import Progress from '../models/Progress.js';
const schema = z.object({ clientId: z.string().min(4).max(64), algorithm: z.string(), correct: z.boolean(), chosen: z.string().optional(), expected: z.string().optional() });
export async function postAttempt(req, res, next) {
try { const data = schema.parse(req.body); await QuizAttempt.create(data);
const progress = await Progress.findOneAndUpdate({ clientId: data.clientId, algorithm: data.algorithm }, { $inc: { attempts: 1, correct: data.correct ? 1 : 0 }, $set: { lastSeenAt: new Date() } }, { upsert: true, new: true });
res.json({ ok: true, progress }); } catch (e) { next(e); }
}
export async function getProgress(req, res, next) {
try { const { clientId } = req.query; if (!clientId) return res.status(400).json({ error: 'clientId required' });
res.json({ progress: await Progress.find({ clientId }) }); } catch (e) { next(e); }
}
