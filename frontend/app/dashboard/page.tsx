export default function Dashboard() {
  return <main className="p-8 grid gap-4 md:grid-cols-2">
    <section className="card"><h2 className="text-xl font-semibold">Financial Analytics Panel</h2><p>Revenue growth, margins, liquidity, and leverage metrics.</p></section>
    <section className="card"><h2 className="text-xl font-semibold">Compliance Panel</h2><p>GST, legal disputes, and filings tracking.</p></section>
    <section className="card"><h2 className="text-xl font-semibold">Director Network Graph</h2><p>Director-to-company relationships visualized.</p></section>
    <section className="card"><h2 className="text-xl font-semibold">Download Report</h2><p>PDF export with watermark and disclaimer.</p></section>
  </main>;
}
