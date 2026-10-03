import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Clinical Research Nexus',
  description: 'Learn about Clinical Research Nexus and our mission to advance clinical research education in the UK.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Advancing Clinical Research<br />Education in the UK
          </h1>
          <p className="text-cyan-100 text-lg max-w-2xl leading-relaxed">
            Clinical Research Nexus is the online learning platform of Exon Sciences Ltd —
            built for clinical research professionals who want UK-aligned, practical training
            they can apply from day one.
          </p>
        </div>
      </section>

      {/* Acronym explainer bar */}
      <section className="bg-[#0a1827] border-b border-white/5 py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">Key Terms Explained</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                acronym: 'ICH',
                full: 'International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use',
                desc: 'The global body that brings together regulatory authorities and pharmaceutical industry representatives to develop unified scientific and technical standards for medicines.',
              },
              {
                acronym: 'GCP',
                full: 'Good Clinical Practice',
                desc: 'An international ethical and scientific quality standard for the design, conduct, performance, monitoring, auditing, recording, analysis and reporting of clinical trials.',
              },
              {
                acronym: 'E6(R3)',
                full: 'Efficacy Guideline 6, Revision 3',
                desc: 'The third revision of the ICH GCP guideline, updated to address modern trial methods including decentralised trials, risk-based monitoring, and the use of technology in clinical research.',
              },
            ].map((item) => (
              <div key={item.acronym} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#c9a84c] font-extrabold text-lg">{item.acronym}</span>
                  <span className="text-white/30 text-xs">—</span>
                  <span className="text-white text-xs font-semibold leading-snug">{item.full}</span>
                </div>
                <p className="text-cyan-200/70 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We exist to bridge the gap between academic knowledge and the real-world demands of
              clinical research practice in the United Kingdom. Our courses are built around the
              latest MHRA guidelines, ICH GCP E6(R3) standards, and the practical realities of
              running clinical trials in a UK regulatory environment.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are entering the industry for the first time or upskilling as an
              experienced professional, Clinical Research Nexus gives you the knowledge, credentials,
              and confidence to progress your career.
            </p>
          </div>
          <div className="bg-[#f0f9ff] border border-cyan-100 rounded-2xl p-8 space-y-5">
            {[
              { icon: '🎓', title: 'Industry-Aligned',  desc: 'Courses designed with UK clinical research professionals and aligned to MHRA and ICH GCP E6(R3).' },
              { icon: '🌍', title: 'Global Reach',      desc: 'Learners from over 30 countries building careers in clinical research.' },
              { icon: '📜', title: 'Certified',         desc: 'Receive a verifiable certificate upon completion of every course.' },
              { icon: '⏱',  title: 'Self-Paced',       desc: 'Learn on your schedule with lifetime access to all course materials.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-8 text-center">Who We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Exon Sciences Ltd',
                desc: 'We are a UK-based clinical research education company dedicated to raising standards in clinical trial conduct, pharmacovigilance, and regulatory affairs training.',
              },
              {
                title: 'Our Instructors',
                desc: 'Our courses are developed and delivered by practising clinical research professionals — CRAs, CRCs, regulatory specialists, and pharmacovigilance experts with decades of combined experience.',
              },
              {
                title: 'Our Platform',
                desc: 'Clinical Research Nexus is purpose-built for clinical research learners. From course delivery to certificate issuance, every feature is designed for the needs of our specific community.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#0d2233] text-base mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-[#0d2233] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold uppercase mb-3">Start Learning Today</h2>
          <p className="text-cyan-300 mb-7">
            Browse our full catalogue of UK-aligned clinical research training courses.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses"
              className="bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-8 py-3 rounded-lg transition-colors">
              Explore Courses
            </Link>
            <Link href="/contact"
              className="border border-cyan-400/60 text-cyan-200 hover:text-white hover:border-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
