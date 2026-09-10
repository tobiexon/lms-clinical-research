/**
 * Plain JS seed — no ts-node required
 * Run: node prisma/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const adminHash = await bcrypt.hash('Admin@Exon2024', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@exonsciences.com' },
    update: {},
    create: {
      email: 'admin@exonsciences.com',
      passwordHash: adminHash,
      firstName: 'Exon',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      country: 'GB',
      isEmailVerified: true,
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  // Content editor
  const editorHash = await bcrypt.hash('Editor@Exon2024', 12);
  await prisma.user.upsert({
    where: { email: 'content@exonsciences.com' },
    update: {},
    create: {
      email: 'content@exonsciences.com',
      passwordHash: editorHash,
      firstName: 'Content',
      lastName: 'Editor',
      role: 'CONTENT_EDITOR',
      country: 'GB',
      isEmailVerified: true,
    },
  });
  console.log('✅ Content editor: content@exonsciences.com');

  // Test learner
  const learnerHash = await bcrypt.hash('Learner@Test2024', 12);
  await prisma.user.upsert({
    where: { email: 'learner@test.com' },
    update: {},
    create: {
      email: 'learner@test.com',
      passwordHash: learnerHash,
      firstName: 'Test',
      lastName: 'Learner',
      role: 'LEARNER',
      country: 'GB',
      isEmailVerified: true,
    },
  });
  console.log('✅ Test learner: learner@test.com');

  // Categories
  const cats = await Promise.all([
    prisma.category.upsert({ where: { slug: 'good-clinical-practice' }, update: {}, create: { name: 'Good Clinical Practice (GCP)', slug: 'good-clinical-practice', description: 'ICH GCP guidelines, site management, and trial conduct' } }),
    prisma.category.upsert({ where: { slug: 'pharmacovigilance' }, update: {}, create: { name: 'Pharmacovigilance & Drug Safety', slug: 'pharmacovigilance', description: 'Adverse event reporting and MHRA/EMA compliance' } }),
    prisma.category.upsert({ where: { slug: 'clinical-data-management' }, update: {}, create: { name: 'Clinical Data Management', slug: 'clinical-data-management', description: 'EDC systems, CDISC standards, and database lock' } }),
    prisma.category.upsert({ where: { slug: 'regulatory-affairs' }, update: {}, create: { name: 'Regulatory Affairs', slug: 'regulatory-affairs', description: 'UK MHRA regulations and post-Brexit compliance' } }),
    prisma.category.upsert({ where: { slug: 'investigator-training' }, update: {}, create: { name: 'Investigator & Site Training', slug: 'investigator-training', description: 'Training for PIs, site staff, and research nurses' } }),
  ]);
  console.log(`✅ ${cats.length} categories`);

  // Instructor
  const instructor = await prisma.instructor.upsert({
    where: { id: 'seed-instructor-1' },
    update: {},
    create: {
      id: 'seed-instructor-1',
      fullName: 'Dr. Sarah Mitchell',
      title: 'Senior Clinical Research Associate, ACRP-CP',
      bio: 'Dr. Mitchell has 12+ years experience in oncology and cardiovascular clinical trials across the UK and EU.',
      credentials: ['ACRP-CP', 'MSc Clinical Research', 'ICH GCP Certified'],
    },
  });
  console.log(`✅ Instructor: ${instructor.fullName}`);

  // Sample course
  const existing = await prisma.course.findUnique({ where: { slug: 'ich-gcp-e6-fundamentals-uk' } });
  if (!existing) {
    const course = await prisma.course.create({
      data: {
        title: 'ICH GCP E6(R3) Fundamentals for UK Clinical Research',
        slug: 'ich-gcp-e6-fundamentals-uk',
        subtitle: 'Master GCP compliance with a focus on MHRA and UK regulatory requirements',
        learningObjectives: [
          'Explain the 13 principles of ICH GCP E6(R3)',
          'Identify responsibilities of sponsors and investigators',
          'Describe essential documentation requirements',
          'Apply GCP principles to real UK trial scenarios',
        ],
        prerequisites: ['Basic understanding of clinical trial concepts'],
        difficultyLevel: 'BEGINNER',
        durationHours: 4,
        language: 'en-GB',
        accreditation: 'ACRP Approved | ICH GCP E6(R3) Aligned',
        tags: ['gcp', 'ich', 'clinical-trials', 'uk', 'mhra'],
        isFeatured: true,
        isPublished: true,
        seoTitle: 'ICH GCP E6(R3) Course UK | Exon Sciences',
        categoryId: cats[0].id,
        instructors: { create: [{ instructorId: instructor.id }] },
        modules: {
          create: [
            {
              title: 'Module 1: Overview of ICH GCP E6(R3)',
              order: 1,
              isMandatory: true,
              lessons: {
                create: [
                  { title: 'Introduction to ICH GCP E6(R3)', lessonType: 'VIDEO', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', videoDurationMinutes: 12, isPreview: true, order: 1 },
                  { title: 'The 13 Principles of ICH GCP', lessonType: 'TEXT', content: { type: 'doc', content: [] }, isPreview: false, order: 2 },
                  { title: 'Roles and Responsibilities', lessonType: 'VIDEO', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', videoDurationMinutes: 18, isPreview: false, order: 3 },
                ],
              },
            },
            {
              title: 'Module 2: Informed Consent in UK Clinical Research',
              order: 2,
              isMandatory: true,
              lessons: {
                create: [
                  { title: 'The Informed Consent Process in the UK', lessonType: 'VIDEO', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', videoDurationMinutes: 20, isPreview: false, order: 1 },
                  { title: 'Mental Capacity Act 2005 and Research Consent', lessonType: 'TEXT', content: { type: 'doc', content: [] }, isPreview: false, order: 2 },
                ],
              },
            },
          ],
        },
      },
    });

    // Add quiz
    const mod1 = await prisma.module.findFirst({ where: { courseId: course.id, order: 1 } });
    if (mod1) {
      await prisma.quiz.create({
        data: {
          moduleId: mod1.id,
          title: 'Module 1 Knowledge Check',
          instructions: 'Answer all questions. 70% to pass. 3 attempts allowed.',
          passMarkPercentage: 70,
          maxAttempts: 3,
          randomizeQuestions: true,
          questions: {
            create: [
              {
                questionText: 'What does "ICH" stand for in clinical research?',
                questionType: 'MULTIPLE_CHOICE',
                explanation: 'ICH = International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use.',
                marks: 1, order: 1,
                options: { create: [
                  { optionText: 'International Council for Harmonisation', isCorrect: true, order: 1 },
                  { optionText: 'International Committee for Healthcare', isCorrect: false, order: 2 },
                  { optionText: 'Institute for Clinical Harmonisation', isCorrect: false, order: 3 },
                  { optionText: 'Integrated Clinical Hub', isCorrect: false, order: 4 },
                ]},
              },
              {
                questionText: 'What is the primary objective of Good Clinical Practice?',
                questionType: 'MULTIPLE_CHOICE',
                explanation: 'GCP protects the rights, safety, and well-being of trial subjects and ensures data integrity.',
                marks: 1, order: 2,
                options: { create: [
                  { optionText: 'To protect the rights, safety, and well-being of trial subjects', isCorrect: true, order: 1 },
                  { optionText: 'To ensure maximum drug efficacy', isCorrect: false, order: 2 },
                  { optionText: 'To reduce the cost of clinical trials', isCorrect: false, order: 3 },
                  { optionText: 'To speed up regulatory approvals', isCorrect: false, order: 4 },
                ]},
              },
              {
                questionText: 'Informed consent must be obtained:',
                questionType: 'MULTIPLE_CHOICE',
                explanation: 'ICH GCP E6(R3) requires consent before any trial-related procedure.',
                marks: 1, order: 3,
                options: { create: [
                  { optionText: 'Before any trial-related procedures begin', isCorrect: true, order: 1 },
                  { optionText: 'After the first dose of investigational product', isCorrect: false, order: 2 },
                  { optionText: 'At the time of screening visit only', isCorrect: false, order: 3 },
                  { optionText: 'Only for invasive procedures', isCorrect: false, order: 4 },
                ]},
              },
            ],
          },
        },
      });
    }
    console.log(`✅ Course created: ${course.title}`);
  } else {
    console.log('ℹ️  Course already exists, skipping');
  }

  // Sample program
  const existingProg = await prisma.program.findUnique({ where: { slug: 'cra-foundation-certificate' } });
  if (!existingProg) {
    const course = await prisma.course.findUnique({ where: { slug: 'ich-gcp-e6-fundamentals-uk' } });
    if (course) {
      await prisma.program.create({
        data: {
          title: 'Clinical Research Associate (CRA) Foundation Certificate',
          slug: 'cra-foundation-certificate',
          description: 'The CRA Foundation Certificate equips you with skills for a career as a Clinical Research Associate in the UK and internationally.',
          awardTitle: 'Certificate in Clinical Research Practice (CRA Foundation)',
          durationWeeks: 8,
          accreditationBody: 'ACRP',
          isFeatured: true,
          isPublished: true,
          courses: { create: [{ courseId: course.id, order: 1 }] },
        },
      });
      console.log('✅ Program created: CRA Foundation Certificate');
    }
  } else {
    console.log('ℹ️  Program already exists, skipping');
  }

  console.log('\n🎉 Seed complete!');
  console.log('─────────────────────────────────────');
  console.log('Credentials:');
  console.log('  Admin:   admin@exonsciences.com  / Admin@Exon2024');
  console.log('  Editor:  content@exonsciences.com / Editor@Exon2024');
  console.log('  Learner: learner@test.com         / Learner@Test2024');
  console.log('─────────────────────────────────────');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
