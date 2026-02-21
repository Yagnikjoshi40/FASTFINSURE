import { useMemo, useState } from 'react';
import { BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const features: Feature[] = [
  {
    title: 'Instant Quotes',
    description: 'Compare smart policy options in seconds with real-time pricing from our underwriting engine.',
    icon: <Sparkles className="text-trust" />
  },
  {
    title: 'Secure Claims',
    description: 'Submit and track claims securely with encrypted document handling and instant status alerts.',
    icon: <ShieldCheck className="text-action" />
  },
  {
    title: 'AI-Driven Rates',
    description: 'Adaptive machine learning models personalize rates to keep coverage fair and affordable.',
    icon: <BrainCircuit className="text-trust" />
  }
];

const partners = ['NovaBank', 'InsureGrid', 'PayLink', 'SafeRoute', 'MicroFund', 'TrustWave'];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [coverage, setCoverage] = useState(5000);

  const premium = useMemo(() => {
    const baseRate = 0.0075;
    const monthly = coverage * baseRate;
    return monthly.toFixed(2);
  }, [coverage]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-navy transition-colors dark:bg-slate-950 dark:text-slate-50">
        <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
        <main>
          <Hero />

          <section id="services" className="px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-navy dark:text-white">Services engineered for speed and trust</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-2 dark:bg-slate-800">{feature.icon}</div>
                    <h3 className="text-xl font-semibold dark:text-white">{feature.title}</h3>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="px-4 py-14 sm:px-6">
            <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
              <article>
                <h2 className="text-3xl font-bold dark:text-white">Premium Calculator</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Slide to adjust your coverage and get an instant monthly premium estimate.
                </p>
                <label htmlFor="coverage" className="mt-8 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Coverage Amount: ${coverage.toLocaleString()}
                </label>
                <input
                  id="coverage"
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={coverage}
                  onChange={(event) => setCoverage(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-trust dark:bg-slate-700"
                  aria-describedby="premium-value"
                />
              </article>

              <aside className="rounded-xl bg-trust p-6 text-white">
                <p className="text-sm uppercase tracking-wide text-blue-100">Estimated Monthly Premium</p>
                <p id="premium-value" className="mt-2 text-5xl font-extrabold">
                  ${premium}
                </p>
                <p className="mt-4 text-blue-100">No hidden fees. Cancel anytime. Instant digital policy issuance.</p>
              </aside>
            </div>
          </section>

          <section id="about" className="px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold dark:text-white">Trusted by fintech-forward partners</h2>
                <span className="rounded-full bg-action/15 px-4 py-2 text-sm font-semibold text-action">TrustScore 4.9/5</span>
              </div>
              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex min-w-max animate-marquee gap-10 px-6">
                  {[...partners, ...partners].map((partner, index) => (
                    <div
                      key={`${partner}-${index}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
