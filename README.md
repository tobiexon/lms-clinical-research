# Clinical Research Nexus — LMS

> Online learning management system for clinical research professionals, built for Exon Sciences.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | NestJS 10 + Prisma ORM |
| Database | PostgreSQL 16 (Docker) |
| Auth | JWT (access + refresh tokens) |

## Project Structure

```
lms-learning-mgt-system/
├── backend/          # NestJS API (port 3001)
│   ├── prisma/       # Schema + seed scripts
│   └── src/          # Modules: auth, courses, enrollments, quizzes, admin...
├── frontend/         # Next.js app (port 3000)
│   ├── app/          # Pages (App Router)
│   ├── components/   # Shared UI components
│   └── lib/          # API client
└── docker-compose.yml  # PostgreSQL container
```

## Local Development

### Prerequisites
- Node.js v20+
- Docker Desktop

### 1. Start the database
```bash
docker-compose up -d
```

### 2. Backend setup
```bash
cd backend
# Copy env file and fill in values
cp .env.example .env

# Push schema to DB
node -e "const {execSync}=require('child_process');console.log(execSync('node node_modules/prisma/build/index.js db push',{timeout:30000,env:{...process.env}}).toString())"

# Seed initial data (admin user + sample courses)
node prisma/seed.js
node prisma/seed-courses.js

# Start dev server
npm run start:dev
```

### 3. Frontend setup
```bash
cd frontend
# Copy env file
cp .env.local.example .env.local

# Start dev server
npx next dev
```

### 4. Open in browser
- **LMS Site:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API:** http://localhost:3001/api/v1

## Default Credentials (development only)

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@exonsciences.com | Admin@Exon2024 |
| Content Editor | content@exonsciences.com | Editor@Exon2024 |
| Test Learner | learner@test.com | Learner@Test2024 |

## Environment Variables

### Backend (`backend/.env`)
See `backend/.env.example` for all required variables.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_ACCESS_SECRET` — Change before production
- `JWT_REFRESH_SECRET` — Change before production

### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL` — NestJS backend URL (default: http://localhost:3001)

## Notes for Node 24 users

The global `@nestjs/cli` has a known issue on Node 24. All npm scripts call the
local nest binary directly — `npm run start:dev` works without a global install.

## Note that a free stripe account is created. Stripe is used for CC debit or charge.
# Create a free Stripe account at dashboard.stripe.com
Go to Developers → API Keys and copy your test keys
In .env
, replace sk_test_your_stripe_secret_key_here with your real sk_test_... key
In 
.env.local
, replace pk_test_your_stripe_publishable_key_here with your real pk_test_... key
Restart both the backend and frontend dev servers
For testing, use Stripe's test cards: 4242 4242 4242 4242 (any future expiry, any CVV) simulates a successful payment from any country.

# connection string on Neon for PROD: postgresql://neondb_owner:npg_TsfClProEp76@ep-still-salad-b4bob4ko-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# connection string on Neon for DEV: postgresql://neondb_owner:npg_TsfClProEp76@ep-small-moon-b4et38ty-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Github Account:  t.obi@exonsciences.co.uk
