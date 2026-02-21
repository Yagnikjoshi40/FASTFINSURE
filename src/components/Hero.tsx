import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:pb-20 lg:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <article>
          <p className="mb-4 inline-flex rounded-full bg-trust/10 px-3 py-1 text-sm font-semibold text-trust dark:bg-trust/20">
            Instant protection + smarter financing
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-navy dark:text-white sm:text-5xl">
            Insurance at the Speed of Life
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Get micro-insurance and flexible micro-financing approved in just 60 seconds—backed by AI-powered risk models
            and bank-grade security.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              id="get-started"
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-trust px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Start in 60 Seconds
              <ArrowRight size={18} />
            </a>
            <a href="#about" className="text-sm font-semibold text-navy underline-offset-4 hover:underline dark:text-slate-100">
              See how FastFinSure works
            </a>
          </div>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
            alt="Customer reviewing instant insurance quotes on a mobile app"
            loading="lazy"
            className="h-56 w-full rounded-xl object-cover"
          />
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">Average Approval Time</dt>
              <dd className="text-2xl font-bold text-navy dark:text-white">60s</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">Claims Settled</dt>
              <dd className="text-2xl font-bold text-action">94%</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
