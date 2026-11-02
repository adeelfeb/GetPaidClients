import fs from 'fs/promises';
import path from 'path';
import connectDB from './db';
import PixelSnippet from '../models/PixelSnippet';
import parseSnippet from './parseSnippet';

const FILE_PATH = path.join(process.cwd(), 'data', 'pixel-snippets.json');

const DEFAULT_SNIPPETS = [
  `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1992379551397361');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1992379551397361&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`,
  `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '527572000359726');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=527572000359726&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`,
];

async function readFileStore() {
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf-8');
    const json = JSON.parse(raw);
    if (Array.isArray(json?.snippets) && json.snippets.length) return json.snippets;
  } catch {}
  // seed defaults
  const seeded = DEFAULT_SNIPPETS.map((sn, i) => {
    const p = parseSnippet(sn);
    return { id: 'default-' + i, type: p.type, pixelId: p.pixelId, snippet: sn, status: 'active', createdAt: new Date().toISOString() };
  });
  await writeFileStore(seeded);
  return seeded;
}

async function writeFileStore(snippets) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify({ snippets }, null, 2));
}

function normalizeDbDoc(d) {
  return {
    _id: String(d._id),
    type: d.type,
    pixelId: d.pixelId,
    snippet: d.snippet,
    status: d.status,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

export async function listSnippets() {
  const db = await connectDB();
  if (db.success) {
    let docs = await PixelSnippet.find({}).sort({ createdAt: -1 }).lean();
    if (!docs.length) {
      await PixelSnippet.insertMany(DEFAULT_SNIPPETS.map((sn) => ({ ...parseSnippet(sn), snippet: sn, status: 'active' })));
      docs = await PixelSnippet.find({}).sort({ createdAt: -1 }).lean();
    }
    if (docs.length) return docs.map(normalizeDbDoc);
  }
  return await readFileStore();
}

export async function getActiveSnippets() {
  const all = await listSnippets();
  return all.filter((s) => s.status === 'active');
}

export async function addSnippet(raw) {
  const snippet = String(raw || '').trim();
  if (!snippet) throw new Error('Snippet is required');
  const parsed = parseSnippet(snippet);
  const db = await connectDB();
  if (db.success) {
    const doc = await PixelSnippet.create({ ...parsed, snippet, status: 'active' });
    return normalizeDbDoc(doc.toObject());
  }
  const store = await readFileStore();
  const entry = { id: Date.now().toString(36), ...parsed, snippet, status: 'active', createdAt: new Date().toISOString() };
  store.push(entry);
  await writeFileStore(store);
  return entry;
}

export async function updateSnippet(id, patch) {
  const db = await connectDB();
  if (db.success) {
    const doc = await PixelSnippet.findById(id);
    if (!doc) throw new Error('Snippet not found');
    if (typeof patch.snippet === 'string' && patch.snippet.trim()) {
      const parsed = parseSnippet(patch.snippet);
      doc.snippet = patch.snippet.trim();
      doc.type = parsed.type;
      doc.pixelId = parsed.pixelId;
    }
    if (patch.status === 'active' || patch.status === 'paused') doc.status = patch.status;
    await doc.save();
    return normalizeDbDoc(doc.toObject());
  }
  const store = await readFileStore();
  const idx = store.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error('Snippet not found');
  if (typeof patch.snippet === 'string' && patch.snippet.trim()) {
    const parsed = parseSnippet(patch.snippet);
    store[idx].snippet = patch.snippet.trim();
    store[idx].type = parsed.type;
    store[idx].pixelId = parsed.pixelId;
  }
  if (patch.status === 'active' || patch.status === 'paused') store[idx].status = patch.status;
  await writeFileStore(store);
  return store[idx];
}

export async function deleteSnippet(id) {
  const db = await connectDB();
  if (db.success) {
    await PixelSnippet.deleteOne({ _id: id });
    return true;
  }
  const store = await readFileStore();
  const next = store.filter((s) => s.id !== id);
  await writeFileStore(next);
  return true;
}
