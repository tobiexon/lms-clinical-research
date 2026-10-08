/**
 * COURSE 06: Clinical Data Management Principles
 * ────────────────────────────────────────────────
 * CDM lifecycle: protocol review → CRF design → EDC build → data cleaning
 * → query management → medical coding → reconciliation → database lock.
 * Content format: HTML strings (rendered via dangerouslySetInnerHTML).
 *
 * Videos — real YouTube videos related to each module topic:
 *   Module 1: "Introduction to Clinical Data Management" – Anuja Dharkar
 *             https://www.youtube.com/watch?v=RY9_JwCX7-o
 *   Module 2: "CRF Design & EDC Systems in Clinical Trials"
 *             https://www.youtube.com/watch?v=QyLMCFygfCE
 *   Module 3: "CDISC CDASH & SDTM Standards Explained"
 *             https://www.youtube.com/watch?v=r3u_-7G8LbQ
 *   Module 4: "Data Cleaning, Query Management & Medical Coding"
 *             https://www.youtube.com/watch?v=Fo0C0v_NHGE
 *   Module 5: "Database Lock & Regulatory Submission"
 *             https://www.youtube.com/watch?v=hNe9K3G3sAM
 *
 * Run: node prisma/seed-course-06-clinical-data-management.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'clinical-data-management-principles';

const VIDEOS = {
  welcome:       'https://www.youtube.com/watch?v=RY9_JwCX7-o',   // Intro to CDM
  crfEdc:        'https://www.youtube.com/watch?v=QyLMCFygfCE',   // CRF & EDC
  cdisc:         'https://www.youtube.com/watch?v=r3u_-7G8LbQ',   // CDISC CDASH/SDTM
  dataCleaning:  'https://www.youtube.com/watch?v=Fo0C0v_NHGE',   // Data cleaning & queries
  dbLock:        'https://www.youtube.com/watch?v=hNe9K3G3sAM',   // Database lock
};

// ─────────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// ─────────────────────────────────────────────────────────────

const CONTENT = {};

// ══════════════════════════════════════════════════════════════
// MODULE 1 — Introduction to Clinical Data Management
// ══════════════════════════════════════════════════════════════

CONTENT.welcome = `
<h1>Welcome to Clinical Data Management Principles</h1>
<p>Clinical Data Management (CDM) is the systematic, disciplined process of collecting, validating, cleaning, coding, reconciling, and archiving clinical trial data. Every regulatory submission made to the MHRA, FDA, or EMA rests on the foundation of high-quality CDM — and the quality of that data determines whether a medicine reaches patients.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Aspiring and practising Data Managers</strong> entering the CDM role in pharma or CRO settings</li>
  <li><strong>Clinical Research Associates (CRAs)</strong> who need to understand what happens to data after they verify it at site</li>
  <li><strong>Study Coordinators and Research Nurses</strong> completing eCRFs and resolving queries</li>
  <li><strong>Regulatory Affairs professionals</strong> who need to understand submission-ready data requirements</li>
  <li><strong>Statisticians and Statistical Programmers</strong> wanting to understand the CDM pipeline upstream of analysis</li>
</ul>

<h2>What You Will Achieve</h2>
<ol>
  <li>Explain the end-to-end CDM lifecycle from protocol review to database lock</li>
  <li>Design CRFs aligned with CDISC CDASH standards</li>
  <li>Apply ALCOA-CCEA data integrity principles to all clinical data</li>
  <li>Manage edit checks, query workflows, and data cleaning processes</li>
  <li>Execute medical coding using MedDRA and WHODrug</li>
  <li>Perform data reconciliation and execute database lock correctly</li>
</ol>

<blockquote>💡 <strong>Watch the video above</strong> for a complete introduction to clinical data management — what it is, why it matters, and where it sits in the clinical trial lifecycle.</blockquote>

<h2>Course Structure</h2>
<p>The course has 5 modules, each with a video lesson and a detailed reading, plus a module quiz. A 15-question final assessment unlocks your certificate. Pass mark throughout: <strong>70%</strong>.</p>

<div class="info-box">
  <div class="info-box-title">📌 The Golden Rule of CDM</div>
  <p>In clinical research: <strong>IF not documented = Not Done.</strong> Every data point must be traceable to its source, recorded contemporaneously, and verifiable by a monitor, auditor, or regulator at any time. This is the ALCOA-CCEA standard — and it underpins everything you will learn in this course.</p>
</div>
`;

CONTENT.cdmOverview = `
<h1>The CDM Lifecycle: From Protocol to Database Lock</h1>
<p>Clinical Data Management is not a single task — it is a structured workflow that spans the entire life of a clinical trial. Understanding the full lifecycle, the roles involved, and the documents produced at each stage is essential for anyone working with trial data.</p>
<hr/>

<h2>Where CDM Fits in the Drug Development Process</h2>
<p>The drug lifecycle moves from Discovery → Preclinical → Clinical Phases 1–3 → Regulatory Approval → Post-Market Surveillance (Phase 4). CDM is active across <strong>all clinical phases</strong> and intensifies during the conduct and close-out of Phase 2 and 3 trials, where the volume of data is largest and the regulatory stakes are highest.</p>

<table>
  <tr><th>Trial Phase</th><th>CDM Activities</th></tr>
  <tr><td><strong>Start-up</strong></td><td>Protocol review; CRF design; database build; validation; Data Management Plan (DMP) authoring; edit check programming</td></tr>
  <tr><td><strong>Conduct</strong></td><td>Data entry; query issuance and resolution; ongoing data cleaning; medical coding; SDV liaison; safety reconciliation</td></tr>
  <tr><td><strong>Close-out</strong></td><td>Final data cleaning; reconciliation (SAE, lab, PK); database lock; archiving; transfer to statistics</td></tr>
</table>
<hr/>

<h2>The CDM Lifecycle — Step by Step</h2>

<h3>Step 1: Protocol Review</h3>
<p>The DM team reviews the protocol before trial start to identify all data points that need to be collected. Key outputs:</p>
<ul>
  <li><strong>CRF Annotation</strong> — mapping protocol requirements to CRF fields</li>
  <li><strong>Data Management Plan (DMP)</strong> — the master document describing all CDM processes for the trial</li>
  <li><strong>Schedule of Assessments</strong> review — confirming what data is collected at each visit</li>
</ul>

<h3>Step 2: CRF Design</h3>
<p>Case Report Forms (CRFs) — either paper or electronic — are the primary data collection instruments. CRFs must be designed in alignment with the protocol and <strong>CDISC CDASH standards</strong> (covered in Module 3).</p>

<h3>Step 3: Database Build and Validation</h3>
<p>The EDC (Electronic Data Capture) system is configured with the CRF structure, edit checks (validation rules), and workflow logic. The database undergoes formal <strong>User Acceptance Testing (UAT)</strong> before going live.</p>

<h3>Step 4: Data Entry and Ongoing Cleaning</h3>
<p>Site staff enter data into the EDC. The system applies edit checks in real-time, generating queries for data that fails validation. The DM team issues additional manual queries and performs ongoing data cleaning reviews.</p>

<h3>Step 5: Query Management</h3>
<p>Queries are issued to sites to resolve data discrepancies. Sites respond with corrections or clarifications. All query activity is tracked in the EDC audit trail.</p>

<h3>Step 6: Medical Coding</h3>
<p>Adverse events are coded using <strong>MedDRA</strong>; prior and concomitant medications are coded using <strong>WHODrug</strong>. Coding ensures standardised terminology for regulatory submissions and signal detection.</p>

<h3>Step 7: Reconciliation</h3>
<p>Key external datasets are reconciled with the EDC database before lock:</p>
<ul>
  <li><strong>SAE reconciliation</strong> — EDC SAE data vs pharmacovigilance SAE database</li>
  <li><strong>Lab reconciliation</strong> — EDC lab values vs central laboratory system</li>
  <li><strong>PK/PD reconciliation</strong> — EDC dosing data vs bioanalytical data</li>
  <li><strong>IMP reconciliation</strong> — EDC dispensing data vs pharmacy records</li>
</ul>

<h3>Step 8: Database Lock</h3>
<p>Once all data is clean and reconciled, the database is <strong>locked</strong> — write access is removed and no further changes are permitted without exceptional, documented approval. The locked dataset is transferred to the biostatistics team for analysis.</p>
<hr/>

<h2>Key CDM Documents</h2>
<table>
  <tr><th>Document</th><th>Purpose</th></tr>
  <tr><td><strong>Data Management Plan (DMP)</strong></td><td>Master document describing all CDM processes, responsibilities, and timelines for the trial</td></tr>
  <tr><td><strong>CRF Completion Guidelines (CCG)</strong></td><td>Instructions for site staff on how to correctly complete each CRF field</td></tr>
  <tr><td><strong>Edit Check Specification (ECS)</strong></td><td>Defines all programmed validation rules applied to the EDC</td></tr>
  <tr><td><strong>Data Validation Plan (DVP)</strong></td><td>Describes manual and programmed data review processes</td></tr>
  <tr><td><strong>SAE Reconciliation Plan</strong></td><td>Process for comparing EDC SAE data with the pharmacovigilance safety database</td></tr>
  <tr><td><strong>Database Lock Checklist</strong></td><td>All tasks required to be completed before the database can be locked</td></tr>
  <tr><td><strong>Coding Report</strong></td><td>Summary of MedDRA and WHODrug coding decisions requiring medical review</td></tr>
</table>
<hr/>

<h2>Key CDM Roles</h2>
<table>
  <tr><th>Role</th><th>Responsibilities</th></tr>
  <tr><td><strong>Clinical Data Manager (CDM)</strong></td><td>Owns the DMP; oversees CRF design, database build, data cleaning, and database lock</td></tr>
  <tr><td><strong>Data Entry Specialist</strong></td><td>Enters data from paper CRFs into the EDC (paper-based trials)</td></tr>
  <tr><td><strong>Medical Coder</strong></td><td>Assigns MedDRA and WHODrug codes under medical review</td></tr>
  <tr><td><strong>Database Programmer</strong></td><td>Builds and validates the EDC system; programs edit checks</td></tr>
  <tr><td><strong>CRA / Monitor</strong></td><td>Verifies data at site (SDV/SDR); resolves queries with site; confirms data integrity</td></tr>
  <tr><td><strong>Site Staff (Research Nurse / Coordinator)</strong></td><td>Enter data directly into EDC; respond to queries; correct data with ALCOA-compliant corrections</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 CDM and the CRA — How They Connect</div>
  <p>From the CRA perspective, CDM is the system that processes and validates the data you verify at site. When you perform Source Data Verification (SDV), you are confirming that EDC data matches the source. When you review the SAE log, you are contributing to the SAE reconciliation process. CDM and monitoring are complementary quality functions — both essential for a clean, submission-ready dataset.</p>
</div>

<h2>ALCOA-CCEA — The Data Integrity Standard</h2>
<p>All clinical trial data — whether entered into paper CRFs or directly into an EDC — must comply with the <strong>ALCOA-CCEA</strong> data integrity principles:</p>
<table>
  <tr><th>Attribute</th><th>What It Requires</th></tr>
  <tr><td><strong>A — Attributable</strong></td><td>It must be clear who recorded or changed data, and when. Audit trails in EDC systems capture this automatically.</td></tr>
  <tr><td><strong>L — Legible</strong></td><td>Data must be permanently readable. In paper CRFs: no scribbling out; single strikethrough with date/initials/reason.</td></tr>
  <tr><td><strong>C — Contemporaneous</strong></td><td>Data must be recorded at the time of observation — not retrospectively.</td></tr>
  <tr><td><strong>O — Original</strong></td><td>The first recording is the source. Copies must be verified against the original.</td></tr>
  <tr><td><strong>A — Accurate</strong></td><td>Data must exactly reflect the observation or measurement.</td></tr>
  <tr><td><strong>C — Complete</strong></td><td>No unexplained missing fields. All required data must be recorded.</td></tr>
  <tr><td><strong>C — Consistent</strong></td><td>Dates, times, and values must be internally consistent across all documents.</td></tr>
  <tr><td><strong>E — Enduring</strong></td><td>Records must be retained and retrievable for the full required archive period.</td></tr>
  <tr><td><strong>A — Available</strong></td><td>Data must be accessible for review, audit, or inspection when needed.</td></tr>
</table>
<p>These nine principles come directly from the clinical research training document used in UK CRA programmes and are enforced during MHRA inspections. A violation of any one of these principles is a data integrity finding — which can be Minor, Major, or Critical depending on impact.</p>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 2 — CRF Design & EDC Systems
// ══════════════════════════════════════════════════════════════

CONTENT.crfDesign = `
<h1>CRF Design &amp; Electronic Data Capture (EDC) Systems</h1>
<p>The Case Report Form is the primary instrument for collecting clinical trial data. Whether paper or electronic, every CRF must be designed to capture exactly what the protocol requires — accurately, completely, and in a way that is traceable back to the source document.</p>
<hr/>

<h2>What Is a CRF?</h2>
<p>A <strong>Case Report Form (CRF)</strong> is a printed, optical, or electronic document designed to record all the protocol-required information to be reported to the sponsor on each trial subject. CRFs are the bridge between the patient's source data (medical records, lab reports, diary cards) and the sponsor's database.</p>

<h3>Paper CRF vs Electronic CRF (eCRF)</h3>
<table>
  <tr><th>Feature</th><th>Paper CRF</th><th>eCRF (EDC)</th></tr>
  <tr><td>Data entry</td><td>Handwritten at site</td><td>Direct computer entry at site</td></tr>
  <tr><td>Query generation</td><td>Manual — DM reviews data after receipt</td><td>Automated edit checks at point of entry</td></tr>
  <tr><td>Audit trail</td><td>Manual corrections with date/initials</td><td>Automatic — every change logged with timestamp and user ID</td></tr>
  <tr><td>Query resolution speed</td><td>Slow — physical document cycle</td><td>Fast — electronic query workflow</td></tr>
  <tr><td>Risk of data loss</td><td>High — paper can be lost or damaged</td><td>Low — backed up in cloud/server</td></tr>
  <tr><td>Current industry standard</td><td>Rare (legacy trials)</td><td>Standard (>95% of trials use EDC)</td></tr>
</table>
<hr/>

<h2>Principles of Good CRF Design</h2>
<p>A well-designed CRF collects everything the protocol requires — and nothing more. Good CRF design follows these principles:</p>
<ol>
  <li><strong>Protocol-driven</strong> — every field maps to a protocol-specified data point. No field should exist without a protocol rationale.</li>
  <li><strong>CDISC CDASH-aligned</strong> — use standardised field names and structures to ensure data maps cleanly to SDTM for regulatory submission.</li>
  <li><strong>Unambiguous</strong> — each question has only one valid interpretation. Avoid open text where structured data (drop-down, checkbox, date picker) can be used.</li>
  <li><strong>Simple for site staff</strong> — the CRF should be completed correctly the first time. Complexity drives errors and queries.</li>
  <li><strong>Aligned with source documents</strong> — fields should mirror what the source document (medical record, lab report) actually contains.</li>
  <li><strong>Includes CRF Completion Guidelines (CCG)</strong> — every field has documented instructions so all sites complete it consistently.</li>
</ol>

<h3>Common CRF Modules</h3>
<table>
  <tr><th>Module</th><th>Data Collected</th></tr>
  <tr><td>Demographics</td><td>Age, sex, race/ethnicity, weight, height</td></tr>
  <tr><td>Informed Consent</td><td>Consent date; consent version; witness if applicable</td></tr>
  <tr><td>Inclusion/Exclusion Criteria</td><td>Eligibility checklist — each criterion confirmed Yes/No</td></tr>
  <tr><td>Medical History</td><td>Prior conditions, allergies, surgeries</td></tr>
  <tr><td>Prior/Concomitant Medications</td><td>Drug name, dose, indication, start/stop dates</td></tr>
  <tr><td>Vital Signs</td><td>BP, heart rate, temperature, weight — per protocol schedule</td></tr>
  <tr><td>Laboratory Results</td><td>Haematology, biochemistry, urinalysis — per protocol</td></tr>
  <tr><td>Adverse Events</td><td>AE term, onset/resolution dates, CTCAE grade, causality, action taken, outcome</td></tr>
  <tr><td>SAE Report</td><td>SAE-specific data: seriousness criteria, relationship to IMP, reporter details</td></tr>
  <tr><td>Investigational Product</td><td>Dispensing, administration, dose modifications, returns/accountability</td></tr>
  <tr><td>Study Completion/Early Termination</td><td>Reason for completion or withdrawal</td></tr>
</table>
<hr/>

<h2>Electronic Data Capture (EDC) Systems</h2>
<p>EDC systems are software platforms that host the electronic CRF, manage data entry, generate and track queries, and maintain an audit trail. They are the central technology platform in modern CDM.</p>

<h3>Industry EDC Systems</h3>
<table>
  <tr><th>System</th><th>Provider</th><th>Notes</th></tr>
  <tr><td><strong>Medidata Rave</strong></td><td>Medidata (Dassault Systèmes)</td><td>Market leader for large Phase 2/3 trials; highly configurable</td></tr>
  <tr><td><strong>Veeva Vault EDC</strong></td><td>Veeva Systems</td><td>Integrated with Veeva Vault CTMS and eTMF — growing rapidly</td></tr>
  <tr><td><strong>Oracle Clinical</strong></td><td>Oracle</td><td>Legacy platform widely used in large pharma</td></tr>
  <tr><td><strong>OpenClinica</strong></td><td>OpenClinica</td><td>Open-source; used in academic and non-commercial trials</td></tr>
  <tr><td><strong>REDCap</strong></td><td>Vanderbilt University</td><td>Widely used in academic research; free for non-commercial use</td></tr>
  <tr><td><strong>Castor EDC</strong></td><td>Castor</td><td>Popular in European academic trials</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 Site Access to EDC — Key Rule</div>
  <p>Site staff require access to the <strong>EDC</strong> and <strong>IRT</strong> (Interactive Response Technology — for randomisation and IP management) but do <strong>NOT</strong> require access to the CTMS or eTMF. The EDC is the site's primary working system. Access to EDC must be set up before the Site Initiation Visit (SIV) — this is checked by the CRA at the SIV.</p>
</div>
<hr/>

<h2>Edit Checks — Automated Data Validation</h2>
<p>Edit checks (also called <strong>validation rules</strong>) are programmed rules in the EDC that flag data inconsistencies automatically when data is entered. They are the first line of automated data quality control.</p>

<h3>Types of Edit Checks</h3>
<table>
  <tr><th>Type</th><th>Example</th></tr>
  <tr><td><strong>Range check</strong></td><td>Heart rate must be between 30–200 bpm. If entered as 220, query fires.</td></tr>
  <tr><td><strong>Date check</strong></td><td>AE onset date cannot be before informed consent date</td></tr>
  <tr><td><strong>Consistency check</strong></td><td>If AE "ongoing" = Yes, resolution date must be blank</td></tr>
  <tr><td><strong>Completeness check</strong></td><td>If a visit was completed, all mandatory fields must be populated</td></tr>
  <tr><td><strong>Cross-form check</strong></td><td>Subject weight on Visit 2 cannot differ from Visit 1 weight by more than 20%</td></tr>
  <tr><td><strong>Derived calculation</strong></td><td>BMI = weight (kg) ÷ height (m)². If calculated BMI ≠ entered BMI, query fires.</td></tr>
</table>

<h3>Soft vs Hard Edits</h3>
<ul>
  <li><strong>Soft edit (warning):</strong> The data fails a check but the system allows the user to override with a reason. Used for plausible-but-unusual values (e.g. unusually tall patient).</li>
  <li><strong>Hard edit (error):</strong> The system prevents the user from saving the form until the discrepancy is resolved. Used for impossible values (e.g. negative weight).</li>
</ul>
`;

CONTENT.edcWorkflow = `
<h1>EDC Workflow, Data Entry, and the Role of the CRA</h1>
<p>Understanding how data flows through an EDC system — from site entry to sponsor review — clarifies the relationship between CDM and clinical monitoring, and defines exactly what the CRA's role is in maintaining data quality.</p>
<hr/>

<h2>The EDC Data Flow</h2>
<ol>
  <li><strong>Patient visit</strong> — source data is generated (vital signs measured, blood taken, examinations performed). Source documents are created contemporaneously.</li>
  <li><strong>eCRF entry</strong> — site staff enter data into the EDC, ideally within 24–48 hours of the visit. Edit checks fire immediately for any validation failures.</li>
  <li><strong>System queries</strong> — automated edit checks generate queries for data that fails validation rules. Site staff see queries in their EDC worklist.</li>
  <li><strong>SDV by CRA</strong> — the CRA visits the site (or performs remote SDV) to verify that EDC data matches the source. Discrepancies are documented as findings.</li>
  <li><strong>Manual queries from DM</strong> — the data management team performs manual data review and issues additional queries for issues not caught by edit checks.</li>
  <li><strong>Query resolution</strong> — site staff resolve queries in the EDC. All responses create an audit trail entry.</li>
  <li><strong>Data cleaning cycle repeats</strong> until all data is clean.</li>
  <li><strong>Database lock</strong> — final state after all cleaning is complete.</li>
</ol>
<hr/>

<h2>Source Data Verification (SDV) vs Source Document Review (SDR)</h2>
<p>These are two complementary monitoring approaches — both performed by the CRA at site or remotely:</p>
<table>
  <tr><th>Approach</th><th>What It Involves</th><th>When Used</th></tr>
  <tr>
    <td><strong>SDV (100%)</strong></td>
    <td>Every data point in the EDC is verified against the source document</td>
    <td>Traditional approach; high-risk or complex data fields</td>
  </tr>
  <tr>
    <td><strong>SDR</strong></td>
    <td>Source documents are reviewed for completeness, plausibility, and GCP compliance — without line-by-line EDC comparison</td>
    <td>Risk-based monitoring (RBM); lower-risk data fields</td>
  </tr>
  <tr>
    <td><strong>Targeted SDV</strong></td>
    <td>SDV performed on a statistically selected sample of data fields</td>
    <td>Risk-based monitoring; common in modern trials</td>
  </tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 Risk-Based Monitoring (RBM)</div>
  <p>Modern trials increasingly use <strong>Risk-Based Monitoring (RBM)</strong> rather than 100% SDV. Under RBM, centralised statistical monitoring flags outliers and trends in the EDC data, directing the CRA to focus on-site efforts on the highest-risk data fields and sites. This approach is endorsed by ICH E6(R3) and is standard practice at most large CROs.</p>
</div>
<hr/>

<h2>Query Lifecycle in the EDC</h2>
<p>A query is a formal request for clarification or correction of a data discrepancy. Every query follows a defined lifecycle:</p>
<ol>
  <li><strong>Query Issued</strong> — system (automated) or DM/CRA (manual) identifies a discrepancy and opens a query with a description and required action</li>
  <li><strong>Query Open</strong> — site staff see the query in their worklist; the data field is flagged</li>
  <li><strong>Query Response</strong> — site staff respond with a correction, clarification, or confirmed original value (with reason). All responses are audit-trailed.</li>
  <li><strong>Query Closed</strong> — DM/CRA reviews the response; if satisfactory, closes the query. If not satisfactory, the query is re-opened.</li>
  <li><strong>Query Cancelled</strong> — if the query was raised in error, it is cancelled with a reason.</li>
</ol>

<h3>Query Metrics — Why They Matter</h3>
<p>Query closure rates are a key <strong>CRA metric</strong> tracked by the sponsor and CRO. An open query count is reviewed at every monitoring visit, and prolonged open queries may indicate site compliance issues. A high query rate at a particular site may trigger targeted monitoring or additional training.</p>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 3 — CDISC Standards: CDASH, SDTM & ADaM
// ══════════════════════════════════════════════════════════════

CONTENT.cdiscStandards = `
<h1>CDISC Standards: CDASH, SDTM &amp; ADaM</h1>
<p>CDISC (Clinical Data Interchange Standards Consortium) is a global non-profit organisation that develops and maintains data standards for clinical research. Understanding CDISC standards is now essential for anyone working in CDM — the FDA and EMA both require CDISC-compliant data submissions for New Drug Applications and Marketing Authorisation Applications.</p>
<hr/>

<h2>Why CDISC Standards Exist</h2>
<p>Before CDISC, every sponsor structured their clinical trial data differently. Regulators received submissions in hundreds of incompatible formats, making review slow, expensive, and error-prone. CDISC solved this by creating a single, internationally agreed data standard — enabling:</p>
<ul>
  <li>Faster regulatory review (reviewers learn one data structure, not thousands)</li>
  <li>Data reuse and aggregation across studies</li>
  <li>Improved signal detection by combining data from multiple trials</li>
  <li>Automation of data quality checks by regulators</li>
</ul>
<hr/>

<h2>The CDISC Standards Stack</h2>
<table>
  <tr><th>Standard</th><th>Full Name</th><th>Where It Applies</th></tr>
  <tr><td><strong>CDASH</strong></td><td>Clinical Data Acquisition Standards Harmonization</td><td>CRF data collection (what fields to collect and how to name them)</td></tr>
  <tr><td><strong>SDTM</strong></td><td>Study Data Tabulation Model</td><td>Regulatory submission datasets (how collected data is tabulated for FDA/EMA)</td></tr>
  <tr><td><strong>ADaM</strong></td><td>Analysis Data Model</td><td>Analysis-ready datasets derived from SDTM (what statisticians use)</td></tr>
  <tr><td><strong>SEND</strong></td><td>Standard for Exchange of Nonclinical Data</td><td>Preclinical/animal study data for regulatory submission</td></tr>
  <tr><td><strong>DEFINE-XML</strong></td><td>Data Definition Specification</td><td>Machine-readable metadata document submitted with SDTM/ADaM datasets</td></tr>
</table>
<hr/>

<h2>CDASH — Clinical Data Acquisition Standards Harmonization</h2>
<p>CDASH defines a standard way to <strong>collect data</strong> — specifically, the field names, formats, and controlled terminology used in CRFs. CDASH ensures that data collected at the CRF level maps cleanly and traceably into SDTM datasets for submission.</p>

<h3>CDASH Domains</h3>
<p>Data is organised into <strong>domains</strong> — logical groupings of related data. Each domain has a two-letter abbreviation:</p>
<table>
  <tr><th>Domain</th><th>Abbreviation</th><th>Data Type</th></tr>
  <tr><td>Demographics</td><td>DM</td><td>Age, sex, race, ethnicity</td></tr>
  <tr><td>Adverse Events</td><td>AE</td><td>AE terms, dates, severity, causality</td></tr>
  <tr><td>Concomitant Medications</td><td>CM</td><td>Drug name, dose, dates, indication</td></tr>
  <tr><td>Exposure</td><td>EX</td><td>IMP dosing records</td></tr>
  <tr><td>Vital Signs</td><td>VS</td><td>BP, HR, temp, weight, height</td></tr>
  <tr><td>Laboratory Results</td><td>LB</td><td>Lab test names, results, units, normal ranges</td></tr>
  <tr><td>Medical History</td><td>MH</td><td>Prior conditions, diagnoses</td></tr>
  <tr><td>Inclusion/Exclusion</td><td>IE</td><td>Eligibility criteria responses</td></tr>
  <tr><td>Subject Visits</td><td>SV</td><td>Visit dates, completion status</td></tr>
  <tr><td>Informed Consent</td><td>IC</td><td>Consent date, version, category</td></tr>
</table>

<h3>CDASH Core Fields</h3>
<p>For each domain, CDASH defines <strong>Core</strong>, <strong>Required</strong>, and <strong>Optional</strong> fields. For example, in the AE domain:</p>
<ul>
  <li><strong>AETERM</strong> — verbatim adverse event term (as reported by site)</li>
  <li><strong>AESTDTC</strong> — AE start date/time (ISO 8601 format: YYYY-MM-DD)</li>
  <li><strong>AEENDTC</strong> — AE end date/time</li>
  <li><strong>AESEV</strong> — severity (MILD/MODERATE/SEVERE)</li>
  <li><strong>AEREL</strong> — causality relationship to IMP</li>
  <li><strong>AEOUT</strong> — outcome (RECOVERED/RECOVERING/NOT RECOVERED/FATAL/UNKNOWN)</li>
  <li><strong>AESER</strong> — seriousness flag (Y/N)</li>
</ul>
<hr/>

<h2>SDTM — Study Data Tabulation Model</h2>
<p>SDTM defines how <strong>collected data is restructured</strong> into standardised tabulation datasets for submission to the FDA and EMA. SDTM datasets are created by statistical programmers during the database close-out phase, derived from the cleaned EDC data.</p>

<h3>SDTM Structure</h3>
<p>Every SDTM dataset record contains:</p>
<ul>
  <li><strong>STUDYID</strong> — unique study identifier</li>
  <li><strong>DOMAIN</strong> — two-letter domain code (AE, CM, LB, etc.)</li>
  <li><strong>USUBJID</strong> — unique subject identifier (combining study + site + subject number)</li>
  <li>Domain-specific variables (e.g. AETERM, AESTDTC for the AE domain)</li>
  <li><strong>--SEQ</strong> — sequence number for multiple records per subject per domain</li>
</ul>
<hr/>

<h2>ADaM — Analysis Data Model</h2>
<p>ADaM datasets are <strong>derived from SDTM</strong> for use in statistical analysis. They are the datasets that the biostatistics team uses to generate tables, listings, and figures for the Clinical Study Report (CSR). Key ADaM datasets:</p>
<ul>
  <li><strong>ADSL</strong> — Subject-Level Analysis Dataset: one record per subject; all analysis flags and population assignments</li>
  <li><strong>ADAE</strong> — Adverse Events Analysis Dataset</li>
  <li><strong>ADLB</strong> — Laboratory Analysis Dataset</li>
  <li><strong>ADEX</strong> — Exposure Analysis Dataset</li>
</ul>
<hr/>

<h2>Controlled Terminology</h2>
<p>CDISC standards use <strong>controlled terminology</strong> — standardised code lists for fields like severity, causality, and outcome. Using controlled terminology ensures that data from different trials can be combined and compared. Examples:</p>
<table>
  <tr><th>Field</th><th>Allowed Values</th></tr>
  <tr><td>AESEV (AE Severity)</td><td>MILD | MODERATE | SEVERE</td></tr>
  <tr><td>AEOUT (AE Outcome)</td><td>RECOVERED/RESOLVED | RECOVERING/RESOLVING | NOT RECOVERED/NOT RESOLVED | RECOVERED/RESOLVED WITH SEQUELAE | FATAL | UNKNOWN</td></tr>
  <tr><td>SEX</td><td>M | F | U (Unknown) | UNDIFFERENTIATED</td></tr>
  <tr><td>NY (Yes/No responses)</td><td>Y | N</td></tr>
</table>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 4 — Data Cleaning, Query Management & Medical Coding
// ══════════════════════════════════════════════════════════════

CONTENT.dataCleaning = `
<h1>Data Cleaning, Query Management &amp; Medical Coding</h1>
<p>Data cleaning is the systematic process of identifying and resolving discrepancies, inconsistencies, and missing data in the trial database. It is the most labour-intensive phase of CDM and the one that has the most direct impact on data quality and regulatory compliance.</p>
<hr/>

<h2>The Data Cleaning Process</h2>
<p>Data cleaning in clinical trials is not a single event — it is a continuous cycle that runs throughout the trial and intensifies at close-out. The process has two parallel tracks:</p>

<h3>Track 1: Automated Cleaning (Edit Checks)</h3>
<p>Edit checks fire automatically when data is entered or saved in the EDC. They are the first line of defence against data entry errors. See Module 2 for the full edit check taxonomy.</p>

<h3>Track 2: Manual Cleaning (Data Review)</h3>
<p>The DM team performs scheduled manual data reviews — examining data listings, running custom queries against the database, and cross-checking data across forms and subjects. Manual cleaning catches issues that programmed edit checks cannot detect, such as:</p>
<ul>
  <li>Implausible but technically valid values (e.g. a patient's height listed as 2.1 m — unlikely but passes a range check)</li>
  <li>Inconsistencies between non-linked forms (e.g. AE start date before the trial start date)</li>
  <li>Missing data patterns across a site (suggesting a systematic data collection problem)</li>
  <li>Protocol deviations embedded in the data (e.g. a visit completed outside the allowed window)</li>
</ul>
<hr/>

<h2>Quality Issues in Clinical Trial Data</h2>
<p>Data quality issues can be caused by a variety of behaviours including <strong>fraud, misconduct, intentional or unintentional noncompliance, and significant carelessness</strong>. Regardless of how these behaviours are defined, they may compromise the validity of the study results.</p>
<p>Reliable study results and quality data are needed to evaluate products for marketing approval and for decisions that are made on the use of medicine. <strong>Early detection of data quality issues is important</strong> so that corrective actions can be implemented during the conduct of the trial, recurrence can be prevented, and data quality can be preserved.</p>

<div class="key-points">
  <div class="key-points-title">✅ Types of Data Quality Issues</div>
  <ul>
    <li><strong>Missing data</strong> — required fields not completed; no explanation provided</li>
    <li><strong>Erroneous data</strong> — values that conflict with source documents (SDV finding)</li>
    <li><strong>Inconsistent data</strong> — data that contradicts other data in the same subject's record</li>
    <li><strong>Out-of-range data</strong> — values outside physiologically plausible or protocol-specified ranges</li>
    <li><strong>Protocol deviations</strong> — data that reflects a departure from the protocol (e.g. wrong visit window, wrong dose administered)</li>
    <li><strong>Coding issues</strong> — verbatim AE terms that cannot be coded to a MedDRA Preferred Term without medical review</li>
  </ul>
</div>
<hr/>

<h2>Data Clarification Forms (DCFs)</h2>
<p>In paper-based trials, discrepancies are communicated to sites via a <strong>Data Clarification Form (DCF)</strong> — a written request for clarification or correction. In EDC-based trials, the equivalent is an electronic query. Key rules for DCFs:</p>
<ul>
  <li>DCFs must be responded to by an authorised member of the site staff (as per the Delegation Log)</li>
  <li>The site's response must be signed and dated by the PI or delegated staff member</li>
  <li>All corrections to source documents must follow ALCOA-CCEA principles (single strikethrough, correction, date, initials, reason)</li>
  <li>DCFs are filed in the Investigator Site File (ISF) and the eTMF</li>
</ul>
<hr/>

<h2>Medical Coding — MedDRA and WHODrug</h2>
<p>Medical coding converts free-text clinical terms (verbatim terms, as entered by site staff) into standardised dictionary codes. This is essential for regulatory submissions, signal detection, and cross-study data aggregation.</p>

<h3>MedDRA — Medical Dictionary for Regulatory Activities</h3>
<p>MedDRA is the international medical terminology dictionary used to code adverse events, medical history, and indications. It is maintained by ICH and updated twice yearly (March and September). MedDRA has a five-level hierarchy:</p>
<table>
  <tr><th>Level</th><th>Name</th><th>Abbreviation</th><th>Example</th></tr>
  <tr><td>1 (Broadest)</td><td>System Organ Class</td><td>SOC</td><td>Nervous system disorders</td></tr>
  <tr><td>2</td><td>High Level Group Term</td><td>HLGT</td><td>Neurological disorders NEC</td></tr>
  <tr><td>3</td><td>High Level Term</td><td>HLT</td><td>Cerebrovascular disorders</td></tr>
  <tr><td>4</td><td>Preferred Term</td><td>PT</td><td>Ischaemic stroke</td></tr>
  <tr><td>5 (Most Specific)</td><td>Lowest Level Term</td><td>LLT</td><td>Acute ischaemic stroke</td></tr>
</table>

<p><strong>ICSRs and regulatory submissions use the Preferred Term (PT) level.</strong> The verbatim term entered by site staff (e.g. "stroke on left side") maps to an LLT, which then rolls up to a PT, HLT, HLGT, and SOC.</p>

<h3>Coding Rules</h3>
<ul>
  <li>Coding must be performed by a trained medical coder</li>
  <li>Any verbatim term that cannot be mapped to an existing LLT must be reviewed by a medically qualified reviewer before a new code is assigned</li>
  <li>All coding decisions must be documented and auditable</li>
  <li>A <strong>Coding Report</strong> is generated for medical review at the end of each coding cycle</li>
  <li>When a new MedDRA version is released, impacted codes must be reviewed and updated</li>
</ul>

<h3>WHODrug — Drug Dictionary for Coding Medications</h3>
<p>WHODrug (maintained by the Uppsala Monitoring Centre) is used to code prior and concomitant medications. It maps free-text drug names to standardised <strong>Preferred Name (PN)</strong>, <strong>ATC code</strong> (Anatomical Therapeutic Chemical classification), and <strong>Drug Record Number (DRN)</strong>.</p>

<div class="info-box">
  <div class="info-box-title">📌 Why Medical Coding Matters for Pharmacovigilance</div>
  <p>Standardised MedDRA coding is what makes signal detection possible. If different studies code the same reaction differently (e.g. "liver damage" vs "hepatotoxicity" vs "elevated transaminases"), aggregating data across studies to detect a safety signal becomes impossible. MedDRA coding ensures all data speaks the same language.</p>
</div>
`;

CONTENT.queryManagement = `
<h1>Query Management, CAPA &amp; Data Reconciliation</h1>
<hr/>

<h2>Query Management Workflow</h2>
<p>Queries are formal communications between the DM team/CRA and the site to resolve data discrepancies. In EDC-based trials, queries are managed entirely within the EDC system — site staff see open queries in their worklist and resolve them electronically.</p>

<h3>Query Priority Levels</h3>
<table>
  <tr><th>Priority</th><th>Description</th><th>Resolution Timeline</th></tr>
  <tr><td><strong>Critical</strong></td><td>Data affecting patient safety or study integrity (e.g. unreported SAE, missing informed consent date)</td><td>Immediate — within 24–48 hours</td></tr>
  <tr><td><strong>High</strong></td><td>Protocol-required primary endpoint data missing or incorrect</td><td>Within 5 working days</td></tr>
  <tr><td><strong>Standard</strong></td><td>Secondary data, range checks, consistency errors</td><td>Within 10–15 working days</td></tr>
</table>

<h3>CRA's Role in Query Management</h3>
<p>The CRA is responsible for following up with site personnel to close queries and Action Items — <strong>during Routine Monitoring Visits (RMVs) and in-between visits</strong>. Query closure rates are tracked as a <strong>CRA metric</strong> and reviewed by the clinical team.</p>
<hr/>

<h2>Corrective Action Preventive Action (CAPA)</h2>
<p>CAPA is a quality system plan which aims to resolve compliance issues and prevent any further recurrences. A CAPA plan is crucial to a clinical trial as it helps keep trial participants safe, protects their rights, and prevents study data from being compromised.</p>

<h3>CAPA Process</h3>
<ol>
  <li><strong>Identify</strong> a potential issue (through monitoring, data review, audit, or inspection finding)</li>
  <li><strong>Root cause analysis</strong> — determine the underlying cause, not just the symptom</li>
  <li><strong>Corrective Action</strong> — actions to fix the specific issue that occurred</li>
  <li><strong>Preventive Action</strong> — actions to prevent the same issue from occurring again</li>
  <li><strong>Document</strong> that the corrective and preventive actions were carried out</li>
  <li><strong>Verify effectiveness</strong> — document that the CAPA has resolved the issue</li>
</ol>

<div class="info-box">
  <div class="info-box-title">📌 CAPA in CDM Context</div>
  <p>In CDM, CAPAs are triggered by data quality findings, audit findings, or inspection findings. Examples: persistent high query rates at a specific site trigger a CAPA with retraining; a systematic data entry error triggers a CAPA with corrected data and a site process review. CAPAs must be documented, tracked, and verified as closed.</p>
</div>
<hr/>

<h2>Data Reconciliation</h2>
<p>Reconciliation is the process of comparing data from two or more sources to confirm they are consistent. Before a database can be locked, all key external datasets must be reconciled with the EDC.</p>

<h3>SAE Reconciliation</h3>
<p>The most critical reconciliation — comparing the SAE records in the EDC against the SAE records in the pharmacovigilance (safety) database:</p>
<ul>
  <li>Every SAE recorded in the EDC must have a corresponding record in the PV database — and vice versa</li>
  <li>Key fields compared: subject ID, SAE term (MedDRA PT), onset date, outcome, seriousness criteria, IMP causality, resolution date</li>
  <li>Discrepancies are investigated and resolved before database lock — they may represent missing SAE reports (a compliance issue) or data entry errors</li>
  <li>A formal <strong>SAE Reconciliation Report</strong> is produced and signed off by both the DM and PV teams</li>
</ul>

<h3>Central Laboratory Reconciliation</h3>
<p>Lab results received from central labs are loaded into the EDC. Reconciliation verifies that all expected results are present, correctly matched to subjects and visits, and that values match the central lab's source data.</p>

<h3>IMP (Investigational Medicinal Product) Reconciliation</h3>
<p>Dispensing, administration, and return data in the EDC is reconciled against the pharmacy IMP accountability log. Final IMP reconciliation is completed at the Close-out Visit (COV), where all remaining IMP is accounted for and reconciled.</p>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 5 — Database Lock, Archiving & Regulatory Submission
// ══════════════════════════════════════════════════════════════

CONTENT.databaseLock = `
<h1>Database Lock, Archiving &amp; Regulatory Submission</h1>
<p>Database lock is the final milestone of the CDM lifecycle. It is the point at which the trial dataset is frozen, write access is removed, and the data is handed to the biostatistics team for formal analysis. Everything that follows — the Clinical Study Report, the regulatory submission, and ultimately whether the drug reaches patients — depends on the quality of the locked database.</p>
<hr/>

<h2>Pre-Lock Checklist</h2>
<p>Database lock can only proceed once all items on the pre-lock checklist are complete. Typical requirements include:</p>

<h3>Data Completeness</h3>
<ul>
  <li>All expected data has been entered (all subjects, all visits, all forms)</li>
  <li>No outstanding missing data without documented explanation</li>
  <li>All out-of-window visits documented and assessed for protocol deviation impact</li>
</ul>

<h3>Query Resolution</h3>
<ul>
  <li>All system-generated queries resolved or cancelled with reason</li>
  <li>All manual queries resolved or cancelled</li>
  <li>Zero outstanding open queries (or agreed exceptions with documented rationale)</li>
</ul>

<h3>Reconciliation Sign-Off</h3>
<ul>
  <li>SAE reconciliation complete and signed off by DM and PV teams</li>
  <li>Central lab reconciliation complete</li>
  <li>IMP reconciliation complete</li>
  <li>Any other protocol-specific reconciliations complete</li>
</ul>

<h3>Medical Coding</h3>
<ul>
  <li>All AEs coded to MedDRA PT — no unresolved coding queries</li>
  <li>All concomitant medications coded to WHODrug</li>
  <li>Coding review signed off by medically qualified reviewer</li>
  <li>Current version of MedDRA and WHODrug confirmed</li>
</ul>

<h3>Protocol Deviations</h3>
<ul>
  <li>All protocol deviations identified, categorised (Minor/Major), and recorded in the PD log</li>
  <li>PD log acknowledged and signed by PI</li>
  <li>Impact on analysis populations assessed (e.g. per-protocol exclusions)</li>
</ul>

<h3>Final Review Sign-Offs</h3>
<ul>
  <li>DM sign-off: Data Manager confirms all CDM activities are complete</li>
  <li>Medical Monitor sign-off: Confirms clinical data review is complete</li>
  <li>Biostatistics sign-off: Confirms dataset structure meets analysis requirements</li>
  <li>Sponsor sign-off: Formal authorisation to lock</li>
</ul>
<hr/>

<h2>The Database Lock Process</h2>
<ol>
  <li><strong>Announce the lock date</strong> — communicated to all stakeholders (DM, statistics, medical, PV) typically 2–4 weeks in advance</li>
  <li><strong>Final data entry deadline</strong> — site staff complete any outstanding data entry; no new data is entered after this point</li>
  <li><strong>Final cleaning sprint</strong> — DM team resolves all remaining queries and completes final data review</li>
  <li><strong>Lock readiness meeting</strong> — all sign-off holders confirm their respective checklists are complete</li>
  <li><strong>System lock</strong> — EDC administrator removes write access; a lock certificate/timestamp is generated</li>
  <li><strong>Database extraction</strong> — clean dataset extracted from EDC in agreed format (SAS transport files, CSV, XML)</li>
  <li><strong>Transfer to statistics</strong> — dataset transferred securely to the biostatistics team along with the Data Transfer Agreement</li>
</ol>

<div class="warning-box">
  <p>⚠️ <strong>Unblinding and Database Lock:</strong> In blinded trials, the database is typically locked <strong>before</strong> unblinding. Once lock is confirmed, the randomisation code is broken and statistical analysis proceeds. Locking before unblinding protects against any subconscious bias in final data cleaning decisions.</p>
</div>
<hr/>

<h2>Post-Lock Amendments</h2>
<p>In exceptional circumstances, a post-lock data amendment may be required (e.g. a lab value transcription error is discovered after lock). The process for post-lock amendments is strictly controlled:</p>
<ul>
  <li>A formal <strong>database unlock request</strong> is submitted with justification and approval from Sponsor</li>
  <li>The scope of the unlock is strictly limited to the specific error — no other changes are permitted</li>
  <li>The amendment is fully documented in the audit trail</li>
  <li>The database is re-locked following the same process</li>
  <li>Statistical analysis is repeated if the amendment affects analysis datasets</li>
  <li>All changes are documented in the Clinical Study Report (CSR)</li>
</ul>
<hr/>

<h2>Archiving — Essential Document Retention</h2>
<p>After database lock and transfer of data to statistics, all CDM documents must be archived. Archiving requirements are governed by ICH GCP E6(R3), MHRA regulations, and the sponsor's SOPs.</p>

<h3>Documents to Archive</h3>
<ul>
  <li>Data Management Plan (all versions)</li>
  <li>CRF Completion Guidelines</li>
  <li>Edit Check Specifications and UAT documentation</li>
  <li>Data Validation Plan</li>
  <li>Query listings (all queries, responses, resolutions)</li>
  <li>Reconciliation reports (SAE, lab, IMP)</li>
  <li>Medical coding reports and decisions</li>
  <li>Database lock checklist with all sign-offs</li>
  <li>Database lock certificate</li>
  <li>Final locked dataset and transfer documentation</li>
</ul>

<h3>Retention Periods</h3>
<table>
  <tr><th>Trial Type</th><th>Minimum Retention Period</th></tr>
  <tr><td>Trials in support of a marketing authorisation</td><td><strong>At least 25 years</strong> from study completion (ICH E6 R2/R3)</td></tr>
  <tr><td>Paediatric trials</td><td>Until the youngest subject is 25 years old, or 25 years after completion — whichever is longer</td></tr>
  <tr><td>Other trials</td><td>At least 15 years after study completion (or as specified by sponsor/regulation)</td></tr>
</table>
<hr/>

<h2>The Data Management Plan (DMP) — Putting It All Together</h2>
<p>The DMP is the master document that governs all CDM activities for a trial. It is produced at study start-up by the Clinical Data Manager and updated throughout the trial. The DMP describes:</p>
<ul>
  <li>Trial overview and objectives</li>
  <li>Roles and responsibilities of all CDM team members</li>
  <li>CRF design and EDC system details</li>
  <li>Edit check strategy and validation approach</li>
  <li>Data entry timelines and expectations</li>
  <li>Query management process and escalation pathways</li>
  <li>Medical coding dictionaries and process</li>
  <li>Reconciliation schedule and sign-off requirements</li>
  <li>Database lock plan and checklist</li>
  <li>Archiving and data transfer procedures</li>
</ul>
`;

CONTENT.summaryAndPrep = `
<h1>Course Summary &amp; Final Assessment Preparation</h1>
<p>You have completed all five teaching modules. Use this summary to consolidate your knowledge before the final assessment.</p>
<hr/>

<h2>Module 1 — CDM Lifecycle &amp; Foundations</h2>
<ul>
  <li><strong>CDM lifecycle:</strong> Protocol review → CRF design → DB build &amp; validation → data entry → cleaning → coding → reconciliation → database lock</li>
  <li><strong>Key documents:</strong> DMP, CCG, Edit Check Specification, DVP, SAE Reconciliation Plan, Database Lock Checklist</li>
  <li><strong>ALCOA-CCEA:</strong> Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available — all 9 attributes required for data integrity compliance</li>
  <li><strong>Golden rule:</strong> IF not documented = Not Done</li>
</ul>

<h2>Module 2 — CRF Design &amp; EDC Systems</h2>
<ul>
  <li><strong>CRF principles:</strong> Protocol-driven, CDASH-aligned, unambiguous, simple for site staff, aligned with source documents</li>
  <li><strong>Industry EDC systems:</strong> Medidata Rave, Veeva Vault EDC, Oracle Clinical, REDCap, OpenClinica, Castor</li>
  <li><strong>Edit check types:</strong> Range, date, consistency, completeness, cross-form, derived calculation</li>
  <li><strong>Soft vs hard edits:</strong> Soft = warning (overridable); Hard = error (blocks submission)</li>
  <li><strong>SDV vs SDR:</strong> SDV = line-by-line source verification; SDR = document-level review; Targeted SDV = risk-based sample</li>
  <li><strong>Query lifecycle:</strong> Issued → Open → Response → Closed (or Re-opened/Cancelled)</li>
</ul>

<h2>Module 3 — CDISC Standards</h2>
<ul>
  <li><strong>CDASH:</strong> Governs CRF data collection — standardised field names and structures. Required by FDA/EMA submissions.</li>
  <li><strong>SDTM:</strong> Governs how data is tabulated for regulatory submission — organised into domains (AE, CM, LB, VS, DM etc.)</li>
  <li><strong>ADaM:</strong> Analysis-ready datasets derived from SDTM — used by statisticians for generating the CSR outputs</li>
  <li><strong>Preferred Term (PT):</strong> The SDTM/ICSR coding level for adverse events in MedDRA</li>
  <li><strong>Controlled terminology:</strong> Standardised code lists (e.g. AESEV: MILD/MODERATE/SEVERE) ensuring cross-study comparability</li>
</ul>

<h2>Module 4 — Data Cleaning, Coding &amp; Reconciliation</h2>
<ul>
  <li><strong>Data cleaning tracks:</strong> Automated (edit checks) + Manual (DM data review)</li>
  <li><strong>MedDRA hierarchy:</strong> SOC → HLGT → HLT → PT → LLT (coding at PT level)</li>
  <li><strong>WHODrug:</strong> Used for coding prior/concomitant medications; provides Preferred Name and ATC code</li>
  <li><strong>SAE reconciliation:</strong> EDC SAE data vs PV database — most critical reconciliation before lock</li>
  <li><strong>CAPA:</strong> Identify issue → root cause → corrective action → preventive action → document → verify closure</li>
  <li><strong>Query priorities:</strong> Critical (24–48 hrs) → High (5 days) → Standard (10–15 days)</li>
</ul>

<h2>Module 5 — Database Lock &amp; Archiving</h2>
<ul>
  <li><strong>Pre-lock requirements:</strong> Zero open queries, all reconciliations signed off, coding complete, PD log signed by PI, all stakeholder sign-offs obtained</li>
  <li><strong>Lock sequence:</strong> Announce → final entry deadline → final cleaning → lock readiness meeting → system lock → extraction → transfer to stats</li>
  <li><strong>Blind before lock:</strong> Database is locked BEFORE unblinding in blinded trials</li>
  <li><strong>Post-lock amendments:</strong> Require formal unlock request, strictly scoped, fully documented, re-locked</li>
  <li><strong>Retention:</strong> 25 years for marketing authorisation trials; 15 years minimum for others</li>
</ul>

<blockquote>💡 The final assessment has <strong>15 questions</strong>. Pass mark: <strong>70% (11/15)</strong>. You have <strong>3 attempts</strong>. Your certificate is issued automatically on passing.</blockquote>
`;

// ─────────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────────

const MODULES = [

  // ═══════════════════════════════════════
  // MODULE 1 — Introduction to CDM
  // ═══════════════════════════════════════
  {
    title: 'Module 1: Introduction to Clinical Data Management',
    description: 'The CDM lifecycle from protocol to database lock — roles, documents, ALCOA-CCEA data integrity, and where CDM sits in the drug development process.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'Welcome & Course Overview',
        lessonType: 'VIDEO', videoUrl: VIDEOS.welcome, videoDurationMinutes: 10,
        isPreview: true, order: 1, content: CONTENT.welcome,
      },
      {
        title: 'The CDM Lifecycle: From Protocol to Database Lock',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.cdmOverview,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'In the CDM lifecycle, which step involves comparing EDC SAE data with the pharmacovigilance database?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SAE reconciliation compares the SAE records in the EDC against the safety/pharmacovigilance database. It is one of the key reconciliation activities completed before database lock.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Reconciliation', isCorrect: true, order: 1 },
            { optionText: 'Database build', isCorrect: false, order: 2 },
            { optionText: 'CRF design', isCorrect: false, order: 3 },
            { optionText: 'Protocol review', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The "C" in ALCOA-CCEA stands for three attributes. Which of the following are correct?',
          questionType: 'MULTI_SELECT',
          explanation: 'The three C attributes in ALCOA-CCEA are: Contemporaneous (recorded at the time of observation), Complete (all required data recorded), and Consistent (data is internally consistent across documents).',
          marks: 2, order: 2,
          options: [
            { optionText: 'Contemporaneous', isCorrect: true, order: 1 },
            { optionText: 'Complete', isCorrect: true, order: 2 },
            { optionText: 'Consistent', isCorrect: true, order: 3 },
            { optionText: 'Comprehensive', isCorrect: false, order: 4 },
            { optionText: 'Certified', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'The master document that governs all CDM processes, responsibilities, and timelines for a clinical trial is called:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Data Management Plan (DMP) is the master CDM document for a trial. It describes all CDM activities, roles, responsibilities, timelines, and processes from study start-up to database lock.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Data Management Plan (DMP)', isCorrect: true, order: 1 },
            { optionText: 'CRF Completion Guidelines (CCG)', isCorrect: false, order: 2 },
            { optionText: 'Edit Check Specification (ECS)', isCorrect: false, order: 3 },
            { optionText: 'Statistical Analysis Plan (SAP)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are CDM activities that occur during the CONDUCT phase of a trial?',
          questionType: 'MULTI_SELECT',
          explanation: 'During trial conduct, the CDM team handles data entry, query issuance and resolution, ongoing data cleaning, medical coding, SDV liaison, and safety reconciliation.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Data entry and ongoing cleaning', isCorrect: true, order: 1 },
            { optionText: 'Query issuance and resolution', isCorrect: true, order: 2 },
            { optionText: 'Medical coding', isCorrect: true, order: 3 },
            { optionText: 'Database build and validation', isCorrect: false, order: 4 },
            { optionText: 'Database lock', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Site staff require access to which of the following systems in a clinical trial?',
          questionType: 'MULTI_SELECT',
          explanation: 'Site staff require access to the EDC (to enter data) and IRT (for randomisation and IP management). They do NOT require access to the CTMS or eTMF, which are sponsor/CRO systems.',
          marks: 2, order: 5,
          options: [
            { optionText: 'EDC (Electronic Data Capture)', isCorrect: true, order: 1 },
            { optionText: 'IRT (Interactive Response Technology)', isCorrect: true, order: 2 },
            { optionText: 'CTMS (Clinical Trial Management System)', isCorrect: false, order: 3 },
            { optionText: 'eTMF (Electronic Trial Master File)', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 2 — CRF Design & EDC Systems
  // ═══════════════════════════════════════
  {
    title: 'Module 2: CRF Design & Electronic Data Capture Systems',
    description: 'Designing protocol-compliant CRFs, understanding industry EDC platforms, programming edit checks, and managing the SDV/SDR/query lifecycle.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'CRF Design & EDC Systems in Clinical Trials',
        lessonType: 'VIDEO', videoUrl: VIDEOS.crfEdc, videoDurationMinutes: 14,
        isPreview: false, order: 1, content: CONTENT.crfDesign,
      },
      {
        title: 'EDC Workflow, Data Entry & the Role of the CRA',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.edcWorkflow,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'A "hard edit" in an EDC system is best described as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A hard edit (error) prevents the user from saving the form until the discrepancy is resolved. It is used for impossible values. A soft edit (warning) can be overridden with a reason.',
          marks: 1, order: 1,
          options: [
            { optionText: 'A validation rule that prevents the user from saving until the error is resolved', isCorrect: true, order: 1 },
            { optionText: 'A warning that can be overridden by the site with a reason', isCorrect: false, order: 2 },
            { optionText: 'A query generated by the DM team for manual data review', isCorrect: false, order: 3 },
            { optionText: 'A rule applied during database lock only', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which EDC system is widely considered the market leader for large Phase 2/3 commercial trials?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Medidata Rave (now part of Dassault Systèmes) is the market leader for large Phase 2/3 commercial clinical trials, known for its high configurability and global adoption.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Medidata Rave', isCorrect: true, order: 1 },
            { optionText: 'REDCap', isCorrect: false, order: 2 },
            { optionText: 'OpenClinica', isCorrect: false, order: 3 },
            { optionText: 'Castor EDC', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Source Data Verification (SDV) involves:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SDV is the process of verifying every data point in the EDC against the original source document (e.g. medical record, lab report). It confirms that the EDC data accurately reflects what actually happened.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Verifying EDC data against the original source document field by field', isCorrect: true, order: 1 },
            { optionText: 'Reviewing source documents for completeness without comparing to the EDC', isCorrect: false, order: 2 },
            { optionText: 'Locking the database after all queries are resolved', isCorrect: false, order: 3 },
            { optionText: 'Checking that the CRF design matches the protocol', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are principles of good CRF design?',
          questionType: 'MULTI_SELECT',
          explanation: 'Good CRF design is: protocol-driven (every field has a protocol rationale), CDASH-aligned, unambiguous, simple for site staff, and accompanied by CRF Completion Guidelines.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Protocol-driven — every field maps to a protocol-specified data point', isCorrect: true, order: 1 },
            { optionText: 'CDISC CDASH-aligned field names and structures', isCorrect: true, order: 2 },
            { optionText: 'Unambiguous — each question has one valid interpretation', isCorrect: true, order: 3 },
            { optionText: 'Include as many free-text fields as possible for flexibility', isCorrect: false, order: 4 },
            { optionText: 'Simple and clear for site staff to complete correctly first time', isCorrect: true, order: 5 },
          ],
        },
        {
          questionText: 'In Risk-Based Monitoring (RBM), targeted SDV means:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Targeted SDV is a risk-based approach where SDV is performed on a statistically selected sample of high-risk data fields, rather than 100% of all data. This is endorsed by ICH E6(R3).',
          marks: 1, order: 5,
          options: [
            { optionText: 'SDV is performed on a statistical sample of high-risk data fields', isCorrect: true, order: 1 },
            { optionText: 'Every data point in the EDC is verified against the source', isCorrect: false, order: 2 },
            { optionText: 'Only SAE data is verified against the source', isCorrect: false, order: 3 },
            { optionText: 'SDV is replaced entirely by centralised statistical monitoring', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 3 — CDISC Standards
  // ═══════════════════════════════════════
  {
    title: 'Module 3: CDISC Standards — CDASH, SDTM & ADaM',
    description: 'The CDISC standards stack for clinical data — CDASH for collection, SDTM for tabulation, ADaM for analysis — with domains, controlled terminology, and regulatory requirements.',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'CDISC CDASH & SDTM Standards Explained',
        lessonType: 'VIDEO', videoUrl: VIDEOS.cdisc, videoDurationMinutes: 16,
        isPreview: false, order: 1, content: CONTENT.cdiscStandards,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'CDASH (Clinical Data Acquisition Standards Harmonization) governs:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'CDASH defines standardised field names, formats, and controlled terminology for data collection at the CRF level. It ensures clean traceability from CRF to SDTM submission datasets.',
          marks: 1, order: 1,
          options: [
            { optionText: 'How clinical data is collected — standardised CRF field names and structures', isCorrect: true, order: 1 },
            { optionText: 'How data is tabulated for regulatory submission', isCorrect: false, order: 2 },
            { optionText: 'How analysis datasets are derived for statistical use', isCorrect: false, order: 3 },
            { optionText: 'How nonclinical animal study data is exchanged', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In SDTM, what does USUBJID represent?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'USUBJID is the Unique Subject Identifier in SDTM — it combines the study ID, site ID, and subject number to create a globally unique identifier for each trial participant across all datasets.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Unique subject identifier combining study, site, and subject number', isCorrect: true, order: 1 },
            { optionText: 'The SDTM domain code for the subject demographics dataset', isCorrect: false, order: 2 },
            { optionText: 'The unique identifier for each adverse event record', isCorrect: false, order: 3 },
            { optionText: 'The US study identifier assigned by the FDA', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'ADaM (Analysis Data Model) datasets are derived from:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ADaM datasets are derived from SDTM tabulation datasets and are used by statisticians to generate analysis outputs (tables, listings, figures) for the Clinical Study Report.',
          marks: 1, order: 3,
          options: [
            { optionText: 'SDTM tabulation datasets', isCorrect: true, order: 1 },
            { optionText: 'The raw EDC database directly', isCorrect: false, order: 2 },
            { optionText: 'CDASH CRF data directly', isCorrect: false, order: 3 },
            { optionText: 'SEND nonclinical datasets', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is the two-letter SDTM domain code for Adverse Events?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'AE is the SDTM domain code for Adverse Events. Other common domains: CM (Concomitant Medications), LB (Laboratory Results), VS (Vital Signs), DM (Demographics), EX (Exposure).',
          marks: 1, order: 4,
          options: [
            { optionText: 'AE', isCorrect: true, order: 1 },
            { optionText: 'AD', isCorrect: false, order: 2 },
            { optionText: 'EV', isCorrect: false, order: 3 },
            { optionText: 'SA', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'According to CDISC controlled terminology, which of the following are valid values for the AESEV (AE Severity) field?',
          questionType: 'MULTI_SELECT',
          explanation: 'CDISC controlled terminology for AESEV uses exactly three values: MILD, MODERATE, and SEVERE. These map to CTCAE Grades 1, 2, and 3 respectively (Grades 4 and 5 are life-threatening and death — which are seriousness criteria, not just severity).',
          marks: 2, order: 5,
          options: [
            { optionText: 'MILD', isCorrect: true, order: 1 },
            { optionText: 'MODERATE', isCorrect: true, order: 2 },
            { optionText: 'SEVERE', isCorrect: true, order: 3 },
            { optionText: 'CRITICAL', isCorrect: false, order: 4 },
            { optionText: 'LIFE-THREATENING', isCorrect: false, order: 5 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 4 — Data Cleaning, Coding & Reconciliation
  // ═══════════════════════════════════════
  {
    title: 'Module 4: Data Cleaning, Medical Coding & Reconciliation',
    description: 'Manual and automated data cleaning processes, MedDRA and WHODrug medical coding, query management priorities, CAPA, and SAE/lab/IMP reconciliation.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'Data Cleaning, Query Management & Medical Coding',
        lessonType: 'VIDEO', videoUrl: VIDEOS.dataCleaning, videoDurationMinutes: 15,
        isPreview: false, order: 1, content: CONTENT.dataCleaning,
      },
      {
        title: 'Query Management, CAPA & Data Reconciliation',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.queryManagement,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'MedDRA Preferred Terms (PTs) are used for coding at which level of the hierarchy?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Preferred Terms (PTs) are the 4th level of the 5-level MedDRA hierarchy (SOC → HLGT → HLT → PT → LLT). ICSRs and SDTM datasets code adverse events at the PT level.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Level 4 — the primary coding level for regulatory submissions', isCorrect: true, order: 1 },
            { optionText: 'Level 5 — the most specific level (LLT)', isCorrect: false, order: 2 },
            { optionText: 'Level 1 — the broadest level (SOC)', isCorrect: false, order: 3 },
            { optionText: 'Level 3 — the High Level Term', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'WHODrug is used to code:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'WHODrug (maintained by the Uppsala Monitoring Centre) is the drug dictionary used to code prior and concomitant medications. It provides standardised Preferred Names and ATC codes.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Prior and concomitant medications', isCorrect: true, order: 1 },
            { optionText: 'Adverse events and medical history', isCorrect: false, order: 2 },
            { optionText: 'Laboratory test names', isCorrect: false, order: 3 },
            { optionText: 'Protocol deviations', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The most critical data reconciliation activity before database lock is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SAE reconciliation — comparing SAE data in the EDC against the pharmacovigilance database — is the most critical reconciliation because discrepancies could represent missing safety reports, which is a compliance and patient safety issue.',
          marks: 1, order: 3,
          options: [
            { optionText: 'SAE reconciliation (EDC vs pharmacovigilance database)', isCorrect: true, order: 1 },
            { optionText: 'Central laboratory reconciliation', isCorrect: false, order: 2 },
            { optionText: 'IMP accountability reconciliation', isCorrect: false, order: 3 },
            { optionText: 'PK/PD data reconciliation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In the CAPA process, which steps are included?',
          questionType: 'MULTI_SELECT',
          explanation: 'The CAPA process includes: identifying the issue, root cause analysis, defining corrective actions (fix the current issue) and preventive actions (prevent recurrence), documenting the actions, and verifying that the CAPA resolved the issue.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Identifying the issue and its root cause', isCorrect: true, order: 1 },
            { optionText: 'Defining corrective actions to fix the current issue', isCorrect: true, order: 2 },
            { optionText: 'Defining preventive actions to prevent recurrence', isCorrect: true, order: 3 },
            { optionText: 'Documenting that actions were carried out and resolved the issue', isCorrect: true, order: 4 },
            { optionText: 'Immediately locking the database when an issue is identified', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'A Critical priority query (e.g. unreported SAE) should be resolved within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Critical queries — those affecting patient safety or study integrity, such as an unreported SAE — must be resolved within 24–48 hours. Standard queries allow 10–15 working days.',
          marks: 1, order: 5,
          options: [
            { optionText: '24–48 hours', isCorrect: true, order: 1 },
            { optionText: '5 working days', isCorrect: false, order: 2 },
            { optionText: '10–15 working days', isCorrect: false, order: 3 },
            { optionText: 'By the next monitoring visit', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 5 — Database Lock & Final Assessment
  // ═══════════════════════════════════════
  {
    title: 'Module 5: Database Lock, Archiving & Final Assessment',
    description: 'Pre-lock checklist, the database lock process, post-lock amendments, document archiving, retention periods, and 15-question final assessment.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Database Lock & Regulatory Submission',
        lessonType: 'VIDEO', videoUrl: VIDEOS.dbLock, videoDurationMinutes: 12,
        isPreview: false, order: 1, content: CONTENT.databaseLock,
      },
      {
        title: 'Course Summary & Final Assessment Preparation',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.summaryAndPrep,
      },
    ],
    quiz: {
      title: 'Final Assessment: Clinical Data Management Principles',
      instructions: 'Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Certificate issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 30, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'The CDM lifecycle begins with which activity?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The CDM lifecycle begins with protocol review — the DM team reviews the protocol to identify all data points to be collected, map them to CRF fields, and begin authoring the Data Management Plan.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Protocol review', isCorrect: true, order: 1 },
            { optionText: 'Database build', isCorrect: false, order: 2 },
            { optionText: 'CRF design', isCorrect: false, order: 3 },
            { optionText: 'Database lock', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are ALL nine ALCOA-CCEA data integrity attributes?',
          questionType: 'MULTI_SELECT',
          explanation: 'ALCOA-CCEA: Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available.',
          marks: 3, order: 2,
          options: [
            { optionText: 'Attributable', isCorrect: true, order: 1 },
            { optionText: 'Legible', isCorrect: true, order: 2 },
            { optionText: 'Contemporaneous', isCorrect: true, order: 3 },
            { optionText: 'Original', isCorrect: true, order: 4 },
            { optionText: 'Accurate', isCorrect: true, order: 5 },
            { optionText: 'Complete', isCorrect: true, order: 6 },
            { optionText: 'Consistent', isCorrect: true, order: 7 },
            { optionText: 'Enduring', isCorrect: true, order: 8 },
            { optionText: 'Available', isCorrect: true, order: 9 },
            { optionText: 'Auditable', isCorrect: false, order: 10 },
          ],
        },
        {
          questionText: 'In an EDC system, a "soft edit" differs from a "hard edit" in that a soft edit:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A soft edit generates a warning that the user can override with a documented reason. A hard edit blocks form submission until the error is corrected.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Can be overridden by the site with a documented reason', isCorrect: true, order: 1 },
            { optionText: 'Prevents the user from saving the form until resolved', isCorrect: false, order: 2 },
            { optionText: 'Is only generated by the DM team manually', isCorrect: false, order: 3 },
            { optionText: 'Only applies during the database lock process', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'CDISC SDTM organises clinical data into standardised groupings called:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SDTM organises data into domains — logical groupings identified by two-letter codes (e.g. AE for Adverse Events, CM for Concomitant Medications, LB for Laboratory Results).',
          marks: 1, order: 4,
          options: [
            { optionText: 'Domains', isCorrect: true, order: 1 },
            { optionText: 'Modules', isCorrect: false, order: 2 },
            { optionText: 'Buckets', isCorrect: false, order: 3 },
            { optionText: 'Registers', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'MedDRA coding of adverse events in ICSRs and SDTM datasets uses which hierarchical level?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Adverse events are coded at the Preferred Term (PT) level in both ICSRs submitted to regulators and in SDTM AE domain datasets.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Preferred Term (PT)', isCorrect: true, order: 1 },
            { optionText: 'System Organ Class (SOC)', isCorrect: false, order: 2 },
            { optionText: 'Lowest Level Term (LLT)', isCorrect: false, order: 3 },
            { optionText: 'High Level Group Term (HLGT)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following reconciliations must be completed BEFORE database lock?',
          questionType: 'MULTI_SELECT',
          explanation: 'Before database lock, the following reconciliations must be signed off: SAE reconciliation (EDC vs PV database), central laboratory reconciliation, and IMP reconciliation.',
          marks: 2, order: 6,
          options: [
            { optionText: 'SAE reconciliation (EDC vs pharmacovigilance database)', isCorrect: true, order: 1 },
            { optionText: 'Central laboratory reconciliation', isCorrect: true, order: 2 },
            { optionText: 'IMP (investigational medicinal product) reconciliation', isCorrect: true, order: 3 },
            { optionText: 'Publication reconciliation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In a blinded clinical trial, when should the database be locked relative to unblinding?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The database is locked BEFORE unblinding. This prevents any subconscious bias in final data cleaning decisions by those who know treatment assignments.',
          marks: 1, order: 7,
          options: [
            { optionText: 'Before unblinding — to prevent bias in final cleaning decisions', isCorrect: true, order: 1 },
            { optionText: 'After unblinding — to allow treatment-specific data review', isCorrect: false, order: 2 },
            { optionText: 'Simultaneously with unblinding', isCorrect: false, order: 3 },
            { optionText: 'Only after the Clinical Study Report is drafted', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'WHODrug is used to code which type of clinical trial data?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'WHODrug is the international drug dictionary used to code prior and concomitant medications in clinical trials. It provides Preferred Names and ATC codes.',
          marks: 1, order: 8,
          options: [
            { optionText: 'Prior and concomitant medications', isCorrect: true, order: 1 },
            { optionText: 'Adverse events', isCorrect: false, order: 2 },
            { optionText: 'Medical history diagnoses', isCorrect: false, order: 3 },
            { optionText: 'Laboratory test results', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The minimum document retention period for clinical trial data supporting a marketing authorisation application is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICH GCP requires that essential documents supporting a marketing authorisation are retained for at least 25 years from study completion.',
          marks: 1, order: 9,
          options: [
            { optionText: '25 years from study completion', isCorrect: true, order: 1 },
            { optionText: '5 years from regulatory approval', isCorrect: false, order: 2 },
            { optionText: '15 years from first patient enrolled', isCorrect: false, order: 3 },
            { optionText: '10 years from database lock', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The CDISC standard that governs analysis-ready datasets used by statisticians is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ADaM (Analysis Data Model) governs the structure of analysis-ready datasets derived from SDTM. These are what statisticians use to generate tables, listings, and figures for the Clinical Study Report.',
          marks: 1, order: 10,
          options: [
            { optionText: 'ADaM (Analysis Data Model)', isCorrect: true, order: 1 },
            { optionText: 'CDASH (Clinical Data Acquisition Standards Harmonization)', isCorrect: false, order: 2 },
            { optionText: 'SDTM (Study Data Tabulation Model)', isCorrect: false, order: 3 },
            { optionText: 'SEND (Standard for Exchange of Nonclinical Data)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A post-lock database amendment requires which of the following?',
          questionType: 'MULTI_SELECT',
          explanation: 'A post-lock amendment requires: a formal unlock request with justification, Sponsor approval, strictly limited scope (only the specific error), full audit trail documentation, re-locking, and repeating statistical analysis if analysis datasets are affected.',
          marks: 2, order: 11,
          options: [
            { optionText: 'Formal unlock request with documented justification', isCorrect: true, order: 1 },
            { optionText: 'Sponsor approval before proceeding', isCorrect: true, order: 2 },
            { optionText: 'Full documentation in the audit trail', isCorrect: true, order: 3 },
            { optionText: 'Re-locking the database after the amendment', isCorrect: true, order: 4 },
            { optionText: 'Automatically invalidates the entire trial dataset', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Risk-Based Monitoring (RBM) is endorsed by which regulatory guidance document?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICH E6(R3) (the Good Clinical Practice guideline, third revision) endorses risk-based monitoring (RBM) as an appropriate approach to clinical trial oversight, replacing the requirement for 100% SDV.',
          marks: 1, order: 12,
          options: [
            { optionText: 'ICH E6(R3) — Good Clinical Practice', isCorrect: true, order: 1 },
            { optionText: 'ICH E2A — Clinical Safety Data Management', isCorrect: false, order: 2 },
            { optionText: 'ICH E9 — Statistical Principles', isCorrect: false, order: 3 },
            { optionText: 'CDISC SDTM Implementation Guide', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The ADSL dataset in the ADaM standards is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ADSL is the Subject-Level Analysis Dataset — it contains one record per subject and includes all analysis flags, population assignments (ITT, PP, safety), and subject-level covariates used in analysis.',
          marks: 1, order: 13,
          options: [
            { optionText: 'The Subject-Level Analysis Dataset — one record per subject with analysis flags', isCorrect: true, order: 1 },
            { optionText: 'The Adverse Events analysis dataset', isCorrect: false, order: 2 },
            { optionText: 'The Adverse Drug Reactions safety dataset', isCorrect: false, order: 3 },
            { optionText: 'The SDTM domain for subject demographics', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'According to the ALCOA-CCEA standard, if an error is made on a paper CRF, the correct approach is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ALCOA-compliant paper CRF corrections: single strikethrough (never obliterate the original), write the correction, add the date of correction, add the corrector\'s initials, and briefly state the reason.',
          marks: 1, order: 14,
          options: [
            { optionText: 'Single strikethrough, write correction, add date/initials/reason — never use correction fluid', isCorrect: true, order: 1 },
            { optionText: 'Use correction fluid (Tipp-Ex) to cover the error then write the correction', isCorrect: false, order: 2 },
            { optionText: 'Scribble over the error until it is illegible', isCorrect: false, order: 3 },
            { optionText: 'Leave the error and attach a post-it note explaining it', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following items must be completed before a database lock sign-off can be obtained?',
          questionType: 'MULTI_SELECT',
          explanation: 'All of these must be complete before database lock: zero open queries, all reconciliations signed off, medical coding complete with medical review, and protocol deviation log signed by PI.',
          marks: 2, order: 15,
          options: [
            { optionText: 'All queries resolved or cancelled with reason — zero open queries', isCorrect: true, order: 1 },
            { optionText: 'SAE reconciliation signed off by DM and PV teams', isCorrect: true, order: 2 },
            { optionText: 'All AEs coded to MedDRA PT with medical review sign-off', isCorrect: true, order: 3 },
            { optionText: 'Protocol deviation log acknowledged and signed by PI', isCorrect: true, order: 4 },
            { optionText: 'Clinical Study Report (CSR) finalised and published', isCorrect: false, order: 5 },
          ],
        },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('══════════════════════════════════════════════════════════════════');
  console.log('  SEEDING: Clinical Data Management Principles');
  console.log('  Course 06 | BEGINNER | Clinical Data Management');
  console.log('  Content: HTML strings | Videos: Real YouTube CDM videos');
  console.log('══════════════════════════════════════════════════════════════════\n');

  const existing = await prisma.course.findUnique({
    where: { slug: COURSE_SLUG },
    include: {
      modules: {
        include: {
          lessons: true,
          quiz: { include: { questions: { include: { options: true } } } },
        },
      },
    },
  });

  if (!existing) {
    console.error(`❌ Course "${COURSE_SLUG}" not found.\n   Run: node prisma/seed.js && node prisma/seed-courses.js first.\n`);
    return;
  }

  // Clear existing modules / lessons / quizzes
  console.log('🗑  Clearing existing modules, lessons and quizzes...');
  for (const mod of existing.modules) {
    if (mod.quiz) {
      for (const q of mod.quiz.questions) {
        await prisma.quizOption.deleteMany({ where: { questionId: q.id } });
      }
      await prisma.quizQuestion.deleteMany({ where: { quizId: mod.quiz.id } });
      await prisma.quiz.delete({ where: { id: mod.quiz.id } });
    }
    await prisma.lesson.deleteMany({ where: { moduleId: mod.id } });
    await prisma.module.delete({ where: { id: mod.id } });
  }
  console.log('   ✅ Cleared.\n');

  // Update course metadata
  await prisma.course.update({
    where: { id: existing.id },
    data: {
      title: 'Clinical Data Management Principles',
      subtitle: 'CDISC standards, EDC systems, and data quality in UK clinical trials',
      description: 'Complete CDM lifecycle from protocol review through database lock. Covers CDISC CDASH and SDTM standards, CRF design, EDC systems, data validation rules, query management, medical coding (MedDRA & WHODrug), data reconciliation, and database lock procedures used in UK and global clinical trials.',
      learningObjectives: [
        'Explain the end-to-end CDM lifecycle from protocol review to database lock',
        'Design CRFs aligned with CDISC CDASH standards',
        'Apply ALCOA-CCEA data integrity principles to all clinical data',
        'Manage edit checks, query workflows, and data cleaning processes',
        'Execute medical coding using MedDRA and WHODrug dictionaries',
        'Perform data reconciliation and execute database lock procedures correctly',
      ],
      prerequisites: [
        'Basic understanding of clinical trials recommended',
        'No prior CDM or programming experience required',
      ],
      targetAudience: [
        'Aspiring and practising Clinical Data Managers',
        'Clinical Research Associates (CRAs) wanting to understand the CDM pipeline',
        'Study Coordinators and Research Nurses completing eCRFs',
        'Regulatory Affairs and Statistics professionals',
      ],
      durationHours: 5,
      difficultyLevel: 'BEGINNER',
      accreditation: 'SCDM Aligned | CDISC Compliant | ICH GCP E6(R3)',
      price: 129.00,
      originalPrice: 179.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'Clinical Data Management Course | CDISC CDASH SDTM | EDC & Database Lock',
      seoDescription: 'Learn CDM from protocol to database lock — CDISC CDASH/SDTM, CRF design, EDC systems, MedDRA coding, SAE reconciliation, and database lock. SCDM aligned.',
      tags: ['CDM', 'CDISC', 'CDASH', 'SDTM', 'ADaM', 'EDC', 'MedDRA', 'WHODrug', 'database-lock', 'data-management', 'ALCOA'],
    },
  });
  console.log('✅ Course metadata updated.\n');

  // Create certificate template if not present
  const cert = await prisma.certificateTemplate.findUnique({ where: { courseId: existing.id } });
  if (!cert) {
    await prisma.certificateTemplate.create({
      data: {
        courseId: existing.id,
        heading: 'Certificate of Completion',
        bodyText: 'This certifies successful completion of Clinical Data Management Principles — SCDM Aligned | CDISC Compliant | Issued by Clinical Research Nexus',
        signatureName: 'Clinical Research Nexus',
        signatureTitle: 'Continuing Professional Development',
      },
    });
    console.log('  🏅 Certificate template created.\n');
  }

  // Build modules, lessons, quizzes
  let totalLessons = 0;
  let totalQuestions = 0;

  for (const modData of MODULES) {
    process.stdout.write(`  📦 ${modData.title}... `);

    const module = await prisma.module.create({
      data: {
        courseId: existing.id,
        title: modData.title,
        description: modData.description,
        order: modData.order,
        isMandatory: modData.isMandatory,
      },
    });

    for (const l of modData.lessons) {
      await prisma.lesson.create({
        data: {
          moduleId: module.id,
          title: l.title,
          lessonType: l.lessonType,
          videoUrl: l.videoUrl || null,
          videoDurationMinutes: l.videoDurationMinutes || null,
          content: l.content || null,
          isPreview: l.isPreview,
          order: l.order,
        },
      });
      totalLessons++;
    }

    if (modData.quiz) {
      const quiz = await prisma.quiz.create({
        data: {
          moduleId: module.id,
          title: modData.quiz.title,
          instructions: modData.quiz.instructions,
          passMarkPercentage: modData.quiz.passMarkPercentage,
          timeLimitMinutes: modData.quiz.timeLimitMinutes,
          maxAttempts: modData.quiz.maxAttempts,
          randomizeQuestions: modData.quiz.randomizeQuestions,
        },
      });

      for (const q of modData.quiz.questions) {
        const question = await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            questionText: q.questionText,
            questionType: q.questionType,
            explanation: q.explanation,
            marks: q.marks,
            order: q.order,
          },
        });
        for (const opt of q.options) {
          await prisma.quizOption.create({
            data: {
              questionId: question.id,
              optionText: opt.optionText,
              isCorrect: opt.isCorrect,
              order: opt.order,
            },
          });
        }
        totalQuestions++;
      }
    }

    console.log(`✅ (${modData.lessons.length} lessons, ${modData.quiz?.questions.length || 0} quiz Qs)`);
  }

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log('  ✨ SEED COMPLETE');
  console.log(`  Modules: ${MODULES.length} | Lessons: ${totalLessons} | Quiz Questions: ${totalQuestions}`);
  console.log('  Content: Rich HTML with tables, info-boxes, and key-points');
  console.log('  Videos: Real YouTube CDM educational videos');
  console.log('  Preview: /courses/clinical-data-management-principles');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
