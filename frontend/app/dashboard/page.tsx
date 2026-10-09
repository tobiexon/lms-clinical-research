'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usersApi, enrollmentsApi, certificatesApi } from '@/lib/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Enrollment {
  id: string;
  courseId: string;
  status: string;
  enrolledAt: string;
  progressPercentage: number;
  course: {
    title: string;
    slug: string;
    subtitle?: string;
    difficultyLevel?: string;
    durationHours?: number;
    category?: { name: string };
  };
  progress: { isCompleted: boolean }[];
}

interface Certificate {
  id: string;
  courseTitle: string;
  issuedAt: string;
  verificationCode: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [userRes, enrollRes, certRes] = await Promise.all([
          usersApi.getMe(),
          enrollmentsApi.getMyEnrollments(),
          certificatesApi.getMyCertificates().catch(() => ({ data: [] })),
        ]);
        setUser(userRes.data);
        setEnrollments(enrollRes.data);
        setCertificates(certRes.data);
      } catch {
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

  const completedCount = enrollments.filter((e) => e.status === 'COMPLETED').length;
  const activeCount = enrollments.filter((e) => e.status === 'ACTIVE').length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-gray-500">Continue your clinical research learning journey</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="text-3xl font-bold text-primary-700 mt-1">{enrollments.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{completedCount}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{activeCount}</p>
        </div>
        <Link href="/certificates" className="card p-5 group">
          <p className="text-sm text-gray-500">Certificates</p>
          <p className="text-3xl font-bold text-[#c9a84c] mt-1">{certificates.length}</p>
          <p className="text-xs text-primary-700 group-hover:underline mt-1">View all →</p>
        </Link>
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
              const total = enrollment.progress?.length ?? 0;
              const completed = enrollment.progress?.filter((p) => p.isCompleted).length ?? 0;
              const percentage = enrollment.progressPercentage
                ?? (total > 0 ? Math.round((completed / total) * 100) : 0);

              const isCompleted = enrollment.status === 'COMPLETED';
              const courseTitle = enrollment.course?.title ?? 'Course';
              const courseSubtitle = enrollment.course?.subtitle;
              const categoryName = enrollment.course?.category?.name;

              return (
                <div key={enrollment.id} className="card p-5">
                  <div className="flex items-start gap-4">
                    {/* Course colour badge */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] flex items-center justify-center shrink-0">
                      <span className="text-cyan-400 text-xs font-extrabold">
                        {courseTitle.charAt(0)}
                      </span>
                    </div>

                    {/* Course info */}
                    <div className="flex-1 min-w-0">
                      {/* Category label */}
                      {categoryName && (
                        <p className="text-[11px] font-semibold text-[#c9a84c] uppercase tracking-widest mb-0.5">
                          {categoryName}
                        </p>
                      )}

                      {/* Course title — the key addition */}
                      <h3 className="font-bold text-gray-900 text-base leading-snug truncate">
                        {courseTitle}
                      </h3>

                      {/* Subtitle */}
                      {courseSubtitle && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {courseSubtitle}
                        </p>
                      )}

                      {/* Progress bar */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isCompleted ? 'bg-green-500' : 'bg-[#0d2233]'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 shrink-0 w-8 text-right">
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`badge text-xs ${isCompleted ? 'badge-green' : 'badge-blue'}`}>
                        {enrollment.status.toLowerCase()}
                      </span>
                      <Link
                        href={`/learn/${enrollment.courseId}`}
                        className="bg-[#0d2233] hover:bg-[#1a3a5c] text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors"
                      >
                        {isCompleted ? 'Review' : 'Continue'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* My Certificates section */}
      {certificates.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Certificates</h2>
            <Link href="/certificates" className="text-sm text-primary-700 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certificates.slice(0, 4).map((cert) => (
              <div key={cert.id} className="card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{cert.courseTitle}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Issued {new Date(cert.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <Link
                  href={`/certificates/verify?code=${cert.verificationCode}`}
                  className="shrink-0 text-xs font-medium text-primary-700 hover:underline"
                >
                  Verify
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
