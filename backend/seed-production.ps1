# ============================================================
# Run seeds against PRODUCTION Neon database
# Usage: .\seed-production.ps1 -NeonUrl "postgresql://user:pass@host/db?sslmode=require"
# ============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$NeonUrl
)

Write-Host ""
Write-Host "============================================================"
Write-Host "  PRODUCTION SEED — Neon PostgreSQL"
Write-Host "============================================================"
Write-Host "  Database: $($NeonUrl.Split('@')[1].Split('/')[0])"
Write-Host ""
Write-Host "  ⚠️  This writes to your LIVE production database."
Write-Host ""

$confirm = Read-Host "  Type YES to continue"
if ($confirm -ne "YES") {
    Write-Host "  Cancelled."
    exit 0
}

# Temporarily set DATABASE_URL for this session only
$env:DATABASE_URL = $NeonUrl

Write-Host ""
Write-Host "Step 1/3: Running seed.js (users + categories)..."
node prisma/seed.js
if ($LASTEXITCODE -ne 0) { Write-Host "❌ seed.js failed"; exit 1 }

Write-Host ""
Write-Host "Step 2/3: Running seed-courses.js (course catalog)..."
node prisma/seed-courses.js
if ($LASTEXITCODE -ne 0) { Write-Host "❌ seed-courses.js failed"; exit 1 }

Write-Host ""
Write-Host "Step 3/4: Running Course 01 seed (UK Startup to Closure)..."
node prisma/seed-course-01-uk-startup-to-closure.js
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Course 01 seed failed"; exit 1 }

Write-Host ""
Write-Host "Step 4/4: Running Course 03 seed (CRA Foundation)..."
node prisma/seed-course-03-cra-foundation.js
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Course 03 seed failed"; exit 1 }

Write-Host ""
Write-Host "============================================================"
Write-Host "  ✅ ALL SEEDS COMPLETE — Production database updated"
Write-Host "  Visit: https://learn.clinicalresearchnexus.co.uk/courses"
Write-Host "============================================================"
Write-Host ""
