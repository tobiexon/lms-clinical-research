'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usersApi, enrollmentsApi } from '@/lib/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Enrollment {
  id: string;
  csCourseUid: string;
  csCourseTitleCache: string;
  status: string;
  enrolledAt: string;
  progress: { isCompleted: boolean }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [userRes, enrollRes] = await Promise.all([
          usersApi.getMe(),
          enrollmentsApi.getMyEnrollments(),
        ]);
        setUser(userRes.data);
        setEnrollments(enrollRes.data);
      } catch {
        // Not authenticated — redirect to login
        router.push('/login?redirect=/dashboard');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-gray-500">Continue your clinical research learning journey</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="text-3xl font-bold text-primary-700 mt-1">{enrollments.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {enrollments.filter((e) => e.status === 'COMPLETED').length}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">
            {enrollments.filter((e) => e.status === 'ACTIVE').length}
          </p>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
          <Link href="/courses" className="text-sm text-primary-700 hover:underline">
            Browse more courses →
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="card p-10 text-center text-gray-500">
            <p className="text-lg mb-2">You haven&apos;t enrolled in any courses yet</p>
            <Link href="/courses" className="btn-primary mt-4 inline-block">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {enrollments.map((enrollment) => {
              const total = enrollment.progress.length;
              const completed = enrollment.progress.filter((p) => p.isCompleted).length;
              const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={enrollment.id} className="card p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {enrollment.csCourseTitleCache}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{percentage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`badge text-xs ${
                        enrollment.status === 'COMPLETED' ? 'badge-green' : 'badge-blue'
                      }`}
                    >
                      {enrollment.status.toLowerCase()}
                    </span>
                    <Link
                      href={`/learn/${enrollment.csCourseUid}`}
                      className="btn-primary text-sm py-1.5 px-4"
                    >
                      {enrollment.status === 'COMPLETED' ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
