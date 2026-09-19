'use client';

/**
 * Magic Login Page — /auth/magic/[token]
 *
 * When a user clicks "Go To My Dashboard" / "Access My Courses Now"
 * in the payment confirmation email, they land here.
 *
 * Flow:
 * 1. Extract token from URL
 * 2. Call GET /api/v1/auth/magic/:token
 * 3. Backend validates token (single-use, 48hr expiry), returns JWT tokens
 * 4. Store tokens in cookies → user is logged in
 * 5. Redirect to /dashboard — no login prompt shown
 */

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function MagicLoginPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMsg('Invalid link — no token found.');
      setStatus('error');
      return;
    }

    async function login() {
      try {
        const res = await fetch(`${API}/api/v1/auth/magic/${token}`);
        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data?.message || 'This link is invalid or has already been used.');
          setStatus('error');
          return;
        }

        // Store tokens — user is now fully logged in
        const secure = window.location.protocol === 'https:';
        Cookies.set('access_token', data.accessToken, { secure, sameSite: 'strict', expires: 1 });
        Cookies.set('refresh_token', data.refreshToken, { secure, sameSite: 'strict', expires: 7 });
        sessionStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);

        // Go straight to dashboard — no login page
        router.replace('/dashboard');
      } catch {
        setErrorMsg('Connection failed. Please try logging in with your email and password.');
        setStatus('error');
      }
    }

    login();
  }, [token, router]);

  // ── Loading screen ──────────────────────────────────────
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-[#0d2233] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <svg className="animate-spin" width="56" height="56" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#67e8f9" strokeWidth="3"/>
              <path className="opacity-75" fill="#67e8f9"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold mb-2">Logging you in...</h1>
          <p className="text-cyan-300 text-sm">Taking you straight to your courses</p>
        </div>
      </main>
    );
  }

  // ── Error screen ────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Link Expired or Already Used</h1>
        <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>
        <div className="space-y-3">
          <a href="/login"
            className="block w-full bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold py-3 rounded-lg text-sm transition-colors uppercase tracking-wide">
            Log In to My Account
          </a>
          <a href="/courses"
            className="block w-full border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-lg text-sm transition-colors">
            Browse Courses
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-5">
          Login links work once and expire after 48 hours.
          <br />Need help?{' '}
          <a href="mailto:support@clinicalresearchnexus.com" className="text-[#c9a84c] underline">
            Contact support
          </a>
        </p>
      </div>
    </main>
  );
}
