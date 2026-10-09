'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { certificatesApi } from '@/lib/api';

interface VerifyResult {
  valid: boolean;
  learnerName: string;
  courseTitle: string;
  issuedAt: string;
  verificationCode: string;
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(searchParams.get('code') ?? '');
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-verify if code comes in via query param
  useEffect(() => {
    const paramCode = searchParams.get('code');
    if (paramCode) {
      setCode(paramCode);
      handleVerify(paramCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleVerify(verifyCode?: string) {
    const target = (verifyCode ?? code).trim();
    if (!target) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await certificatesApi.verify(target);
      setResult(res.data);
    } catch (err: any) {
      const msg =
        err?.response?.status === 404
          ? 'No certificate found for this code. Please check and try again.'
          : 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#0d2233] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Verify a Certificate</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Enter a verification code to confirm the authenticity of a Clinical Research Nexus certificate.
        </p>
      </div>

      {/* Input form */}
      <div className="card p-6 mb-6">
        <label htmlFor="verify-code" className="block text-sm font-semibold text-gray-700 mb-2">
          Verification Code
        </label>
        <div className="flex gap-3">
          <input
            id="verify-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            placeholder="e.g. cm3x7k9p2000008l5abc…"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0d2233] focus:border-transparent"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={() => handleVerify()}
            disabled={loading || !code.trim()}
            className="bg-[#0d2233] hover:bg-[#1a3a5c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking…
              </span>
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="card p-6 border-red-200 bg-red-50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-red-700">Certificate Not Found</p>
              <p className="text-red-600 text-sm mt-0.5">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success state */}
      {result && (
        <div className="card overflow-hidden">
          {/* Top success banner */}
          <div className="bg-green-600 px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold">Verified Certificate</p>
              <p className="text-green-100 text-xs">This certificate is authentic and was issued by Clinical Research Nexus</p>
            </div>
          </div>

          {/* Certificate details */}
          <div className="p-6">
            {/* Visual certificate block */}
            <div className="bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] rounded-xl p-6 text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#c9a84c]/20 border-2 border-[#c9a84c] flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                Certificate of Completion
              </p>
              <p className="text-white text-xl font-bold mb-1">{result.learnerName}</p>
              <p className="text-cyan-300 text-sm">has successfully completed</p>
              <p className="text-white font-semibold text-base mt-2 px-4">{result.courseTitle}</p>
            </div>

            {/* Details grid */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Learner</dt>
                <dd className="text-gray-900 font-semibold">{result.learnerName}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Issue Date</dt>
                <dd className="text-gray-900 font-semibold">{formatDate(result.issuedAt)}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                <dt className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Course</dt>
                <dd className="text-gray-900 font-semibold">{result.courseTitle}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                <dt className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Verification Code</dt>
                <dd className="text-gray-600 font-mono text-sm">{result.verificationCode}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link href="/certificates" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          ← View My Certificates
        </Link>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0d2233] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
