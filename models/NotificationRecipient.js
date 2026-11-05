import mongoose from 'mongoose';
const schema = new mongoose.Schema({ email: { type: String, required: true, trim: true, lowercase: true }, purpose: { type: String, default: 'workshop' } }, { timestamps: true });
schema.index({ email: 1, purpose: 1 }, { unique: true });
export default mongoose.models.NotificationRecipient || mongoose.model('NotificationRecipient', schema);