import { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../components/designndev/Footer';

export default function PixelCodePage() {
  const [password, setPassword] = useState('');
  const [current, setCurrent] = useState(null);
  const [snippet, setSnippet] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

  const load = async () => {
    const r = await fetch('/api/pixel-code', { credentials: 'include' });
    const d = await r.json();
    if (!r.ok) throw new Error(d.message || 'Auth required');
    setCurrent(d.data); setAuthed(true);
  };
  useEffect(() => { load().catch(() => setAuthed(false)); }, []);

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
      const r = await fetch('/api/pixel-code', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ snippet }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      setCurrent(d.data); setSnippet('');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return <>
    <Head><title>Pixel code</title></Head>
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-xl sm:p-10">
        <h1 className="text-2xl font-bold">Pixel code</h1>
        {!authed ? <form onSubmit={login} className="mt-8 max-w-md space-y-4">
          <p className="text-slate-600">Enter the results password.</p>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border px-4 py-3" placeholder="Password" />
          <button disabled={loading} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white">{loading ? 'Checking…' : 'Unlock'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form> : <>
          <h2 className="mt-6 font-semibold">Currently used</h2>
          <pre className="mt-2 max-h-64 overflow-auto rounded bg-slate-50 p-3 text-xs">{current ? JSON.stringify(current, null, 2) : 'none'}</pre>
          <form onSubmit={save} className="mt-6 space-y-3">
            <textarea value={snippet} onChange={(e) => setSnippet(e.target.value)} rows={10} className="w-full rounded-lg border px-3 py-2 font-mono text-xs" placeholder="Paste Meta Pixel snippet" />
            <button disabled={loading} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white">{loading ? 'Saving…' : 'Save snippet'}</button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </>}
      </div>
      <Footer />
    </main>
  </>;
}