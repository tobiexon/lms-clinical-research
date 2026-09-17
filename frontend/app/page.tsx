/**
 * Homepage — Clinical Research Nexus
 * Course section styled to match Viares layout:
 * - Large image thumbnail with title overlay + badge
 * - Description + meta row (modules · activities · students)
 * - Gold "View more" CTA button
 */

import Link from 'next/link';
import Image from 'next/image';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ── Badge label per course slug ──────────────────────────────
const BADGES: Record<string, { label: string; bg: string }> = {
  'clinical-research-associate-foundation':    { label: 'TOP COURSE',  bg: 'bg-[#2d9e5f]' },
  'clinical-trial-uk-startup-to-closure':      { label: 'TOP COURSE',  bg: 'bg-[#2d9e5f]' },
  'ich-gcp-e6-fundamentals-uk':                { label: 'HOT NOW',     bg: 'bg-[#c0392b]' },
  'uk-post-brexit-regulatory-landscape':       { label: 'HOT NOW',     bg: 'bg-[#c0392b]' },
  'introduction-to-pharmacovigilance':         { label: 'NEW',         bg: 'bg-[#2980b9]' },
  'clinical-data-management-principles':       { label: 'BEST VALUE',  bg: 'bg-[#d4a017]' },
};

// ── Placeholder gradient colours per category ────────────────
const CATEGORY_GRADIENTS: Record<string, string> = {
  'good-clinical-practice':    'from-[#0d2233] to-[#1a4a6e]',
  'pharmacovigilance':         'from-[#1a2a1a] to-[#2d6e3e]',
  'clinical-data-management':  'from-[#1a1a2a] to-[#2d3e6e]',
  'regulatory-affairs':        'from-[#2a1a1a] to-[#6e2d2d]',
  'investigator-training':     'from-[#1a2a2a] to-[#2d6e6e]',
};

async function getAllCourses() {
  try {
    // Fetch 6 published courses for homepage — no featured filter needed
    const res = await fetch(`${API}/api/v1/courses?limit=6&page=1`, { next: { revalidate: 300 } });
    if (!res.ok) return { courses: [] };
    return res.json();
  } catch { return { courses: [] }; }
}

