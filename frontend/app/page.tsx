'use client';
import { useState } from 'react';
import { ingest } from '../lib/api';

export default function Home() {
  const [identifier, setIdentifier] = useState('U12345DL2015PTC000001');
  const [result, setResult] = useState<any>(null);
  return <main className="p-8 space-y-4"><h1 className="text-3xl font-bold">Corporate Intelligence Platform</h1>
    <div className="card space-y-3"><input className="w-full p-2 bg-slate-950 border border-slate-700" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="CIN / Name / PAN" />
    <button className="px-4 py-2 bg-indigo-600 rounded" onClick={async ()=>setResult(await ingest(identifier))}>Analyze Company</button></div>
    {result && <pre className="card overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
  </main>;
}
