import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function WorkshopResultsPage() {
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadEntries = async () => {
    const response = await fetch('/api/workshop-results', { credentials: 'include' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Authentication required');
    setEntries(data.data || []);
  };

  useEffect(() => { loadEntries().catch(() => setEntries(null)); }, []);

  const login = async (event) => {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch('/api/workshop-results', {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to authenticate');
      setPassword(''); await loadEntries();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return <>
    <Head><title>Workshop registrations</title></Head>
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-xl sm:p-10">
        <h1 className="text-2xl font-bold">Workshop registrations</h1>
        {entries === null ? <form onSubmit={login} className="mt-8 max-w-md space-y-4">
          <p className="text-slate-600">Enter the results password to view submitted intake forms.</p>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border px-4 py-3" placeholder="Password" />
          <button disabled={loading} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white">{loading ? 'Checking…' : 'View results'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form> : <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr className="border-b bg-slate-50"><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Submitted</th></tr></thead><tbody>{entries.map((entry) => <tr key={`${entry.email}-${entry.submittedAt}`} className="border-b"><td className="p-3">{entry.name}</td><td className="p-3">{entry.email}</td><td className="p-3">{entry.phone}</td><td className="p-3">{new Date(entry.submittedAt).toLocaleString()}</td></tr>)}</tbody></table>{entries.length === 0 && <p className="py-6 text-slate-500">No registrations yet.</p>}</div>}
      </div>
    </main>
  </>;
}
