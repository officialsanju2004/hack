import mongoose from 'mongoose';
const S = new mongoose.Schema({
clientId: { type: String, required: true, index: true },
algorithm: { type: String, required: true },
correct: { type: Boolean, required: true },
chosen: String, expected: String,
createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('QuizAttempt', S);
