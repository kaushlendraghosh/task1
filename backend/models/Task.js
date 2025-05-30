import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  priority: { type: String, default: 'low' }
});

export default mongoose.model('Task', taskSchema);
