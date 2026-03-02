const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
export async function ingest(identifier: string) { return fetch(`${API}/api/company/ingest`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ identifier }) }).then(r => r.json()); }
export async function getCompany(cin: string) { return fetch(`${API}/api/company/${cin}`).then(r => r.json()); }
