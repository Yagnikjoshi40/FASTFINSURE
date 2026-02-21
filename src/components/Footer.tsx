export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-4 py-8 dark:border-slate-800 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} FastFinSure. Built for instant confidence.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-trust">
            Privacy
          </a>
          <a href="#" className="hover:text-trust">
            Terms
          </a>
          <a href="#" className="hover:text-trust">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
