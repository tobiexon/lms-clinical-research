import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getPrograms() {
  try {
    const res = await fetch(`${API}/api/v1/programs`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export const metadata = { title: 'Learning Programmes — Exon Sciences' };

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Programmes</h1>
      <p className="text-gray-600 mb-10">
        Structured qualification pathways recognised across the UK clinical research community
      </p>

      {programs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No programmes available yet.</p>
          <p className="text-sm mt-1">Check back soon or browse individual courses.</p>
          <Link href="/courses" className="btn-primary mt-6 inline-block">Browse Courses</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program: any) => (
            <Link key={program.id} href={`/programs/${program.slug}`}>
              <div className="card p-6 h-full flex flex-col hover:border-primary-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h2>
                <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">{program.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge-blue">{program.courses?.length || 0} courses</span>
                  {program.durationWeeks && <span className="badge-amber">{program.durationWeeks} weeks</span>}
                  {program.accreditationBody && <span className="badge-green">{program.accreditationBody}</span>}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-primary-700">{program.awardTitle}</span>
                  <span className="text-primary-600 font-medium">View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
