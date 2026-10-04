import { notFound } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getProgram(slug: string) {
  try {
    const res = await fetch(`${API}/api/v1/programs/${slug}`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);
  return program
    ? { title: `${program.title} — Clinical Research Nexus`, description: program.description }
    : { title: 'Not Found' };
}

// Per-slug visual config — same approach as the listing page
const VISUALS: Record<string, { from: string; to: string; icon: string; tag: string }> = {
  'cra-foundation-certificate':            { from: '#0d2233', to: '#1a4a6e', icon: '🔬', tag: 'Clinical Research Practice' },
  'pharmacovigilance-certificate':         { from: '#1a2a1a', to: '#2d6e3e', icon: '💊', tag: 'Drug Safety & Monitoring' },
  'clinical-trial-management-certificate': { from: '#1a1a2e', to: '#2d3e6e', icon: '📋', tag: 'Trial Operations & Compliance' },
  'default':                               { from: '#055d69', to: '#0d2233', icon: '🎓', tag: 'Structured Learning Pathway' },
};

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);
  if (!program) notFound();

  const courses = program.courses?.map((pc: any) => pc.course).filter(Boolean) || [];
  const visual  = VISUALS[params.slug] || VISUALS['default'];

  return (
    <main>
      {/* ── Hero banner ─────────────────────────────────────────── */}
      <section
        className="relative text-white py-16 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${visual.from} 0%, ${visual.to} 100%)` }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-white transition-colors">Programmes</Link>
            <span>/</span>
            <span className="text-white/90">{program.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Left: text */}
            <div className="flex-1">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <span className="text-base">{visual.icon}</span>
                {visual.tag}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase leading-tight mb-4">
                {program.title}
              </h1>

              {program.description && (
                <p className="text-white/80 text-base leading-relaxed max-w-2xl mb-6">
                  {program.description}
                </p>
              )}

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <span className="text-[#c9a84c] text-lg font-bold">{courses.length}</span>
                  <span>Course{courses.length !== 1 ? 's' : ''}</span>
                </div>
                {program.durationWeeks && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c] text-lg font-bold">{program.durationWeeks}</span>
                    <span>Weeks</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[#c9a84c] text-lg font-bold">✓</span>
                  <span>Certificate Included</span>
                </div>
              </div>
            </div>

            {/* Right: award card */}
            {program.awardTitle && (
              <div className="md:w-72 shrink-0 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Award on Completion</p>
                <p className="text-white font-extrabold text-base leading-snug mb-4">{program.awardTitle}</p>
                {program.accreditationBody && (
                  <div className="flex items-center gap-2">
                    <span className="bg-[#c9a84c] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                      {program.accreditationBody}
                    </span>
                    <span className="text-white/60 text-xs">Accredited</span>
                  </div>
                )}
                {courses[0] && (
                  <Link
                    href={`/courses/${courses[0].slug}`}
                    className="mt-5 block w-full text-center bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    Enrol Now →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Courses list — main column */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-extrabold text-gray-900 uppercase mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#c9a84c] rounded-full inline-block" />
                Courses in this Programme
              </h2>

              {courses.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
                  <p className="text-gray-400 text-sm">Courses are being added to this programme.</p>
                  <Link href="/courses" className="text-[#c9a84c] text-sm font-semibold mt-3 inline-block hover:underline">
                    Browse all courses →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course: any, i: number) => (
                    <Link key={course.id} href={`/courses/${course.slug}`}>
                      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:border-[#c9a84c] hover:shadow-md transition-all group">
                        {/* Step number */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-extrabold text-sm"
                          style={{ background: `linear-gradient(135deg, ${visual.from}, ${visual.to})` }}
                        >
                          {i + 1}
                        </div>

                        {/* Course info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-extrabold text-[#0d2233] text-[15px] uppercase leading-snug group-hover:text-[#c9a84c] transition-colors">
                            {course.title}
                          </h3>
                          {course.subtitle && (
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{course.subtitle}</p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                            {course.durationHours > 0 && (
                              <span className="flex items-center gap-1">⏱ {course.durationHours}+ hours</span>
                            )}
                            {course.difficultyLevel && (
                              <span className="flex items-center gap-1">📊 {course.difficultyLevel.charAt(0) + course.difficultyLevel.slice(1).toLowerCase()}</span>
                            )}
                            {course.category?.name && (
                              <span className="flex items-center gap-1">🏷 {course.category.name}</span>
                            )}
                          </div>
                        </div>

                        {/* Status + arrow */}
                        <div className="flex items-center gap-3 shrink-0">
                          {course.isPublished ? (
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                              Available
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                              Coming soon
                            </span>
                          )}
                          <span className="text-[#c9a84c] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Programme summary card */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div
                  className="px-5 py-4"
                  style={{ background: `linear-gradient(135deg, ${visual.from}, ${visual.to})` }}
                >
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Programme Overview</p>
                  <p className="text-white font-extrabold text-base">{program.title}</p>
                </div>
                <div className="p-5 space-y-3 text-sm">
                  {[
                    { icon: '📚', label: 'Courses',        value: `${courses.length} course${courses.length !== 1 ? 's' : ''}` },
                    { icon: '⏱',  label: 'Duration',       value: program.durationWeeks ? `${program.durationWeeks} weeks` : 'Self-paced' },
                    { icon: '🏅', label: 'Award',          value: program.awardTitle || 'Certificate' },
                    { icon: '✅', label: 'Accreditation',  value: program.accreditationBody || 'Exon Sciences' },
                    { icon: '🔄', label: 'Access',         value: 'Lifetime' },
                    { icon: '📱', label: 'Format',         value: 'Online, Self-paced' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-2.5">
                      <span className="shrink-0">{row.icon}</span>
                      <span className="text-gray-500 w-24 shrink-0">{row.label}</span>
                      <span className="text-gray-900 font-medium leading-snug">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why this programme */}
              <div className="bg-[#0d2233] text-white rounded-xl p-5 space-y-3">
                <p className="font-extrabold text-sm uppercase tracking-wide mb-3">Why This Programme?</p>
                {[
                  'UK regulatory framework aligned',
                  'Verifiable certificate on completion',
                  'Learn at your own pace',
                  'Lifetime access to all materials',
                  'Taught by practising professionals',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="text-[#c9a84c] font-bold shrink-0">✓</span>
                    <span className="text-cyan-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CTA section ──────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-500 mb-7 text-base">
            Enrol in the first course to begin working towards your{' '}
            <span className="text-[#0d2233] font-semibold">{program.awardTitle || 'certificate'}</span>.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {courses[0] && (
              <Link
                href={`/courses/${courses[0].slug}`}
                className="bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-10 py-3.5 rounded-xl transition-colors shadow-md"
              >
                Start with {courses[0].title}
              </Link>
            )}
            <Link
              href="/programs"
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              ← All Programmes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
