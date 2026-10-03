'use client';

import { useEffect, useState } from 'react';
import { legalApi } from '@/lib/api';

type DocType = 'privacy' | 'terms';

interface Doc {
  title: string;
  content: string;
  updatedAt?: string;
}

export default function AdminLegalPage() {
  const [active, setActive] = useState<DocType>('privacy');
  const [docs, setDocs] = useState<Record<DocType, Doc>>({
    privacy: { title: '', content: '' },
    terms:   { title: '', content: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Load both documents on mount
  useEffect(() => {
    Promise.all([legalApi.getPrivacyPolicy(), legalApi.getTermsOfService()])
      .then(([pp, tos]) => {
        setDocs({
          privacy: { title: pp.data.title, content: pp.data.content, updatedAt: pp.data.updatedAt },
          terms:   { title: tos.data.title, content: tos.data.content, updatedAt: tos.data.updatedAt },
        });
      })
      .catch(() => setError('Failed to load documents'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const doc = docs[active];
      if (active === 'privacy') {
        await legalApi.updatePrivacyPolicy({ title: doc.title, content: doc.content });
      } else {
        await legalApi.updateTermsOfService({ title: doc.title, content: doc.content });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function updateField(field: keyof Doc, value: string) {
    setDocs((prev) => ({ ...prev, [active]: { ...prev[active], [field]: value } }));
  }

  const doc = docs[active];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Legal Documents</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Edit Privacy Policy and Terms of Service shown to users on the registration page.
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        {([['privacy', '🔒 Privacy Policy'], ['terms', '📋 Terms of Service']] as [DocType, string][]).map(
          ([key, label]) => (
            <button
              key={key}
              onClick={() => { setActive(key); setSaved(false); setError(''); }}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                active === key
                  ? 'bg-[#0d2233] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ),
        )}
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm mt-3">Loading document...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">

          {/* errors and success are shown inline next to the save button */}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
            <input
              value={doc.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              placeholder="e.g. Privacy Policy"
            />
          </div>

          {/* Content editor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <span className="text-xs text-gray-400">
                Supports Markdown: # Heading, ## Section, **bold**, - list item
              </span>
            </div>
            <textarea
              value={doc.content}
              onChange={(e) => updateField('content', e.target.value)}
              rows={28}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-y"
              placeholder="Enter document content using Markdown..."
            />
          </div>

          {/* Last updated */}
          {doc.updatedAt && (
            <p className="text-xs text-gray-400">
              Last updated: {new Date(doc.updatedAt).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
              })}
            </p>
          )}

          {/* Formatting help */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-600 mb-2">Formatting guide</p>
            <p><code className="bg-white px-1 rounded"># Title</code> → Large heading</p>
            <p><code className="bg-white px-1 rounded">## Section</code> → Section heading</p>
            <p><code className="bg-white px-1 rounded">**bold text**</code> → <strong>Bold text</strong></p>
            <p><code className="bg-white px-1 rounded">- item</code> → Bullet point</p>
            <p>Blank line → Paragraph spacing</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#c9a84c] hover:bg-[#b8973b] disabled:opacity-60 text-white font-bold px-8 py-2.5 rounded-lg text-sm transition-colors"
            >
              {saving ? 'Saving...' : 'Save Document'}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Changes saved
              </span>
            )}
            {error && (
              <span className="text-sm text-red-600 font-medium">{error}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
