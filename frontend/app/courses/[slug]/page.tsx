import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EnrollButton from '@/components/course/EnrollButton';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getCourse(slug: string) {
  try {
    const res = await fetch(`${API}/api/v1/courses/${slug}`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  return course
    ? { title: course.title, description: course.subtitle || course.description }
    : { title: 'Course Not Found' };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  const totalLessons = course.modules?.reduce(
    (s: number, m: any) => s + (m.lessons?.length || 0), 0
  ) || 0;
  const totalModules = course.modules?.length || 0;
  const estimatedHours = course.durationHours || totalModules * 8;
  const instructor = course.instructors?.[0]?.instructor;

  return (
    <main>
      {/* ══════════════════════════════════════════════════════
          HERO — Dark navy banner directly below navbar
          Matches Viares product page top section
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0d2233] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-cyan-400/70 mb-4 flex-wrap">
            <Link href="/" className="hover:text-cyan-300">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-cyan-300">All Courses</Link>
            <span>/</span>
            {course.category && (
              <>
                <Link href={`/courses?category=${course.category.slug}`} className="hover:text-cyan-300">
                  {course.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-cyan-200 truncate max-w-xs">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ── Left: course info ── */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {course.difficultyLevel && (
                  <span className="bg-[#c9a84c] text-white text-xs font-bold uppercase px-2.5 py-1 rounded">
                    {course.difficultyLevel}
                  </span>
                )}
                {course.accreditation && (
                  <span className="bg-cyan-700/60 text-cyan-200 text-xs px-2.5 py-1 rounded">
                    {course.accreditation.split('|')[0].trim()}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase mb-4 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              {course.subtitle && (
                <p className="text-cyan-100 text-base mb-5 leading-relaxed max-w-2xl">
                  {course.subtitle}
                </p>
              )}

              {/* Star rating placeholder */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex text-[#c9a84c] text-lg">★★★★★</div>
                <span className="text-white font-semibold text-sm">4.9</span>
                <span className="text-cyan-400 text-sm">/ 5 &nbsp;·&nbsp; 100% Money-back Guarantee</span>
              </div>

              {/* Quick stats row */}
              <div className="flex flex-wrap gap-5 text-sm text-cyan-200 mb-6">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {estimatedHours}+ hours of learning
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  {totalModules} modules
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Certificate included
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
                  </svg>
                  Online &amp; Self-paced
                </span>
              </div>

              {/* CTA buttons — hero level */}
              <div className="flex flex-wrap gap-3">
                <EnrollButton
                  courseId={course.id}
                  slug={course.slug}
                  title={course.title}
                  price={parseFloat(course.price) || 100}
                  originalPrice={course.originalPrice ? parseFloat(course.originalPrice) : undefined}
                  category={course.category?.name}
                />
                <a
                  href="#syllabus"
                  className="border border-cyan-400/60 text-cyan-200 hover:text-white hover:border-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  View Syllabus
                </a>
              </div>
            </div>

            {/* ── Right: course image card ── */}
            <div className="lg:col-span-1">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                {course.thumbnailUrl ? (
                  <div className="relative w-full h-52">
                    <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-52 bg-gradient-to-br from-[#0a1a2a] to-[#0e4a6e] flex flex-col items-center justify-center p-6">
                    <CoursePlaceholderIcon />
                    <p className="text-cyan-300/60 text-xs mt-3 text-center">{course.category?.name}</p>
                  </div>
                )}
                {/* Quick info inside card */}
                <div className="bg-[#0a1827] p-4 space-y-2.5 text-sm">
                  {[
                    { label: 'Duration', value: `${estimatedHours}+ hours` },
                    { label: 'Level', value: course.difficultyLevel?.charAt(0) + course.difficultyLevel?.slice(1).toLowerCase() },
                    { label: 'Language', value: course.language === 'en-GB' ? 'English (UK)' : course.language },
                    { label: 'Certificate', value: '✓ Included', green: true },
                    { label: 'Access', value: 'Lifetime' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-cyan-400">{row.label}</span>
                      <span className={row.green ? 'text-green-400 font-medium' : 'text-white'}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Employer trust bar ── */}
      <div className="bg-[#0a1827] border-b border-white/5 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-cyan-500 text-xs uppercase tracking-widest mb-3">
            Trusted by professionals working at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['IQVIA', 'Covance', 'PAREXEL', 'Syneos Health', 'ICON', 'PPD', 'Labcorp'].map((name) => (
              <span key={name} className="text-cyan-300 text-sm font-bold tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT — White background below hero
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* What you will learn */}
            {course.learningObjectives?.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                  What You Will Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.learningObjectives.map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-[#c9a84c] font-bold text-lg shrink-0 mt-0.5">✓</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Programme structure */}
            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-2">
                Programme Structure
              </h2>
              <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#0d2233]">{estimatedHours}+</span>
                  <span>hours of learning</span>
                </div>
                <div className="w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#0d2233]">{totalModules}</span>
                  <span>module{totalModules !== 1 ? 's' : ''}</span>
                </div>
                <div className="w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#0d2233]">{totalLessons}</span>
                  <span>lesson{totalLessons !== 1 ? 's' : ''}</span>
                </div>
                <div className="w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">✓</span>
                  <span>Certificate included</span>
                </div>
              </div>

              {/* Module accordion */}
              {course.modules?.length > 0 && (
                <div id="syllabus" className="space-y-2">
                  {course.modules.map((module: any, i: number) => (
                    <details key={module.id} className="group border border-gray-200 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-[#0d2233] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{module.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {module.lessons?.length || 0} lesson{(module.lessons?.length || 0) !== 1 ? 's' : ''}
                              {module.quiz ? ' · 1 quiz' : ''}
                            </p>
                          </div>
                        </div>
                        <span className="text-gray-400 text-lg group-open:rotate-180 transition-transform duration-200">▾</span>
                      </summary>

                      {module.lessons?.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50 divide-y divide-gray-100">
                          {module.lessons.map((lesson: any) => (
                            <div key={lesson.id} className="flex items-center gap-3 px-5 py-3">
                              <span className="text-base shrink-0">
                                {lesson.lessonType === 'VIDEO' ? '▶️' : lesson.lessonType === 'PDF' ? '📄' : '📝'}
                              </span>
                              <span className="text-sm text-gray-700 flex-1">{lesson.title}</span>
                              {lesson.isPreview && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Free Preview</span>
                              )}
                              {lesson.videoDurationMinutes && (
                                <span className="text-xs text-gray-400">{lesson.videoDurationMinutes}min</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </details>
                  ))}
                </div>
              )}
            </section>

            {/* Instructor */}
            {instructor && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-5">
                  Your Instructor
                </h2>
                <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  {instructor.photoUrl ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#c9a84c]">
                      <Image src={instructor.photoUrl} alt={instructor.fullName} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#0d2233] flex items-center justify-center shrink-0 text-white text-2xl font-bold border-2 border-[#c9a84c]">
                      {instructor.fullName.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-extrabold text-gray-900 text-lg uppercase">{instructor.fullName}</p>
                    <p className="text-sm text-[#c9a84c] font-medium mb-2">{instructor.title}</p>
                    {instructor.bio && (
                      <p className="text-sm text-gray-600 leading-relaxed">{instructor.bio}</p>
                    )}
                    {instructor.credentials?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {instructor.credentials.map((cred: string) => (
                          <span key={cred} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded">
                            {cred}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Prerequisites */}
            {course.prerequisites?.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-4">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-[#c9a84c] font-bold shrink-0">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Why Clinical Research Nexus */}
            <section className="bg-[#0d2233] rounded-xl p-8 text-white">
              <h2 className="text-xl font-extrabold uppercase mb-5">Why Clinical Research Nexus?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  '✓ Globally recognised &amp; industry-aligned certification',
                  '✓ Designed for UK and international clinical research practice',
                  '✓ Self-paced — learn on your schedule',
                  '✓ Lifetime access to course materials',
                  '✓ Certificate issued on successful completion',
                  '✓ MHRA and ICH GCP E6(R3) aligned content',
                ].map((item) => (
                  <p key={item} className="text-sm text-cyan-200" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-5">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  {
                    q: 'Is this course suitable for beginners?',
                    a: `This course is designed for ${course.difficultyLevel?.toLowerCase() === 'beginner' ? 'beginners with no prior clinical research experience' : 'professionals with some clinical research background looking to advance'}. Check the prerequisites section above for specific requirements.`,
                  },
                  {
                    q: 'How long do I have access to the course?',
                    a: 'Once enrolled, you have lifetime access to all course materials, including any future updates.',
                  },
                  {
                    q: 'Will I receive a certificate?',
                    a: 'Yes. A certificate of completion is issued upon successfully passing the final assessment. Certificates are verifiable online and include a unique verification code.',
                  },
                  {
                    q: 'Is this course recognised in the UK?',
                    a: 'Yes. All courses are aligned with MHRA guidelines and ICH GCP E6(R3) standards applicable in the United Kingdom and internationally.',
                  },
                ].map((faq) => (
                  <details key={faq.q} className="border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-gray-50 font-semibold text-gray-900 text-sm">
                      {faq.q}
                      <span className="text-[#c9a84c] text-lg shrink-0">+</span>
                    </summary>
                    <div className="px-5 pb-4 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sticky sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Enrol card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#0d2233] px-5 py-4">
                  <p className="text-cyan-300 text-xs uppercase tracking-widest mb-1">Enrol Today</p>
                  <p className="text-white font-bold text-lg leading-snug">{course.title}</p>
                </div>

                {/* Price section */}
                <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#0d2233]">
                      £{(parseFloat(course.price) || 100).toFixed(2)}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        £{parseFloat(course.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <p className="text-xs text-green-600 font-medium mt-0.5">
                      Save £{(parseFloat(course.originalPrice) - (parseFloat(course.price) || 100)).toFixed(2)} today
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">One payment · Lifetime access</p>
                </div>

                <div className="p-5 space-y-3 text-sm">
                  {[
                    { icon: '⏱', label: 'Duration', value: `${estimatedHours}+ hours` },
                    { icon: '📚', label: 'Modules', value: `${totalModules} modules · ${totalLessons} lessons` },
                    { icon: '🌐', label: 'Language', value: 'English (UK)' },
                    { icon: '🏅', label: 'Certificate', value: 'Included' },
                    { icon: '🔄', label: 'Access', value: 'Lifetime' },
                    { icon: '📱', label: 'Format', value: 'Online, Self-paced' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2.5">
                      <span>{row.icon}</span>
                      <span className="text-gray-500 w-20 shrink-0">{row.label}</span>
                      <span className="text-gray-900 font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <EnrollButton
                    courseId={course.id}
                    slug={course.slug}
                    title={course.title}
                    price={parseFloat(course.price) || 100}
                    originalPrice={course.originalPrice ? parseFloat(course.originalPrice) : undefined}
                    category={course.category?.name}
                  />
                  <p className="text-xs text-center text-gray-400 mt-2">
                    5-day money-back guarantee
                  </p>
                </div>
              </div>

              {/* Tags */}
              {course.tags?.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Topics</p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* Inline placeholder icon for courses without thumbnails */
function CoursePlaceholderIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="62" rx="42" ry="10" fill="none" stroke="#67e8f9" strokeWidth="2" opacity="0.4"/>
      {[0,22.5,45,67.5,90,112.5,135,157.5].map((a,i)=>(
        <ellipse key={i} cx="50" cy="50" rx="5" ry="28" fill="#67e8f9"
          opacity={i%2===0?0.6:0.35} transform={`rotate(${a} 50 50)`}/>
      ))}
      <circle cx="50" cy="50" r="4" fill="#67e8f9" opacity="0.8"/>
    </svg>
  );
}
