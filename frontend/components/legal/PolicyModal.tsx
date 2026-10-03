'use client';

import { useEffect, useState, useCallback } from 'react';
import { legalApi } from '@/lib/api';

interface PolicyModalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

/**
 * Renders Privacy Policy or Terms of Service content fetched live from the
 * backend. Content is stored as Markdown-like text and rendered with basic
 * formatting (headings, paragraphs, bold).
 */
export default function PolicyModal({ type, onClose }: PolicyModalProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = type === 'privacy' ? legalApi.getPrivacyPolicy : legalApi.getTermsOfService;
    fetcher()
      .then(({ data }) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => {
        setTitle(type === 'privacy' ? 'Privacy Policy' : 'Terms of Service');
        setContent('Unable to load document. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [type]);

  // Close on Escape key
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  /** Very lightweight markdown-ish renderer — no external dependency needed */
  function renderContent(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-xl font-extrabold text-gray-900 mt-2 mb-3">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-base font-bold text-gray-900 mt-5 mb-1.5">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-sm font-semibold text-gray-800 mt-3 mb-1">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-sm text-gray-600 leading-relaxed ml-4 list-disc">
            {renderInline(line.slice(2))}
          </li>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-sm text-gray-600 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    });
  }

  function renderInline(text: string) {
    // Bold: **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-extrabold text-gray-900 text-lg">{title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Clinical Research Nexus · Exon Sciences Ltd</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-1">{renderContent(content)}</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0d2233] hover:bg-[#1a3a5c] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
