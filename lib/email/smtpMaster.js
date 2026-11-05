import { env } from '../config';
import { logger } from '../../utils/logger';

const TIMEOUT_MS = 10000;

export async function sendEmail({ to, subject, text, html, from, fromName }) {
  const apiKey = env.SMTPMASTER_API_KEY;
  const apiUrl = env.SMTPMASTER_API_URL;
  const sender = from || env.EMAIL_FROM;
  const senderName = fromName || env.EMAIL_FROM_NAME;

  if (!apiKey) return { success: false, error: 'SMTPMaster API key is not configured' };
  if (!apiUrl) return { success: false, error: 'SMTPMaster API URL is not configured' };
  if (!sender) return { success: false, error: 'Sender email is not configured' };
  if (!to) return { success: false, error: 'Recipient email is required' };
  if (!subject) return { success: false, error: 'Subject is required' };
  if (!text && !html) return { success: false, error: 'Email content is required' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        from_email: sender,
        from_name: senderName,
        to_email: to,
        subject,
        body: html || text || '',
      }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      logger.error('SMTPMaster API error', { status: res.status });
      return { success: false, error: `SMTPMaster API error (${res.status})` };
    }
    const messageId = data?.messageId || data?.message_id || data?.id || null;
    return { success: true, messageId };
  } catch (err) {
    logger.error('SMTPMaster send failed', { error: err?.message });
    return { success: false, error: err?.name === 'AbortError' ? 'Request timed out' : 'Failed to send email' };
  } finally {
    clearTimeout(timer);
  }
}

export default { sendEmail };