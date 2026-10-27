import mongoose from 'mongoose';

const WorkshopRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    submittedAt: { type: Date, required: true, default: Date.now, index: true },
  },
  { timestamps: true, versionKey: false }
);

WorkshopRegistrationSchema.index({ createdAt: -1 });

export default mongoose.models.WorkshopRegistration ||
  mongoose.model('WorkshopRegistration', WorkshopRegistrationSchema);
