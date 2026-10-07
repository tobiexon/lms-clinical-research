/**
 * COURSE 03: Clinical Research Associate (CRA) Foundation
 * ────────────────────────────────────────────────────────
 * Content stored as HTML strings (rendered via dangerouslySetInnerHTML).
 * Videos: MHRA official YouTube placeholder — replace with own recordings.
 * Run: node prisma/seed-course-03-cra-foundation.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'clinical-research-associate-foundation';

const COURSE_VIDEO = 'https://www.youtube.com/watch?v=aGYMB4TkJYM';

const VIDEOS = {
  welcome:        COURSE_VIDEO,
  siteVisits:     COURSE_VIDEO,
  documents:      COURSE_VIDEO,
  adverseEvents:  COURSE_VIDEO,
  quality:        COURSE_VIDEO,
  monitoring:     COURSE_VIDEO,
  cov:            COURSE_VIDEO,
  assessment:     COURSE_VIDEO,
};

// ─────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// ─────────────────────────────────────────────────────────

const CONTENT = {};

// ── MODULE 1, LESSON 1: Welcome ──────────────────────────
CONTENT.welcome = `
<h1>Welcome to Clinical Research Associate (CRA) Foundation</h1>
<p>This course is your practical, role-specific guide to becoming a Clinical Research Associate (CRA) in the UK. It walks you through everything from regulatory requirements and key clinical trial documents to adverse event management, data quality, and site close-out — all grounded in real-world UK practice.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Aspiring CRAs</strong> and clinical trial monitors entering the profession</li>
  <li><strong>Research Nurses and Site Co-ordinators</strong> transitioning to sponsor/CRO roles</li>
  <li><strong>Clinical research graduates</strong> building job-ready competencies</li>
  <li><strong>Junior CRAs</strong> looking to consolidate their foundational knowledge</li>
</ul>

<h2>What You Will Achieve</h2>
<ol>
  <li>Understand the CRA role and the UK clinical trial regulatory landscape</li>
  <li>Plan and conduct Feasibility, SSV, SIV, RMV/IMV, and COV visits</li>
  <li>Manage all key trial documents: Protocol, IB, ISF, Delegation Log, and more</li>
  <li>Classify and report Adverse Events, SAEs, SARs, and SUSARs correctly</li>
  <li>Apply ALCOA-CCEA data integrity principles in daily monitoring work</li>
  <li>Understand CAPA, QMS, and quality management systems used in trials</li>
</ol>

<blockquote>💡 <strong>Watch the video above</strong> for an introduction to the CRA role and what to expect from this course.</blockquote>

<h2>Course Structure</h2>
<p>The course has 7 modules covering the full scope of CRA work. Each module combines video lessons and detailed reading content. Knowledge check quizzes are included at the end of each module (pass mark: 70%). A final assessment of 15 questions unlocks your certificate.</p>
<div class="info-box">
  <div class="info-box-title">📌 Golden Rule of Clinical Trials</div>
  <p><strong>IF not documented = Not Done.</strong> You will hear this throughout the course. It is the single most important principle in clinical trial documentation.</p>
</div>
`;

// ── MODULE 1, LESSON 2: Key Concepts & Terminology ───────
CONTENT.terminology = `
<h1>Key Concepts &amp; Terminology for CRAs</h1>
<p>Before diving into the practical work of a CRA, it is essential to have a firm grasp of the terminology used every day in clinical trials. This lesson covers the most important abbreviations, roles, and concepts you will encounter from day one.</p>
<hr/>

<h2>The Drug Life Cycle</h2>
<p>Every investigational medicinal product (IMP) passes through a defined development lifecycle before reaching patients. Understanding this gives you context for the trials you will work on.</p>
<table>
  <tr><th>Stage</th><th>What Happens</th><th>Key Milestone</th></tr>
  <tr><td><strong>Discovery</strong></td><td>Scientists identify a target and find a compound</td><td>Lead compound selected</td></tr>
  <tr><td><strong>Preclinical</strong></td><td>Lab and animal studies confirm safety and activity</td><td>IND/CTA submitted before first human dose</td></tr>
  <tr><td><strong>Clinical (Ph 1–3)</strong></td><td>Phased human trials — safety, efficacy, pivotal</td><td>Phase 3 data package for NDA/MAA</td></tr>
  <tr><td><strong>Regulatory Approval</strong></td><td>Submission reviewed; marketing authorisation granted</td><td>NDA (USA) / MAA (UK/EU)</td></tr>
  <tr><td><strong>Post-Market (Ph 4)</strong></td><td>Real-world safety surveillance continues</td><td>Ongoing pharmacovigilance</td></tr>
</table>
<p><strong>IND</strong> = Investigational New Drug application (USA, submitted to FDA before first-in-human).<br/>
<strong>NDA</strong> = New Drug Application (USA, submitted to FDA for marketing approval).</p>
<div class="info-box">
  <div class="info-box-title">📌 Who Does What?</div>
  <p>Pharma/Biotech companies own the Discovery and Preclinical stages. From Clinical trials onward, they often contract <strong>CROs (Contract Research Organisations)</strong> to manage operations — and CRAs typically work for these CROs.</p>
</div>
<hr/>

<h2>Common Terminologies in Clinical Trials</h2>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>Pre-screening</strong></td><td>Preliminary assessment of potential patient eligibility before consent</td></tr>
  <tr><td><strong>Screened</strong></td><td>Patient has signed the Informed Consent Form (ICF)</td></tr>
  <tr><td><strong>Screening Date</strong></td><td>The date the ICF was signed — not when bloods were taken</td></tr>
  <tr><td><strong>Screen Failed</strong></td><td>Patient signed consent but did not meet eligibility criteria</td></tr>
  <tr><td><strong>Enrolled / Randomised</strong></td><td>Patient assigned a study number and IMP via IRT — trial participation begins</td></tr>
  <tr><td><strong>Data Cut-off</strong></td><td>Pre-specified date for interim data analysis</td></tr>
  <tr><td><strong>Database Lock</strong></td><td>EDC locked at end of study — no further data changes permitted</td></tr>
  <tr><td><strong>IMP</strong></td><td>Investigational Medicinal Product — the study drug</td></tr>
  <tr><td><strong>EDC</strong></td><td>Electronic Data Capture — the system where trial data is recorded</td></tr>
  <tr><td><strong>IRT</strong></td><td>Interactive Response Technology — used for patient randomisation and IMP management</td></tr>
  <tr><td><strong>ISF</strong></td><td>Investigator Site File — site's master file of all regulatory and trial documents</td></tr>
  <tr><td><strong>eTMF</strong></td><td>Electronic Trial Master File — sponsor/CRO's central filing system (e.g. Veeva Vault)</td></tr>
  <tr><td><strong>SDV</strong></td><td>Source Data Verification — CRA compares EDC data against original source documents</td></tr>
  <tr><td><strong>SDR</strong></td><td>Source Document Review — reviewing source documents without line-by-line EDC comparison</td></tr>
  <tr><td><strong>PI</strong></td><td>Principal Investigator — the physician legally responsible for the trial at the site</td></tr>
  <tr><td><strong>Sub-I</strong></td><td>Sub-Investigator — physicians or qualified staff delegated tasks by the PI</td></tr>
  <tr><td><strong>CRA</strong></td><td>Clinical Research Associate — the sponsor/CRO representative who monitors the site</td></tr>
  <tr><td><strong>GCP</strong></td><td>Good Clinical Practice — the international ethical and scientific quality standard</td></tr>
</table>

<div class="key-points">
  <div class="key-points-title">✅ Remember</div>
  <ul>
    <li>Patients are Screened and Randomised in IRT — their details are then automatically populated in EDC</li>
    <li>IRT and EDC interact with each other — a randomisation in IRT triggers the EDC subject record</li>
    <li>The site owns the EMR (Electronic Medical Record) — the CRA accesses it to perform SDV</li>
    <li>Sites require access to EDC and IRT, but NOT to CTMS or eTMF — those are sponsor/CRO systems</li>
  </ul>
</div>
`;

// ── MODULE 2, LESSON 1: UK Regulatory Framework ──────────
CONTENT.ukRegulatory = `
<h1>UK Regulatory Framework for Clinical Trials</h1>
<p>Running a clinical trial in the UK requires obtaining approvals from three distinct national bodies. As a CRA, you are responsible for verifying that all approvals are in place before a site opens, and that any amendments are reflected in the site file.</p>
<hr/>

<h2>The Three UK Regulatory Authorities</h2>
<table>
  <tr><th>Body</th><th>Full Name</th><th>CRA Role</th></tr>
  <tr><td><strong>MHRA</strong></td><td>Medicines and Healthcare Products Regulatory Authority</td><td>Verify MHRA CTA letter is in ISF before site opens</td></tr>
  <tr><td><strong>HRA</strong></td><td>Health Research Authority</td><td>Verify HRA Approval and REC Favourable Opinion in ISF</td></tr>
  <tr><td><strong>NIHR</strong></td><td>National Institute for Health and Care Research</td><td>Liaise with CRN contacts; support site recruitment reporting</td></tr>
</table>

<h2>MHRA — Clinical Trial Authorisation (CTA)</h2>
<p>The MHRA reviews the scientific and safety case for the trial. It grants the <strong>Clinical Trial Authorisation (CTA)</strong> — the legal permission for the trial to proceed in the UK. Applications are submitted via <strong>IRAS (Integrated Research Application System)</strong>.</p>
<ul>
  <li>The <strong>MHRA Initial Approval Letter</strong> must be filed in the ISF at every site</li>
  <li>Any <strong>Substantial Amendment</strong> to the protocol or IB must also receive MHRA approval — the Amendment Approval Letter must also be filed</li>
  <li>The MHRA conducts <strong>GCP Inspections</strong> at both sponsor/CRO offices and investigative sites</li>
</ul>

<h2>HRA — Ethics and Governance</h2>
<p>The HRA oversees <strong>85 Research Ethics Committees (RECs)</strong> across the UK: 65 in England, 11 in Scotland, 7 in Wales, and 2 in Northern Ireland. One REC is assigned per study and issues a <strong>Favourable Opinion</strong>.</p>
<ul>
  <li>Both the <strong>HRA Approval Letter</strong> and the <strong>REC Favourable Opinion Letter</strong> must be in the ISF</li>
  <li>HRA Approval replaces the need for individual Trust R&amp;D approvals across England</li>
</ul>

<h2>NIHR — Research Infrastructure</h2>
<p>The NIHR is not an approvals body — it provides the infrastructure and funding support for NHS-hosted research through <strong>15 Clinical Research Networks (CRNs)</strong> across England.</p>

<h2>NHS R&amp;D — Capacity and Capability (C&amp;C)</h2>
<p>For NHS sites, one additional step is required: the NHS Trust's R&amp;D department must confirm the site has the Capacity and Capability to run the trial. This results in the <strong>NHS R&amp;D C&amp;C Confirmation Letter</strong> — required in every NHS site's ISF.</p>

<h2>Approvals Checklist Before Site Opening</h2>
<div class="warning-box">
  <p>⚠️ <strong>All four of the following must be in the ISF before ANY trial activity starts at site:</strong></p>
  <ol>
    <li>MHRA Initial Approval Letter (and Amendment letters if applicable)</li>
    <li>HRA Approval Letter (and Amendment letters if applicable)</li>
    <li>REC Initial Favourable Opinion Letter (and Amendment letters if applicable)</li>
    <li>NHS R&amp;D C&amp;C Confirmation Letter (NHS sites only)</li>
  </ol>
  <p>Conducting any trial procedure — including screening — before these approvals are in place is a <strong>Serious Breach</strong>.</p>
</div>
`;

// ── MODULE 2, LESSON 2: Site Visits Overview ─────────────
CONTENT.siteVisits = `
<h1>Site Visits: From Feasibility to Close-out</h1>
<p>The CRA is the primary point of contact between the Sponsor/CRO and the investigative site. Your work is structured around a series of formal site visits, each with a specific purpose, required activities, and a written report.</p>
<hr/>

<h2>The Five Site Visit Types</h2>
<table>
  <tr><th>Visit</th><th>Abbreviation</th><th>Purpose</th><th>Report Timeline</th></tr>
  <tr><td>Feasibility Questionnaire</td><td>FQ</td><td>Assess site suitability before committing</td><td>N/A (written response from site)</td></tr>
  <tr><td>Site Selection Visit</td><td>SSV</td><td>Confirm capacity, capability, and site infrastructure</td><td>15 working days</td></tr>
  <tr><td>Site Initiation Visit</td><td>SIV</td><td>Train site, collect documents, activate the site</td><td>10 working days</td></tr>
  <tr><td>Routine / Interim Monitoring Visit</td><td>RMV / IMV</td><td>Ongoing SDV, compliance, AE/PD review</td><td>10 working days</td></tr>
  <tr><td>Close-out Visit</td><td>COV</td><td>Final reconciliation, collect logs, shut down site</td><td>10 working days</td></tr>
</table>

<h2>1. Feasibility Questionnaire (FQ)</h2>
<p>The FQ is sent to the site <em>before</em> any visit takes place. It is accompanied by a <strong>CDA (Confidentiality Disclosure Agreement)</strong> and a <strong>Protocol Synopsis</strong>. The site completes it to demonstrate their patient population, staffing, and infrastructure. The study team assesses the responses — if suitable, the process proceeds to an SSV.</p>

<h2>2. Site Selection Visit (SSV)</h2>
<p>The SSV is the first in-person engagement with the site. The CRA's objectives are to:</p>
<ul>
  <li>Introduce the study to site personnel</li>
  <li>Confirm adequate resources (staff, space, pharmacy, laboratory) are available</li>
  <li>Conduct a facility tour</li>
  <li>Collect PI and Sub-Investigator CVs and GCP certificates</li>
  <li>Understand expected patient recruitment numbers</li>
  <li>Confirm staff experience in the relevant therapeutic area</li>
</ul>
<p>The <strong>SSV Report must be written within 15 working days</strong>.</p>

<h2>3. Site Initiation Visit (SIV)</h2>
<p><strong>Before the SIV</strong>, the CRA must ensure: staff CVs and GCPs are collected, all platform access (EDC, IRT) is granted, and the Clinical Trial Agreement is fully executed.</p>
<p><strong>During the SIV</strong>, the CRA:</p>
<ul>
  <li>Trains the study team on the Protocol, Investigator's Brochure (IB), and Pharmacy Manual</li>
  <li>Walks through study procedures, lab requirements, and pharmacy handling</li>
  <li>Trains on the Informed Consenting Procedure</li>
  <li>Collects all outstanding regulatory and essential documents</li>
</ul>
<p>The <strong>SIV Report must be finalised within 10 working days</strong>. The site cannot enrol patients until the Sponsor confirms site activation in writing.</p>

<h2>4. Routine / Interim Monitoring Visit (RMV / IMV)</h2>
<p>RMVs are agreed with the site ahead of time — an official confirmation letter is sent. Key activities:</p>
<ul>
  <li>Perform <strong>SDV</strong> (Source Data Verification) and/or <strong>SDR</strong> (Source Document Review)</li>
  <li>Confirm the trial is conducted per Protocol and GCP</li>
  <li>Review AE and SAE logs</li>
  <li>Review the ISF for completeness</li>
  <li>Review Protocol Deviation (PD) and Noncompliance (NC) logs</li>
  <li>Perform IMP accountability and reconciliation</li>
  <li>Review lab kits and check expiry dates</li>
  <li>Discuss findings with the PI and study team</li>
  <li>Write report within <strong>10 working days</strong></li>
  <li>Send a follow-up letter to the site with all outstanding action items</li>
</ul>

<h2>5. Close-out Visit (COV)</h2>
<p>The COV is the <strong>opposite of the SIV</strong> — you are winding down everything that was set up. It must be agreed ahead of time with an official confirmation letter. Key activities:</p>
<ul>
  <li>Final reconciliation of IMP, lab kits, and equipment/devices</li>
  <li>Pay all outstanding site payments</li>
  <li>Conduct a final review of the ISF</li>
  <li>Sign and collect all logs: Site Visit Log, Delegation Log, Training Log</li>
  <li>Shut down the activities of all vendors (EDC access, IRT access, lab kits returned)</li>
  <li>Close all open Action Items and Queries</li>
  <li>Meet with the study team to discuss archiving requirements and retention periods</li>
</ul>
<div class="key-points">
  <div class="key-points-title">✅ CRA Visit Report Timeline Summary</div>
  <ul>
    <li>SSV Report: <strong>15 working days</strong></li>
    <li>SIV Report: <strong>10 working days</strong></li>
    <li>RMV/IMV Report: <strong>10 working days</strong></li>
    <li>COV Report: <strong>10 working days</strong></li>
  </ul>
</div>
`;

// ── MODULE 3, LESSON 1: Key Trial Documents ───────────────
CONTENT.keyDocuments = `
<h1>Key Documents in a Clinical Trial</h1>
<p>Every clinical trial generates a substantial body of documentation. As a CRA, you are responsible for reviewing, collecting, and verifying these documents throughout the trial. They are filed in two places: the <strong>ISF (Investigator Site File)</strong> at the site, and the <strong>eTMF (electronic Trial Master File)</strong> at the Sponsor/CRO.</p>
<hr/>

<h2>The Protocol</h2>
<p>The Protocol is the <strong>manual for the trial</strong>. It is written and owned by the Sponsor. Every trial procedure, assessment, and decision must trace back to the protocol.</p>
<ul>
  <li>Can be amended via submissions to the Regulatory Authorities — each amendment must be approved before implementation</li>
  <li>The <strong>Protocol Signature Page (PSP)</strong> must be signed by the PI <em>before</em> the trial starts</li>
  <li>Protocol Deviations occur when the site departs from the protocol — they must be documented and reported</li>
</ul>
<p><strong>Key sections of a Protocol:</strong></p>
<ul>
  <li>Synopsis / Summary</li>
  <li>Study Rationale / Background</li>
  <li>Objectives and Endpoints (Primary, Secondary, Exploratory)</li>
  <li>Trial Design and Statistical Analysis Plan</li>
  <li>Inclusion and Exclusion Criteria</li>
  <li>Schedule of Assessments</li>
</ul>

<h2>Investigator's Brochure (IB)</h2>
<p>The IB is a compilation of all available clinical and non-clinical data on the IMP. It gives the investigator the information they need to understand the rationale and risks of the trial. Key sections include:</p>
<ul>
  <li>Physical, Chemical, and Pharmaceutical Properties and Formulation</li>
  <li>Non-Clinical Studies: Pharmacology, Pharmacokinetics, Toxicology</li>
  <li>Effects in Humans: PK/PD in humans, Safety and Efficacy data</li>
  <li>Marketing Experience (if applicable)</li>
  <li>Summary of Data and Guidance for Investigators</li>
  <li><strong>Reference Safety Information (RSI)</strong> — used to assess "expectedness" of Serious Adverse Reactions</li>
</ul>

<h2>Informed Consent Form &amp; Participant Information Sheet</h2>
<p>The ICF/PIS is made up of two parts:</p>
<ol>
  <li><strong>Participant Information Sheet (PIS)</strong> — explains the study in plain language the patient can understand</li>
  <li><strong>Informed Consent Form</strong> — the signature page that documents the patient's voluntary agreement to participate</li>
</ol>
<p>The PIS must cover: the purpose of the study, procedures involved, possible risks or disadvantages, and how long the study will last.</p>

<h2>Delegation Log</h2>
<p>The Delegation Log lists every site staff member involved in the trial and the specific tasks they have been delegated by the PI.</p>
<ul>
  <li>Each person must be <strong>trained before</strong> they are delegated any task</li>
  <li>Must include <strong>start and end dates</strong> for each delegation</li>
  <li>Must be <strong>countersigned by the PI</strong></li>
  <li>It is a <strong>living document</strong> — must be updated whenever staff join or leave the study</li>
  <li>Also called the <strong>Staff Signature and Authority Log</strong></li>
  <li>Filed in ISF and eTMF as per the Data Management Plan (DMP)</li>
</ul>

<h2>Training Log</h2>
<p>Records all study-specific training received by site staff. Like the Delegation Log, it is a living document. Must be <strong>signed by both the trainer and the trainee</strong>. Filed in ISF and eTMF.</p>

<h2>Site Visit Log</h2>
<p>Completed during every site visit — serves as evidence of CRA attendance. Countersigned by a site staff member. Filed in ISF and eTMF.</p>

<h2>FDA 1572 / Site Investigation Form (SIF)</h2>
<p>A formal statement of undertaking by the Investigator. Contains:</p>
<ul>
  <li>Name and address of investigators and Sub-Investigators</li>
  <li>Qualifications that qualify the PI as an expert in the investigation area</li>
  <li>Name and address of the facility where the trial will be conducted</li>
  <li>Name and address of any clinical laboratory facilities used</li>
  <li>Name and address of the IEC/IRB responsible for review and approval</li>
  <li>Declaration to conduct the study in accordance with GCP and all applicable regulations</li>
</ul>

<h2>Staff CVs and GCP Certificates</h2>
<ul>
  <li>Collected by the CRA — normally during SSV, before SIV</li>
  <li><strong>GCP certificates renewed every 2 years</strong></li>
  <li><strong>CVs must be signed, dated, and renewed every 3 years</strong></li>
  <li>Filed in ISF and eTMF</li>
</ul>

<h2>Other Documents in the ISF</h2>
<p>Additional documents filed in the ISF include: ISF Checklist (living document), Pre-screening Log, Subject Screening Log, Subject Identification Log, Subject Enrolment Log, IP Accountability Logs, Annual Progress Report, Financial Disclosure Form, Clinical Trial Agreement (CTA), and email communications.</p>

<div class="info-box">
  <div class="info-box-title">📌 The Golden Rule</div>
  <p>In clinical trials: <strong>IF not documented = Not Done.</strong> The ISF is the site's proof that the trial was conducted correctly. Regulators and auditors assess the trial through its documentation.</p>
</div>
`;

// ── MODULE 3, LESSON 2: Informed Consenting Process ──────
CONTENT.informedConsent = `
<h1>The Informed Consenting Process</h1>
<p>Informed consent is one of the most fundamental requirements of GCP. It protects the rights and welfare of trial participants by ensuring they understand exactly what they are agreeing to before participating in any trial procedure. As a CRA, you must verify at every monitoring visit that informed consent was properly obtained and documented for every enrolled subject.</p>
<hr/>

<h2>The Process — Step by Step</h2>
<ol>
  <li>The consent form and Participant Information Sheet (PIS) are <strong>discussed, explained, and reviewed with the subject</strong> — never just handed over to sign</li>
  <li>The subject is given <strong>adequate time</strong> to review the consent form and discuss participation with family members or others if they wish</li>
  <li><strong>All questions and concerns are answered</strong> fully before the subject decides</li>
  <li>The subject confirms they do not have any remaining questions or concerns</li>
  <li>The subject <strong>signs and dates</strong> the informed consent document voluntarily</li>
  <li>A signed copy is given to the subject for their records</li>
  <li>The original signed and dated consent form is placed in the subject records and the ISF binder</li>
  <li>The person obtaining consent must be <strong>qualified and delegated by the PI</strong> — confirmed on the Delegation Log</li>
</ol>

<h2>CRA Verification of Consent at Monitoring Visits</h2>
<p>At every RMV, the CRA must verify consent for every enrolled subject by checking:</p>
<ul>
  <li>Was the correct version of the ICF used at the time of consent?</li>
  <li>Was the ICF signed and dated by the subject <em>before</em> any screening procedure?</li>
  <li>Was it signed by a qualified, delegated staff member — not someone who is not on the delegation log?</li>
  <li>Does the subject have a copy?</li>
  <li>Is the original on file in the ISF?</li>
  <li>If the consent form was amended during the trial, was re-consent obtained and documented?</li>
</ul>

<div class="warning-box">
  <p>⚠️ <strong>Missing or invalid consent is a Critical/Major Protocol Deviation and may constitute a Serious Breach.</strong> If you find a subject who underwent screening procedures before signing consent, this must be immediately escalated to your line manager and the Sponsor.</p>
</div>

<h2>Special Consent Situations</h2>
<ul>
  <li><strong>Vulnerable populations</strong>: Minors, prisoners, or cognitively impaired individuals require additional protections — often a Legal Representative or parent/guardian provides consent (assent)</li>
  <li><strong>Emergency research</strong>: Some trials have provisions for consent waivers in emergency settings — these must be explicitly approved by the REC</li>
  <li><strong>Re-consent after protocol amendment</strong>: If an amendment changes the risk profile or procedures, all currently enrolled subjects must be re-consented on the new version</li>
  <li><strong>Consent in non-English speakers</strong>: A certified translation and interpreter are required — short forms with oral translation are sometimes permitted</li>
</ul>
`;

// ── MODULE 4, LESSON 1: Adverse Events ───────────────────
CONTENT.adverseEvents = `
<h1>Adverse Events in Clinical Trials</h1>
<p>Managing and reporting adverse events correctly is one of the most critical responsibilities in clinical trial conduct. As a CRA, you must ensure the site is identifying, grading, and reporting all events correctly — and you must escalate any gaps immediately.</p>
<hr/>

<h2>Adverse Event (AE)</h2>
<p>An Adverse Event is <strong>any untoward medical occurrence in a patient administered a pharmaceutical product</strong>, which does not necessarily have a causal relationship with the treatment. This includes any unfavourable and unintended sign (including abnormal laboratory findings), symptom, or disease temporally associated with use of the IMP — whether or not related.</p>
<p>AEs are graded using the <strong>Common Terminology Criteria for Adverse Events (CTCAE)</strong>:</p>
<table>
  <tr><th>Grade</th><th>Severity</th><th>Definition</th></tr>
  <tr><td><strong>1</strong></td><td>Mild</td><td>Asymptomatic or mild symptoms; clinical or diagnostic observations only; intervention not indicated</td></tr>
  <tr><td><strong>2</strong></td><td>Moderate</td><td>Minimal, local, or non-invasive intervention indicated</td></tr>
  <tr><td><strong>3</strong></td><td>Severe</td><td>Severe or medically significant; not immediately life-threatening; may limit self-care (ADL)</td></tr>
  <tr><td><strong>4</strong></td><td>Life-threatening</td><td>Urgent or emergent intervention needed</td></tr>
  <tr><td><strong>5</strong></td><td>Death</td><td>Death related to or due to the adverse event</td></tr>
</table>
<p>AEs must be reported to the Sponsor via eCRF and are included in the <strong>Annual Progress Report sent to the Ethics Committee (EC)</strong>.</p>
<hr/>

<h2>Serious Adverse Event (SAE)</h2>
<p>An SAE is an untoward medical occurrence that represents a <strong>significant hazard to the patient</strong>. An event is classified as serious if it results in any of the following:</p>
<ol>
  <li>Death</li>
  <li>Life-threatening (immediately)</li>
  <li>Overnight hospitalisation (initial or prolonged)</li>
  <li>Significant loss of function or disability</li>
  <li>Congenital malformation / birth defect</li>
  <li>Other medically important event (e.g. malignancies, pregnancy)</li>
</ol>
<div class="info-box">
  <div class="info-box-title">📌 Note on "Other Medically Important Events"</div>
  <p>Certain events may not fit neatly into the above categories but are still considered medically significant — for example, all malignancies and pregnancy. These must be treated as SAEs.</p>
</div>
<hr/>

<h2>Serious Adverse Reaction (SAR)</h2>
<p>A SAR is an SAE <strong>with a certain degree of probability that the IMP is the cause</strong>, regardless of the dose administered. Key facts:</p>
<ul>
  <li>Must be reported within <strong>24 hours</strong> of the PI/site being aware</li>
  <li>Normally reported via eCRF or a special SAE/SAR form</li>
  <li>The initial report does NOT need to be complete — follow-up information can be submitted later</li>
  <li>The event must be followed up until <strong>closure</strong> (resolution or stabilisation)</li>
</ul>
<hr/>

<h2>SUSAR — Suspected Unexpected Serious Adverse Reaction</h2>
<p>A SUSAR is an adverse event assessed as being <strong>unexpected, serious, and having a reasonable possibility of causal relationship with the study drug</strong>. "Unexpected" means not listed in the Reference Safety Information (RSI) section of the IB.</p>
<p><strong>Reporting timelines to EudraVigilance (sponsor obligation):</strong></p>
<table>
  <tr><th>Type</th><th>Reporting Timeline</th></tr>
  <tr><td>Fatal or life-threatening SUSAR</td><td>No later than <strong>7 days</strong> after sponsor awareness; completed report within additional <strong>8 days</strong></td></tr>
  <tr><td>Non-fatal / non-life-threatening SUSAR</td><td>No later than <strong>15 days</strong> after sponsor awareness</td></tr>
  <tr><td>Initially non-fatal, later found fatal</td><td>No later than <strong>7 days</strong> after sponsor becomes aware of the change in status</td></tr>
</table>
<hr/>

<h2>Adverse Event of Special Interest (AESI)</h2>
<p>An AESI (serious or non-serious) is one of <strong>scientific and medical concern specific to the sponsor's product or programme</strong> — for which ongoing monitoring and rapid communication by the investigator to the sponsor may be appropriate. It may have a special form for reporting, or be reported via eCRF.</p>
<hr/>

<h2>Serious Breach</h2>
<p>A Serious Breach is a breach likely to affect to a significant degree the <strong>safety, physical integrity, or mental integrity of participants, or the scientific value of the trial</strong>. The Sponsor must notify the MHRA with a written report <strong>within 7 days</strong> of becoming aware of the breach.</p>
<hr/>

<h2>Pregnancy in Clinical Trials</h2>
<p>Pregnancy is usually an <strong>exclusion criterion</strong> — effective contraception is required per protocol, with regular testing. Key points:</p>
<ul>
  <li>Pregnancy itself is <strong>NOT classified as an SAE</strong> — it is reported using a special pregnancy form</li>
  <li>Conditions arising <em>during</em> a pregnancy (e.g. pre-eclampsia) can be classified as AE or SAE</li>
  <li>The PI must follow up the pregnancy <strong>until birth and into baby's infancy</strong></li>
</ul>
`;

// ── MODULE 4, LESSON 2: Protocol Deviation & Noncompliance ──
CONTENT.protocolDeviation = `
<h1>Protocol Deviations &amp; Noncompliance</h1>
<p>Protocol deviations and noncompliance events are a normal part of clinical trial conduct — the goal is not zero deviations, but appropriate detection, documentation, and prevention of recurrence. As a CRA, identifying and managing these events correctly is central to your role.</p>
<hr/>

<h2>Protocol Deviation (PD)</h2>
<p>A Protocol Deviation is <strong>any departure from the approved protocol</strong>. There are two categories:</p>
<table>
  <tr><th>Type</th><th>Definition</th></tr>
  <tr><td><strong>Minor PD</strong></td><td>Does NOT increase risk or decrease benefit to the patient. Does not significantly affect the subject's rights, safety, welfare, or the integrity of research data.</td></tr>
  <tr><td><strong>Major PD (Critical / Important)</strong></td><td>Increases risk or decreases benefit to the patient. Significantly affects the subject's rights, safety, welfare, or the integrity of research data.</td></tr>
</table>
<p>All PDs must be:</p>
<ul>
  <li>Recorded in the <strong>PD log</strong></li>
  <li>Acknowledged, <strong>signed and dated by the PI</strong></li>
  <li>Reviewed by the CRA at every monitoring visit</li>
  <li>Reported to the Sponsor per the protocol and SOPs</li>
</ul>
<div class="warning-box">
  <p>⚠️ A pattern of repeated Minor PDs in the same area can escalate to a Major finding during audit or inspection. Root cause analysis and CAPA should be applied even for minor deviations.</p>
</div>

<h2>Noncompliance (NC)</h2>
<p>Noncompliance is any action or activity associated with the conduct or oversight of research involving human participants that fails to comply with:</p>
<ul>
  <li>The research plan as approved by the Project Team</li>
  <li>A designated IRB/IEC</li>
  <li>Federal / national regulations</li>
  <li>Institutional policies governing such research</li>
</ul>
<p>NCs must be:</p>
<ul>
  <li>Recorded in the <strong>Noncompliance log</strong></li>
  <li>Acknowledged, <strong>signed and dated by the PI</strong></li>
</ul>
<hr/>

<h2>Note to File (NTF)</h2>
<p>An NTF is a document used to explain gaps or discrepancies in trial processes. Important rules:</p>
<ul>
  <li>Must NOT be used if the gap or discrepancy could have been prevented or eliminated</li>
  <li>Should provide additional information or clarification when other documentation is unavailable or inadequate</li>
  <li>Must explain clearly and specifically the reason for the error, omission, or discrepancy</li>
  <li>Consider filing an explanation via email conversation instead — NTF should be a <strong>last option</strong></li>
  <li>Can be used by the site team OR the project team (including CRA)</li>
  <li><strong>Not a source document</strong> — does not replace missing source data</li>
  <li>The FDA has stated in a Warning Letter (October 2007): <em>"NTF is not a panacea"</em></li>
</ul>
`;

// ── MODULE 5, LESSON 1: Data Quality & ALCOA-CCEA ────────
CONTENT.dataQuality = `
<h1>Data Quality &amp; ALCOA-CCEA</h1>
<p>Data quality is not a bureaucratic exercise — it is the foundation on which regulatory decisions about medicines are made. Errors, fraud, or carelessness in data collection can lead to unsafe drugs being approved, or safe and effective drugs being rejected. As a CRA, you are the primary quality safeguard at the site level.</p>
<hr/>

<h2>What Causes Data Quality Issues?</h2>
<p>Data quality issues in clinical trials can be caused by: fraud, misconduct, intentional or unintentional noncompliance, and significant carelessness. Regardless of cause, they <strong>may compromise the validity of the study results</strong>. Reliable study results and quality data are needed to evaluate products for marketing approval and for decisions made on the use of medicines. Early detection is critical so that corrective actions can be implemented during the trial, recurrence can be prevented, and data quality can be preserved.</p>
<hr/>

<h2>ALCOA-CCEA: The Data Integrity Framework</h2>
<p>ALCOA-CCEA defines the nine attributes that all clinical trial data must meet:</p>
<table>
  <tr><th>Letter</th><th>Attribute</th><th>What It Means</th></tr>
  <tr><td><strong>A</strong></td><td>Attributable</td><td>It must be clear who recorded or changed data, and when</td></tr>
  <tr><td><strong>L</strong></td><td>Legible</td><td>Data must be readable — permanently — by humans</td></tr>
  <tr><td><strong>C</strong></td><td>Contemporaneous</td><td>Data must be recorded at the time the observation was made</td></tr>
  <tr><td><strong>O</strong></td><td>Original</td><td>First recorded data is the source — copies must be verified against original</td></tr>
  <tr><td><strong>A</strong></td><td>Accurate</td><td>Data must reflect the actual observation or measurement exactly</td></tr>
  <tr><td><strong>C</strong></td><td>Complete</td><td>All required data fields must be recorded — no gaps without explanation</td></tr>
  <tr><td><strong>C</strong></td><td>Consistent</td><td>Data must be internally consistent across all documents (e.g. same date on source and EDC)</td></tr>
  <tr><td><strong>E</strong></td><td>Enduring</td><td>Records must be maintained and retrievable for the required retention period</td></tr>
  <tr><td><strong>A</strong></td><td>Available</td><td>Data must be accessible and retrievable for review, audit, or inspection when needed</td></tr>
</table>

<h2>Correcting Errors in Paper Records</h2>
<p>In paper source documents, errors must be corrected using the <strong>ALCOA-compliant correction method</strong>:</p>
<ol>
  <li>Draw a <strong>single strikethrough</strong> through the incorrect entry — do NOT use correction fluid (Tipp-Ex) or obliterate the original</li>
  <li>Write the correct entry nearby</li>
  <li>Add the date of correction</li>
  <li>Add the <strong>initials</strong> of the person making the correction</li>
  <li>Add a brief <strong>reason</strong> for the correction (e.g. "transcription error", "incorrect date")</li>
</ol>
<div class="info-box">
  <div class="info-box-title">📌 Electronic Systems</div>
  <p>In EDC, all changes are tracked automatically via audit trail — the original entry is preserved, the new value is recorded, and the user ID, date/time, and reason for change are all captured. The CRA should check audit trails during SDV to ensure changes are appropriately explained.</p>
</div>
<hr/>

<h2>Action Items (AI) and Queries</h2>
<h3>Action Items</h3>
<p>Action Items are tasks required to be completed by the CRA or site personnel to resolve an outstanding need. They are:</p>
<ul>
  <li>Created by the CRA — typically after a site visit, during report writing</li>
  <li>Must be closed once the need is resolved — there is a defined timeline</li>
  <li>Count as part of CRA performance metrics</li>
</ul>

<h3>Queries</h3>
<p>Queries are raised in EDC by the CRA, Data Manager, or system to the site — to correct or clarify information in the EDC. The site must resolve and close queries in a timely manner. CRAs follow up with site personnel to close queries and AIs during RMVs and between visits. Query resolution rates count as CRA performance metrics.</p>
`;

// ── MODULE 5, LESSON 2: CAPA & Quality Management ────────
CONTENT.capaQms = `
<h1>CAPA &amp; Quality Management Systems</h1>
<hr/>

<h2>CAPA — Corrective and Preventive Action</h2>
<p>CAPA is a quality system plan that aims to <strong>resolve compliance issues and prevent further recurrences</strong>. A CAPA plan is crucial to a clinical trial as it helps keep trial participants safe, protects their rights, and prevents study data from being compromised.</p>
<p>The CAPA process includes:</p>
<ol>
  <li><strong>Identify</strong> a potential issue</li>
  <li><strong>Root Cause Analysis</strong> — identify why it occurred</li>
  <li><strong>Corrective Action</strong> — identify actions to prevent recurrence of the issue</li>
  <li><strong>Preventive Action</strong> — identify actions to prevent a similar problem from occurring</li>
  <li><strong>Document</strong> that the Corrective and Preventive Actions were carried out</li>
  <li><strong>Document</strong> that the CAPA has resolved the issue(s)</li>
</ol>
<hr/>

<h2>Quality Management System (QMS)</h2>
<p>A QMS is a control system for a planned and systematic procedure to maintain or improve quality. It consists of processes, guidelines, and templates that describe the standardised procedure to achieve comparable quality of work results.</p>

<h3>QMS Document Hierarchy (Pyramid)</h3>
<table>
  <tr><th>Level</th><th>Document Type</th><th>Purpose</th></tr>
  <tr><td>1 (Top)</td><td><strong>Quality Manual</strong></td><td>Description of the organisation and overview of all processes</td></tr>
  <tr><td>2</td><td><strong>SOPs</strong></td><td>Detailed work processes and responsibilities</td></tr>
  <tr><td>3</td><td><strong>Templates / Forms</strong></td><td>Standardised forms for data and report entry</td></tr>
  <tr><td>4 (Base)</td><td><strong>Records</strong></td><td>Data, reports, completed documents from trial conduct</td></tr>
</table>

<h3>Why Do Clinical Studies Need a QMS?</h3>
<p>In clinical research, there is a legal obligation to collect traceable data and produce reproducible results. There is also a special responsibility to participating patients — <strong>guaranteeing the dignity, privacy and safety of study participants is one of the highest principles</strong> to which researchers and all their staff are committed.</p>

<h3>Goals of a QMS in Clinical Trials</h3>
<ul>
  <li>Ensure safety &amp; protection of study participants</li>
  <li>Ensure quality of study data</li>
  <li>Create overview and transparency of study activities</li>
  <li>Create necessary documentation</li>
  <li>Increase efficiency in the conduct of studies</li>
  <li>Guarantee compliance with ICH-GCP, local and international laws</li>
  <li>Be fit for inspections</li>
</ul>
<hr/>

<h2>QMS Vendors — Systems Used in Clinical Trials</h2>
<table>
  <tr><th>System</th><th>Type</th><th>Key Vendor(s)</th></tr>
  <tr><td><strong>CTMS</strong> (Clinical Trial Management System)</td><td>Sponsor/CRO management system</td><td>Veeva Vault</td></tr>
  <tr><td><strong>eTMF</strong> (Electronic Trial Master File)</td><td>Document management</td><td>Veeva Vault</td></tr>
  <tr><td><strong>EDC</strong> (Electronic Data Capture)</td><td>Data entry — site and CRA access</td><td>Veeva Vault, iMeditata, IBM</td></tr>
  <tr><td><strong>IRT</strong> (Interactive Response Technology)</td><td>Randomisation &amp; IP management</td><td>Suvoda, 4G Clinical, HMD Clinical, IBM</td></tr>
  <tr><td><strong>EMR</strong> (Electronic Medical Record)</td><td>Site-owned patient records (source data)</td><td>EPIC (site-specific)</td></tr>
</table>
<div class="info-box">
  <div class="info-box-title">📌 Site vs Sponsor Access</div>
  <ul>
    <li>Sites require access to <strong>EDC and IRT</strong> — but NOT CTMS or eTMF</li>
    <li>Sites <strong>own the EMR</strong> — the CRA accesses it for SDV, but cannot take copies without authorisation</li>
    <li>IRT interacts with EDC — randomisation in IRT auto-populates the subject record in EDC</li>
  </ul>
</div>
<hr/>

<h2>Audit vs Inspection</h2>
<h3>Audit</h3>
<p>An audit is designed to assess and assure the reliability and integrity of the Sponsor's trial systems against all relevant written standards. The Sponsor is responsible for implementing quality systems and developing an audit plan. Auditors are independent individuals appointed by sponsors/regulatory authorities to conduct a systematic and in-depth examination of trial conduct, compliance with Protocol, SOPs, GCP, and applicable regulatory requirements. Findings are classified as <strong>Minor, Major, or Critical</strong>.</p>

<h3>Inspection</h3>
<p>An inspection is conducted by the <strong>MHRA</strong> (the regulatory authority). It is a type of quality audit triggered by serious breaches, whistleblowers, other MHRA departments, HRA referrals, or routine surveillance. In rare circumstances, the MHRA may give little or no notice. Like audits, inspection findings are classified as <strong>Minor, Major, or Critical</strong>.</p>
`;

// ─────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────
const MODULES = [
  {
    title: 'Module 1: Introduction & Foundations',
    description: 'Overview of the CRA role, the drug development lifecycle, and essential clinical trial terminology.',
    order: 1, isMandatory: true,
    lessons: [
      { title: 'Welcome & Course Overview', lessonType: 'VIDEO', videoUrl: VIDEOS.welcome, videoDurationMinutes: 8, isPreview: true, order: 1, content: CONTENT.welcome },
      { title: 'Key Concepts & Terminology', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.terminology },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        { questionText: 'What does IND stand for?', questionType: 'MULTIPLE_CHOICE', explanation: 'IND = Investigational New Drug application, submitted to the FDA before the first human dose.', marks: 1, order: 1,
          options: [{ optionText: 'Investigational New Drug application', isCorrect: true, order: 1 }, { optionText: 'Investigational Novel Device application', isCorrect: false, order: 2 }, { optionText: 'International New Drug application', isCorrect: false, order: 3 }, { optionText: 'Investigational New Development application', isCorrect: false, order: 4 }] },
        { questionText: 'What does NDA stand for?', questionType: 'MULTIPLE_CHOICE', explanation: 'NDA = New Drug Application, submitted to the FDA for marketing approval after Phase 3.', marks: 1, order: 2,
          options: [{ optionText: 'New Drug Application', isCorrect: true, order: 1 }, { optionText: 'National Drug Authority', isCorrect: false, order: 2 }, { optionText: 'Novel Drug Approval', isCorrect: false, order: 3 }, { optionText: 'New Development Application', isCorrect: false, order: 4 }] },
        { questionText: 'In a clinical trial, being "screened" means the patient has:', questionType: 'MULTIPLE_CHOICE', explanation: 'A patient is considered "screened" once they have signed the Informed Consent Form.', marks: 1, order: 3,
          options: [{ optionText: 'Signed the Informed Consent Form', isCorrect: true, order: 1 }, { optionText: 'Been randomised to a treatment arm', isCorrect: false, order: 2 }, { optionText: 'Completed all eligibility assessments', isCorrect: false, order: 3 }, { optionText: 'Received the first dose of IMP', isCorrect: false, order: 4 }] },
        { questionText: 'What does EDC stand for?', questionType: 'MULTIPLE_CHOICE', explanation: 'EDC = Electronic Data Capture — the system where clinical trial data is recorded.', marks: 1, order: 4,
          options: [{ optionText: 'Electronic Data Capture', isCorrect: true, order: 1 }, { optionText: 'Electronic Device Collection', isCorrect: false, order: 2 }, { optionText: 'Endpoint Data Collection', isCorrect: false, order: 3 }, { optionText: 'Electronic Documentation Control', isCorrect: false, order: 4 }] },
        { questionText: 'Which of the following does the site own?', questionType: 'MULTIPLE_CHOICE', explanation: 'The site owns the EMR (Electronic Medical Record). CTMS and eTMF belong to the Sponsor/CRO.', marks: 1, order: 5,
          options: [{ optionText: 'EMR (Electronic Medical Record)', isCorrect: true, order: 1 }, { optionText: 'eTMF (Electronic Trial Master File)', isCorrect: false, order: 2 }, { optionText: 'CTMS (Clinical Trial Management System)', isCorrect: false, order: 3 }, { optionText: 'IRT (Interactive Response Technology)', isCorrect: false, order: 4 }] },
      ],
    },
  },

  {
    title: 'Module 2: UK Regulatory Framework & Site Visits',
    description: 'MHRA, HRA, NIHR roles and the complete site visit process from Feasibility to Close-out.',
    order: 2, isMandatory: true,
    lessons: [
      { title: 'UK Regulatory Framework', lessonType: 'VIDEO', videoUrl: VIDEOS.siteVisits, videoDurationMinutes: 15, isPreview: false, order: 1, content: CONTENT.ukRegulatory },
      { title: 'Site Visits: Feasibility to Close-out', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.siteVisits },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        { questionText: 'Which body issues the Clinical Trial Authorisation (CTA) in the UK?', questionType: 'MULTIPLE_CHOICE', explanation: 'The MHRA issues the CTA via the IRAS portal.', marks: 1, order: 1,
          options: [{ optionText: 'MHRA', isCorrect: true, order: 1 }, { optionText: 'HRA', isCorrect: false, order: 2 }, { optionText: 'NIHR', isCorrect: false, order: 3 }, { optionText: 'NHS England', isCorrect: false, order: 4 }] },
        { questionText: 'How many RECs does the HRA oversee in England?', questionType: 'MULTIPLE_CHOICE', explanation: 'The HRA has 65 RECs in England (85 total across UK).', marks: 1, order: 2,
          options: [{ optionText: '65', isCorrect: true, order: 1 }, { optionText: '85', isCorrect: false, order: 2 }, { optionText: '50', isCorrect: false, order: 3 }, { optionText: '11', isCorrect: false, order: 4 }] },
        { questionText: 'The SSV report must be written within:', questionType: 'MULTIPLE_CHOICE', explanation: 'The SSV report must be completed within 15 working days.', marks: 1, order: 3,
          options: [{ optionText: '15 working days', isCorrect: true, order: 1 }, { optionText: '10 working days', isCorrect: false, order: 2 }, { optionText: '5 working days', isCorrect: false, order: 3 }, { optionText: '30 days', isCorrect: false, order: 4 }] },
        { questionText: 'What must be signed before a site receives the Protocol Synopsis?', questionType: 'MULTIPLE_CHOICE', explanation: 'A CDA (Confidentiality Disclosure Agreement) must be signed before sharing any trial-specific information.', marks: 1, order: 4,
          options: [{ optionText: 'CDA (Confidentiality Disclosure Agreement)', isCorrect: true, order: 1 }, { optionText: 'CTA (Clinical Trial Agreement)', isCorrect: false, order: 2 }, { optionText: 'Protocol Signature Page', isCorrect: false, order: 3 }, { optionText: 'Delegation Log', isCorrect: false, order: 4 }] },
        { questionText: 'Which of the following is the LAST step in the site visit lifecycle?', questionType: 'MULTIPLE_CHOICE', explanation: 'COV (Close-out Visit) is the last formal site visit, following the SIV and monitoring visits.', marks: 1, order: 5,
          options: [{ optionText: 'Close-out Visit (COV)', isCorrect: true, order: 1 }, { optionText: 'Site Initiation Visit (SIV)', isCorrect: false, order: 2 }, { optionText: 'Routine Monitoring Visit (RMV)', isCorrect: false, order: 3 }, { optionText: 'Site Selection Visit (SSV)', isCorrect: false, order: 4 }] },
      ],
    },
  },

  {
    title: 'Module 3: Key Trial Documents',
    description: 'Protocol, IB, Informed Consent, Delegation Log, and all essential documents filed in the ISF and eTMF.',
    order: 3, isMandatory: true,
    lessons: [
      { title: 'Key Trial Documents: Protocol, IB & ISF', lessonType: 'VIDEO', videoUrl: VIDEOS.documents, videoDurationMinutes: 15, isPreview: false, order: 1, content: CONTENT.keyDocuments },
      { title: 'The Informed Consenting Process', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.informedConsent },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        { questionText: 'The Protocol Signature Page (PSP) must be signed by the PI:', questionType: 'MULTIPLE_CHOICE', explanation: 'The PSP must be signed by the PI before the trial starts.', marks: 1, order: 1,
          options: [{ optionText: 'Before the trial starts', isCorrect: true, order: 1 }, { optionText: 'After the first patient is enrolled', isCorrect: false, order: 2 }, { optionText: 'At the Close-out Visit', isCorrect: false, order: 3 }, { optionText: 'Within 30 days of SIV', isCorrect: false, order: 4 }] },
        { questionText: 'GCP certificates must be renewed every:', questionType: 'MULTIPLE_CHOICE', explanation: 'GCP certificates are renewed every 2 years.', marks: 1, order: 2,
          options: [{ optionText: '2 years', isCorrect: true, order: 1 }, { optionText: '3 years', isCorrect: false, order: 2 }, { optionText: '5 years', isCorrect: false, order: 3 }, { optionText: '1 year', isCorrect: false, order: 4 }] },
        { questionText: 'CVs in the ISF must be signed, dated, and renewed every:', questionType: 'MULTIPLE_CHOICE', explanation: 'Staff CVs must be signed, dated, and renewed every 3 years.', marks: 1, order: 3,
          options: [{ optionText: '3 years', isCorrect: true, order: 1 }, { optionText: '2 years', isCorrect: false, order: 2 }, { optionText: '5 years', isCorrect: false, order: 3 }, { optionText: 'Annually', isCorrect: false, order: 4 }] },
        { questionText: 'The Delegation Log is also known as:', questionType: 'MULTIPLE_CHOICE', explanation: 'The Delegation Log is also called the Staff Signature and Authority Log.', marks: 1, order: 4,
          options: [{ optionText: 'Staff Signature and Authority Log', isCorrect: true, order: 1 }, { optionText: 'Training Log', isCorrect: false, order: 2 }, { optionText: 'Site Visit Log', isCorrect: false, order: 3 }, { optionText: 'Subject Enrolment Log', isCorrect: false, order: 4 }] },
        { questionText: 'Who must countersign the Delegation Log?', questionType: 'MULTIPLE_CHOICE', explanation: 'The Delegation Log must be countersigned by the PI.', marks: 1, order: 5,
          options: [{ optionText: 'The Principal Investigator (PI)', isCorrect: true, order: 1 }, { optionText: 'The CRA', isCorrect: false, order: 2 }, { optionText: 'The Sponsor Medical Monitor', isCorrect: false, order: 3 }, { optionText: 'The MHRA', isCorrect: false, order: 4 }] },
      ],
    },
  },

  {
    title: 'Module 4: Adverse Events & Trial Events',
    description: 'AE grading, SAE criteria, SAR, SUSAR timelines, Protocol Deviations, and Noncompliance.',
    order: 4, isMandatory: true,
    lessons: [
      { title: 'Adverse Events: AE, SAE, SAR & SUSAR', lessonType: 'VIDEO', videoUrl: VIDEOS.adverseEvents, videoDurationMinutes: 18, isPreview: false, order: 1, content: CONTENT.adverseEvents },
      { title: 'Protocol Deviations, Noncompliance & Note to File', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.protocolDeviation },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        { questionText: 'A CTCAE Grade 3 Adverse Event is defined as:', questionType: 'MULTIPLE_CHOICE', explanation: 'Grade 3 = Severe: severe/medically significant, not immediately life-threatening, may limit self-care in ADL.', marks: 1, order: 1,
          options: [{ optionText: 'Severe; medically significant but not life-threatening; may limit self-care', isCorrect: true, order: 1 }, { optionText: 'Mild; asymptomatic; no intervention needed', isCorrect: false, order: 2 }, { optionText: 'Life-threatening; urgent intervention needed', isCorrect: false, order: 3 }, { optionText: 'Moderate; minimal intervention needed', isCorrect: false, order: 4 }] },
        { questionText: 'An SAR must be reported within how many hours of the PI/site becoming aware?', questionType: 'MULTIPLE_CHOICE', explanation: 'SARs must be reported within 24 hours of PI/site awareness.', marks: 1, order: 2,
          options: [{ optionText: '24 hours', isCorrect: true, order: 1 }, { optionText: '7 days', isCorrect: false, order: 2 }, { optionText: '15 days', isCorrect: false, order: 3 }, { optionText: '48 hours', isCorrect: false, order: 4 }] },
        { questionText: 'A fatal SUSAR must be reported to EudraVigilance no later than:', questionType: 'MULTIPLE_CHOICE', explanation: 'Fatal SUSARs: 7 days from sponsor awareness, with a complete report within 8 additional days.', marks: 1, order: 3,
          options: [{ optionText: '7 days from sponsor awareness (+ 8 days for completed report)', isCorrect: true, order: 1 }, { optionText: '15 days from sponsor awareness', isCorrect: false, order: 2 }, { optionText: '24 hours from sponsor awareness', isCorrect: false, order: 3 }, { optionText: '30 days from sponsor awareness', isCorrect: false, order: 4 }] },
        { questionText: 'A Major Protocol Deviation is one that:', questionType: 'MULTIPLE_CHOICE', explanation: 'A Major PD increases risk or decreases benefit to the patient, significantly affecting their rights, safety, welfare, or data integrity.', marks: 1, order: 4,
          options: [{ optionText: 'Increases risk or decreases benefit to the patient, affecting safety, welfare, or data integrity', isCorrect: true, order: 1 }, { optionText: 'Does not affect patient safety or data quality', isCorrect: false, order: 2 }, { optionText: 'Is a minor administrative error only', isCorrect: false, order: 3 }, { optionText: 'Is only relevant if identified during an MHRA inspection', isCorrect: false, order: 4 }] },
        { questionText: 'Pregnancy in a clinical trial subject is classified as:', questionType: 'MULTIPLE_CHOICE', explanation: 'Pregnancy is NOT an SAE — it is reported using a special pregnancy form.', marks: 1, order: 5,
          options: [{ optionText: 'A reportable event using a special pregnancy form — not an SAE', isCorrect: true, order: 1 }, { optionText: 'A Grade 4 Adverse Event', isCorrect: false, order: 2 }, { optionText: 'A Serious Adverse Event', isCorrect: false, order: 3 }, { optionText: 'A Protocol Deviation', isCorrect: false, order: 4 }] },
      ],
    },
  },

  {
    title: 'Module 5: Data Quality, CAPA & QMS',
    description: 'ALCOA-CCEA principles, CAPA processes, Quality Management Systems, and QMS vendor tools.',
    order: 5, isMandatory: true,
    lessons: [
      { title: 'Data Quality & ALCOA-CCEA', lessonType: 'VIDEO', videoUrl: VIDEOS.quality, videoDurationMinutes: 12, isPreview: false, order: 1, content: CONTENT.dataQuality },
      { title: 'CAPA, QMS, Audit & Inspection', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.capaQms },
    ],
    quiz: {
      title: 'Module 5 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        { questionText: 'In ALCOA-CCEA, "C — Contemporaneous" means:', questionType: 'MULTIPLE_CHOICE', explanation: 'Contemporaneous = data recorded at the time the observation was made, not later from memory.', marks: 1, order: 1,
          options: [{ optionText: 'Data was recorded at the time the observation was made', isCorrect: true, order: 1 }, { optionText: 'Data is traceable to the person who recorded it', isCorrect: false, order: 2 }, { optionText: 'Data reflects the exact observation', isCorrect: false, order: 3 }, { optionText: 'Data is available for review at any time', isCorrect: false, order: 4 }] },
        { questionText: 'When correcting a paper source document error, you should:', questionType: 'MULTIPLE_CHOICE', explanation: 'ALCOA-compliant correction: single strikethrough, write correct value, date, initials, and reason. Never use Tipp-Ex.', marks: 1, order: 2,
          options: [{ optionText: 'Single strikethrough the error, write correct entry, add date, initials, and reason', isCorrect: true, order: 1 }, { optionText: 'Use correction fluid (Tipp-Ex) to cover the error', isCorrect: false, order: 2 }, { optionText: 'Destroy the document and rewrite it', isCorrect: false, order: 3 }, { optionText: 'Leave a note in the margin without crossing out the original', isCorrect: false, order: 4 }] },
        { questionText: 'CAPA stands for:', questionType: 'MULTIPLE_CHOICE', explanation: 'CAPA = Corrective and Preventive Action.', marks: 1, order: 3,
          options: [{ optionText: 'Corrective and Preventive Action', isCorrect: true, order: 1 }, { optionText: 'Compliance Audit Protocol Assessment', isCorrect: false, order: 2 }, { optionText: 'Clinical Audit and Protocol Adherence', isCorrect: false, order: 3 }, { optionText: 'Corrective Action Protocol Approach', isCorrect: false, order: 4 }] },
        { questionText: 'Which vendor provides IRT for IP management and randomisation?', questionType: 'MULTIPLE_CHOICE', explanation: 'Suvoda, 4G Clinical, HMD Clinical, and IBM all provide IRT systems.', marks: 1, order: 4,
          options: [{ optionText: 'Suvoda', isCorrect: true, order: 1 }, { optionText: 'EPIC', isCorrect: false, order: 2 }, { optionText: 'iMeditata', isCorrect: false, order: 3 }, { optionText: 'Veeva Vault', isCorrect: false, order: 4 }] },
        { questionText: 'An inspection conducted by the MHRA differs from a Sponsor audit in that:', questionType: 'MULTIPLE_CHOICE', explanation: 'An inspection is by a regulatory authority (MHRA); an audit is by the Sponsor or independent auditors.', marks: 1, order: 5,
          options: [{ optionText: 'An inspection is by the MHRA (regulatory authority); an audit is by the Sponsor or independent auditors', isCorrect: true, order: 1 }, { optionText: 'An inspection is internal; an audit is by regulators', isCorrect: false, order: 2 }, { optionText: 'They are the same with different names', isCorrect: false, order: 3 }, { optionText: 'Only inspections result in formal findings', isCorrect: false, order: 4 }] },
      ],
    },
  },

  {
    title: 'Module 6: Final Assessment',
    description: 'Comprehensive final assessment covering all CRA Foundation modules. Pass to unlock your certificate.',
    order: 6, isMandatory: true,
    lessons: [
      { title: 'Course Summary & Exam Preparation', lessonType: 'TEXT', isPreview: false, order: 1, content: `
<h1>Course Summary &amp; Exam Preparation</h1>
<p>You have now covered all the core content of the CRA Foundation course. Before taking the final assessment, use this summary to consolidate your knowledge.</p>
<h2>Key Points to Remember</h2>
<ul>
  <li><strong>Drug Lifecycle:</strong> Discovery → Preclinical → Clinical (Ph 1–3) → Regulatory Approval → Post-Market (Ph 4)</li>
  <li><strong>UK Regulatory Approvals:</strong> MHRA CTA, HRA Approval, REC Favourable Opinion, NHS R&amp;D C&amp;C Letter — all four must be in the ISF before site opening</li>
  <li><strong>Visit Reports:</strong> SSV = 15 working days; SIV/RMV/COV = 10 working days</li>
  <li><strong>Documents:</strong> ISF holds site documents; eTMF holds Sponsor/CRO documents</li>
  <li><strong>Delegation Log:</strong> Living document, countersigned by PI, training before delegation</li>
  <li><strong>CVs:</strong> Renewed every 3 years; <strong>GCP:</strong> Renewed every 2 years</li>
  <li><strong>SAR reporting:</strong> Within 24 hours of PI awareness</li>
  <li><strong>SUSAR reporting:</strong> Fatal = 7 days; Non-fatal = 15 days</li>
  <li><strong>ALCOA-CCEA:</strong> Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available</li>
  <li><strong>CAPA:</strong> Identify → Root Cause → Corrective Action → Preventive Action → Document</li>
  <li><strong>Pregnancy:</strong> NOT an SAE — use special pregnancy form</li>
  <li><strong>NTF:</strong> Last resort; not a source document; not a panacea</li>
  <li><strong>Golden rule:</strong> IF not documented = Not Done</li>
</ul>
<blockquote>💡 The final assessment has 15 questions covering all 5 modules. Pass mark is 70% (11/15). You have 3 attempts. Good luck!</blockquote>
` },
    ],
    quiz: {
      title: 'Final Assessment: Clinical Research Associate (CRA) Foundation',
      instructions: 'This is the final course assessment covering all modules. Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Your certificate is issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 30, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: 'What are the correct stages of the drug development life cycle?', questionType: 'MULTIPLE_CHOICE', explanation: 'Discovery → Preclinical → Clinical → Regulatory Approval → Post-Market Surveillance.', marks: 1, order: 1,
          options: [{ optionText: 'Discovery → Preclinical → Clinical → Regulatory Approval → Post-Market Surveillance', isCorrect: true, order: 1 }, { optionText: 'Preclinical → Clinical → Discovery → Regulatory Approval', isCorrect: false, order: 2 }, { optionText: 'Clinical → Preclinical → Discovery → Post-Market', isCorrect: false, order: 3 }, { optionText: 'Regulatory Approval → Clinical → Discovery → Surveillance', isCorrect: false, order: 4 }] },
        { questionText: 'Which UK organisations are involved in clinical trial regulatory approval?', questionType: 'MULTI_SELECT', explanation: 'MHRA, HRA, and NIHR are the three UK bodies. FDA is the US regulator, not UK.', marks: 2, order: 2,
          options: [{ optionText: 'MHRA', isCorrect: true, order: 1 }, { optionText: 'HRA', isCorrect: true, order: 2 }, { optionText: 'NIHR', isCorrect: true, order: 3 }, { optionText: 'FDA', isCorrect: false, order: 4 }] },
        { questionText: 'What letter does NHS R&D issue to confirm an NHS site can participate in a trial?', questionType: 'MULTIPLE_CHOICE', explanation: 'NHS R&D issues a Capacity and Capability (C&C) Confirmation Letter.', marks: 1, order: 3,
          options: [{ optionText: 'Capacity and Capability (C&C) Confirmation Letter', isCorrect: true, order: 1 }, { optionText: 'Site Activation Letter', isCorrect: false, order: 2 }, { optionText: 'Favourable Opinion Letter', isCorrect: false, order: 3 }, { optionText: 'HRA Approval Letter', isCorrect: false, order: 4 }] },
        { questionText: 'The Site Selection Visit report must be written within:', questionType: 'MULTIPLE_CHOICE', explanation: 'SSV report = 15 working days.', marks: 1, order: 4,
          options: [{ optionText: '15 working days', isCorrect: true, order: 1 }, { optionText: '10 working days', isCorrect: false, order: 2 }, { optionText: '5 working days', isCorrect: false, order: 3 }, { optionText: '30 calendar days', isCorrect: false, order: 4 }] },
        { questionText: 'Which activities are performed at a Close-out Visit?', questionType: 'MULTI_SELECT', explanation: 'COV: final IMP reconciliation, collecting signed logs, shutting down vendors, closing AIs/queries, archiving discussion.', marks: 2, order: 5,
          options: [{ optionText: 'Final IMP accountability and reconciliation', isCorrect: true, order: 1 }, { optionText: 'Sign and collect all logs', isCorrect: true, order: 2 }, { optionText: 'Train the site team on the Protocol', isCorrect: false, order: 3 }, { optionText: 'Shut down all vendor access (EDC, IRT)', isCorrect: true, order: 4 }, { optionText: 'Discuss archiving requirements with the site team', isCorrect: true, order: 5 }] },
        { questionText: 'The Investigator\'s Brochure (IB) contains Reference Safety Information (RSI) used to assess:', questionType: 'MULTIPLE_CHOICE', explanation: 'RSI in the IB is used to determine whether a Serious Adverse Reaction is "expected" or "unexpected" (SUSAR).', marks: 1, order: 6,
          options: [{ optionText: 'Whether a Serious Adverse Reaction is expected or unexpected (SUSAR determination)', isCorrect: true, order: 1 }, { optionText: 'Whether a site has adequate staffing', isCorrect: false, order: 2 }, { optionText: 'Patient eligibility criteria', isCorrect: false, order: 3 }, { optionText: 'The schedule of assessments', isCorrect: false, order: 4 }] },
        { questionText: 'Which of the following are classified as Serious Adverse Events?', questionType: 'MULTI_SELECT', explanation: 'SAEs: death, life-threatening, hospitalisation, disability, congenital malformation, other medically important events.', marks: 2, order: 7,
          options: [{ optionText: 'Death', isCorrect: true, order: 1 }, { optionText: 'Life-threatening event', isCorrect: true, order: 2 }, { optionText: 'Overnight hospitalisation', isCorrect: true, order: 3 }, { optionText: 'Grade 1 fatigue with no intervention', isCorrect: false, order: 4 }, { optionText: 'Congenital malformation', isCorrect: true, order: 5 }] },
        { questionText: 'A non-fatal SUSAR must be reported to EudraVigilance within:', questionType: 'MULTIPLE_CHOICE', explanation: 'Non-fatal SUSARs must be reported within 15 days of sponsor awareness.', marks: 1, order: 8,
          options: [{ optionText: '15 days of sponsor awareness', isCorrect: true, order: 1 }, { optionText: '7 days of sponsor awareness', isCorrect: false, order: 2 }, { optionText: '24 hours of sponsor awareness', isCorrect: false, order: 3 }, { optionText: '30 days of sponsor awareness', isCorrect: false, order: 4 }] },
        { questionText: 'The "L" in ALCOA-CCEA stands for:', questionType: 'MULTIPLE_CHOICE', explanation: 'L = Legible — data must be readable permanently.', marks: 1, order: 9,
          options: [{ optionText: 'Legible', isCorrect: true, order: 1 }, { optionText: 'Linked', isCorrect: false, order: 2 }, { optionText: 'Logged', isCorrect: false, order: 3 }, { optionText: 'Listed', isCorrect: false, order: 4 }] },
        { questionText: 'CAPA stands for:', questionType: 'MULTIPLE_CHOICE', explanation: 'CAPA = Corrective and Preventive Action.', marks: 1, order: 10,
          options: [{ optionText: 'Corrective and Preventive Action', isCorrect: true, order: 1 }, { optionText: 'Clinical Audit and Protocol Assessment', isCorrect: false, order: 2 }, { optionText: 'Compliance Action Plan Assessment', isCorrect: false, order: 3 }, { optionText: 'Corrective Action Protocol Approach', isCorrect: false, order: 4 }] },
        { questionText: 'Which of the following is the correct method for correcting a paper source document error?', questionType: 'MULTIPLE_CHOICE', explanation: 'Single strikethrough, correct entry, date, initials, reason. Never use Tipp-Ex.', marks: 1, order: 11,
          options: [{ optionText: 'Single strikethrough, write correct entry, add date, initials, and reason for change', isCorrect: true, order: 1 }, { optionText: 'Use correction fluid to cover the error, then rewrite', isCorrect: false, order: 2 }, { optionText: 'Scan and reprint the page with the correct value', isCorrect: false, order: 3 }, { optionText: 'Draw multiple lines through the error to ensure it is illegible', isCorrect: false, order: 4 }] },
        { questionText: '"If it was not documented, it was not done." This applies to:', questionType: 'MULTIPLE_CHOICE', explanation: 'This fundamental GCP principle applies to ALL clinical trial activities, without exception.', marks: 1, order: 12,
          options: [{ optionText: 'All clinical trial activities', isCorrect: true, order: 1 }, { optionText: 'SAE reporting only', isCorrect: false, order: 2 }, { optionText: 'Protocol procedures only', isCorrect: false, order: 3 }, { optionText: 'Financial reconciliation only', isCorrect: false, order: 4 }] },
        { questionText: 'A Serious Breach must be reported to the MHRA within:', questionType: 'MULTIPLE_CHOICE', explanation: 'A Serious Breach must be reported to the MHRA within 7 days of the Sponsor becoming aware.', marks: 1, order: 13,
          options: [{ optionText: '7 days of the Sponsor becoming aware', isCorrect: true, order: 1 }, { optionText: '24 hours of the Sponsor becoming aware', isCorrect: false, order: 2 }, { optionText: '15 days of the Sponsor becoming aware', isCorrect: false, order: 3 }, { optionText: '30 days of the Sponsor becoming aware', isCorrect: false, order: 4 }] },
        { questionText: 'Note to File (NTF) is:', questionType: 'MULTIPLE_CHOICE', explanation: 'An NTF explains gaps or discrepancies — it is NOT a source document and should be a last resort.', marks: 1, order: 14,
          options: [{ optionText: 'A document used as a last resort to explain gaps; not a source document', isCorrect: true, order: 1 }, { optionText: 'The primary source document for a trial procedure', isCorrect: false, order: 2 }, { optionText: 'A mandatory regulatory submission', isCorrect: false, order: 3 }, { optionText: 'A form used to report Protocol Deviations', isCorrect: false, order: 4 }] },
        { questionText: 'Which system do sites use to randomise patients and manage IMP?', questionType: 'MULTIPLE_CHOICE', explanation: 'IRT (Interactive Response Technology) is used for patient randomisation and IP management. Sites need IRT access, not CTMS.', marks: 1, order: 15,
          options: [{ optionText: 'IRT (Interactive Response Technology)', isCorrect: true, order: 1 }, { optionText: 'CTMS (Clinical Trial Management System)', isCorrect: false, order: 2 }, { optionText: 'eTMF (Electronic Trial Master File)', isCorrect: false, order: 3 }, { optionText: 'EMR (Electronic Medical Record)', isCorrect: false, order: 4 }] },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  SEEDING: Clinical Research Associate (CRA) Foundation');
  console.log('  Content format: HTML strings | Videos: YouTube');
  console.log('═══════════════════════════════════════════════════════\n');

  const existing = await prisma.course.findUnique({
    where: { slug: COURSE_SLUG },
    include: { modules: { include: { lessons: true, quiz: { include: { questions: { include: { options: true } } } } } } },
  });

  if (!existing) {
    console.error(`❌ Course "${COURSE_SLUG}" not found. Run node prisma/seed.js && node prisma/seed-courses.js first.\n`);
    return;
  }

  // Clear existing modules/lessons/quizzes
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
      title: 'Clinical Research Associate (CRA) Foundation',
      subtitle: 'Step into the CRA role with UK-focused trial management, monitoring, and compliance training',
      learningObjectives: [
        'Understand the CRA role and UK clinical trial regulatory landscape (MHRA, HRA, NIHR)',
        'Plan and conduct Feasibility, SSV, SIV, RMV/IMV, and Close-out Visits',
        'Manage all key trial documents: Protocol, IB, ISF, Delegation Log, and more',
        'Classify and report Adverse Events, SAEs, SARs, and SUSARs correctly',
        'Apply ALCOA-CCEA data integrity principles in daily monitoring work',
        'Implement CAPA and understand Quality Management Systems (QMS)',
      ],
      prerequisites: ['ICH GCP fundamentals recommended', 'Basic clinical research knowledge'],
      targetAudience: ['Aspiring CRAs and clinical trial monitors', 'Research Nurses transitioning to CRO roles', 'Clinical research graduates', 'Junior CRAs consolidating foundational knowledge'],
      durationHours: 10,
      difficultyLevel: 'INTERMEDIATE',
      accreditation: 'ACRP Approved | ICH GCP E6(R3) Aligned | MHRA Aligned',
      price: 179.00,
      originalPrice: 229.00,
      isFeatured: true,
      isPublished: true,
      seoTitle: 'CRA Foundation Course | Clinical Research Associate Training UK',
      seoDescription: 'UK CRA Foundation course covering site visits, trial documents, adverse event reporting, ALCOA-CCEA, CAPA, and QMS. ICH GCP E6(R3) aligned. ACRP approved.',
      tags: ['CRA', 'monitoring', 'site-management', 'UK', 'MHRA', 'GCP', 'ISF', 'TMF', 'AE', 'SAE', 'SUSAR', 'ALCOA', 'CAPA', 'QMS', 'SIV', 'SSV', 'COV'],
    },
  });
  console.log('✅ Course metadata updated.\n');

  // Build modules, lessons, quizzes
  let totalLessons = 0, totalQuestions = 0;

  for (const modData of MODULES) {
    process.stdout.write(`  📦 ${modData.title}... `);

    const module = await prisma.module.create({
      data: { courseId: existing.id, title: modData.title, description: modData.description, order: modData.order, isMandatory: modData.isMandatory },
    });

    for (const l of modData.lessons) {
      await prisma.lesson.create({
        data: {
          moduleId: module.id,
          title: l.title,
          lessonType: l.lessonType,
          content: l.content,
          videoUrl: l.videoUrl || null,
          videoDurationMinutes: l.videoDurationMinutes || null,
          isPreview: l.isPreview,
          order: l.order,
          downloadableResources: l.downloadableResources || null,
        },
      });
      totalLessons++;
    }

    if (modData.quiz) {
      const { questions, ...qMeta } = modData.quiz;
      const quiz = await prisma.quiz.create({
        data: { moduleId: module.id, title: qMeta.title, instructions: qMeta.instructions, passMarkPercentage: qMeta.passMarkPercentage, timeLimitMinutes: qMeta.timeLimitMinutes || null, maxAttempts: qMeta.maxAttempts, randomizeQuestions: qMeta.randomizeQuestions },
      });
      for (const q of questions) {
        const { options, ...qData } = q;
        const question = await prisma.quizQuestion.create({
          data: { quizId: quiz.id, questionText: qData.questionText, questionType: qData.questionType, explanation: qData.explanation, marks: qData.marks, order: qData.order },
        });
        for (const opt of options) {
          await prisma.quizOption.create({ data: { questionId: question.id, optionText: opt.optionText, isCorrect: opt.isCorrect, order: opt.order } });
        }
        totalQuestions++;
      }
    }

    console.log(`✅ (${modData.lessons.length} lessons, ${modData.quiz?.questions?.length || 0} quiz Qs)`);
  }

  // Certificate template
  const cert = await prisma.certificateTemplate.findUnique({ where: { courseId: existing.id } });
  if (!cert) {
    await prisma.certificateTemplate.create({
      data: {
        courseId: existing.id,
        heading: 'Certificate of Completion',
        bodyText: 'This is to certify that the above-named learner has successfully completed "Clinical Research Associate (CRA) Foundation" and demonstrated competency in all assessed learning outcomes.',
        signatureName: 'Dr. Sarah Mitchell',
        signatureTitle: 'Lead Clinical Research Trainer, Exon Sciences',
        logoUrl: 'https://exonsciences.com/assets/logo-dark.png',
      },
    });
    console.log('\n  🏅 Certificate template created.');
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  ✨ SEED COMPLETE');
  console.log(`  Modules: ${MODULES.length} | Lessons: ${totalLessons} | Quiz Questions: ${totalQuestions}`);
  console.log('  Content: Rich HTML strings (rendered via dangerouslySetInnerHTML)');
  console.log('  Videos: YouTube embeds (replace with own recordings when ready)');
  console.log('  Preview: /courses/clinical-research-associate-foundation');
  console.log('═══════════════════════════════════════════════════════\n');
}

main()
  .catch(e => { console.error('❌', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
