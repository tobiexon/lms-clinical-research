'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [form, setForm] = useState({ password: '', confirm: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('No reset token found. Please request a new password reset link.');
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await authApi.resetPassword(token, form.password);
      setStatus('success');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please request a new reset link.';
      setErrorMsg(Array.isArray(msg) ? msg.join(', ') : msg);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Password updated!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Your password has been changed. You can now sign in with your new password.
        </p>
        <Link href="/login" className="btn-primary inline-flex justify-center">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-8">
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
          {errorMsg}
          {status === 'error' && !token && (
            <div className="mt-2">
              <Link href="/forgot-password" className="font-medium underline">
                Request a new reset link →
              </Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New password
          </label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="At least 8 characters"
            disabled={status === 'loading' || !token}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm new password
          </label>
          <input
            type="password"
            required
            value={form.confirm}
            onChange={(e) => {
              setForm({ ...form, confirm: e.target.value });
              if (errorMsg === 'Passwords do not match') setErrorMsg('');
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Repeat your new password"
            disabled={status === 'loading' || !token}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || !token}
          className="btn-primary w-full justify-center"
        >
          {status === 'loading' ? 'Updating password...' : 'Set New Password'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        <Link href="/login" className="text-primary-700 hover:underline font-medium">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Set new password</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Choose a strong password for your account
          </p>
        </div>
        <Suspense fallback={<div className="card p-8 text-center text-gray-400">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
