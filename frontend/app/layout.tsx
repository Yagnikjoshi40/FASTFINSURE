import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>
      <nav className="p-4 border-b border-slate-800 flex gap-4">
        <Link href="/">Home</Link><Link href="/dashboard">Dashboard</Link><Link href="/pricing">Pricing</Link><Link href="/admin">Admin</Link>
      </nav>{children}
    </body></html>
  );
}
