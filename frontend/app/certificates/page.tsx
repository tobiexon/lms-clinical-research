'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { certificatesApi, enrollmentsApi } from '@/lib/api';

interface Certificate {
  id: string;
  courseTitle: string;
  issuedAt: string;
  expiresAt?: string | null;
  verificationCode: string;
  pdfUrl?: string | null;
}

interface Enrollment {
  courseId: string;
  status: string;
  course: {
    title: string;
    slug: string;
  };
}

export default function CertificatesPage() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [issuingFor, setIssuingFor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push('/login?redirect=/certificates');
      return;
    }

    async function load() {
      try {
        // Fetch certificates and completed enrollments in parallel
        const [certRes, enrollRes] = await Promise.all([
          certificatesApi.getMyCertificates(),
          enrollmentsApi.getMyEnrollments(),
        ]);

        const certs: Certificate[] = certRes.data;
        const enrollments: Enrollment[] = enrollRes.data;

        // Auto-issue certificates for completed enrollments that don't have one yet
        const completedEnrollments = enrollments.filter((e) => e.status === 'COMPLETED');
        const issuedCourseTitles = new Set(certs.map((c) => c.courseTitle));

        const toIssue = completedEnrollments.filter(
          (e) => !issuedCourseTitles.has(e.course?.title),
        );

        if (toIssue.length > 0) {
          const issued = await Promise.allSettled(
            toIssue.map((e) => {
              setIssuingFor(e.course?.title);
              return certificatesApi.issue({ courseId: e.courseId });
            }),
          );
          const newCerts = issued
            .filter((r) => r.status === 'fulfilled')
            .map((r) => (r as PromiseFulfilledResult<{ data: Certificate }>).value.data);
          setCertificates([...newCerts, ...certs]);
        } else {
          setCertificates(certs);
        }
      } catch {
        router.push('/login?redirect=/certificates');
      } finally {
        setIssuingFor(null);
        setLoading(false);
      }
    }

    load();
  }, [router]);

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0d2233] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {issuingFor ? `Issuing certificate for ${issuingFor}…` : 'Loading your certificates…'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-900 font-medium">My Certificates</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
        <p className="text-gray-500 mt-1">
          Your earned certificates from completed courses. Share or verify using the unique code.
        </p>
      </div>

      {certificates.length === 0 ? (
        /* Empty state */
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No certificates yet</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Complete a course to earn your certificate. Certificates are issued automatically once all lessons are finished.
          </p>
          <Link href="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              copied={copied}
              onCopy={copyCode}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}

      {/* Verify link */}
      <div className="mt-10 p-5 bg-[#f0f7ff] border border-blue-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900 text-sm">Need to verify someone&apos;s certificate?</p>
          <p className="text-gray-500 text-sm mt-0.5">
            Use our public verification tool to confirm the authenticity of any certificate.
          </p>
        </div>
        <Link
          href="/certificates/verify"
          className="shrink-0 bg-[#0d2233] hover:bg-[#1a3a5c] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          Verify a Certificate →
        </Link>
      </div>
    </main>
  );
}

/* ─── Certificate Card ──────────────────────────────────────── */
function CertificateCard({
  cert,
  copied,
  onCopy,
  formatDate,
}: {
  cert: Certificate;
  copied: string | null;
  onCopy: (code: string) => void;
  formatDate: (iso: string) => string;
}) {
  const isExpired = cert.expiresAt ? new Date(cert.expiresAt) < new Date() : false;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Left accent strip — certificate visual */}
        <div className="sm:w-48 bg-gradient-to-b from-[#0d2233] to-[#1a4a6e] flex flex-col items-center justify-center py-8 px-4 text-center shrink-0">
          <div className="w-14 h-14 rounded-full bg-[#c9a84c]/20 border-2 border-[#c9a84c] flex items-center justify-center mb-3">
            <svg className="w-7 h-7 text-[#c9a84c]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <p className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest">Certificate</p>
          <p className="text-white text-[10px] uppercase tracking-widest mt-0.5">of Completion</p>
        </div>

        {/* Right content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base leading-snug">
                {cert.courseTitle}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Issued {formatDate(cert.issuedAt)}
                {cert.expiresAt && (
                  <span className={`ml-2 ${isExpired ? 'text-red-500' : 'text-gray-400'}`}>
                    · {isExpired ? 'Expired' : 'Expires'} {formatDate(cert.expiresAt)}
                  </span>
                )}
              </p>
            </div>
            <span className={`badge shrink-0 ${isExpired ? 'badge-amber' : 'badge-green'}`}>
              {isExpired ? 'Expired' : 'Valid'}
            </span>
          </div>

          {/* Verification code */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 min-w-0">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <code className="text-xs text-gray-700 font-mono truncate">{cert.verificationCode}</code>
            </div>

            <div className="flex gap-2 shrink-0">
              {/* Copy code */}
              <button
                onClick={() => onCopy(cert.verificationCode)}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                title="Copy verification code"
              >
                {copied === cert.verificationCode ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              {/* Verify link */}
              <Link
                href={`/certificates/verify?code=${cert.verificationCode}`}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-[#0d2233] text-[#0d2233] hover:bg-[#0d2233] hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Verify
              </Link>

              {/* Download PDF — shown only if pdfUrl exists */}
              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[#0d2233] text-white hover:bg-[#1a3a5c] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
