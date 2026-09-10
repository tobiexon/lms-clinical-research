'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { usersApi } from '@/lib/api';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/courses', label: 'Courses', icon: '📚' },
  { href: '/admin/programs', label: 'Programmes', icon: '🎓' },
  { href: '/admin/instructors', label: 'Instructors', icon: '👤' },
  { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      const token = Cookies.get('access_token');
      if (!token) { router.push('/login?redirect=/admin'); return; }
      try {
        const { data } = await usersApi.getMe();
        const allowed = ['ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR'];
        if (!allowed.includes(data.role)) { router.push('/dashboard'); return; }
        setUser(data);
      } catch { router.push('/login?redirect=/admin'); }
      finally { setChecking(false); }
    }
    checkAccess();
  }, [router]);

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading admin panel...</div>;
  }
  if (!user) return null;

  function logout() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-primary-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-primary-800">
          <p className="text-xs text-primary-400 uppercase tracking-widest mb-1">Exon Sciences</p>
          <p className="font-bold text-lg">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? 'bg-primary-700 text-white' : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-800">
          <p className="text-xs text-primary-400 mb-1">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-primary-500 mb-3 capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
          <Link href="/" className="text-xs text-primary-400 hover:text-white block mb-1">← View Site</Link>
          <button onClick={logout} className="text-xs text-primary-400 hover:text-red-400">Sign out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-sm font-medium text-gray-500">
            {NAV.find((n) => pathname === n.href || pathname.startsWith(n.href + '/'))?.label || 'Admin'}
          </h1>
          <span className="text-xs text-gray-400">LMS Admin v1.0</span>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
