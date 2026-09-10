/**
 * Seed full course catalog — Clinical Research Nexus (Exon Sciences)
 * Based on: Viares course structure + "Clinical Trial in the UK from Start-up to Closure" document
 * Run: node prisma/seed-courses.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSES = [
  {
    title: 'Clinical Trial in the UK: Start-up to Closure',
    slug: 'clinical-trial-uk-startup-to-closure',
    subtitle: 'End-to-end guide to running clinical trials in the UK under MHRA regulations',
    description: 'This comprehensive course covers the complete lifecycle of a UK clinical trial — from protocol development and regulatory submission through site initiation, conduct, monitoring, and final closure. Designed specifically for the UK regulatory landscape post-Brexit.',
    badge: 'TOP COURSE',
    learningObjectives: [
      'Navigate the UK clinical trial authorisation (CTA) process via IRAS and MHRA',
      'Set up and initiate clinical trial sites effectively',
      'Apply ICH GCP E6(R3) principles throughout the trial lifecycle',
      'Conduct monitoring visits and manage protocol deviations',
      'Execute site closure procedures and archive essential documents',
    ],
    prerequisites: ['Basic understanding of clinical research terminology'],
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 8,
    accreditation: 'MHRA Aligned | ICH GCP E6(R3)',
    tags: ['UK', 'clinical-trials', 'startup', 'closure', 'MHRA', 'GCP'],
    isFeatured: true,
    modulesCount: 6,
    activitiesCount: 24,
    categorySlug: 'good-clinical-practice',
  },
  {
    title: 'ICH GCP E6(R3) Fundamentals for UK Clinical Research',
    slug: 'ich-gcp-e6-fundamentals-uk',
    subtitle: 'Master GCP compliance with a focus on MHRA and UK regulatory requirements',
    description: 'A comprehensive grounding in ICH GCP E6(R3) with direct application to clinical research in the UK. Covers the 13 principles, sponsor/investigator responsibilities, documentation requirements, and MHRA oversight.',
    badge: 'HOT NOW',
    learningObjectives: [
      'Explain the 13 principles of ICH GCP E6(R3)',
      'Identify responsibilities of sponsors and investigators',
      'Describe essential documentation requirements',
      'Apply GCP principles to UK trial scenarios',
    ],
    prerequisites: ['No prior GCP certification required'],
    difficultyLevel: 'BEGINNER',
    durationHours: 4,
    accreditation: 'ACRP Approved | ICH GCP E6(R3) Aligned',
    tags: ['gcp', 'ich', 'uk', 'mhra', 'beginner'],
    isFeatured: true,
    modulesCount: 3,
    activitiesCount: 12,
    categorySlug: 'good-clinical-practice',
  },
  {
    title: 'Clinical Research Associate (CRA) Foundation',
    slug: 'clinical-research-associate-foundation',
    subtitle: 'Step into the role of a CRA with this role-specific UK training programme',
    description: 'Covers clinical trial management, site monitoring, regulatory compliance, and data quality. Master the skills to monitor UK trial sites, ensure patient safety, and support groundbreaking research.',
    badge: 'BEST VALUE',
    learningObjectives: [
      'Conduct site selection, initiation, and routine monitoring visits',
      'Perform source data verification (SDV) and source data review (SDR)',
      'Manage protocol deviations and implement CAPAs',
      'Apply risk-based monitoring strategies',
    ],
    prerequisites: ['ICH GCP fundamentals recommended'],
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 10,
    accreditation: 'ACRP Approved',
    tags: ['CRA', 'monitoring', 'site-management', 'UK'],
    isFeatured: true,
    modulesCount: 8,
    activitiesCount: 34,
    categorySlug: 'good-clinical-practice',
  },
  {
    title: 'Introduction to Pharmacovigilance',
    slug: 'introduction-to-pharmacovigilance',
    subtitle: 'Drug safety fundamentals for the UK and global clinical research context',
    description: 'A foundational pharmacovigilance course covering adverse drug reactions, signal detection, the UK Yellow Card scheme, and MHRA reporting requirements. Essential for anyone working on clinical trials in the UK.',
    badge: null,
    learningObjectives: [
      'Distinguish between AEs, ADRs, SAEs, and SUSARs',
      'Describe the UK Yellow Card reporting scheme',
      'Explain MHRA pharmacovigilance inspection requirements',
      'Understand signal detection and risk management principles',
    ],
    prerequisites: ['Basic clinical research knowledge'],
    difficultyLevel: 'BEGINNER',
    durationHours: 4,
    accreditation: 'MHRA Guidelines Aligned',
    tags: ['pharmacovigilance', 'drug-safety', 'MHRA', 'yellow-card'],
    isFeatured: false,
    modulesCount: 4,
    activitiesCount: 14,
    categorySlug: 'pharmacovigilance',
  },
  {
    title: 'Adverse Event Reporting: MHRA & EMA Requirements',
    slug: 'adverse-event-reporting-mhra-ema',
    subtitle: 'Master SAE and SUSAR reporting timelines for UK and EU trials',
    description: 'Advanced course focusing on serious adverse event and SUSAR reporting obligations in UK and EU trials. Covers 7-day and 15-day timelines, SAE narratives, EudraVigilance submissions, and post-Brexit dual reporting.',
    badge: null,
    learningObjectives: [
      'Apply 7-day and 15-day SUSAR reporting timelines correctly',
      'Prepare compliant SAE narratives',
      'Use EudraVigilance for EU submissions',
      'Understand post-Brexit dual reporting obligations',
    ],
    prerequisites: ['Introduction to Pharmacovigilance recommended'],
    difficultyLevel: 'ADVANCED',
    durationHours: 5,
    accreditation: 'MHRA & EMA Aligned',
    tags: ['SAE', 'SUSAR', 'EudraVigilance', 'MHRA', 'EMA'],
    isFeatured: false,
    modulesCount: 5,
    activitiesCount: 18,
    categorySlug: 'pharmacovigilance',
  },
  {
    title: 'Clinical Data Management Principles',
    slug: 'clinical-data-management-principles',
    subtitle: 'CDISC standards, EDC systems, and data quality in UK clinical trials',
    description: 'Complete CDM lifecycle from protocol review through database lock. Covers CDISC CDASH and SDTM standards, CRF design, data validation rules, query management, and reconciliation used in UK and global trials.',
    badge: null,
    learningObjectives: [
      'Design CRFs aligned with CDISC CDASH standards',
      'Apply data validation rules and query management',
      'Understand data cleaning and reconciliation processes',
      'Execute database lock procedures correctly',
    ],
    prerequisites: ['Basic understanding of clinical trials'],
    difficultyLevel: 'BEGINNER',
    durationHours: 5,
    accreditation: 'SCDM Aligned | CDISC Compliant',
    tags: ['CDM', 'CDISC', 'CDASH', 'data-management'],
    isFeatured: false,
    modulesCount: 5,
    activitiesCount: 20,
    categorySlug: 'clinical-data-management',
  },
  {
    title: 'UK Post-Brexit Regulatory Landscape',
    slug: 'uk-post-brexit-regulatory-landscape',
    subtitle: 'Navigating MHRA regulations after the UK\'s departure from the EU',
    description: 'Understand the post-Brexit UK clinical trial regulatory framework — the Medicines and Medical Devices Act 2021, the new UK Clinical Trials Regulation, and how UK requirements diverge from EU CTR.',
    badge: 'HOT NOW',
    learningObjectives: [
      'Explain key changes in UK regulations post-Brexit',
      'Navigate the MHRA Clinical Trials Authorisation (CTA) process',
      'Compare UK and EU regulatory requirements for multi-regional trials',
      'Understand UK-specific Phase I–IV requirements',
    ],
    prerequisites: ['Basic regulatory awareness'],
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 4,
    accreditation: 'MHRA Framework Aligned',
    tags: ['post-Brexit', 'MHRA', 'regulatory', 'UK'],
    isFeatured: true,
    modulesCount: 4,
    activitiesCount: 14,
    categorySlug: 'regulatory-affairs',
  },
  {
    title: 'Clinical Trial Authorisation (CTA) Process',
    slug: 'clinical-trial-authorisation-cta-process',
    subtitle: 'Step-by-step guide to submitting CTAs through IRAS to the MHRA',
    description: 'Practical guide to preparing and submitting Clinical Trial Authorisation applications to the MHRA via IRAS, including IMP dossier preparation, substantial modifications, and MHRA response management.',
    badge: null,
    learningObjectives: [
      'Complete a CTA application in IRAS',
      'Prepare required documentation (IMP dossier, protocol, IB)',
      'Manage substantial modifications and protocol amendments',
      'Understand MHRA assessment timelines',
    ],
    prerequisites: ['UK Post-Brexit Regulatory Landscape recommended'],
    difficultyLevel: 'ADVANCED',
    durationHours: 6,
    accreditation: 'MHRA Aligned',
    tags: ['CTA', 'IRAS', 'MHRA', 'IMP', 'regulatory'],
    isFeatured: false,
    modulesCount: 6,
    activitiesCount: 22,
    categorySlug: 'regulatory-affairs',
  },
  {
    title: 'Principal Investigator Responsibilities',
    slug: 'principal-investigator-responsibilities',
    subtitle: 'Legal, ethical and operational duties of the PI under GCP and UK law',
    description: 'Everything a Principal Investigator needs to know about their obligations under ICH GCP E6(R3), UK Clinical Trials Regulations, and MHRA guidance — from delegation logs to IP accountability and protocol management.',
    badge: null,
    learningObjectives: [
      'Understand legal duties of the PI under UK regulations',
      'Maintain a compliant Trial Master File at site',
      'Manage the delegation of duties log correctly',
      'Oversee investigational product accountability',
    ],
    prerequisites: ['ICH GCP fundamentals'],
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 4,
    accreditation: 'ICH GCP E6(R3) Aligned',
    tags: ['PI', 'investigator', 'GCP', 'site', 'UK'],
    isFeatured: false,
    modulesCount: 4,
    activitiesCount: 16,
    categorySlug: 'investigator-training',
  },
  {
    title: 'Protocol Deviation Management',
    slug: 'protocol-deviation-management',
    subtitle: 'Identifying, classifying, reporting and preventing protocol deviations',
    description: 'Learn to identify and correctly classify protocol deviations and violations, complete deviation reports, implement CAPAs, and communicate with sponsors and ethics committees in UK clinical trials.',
    badge: null,
    learningObjectives: [
      'Classify deviations as minor, major, or violations',
      'Complete CAPA documentation correctly',
      'Report deviations to sponsors within required timeframes',
      'Implement preventative strategies to reduce deviation rates',
    ],
    prerequisites: ['Site or sponsor experience recommended'],
    difficultyLevel: 'INTERMEDIATE',
    durationHours: 3,
    accreditation: 'GCP Aligned',
    tags: ['deviations', 'CAPA', 'GCP', 'quality'],
    isFeatured: false,
    modulesCount: 3,
    activitiesCount: 10,
    categorySlug: 'investigator-training',
  },
];

async function main() {
  console.log('🌱 Seeding full course catalog...\n');

  // Get categories
  const cats = await prisma.category.findMany();
  const catMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  // Get instructor
  const instructor = await prisma.instructor.findFirst();
  if (!instructor) {
    console.error('❌ No instructor found. Run node prisma/seed.js first.');
    return;
  }

  let created = 0;
  let skipped = 0;

  for (const course of COURSES) {
    const existing = await prisma.course.findUnique({ where: { slug: course.slug } });
    if (existing) {
      skipped++;
      console.log(`  ⏭  Skipped (exists): ${course.title}`);
      continue;
    }

    const categoryId = catMap[course.categorySlug];

    // Create course with 2 sample modules
    await prisma.course.create({
      data: {
        title: course.title,
        slug: course.slug,
        subtitle: course.subtitle,
        description: course.description,
        learningObjectives: course.learningObjectives,
        prerequisites: course.prerequisites,
        difficultyLevel: course.difficultyLevel,
        durationHours: course.durationHours,
        language: 'en-GB',
        accreditation: course.accreditation,
        tags: course.tags,
        isFeatured: course.isFeatured,
        isPublished: true,
        sortOrder: COURSES.indexOf(course),
        categoryId,
        instructors: { create: [{ instructorId: instructor.id }] },
        modules: {
          create: [
            {
              title: `Module 1: Introduction & Foundations`,
              order: 1,
              isMandatory: true,
              lessons: {
                create: [
                  { title: 'Welcome & Course Overview', lessonType: 'VIDEO', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', videoDurationMinutes: 8, isPreview: true, order: 1 },
                  { title: 'Key Concepts & Terminology', lessonType: 'TEXT', content: { type: 'doc', content: [] }, isPreview: false, order: 2 },
                ],
              },
            },
            {
              title: `Module 2: Core Principles & Practice`,
              order: 2,
              isMandatory: true,
              lessons: {
                create: [
                  { title: 'Regulatory Framework', lessonType: 'VIDEO', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', videoDurationMinutes: 15, isPreview: false, order: 1 },
                  { title: 'Practical Application', lessonType: 'TEXT', content: { type: 'doc', content: [] }, isPreview: false, order: 2 },
                ],
              },
            },
          ],
        },
      },
    });

    created++;
    console.log(`  ✅ Created: ${course.title}`);
  }

  console.log(`\n✨ Done! Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
