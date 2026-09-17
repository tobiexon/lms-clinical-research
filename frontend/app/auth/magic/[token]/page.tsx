'use client';

/**
 * Magic Login Page — /auth/magic/[token]
 * 
 * When a user clicks "Go To My Dashboard" in the payment confirmation email,
 * they land here. This page:
 * 1. Calls the backend with the one-time token
 * 2. Receives JWT tokens back
 * 3. Stores them (logs the user in automatically)
 * 4. Redirects to /dashboard — no login prompt ever shown
 */

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function MagicLoginPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMsg('Invalid link — no token found.');
      setStatus('error');
      return;
    }

    async function exchangeToken() {
      try {
        const res = await fetch(`${API}/api/v1/auth/magic/${token}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data?.message || 'This link is invalid or has expired.');
          setStatus('error');
          return;
        }

        // Store JWT tokens — user is now logged in
        Cookies.set('access_token', data.accessToken, {
          secure: location.protocol === 'https:',
          sameSite: 'strict',
          expires: 1, // 1 day
        });
        Cookies.set('refresh_token', data.refreshToken, {
          secure: location.protocol === 'https:',
          sameSite: 'strict',
          expires: 7,
        });
        sessionStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);

        // Redirect straight to dashboard — no login page shown
        router.replace('/dashboard');
      } catch {
        setErrorMsg('Connection failed. Please try logging in normally.');
        setStatus('error');
      }
    }

    exchangeToken();
  }, [token, router]);

  // ── Loading state — shown for ~500ms while tokens are exchanged ──
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-[#0d2233] flex items-center justify-center px-4">
        <div className="text-center">
          {/* Animated atomic star */}
          <div className="flex justify-center mb-6">
            <svg
              className="animate-pulse"
              width="80" height="80" viewBox="0 0 100 100" fill="none"
            >
              <ellipse cx="50" cy="62" rx="42" ry="10" fill="none" stroke="#67e8f9" strokeWidth="2" opacity="0.4"/>
              {[0,22.5,45,67.5,90,112.5,135,157.5].map((a, i) => (
                <ellipse key={i} cx="50" cy="50" rx="5" ry="28" fill="#67e8f9"
                  opacity={i % 2 === 0 ? 0.7 : 0.4} transform={`rotate(${a} 50 50)`}/>
              ))}
              <circle cx="50" cy="50" r="4" fill="#67e8f9" opacity="0.9"/>
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold mb-2">Logging you in...</h1>
          <p className="text-cyan-300 text-sm">Taking you straight to your courses</p>
          {/* Animated dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {[0,1,2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── Error state ──
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">Link Expired or Already Used</h1>
        <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>

        <div className="space-y-3">
          <a href="/login"
            className="block w-full bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold py-3 rounded-lg text-sm transition-colors uppercase tracking-wide">
            Log In Normally
          </a>
          <a href="/courses"
            className="block w-full border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-lg text-sm transition-colors">
            Browse Courses
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Login links expire after 48 hours and can only be used once.
          <br />Need help? <a href="mailto:support@clinicalresearchnexus.com"
            className="text-[#c9a84c] underline">Contact support</a>
        </p>
      </div>
    </main>
  );
}
