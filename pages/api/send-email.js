import { applyCors } from '../../utils';
import { jsonError, jsonSuccess } from '../../lib/response';
import connectDB from '../../lib/db';
import { isWorkshopAdminRequest } from '../../lib/workshopAdmin';
import { sendEmail } from '../../lib/email/smtpMaster';
import EmailDeliveryLog from '../../models/EmailDeliveryLog';

function escapeHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

export default async function handler(req, res) {
  if (await applyCors(req, res)) return;
  if (!isWorkshopAdminRequest(req)) return jsonError(res, 401, 'Authentication required');
  if (req.method !== 'POST') { res.setHeader('Allow',['POST']); return jsonError(res,405,'Method not allowed'); }
  const to = typeof req.body?.to === 'string' ? req.body.to.trim() : '';
  const subject = typeof req.body?.subject === 'string' ? req.body.subject.trim() : '';
  const body = typeof req.body?.body === 'string' ? req.body.body : '';
  if (!/.+@.+\..+/.test(to)) return jsonError(res, 400, 'Invalid recipient');
  if (!subject) return jsonError(res, 400, 'Subject required');
  if (!body) return jsonError(res, 400, 'Body required');

  const db = await connectDB();
  const html = `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(body)}</pre>`;
  const result = await sendEmail({ to, subject, text: body, html });

  if (db.success) {
    await EmailDeliveryLog.create({ to, subject, success: !!result.success, error: result.error || '', messageId: result.messageId || null }).catch(()=>{});
  }
  if (!result.success) return jsonError(res, 502, result.error || 'Failed to send');
  return jsonSuccess(res, 200, 'Sent', result);
}