import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getPrograms() {
  try {
    const res = await fetch(`${API}/api/v1/programs`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export const metadata = { title: 'Learning Programmes — Clinical Research Nexus' };

const PROGRAMME_VISUALS: Record<string, { gradient: string; icon: string; tag: string; highlight: string }> = {
  'cra-foundation-certificate': {
    gradient: 'from-[#0d2233] to-[#1a4a6e]',
    icon: '🔬',
    tag: 'Clinical Research Practice',
    highlight: 'Master the fundamentals of clinical research site management, GCP compliance, and the CRA role in UK trials.',
  },
  'pharmacovigilance-certificate': {
    gradient: 'from-[#1a2a1a] to-[#2d6e3e]',
    icon: '💊',
    tag: 'Drug Safety & Monitoring',
    highlight: 'Build expertise in adverse event reporting, MHRA Yellow Card, signal detection, and EU pharmacovigilance obligations.',
  },
  'clinical-trial-management-certificate': {
    gradient: 'from-[#1a1a2e] to-[#2d3e6e]',
    icon: '📋',
    tag: 'Trial Operations & Compliance',
    highlight: 'Lead clinical trials from start-up to closure with confidence — covering GCP, MHRA regulations, and site oversight.',
  },
  'default': {
    gradient: 'from-[#055d69] to-[#0d2233]',
    icon: '🎓',
    tag: 'Structured Learning Pathway',
    highlight: 'A structured pathway leading to a recognised qualification in clinical research.',
  },
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Programmes</p>
          <h1 className="text-4xl font-extrabold mb-3">Learning Programmes</h1>
          <p className="text-cyan-100 text-lg max-w-2xl">
            Structured qualification pathways recognised across the UK clinical research community.
            Each programme combines multiple courses into a coherent learning journey.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">

          {programs.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-lg">No programmes available yet.</p>
              <p className="text-sm mt-1">Check back soon or browse individual courses.</p>
              <Link href="/courses" className="btn-primary mt-6 inline-block">Browse Courses</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {programs.map((program: any) => {
                const visual = PROGRAMME_VISUALS[program.slug] || PROGRAMME_VISUALS['default'];
                return (
                  <Link key={program.id} href={`/programs/${program.slug}`}>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col hover:border-[#c9a84c] hover:shadow-lg transition-all group">

                      {/* Banner */}
                      <div className={`relative w-full h-48 bg-gradient-to-br ${visual.gradient} flex flex-col items-center justify-center overflow-hidden`}>
                        {/* Decorative circles */}
                        <div className="absolute inset-0 opacity-10">
                          <svg width="100%" height="100%" viewBox="0 0 200 100">
                            <circle cx="170" cy="15"  r="70" fill="white" />
                            <circle cx="10"  cy="90"  r="45" fill="white" />
                          </svg>
                        </div>
                        {/* Icon + tag */}
                        <div className="relative z-10 text-center px-6">
                          <div className="text-6xl mb-3">{visual.icon}</div>
                          <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                            {visual.tag}
                          </span>
                        </div>
                        {/* Duration pill */}
                        {program.durationWeeks && (
                          <div className="absolute top-3 right-3 bg-black/30 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                            {program.durationWeeks} weeks
                          </div>
                        )}
                        {/* Accreditation */}
                        {program.accreditationBody && (
                          <div className="absolute bottom-3 left-3 bg-[#c9a84c] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                            {program.accreditationBody}
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="font-extrabold text-[#0d2233] text-[15px] uppercase leading-snug mb-2 group-hover:text-[#c9a84c] transition-colors">
                          {program.title}
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                          {visual.highlight}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs bg-cyan-50 text-cyan-800 font-medium px-2.5 py-1 rounded-full border border-cyan-100">
                            {program.courses?.length || 0} courses
                          </span>
                          {program.durationWeeks && (
                            <span className="text-xs bg-amber-50 text-amber-800 font-medium px-2.5 py-1 rounded-full border border-amber-100">
                              {program.durationWeeks} weeks
                            </span>
                          )}
                          {program.accreditationBody && (
                            <span className="text-xs bg-green-50 text-green-800 font-medium px-2.5 py-1 rounded-full border border-green-100">
                              {program.accreditationBody}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-[#c9a84c] font-semibold leading-snug max-w-[80%]">
                            {program.awardTitle}
                          </span>
                          <span className="text-[#c9a84c] font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
