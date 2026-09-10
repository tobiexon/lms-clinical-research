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
    ? { title: `${program.title} — Exon Sciences`, description: program.description }
    : { title: 'Not Found' };
}

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);
  if (!program) notFound();

  const courses = program.courses?.map((pc: any) => pc.course).filter(Boolean) || [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/programs" className="hover:text-primary-700">Programmes</Link>
        <span>/</span>
        <span className="text-gray-700">{program.title}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{program.title}</h1>

      {program.description && (
        <p className="text-gray-600 mb-6">{program.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="badge-blue">{courses.length} courses</span>
        {program.durationWeeks && <span className="badge-amber">{program.durationWeeks} weeks</span>}
        {program.accreditationBody && <span className="badge-green">{program.accreditationBody}</span>}
      </div>

      {/* Award banner */}
      {program.awardTitle && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-8">
          <p className="text-xs font-medium text-primary-500 uppercase tracking-wide mb-1">Award</p>
          <p className="text-primary-900 font-semibold text-lg">{program.awardTitle}</p>
        </div>
      )}

      {/* Courses list */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Courses in this Programme
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500 text-sm">No courses added to this programme yet.</p>
      ) : (
        <div className="space-y-3">
          {courses.map((course: any, i: number) => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <div className="card p-5 flex items-center gap-4 hover:border-primary-300">
                <span className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 text-sm font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {course.durationHours && `${course.durationHours}h`}
                    {course.difficultyLevel && ` · ${course.difficultyLevel.toLowerCase()}`}
                    {course.category?.name && ` · ${course.category.name}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {course.isPublished ? (
                    <span className="badge-green text-xs">Available</span>
                  ) : (
                    <span className="badge text-xs bg-gray-100 text-gray-500">Coming soon</span>
                  )}
                  <span className="text-primary-600">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 bg-primary-50 border border-primary-200 rounded-xl text-center">
        <h3 className="font-semibold text-gray-900 mb-2">Ready to start your journey?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enrol in the first course to begin working towards your {program.awardTitle || 'certificate'}.
        </p>
        {courses[0] && (
          <Link href={`/courses/${courses[0].slug}`} className="btn-primary">
            Start with {courses[0].title}
          </Link>
        )}
      </div>
    </main>
  );
}
