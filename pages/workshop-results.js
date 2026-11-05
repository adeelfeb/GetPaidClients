import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function WorkshopResultsPage() {
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [sending, setSending] = useState(false);
  const [compose, setCompose] = useState({ to: '', subject: '', body: '' });
  const [msg, setMsg] = useState('');

  const loadEntries = async () => {
    const response = await fetch('/api/workshop-results', { credentials: 'include' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Authentication required');
    setEntries(data.data || []);
  };

  const loadAdmin = async () => {
    try {
      const r = await fetch('/api/notification-recipients', { credentials: 'include' });
      if (r.ok) { const d = await r.json(); setRecipients(d.data || []); }
      const l = await fetch('/api/email-delivery-logs', { credentials: 'include' });
      if (l.ok) { const d = await l.json(); setLogs(d.data || []); }
    } catch {}
  };
  useEffect(() => { loadEntries().catch(() => setEntries(null)); loadAdmin(); }, []);

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

  const addRecipient = async (e) => {
    e.preventDefault(); setMsg(''); setAdding(true);
    try {
      const res = await fetch('/api/notification-recipients', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: newEmail }) });
      const data = await res.json();
      if (!res.ok) { setMsg(data.message || 'Failed'); return; }
      setNewEmail(''); loadAdmin();
    } finally { setAdding(false); }
  };
  const removeRecipient = async (id) => {
    await fetch('/api/notification-recipients', { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    loadAdmin();
  };
  const sendMail = async (e) => {
    e.preventDefault(); setMsg(''); setSending(true);
    try {
      const res = await fetch('/api/send-email', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(compose) });
      const data = await res.json();
      if (!res.ok) { setMsg(data.message || 'Failed'); return; }
      setMsg('Sent'); setCompose({ to: '', subject: '', body: '' }); loadAdmin();
    } finally { setSending(false); }
  };

  const filtered = (entries || []).filter((e) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [e.name, e.email, e.phone].some((v) => String(v || '').toLowerCase().includes(q));
  });

  const downloadExcel = async () => {
    const XLSX = await import('xlsx');
    const rows = filtered.map((e) => ({ Name: e.name, Email: e.email, Phone: e.phone, Submitted: new Date(e.submittedAt).toISOString() }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    XLSX.writeFile(wb, 'workshop-registrations.xlsx');
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
        </form> : <>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter by name, email or phone" className="rounded-lg border px-4 py-2 text-sm" />
            <button onClick={downloadExcel} className="rounded-lg bg-emerald-700 px-5 py-2 font-semibold text-white">Download Excel</button>
            <span className="text-sm text-slate-500">{filtered.length} of {entries.length} records</span>
          </div>
          <div className="mt-4 max-h-[520px] overflow-auto rounded-lg border">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead><tr className="border-b bg-slate-50">
                <th className="sticky top-0 z-10 bg-slate-50 p-3">Name</th>
                <th className="sticky top-0 z-10 bg-slate-50 p-3">Email</th>
                <th className="sticky top-0 z-10 bg-slate-50 p-3">Phone</th>
                <th className="sticky top-0 z-10 bg-slate-50 p-3">Submitted</th>
              </tr></thead>
              <tbody>{filtered.map((entry) => <tr key={`${entry.email}-${entry.submittedAt}`} className="border-b"><td className="p-3">{entry.name}</td><td className="p-3">{entry.email}</td><td className="p-3">{entry.phone}</td><td className="p-3">{new Date(entry.submittedAt).toLocaleString()}</td></tr>)}</tbody>
            </table>
            {filtered.length === 0 && <p className="py-6 text-center text-slate-500">No registrations match.</p>}
          </div>

          <h2 className="mt-8 text-xl font-bold">Notification recipients</h2>
          <form onSubmit={addRecipient} className="mt-3 flex gap-2">
            <input value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} placeholder="email@example.com" className="rounded-lg border px-4 py-2 text-sm" />
            <button disabled={adding} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">{adding?'Adding…':'Add'}</button>
          </form>
          <ul className="mt-2 space-y-1 text-sm">{recipients.map((r)=><li key={r._id} className="flex items-center gap-2">{r.email} <button onClick={()=>removeRecipient(r._id)} className="text-red-600">remove</button></li>)}</ul>

          <h2 className="mt-8 text-xl font-bold">Compose email</h2>
          <form onSubmit={sendMail} className="mt-3 space-y-2 max-w-2xl">
            <input value={compose.to} onChange={(e)=>setCompose({...compose,to:e.target.value})} placeholder="To" className="w-full rounded-lg border px-4 py-2 text-sm" />
            <input value={compose.subject} onChange={(e)=>setCompose({...compose,subject:e.target.value})} placeholder="Subject" className="w-full rounded-lg border px-4 py-2 text-sm" />
            <textarea value={compose.body} onChange={(e)=>setCompose({...compose,body:e.target.value})} placeholder="Body" rows={4} className="w-full rounded-lg border px-4 py-2 text-sm" />
            <button disabled={sending} className="rounded-lg bg-emerald-700 px-5 py-2 font-semibold text-white">{sending?'Sending…':'Send'}</button>
          </form>

          <h2 className="mt-8 text-xl font-bold">Delivery log</h2>
          <div className="mt-3 max-h-[320px] overflow-auto rounded-lg border">
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="border-b bg-slate-50"><th className="p-2">Recipient</th><th className="p-2">Subject</th><th className="p-2">Time</th><th className="p-2">Status</th></tr></thead>
              <tbody>{logs.map((l)=><tr key={l._id} className="border-b"><td className="p-2">{l.to}</td><td className="p-2">{l.subject}</td><td className="p-2">{new Date(l.createdAt).toLocaleString()}</td><td className="p-2">{l.success?'OK':'FAIL'}</td></tr>)}</tbody>
            </table>
          </div>
          {msg && <p className="mt-2 text-sm text-blue-700">{msg}</p>}
        </>}
      </div>
    </main>
  </>;
}
