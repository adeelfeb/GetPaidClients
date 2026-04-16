import { sendEmail } from '../../utils/email';
import { jsonError, jsonSuccess } from '../../lib/response';
import { applyCors } from '../../utils';
import { logger } from '../../utils/logger';

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

    const to = 'smithpatvekar@gmail.com';
    await sendEmail({
      to,
      subject,
      htmlBody,
      textBody,
    });

    logger.info(`Workshop signup received: ${emailStr} (${phoneStr})`);
    return jsonSuccess(res, 200, "You're on the list! We'll be in touch soon.");
  } catch (error) {
    logger.error('Workshop signup failed:', error.message);
    return jsonError(res, 500, 'Something went wrong. Please try again later.', { error: error.message });
  }
}
