import mongoose from 'mongoose';

const WorkshopAdminCredentialSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true, default: 'workshop-results' },
    passwordHash: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.models.WorkshopAdminCredential ||
  mongoose.model('WorkshopAdminCredential', WorkshopAdminCredentialSchema);
