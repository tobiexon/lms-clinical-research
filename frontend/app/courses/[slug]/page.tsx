import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EnrollButton from '@/components/course/EnrollButton';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getCourse(slug: string) {
  const res = await fetch(`${API}/api/v1/courses/${slug}`, { next: { revalidate: 120 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  return course ? { title: course.title, description: course.subtitle } : { title: 'Not Found' };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  const totalLessons = course.modules?.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0) || 0;
  const totalModules = course.modules?.length || 0;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/courses" className="hover:text-primary-700">Courses</Link>
        <span>/</span>
        <span>{course.category?.name || 'General'}</span>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-xs">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: details ── */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
          {course.subtitle && <p className="text-lg text-gray-600 mb-5">{course.subtitle}</p>}

          <div className="flex flex-wrap gap-2 mb-6">
            {course.category && <span className="badge-blue">{course.category.name}</span>}
            {course.difficultyLevel && <span className="badge-amber capitalize">{course.difficultyLevel.toLowerCase()}</span>}
            {course.accreditation && <span className="badge-green">{course.accreditation.split('|')[0].trim()}</span>}
            {course.language && <span className="badge text-xs bg-gray-100 text-gray-600">{course.language}</span>}
          </div>

          {/* Instructor */}
          {course.instructors?.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-6">
              {course.instructors[0].instructor.photoUrl ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={course.instructors[0].instructor.photoUrl} alt={course.instructors[0].instructor.fullName} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center shrink-0 text-primary-700 font-bold text-lg">
                  {course.instructors[0].instructor.fullName[0]}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{course.instructors[0].instructor.fullName}</p>
                <p className="text-sm text-gray-500">{course.instructors[0].instructor.title}</p>
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          {course.learningObjectives?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.learningObjectives.map((obj: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus */}
          {course.modules?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Course Syllabus
                <span className="text-sm font-normal text-gray-500 ml-2">
                  {totalModules} modules · {totalLessons} lessons
                </span>
              </h2>
              <div className="space-y-2">
                {course.modules.map((module: any, i: number) => (
                  <details key={module.id} className="border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="font-medium text-gray-900 text-sm">{module.title}</span>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{module.lessons?.length || 0} lessons</span>
                    </summary>
                    {module.lessons?.length > 0 && (
                      <div className="border-t border-gray-100 px-4 pb-3 pt-1">
                        {module.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center gap-2 py-1.5 text-sm text-gray-600">
                            <span className="text-gray-400 text-xs">
                              {lesson.lessonType === 'VIDEO' ? '▶' : lesson.lessonType === 'PDF' ? '📄' : '📝'}
                            </span>
                            <span>{lesson.title}</span>
                            {lesson.isPreview && <span className="badge-green text-xs ml-auto">Preview</span>}
                            {lesson.videoDurationMinutes && (
                              <span className="text-xs text-gray-400 ml-auto">{lesson.videoDurationMinutes}m</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h2>
              <ul className="space-y-1">
                {course.prerequisites.map((p: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2"><span className="text-gray-400">•</span>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Right: enrol card ── */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            {course.thumbnailUrl && (
              <div className="relative w-full h-44 mb-4 rounded-lg overflow-hidden">
                <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
              </div>
            )}
            <div className="space-y-2.5 mb-5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Duration</span>
                <span className="font-medium text-gray-900">{course.durationHours} hours</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Level</span>
                <span className="font-medium text-gray-900 capitalize">{course.difficultyLevel?.toLowerCase()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Modules</span>
                <span className="font-medium text-gray-900">{totalModules}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Lessons</span>
                <span className="font-medium text-gray-900">{totalLessons}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Certificate</span>
                <span className="font-medium text-green-600">✓ Included</span>
              </div>
            </div>
            <EnrollButton courseId={course.id} courseTitle={course.title} />
            <p className="text-xs text-center text-gray-400 mt-3">Issued upon passing the final assessment</p>
          </div>
        </div>
      </div>
    </main>
  );
}
