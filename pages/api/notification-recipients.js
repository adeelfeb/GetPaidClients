import { applyCors } from '../../utils';
import { jsonError, jsonSuccess } from '../../lib/response';
import connectDB from '../../lib/db';
import NotificationRecipient from '../../models/NotificationRecipient';
import { isWorkshopAdminRequest } from '../../lib/workshopAdmin';

export default async function handler(req, res) {
  if (await applyCors(req, res)) return;
  if (!isWorkshopAdminRequest(req)) return jsonError(res, 401, 'Authentication required');
  const db = await connectDB();
  if (!db.success) return jsonError(res, 503, 'Database unavailable');

  if (req.method === 'GET') {
    const items = await NotificationRecipient.find({}).sort({ createdAt: -1 }).lean();
    return jsonSuccess(res, 200, 'Recipients', items);
  }
  if (req.method === 'POST') {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const purpose = typeof req.body?.purpose === 'string' ? req.body.purpose.trim() : 'workshop';
    if (!/.+@.+\..+/.test(email)) return jsonError(res, 400, 'Invalid email');
    try {
      const doc = await NotificationRecipient.create({ email, purpose });
      return jsonSuccess(res, 201, 'Added', doc);
    } catch (e) {
      if (e?.code === 11000) return jsonError(res, 409, 'Already exists');
      return jsonError(res, 500, 'Failed to add');
    }
  }
  if (req.method === 'DELETE') {
    const id = req.body?.id || req.query?.id;
    await NotificationRecipient.deleteOne({ _id: id });
    return jsonSuccess(res, 200, 'Removed');
  }
  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return jsonError(res, 405, `Method ${req.method} not allowed`);
}