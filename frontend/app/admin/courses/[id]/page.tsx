'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '@/lib/api';

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    title: '', slug: '', subtitle: '', difficultyLevel: 'BEGINNER',
    durationHours: '', language: 'en-GB', accreditation: '',
    categoryId: '', instructorIds: [] as string[],
    learningObjectives: '', prerequisites: '', tags: '',
    isFeatured: false, isPublished: false,
    seoTitle: '', seoDescription: '', price: '', originalPrice: '',
  });

  useEffect(() => {
    Promise.all([
      adminApi.getCourse(id),
      adminApi.listCategories(),
      adminApi.listInstructors(),
    ]).then(([course, cats, insts]) => {
      const c = course.data;
      setCategories(cats.data);
      setInstructors(insts.data);
      setForm({
        title: c.title || '',
        slug: c.slug || '',
        subtitle: c.subtitle || '',
        difficultyLevel: c.difficultyLevel || 'BEGINNER',
        durationHours: c.durationHours?.toString() || '',
        language: c.language || 'en-GB',
        accreditation: c.accreditation || '',
        categoryId: c.categoryId || '',
        instructorIds: (c.instructors || []).map((i: any) => i.instructorId || i.id),
        learningObjectives: (c.learningObjectives || []).join('\n'),
        prerequisites: (c.prerequisites || []).join('\n'),
        tags: (c.tags || []).join(', '),
        isFeatured: c.isFeatured || false,
        isPublished: c.isPublished || false,
        seoTitle: c.seoTitle || '',
        seoDescription: c.seoDescription || '',
        price: c.price?.toString() || '',
        originalPrice: c.originalPrice?.toString() || '',
      });
    }).catch(() => setError('Failed to load course'))
      .finally(() => setLoading(false));
  }, [id]);

  function toggleInstructor(instId: string) {
    setForm((f) => ({
      ...f,
      instructorIds: f.instructorIds.includes(instId)
        ? f.instructorIds.filter((i) => i !== instId)
        : [...f.instructorIds, instId],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...form,
        durationHours: parseFloat(form.durationHours) || 0,
        price: form.price ? parseFloat(form.price) : undefined,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
        learningObjectives: form.learningObjectives.split('\n').map((s) => s.trim()).filter(Boolean),
        prerequisites: form.prerequisites.split('\n').map((s) => s.trim()).filter(Boolean),
        tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await adminApi.updateCourse(id, payload);
      setSuccess('Course saved successfully.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save course');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-gray-400">Loading course...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/courses/${id}/lessons`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.867v6.266a1 1 0 01-1.447.902L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Manage Lessons &amp; Videos
          </Link>
          <button onClick={() => router.push('/admin/courses')} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to courses
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-500 border-r border-gray-300">/courses/</span>
              <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="flex-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select value={form.difficultyLevel} onChange={(e) => setForm((f) => ({ ...f, difficultyLevel: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
              <input type="number" min="0" step="0.5" value={form.durationHours}
                onChange={(e) => setForm((f) => ({ ...f, durationHours: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select value={form.language} onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="en-GB">English (UK)</option>
                <option value="en-US">English (US)</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accreditation</label>
            <input value={form.accreditation} onChange={(e) => setForm((f) => ({ ...f, accreditation: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Pricing (GBP)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
              <input type="number" min="0" step="0.01" value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="100.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (£) <span className="text-gray-400 font-normal">optional</span></label>
              <input type="number" min="0" step="0.01" value={form.originalPrice}
                onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="150.00" />
            </div>
          </div>
        </div>

        {/* Instructors */}
        {instructors.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Instructors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {instructors.map((inst) => (
                <label key={inst.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" checked={form.instructorIds.includes(inst.id)} onChange={() => toggleInstructor(inst.id)} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inst.fullName}</p>
                    <p className="text-xs text-gray-500">{inst.title}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Content Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives <span className="text-gray-400 font-normal">(one per line)</span></label>
            <textarea rows={5} value={form.learningObjectives} onChange={(e) => setForm((f) => ({ ...f, learningObjectives: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites <span className="text-gray-400 font-normal">(one per line)</span></label>
            <textarea rows={3} value={form.prerequisites} onChange={(e) => setForm((f) => ({ ...f, prerequisites: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">SEO</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
            <input value={form.seoTitle} onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
            <textarea rows={2} value={form.seoDescription} onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Visibility</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} />
              <div>
                <p className="text-sm font-medium text-gray-900">Featured on Homepage</p>
                <p className="text-xs text-gray-500">Show this course in the featured section</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))} />
              <div>
                <p className="text-sm font-medium text-gray-900">Published</p>
                <p className="text-xs text-gray-500">Make this course visible to learners</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-8">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.push('/admin/courses')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}
