'use client';

import { useState } from 'react';
import { contactApi } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await contactApi.submit(form);
      setSent(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to send message. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Contact Us</p>
          <h1 className="text-4xl font-extrabold mb-3">Get in Touch</h1>
          <p className="text-cyan-100 text-lg max-w-xl">
            Have a question about a course, your enrolment, or a certificate? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Contact details */}
          <div className="space-y-6">
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg uppercase mb-4">Contact Details</h2>
              {[
                { icon: '✉️', label: 'Email', value: 'support@clinicalresearchnexus.co.uk', href: 'mailto:support@clinicalresearchnexus.co.uk' },
                { icon: '🌐', label: 'Website', value: 'clinicalresearchnexus.co.uk', href: 'https://clinicalresearchnexus.co.uk' },
                { icon: '📍', label: 'Location', value: 'United Kingdom', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 mb-4">
                  <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-[#0d2233] hover:text-[#c9a84c] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-700">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0d2233] text-white rounded-xl p-5">
              <p className="font-bold mb-2">Response Time</p>
              <p className="text-cyan-200 text-sm leading-relaxed">
                We aim to respond to all enquiries within 1 business day (Monday–Friday, 9am–5pm GMT).
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent</h3>
                <p className="text-gray-500 text-sm">
                  Thank you for getting in touch. We&apos;ll get back to you within 1 business day.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-extrabold text-gray-900 text-lg uppercase mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                        placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                        placeholder="jane@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]">
                      <option value="">Select a subject</option>
                      <option>Course Enquiry</option>
                      <option>Enrolment & Access</option>
                      <option>Certificate & Verification</option>
                      <option>Payment & Billing</option>
                      <option>Technical Support</option>
                      <option>Partnership & Corporate Training</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none"
                      placeholder="How can we help you?" />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-[#c9a84c] hover:bg-[#b8973b] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors">
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                  {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
