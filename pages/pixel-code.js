import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function PixelCodePage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [formSnippet, setFormSnippet] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    const r = await fetch('/api/pixel-snippets', { credentials: 'include' });
    const d = await r.json();
    if (!r.ok) { setAuthed(false); return; }
    setAuthed(true);
    setSnippets(Array.isArray(d.data) ? d.data : []);
  };

  useEffect(() => { load(); }, []);

  const login = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const r = await fetch('/api/workshop-results', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Invalid password');
      setPassword(''); await load();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const save = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const url = '/api/pixel-snippets';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, snippet: formSnippet } : { snippet: formSnippet };
      const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Save failed');
      setFormSnippet(''); setEditingId(null); await load();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const toggle = async (s) => {
    await fetch('/api/pixel-snippets', { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s._id || s.id, status: s.status === 'active' ? 'paused' : 'active' }) });
    await load();
  };

  const remove = async (s) => {
    if (!confirm('Delete this snippet?')) return;
    await fetch('/api/pixel-snippets', { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s._id || s.id }) });
    await load();
  };

  const edit = (s) => { setEditingId(s._id || s.id); setFormSnippet(s.snippet); };

  if (authed === null) return <main className="min-h-screen bg-slate-100 px-4 py-12"><p>Loading…</p></main>;
  if (!authed) return (
    <>
      <Head><title>Pixel code</title></Head>
      <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-bold">Pixel code</h1>
          <form onSubmit={login} className="mt-6 space-y-4">
            <p className="text-slate-600">Enter the results password.</p>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border px-4 py-3" placeholder="Password" />
            <button disabled={loading} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white">{loading ? 'Checking…' : 'Unlock'}</button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );

  return (
    <>
      <Head><title>Pixel code</title></Head>
      <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-xl sm:p-10">
          <h1 className="text-2xl font-bold">Pixel code snippets</h1>
          <p className="mt-2 text-slate-600">Paste a code snippet; the system extracts the pixel id and uses active ones in the site header.</p>
          <form onSubmit={save} className="mt-6 space-y-3">
            <textarea value={formSnippet} onChange={(e) => setFormSnippet(e.target.value)} rows={6} className="w-full rounded-lg border px-4 py-3 font-mono text-sm" placeholder="Paste code snippet (e.g. Meta Pixel)" />
            <div className="flex gap-2">
              <button disabled={loading || !formSnippet.trim()} className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white">{editingId ? 'Save changes' : 'Add snippet'}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setFormSnippet(''); }} className="rounded-lg border px-5 py-2">Cancel</button>}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead><tr className="border-b bg-slate-50">
                <th className="p-3">Type</th><th className="p-3">Pixel ID</th><th className="p-3">Status</th><th className="p-3">Snippet</th><th className="p-3">Actions</th>
              </tr></thead>
              <tbody>
                {snippets.map((s) => (
                  <tr key={s._id || s.id} className="border-b">
                    <td className="p-3">{s.type}</td>
                    <td className="p-3 font-mono">{s.pixelId || '—'}</td>
                    <td className="p-3">{s.status}</td>
                    <td className="p-3 max-w-xs truncate font-mono text-xs">{s.snippet}</td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => edit(s)} className="text-blue-700">Edit</button>
                      <button onClick={() => toggle(s)} className="text-amber-700">{s.status === 'active' ? 'Pause' : 'Resume'}</button>
                      <button onClick={() => remove(s)} className="text-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
                {snippets.length === 0 && <tr><td colSpan={5} className="p-6 text-slate-500">No snippets yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
