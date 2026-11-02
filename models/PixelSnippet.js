import mongoose from 'mongoose';

const PixelSnippetSchema = new mongoose.Schema(
  {
    type: { type: String, default: 'generic' },
    pixelId: { type: String, default: '' },
    snippet: { type: String, required: true },
    status: { type: String, enum: ['active', 'paused'], default: 'active' },
  },
  { timestamps: true, versionKey: false }
);

PixelSnippetSchema.index({ createdAt: -1 });

export default mongoose.models.PixelSnippet || mongoose.model('PixelSnippet', PixelSnippetSchema);
