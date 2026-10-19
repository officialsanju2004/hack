import mongoose from 'mongoose';
const S = new mongoose.Schema({
clientId: { type: String, required: true },
algorithm: { type: String, required: true },
attempts: { type: Number, default: 0 },
correct: { type: Number, default: 0 },
lastSeenAt: { type: Date, default: Date.now }
});
S.index({ clientId: 1, algorithm: 1 }, { unique: true });
export default mongoose.model('Progress', S);
