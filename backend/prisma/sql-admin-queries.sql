-- ============================================================
-- ADMIN SQL QUERIES — Run in Neon SQL Editor
-- https://console.neon.tech/app/projects/withered-hall-74575315
-- Use the production branch
-- ============================================================


-- ─────────────────────────────────────────────────────────────
-- VIDEO URL MANAGEMENT
-- ─────────────────────────────────────────────────────────────

-- Update ALL video lessons in a specific course to one URL
UPDATE lessons 
SET "videoUrl" = 'https://www.youtube.com/watch?v=aGYMB4TkJYM'
WHERE "lessonType" = 'VIDEO'
  AND "moduleId" IN (
    SELECT m.id FROM modules m
    JOIN courses c ON c.id = m."courseId"
    WHERE c.slug = 'clinical-trial-uk-startup-to-closure'
  );

-- Update a single specific lesson's video URL by lesson title
UPDATE lessons
SET "videoUrl" = 'https://www.youtube.com/watch?v=YOUR_NEW_ID'
WHERE title = 'Welcome & Course Overview'
  AND "moduleId" IN (
    SELECT m.id FROM modules m
    JOIN courses c ON c.id = m."courseId"
    WHERE c.slug = 'clinical-trial-uk-startup-to-closure'
  );

-- Clear video URL (shows "coming soon" card)
UPDATE lessons
SET "videoUrl" = NULL
WHERE title = 'Welcome & Course Overview'
  AND "moduleId" IN (
    SELECT m.id FROM modules m
    JOIN courses c ON c.id = m."courseId"
    WHERE c.slug = 'clinical-trial-uk-startup-to-closure'
  );

-- View all video lessons and their current URLs for a course
SELECT l.title, l."videoUrl", l."videoDurationMinutes", m.title AS module
FROM lessons l
JOIN modules m ON m.id = l."moduleId"
JOIN courses c ON c.id = m."courseId"
WHERE c.slug = 'clinical-trial-uk-startup-to-closure'
  AND l."lessonType" = 'VIDEO'
ORDER BY m."order", l."order";


-- ─────────────────────────────────────────────────────────────
-- COURSE MANAGEMENT
-- ─────────────────────────────────────────────────────────────

-- List all published courses with module/lesson counts
SELECT c.title, c.slug, c.price, c."isPublished", c."isFeatured",
  COUNT(DISTINCT m.id) AS modules,
  COUNT(DISTINCT l.id) AS lessons
FROM courses c
LEFT JOIN modules m ON m."courseId" = c.id
LEFT JOIN lessons l ON l."moduleId" = m.id
GROUP BY c.id
ORDER BY c."sortOrder";

-- Update course price
UPDATE courses SET price = 149.00, "originalPrice" = 199.00
WHERE slug = 'clinical-trial-uk-startup-to-closure';

-- Publish / unpublish a course
UPDATE courses SET "isPublished" = true  WHERE slug = 'clinical-trial-uk-startup-to-closure';
UPDATE courses SET "isPublished" = false WHERE slug = 'clinical-trial-uk-startup-to-closure';

-- Feature / unfeature a course
UPDATE courses SET "isFeatured" = true  WHERE slug = 'clinical-trial-uk-startup-to-closure';
UPDATE courses SET "isFeatured" = false WHERE slug = 'clinical-trial-uk-startup-to-closure';


-- ─────────────────────────────────────────────────────────────
-- USER MANAGEMENT
-- ─────────────────────────────────────────────────────────────

-- Find a user by email
SELECT id, email, "firstName", "lastName", role, "isActive", "paymentStatus", "createdAt"
FROM users WHERE email = 'user@example.com';

-- List all enrolled users for a course
SELECT u.email, u."firstName", u."lastName", e.status, e."enrolledAt"
FROM enrollments e
JOIN users u ON u.id = e."userId"
JOIN courses c ON c.id = e."courseId"
WHERE c.slug = 'clinical-trial-uk-startup-to-closure'
ORDER BY e."enrolledAt" DESC;

-- Manually enrol a user in a course (use their user ID and course ID)
-- First get the IDs:
SELECT id FROM users WHERE email = 'user@example.com';
SELECT id FROM courses WHERE slug = 'clinical-trial-uk-startup-to-closure';
-- Then insert:
INSERT INTO enrollments ("userId", "courseId", status, "enrolledAt")
VALUES ('USER_ID_HERE', 'COURSE_ID_HERE', 'ACTIVE', NOW())
ON CONFLICT DO NOTHING;

-- Deactivate a user account
UPDATE users SET "isActive" = false WHERE email = 'user@example.com';

-- Change a user's role
UPDATE users SET role = 'ADMIN' WHERE email = 'user@example.com';


-- ─────────────────────────────────────────────────────────────
-- PAYMENT STATS
-- ─────────────────────────────────────────────────────────────

-- Total revenue
SELECT 
  COUNT(*) AS total_payments,
  SUM("totalAmount") AS total_revenue,
  AVG("totalAmount") AS avg_order_value
FROM payments WHERE status = 'PAID';

-- Recent payments
SELECT p."createdAt", p."firstName", p."lastName", p.email, p."totalAmount", p.status
FROM payments p
ORDER BY p."createdAt" DESC
LIMIT 20;

-- Revenue by course
SELECT pi."courseTitle", COUNT(*) AS purchases, SUM(pi."lineTotal") AS revenue
FROM payment_items pi
JOIN payments p ON p.id = pi."paymentId"
WHERE p.status = 'PAID'
GROUP BY pi."courseTitle"
ORDER BY revenue DESC;


-- ─────────────────────────────────────────────────────────────
-- LESSON CONTENT UPDATE (for small text fixes)
-- ─────────────────────────────────────────────────────────────

-- View a lesson's current content (first 500 chars)
SELECT title, LEFT(content::text, 500) AS content_preview
FROM lessons
WHERE title = 'The Drug Development Life Cycle';

-- NOTE: For large content updates (full lesson rewrites), 
-- use the admin dashboard or re-run the seed script.
-- Direct SQL content updates are best for small fixes only.

UPDATE lessons 
SET "videoUrl" = 'https://www.youtube.com/watch?v=aGYMB4TkJYM'
WHERE "lessonType" = 'VIDEO'
  AND "moduleId" IN (
    SELECT m.id FROM modules m
    JOIN courses c ON c.id = m."courseId"
    WHERE c.slug = 'clinical-trial-uk-startup-to-closure'
  );