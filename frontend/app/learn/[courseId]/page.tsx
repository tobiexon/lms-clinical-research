'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { enrollmentsApi, progressApi } from '@/lib/api';
import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Lesson {
  id: string;
  title: string;
  lessonType: 'VIDEO' | 'TEXT' | 'PDF' | 'WEBINAR';
  videoUrl?: string;
  content?: any;
  videoDurationMinutes?: number;
  isPreview: boolean;
  order: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  modules: Module[];
  durationHours: number;
  difficultyLevel: string;
  instructors: any[];
}

export default function LearnPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push(`/login?redirect=/learn/${courseId}`);
      return;
    }

    async function load() {
      try {
        // 1. Check enrollment
        const enrollCheck = await enrollmentsApi.checkEnrolled(courseId);
        if (!enrollCheck.data.enrolled) {
          setError('You are not enrolled in this course. Please purchase it to access the content.');
          setLoading(false);
          return;
        }

        // 2. Get enrollments to find the course slug
        const enrollmentsRes = await enrollmentsApi.getMyEnrollments();
        const enrollment = enrollmentsRes.data?.find((e: any) => e.courseId === courseId);
        const slug = enrollment?.course?.slug;

        if (!slug) {
          setError('Course not found.');
          setLoading(false);
          return;
        }

        // 3. Fetch full course content using slug
        const [courseRes, progressRes] = await Promise.all([
          fetch(`${API}/api/v1/courses/${slug}/learn`, {
            headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
          }).then(r => r.json()),
          progressApi.getCourseProgress(courseId),
        ]);

        setCourse(courseRes);
        setCompletedLessons(progressRes.data?.completedLessonIds || []);

        // Set first lesson as active
        const firstLesson = courseRes?.modules?.[0]?.lessons?.[0];
        if (firstLesson) setActiveLesson(firstLesson);
      } catch (e: any) {
        setError('Failed to load course. Please refresh.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [courseId, router]);

  async function markComplete(lessonId: string) {
    if (completedLessons.includes(lessonId)) return;
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    try {
      await progressApi.markLessonComplete({ courseId, lessonId, timeSpentSecs: timeSpent });
      setCompletedLessons(prev => [...prev, lessonId]);
      startTimeRef.current = Date.now();
    } catch {}
  }

  function goToLesson(lesson: Lesson) {
    setActiveLesson(lesson);
    startTimeRef.current = Date.now();
    window.scrollTo(0, 0);
  }

  const allLessons = course?.modules?.flatMap(m => m.lessons) || [];
  const totalLessons = allLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  const currentIdx = allLessons.findIndex(l => l.id === activeLesson?.id);
  const nextLesson = allLessons[currentIdx + 1] || null;
  const prevLesson = allLessons[currentIdx - 1] || null;

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d2233] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin w-10 h-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-cyan-300">Loading your course...</p>
        </div>
      </div>
    );
  }

  // ── Access denied ──
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 text-center max-w-md shadow-xl">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <div className="space-y-3">
            <Link href="/courses" className="block w-full bg-[#c9a84c] text-white font-bold py-3 rounded-lg text-sm uppercase text-center">
              Browse Courses
            </Link>
            <Link href="/dashboard" className="block w-full border border-gray-300 text-gray-600 py-3 rounded-lg text-sm text-center">
              My Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    // Full-screen layout — no navbar/footer
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden" style={{ zIndex: 60 }}>

      {/* ── Top bar ── */}
      <header className="bg-[#0d2233] border-b border-white/10 px-4 py-2.5 flex items-center gap-3 shrink-0 h-12">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-cyan-200 hover:text-white p-1" title="Toggle sidebar">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <Link href="/" className="text-cyan-300 font-bold text-xs shrink-0">CRN</Link>

        <div className="flex-1 min-w-0 px-2">
          <p className="text-white text-xs font-medium truncate">{course.title}</p>
        </div>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <div className="w-24 bg-white/20 rounded-full h-1.5">
            <div className="bg-[#c9a84c] h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }}/>
          </div>
          <span className="text-cyan-300 text-xs">{progressPct}%</span>
        </div>

        <Link href="/dashboard" className="text-xs text-cyan-400 hover:text-white shrink-0 transition-colors">
          ← Dashboard
        </Link>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className="w-64 xl:w-72 bg-[#111827] border-r border-white/10 flex flex-col overflow-hidden shrink-0">
            {/* Progress */}
            <div className="px-4 py-3 bg-[#0d2233] border-b border-white/10 shrink-0">
              <div className="flex justify-between text-xs text-cyan-400 mb-1.5">
                <span>Course Progress</span>
                <span>{completedLessons.length}/{totalLessons} lessons</span>
              </div>
              <div className="bg-white/20 rounded-full h-1.5">
                <div className="bg-[#c9a84c] h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }}/>
              </div>
            </div>

            {/* Module/lesson list */}
            <div className="flex-1 overflow-y-auto">
              {course.modules?.sort((a, b) => a.order - b.order).map((module, mi) => (
                <div key={module.id}>
                  {/* Module header */}
                  <div className="px-4 py-2 bg-white/5 sticky top-0">
                    <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
                      Module {mi + 1}
                    </p>
                    <p className="text-xs text-white/80 font-medium leading-snug">{module.title}</p>
                  </div>
                  {/* Lessons */}
                  {module.lessons.sort((a, b) => a.order - b.order).map((lesson) => {
                    const done = completedLessons.includes(lesson.id);
                    const active = activeLesson?.id === lesson.id;
                    return (
                      <button key={lesson.id} onClick={() => goToLesson(lesson)}
                        className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 transition-all border-l-2 ${
                          active ? 'bg-[#c9a84c]/15 border-[#c9a84c]' : 'border-transparent hover:bg-white/5'
                        }`}>
                        <span className={`text-base shrink-0 mt-0.5 ${done ? 'text-green-400' : active ? 'text-[#c9a84c]' : 'text-white/25'}`}>
                          {done ? '✓' : lesson.lessonType === 'VIDEO' ? '▶' : '📝'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug ${active ? 'text-white font-medium' : done ? 'text-white/50 line-through' : 'text-white/70'}`}>
                            {lesson.title}
                          </p>
                          {lesson.videoDurationMinutes && (
                            <p className="text-[10px] text-white/30 mt-0.5">{lesson.videoDurationMinutes} min</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* ── Content area ── */}
        <main className="flex-1 overflow-y-auto">
          {activeLesson ? (
            <div className="max-w-4xl mx-auto px-4 py-6">
              {/* Breadcrumb */}
              <p className="text-cyan-500 text-xs mb-2">
                {course.modules?.find(m => m.lessons.some(l => l.id === activeLesson.id))?.title}
              </p>
              <h2 className="text-white text-2xl font-bold mb-6">{activeLesson.title}</h2>

              {/* ── VIDEO ── */}
              {activeLesson.lessonType === 'VIDEO' && (
                <div className="mb-6">
                  {activeLesson.videoUrl ? (
                    <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
                      {activeLesson.videoUrl.includes('youtube.com') || activeLesson.videoUrl.includes('youtu.be') ? (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${extractYouTubeId(activeLesson.videoUrl)}?rel=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen title={activeLesson.title}
                        />
                      ) : activeLesson.videoUrl.includes('vimeo.com') ? (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={activeLesson.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen title={activeLesson.title}
                        />
                      ) : (
                        <video className="absolute inset-0 w-full h-full" controls src={activeLesson.videoUrl}
                          onEnded={() => markComplete(activeLesson.id)}/>
                      )}
                    </div>
                  ) : (
                    <div className="w-full bg-gray-800 rounded-xl flex items-center justify-center" style={{ paddingTop: '30%', position: 'relative' }}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                        <span className="text-4xl mb-2">🎬</span>
                        <p className="text-sm">Video coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── TEXT ── */}
              {activeLesson.lessonType === 'TEXT' && (
                <div className="bg-white rounded-xl p-8 mb-6">
                  {activeLesson.content
                    ? (
                      <div
                        className="lesson-content"
                        dangerouslySetInnerHTML={{
                          __html: typeof activeLesson.content === 'string'
                            ? activeLesson.content
                            : (activeLesson.content as any)?.html
                              ?? '<p class="text-gray-400 italic">Content is being prepared by your instructor.</p>',
                        }}
                      />
                    )
                    : <p className="text-gray-400 italic">Lesson content will be added by your instructor.</p>
                  }
                </div>
              )}

              {/* ── PDF ── */}
              {activeLesson.lessonType === 'PDF' && (
                <div className="bg-gray-800 rounded-xl p-8 text-center mb-6">
                  <div className="text-5xl mb-3">📄</div>
                  <p className="text-white font-medium mb-4">{activeLesson.title}</p>
                  <p className="text-gray-400 text-sm">PDF content will be available here.</p>
                </div>
              )}

              {/* ── Completion + navigation ── */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">
                {/* Prev */}
                <button onClick={() => prevLesson && goToLesson(prevLesson)} disabled={!prevLesson}
                  className="flex items-center gap-2 text-cyan-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors">
                  ← Previous
                </button>

                {/* Mark complete */}
                {completedLessons.includes(activeLesson.id) ? (
                  <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                    <span className="text-lg">✓</span> Completed
                  </div>
                ) : (
                  <button onClick={() => markComplete(activeLesson.id)}
                    className="bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-8 py-2.5 rounded-lg text-sm transition-colors uppercase tracking-wide">
                    Mark as Complete
                  </button>
                )}

                {/* Next */}
                {nextLesson ? (
                  <button onClick={() => goToLesson(nextLesson)}
                    className="flex items-center gap-2 text-cyan-400 hover:text-white text-sm transition-colors">
                    Next →
                  </button>
                ) : (
                  <div className="text-green-400 text-sm font-medium">🎉 Course complete!</div>
                )}
              </div>

              {/* Completion celebration */}
              {progressPct === 100 && (
                <div className="mt-6 bg-green-900/30 border border-green-500/30 rounded-xl p-5 text-center">
                  <div className="text-4xl mb-2">🏅</div>
                  <h3 className="text-green-300 font-bold text-lg mb-1">Course Completed!</h3>
                  <p className="text-green-400/80 text-sm mb-4">Congratulations on finishing {course.title}</p>
                  <Link href="/certificates"
                    className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                    View My Certificate
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-5xl mb-3">📚</div>
                <p className="text-lg">Select a lesson from the sidebar</p>
                <p className="text-sm mt-1 text-gray-600">Your course content will appear here</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : url;
}
