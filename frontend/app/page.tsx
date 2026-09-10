/**
 * Homepage — fetches data from NestJS API
 * Using fetch() directly so Next.js can cache server-side
 */

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/layout/Logo';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getFeaturedCourses() {
  try {
    const res = await fetch(`${API}/api/v1/courses/featured`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

async function getPrograms() {
  try {
    const res = await fetch(`${API}/api/v1/programs`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export default async function HomePage() {
  const [featuredCourses, programs] = await Promise.all([
    getFeaturedCourses(),
    getPrograms(),
  ]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#0d2233] text-white py-3 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          {/* <div className="flex justify-center mb-6">
            <Logo variant="hero" href="/" />
          </div> */}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Clinical Research Career<br />
            <span className="text-cyan-300">Takes Off Now</span>
          </h1>
          <p className="text-lg text-cyan-100 mb-4 max-w-2xl mx-auto">
            Clinical Research Nexus empowers aspiring professionals with global-accredited
            online training, certification, and career support.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-cyan-300 mb-8 flex-wrap">
            <span>📈 85% land their dream job within 6 months</span>
            <span>🌍 Learners across 50+ countries</span>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses" className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors shadow-lg">
              Explore All Courses
            </Link>
            <Link href="/programs" className="border border-cyan-400/60 text-cyan-200 hover:text-white hover:border-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors">
              View Programmes
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
          <span>✓ UK & Global Learners</span>
          <span>✓ Certificate on Completion</span>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Courses</h2>
          <p className="text-gray-600 mb-8">Our most popular clinical research programmes</p>

          {featuredCourses.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p>No featured courses yet.</p>
              <p className="text-sm mt-1">Add courses via the admin panel and mark them as featured.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course: any) => (
                <Link key={course.id} href={`/courses/${course.slug}`}>
                  <div className="card p-5 h-full flex flex-col">
                    {course.thumbnailUrl && (
                      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      {course.category && (
                        <span className="badge-blue text-xs mb-2 inline-block">{course.category.name}</span>
                      )}
                      <h3 className="font-semibold text-gray-900 mt-1 mb-1 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{course.subtitle}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <span>{course.durationHours}h · <span className="capitalize">{course.difficultyLevel?.toLowerCase()}</span></span>
                      {course.accreditation && (
                        <span className="badge-green">{course.accreditation.split('|')[0].trim()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/courses" className="btn-primary">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* ── Programmes ── */}
      {programs.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Programmes</h2>
            <p className="text-gray-600 mb-8">Structured pathways leading to recognised qualifications</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program: any) => (
                <Link key={program.id} href={`/programs/${program.slug}`}>
                  <div className="card p-6 h-full flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">
                      {program.courses?.length || 0} courses · {program.durationWeeks} weeks
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-primary-700 font-medium">{program.awardTitle}</span>
                      <span className="text-primary-600">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose a Course', desc: 'Browse our clinical research catalogue' },
              { step: '2', title: 'Enrol', desc: 'Create your account and enrol instantly' },
              { step: '3', title: 'Learn', desc: 'Video lessons, reading materials, and quizzes' },
              { step: '4', title: 'Certify', desc: 'Pass the assessment and earn your certificate' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-700 text-white text-lg font-bold flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
