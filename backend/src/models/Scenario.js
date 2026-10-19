import mongoose from 'mongoose';
const S = new mongoose.Schema({
clientId: { type: String, required: true, index: true },
name: { type: String, required: true, maxlength: 80 },
category: { type: String, enum: ['sorting', 'searching', 'graph'], required: true },
payload: { type: mongoose.Schema.Types.Mixed, required: true },
createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Scenario', S);
