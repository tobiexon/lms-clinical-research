'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then((r) => setStats(r.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400">Loading stats...</div>;

  const cards = [
    { label: 'Total Learners', value: stats?.totalUsers ?? '—', color: 'bg-blue-50 text-blue-700', icon: '👥' },
    { label: 'Courses', value: stats?.totalCourses ?? '—', color: 'bg-purple-50 text-purple-700', icon: '📚' },
    { label: 'Programmes', value: stats?.totalPrograms ?? '—', color: 'bg-indigo-50 text-indigo-700', icon: '🎓' },
    { label: 'Enrolments', value: stats?.totalEnrollments ?? '—', color: 'bg-amber-50 text-amber-700', icon: '📝' },
    { label: 'Completions', value: stats?.completedEnrollments ?? '—', color: 'bg-green-50 text-green-700', icon: '✅' },
    { label: 'Certificates Issued', value: stats?.totalCertificates ?? '—', color: 'bg-pink-50 text-pink-700', icon: '🏅' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your LMS platform</p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary text-sm">+ Add Course</Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-xl p-4 ${card.color}`}>
            <div className="text-2xl mb-1">{card.icon}</div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-xs font-medium mt-1 opacity-80">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Completion rate */}
      {stats && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8 max-w-sm">
          <p className="text-sm font-medium text-gray-700 mb-2">Completion Rate</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full transition-all" style={{ width: `${stats.completionRate}%` }} />
            </div>
            <span className="text-sm font-bold text-gray-900">{stats.completionRate}%</span>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/admin/courses/new', label: 'Create a Course', icon: '📚', desc: 'Add a new course with modules and lessons' },
            { href: '/admin/programs/new', label: 'Create a Programme', icon: '🎓', desc: 'Bundle courses into a learning programme' },
            { href: '/admin/instructors', label: 'Manage Instructors', icon: '👤', desc: 'Add or edit instructor profiles' },
            { href: '/admin/users', label: 'Manage Users', icon: '👥', desc: 'View learners and manage roles' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent enrolments */}
      {stats?.recentEnrollments?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Enrolments</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Learner</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Course</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentEnrollments.map((e: any) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{e.user.firstName} {e.user.lastName}</td>
                    <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{e.course.title}</td>
                    <td className="px-4 py-3 text-gray-400">{new Date(e.enrolledAt).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
