'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '', slug: '', description: '', awardTitle: '',
    durationWeeks: '', accreditationBody: '', isFeatured: false, isPublished: false,
  });

  const load = () =>
    Promise.all([adminApi.listPrograms(), adminApi.listCourses()])
      .then(([p, c]) => { setPrograms(p.data); setCourses(c.data); })
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditId(null);
    setForm({ title: '', slug: '', description: '', awardTitle: '', durationWeeks: '', accreditationBody: '', isFeatured: false, isPublished: false });
    setShowForm(true);
  }

  function openEdit(p: any) {
    setEditId(p.id);
    setForm({
      title: p.title, slug: p.slug, description: p.description || '',
      awardTitle: p.awardTitle || '', durationWeeks: p.durationWeeks?.toString() || '',
      accreditationBody: p.accreditationBody || '', isFeatured: p.isFeatured, isPublished: p.isPublished,
    });
    setShowForm(true);
  }

  // Auto-generate slug from title
  function handleTitle(val: string) {
    setForm((f) => ({
      ...f, title: val,
      slug: f.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, durationWeeks: form.durationWeeks ? parseInt(form.durationWeeks) : undefined };
    try {
      if (editId) {
        await adminApi.updateProgram(editId, payload);
      } else {
        await adminApi.createProgram(payload);
      }
      setShowForm(false);
      load();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await adminApi.deleteProgram(id);
    load();
  }

  async function handleTogglePublish(id: string) {
    await adminApi.toggleProgramPublish(id);
    load();
  }

  if (loading) return <div className="text-gray-400">Loading programmes...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programmes</h1>
          <p className="text-gray-500 mt-1">{programs.length} programmes total</p>
        </div>
        <button onClick={openNew} className="btn-primary">+ New Programme</button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">{editId ? 'Edit Programme' : 'New Programme'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input required value={form.title} onChange={(e) => handleTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. Pharmacovigilance Certificate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. pharmacovigilance-certificate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
                <input value={form.awardTitle} onChange={(e) => setForm({ ...form, awardTitle: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. Certificate in Pharmacovigilance" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
                  <input type="number" value={form.durationWeeks} onChange={(e) => setForm({ ...form, durationWeeks: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="8" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accreditation Body</label>
                  <input value={form.accreditationBody} onChange={(e) => setForm({ ...form, accreditationBody: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g. ACRP" />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="rounded" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="rounded" />
                  Published
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-60">
                  {saving ? 'Saving...' : editId ? 'Save Changes' : 'Create Programme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {programs.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-16 text-center text-gray-400">
          <p className="text-lg mb-2">No programmes yet</p>
          <button onClick={openNew} className="btn-primary mt-4">Create your first programme</button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Programme</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden md:table-cell">Award</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Duration</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Courses</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 text-right font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{p.title}</p>
                    <p className="text-xs text-gray-400">{p.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell text-xs">{p.awardTitle || '—'}</td>
                  <td className="px-5 py-3 text-gray-600 hidden lg:table-cell">{p.durationWeeks ? `${p.durationWeeks}w` : '—'}</td>
                  <td className="px-5 py-3 text-gray-600 hidden lg:table-cell">{p.courses?.length || 0}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => handleTogglePublish(p.id)}
                      className={`badge text-xs cursor-pointer ${p.isPublished ? 'badge-green' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="text-xs text-primary-700 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(p.id, p.title)} className="text-xs text-red-500 hover:underline">Delete</button>
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
