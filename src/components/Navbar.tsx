import { Moon, Sun } from 'lucide-react';

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' }
];

export default function Navbar({ darkMode, onToggleDarkMode }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Main navigation">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-navy dark:text-white">
          FastFinSure
        </a>

        <div className="items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-trust hover:text-trust dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-trust dark:text-slate-300 dark:hover:text-trust">
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            className="rounded-full bg-action px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            Get Started
          </a>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-trust hover:text-trust dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
      <div className="border-t border-slate-200 px-4 py-2 md:hidden dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-600 hover:text-trust dark:text-slate-300">
              {link.label}
            </a>
          ))}
          <a href="#get-started" className="rounded-full bg-action px-3 py-1 text-white">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
