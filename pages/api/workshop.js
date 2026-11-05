import { sendEmail } from '../../lib/email/smtpMaster';
import EmailDeliveryLog from '../../models/EmailDeliveryLog';
import { jsonError, jsonSuccess } from '../../lib/response';
import { applyCors } from '../../utils';
import { logger } from '../../utils/logger';
import connectDB from '../../lib/db';
import { env } from '../../lib/config';
import WorkshopRegistration from '../../models/WorkshopRegistration';
import NotificationRecipient from '../../models/NotificationRecipient';

/**
 * Workshop signup endpoint.
 * POST /api/workshop
 * Body: { "name": "...", "email": "...", "phone": "...", "website"?: "", "openedAt"?: 123 }
 */
export default async function handler(req, res) {
  if (await applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return jsonError(res, 405, `Method ${req.method} not allowed`);
  }

  const { name, email, phone, website, openedAt } = req.body || {};
  const nameStr = typeof name === 'string' ? name.trim() : '';
  const emailStr = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const phoneStr = typeof phone === 'string' ? phone.trim() : '';

  if (typeof website === 'string' && website.trim()) {
    logger.warn('Workshop signup rejected by honeypot');
    return jsonSuccess(res, 200, "You're on the list! We'll be in touch soon.");
  }

  const openedAtMs = Number(openedAt);
  if (Number.isFinite(openedAtMs) && Date.now() - openedAtMs < 3000) {
    return jsonError(res, 400, 'Please wait a moment before submitting the form.');
  }

  if (!nameStr || !emailStr || !phoneStr) {
    return jsonError(res, 400, 'Name, email, and phone are required');
  }

  if (nameStr.length < 2 || nameStr.length > 80) {
    return jsonError(res, 400, 'Please enter a valid name');
  }

  if (!emailStr) {
    return jsonError(res, 400, 'Email is required');
  }
  if (!/.+@.+\..+/.test(emailStr)) {
    return jsonError(res, 400, 'Invalid email format');
  }

  if (phoneStr.length < 7 || phoneStr.length > 20 || !/^[\d+\-\s()]+$/.test(phoneStr)) {
    return jsonError(res, 400, 'Please enter a valid phone number');
  }

  try {
    const db = await connectDB();
    if (!db.success) {
      logger.error('Workshop signup database unavailable:', db.error?.message);
      return jsonError(res, 503, 'Registration is temporarily unavailable. Please try again shortly.');
    }

    const subject = 'New Workshop Signup';
    const submittedAt = new Date().toISOString();
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Workshop Signup</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; margin-top: 0;">New Workshop Signup</h2>
          <p><strong>Name:</strong> ${nameStr}</p>
          <p><strong>Email:</strong> ${emailStr}</p>
          <p><strong>Phone:</strong> ${phoneStr}</p>
          <p><strong>Submitted At:</strong> ${submittedAt}</p>
          <p style="font-size: 12px; color: #777;">Copy-friendly row: ${nameStr} | ${emailStr} | ${phoneStr} | ${submittedAt}</p>
        </div>
      </body>
      </html>
    `;
    const textBody = `New Workshop Signup

Name: ${nameStr}
Email: ${emailStr}
Phone: ${phoneStr}
Submitted At: ${submittedAt}

Copy-friendly row:
${nameStr} | ${emailStr} | ${phoneStr} | ${submittedAt}`;

    await WorkshopRegistration.create({
      name: nameStr,
      email: emailStr,
      phone: phoneStr,
      submittedAt,
    });

    const recipientsDocs = await NotificationRecipient.find({ purpose: 'workshop' }).lean();
    const toList = recipientsDocs.length ? recipientsDocs.map((r) => r.email) : (env.WORKSHOP_NOTIFICATION_EMAIL ? env.WORKSHOP_NOTIFICATION_EMAIL.split(',').map((s) => s.trim()).filter(Boolean) : []);
    const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeHtmlBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Workshop Signup</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; margin-top: 0;">New Workshop Intake Submission — GetPaidClients</h2>
          <p><strong>Name:</strong> ${esc(nameStr)}</p>
          <p><strong>Email:</strong> ${esc(emailStr)}</p>
          <p><strong>Phone:</strong> ${esc(phoneStr)}</p>
          <p><strong>Submitted At:</strong> ${esc(submittedAt)}</p>
        </div>
      </body>
      </html>
    `;
    for (const to of toList) {
      sendEmail({ to, subject: 'New Workshop Intake Submission — GetPaidClients', text: textBody, html: safeHtmlBody })
        .then((r) => {
          EmailDeliveryLog.create({ to, subject: 'New Workshop Intake Submission — GetPaidClients', success: !!r.success, error: r.error || '', messageId: r.messageId || null }).catch(()=>{});
          if (!r.success) logger.warn('Workshop notification failed', { error: r.error });
        })
        .catch((e) => { EmailDeliveryLog.create({ to, subject: 'New Workshop Intake Submission — GetPaidClients', success: false, error: e?.message || 'Failed' }).catch(()=>{}); logger.warn('Workshop notification failed', { error: e?.message }); });
    }

    logger.info(`Workshop signup received: ${emailStr} (${phoneStr})`);
    return jsonSuccess(res, 200, "You're on the list! We'll be in touch soon.");
  } catch (error) {
    logger.error('Workshop signup failed:', error.message);
    return jsonError(res, 500, 'Something went wrong. Please try again later.', { error: error.message });
  }
}
