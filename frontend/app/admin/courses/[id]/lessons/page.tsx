'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';

interface Lesson {
  id: string;
  title: string;
  lessonType: 'VIDEO' | 'TEXT' | 'PDF' | 'WEBINAR';
  videoUrl: string | null;
  videoDurationMinutes: number | null;
  isPreview: boolean;
  order: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export default function CourseLessonsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [courseTitle, setCourseTitle] = useState('');
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    adminApi.getCourse(id).then((res) => {
      setCourseTitle(res.data.title);
      setModules(res.data.modules || []);
    }).finally(() => setLoading(false));
  }, [id]);

  function startEdit(lesson: Lesson) {
    setEditingLesson({ ...lesson });
    setSaveMsg(null);
  }

  function cancelEdit() {
    setEditingLesson(null);
    setSaveMsg(null);
  }

  async function saveLesson() {
    if (!editingLesson) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      await adminApi.updateLesson(editingLesson.id, {
        title: editingLesson.title,
        videoUrl: editingLesson.videoUrl || null,
        videoDurationMinutes: editingLesson.videoDurationMinutes
          ? Number(editingLesson.videoDurationMinutes)
          : null,
        isPreview: editingLesson.isPreview,
        lessonType: editingLesson.lessonType,
      });
      // Update local state
      setModules((prev) =>
        prev.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === editingLesson.id ? { ...l, ...editingLesson } : l
          ),
        }))
      );
      setSaveMsg({ type: 'success', text: '✓ Lesson saved successfully' });
      setTimeout(() => setEditingLesson(null), 1200);
    } catch {
      setSaveMsg({ type: 'error', text: 'Failed to save lesson. Try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Loading lessons...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push(`/admin/courses/${id}`)}
            className="text-sm text-[#c9a84c] hover:underline mb-1 block"
          >
            ← Back to course settings
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Lesson Editor</h1>
          <p className="text-sm text-gray-500 mt-0.5">{courseTitle}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
        <strong>How to update videos:</strong> Click <strong>Edit</strong> on any video lesson, paste your video URL, 
        then click <strong>Save</strong>. Each lesson has its own independent video link.
        Supports YouTube, Vimeo, Bunny Stream, Loom, Google Drive, and direct MP4 links.
      </div>

      {/* Module list */}
      <div className="space-y-6">
        {modules.sort((a, b) => a.order - b.order).map((module) => (
          <div key={module.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Module header */}
            <div className="bg-[#0d2233] px-5 py-3">
              <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-0.5">
                Module {module.order}
              </p>
              <p className="text-white font-semibold text-sm">{module.title}</p>
            </div>

            {/* Lessons */}
            <div className="divide-y divide-gray-100">
              {module.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                <div key={lesson.id} className="p-4">
                  {editingLesson?.id === lesson.id ? (
                    /* ── Edit mode ── */
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          lesson.lessonType === 'VIDEO'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {lesson.lessonType}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{lesson.title}</span>
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Lesson Title</label>
                        <input
                          value={editingLesson.title}
                          onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                        />
                      </div>

                      {/* Video URL — only for VIDEO lessons */}
                      {editingLesson.lessonType === 'VIDEO' && (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Video URL
                              <span className="text-gray-400 font-normal ml-1">
                                (YouTube, Vimeo, Bunny, Loom, Google Drive, or direct .mp4)
                              </span>
                            </label>
                            <input
                              value={editingLesson.videoUrl || ''}
                              onChange={(e) => setEditingLesson({ ...editingLesson, videoUrl: e.target.value })}
                              placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] font-mono"
                            />
                            {editingLesson.videoUrl && (
                              <p className="text-xs text-green-600 mt-1 font-medium">
                                ✓ URL set — will play in the lesson viewer
                              </p>
                            )}
                            {!editingLesson.videoUrl && (
                              <p className="text-xs text-amber-600 mt-1">
                                Empty — will show "Video Coming Soon" card to learners
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Duration (minutes)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={editingLesson.videoDurationMinutes ?? ''}
                              onChange={(e) => setEditingLesson({
                                ...editingLesson,
                                videoDurationMinutes: e.target.value ? Number(e.target.value) : null,
                              })}
                              placeholder="e.g. 12"
                              className="w-40 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                            />
                          </div>
                        </>
                      )}

                      {/* Free preview toggle */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingLesson.isPreview}
                          onChange={(e) => setEditingLesson({ ...editingLesson, isPreview: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-xs text-gray-600">
                          Free preview — visible to non-enrolled visitors
                        </span>
                      </label>

                      {/* Save / Cancel */}
                      {saveMsg && (
                        <p className={`text-xs font-medium ${saveMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          {saveMsg.text}
                        </p>
                      )}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={saveLesson}
                          disabled={saving}
                          className="bg-[#c9a84c] hover:bg-[#b8973b] disabled:opacity-60 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
                        >
                          {saving ? 'Saving...' : 'Save Lesson'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View mode ── */
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                          lesson.lessonType === 'VIDEO'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {lesson.lessonType === 'VIDEO' ? '▶ VIDEO' : '📄 TEXT'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{lesson.title}</p>
                          {lesson.lessonType === 'VIDEO' && (
                            <p className={`text-xs mt-0.5 truncate font-mono ${
                              lesson.videoUrl ? 'text-green-600' : 'text-amber-500'
                            }`}>
                              {lesson.videoUrl
                                ? `✓ ${lesson.videoUrl}`
                                : '⚠ No video URL — shows "Coming Soon" to learners'}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-1">
                            {lesson.videoDurationMinutes && (
                              <span className="text-xs text-gray-400">
                                {lesson.videoDurationMinutes} min
                              </span>
                            )}
                            {lesson.isPreview && (
                              <span className="text-xs bg-cyan-100 text-cyan-700 font-medium px-1.5 py-0.5 rounded">
                                Free Preview
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => startEdit(lesson)}
                        className="shrink-0 text-xs font-semibold text-[#c9a84c] hover:text-[#b8973b] border border-[#c9a84c] hover:border-[#b8973b] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {module.lessons.length === 0 && (
                <p className="px-5 py-4 text-sm text-gray-400 italic">No lessons in this module yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
