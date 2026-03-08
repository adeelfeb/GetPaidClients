import { sendEmail } from '../../utils/email';
import { jsonError, jsonSuccess } from '../../lib/response';
import { applyCors } from '../../utils';
import { logger } from '../../utils/logger';
import { requireRecaptcha } from '../../lib/recaptcha';

/**
 * Workshop signup endpoint (email only).
 * POST /api/workshop
 * Body: { "email": "user@example.com", "recaptchaToken"?: "..." }
 */
export default async function handler(req, res) {
  if (await applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return jsonError(res, 405, `Method ${req.method} not allowed`);
  }

  const ok = await requireRecaptcha(req, res, jsonError);
  if (!ok) return;

  const { email } = req.body || {};
  const emailStr = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!emailStr) {
    return jsonError(res, 400, 'Email is required');
  }
  if (!/.+@.+\..+/.test(emailStr)) {
    return jsonError(res, 400, 'Invalid email format');
  }

  try {
    const subject = 'New Workshop Signup';
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Workshop Signup</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; margin-top: 0;">New Workshop Signup</h2>
          <p><strong>Email:</strong> ${emailStr}</p>
          <p style="font-size: 12px; color: #777;">GetPaid Workshop registration form.</p>
        </div>
      </body>
      </html>
    `;
    const textBody = `New Workshop Signup\n\nEmail: ${emailStr}\n\n---\nGetPaid Workshop registration form.`;

    const to = process.env.WORKSHOP_NOTIFY_EMAIL || process.env.CONTACT_NOTIFY_EMAIL || 'at4563323@gmail.com';
    await sendEmail({
      to,
      subject,
      htmlBody,
      textBody,
    });

    logger.info(`Workshop signup received: ${emailStr}`);
    return jsonSuccess(res, 200, "You're on the list! We'll be in touch soon.");
  } catch (error) {
    logger.error('Workshop signup failed:', error.message);
    return jsonError(res, 500, 'Something went wrong. Please try again later.', { error: error.message });
  }
}
