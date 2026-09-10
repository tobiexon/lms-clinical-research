'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-300">

      {/* Newsletter bar */}
      <div className="border-t border-primary-800 border-b border-primary-800 py-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-white font-semibold text-lg mb-2">
            Stay ahead in clinical research
          </h3>
          <p className="text-primary-400 text-sm mb-5">
            Get new course updates, UK regulatory news, and career tips delivered to your inbox.
          </p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary-900 border border-primary-700 text-white placeholder-primary-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo variant="footer" href="/" />
            </div>
            <p className="text-sm text-cyan-300/60 leading-relaxed mb-4">
              Clinical research training for the UK and global healthcare community.
              ICH GCP aligned, MHRA compliant.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center text-primary-300 hover:text-white transition-colors text-xs">
                in
              </a>
              <a href="#" aria-label="Twitter/X"
                className="w-8 h-8 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center text-primary-300 hover:text-white transition-colors text-xs">
                𝕏
              </a>
              <a href="#" aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center text-primary-300 hover:text-white transition-colors text-xs">
                ▶
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Courses</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/courses?category=good-clinical-practice" className="hover:text-white transition-colors">Good Clinical Practice</Link></li>
              <li><Link href="/courses?category=pharmacovigilance" className="hover:text-white transition-colors">Pharmacovigilance</Link></li>
              <li><Link href="/courses?category=clinical-data-management" className="hover:text-white transition-colors">Clinical Data Management</Link></li>
              <li><Link href="/courses?category=regulatory-affairs" className="hover:text-white transition-colors">Regulatory Affairs</Link></li>
              <li><Link href="/courses?category=investigator-training" className="hover:text-white transition-colors">Investigator Training</Link></li>
              <li><Link href="/courses" className="text-primary-400 hover:text-white transition-colors">All Courses →</Link></li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Programmes</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/programs/cra-foundation-certificate" className="hover:text-white transition-colors">CRA Foundation Certificate</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">All Programmes</Link></li>
              <li className="pt-2">
                <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Quick Links</h4>
              </li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link href="/certificates/verify" className="hover:text-white transition-colors">Verify Certificate</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Get Started Free</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Information</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>

            <div className="mt-6 p-3 bg-primary-900 rounded-lg border border-primary-800">
              <p className="text-xs text-primary-400">
                🕐 Support available 24/7
              </p>
              <a href="mailto:support@exonsciences.com"
                className="text-xs text-primary-300 hover:text-white block mt-1">
                support@exonsciences.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-500">
          <p>© {new Date().getFullYear()} Clinical Research Nexus by Exon Sciences Ltd. All rights reserved. Registered in England & Wales.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span> ICH GCP E6(R3) Aligned
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span> MHRA Framework
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span> UK GDPR Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
