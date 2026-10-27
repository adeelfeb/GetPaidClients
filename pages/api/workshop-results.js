import { applyCors } from '../../utils';
import { jsonError, jsonSuccess } from '../../lib/response';
import connectDB from '../../lib/db';
import WorkshopRegistration from '../../models/WorkshopRegistration';
import {
  clearWorkshopAdminCookie,
  isWorkshopAdminRequest,
  setWorkshopAdminCookie,
  verifyWorkshopPassword,
} from '../../lib/workshopAdmin';

export default async function handler(req, res) {
  if (await applyCors(req, res)) return;

  if (req.method === 'POST') {
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!(await verifyWorkshopPassword(password))) {
      return jsonError(res, 401, 'Invalid password');
    }
    setWorkshopAdminCookie(res, req);
    return jsonSuccess(res, 200, 'Authenticated');
  }

  if (req.method === 'DELETE') {
    clearWorkshopAdminCookie(res, req);
    return jsonSuccess(res, 200, 'Signed out');
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return jsonError(res, 405, `Method ${req.method} not allowed`);
  }

  if (!isWorkshopAdminRequest(req)) return jsonError(res, 401, 'Authentication required');
  const db = await connectDB();
  if (!db.success) return jsonError(res, 503, 'Database unavailable');

  const entries = await WorkshopRegistration.find({})
    .sort({ submittedAt: -1 })
    .select('name email phone submittedAt createdAt -_id')
    .lean();
  return jsonSuccess(res, 200, 'Workshop registrations', entries);
}
