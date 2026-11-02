import { applyCors } from '../../utils';
import { jsonError, jsonSuccess } from '../../lib/response';
import connectDB from '../../lib/db';
import {
  listSnippets,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  getActiveSnippets,
} from '../../lib/pixelSnippet';
import { isWorkshopAdminRequest } from '../../lib/workshopAdmin';

export default async function handler(req, res) {
  if (await applyCors(req, res)) return;
  const admin = isWorkshopAdminRequest(req);

  if (req.method === 'GET') {
    if (admin) return jsonSuccess(res, 200, 'Pixel snippets', await listSnippets());
    const active = (await getActiveSnippets()).map(({ type, pixelId }) => ({ type, pixelId }));
    return jsonSuccess(res, 200, 'Active pixel snippets', active);
  }

  if (!admin) return jsonError(res, 401, 'Authentication required');

  if (req.method === 'POST') {
    const snippet = typeof req.body?.snippet === 'string' ? req.body.snippet : '';
    try {
      const stored = await addSnippet(snippet);
      return jsonSuccess(res, 200, 'Snippet saved', stored);
    } catch (e) {
      return jsonError(res, 400, e.message || 'Invalid snippet');
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const { id, snippet, status } = req.body || {};
    if (!id) return jsonError(res, 400, 'id is required');
    try {
      const updated = await updateSnippet(id, { snippet, status });
      return jsonSuccess(res, 200, 'Snippet updated', updated);
    } catch (e) {
      return jsonError(res, 400, e.message || 'Update failed');
    }
  }

  if (req.method === 'DELETE') {
    const id = req.body?.id || req.query?.id;
    if (!id) return jsonError(res, 400, 'id is required');
    await deleteSnippet(id);
    return jsonSuccess(res, 200, 'Snippet deleted');
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
  return jsonError(res, 405, `Method ${req.method} not allowed`);
}