async function getPrograms() {
  try {
    const res = await fetch(`${API}/api/v1/programs`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export default async function HomePage() {
  const [allCoursesData, programs] = await Promise.all([
    getAllCourses(),
    getPrograms(),
  ]);

  // Use allCourses directly — featured ones have sortOrder=0 so they appear first
  const displayCourses: any[] = (allCoursesData?.courses || []).slice(0, 6);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0d2233] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Clinical Research Career<br />
            <span className="text-cyan-300">Starts Here</span>
          </h1>
          <p className="text-lg text-cyan-100 mb-4 max-w-2xl mx-auto">
            Clinical Research Nexus empowers aspiring professionals with globally-aligned
            online training, certification, and career support programmes.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-cyan-300 mb-8 flex-wrap">
            <span>📈 80% of our graduates advance their careers within 3 months</span>
            <span>🌍 Join professionals from over 30+ countries</span>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses"
              className="bg-[#c9a84c] hover:bg-[#b8973b] text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors shadow-lg">
              Explore Training Programmes
            </Link>
            <Link href="/programs"
              className="border border-cyan-400/60 text-cyan-200 hover:text-white hover:border-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors">
              View Certificates
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-[#0a1a2a] text-cyan-400 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-xs font-medium">
          <span>✓ MHRA Guidelines Aligned</span>
          <span>✓ ICH GCP E6(R3)</span>
          <span>✓ ACRP Recognised</span>
          <span>✓ UK &amp; Global Learners</span>
          <span>✓ Certificate on Completion</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COURSES SECTION — Viares-style cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Section heading + "All Courses" button — matches Viares layout */}
          <div className="flex items-center justify-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
              Your Clinical Research Professional Training Courses &amp; Awards
            </h2>
            <Link href="/courses"
              className="bg-[#c9a84c] hover:bg-[#b8973b] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors whitespace-nowrap">
              All Courses
            </Link>
          </div>

          {displayCourses.length === 0 ? (
            /* ── Empty state ── */
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="text-4xl mb-3">🔬</div>
              <p className="text-lg text-gray-600 font-medium mb-1">Courses are being prepared</p>
              <p className="text-sm text-gray-400 mb-6">
                Make sure Docker is running, the database is seeded, and the backend is started.
              </p>
              <Link href="/courses" className="btn-primary">Browse Catalogue</Link>
            </div>
          ) : (
            <>
              {/* ── Course grid — 3 columns ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayCourses.map((course: any) => {
                  const badge = BADGES[course.slug];
                  const gradient = CATEGORY_GRADIENTS[course.category?.slug] || 'from-[#0d2233] to-[#1a4a6e]';
                  const totalModules = course._count?.modules ?? course.modules?.length ?? 0;
                  const totalEnrolled = course._count?.enrollments ?? 0;
                  // Estimate activities as modules × ~4
                  const estimatedActivities = totalModules * 4;

                  return (
                    <div key={course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">

                      {/* ── Thumbnail with title overlay ── */}
                      <div className={`relative w-full h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>
                        {course.thumbnailUrl ? (
                          <Image
                            src={course.thumbnailUrl}
                            alt={course.title}
                            fill
                            className="object-cover opacity-70"
                          />
                        ) : (
                          /* Decorative placeholder — dark gradient with atomic icon */
                          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-20">
                            <AtomStar />
                          </div>
                        )}

                        {/* Dark overlay for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Badge — top left */}
                        {badge && (
                          <div className={`absolute top-3 left-3 ${badge.bg} text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded`}>
                            {badge.label}
                          </div>
                        )}

                        {/* Course title overlay — bottom of image */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-white font-extrabold text-base uppercase leading-tight drop-shadow-md">
                            {course.title}
                          </h3>
                          <p className="text-white/70 text-xs mt-0.5">
                            {course.difficultyLevel?.toLowerCase()} course
                            {course.durationHours ? ` · ${course.durationHours * 10}+ hours material` : ''}
                          </p>
                        </div>
                      </div>

                      {/* ── Card body ── */}
                      <div className="p-4 flex flex-col flex-1">
                        {/* Course name */}
                        <h4 className="font-extrabold text-gray-900 text-xs uppercase mb-1.5 leading-snug">
                          {course.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1 line-clamp-3">
                          {course.subtitle || course.description}
                        </p>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {totalModules} module{totalModules !== 1 ? 's' : ''}
                            {estimatedActivities > 0 && ` · ${estimatedActivities}+ activities`}
                          </span>
                          {totalEnrolled > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {totalEnrolled.toLocaleString()} Students
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <Link href={`/courses/${course.slug}`}
                          className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8973b] text-white text-xs font-semibold py-2.5 rounded transition-colors mt-auto">
                          View more
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── "Explore all programmes" bottom CTA ── */}
              <div className="text-center mt-10">
                <Link href="/courses"
                  className="inline-block bg-[#c9a84c] hover:bg-[#b8973b] text-white font-semibold px-10 py-3.5 rounded transition-colors">
                  Explore All Clinical Research Training Programmes
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          KNOWLEDGE LIBRARY SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-[#eef4f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase mb-3">
              Clinical Research Knowledge Library
            </h2>
            <p className="text-gray-600">
              A growing library of free clinical research resources, guides, and explainers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: 'CLINICAL RESEARCH EXPLAINED',
                title: 'ICH GCP E6(R3): What Changed?',
                desc: 'Explore the key revisions in the latest ICH GCP E6(R3) guideline and what they mean for clinical trial conduct in the UK and globally.',
                date: 'Academy · September 2026',
                color: 'from-cyan-800 to-teal-600',
              },
              {
                tag: 'CLINICAL RESEARCH EXPLAINED',
                title: 'What is a Clinical Research Associate?',
                desc: 'Understand the day-to-day responsibilities of a CRA, the skills required, and how to break into this growing career field.',
                date: 'Academy · August 2026',
                color: 'from-teal-700 to-cyan-600',
              },
              {
                tag: 'CLINICAL RESEARCH EXPLAINED',
                title: 'Understanding Pharmacovigilance',
                desc: 'Discover the principles of drug safety monitoring, adverse event reporting, and the role of the MHRA Yellow Card scheme in the UK.',
                date: 'Academy · July 2026',
                color: 'from-[#0d2233] to-teal-700',
              },
            ].map((article) => (
              <div key={article.title}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Article image placeholder */}
                <div className={`relative w-full h-44 bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                  <div className="absolute top-3 right-3 bg-black/40 text-white text-[9px] font-bold uppercase px-2 py-1 rounded tracking-wide">
                    {article.tag}
                  </div>
                  {/* Lab-equipment placeholder icon */}
                  <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2v2h1v14a4 4 0 008 0V4h1V2H7zm6 14a2 2 0 01-4 0v-3h4v3zm0-5H9V4h4v7z"/>
                  </svg>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-gray-900 text-sm uppercase mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{article.desc}</p>
                  <span className="text-[#c9a84c] text-sm font-semibold uppercase tracking-wide hover:text-[#b8973b] cursor-pointer">
                    Read More »
                  </span>
                  <p className="text-xs text-gray-400 mt-3">{article.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog"
              className="inline-block bg-[#c9a84c] hover:bg-[#b8973b] text-white font-semibold px-8 py-3 rounded transition-colors">
              Read More Here
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROGRAMMES SECTION
      ══════════════════════════════════════════════════════ */}
      {programs.length > 0 && (
        <section className="py-14 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase mb-2">
              Learning Programmes
            </h2>
            <p className="text-gray-600 mb-8">
              Structured pathways that lead to recognised qualifications
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program: any) => (
                <Link key={program.id} href={`/programs/${program.slug}`}>
                  <div className="border border-gray-200 rounded-lg p-6 h-full flex flex-col hover:border-[#c9a84c] hover:shadow-md transition-all bg-white">
                    <h3 className="font-extrabold text-gray-900 text-sm uppercase mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">
                      {program.courses?.length || 0} courses · {program.durationWeeks} weeks
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-[#c9a84c] font-semibold">{program.awardTitle}</span>
                      <span className="text-[#c9a84c] font-bold">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-[#0d2233] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase mb-3">How It Works</h2>
          <p className="text-cyan-300 mb-12">Four simple steps to your clinical research certification</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose a Course', desc: 'Browse our UK-aligned clinical research catalogue' },
              { step: '02', title: 'Enrol Free',      desc: 'Create your account and get started immediately' },
              { step: '03', title: 'Learn Online',    desc: 'Video lessons, reading materials, and quizzes at your pace' },
              { step: '04', title: 'Get Certified',   desc: 'Pass the final assessment and earn your certificate' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-[#c9a84c] text-[#c9a84c] text-xl font-extrabold flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-cyan-300/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10+',  label: 'Specialist Courses' },
            { value: '50+',  label: 'Countries Reached' },
            { value: '100%', label: 'Online & Self-Paced' },
            { value: '✓',    label: 'UK GDPR Compliant' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-[#0d2233] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ── Inline atomic star SVG for placeholders ── */
function AtomStar() {
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="62" rx="42" ry="10" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a, i) => (
        <ellipse key={i} cx="50" cy="50" rx="5" ry="28" fill="white"
          opacity={i % 2 === 0 ? 0.6 : 0.35} transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="4" fill="white" opacity="0.8" />
    </svg>
  );
}
