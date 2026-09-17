'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { paymentsApi } from '@/lib/api';
import Cookies from 'js-cookie';

export default function CheckoutPage() {
  const { items, removeItem, total, clearCart } = useCartStore();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Format card number with spaces
  function formatCard(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  // Format MM/YY
  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);

    // Check login first
    const token = Cookies.get('access_token');
    if (!token) {
      // Redirect to login, then back to checkout after
      router.push('/login?redirect=/checkout');
      setProcessing(false);
      return;
    }

    try {
      // Extract last 4 digits of card for receipt
      const cardLast4 = form.cardNumber.replace(/\s/g, '').slice(-4);
      const cardBrand = getCardBrand(form.cardNumber);

      // Call NestJS payments endpoint
      await paymentsApi.processPayment({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        cardLast4,
        cardBrand,
        items: items.map((item) => ({
          courseId: item.courseId,
          courseTitle: item.title,
          courseSlug: item.slug,
          courseCategory: item.category,
          unitPrice: item.price,
        })),
      });

      // Success — clear cart and show confirmation
      clearCart();
      setStep('success');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Payment failed. Please try again.';
      alert(msg);
    } finally {
      setProcessing(false);
    }
  }

  // Detect card brand from first digit
  function getCardBrand(cardNumber: string): string {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
    if (num.startsWith('3')) return 'Amex';
    return 'Card';
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add a course to get started.</p>
          <Link href="/courses" className="bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-8 py-3 rounded-lg inline-block transition-colors">
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  if (step === 'success') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Enrolment Confirmed!</h1>
          <p className="text-gray-500 mb-6">
            You now have access to your course. A confirmation email has been sent.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard"
              className="block w-full bg-[#0d2233] hover:bg-[#1a3a5c] text-white font-bold py-3 rounded-lg transition-colors">
              Go to My Dashboard
            </Link>
            <Link href="/courses"
              className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors">
              Browse More Courses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/courses" className="text-sm text-[#c9a84c] hover:underline">← Back to courses</Link>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: payment form ── */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePay} className="space-y-6">

              {/* Contact details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required name="firstName" value={form.firstName} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                      placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required name="lastName" value={form.lastName} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                      placeholder="Smith" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                    placeholder="john@example.com" />
                  <p className="text-xs text-gray-400 mt-1">Your receipt and access details will be sent here</p>
                </div>
              </div>

              {/* Payment details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900 text-lg">Payment Details</h2>
                  <div className="flex gap-2 text-gray-400">
                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold">VISA</span>
                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold">MC</span>
                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold">AMEX</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input required name="nameOnCard" value={form.nameOnCard} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input required name="cardNumber"
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: formatCard(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] font-mono tracking-wider"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input required name="expiry"
                        value={form.expiry}
                        onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                        placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input required name="cvv" value={form.cvv}
                        onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                        placeholder="123" maxLength={4} type="password" />
                    </div>
                  </div>
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Your payment is secured with 256-bit SSL encryption. We never store your card details.
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={processing}
                className="w-full bg-[#c9a84c] hover:bg-[#b8973b] disabled:opacity-60 text-white font-extrabold py-4 rounded-xl text-base uppercase tracking-wide transition-colors shadow-lg">
                {processing
                  ? 'Processing Payment...'
                  : `Pay £${total().toFixed(2)} — Enrol Now`
                }
              </button>

              <p className="text-xs text-center text-gray-400">
                By completing your purchase you agree to our{' '}
                <Link href="/terms" className="underline hover:text-gray-600">Terms & Conditions</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                5-day money-back guarantee.
              </p>
            </form>
          </div>

          {/* ── Right: order summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-6 overflow-hidden">
              <div className="bg-[#0d2233] px-5 py-4">
                <h2 className="text-white font-bold">Order Summary</h2>
                <p className="text-cyan-400 text-xs mt-0.5">{items.length} course{items.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.courseId} className="p-4 flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#0d2233] to-[#1a4a6e] shrink-0 flex items-center justify-center">
                      <span className="text-cyan-400 text-xs font-extrabold">CR</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
                      {item.category && <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>}
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-sm font-extrabold text-[#0d2233]">£{item.price.toFixed(2)}</span>
                        <button onClick={() => removeItem(item.courseId)}
                          className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>£{total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (0%)</span>
                  <span>£0.00</span>
                </div>
                <div className="flex justify-between font-extrabold text-gray-900 text-base pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#0d2233]">£{total().toFixed(2)}</span>
                </div>
              </div>

              {/* What's included */}
              <div className="p-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Included with every course</p>
                {['Lifetime access', 'Certificate of completion', 'Downloadable resources', '5-day money-back guarantee'].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1">
                    <span className="text-green-500 text-xs">✓</span>
                    <span className="text-xs text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
