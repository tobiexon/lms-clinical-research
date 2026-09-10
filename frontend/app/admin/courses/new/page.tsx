'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';

export default function NewCoursePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '', slug: '', subtitle: '', difficultyLevel: 'BEGINNER',
    durationHours: '', language: 'en-GB', accreditation: '',
    categoryId: '', instructorIds: [] as string[],
    learningObjectives: '', prerequisites: '', tags: '',
    isFeatured: false, isPublished: false,
    seoTitle: '', seoDescription: '',
  });

  useEffect(() => {
    Promise.all([adminApi.listCategories(), adminApi.listInstructors()]).then(([c, i]) => {
      setCategories(c.data);
      setInstructors(i.data);
    });
  }, []);

  // Auto-generate slug from title
  function handleTitleChange(title: string) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm((f) => ({ ...f, title, slug }));
  }

  function toggleInstructor(id: string) {
    setForm((f) => ({
      ...f,
      instructorIds: f.instructorIds.includes(id)
        ? f.instructorIds.filter((i) => i !== id)
        : [...f.instructorIds, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        durationHours: parseFloat(form.durationHours) || 0,
        learningObjectives: form.learningObjectives.split('\n').map((s) => s.trim()).filter(Boolean),
        prerequisites: form.prerequisites.split('\n').map((s) => s.trim()).filter(Boolean),
        tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      };
      const { data } = await adminApi.createCourse(payload);
      router.push(`/admin/courses/${data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create course');
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Course</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
            <input required value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. ICH GCP E6(R3) Fundamentals for UK Clinical Research" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-500 border-r border-gray-300">/courses/</span>
              <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="flex-1 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="ich-gcp-e6-fundamentals" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="A short tagline for the course" />
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="4.5" />
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. ACRP Approved | ICH GCP E6(R3) Aligned" />
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Explain the 13 principles of ICH GCP E6(R3)&#10;Identify responsibilities of sponsors and investigators&#10;Apply GCP principles to UK trial scenarios" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites <span className="text-gray-400 font-normal">(one per line)</span></label>
            <textarea rows={3} value={form.prerequisites} onChange={(e) => setForm((f) => ({ ...f, prerequisites: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Basic understanding of clinical trials&#10;No prior GCP certification required" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="gcp, ich, clinical-trials, uk-research, mhra" />
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
                <p className="text-sm font-medium text-gray-900">Publish immediately</p>
                <p className="text-xs text-gray-500">Make this course visible to learners right away</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-8">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Creating...' : 'Create Course'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
          <p className="text-xs text-gray-400">You can add modules and lessons after saving.</p>
        </div>
      </form>
    </div>
  );
}
