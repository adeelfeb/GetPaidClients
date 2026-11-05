import { applyCors } from '../../utils';
import { jsonError, jsonSuccess } from '../../lib/response';
import connectDB from '../../lib/db';
import { isWorkshopAdminRequest } from '../../lib/workshopAdmin';
import EmailDeliveryLog from '../../models/EmailDeliveryLog';

export default async function handler(req, res) {
  if (await applyCors(req, res)) return;
  if (!isWorkshopAdminRequest(req)) return jsonError(res, 401, 'Authentication required');
  if (req.method !== 'GET') { res.setHeader('Allow',['GET']); return jsonError(res,405,'Method not allowed'); }
  const db = await connectDB();
  if (!db.success) return jsonError(res, 503, 'Database unavailable');
  const logs = await EmailDeliveryLog.find({}).sort({ createdAt: -1 }).limit(100).lean();
  return jsonSuccess(res, 200, 'Logs', logs);
}