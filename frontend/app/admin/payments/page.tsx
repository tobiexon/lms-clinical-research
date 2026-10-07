'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 30;

  async function load(p = 1) {
    setLoading(true);
    try {
      const [payRes, statsRes] = await Promise.all([
        adminApi.getPayments(p, LIMIT),
        adminApi.getPaymentStats(),
      ]);
      setPayments(payRes.data.payments);
      setTotal(payRes.data.total);
      setStats(statsRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(page); }, [page]);

  async function refund(id: string) {
    const reason = prompt('Reason for refund (optional):') ?? '';
    if (!confirm('Mark this payment as refunded? This does NOT automatically issue a Stripe refund — do that in your Stripe Dashboard first.')) return;
    await adminApi.refundPayment(id, reason);
    load(page);
  }

  const fmt = (n: any) =>
    typeof n === 'number' || typeof n === 'string'
      ? `£${parseFloat(String(n)).toFixed(2)}`
      : '—';

  const badge = (status: string) => {
    const map: Record<string, string> = {
      PAID:     'bg-green-100 text-green-700',
      PENDING:  'bg-yellow-100 text-yellow-700',
      REFUNDED: 'bg-orange-100 text-orange-700',
      FAILED:   'bg-red-100 text-red-700',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1">{total} transactions total</p>
        </div>
        <Link href="/admin/payments/payout-settings"
          className="btn-primary text-sm flex items-center gap-2">
          🏦 Payout Settings
        </Link>
      </div>

      {/* Revenue stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: fmt(stats.totalRevenue), icon: '💰', color: 'bg-green-50 text-green-700' },
            { label: 'Paid', value: stats.paidCount, icon: '✅', color: 'bg-blue-50 text-blue-700' },
            { label: 'Pending', value: stats.pendingCount, icon: '⏳', color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Refunded', value: stats.refundedCount, icon: '↩️', color: 'bg-orange-50 text-orange-700' },
          ].map((card) => (
            <div key={card.label} className={`rounded-xl p-4 ${card.color}`}>
              <div className="text-xl mb-1">{card.icon}</div>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-xs font-medium mt-1 opacity-80">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-gray-400 py-8">Loading payments...</div>
      ) : payments.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-400">
          No payments yet.
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Learner</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600 hidden md:table-cell">Courses</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Method</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Ref</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString('en-GB')}
                      <div className="text-xs text-gray-400">
                        {new Date(p.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{p.firstName} {p.lastName}</div>
                      <div className="text-xs text-gray-400">{p.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {p.items?.map((item: any) => (
                        <div key={item.id} className="text-xs text-gray-600 truncate max-w-xs">{item.courseTitle}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                      {fmt(p.totalAmount)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                      {p.method}
                      {p.cardBrand && <span className="ml-1 text-xs text-gray-400">({p.cardBrand} ••{p.cardLast4})</span>}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-gray-400 font-mono truncate max-w-[120px] block">
                        {p.gatewayReference ? p.gatewayReference.slice(0, 20) + '…' : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${badge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.status === 'PAID' && (
                        <button
                          onClick={() => refund(p.id)}
                          className="text-xs text-orange-500 hover:underline"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span>Page {page} of {totalPages} ({total} records)</span>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-50">← Prev</button>
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-50">Next →</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
