'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { enrollmentsApi } from '@/lib/api';
import Cookies from 'js-cookie';

interface Enrollment {
  id: string;
  courseId: string;
  csCourseTitleCache?: string;
  status: string;
  progressPercentage?: number;
  course: {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl?: string;
    modules?: { lessons: any[] }[];
  };
  progress: { isCompleted: boolean }[];
}

export default function MyCoursesMenu() {
  const [open, setOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Load enrollments when dropdown opens
  useEffect(() => {
    if (!open) return;
    const token = Cookies.get('access_token');
    if (!token) return;

    setLoading(true);
    enrollmentsApi.getMyEnrollments()
      .then((r) => setEnrollments(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

  const activeCount = enrollments.filter((e) => e.status === 'ACTIVE' || e.status === 'COMPLETED').length;

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-cyan-200 hover:text-white transition-colors text-sm font-medium px-2 py-1 rounded hover:bg-white/10"
        title="My Courses"
      >
        {/* Book icon */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        My Courses
        {activeCount > 0 && (
          <span className="bg-[#c9a84c] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {activeCount > 9 ? '9+' : activeCount}
          </span>
        )}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0d2233] px-4 py-3 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">My Enrolled Courses</span>
            <Link href="/dashboard" onClick={() => setOpen(false)}
              className="text-cyan-300 hover:text-white text-xs transition-colors">
              View all →
            </Link>
          </div>

          {/* Course list */}
          {loading ? (
            <div className="p-5 text-center text-gray-400 text-sm">Loading your courses...</div>
          ) : enrollments.length === 0 ? (
            <div className="p-5 text-center">
              <p className="text-gray-400 text-sm mb-3">No courses enrolled yet</p>
              <Link href="/courses" onClick={() => setOpen(false)}
                className="text-xs text-[#c9a84c] hover:underline">
                Browse courses →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {enrollments.map((enrollment) => {
                const totalLessons = enrollment.course?.modules?.reduce(
                  (s, m) => s + (m.lessons?.length || 0), 0
                ) || enrollment.progress?.length || 0;
                const completed = enrollment.progress?.filter((p) => p.isCompleted).length || 0;
                const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

                return (
                  <Link
                    key={enrollment.id}
                    href={`/learn/${enrollment.courseId}`}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors group"
                  >
                    {/* Course thumbnail / placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] shrink-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#0d2233]">
                        {enrollment.course?.title || enrollment.csCourseTitleCache}
                      </p>

                      {/* Progress bar */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full transition-all ${
                              enrollment.status === 'COMPLETED' ? 'bg-green-500' : 'bg-[#c9a84c]'
                            }`}
                            style={{ width: `${enrollment.status === 'COMPLETED' ? 100 : pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {enrollment.status === 'COMPLETED' ? '✓ Done' : `${pct}%`}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span className="text-gray-300 group-hover:text-[#c9a84c] text-xs shrink-0 mt-1">▶</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <Link href="/dashboard" onClick={() => setOpen(false)}
              className="block w-full text-center text-xs font-semibold text-[#0d2233] hover:text-[#c9a84c] transition-colors">
              Go to My Dashboard →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
