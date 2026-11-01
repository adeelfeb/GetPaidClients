import { applyCors } from '../../utils';
import { jsonError, jsonSuccess } from '../../lib/response';
import { isWorkshopAdminRequest } from '../../lib/workshopAdmin';
import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'pixel-code.json');

function readStored() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return null; }
}
function writeStored(obj) {
  try { fs.mkdirSync(path.dirname(FILE), { recursive: true }); fs.writeFileSync(FILE, JSON.stringify(obj, null, 2)); return true; } catch { return false; }
}
function parseSnippet(snippet) {
  const idMatch = snippet.match(/fbq\('init',\s*'([^']+)'\)/) || snippet.match(/tr\?id=(\d+)/);
  const noscriptMatch = snippet.match(/src="(https:\/\/www\.facebook\.com\/tr\?id=\d+[^"]*)"/);
  return { pixelId: idMatch ? idMatch[1] : null, noscriptSrc: noscriptMatch ? noscriptMatch[1] : null, snippet };
}

export default async function handler(req, res) {
  if (await applyCors(req, res)) return;
  if (!isWorkshopAdminRequest(req)) return jsonError(res, 401, 'Authentication required');

  if (req.method === 'GET') {
    return jsonSuccess(res, 200, 'Pixel code', readStored());
  }
  if (req.method === 'POST') {
    const snippet = typeof req.body?.snippet === 'string' ? req.body.snippet : '';
    if (!snippet.trim()) return jsonError(res, 400, 'Snippet required');
    const parsed = parseSnippet(snippet);
    if (!parsed.pixelId) return jsonError(res, 400, 'Could not extract pixel id');
    const existing = readStored();
    if (existing && existing.snippet === snippet) return jsonError(res, 409, 'This snippet was already added and is current');
    const stored = { ...parsed, updatedAt: new Date().toISOString() };
    if (!writeStored(stored)) return jsonError(res, 500, 'Could not store');
    return jsonSuccess(res, 200, 'Stored', stored);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  return jsonError(res, 405, `Method ${req.method} not allowed`);
}