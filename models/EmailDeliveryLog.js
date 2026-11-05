import mongoose from 'mongoose';

const EmailDeliveryLogSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  success: { type: Boolean, required: true },
  error: { type: String, default: '' },
  messageId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.EmailDeliveryLog || mongoose.model('EmailDeliveryLog', EmailDeliveryLogSchema);