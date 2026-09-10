'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => adminApi.listCourses().then((r) => setCourses(r.data)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  async function togglePublish(id: string) {
    await adminApi.togglePublish(id);
    load();
  }

  async function deleteCourse(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This will also remove all modules and lessons.`)) return;
    await adminApi.deleteCourse(id);
    load();
  }

  if (loading) return <div className="text-gray-400">Loading courses...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 mt-1">{courses.length} courses total</p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary">+ New Course</Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-16 text-center text-gray-400">
          <p className="text-lg mb-2">No courses yet</p>
          <Link href="/admin/courses/new" className="btn-primary mt-4 inline-block">Create your first course</Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Course</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden md:table-cell">Category</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Level</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Modules</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Enrolments</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 text-right font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 line-clamp-1">{course.title}</p>
                    <p className="text-xs text-gray-400">{course.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{course.category?.name || '—'}</td>
                  <td className="px-5 py-3 text-gray-600 capitalize hidden lg:table-cell">
                    {course.difficultyLevel?.toLowerCase()}
                  </td>
                  <td className="px-5 py-3 text-gray-600 hidden lg:table-cell">{course._count?.modules || 0}</td>
                  <td className="px-5 py-3 text-gray-600 hidden lg:table-cell">{course._count?.enrollments || 0}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => togglePublish(course.id)}
                      className={`badge text-xs cursor-pointer ${course.isPublished ? 'badge-green' : 'bg-gray-100 text-gray-500'}`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/courses/${course.id}`} className="text-xs text-primary-700 hover:underline">Edit</Link>
                      <button onClick={() => deleteCourse(course.id, course.title)} className="text-xs text-red-500 hover:underline">Delete</button>
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
