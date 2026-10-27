import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import connectDB from './db';
import { env } from './config';
import WorkshopAdminCredential from '../models/WorkshopAdminCredential';

export const WORKSHOP_ADMIN_COOKIE = 'workshop_results_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export async function verifyWorkshopPassword(password) {
  if (!password || !env.JWT_SECRET) return false;
  const db = await connectDB();
  if (!db.success) return false;
  const credential = await WorkshopAdminCredential.findOne({ key: 'workshop-results' });
  return Boolean(credential && (await bcrypt.compare(password, credential.passwordHash)));
}

export function setWorkshopAdminCookie(res, req) {
  const secure = req.headers['x-forwarded-proto'] === 'https' || req.connection?.encrypted;
  const token = jwt.sign({ scope: 'workshop-results' }, env.JWT_SECRET, { expiresIn: SESSION_MAX_AGE });
  res.setHeader('Set-Cookie', cookie.serialize(WORKSHOP_ADMIN_COOKIE, token, {
    httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: SESSION_MAX_AGE,
  }));
}

export function clearWorkshopAdminCookie(res, req) {
  const secure = req.headers['x-forwarded-proto'] === 'https' || req.connection?.encrypted;
  res.setHeader('Set-Cookie', cookie.serialize(WORKSHOP_ADMIN_COOKIE, '', {
    httpOnly: true, secure, sameSite: 'lax', path: '/', expires: new Date(0), maxAge: 0,
  }));
}

export function isWorkshopAdminRequest(req) {
  if (!env.JWT_SECRET) return false;
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies[WORKSHOP_ADMIN_COOKIE];
    const payload = token && jwt.verify(token, env.JWT_SECRET);
    return payload?.scope === 'workshop-results';
  } catch {
    return false;
  }
}
