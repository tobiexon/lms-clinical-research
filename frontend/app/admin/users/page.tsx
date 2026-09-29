'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  const load = (p = 1, s = '') =>
    adminApi.listUsers({ page: p, limit, search: s })
      .then((r) => { setUsers(r.data.users || r.data); setTotal(r.data.total || 0); })
      .finally(() => setLoading(false));

  useEffect(() => { load(1, search); }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    load(1, search);
  }

  async function handleRoleChange(id: string, role: string) {
    await adminApi.updateUserRole(id, role);
    load(page, search);
  }

  async function handleToggleActive(id: string) {
    await adminApi.toggleUserActive(id);
    load(page, search);
  }

  const ROLES = ['LEARNER', 'INSTRUCTOR', 'CONTENT_EDITOR', 'ADMIN'];

  if (loading) return <div className="text-gray-400">Loading users...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">{total} users total</p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-3 max-w-md">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button type="submit" className="btn-primary text-sm px-4">Search</button>
      </form>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left font-medium text-gray-600">User</th>
              <th className="px-5 py-3 text-left font-medium text-gray-600 hidden md:table-cell">Joined</th>
              <th className="px-5 py-3 text-left font-medium text-gray-600">Role</th>
              <th className="px-5 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-5 py-3 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-5 py-3">
                  <p className="font-medium text-gray-900">{u.firstName} {u.lastName}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </td>
                <td className="px-5 py-3 text-gray-500 hidden md:table-cell text-xs">
                  {new Date(u.createdAt).toLocaleDateString('en-GB')}
                </td>
                <td className="px-5 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {ROLES.map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                  </select>
                </td>
                <td className="px-5 py-3">
                  <span className={`badge text-xs ${u.isActive ? 'badge-green' : 'bg-gray-100 text-gray-500'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => handleToggleActive(u.id)}
                    className={`text-xs hover:underline ${u.isActive ? 'text-red-500' : 'text-green-600'}`}
                  >
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-12 text-center text-gray-400">No users found.</div>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => { setPage(page - 1); load(page - 1, search); }}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50">← Prev</button>
            <button disabled={page * limit >= total} onClick={() => { setPage(page + 1); load(page + 1, search); }}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-50">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
