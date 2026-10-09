'use client';

import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface Props {
  lessonId: string;
  lessonTitle: string;
  courseSlug?: string;
  onClose?: () => void;
}

// ── Blue question-mark icon matching the uploaded design ─────────────────────
function TutorIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <circle cx="50" cy="50" r="50" fill="#29ABE2" />
      <text
        x="50"
        y="73"
        textAnchor="middle"
        fontSize="68"
        fontWeight="bold"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="white"
      >
        ?
      </text>
    </svg>
  );
}

const QUICK_QUESTIONS = [
  'Summarise this lesson for me',
  'What are the key points?',
  'Give me an example',
  'How does this relate to real clinical trials?',
  'What should I remember for the quiz?',
];

export default function AiTutorPanel({ lessonId, lessonTitle, courseSlug, onClose }: Props) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setQuestion('');
    setLoading(true);
    setError('');

    try {
      const token = Cookies.get('access_token');
      const res = await fetch(`${API}/api/v1/tutor/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ lessonId, question: q, courseSlug }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = Array.isArray(data?.message) ? data.message[0] : (data?.message ?? `Error ${res.status}`);
        throw new Error(msg);
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk(e as any);
    }
  }

  function useQuickQuestion(q: string) {
    setQuestion(q);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function clearChat() {
    setMessages([]);
    setError('');
    setQuestion('');
  }

  return (
    <div className="rounded-2xl border border-purple-200 overflow-hidden bg-white shadow-lg">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-800 to-purple-600">
        <div className="flex items-center gap-2.5">
          {/* Blue question-mark icon with online indicator */}
          <div className="relative" style={{ width: 26, height: 26 }}>
            <TutorIcon size={26} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-purple-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white text-sm font-bold leading-tight">LMS Tutor</p>
              <span className="text-[10px] bg-purple-500/60 text-purple-100 px-1.5 py-0.5 rounded font-medium hide">GPT-3.5</span>
            </div>
            <p className="text-purple-200 text-[11px] truncate max-w-[260px]">
              Answering questions about: <strong className="text-white">{lessonTitle}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="text-purple-300 hover:text-white text-[10px] px-2 py-1 rounded border border-purple-500/50 hover:border-purple-300 transition-colors"
              title="Clear conversation"
            >
              Clear
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-purple-200 hover:text-white transition-colors p-1 rounded hover:bg-purple-500/40"
              title="Close AI Tutor"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Message area ──────────────────────────────────────────────────── */}
      <div className="h-72 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50/60">

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <div className="mb-3">
              <TutorIcon size={48} />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1 lmsTutorBld">What would you like to know?</p>
            <p className="text-xs text-gray-400 mb-4 px-4 leading-relaxed lmsTutor">
              I'll answer using the lesson content. Ask anything — from quick summaries to deep-dives.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => useQuickQuestion(q)}
                  className="text-[11px] bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

            {/* AI avatar */}
            {msg.role === 'assistant' && (
              <div className="mt-0.5 shrink-0">
                <TutorIcon size={22} />
              </div>
            )}

            <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
              msg.role === 'user'
                ? 'bg-purple-600 text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
            }`}>
              {msg.role === 'assistant' && (
                <p className="text-[10px] font-bold text-purple-500 mb-1">LMS Tutor</p>
              )}
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>

            {/* User avatar */}
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-[#0d2233] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] text-white font-bold">You</span>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="mt-0.5 shrink-0">
              <TutorIcon size={22} />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
            <span className="text-red-500 text-base shrink-0">⚠️</span>
            <div>
              <p className="text-xs font-semibold text-red-700">Unable to get answer</p>
              <p className="text-xs text-red-500 mt-0.5">{error.replace("AI", "LMS")}</p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input area ────────────────────────────────────────────────────── */}
      <form onSubmit={handleAsk} className="border-t border-gray-100 bg-white px-3 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question… (Enter to send, Shift+Enter for new line)"
              rows={2}
              maxLength={1000}
              disabled={loading}
              className="w-full text-sm resize-none border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-400 disabled:opacity-60 leading-relaxed bg-gray-50 focus:bg-white transition-colors"
            />
            {question.length > 800 && (
              <span className="absolute bottom-2 right-2 text-[9px] text-gray-400">{question.length}/1000</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="shrink-0 w-10 h-10 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
            title="Send (Enter)"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-[9px] text-gray-400 mt-1.5 text-center">
          Lesson-aware · Clinical research expertise · Answers based on your current lesson
        </p>
      </form>
    </div>
  );
}
