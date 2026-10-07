'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { adminApi, usersApi } from '@/lib/api';

export default function PayoutSettingsPage() {
  const router = useRouter();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    beneficiaryName: '',
    stripeBankName: '',
    stripeBankAccountLast4: '',
    stripeAccountId: '',
    payoutSchedule: 'automatic',
    payoutIntervalDays: 7,
    currency: 'GBP',
    notes: '',
  });

  // ── Guard: SUPER_ADMIN only ───────────────────────────
  useEffect(() => {
    async function check() {
      const token = Cookies.get('access_token');
      if (!token) { router.push('/login?redirect=/admin/payments/payout-settings'); return; }
      try {
        const { data } = await usersApi.getMe();
        if (data.role !== 'SUPER_ADMIN') {
          router.push('/admin/payments');
          return;
        }
        setIsSuperAdmin(true);
      } catch { router.push('/login'); }
      finally { setChecking(false); }
    }
    check();
  }, [router]);

  // ── Load settings once access is confirmed ────────────
  useEffect(() => {
    if (!isSuperAdmin) return;
    async function load() {
      try {
        const [sRes, aRes] = await Promise.all([
          adminApi.getPayoutSettings(),
          adminApi.getPayoutAuditLog(),
        ]);
        setSettings(sRes.data);
        setAuditLog(aRes.data);
        setForm({
          beneficiaryName:        sRes.data.beneficiaryName        ?? '',
          stripeBankName:         sRes.data.stripeBankName         ?? '',
          stripeBankAccountLast4: sRes.data.stripeBankAccountLast4 ?? '',
          stripeAccountId:        sRes.data.stripeAccountId        ?? '',
          payoutSchedule:         sRes.data.payoutSchedule         ?? 'automatic',
          payoutIntervalDays:     sRes.data.payoutIntervalDays     ?? 7,
          currency:               sRes.data.currency               ?? 'GBP',
          notes:                  sRes.data.notes                  ?? '',
        });
      } finally { setLoading(false); }
    }
    load();
  }, [isSuperAdmin]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await adminApi.updatePayoutSettings(form);
      setSaved(true);
      // Reload audit log
      const aRes = await adminApi.getPayoutAuditLog();
      setAuditLog(aRes.data);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (checking || loading) {
    return <div className="text-gray-400 py-8">Loading...</div>;
  }
  if (!isSuperAdmin) return null;

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => router.push('/admin/payments')}
          className="text-sm text-gray-400 hover:text-gray-600">← Back to Payments</button>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Payout Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Record the bank account and payout schedule linked to your Stripe account.
        <strong className="text-gray-700"> Changes here are for reference and audit only</strong> —
        the actual Stripe payout destination is configured in your
        <a href="https://dashboard.stripe.com/settings/payouts" target="_blank" rel="noopener noreferrer"
          className="text-primary-600 hover:underline ml-1">Stripe Dashboard → Payouts</a>.
      </p>

      {/* Security notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-xl">🔒</span>
        <div className="text-sm text-amber-800">
          <strong>Super Admin access only.</strong> All changes are logged with your admin email, timestamp, and IP address.
          Never enter full bank account or sort code numbers — store only the last 4 digits for identification.
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Name</label>
          <input
            type="text"
            value={form.beneficiaryName}
            onChange={e => setForm(f => ({ ...f, beneficiaryName: e.target.value }))}
            placeholder="e.g. Clinical Research Nexus Ltd"
            className="input-field"
          />
          <p className="text-xs text-gray-400 mt-1">The registered business name that owns the bank account.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
            <input
              type="text"
              value={form.stripeBankName}
              onChange={e => setForm(f => ({ ...f, stripeBankName: e.target.value }))}
              placeholder="e.g. Barclays Business"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Last 4 Digits</label>
            <input
              type="text"
              value={form.stripeBankAccountLast4}
              onChange={e => setForm(f => ({ ...f, stripeBankAccountLast4: e.target.value.slice(0, 4) }))}
              placeholder="e.g. 4321"
              maxLength={4}
              className="input-field font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">Last 4 digits only — never full account number.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Account ID</label>
          <input
            type="text"
            value={form.stripeAccountId}
            onChange={e => setForm(f => ({ ...f, stripeAccountId: e.target.value }))}
            placeholder="e.g. acct_1ABC…  (from Stripe Dashboard)"
            className="input-field font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            Found in your{' '}
            <a href="https://dashboard.stripe.com/settings/account" target="_blank" rel="noopener noreferrer"
              className="text-primary-600 hover:underline">Stripe Account Settings</a>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payout Schedule</label>
            <select
              value={form.payoutSchedule}
              onChange={e => setForm(f => ({ ...f, payoutSchedule: e.target.value }))}
              className="input-field"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payout Interval (days)</label>
            <input
              type="number"
              min={1}
              value={form.payoutIntervalDays}
              onChange={e => setForm(f => ({ ...f, payoutIntervalDays: parseInt(e.target.value) || 7 }))}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <input
            type="text"
            value={form.currency}
            onChange={e => setForm(f => ({ ...f, currency: e.target.value.toUpperCase() }))}
            maxLength={3}
            className="input-field w-24 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Optional internal notes about this payout configuration"
            className="input-field resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
        )}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
            ✅ Settings saved and change logged.
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">
            {settings?.updatedAt
              ? `Last updated ${new Date(settings.updatedAt).toLocaleString('en-GB')} by ${settings.updatedByAdminEmail}`
              : 'Not yet configured.'}
          </p>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Audit log */}
      {auditLog.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Change Audit Log</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Date / Time</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Admin</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Field</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Old Value</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">New Value</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {auditLog.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('en-GB')}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{log.adminEmail}</td>
                    <td className="px-4 py-2 font-mono text-gray-600">{log.fieldChanged}</td>
                    <td className="px-4 py-2 text-gray-400">{log.oldValue || '—'}</td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{log.newValue || '—'}</td>
                    <td className="px-4 py-2 text-gray-400 font-mono">{log.ipAddress || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
