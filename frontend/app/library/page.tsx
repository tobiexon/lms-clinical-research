import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Knowledge Library — Clinical Research Nexus',
  description: 'Free clinical research guides, explainers, and resources for UK clinical research professionals.',
};

const ARTICLES = [
  {
    tag: 'GCP & REGULATIONS',
    title: 'ICH GCP E6(R3): What Changed and Why It Matters',
    desc: 'Explore the key revisions in the latest ICH GCP E6(R3) guideline and what they mean for clinical trial conduct in the UK and globally. Covers risk-based monitoring, technology use, and new sponsor/investigator responsibilities.',
    date: 'September 2026',
    color: 'from-cyan-800 to-teal-600',
    readTime: '8 min read',
  },
  {
    tag: 'CAREER GUIDE',
    title: 'What is a Clinical Research Associate (CRA)?',
    desc: 'Understand the day-to-day responsibilities of a CRA, the skills required, how to break into this growing career field, and what qualifications UK employers are looking for.',
    date: 'August 2026',
    color: 'from-teal-700 to-cyan-600',
    readTime: '6 min read',
  },
  {
    tag: 'PHARMACOVIGILANCE',
    title: 'Understanding Pharmacovigilance in the UK',
    desc: 'Discover the principles of drug safety monitoring, adverse event reporting, and the role of the MHRA Yellow Card scheme. Covers MAH obligations, expedited reporting, and signal detection.',
    date: 'July 2026',
    color: 'from-[#0d2233] to-teal-700',
    readTime: '7 min read',
  },
  {
    tag: 'CLINICAL TRIALS',
    title: 'Clinical Trial Phases Explained: Phase I to Phase IV',
    desc: 'A clear guide to the four phases of clinical trials — what each phase tests, typical patient numbers, endpoints, and how UK MHRA oversight applies at each stage.',
    date: 'June 2026',
    color: 'from-[#1a2a1a] to-[#2d6e3e]',
    readTime: '5 min read',
  },
  {
    tag: 'REGULATORY AFFAIRS',
    title: 'The UK Regulatory Landscape Post-Brexit',
    desc: "How the UK has diverged from EU regulations since Brexit, what the MHRA's new frameworks mean for clinical trial sponsors, and how to navigate dual UK/EU submissions.",
    date: 'May 2026',
    color: 'from-[#2a1a1a] to-[#6e2d2d]',
    readTime: '9 min read',
  },
  {
    tag: 'DATA MANAGEMENT',
    title: 'Introduction to Clinical Data Management',
    desc: 'An overview of CDM roles, data capture systems (EDC), data validation, and the ALCOA principles that underpin data integrity in clinical trials.',
    date: 'April 2026',
    color: 'from-[#1a1a2a] to-[#2d3e6e]',
    readTime: '6 min read',
  },
];

export default function LibraryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Knowledge Library</p>
          <h1 className="text-4xl font-extrabold mb-3">Clinical Research Resources</h1>
          <p className="text-cyan-100 text-lg max-w-2xl">
            Free guides, explainers, and resources for clinical research professionals — from GCP fundamentals
            to career advice and regulatory updates.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {['All', 'GCP & Regulations', 'Career Guide', 'Pharmacovigilance', 'Clinical Trials', 'Regulatory Affairs', 'Data Management'].map((tag) => (
            <span key={tag}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                tag === 'All'
                  ? 'bg-[#0d2233] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-12 px-4 bg-[#eef4f7]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <div key={article.title}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Thumbnail */}
              <div className={`relative w-full h-40 bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                <div className="absolute top-3 left-3 bg-black/40 text-white text-[9px] font-bold uppercase px-2 py-1 rounded tracking-wide">
                  {article.tag}
                </div>
                <svg className="w-14 h-14 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2v2h1v14a4 4 0 008 0V4h1V2H7zm6 14a2 2 0 01-4 0v-3h4v3zm0-5H9V4h4v7z"/>
                </svg>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-extrabold text-gray-900 text-[15px] uppercase leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{article.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#c9a84c] text-sm font-semibold uppercase tracking-wide hover:text-[#b8973b] cursor-pointer">
                    Read More »
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Academy · {article.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Browse courses CTA */}
        <div className="max-w-5xl mx-auto mt-12 bg-[#0d2233] rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-extrabold uppercase mb-2">Ready to go deeper?</h2>
          <p className="text-cyan-300 mb-5 text-sm">
            Turn these concepts into a verifiable qualification with one of our structured courses.
          </p>
          <Link href="/courses"
            className="inline-block bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-8 py-3 rounded-lg transition-colors">
            Browse Courses
          </Link>
        </div>
      </section>
    </main>
  );
}
