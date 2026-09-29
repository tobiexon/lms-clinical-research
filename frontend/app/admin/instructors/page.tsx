'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api';

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: '', title: '', bio: '', photoUrl: '', linkedinUrl: '',
    credentials: '', isActive: true,
  });

  const load = () => adminApi.listInstructors().then((r) => setInstructors(r.data)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditId(null);
    setForm({ fullName: '', title: '', bio: '', photoUrl: '', linkedinUrl: '', credentials: '', isActive: true });
    setShowForm(true);
  }

  function openEdit(ins: any) {
    setEditId(ins.id);
    setForm({
      fullName: ins.fullName, title: ins.title, bio: ins.bio || '',
      photoUrl: ins.photoUrl || '', linkedinUrl: ins.linkedinUrl || '',
      credentials: (ins.credentials || []).join(', '), isActive: ins.isActive,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      credentials: form.credentials.split(',').map((c) => c.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await adminApi.updateInstructor(editId, payload);
      } else {
        await adminApi.createInstructor(payload);
      }
      setShowForm(false);
      load();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete instructor "${name}"?`)) return;
    await adminApi.deleteInstructor(id);
    load();
  }

  if (loading) return <div className="text-gray-400">Loading instructors...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
          <p className="text-gray-500 mt-1">{instructors.length} instructors total</p>
        </div>
        <button onClick={openNew} className="btn-primary">+ New Instructor</button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">{editId ? 'Edit Instructor' : 'New Instructor'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. Dr. Sarah Mitchell" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. Senior CRA, ACRP-CP" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Brief professional biography..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credentials (comma-separated)</label>
                <input value={form.credentials} onChange={(e) => setForm({ ...form, credentials: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="ACRP-CP, MSc Clinical Research, ICH GCP Certified" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://linkedin.com/in/..." />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
                Active
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-60">
                  {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create Instructor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {instructors.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-16 text-center text-gray-400">
          <p className="text-lg mb-2">No instructors yet</p>
          <button onClick={openNew} className="btn-primary mt-4">Add your first instructor</button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Instructor</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden md:table-cell">Title</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Credentials</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 text-right font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {instructors.map((ins) => (
                <tr key={ins.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {ins.photoUrl ? (
                        <img src={ins.photoUrl} alt={ins.fullName} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                          {ins.fullName.charAt(0)}
                        </div>
                      )}
                      <span className="font-medium text-gray-900">{ins.fullName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell text-xs">{ins.title}</td>
                  <td className="px-5 py-3 text-gray-500 hidden lg:table-cell text-xs">
                    {(ins.credentials || []).join(', ') || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge text-xs ${ins.isActive ? 'badge-green' : 'bg-gray-100 text-gray-500'}`}>
                      {ins.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(ins)} className="text-xs text-primary-700 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(ins.id, ins.fullName)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
