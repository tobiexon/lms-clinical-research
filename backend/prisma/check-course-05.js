const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({
    where: { slug: 'adverse-event-reporting-mhra-ema' },
    include: { modules: { include: { lessons: true } } },
  });
  console.log('Courses found with this slug:', courses.length);
  for (const c of courses) {
    console.log('\nID:', c.id);
    console.log('Title:', c.title);
    console.log('Modules:', c.modules.length);
    for (const m of c.modules) {
      console.log('  Module', m.order, '-', m.title, '| Lessons:', m.lessons.length);
      for (const l of m.lessons) {
        console.log('    Lesson', l.order, '-', l.title);
      }
    }
  }

  // Also check if there are any enrollments pointing elsewhere
  const enrollments = await prisma.enrollment.findMany({
    where: { course: { slug: 'adverse-event-reporting-mhra-ema' } },
    select: { id: true, courseId: true, userId: true },
  });
  console.log('\nEnrollments:', enrollments.length);
  for (const e of enrollments) {
    console.log('  Enrollment ID:', e.id, '| courseId:', e.courseId, '| userId:', e.userId);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
