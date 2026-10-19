import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { listAlgorithms } from '../services/algorithms/index.js';
(async () => { await connectDB(); console.table(listAlgorithms().map((a) => ({ id: a.id, name: a.name, category: a.category }))); await mongoose.disconnect(); })();
