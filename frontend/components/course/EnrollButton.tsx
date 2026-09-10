'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { enrollmentsApi } from '@/lib/api';
import Cookies from 'js-cookie';

interface Props {
  courseId: string;
  courseTitle: string;
}

export default function EnrollButton({ courseId, courseTitle }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleEnroll() {
    const token = Cookies.get('access_token');
    if (!token) {
      router.push(`/login?redirect=/courses`);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await enrollmentsApi.enroll(courseId);
      router.push(`/learn/${courseId}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || '';
      if (msg.toLowerCase().includes('already enrolled')) {
        router.push(`/learn/${courseId}`);
      } else {
        setError(msg || 'Enrolment failed. Please try again.');
        setLoading(false);
      }
    }
  }

  return (
    <div>
      {error && <p className="text-red-600 text-xs mb-2 text-center">{error}</p>}
      <button onClick={handleEnroll} disabled={loading} className="btn-primary w-full text-center">
        {loading ? 'Enrolling...' : 'Enrol Now — Free'}
      </button>
    </div>
  );
}
