import Link from 'next/link';
import Image from 'next/image';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Badge label → style mapping (similar to Viares BEST VALUE, TOP COURSE, HOT NOW)
const BADGE_STYLES: Record<string, string> = {
  'BEST VALUE': 'bg-amber-400 text-amber-900',
  'TOP COURSE': 'bg-cyan-500 text-white',
  'HOT NOW':    'bg-red-500 text-white',
  'NEW':        'bg-green-500 text-white',
};

async function getCatalog(params: Record<string, string>) {
  try {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API}/api/v1/courses?${qs}`, { next: { revalidate: 60 } });
    if (!res.ok) return { courses: [], total: 0 };
    return res.json();
  } catch { return { courses: [], total: 0 }; }
}

async function getCategories() {
  try {
    const res = await fetch(`${API}/api/v1/courses/categories`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

// Map known course slugs to Viares-style badges
const COURSE_BADGES: Record<string, string> = {
  'clinical-research-associate-foundation': 'TOP COURSE',
  'clinical-trial-uk-startup-to-closure': 'TOP COURSE',
  'ich-gcp-e6-fundamentals-uk': 'HOT NOW',
  'uk-post-brexit-regulatory-landscape': 'HOT NOW',
  'introduction-to-pharmacovigilance': 'NEW',
};

export const metadata = {
  title: 'Clinical Research Courses & Certificates',
  description: 'UK-accredited online clinical research training courses. ICH GCP, Pharmacovigilance, Regulatory Affairs, CRA training and more.',
};

export default async function CoursesPage({ searchParams }: { searchParams: Record<string, string> }) {
  const page = searchParams.page || '1';
  const [{ courses, total }, categories] = await Promise.all([
    getCatalog({ page, limit: '24', ...(searchParams.category ? { category: searchParams.category } : {}), ...(searchParams.difficulty ? { difficulty: searchParams.difficulty } : {}), ...(searchParams.search ? { search: searchParams.search } : {}) }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(total / 24);
  const activeCategory = searchParams.category || '';

  return (
    <main>
      {/* ── Hero banner ── */}
      <section className="bg-[#0d2233] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Clinical Research Courses for Top Jobs
          </h1>
          <p className="text-cyan-200 text-lg mb-6">
            Including MHRA-aligned certification — recognised across the UK and globally
          </p>
          {/* Search bar */}
          <form action="/courses" method="get" className="flex gap-2 max-w-xl mx-auto">
            <input
              name="search"
              defaultValue={searchParams.search || ''}
              placeholder="Search courses e.g. GCP, pharmacovigilance..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Category filter tabs ── */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            <Link href="/courses"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
                !activeCategory ? 'bg-[#0d2233] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              All Courses
              <span className="ml-1.5 text-xs opacity-70">({total})</span>
            </Link>
            {categories.map((cat: any) => (
              <Link key={cat.id} href={`/courses?category=${cat.slug}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
                  activeCategory === cat.slug ? 'bg-[#0d2233] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course grid — Viares style ── */}
      <section className="bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Results count + filters */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-gray-600 text-sm">
              Showing <strong>{courses.length}</strong> of <strong>{total}</strong> courses
              {activeCategory && <> in <strong>{categories.find((c: any) => c.slug === activeCategory)?.name}</strong></>}
            </p>
            <div className="flex gap-2">
              {(['BEGINNER','INTERMEDIATE','ADVANCED'] as const).map((level) => (
                <Link key={level} href={`/courses?difficulty=${level}${activeCategory ? `&category=${activeCategory}` : ''}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    searchParams.difficulty === level
                      ? 'bg-[#0d2233] text-white border-[#0d2233]'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400 bg-white'
                  }`}>
                  {level.charAt(0) + level.slice(1).toLowerCase()}
                </Link>
              ))}
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-lg text-gray-700 font-medium mb-1">No courses found</p>
              <p className="text-sm text-gray-500 mb-6">Try a different filter or search term</p>
              <Link href="/courses" className="btn-primary">View All Courses</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any) => {
                const badge = COURSE_BADGES[course.slug];
                const totalModules = course._count?.modules || course.modules?.length || 0;
                const totalEnrolled = course._count?.enrollments || 0;

                return (
                  <Link key={course.id} href={`/courses/${course.slug}`} className="group">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-cyan-300 transition-all duration-200 h-full flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative w-full h-48 bg-gradient-to-br from-[#0d2233] to-[#0e4a6e] overflow-hidden">
                        {course.thumbnailUrl ? (
                          <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover opacity-80 group-hover:opacity-90 transition-opacity" />
                        ) : (
                          /* Decorative placeholder matching brand */
                          <div className="w-full h-full flex flex-col items-center justify-center p-6">
                            <AtomicStarIcon />
                            <p className="text-cyan-300/60 text-xs mt-3 text-center line-clamp-2">{course.category?.name}</p>
                          </div>
                        )}
                        {/* Badge */}
                        {badge && (
                          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${BADGE_STYLES[badge] || 'bg-gray-500 text-white'}`}>
                            {badge}
                          </div>
                        )}
                        {/* Difficulty */}
                        <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded capitalize">
                          {course.difficultyLevel?.toLowerCase()}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Category */}
                        {course.category && (
                          <span className="text-xs text-cyan-600 font-medium uppercase tracking-wide mb-1">
                            {course.category.name}
                          </span>
                        )}

                        {/* Title */}
                        <h2 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors">
                          {course.title}
                        </h2>

                        {/* Short description */}
                        {course.subtitle && (
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                            {course.subtitle}
                          </p>
                        )}

                        {/* Meta row — Viares style */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100 pt-3 mt-auto">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {totalModules} module{totalModules !== 1 ? 's' : ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.durationHours}h
                          </span>
                          {totalEnrolled > 0 && (
                            <span className="flex items-center gap-1 ml-auto">
                              <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {totalEnrolled.toLocaleString()} students
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="mt-4">
                          <span className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0d2233] group-hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg transition-colors">
                            View Course
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link key={p} href={`/courses?page=${p}${activeCategory ? `&category=${activeCategory}` : ''}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    parseInt(page) === p
                      ? 'bg-[#0d2233] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}>
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-[#0d2233] text-cyan-200 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10+', label: 'Specialist Courses' },
              { value: 'UK', label: 'MHRA Aligned' },
              { value: '100%', label: 'Online & Self-paced' },
              { value: '✓', label: 'Certificate Included' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-cyan-300 mb-1">{stat.value}</div>
                <div className="text-xs text-cyan-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Inline atomic star icon for course thumbnails
function AtomicStarIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="62" rx="42" ry="10" fill="none" stroke="#67e8f9" strokeWidth="2" opacity="0.4" />
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle, i) => (
        <ellipse key={i} cx="50" cy="50" rx="5" ry="28" fill="#67e8f9" opacity={i % 2 === 0 ? 0.8 : 0.5} transform={`rotate(${angle} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="4" fill="#67e8f9" />
    </svg>
  );
}
