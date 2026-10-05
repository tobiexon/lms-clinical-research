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
    <div className="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden" style={{ zIndex: 60 }}>

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
          <span className="text-cyan-300 text-xs">{progressPct}%</span>
          <div className="w-28 bg-white/20 rounded-full h-2">
            <div className="bg-[#c9a84c] h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }}/>
          </div>
          <span className="text-white/50 text-xs">{completedLessons.length}/{totalLessons}</span>
        </div>

        <Link href="/dashboard" className="text-xs text-cyan-400 hover:text-white shrink-0 transition-colors ml-2">
          ← Dashboard
        </Link>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className="w-64 xl:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden shrink-0 shadow-md">
            {/* Progress header */}
            <div className="px-4 py-3 bg-[#0d2233] shrink-0">
              <div className="flex justify-between text-xs text-cyan-300 mb-1.5">
                <span className="font-semibold">Course Progress</span>
                <span>{completedLessons.length}/{totalLessons} lessons</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div className="bg-[#c9a84c] h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }}/>
              </div>
              <p className="text-white/50 text-[10px] mt-1">{progressPct}% complete</p>
            </div>

            {/* Module/lesson list */}
            <div className="flex-1 overflow-y-auto bg-white">
              {course.modules?.sort((a, b) => a.order - b.order).map((module, mi) => (
                <div key={module.id}>
                  {/* Module header */}
                  <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-200 sticky top-0">
                    <p className="text-[10px] font-bold text-[#0d2233]/50 uppercase tracking-widest">
                      Module {mi + 1}
                    </p>
                    <p className="text-xs text-[#0d2233] font-semibold leading-snug mt-0.5">{module.title}</p>
                  </div>
                  {/* Lessons */}
                  {module.lessons.sort((a, b) => a.order - b.order).map((lesson) => {
                    const done = completedLessons.includes(lesson.id);
                    const active = activeLesson?.id === lesson.id;
                    const isVideo = lesson.lessonType === 'VIDEO';
                    return (
                      <button key={lesson.id} onClick={() => goToLesson(lesson)}
                        className={`w-full text-left px-3 py-2.5 flex items-start gap-2.5 transition-all border-l-2 ${
                          active
                            ? 'bg-blue-50 border-l-blue-500'
                            : done
                            ? 'border-l-transparent opacity-70'
                            : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'
                        }`}>
                        {/* Icon — blue play for video, green doc for text */}
                        <span className={`text-sm shrink-0 mt-0.5 ${
                          done ? 'text-green-500' :
                          active ? (isVideo ? 'text-blue-600' : 'text-green-600') :
                          isVideo ? 'text-blue-400' : 'text-green-500'
                        }`}>
                          {done ? '✓' : isVideo ? '▶' : '📄'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug font-semibold ${
                            active
                              ? (isVideo ? 'text-blue-700' : 'text-green-700')
                              : done
                              ? 'text-gray-400 line-through font-normal'
                              : isVideo ? 'text-blue-600' : 'text-green-700'
                          }`}>
                            {lesson.title}
                          </p>
                          <p className={`text-[10px] mt-0.5 font-medium ${
                            isVideo ? 'text-blue-400' : 'text-green-500'
                          }`}>
                            {isVideo ? `▶ Video${lesson.videoDurationMinutes ? ` · ${lesson.videoDurationMinutes} min` : ''}` : '📄 Reading'}
                          </p>
                        </div>
                        {done && <span className="text-[10px] text-green-500 shrink-0 mt-0.5 font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* ── Content area ── */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {activeLesson ? (
            <div className="max-w-4xl mx-auto px-6 py-7">
              {/* Breadcrumb */}
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-1">
                {course.modules?.find(m => m.lessons.some(l => l.id === activeLesson.id))?.title}
              </p>
              <h2 className="text-[#0d2233] text-2xl font-extrabold mb-6">{activeLesson.title}</h2>

              {/* ── VIDEO ── */}
              {activeLesson.lessonType === 'VIDEO' && (
                <div className="mb-6">
                  {activeLesson.videoUrl ? (
                    <VideoPlayer url={activeLesson.videoUrl} title={activeLesson.title} onEnded={() => markComplete(activeLesson.id)} />
                  ) : (
                    <VideoComingSoon title={activeLesson.title} />
                  )}
                </div>
              )}

              {/* ── TEXT ── */}
              {activeLesson.lessonType === 'TEXT' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-6">
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
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center mb-6">
                  <div className="text-5xl mb-3">📄</div>
                  <p className="text-gray-800 font-medium mb-4">{activeLesson.title}</p>
                  <p className="text-gray-500 text-sm">PDF content will be available here.</p>
                </div>
              )}

              {/* ── Completion + navigation ── */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-200">
                {/* Prev */}
                <button onClick={() => prevLesson && goToLesson(prevLesson)} disabled={!prevLesson}
                  className="flex items-center gap-2 text-[#0d2233] hover:text-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium transition-colors">
                  ← Previous
                </button>

                {/* Mark complete */}
                {completedLessons.includes(activeLesson.id) ? (
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 border border-green-200 px-5 py-2 rounded-lg">
                    <span className="text-base">✓</span> Completed
                  </div>
                ) : (
                  <button onClick={() => markComplete(activeLesson.id)}
                    className="bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-8 py-2.5 rounded-lg text-sm transition-colors uppercase tracking-wide shadow-sm">
                    Mark as Complete
                  </button>
                )}

                {/* Next */}
                {nextLesson ? (
                  <button onClick={() => goToLesson(nextLesson)}
                    className="flex items-center gap-2 text-[#0d2233] hover:text-[#c9a84c] text-sm font-medium transition-colors">
                    Next →
                  </button>
                ) : (
                  <div className="text-green-600 text-sm font-semibold">🎉 Course complete!</div>
                )}
              </div>

              {/* Completion celebration */}
              {progressPct === 100 && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                  <div className="text-4xl mb-2">🏅</div>
                  <h3 className="text-green-700 font-bold text-lg mb-1">Course Completed!</h3>
                  <p className="text-green-600 text-sm mb-4">Congratulations on finishing {course.title}</p>
                  <Link href="/certificates"
                    className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                    View My Certificate
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-5xl mb-3">📚</div>
                <p className="text-lg text-gray-700 font-semibold">Select a lesson to begin</p>
                <p className="text-sm mt-1 text-gray-400">Choose any lesson from the sidebar on the left</p>
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

function extractVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : '';
}

// ── VideoPlayer — handles YouTube, Vimeo, direct MP4/WebM, and other iframes ──
function VideoPlayer({ url, title, onEnded }: { url: string; title: string; onEnded: () => void }) {
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isVimeo = url.includes('vimeo.com');
  const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
  const isWistia = url.includes('wistia.com') || url.includes('wistia.net');
  const isBunny = url.includes('b-cdn.net') || url.includes('bunny.net') || url.includes('iframe.mediadelivery.net');
  const isLoom = url.includes('loom.com');
  const isGoogleDrive = url.includes('drive.google.com');

  // Convert Google Drive share URL to embed URL
  const driveEmbed = isGoogleDrive
    ? url.replace('/view', '/preview').replace('?usp=sharing', '')
    : url;

  if (isYouTube) {
    const id = extractYouTubeId(url);
    return (
      <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen title={title}
        />
      </div>
    );
  }

  if (isVimeo) {
    const id = extractVimeoId(url);
    return (
      <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://player.vimeo.com/video/${id}?autoplay=0&title=0&byline=0&portrait=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen title={title}
        />
      </div>
    );
  }

  if (isWistia) {
    // Wistia embed: convert share URL to iframe embed
    const embedUrl = url.includes('/medias/') ? url.replace('/medias/', '/embed/iframe/') : url;
    return (
      <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          allow="autoplay; fullscreen"
          allowFullScreen title={title}
        />
      </div>
    );
  }

  if (isBunny || isLoom || isGoogleDrive) {
    // Generic iframe for Bunny Stream, Loom, Google Drive previews
    return (
      <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={isGoogleDrive ? driveEmbed : url}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen title={title}
        />
      </div>
    );
  }

  if (isDirectVideo) {
    return (
      <div className="rounded-xl overflow-hidden bg-black">
        <video
          className="w-full"
          controls
          src={url}
          onEnded={onEnded}
          style={{ maxHeight: '540px' }}
        />
      </div>
    );
  }

  // Fallback — try as generic iframe
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={url}
        allow="autoplay; fullscreen"
        allowFullScreen title={title}
      />
    </div>
  );
}

// ── Video Coming Soon placeholder ─────────────────────────────────────────
function VideoComingSoon({ title }: { title: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-10 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.867v6.266a1 1 0 01-1.447.902L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
      </div>
      <h3 className="text-[#0d2233] font-bold text-lg mb-2">Video Lesson Coming Soon</h3>
      <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
        The instructor video for <strong>{title}</strong> is being recorded and will be available shortly.
        The full written lesson content below covers all the same material.
      </p>
      <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full">
        <span>📄</span> Read the full lesson content below
      </div>
    </div>
  );
}
