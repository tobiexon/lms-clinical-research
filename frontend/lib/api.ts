/**
 * Exon Sciences LMS — NestJS API Client
 * All data (content + user) comes from the NestJS backend.
 * No headless CMS dependency.
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach access token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    Cookies.get('access_token') ||
    (typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken =
          Cookies.get('refresh_token') ||
          (typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null);
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken });
        Cookies.set('access_token', data.accessToken, { secure: true, sameSite: 'strict' });
        sessionStorage.setItem('access_token', data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;

// ── Auth ──────────────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; password: string; firstName: string; lastName: string; country?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  logout: (refreshToken: string) => api.post('/auth/logout', { refreshToken }),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
};

// ── Users ─────────────────────────────────────────────────────
export const usersApi = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: any) => api.patch('/users/me', data),
};

// ── Public content — courses ──────────────────────────────────
export const coursesApi = {
  getCatalog: (params?: { page?: number; limit?: number; category?: string; difficulty?: string; search?: string }) =>
    api.get('/courses', { params }),
  getFeatured: () => api.get('/courses/featured'),
  getCategories: () => api.get('/courses/categories'),
  getCourse: (slug: string) => api.get(`/courses/${slug}`),
  // Protected — enrolled learner only
  getLearnContent: (slug: string) => api.get(`/courses/${slug}/learn`),
  getLesson: (id: string) => api.get(`/courses/lesson/${id}`),
  getModule: (id: string) => api.get(`/courses/module/${id}`),
};

// ── Public content — programs ─────────────────────────────────
export const programsApi = {
  getAll: () => api.get('/programs'),
  getBySlug: (slug: string) => api.get(`/programs/${slug}`),
};

// ── Enrollments ───────────────────────────────────────────────
export const enrollmentsApi = {
  enroll: (courseId: string) => api.post('/enrollments', { courseId }),
  getMyEnrollments: () => api.get('/enrollments'),
  getEnrollment: (courseId: string) => api.get(`/enrollments/${courseId}`),
  checkEnrolled: (courseId: string) => api.get(`/enrollments/${courseId}/check`),
};

// ── Progress ──────────────────────────────────────────────────
export const progressApi = {
  markLessonComplete: (data: { courseId: string; lessonId: string; timeSpentSecs?: number }) =>
    api.post('/progress/complete', data),
  getCourseProgress: (courseId: string) => api.get(`/progress/${courseId}`),
};

// ── Quizzes ───────────────────────────────────────────────────
export const quizzesApi = {
  getQuiz: (quizId: string, courseId: string) => api.get(`/quizzes/${quizId}`, { params: { courseId } }),
  submit: (quizId: string, data: { courseId: string; answers: { questionId: string; optionId: string }[] }) =>
    api.post(`/quizzes/${quizId}/submit`, data),
  getAttempts: (quizId: string) => api.get(`/quizzes/${quizId}/attempts`),
};

// ── Certificates ──────────────────────────────────────────────
export const certificatesApi = {
  getMyCertificates: () => api.get('/certificates'),
  issue: (data: { courseId: string }) => api.post('/certificates/issue', data),
  verify: (code: string) => api.get(`/certificates/verify/${code}`),
};

// ── Admin — content management ────────────────────────────────
export const adminApi = {
  // Stats
  getStats: () => api.get('/admin/stats'),

  // Categories
  listCategories: () => api.get('/admin/categories'),
  createCategory: (data: any) => api.post('/admin/categories', data),
  updateCategory: (id: string, data: any) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/admin/categories/${id}`),

  // Courses
  listCourses: () => api.get('/admin/courses'),
  getCourse: (id: string) => api.get(`/admin/courses/${id}`),
  createCourse: (data: any) => api.post('/admin/courses', data),
  updateCourse: (id: string, data: any) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id: string) => api.delete(`/admin/courses/${id}`),
  togglePublish: (id: string) => api.patch(`/admin/courses/${id}/publish`),

  // Modules
  createModule: (courseId: string, data: any) => api.post(`/admin/courses/${courseId}/modules`, data),
  updateModule: (id: string, data: any) => api.put(`/admin/modules/${id}`, data),
  deleteModule: (id: string) => api.delete(`/admin/modules/${id}`),

  // Lessons
  createLesson: (moduleId: string, data: any) => api.post(`/admin/modules/${moduleId}/lessons`, data),
  updateLesson: (id: string, data: any) => api.put(`/admin/lessons/${id}`, data),
  deleteLesson: (id: string) => api.delete(`/admin/lessons/${id}`),

  // Quizzes
  createQuiz: (moduleId: string, data: any) => api.post(`/admin/modules/${moduleId}/quizzes`, data),
  updateQuiz: (id: string, data: any) => api.put(`/admin/quizzes/${id}`, data),
  deleteQuiz: (id: string) => api.delete(`/admin/quizzes/${id}`),

  // Questions
  createQuestion: (quizId: string, data: any) => api.post(`/admin/quizzes/${quizId}/questions`, data),
  updateQuestion: (id: string, data: any) => api.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id: string) => api.delete(`/admin/questions/${id}`),

  // Programs
  listPrograms: () => api.get('/admin/programs'),
  getProgram: (id: string) => api.get(`/admin/programs/${id}`),
  createProgram: (data: any) => api.post('/admin/programs', data),
  updateProgram: (id: string, data: any) => api.put(`/admin/programs/${id}`, data),
  deleteProgram: (id: string) => api.delete(`/admin/programs/${id}`),
  toggleProgramPublish: (id: string) => api.patch(`/admin/programs/${id}/publish`),

  // Instructors
  listInstructors: () => api.get('/admin/instructors'),
  createInstructor: (data: any) => api.post('/admin/instructors', data),
  updateInstructor: (id: string, data: any) => api.put(`/admin/instructors/${id}`, data),
  deleteInstructor: (id: string) => api.delete(`/admin/instructors/${id}`),

  // Users
  listUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/admin/users', { params }),
  updateUserRole: (id: string, role: string) => api.patch(`/admin/users/${id}/role`, { role }),
  toggleUserActive: (id: string) => api.patch(`/admin/users/${id}/toggle-active`),
};
