'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Logo from './Logo';

const NAV_LINKS = [
  { href: '/courses', label: 'All Courses' },
  { href: '/programs', label: 'Programmes' },
  { href: '/certificates/verify', label: 'Verify Certificate' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string; role: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) { setUser(null); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => data ? setUser({ firstName: data.firstName, role: data.role }) : setUser(null))
      .catch(() => setUser(null));
  }, [pathname]);

  function logout() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/');
  }

  const isAdmin = user && ['ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR'].includes(user.role);

  // Don't render navbar inside /admin
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#0d2233] shadow-lg">
      {/* Promo bar */}
      <div className="bg-cyan-700 text-white text-center text-xs py-1.5 px-4 font-medium">
        🎓 UK-accredited clinical research courses — ICH GCP · Pharmacovigilance · Regulatory Affairs
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo variant="navbar" href="/" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href || pathname?.startsWith(link.href + '/')
                    ? 'text-white bg-white/10'
                    : 'text-cyan-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin"
                    className="text-xs text-cyan-300 hover:text-white px-3 py-1.5 rounded border border-cyan-800 hover:border-cyan-500 transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard"
                  className="text-sm text-cyan-200 hover:text-white transition-colors">
                  Hi, {user.firstName}
                </Link>
                <button onClick={logout}
                  className="text-xs text-cyan-400 hover:text-white transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login"
                  className="text-sm text-cyan-200 hover:text-white px-4 py-2 transition-colors">
                  Login
                </Link>
                <Link href="/register"
                  className="text-sm bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                  Enrol Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cyan-200 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-1 pb-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-cyan-200 hover:text-white hover:bg-white/10 rounded-lg">
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2 px-4">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-cyan-200">My Dashboard</Link>
                  {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-sm text-cyan-300">Admin Panel</Link>}
                  <button onClick={logout} className="text-sm text-left text-cyan-400">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className="block text-center py-2 text-sm text-cyan-200 border border-white/20 rounded-lg">Login</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}
                    className="block text-center py-2 text-sm bg-cyan-500 text-white rounded-lg font-semibold">Enrol Now</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
