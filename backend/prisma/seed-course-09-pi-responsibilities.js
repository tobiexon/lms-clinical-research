/**
 * COURSE 09: Principal Investigator Responsibilities
 * ────────────────────────────────────────────────────
 * INTERMEDIATE | Investigator & Site Training
 *
 * Content sources:
 *  - Clinical Research Nexus training document (MHRA/HRA, site visits, ISF,
 *    informed consent, delegation log, training log, IP accountability, AEs,
 *    SAEs, SUSARs, protocol deviations, ALCOA-CCEA, QMS, CAPA)
 *  - ICH GCP E6(R3) principles
 *  - UK CTR 2025 / MHRA GCP guidance
 *
 * Module structure (5 modules × 2 lessons + quizzes):
 *  1. Legal & Ethical Framework for the PI
 *  2. Site File Management & Essential Documents
 *  3. Informed Consent & Subject Protection
 *  4. Investigational Product Accountability & Safety Reporting
 *  5. Protocol Compliance, Delegation & Final Assessment
 *
 * Run: node prisma/seed-course-09-pi-responsibilities.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'principal-investigator-responsibilities';

const VIDEOS = {
  module1: 'https://www.youtube.com/watch?v=Fo0C0v_NHGE',  // UK clinical trial regulatory overview
  module2: 'https://www.youtube.com/watch?v=QyLMCFygfCE',  // ISF/TMF management
  module3: 'https://www.youtube.com/watch?v=r3u_-7G8LbQ',  // Informed consent process
  module4: 'https://www.youtube.com/watch?v=hNe9K3G3sAM',  // IP accountability & SAE reporting
  module5: 'https://www.youtube.com/watch?v=6W7aP9oA-T8',  // Protocol compliance & delegation
};

const CONTENT = {};

// ══════════════════════════════════════════════════════════════
// MODULE 1 — Legal & Ethical Framework for the PI
// ══════════════════════════════════════════════════════════════

CONTENT.mod1video = `
<h1>The Principal Investigator: Legal, Ethical & Operational Responsibilities</h1>
<p>The <strong>Principal Investigator (PI)</strong> is the individual who takes primary responsibility for the conduct of a clinical trial at a site. Under ICH GCP E6(R3) and the UK Clinical Trials Regulations 2025, the PI holds significant legal, ethical, and operational obligations — and personal accountability for everything that happens at their site.</p>

<h2>Who Is the Principal Investigator?</h2>
<p>The PI is a medically or scientifically qualified person responsible for the conduct of a clinical trial at a trial site. At multi-site trials, one PI is responsible for each site. Key characteristics:</p>
<ul>
  <li>Must be qualified by education, training, and experience to assume responsibility for the proper conduct of the trial</li>
  <li>Must have access to the resources (staff, facilities, equipment) required to conduct the trial safely and correctly</li>
  <li>Bears <strong>personal legal accountability</strong> for GCP compliance at the site</li>
  <li>Cannot delegate accountability — only specific tasks can be delegated to qualified staff</li>
</ul>

<h2>The Four Approvals Required Before the PI Can Open Their Site</h2>
<p>Before any participant can be enrolled, all four regulatory documents must be in place and filed in the ISF:</p>
<ol>
  <li><strong>MHRA Initial Approval Letter</strong> — Clinical Trial Authorisation granted</li>
  <li><strong>HRA Approval Letter</strong> — legal compliance and governance confirmed</li>
  <li><strong>REC Favourable Opinion Letter</strong> — ethics committee approval</li>
  <li><strong>NHS R&D Capacity &amp; Capability Confirmation Letter</strong> — for NHS sites</li>
</ol>

<blockquote>💡 <strong>Watch the video above</strong> for a comprehensive overview of the Principal Investigator's legal duties under UK CTR 2025 and ICH GCP E6(R3) — from site opening to trial closure.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 PI vs Sub-Investigator</div>
  <p>The <strong>PI</strong> holds overall accountability for the site. <strong>Sub-Investigators (Sub-Is)</strong> are other medical professionals who work under the PI's supervision and to whom specific tasks are formally delegated. The PI must ensure all Sub-Is are appropriately qualified, trained, and listed on the Delegation Log before they perform any trial tasks.</p>
</div>

<h2>Choosing and Conducting a Clinical Trial at a Site</h2>
<p>The lifecycle of site involvement follows a structured sequence:</p>
<table>
  <tr><th>Stage</th><th>Activity</th></tr>
  <tr><td><strong>Feasibility Questionnaire</strong></td><td>Site completes questionnaire confirming capacity, patient population, and facilities</td></tr>
  <tr><td><strong>Site Selection Visit (SSV)</strong></td><td>Sponsor/CRO visits to confirm adequate resources; PI and Sub-I CVs and GCP certificates collected</td></tr>
  <tr><td><strong>Site Initiation Visit (SIV)</strong></td><td>Full site training; regulatory documents reviewed; site activated for enrolment</td></tr>
  <tr><td><strong>Routine Monitoring Visits (RMV/IMV)</strong></td><td>CRA monitors data integrity, GCP compliance, SAE reporting, IP accountability</td></tr>
  <tr><td><strong>Close-Out Visit (COV)</strong></td><td>Trial closed; IMP reconciled; logs collected; archiving arrangements confirmed</td></tr>
</table>
`;

CONTENT.mod1text = `
<h1>ICH GCP E6(R3) Principles & The PI's Legal Duties</h1>
<p>The PI's responsibilities are grounded in <strong>ICH GCP E6(R3)</strong> — the international guideline for Good Clinical Practice — and in the <strong>UK Clinical Trials Regulations 2025 (CTR 2025)</strong>. Every PI conducting a clinical trial in the UK must understand these obligations and ensure their site operates in full compliance.</p>
<hr/>

<h2>ICH GCP E6(R3): The Investigator's Core Obligations</h2>
<p>Under ICH GCP E6(R3), the investigator's primary obligations include:</p>
<table>
  <tr><th>Obligation</th><th>Practical Requirement</th></tr>
  <tr><td><strong>Qualifications</strong></td><td>The PI must be qualified by education, training, and experience. Current CV and GCP certificate must be on file.</td></tr>
  <tr><td><strong>Adequate Resources</strong></td><td>The PI must ensure sufficient time, staff, and facilities to enrol and follow up the required number of participants</td></tr>
  <tr><td><strong>Medical Care</strong></td><td>The PI is responsible for all trial-related medical decisions; a qualified physician must be available for any medical questions or emergency treatment during the trial</td></tr>
  <tr><td><strong>Protocol Compliance</strong></td><td>The PI must conduct the trial in compliance with the approved protocol and GCP — no deviation without prior amendment (except to protect immediate participant safety)</td></tr>
  <tr><td><strong>Informed Consent</strong></td><td>The PI must ensure that informed consent is properly obtained from each participant before any trial procedures</td></tr>
  <tr><td><strong>Adverse Event Reporting</strong></td><td>The PI must report all SAEs to the sponsor within 24 hours; the PI makes the causality assessment</td></tr>
  <tr><td><strong>IMP Management</strong></td><td>The PI is responsible for all IMP at the site — dispensing, administration, accountability, and returns</td></tr>
  <tr><td><strong>Record Keeping</strong></td><td>The PI must ensure all trial data is accurately recorded in the CRF/EDC and that source documents are maintained</td></tr>
  <tr><td><strong>Delegation</strong></td><td>The PI may delegate tasks to qualified site staff — but only via a formal Delegation Log; the PI retains overall accountability</td></tr>
  <tr><td><strong>ISF Maintenance</strong></td><td>The PI must ensure the Investigator Site File is current, complete, and accessible to monitors, auditors, and inspectors at all times</td></tr>
</table>
<hr/>

<h2>The Site Feasibility Questionnaire</h2>
<p>Before a site is selected, the sponsor sends a <strong>Feasibility Questionnaire</strong> to assess whether the site is suitable. The questionnaire is accompanied by a <strong>Confidentiality Disclosure Agreement (CDA)</strong> and a <strong>Protocol Synopsis</strong>. The PI and their team must complete it honestly, as it determines whether the sponsor proceeds to the Site Selection Visit. Key questions cover:</p>
<ul>
  <li>Estimated number of eligible patients per year</li>
  <li>Availability of required facilities (pharmacy, laboratory, imaging)</li>
  <li>Staff availability and experience in the therapeutic area</li>
  <li>Competing studies at the site</li>
  <li>Experience with the EDC system to be used</li>
</ul>
<hr/>

<h2>The Site Selection Visit (SSV)</h2>
<p>If the Feasibility Questionnaire is approved, the CRA or sponsor representative conducts the <strong>Site Selection Visit (SSV)</strong>. The PI is a key participant. Objectives include:</p>
<ul>
  <li>Introduce the study to the PI and site team</li>
  <li>Confirm the site has adequate resources to conduct the trial</li>
  <li>Tour the facility (pharmacy, clinic rooms, laboratory, storage)</li>
  <li>Collect PI and Sub-Investigator CVs and GCP certificates</li>
  <li>Discuss patient recruitment numbers and recruitment strategy</li>
  <li>Confirm staff experience in the therapeutic area</li>
</ul>
<p>The CRA writes an <strong>SSV report within 15 working days</strong> of the visit.</p>

<div class="key-points">
  <div class="key-points-title">✅ What the PI Must Have Ready at SSV</div>
  <ul>
    <li>Current, signed, and dated CV (renewed every 3 years)</li>
    <li>Current GCP certificate (renewed every 2 years)</li>
    <li>List of all relevant Sub-Investigators with their CVs and GCP certificates</li>
    <li>Evidence of medical licence / GMC registration</li>
    <li>Confirmation of availability and commitment to the study timeline</li>
  </ul>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 2 — Site File Management & Essential Documents
// ══════════════════════════════════════════════════════════════

CONTENT.mod2video = `
<h1>Investigator Site File (ISF) Management & Essential Documents</h1>
<p>The <strong>Investigator Site File (ISF)</strong> is the PI's own trial master file at the site. It contains all the essential documents that enable both the conduct of the trial and the quality of the data to be evaluated. Under ICH GCP E6(R3) and UK CTR 2025, the PI is responsible for ensuring the ISF is maintained, complete, and accessible for inspection at all times.</p>

<h2>ISF vs eTMF</h2>
<table>
  <tr><th>Feature</th><th>ISF (Investigator Site File)</th><th>eTMF (Electronic Trial Master File)</th></tr>
  <tr><td>Location</td><td>Held at the clinical trial site</td><td>Held by the sponsor / CRO (usually cloud-based)</td></tr>
  <tr><td>Owner</td><td>Principal Investigator</td><td>Sponsor</td></tr>
  <tr><td>Purpose</td><td>Enables site to demonstrate GCP compliance and conduct of trial</td><td>Enables sponsor to demonstrate oversight of all sites</td></tr>
  <tr><td>Accessed by</td><td>Site staff, CRA monitors, auditors, MHRA inspectors</td><td>Sponsor staff, CRA, auditors, MHRA inspectors</td></tr>
  <tr><td>Overlap</td><td>Copies of key regulatory documents filed at site</td><td>Master copies of all essential trial documents across all sites</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for a walkthrough of ISF organisation, essential document management, and how CRAs assess ISF completeness during monitoring visits.</blockquote>

<h2>Key Documents Filed in the ISF</h2>
<p>The ISF must contain all documents listed in ICH GCP E6(R3) and the Sponsor's Document Management Plan (DMP). Key categories include:</p>

<h3>Regulatory Documents</h3>
<ul>
  <li>MHRA Initial Approval Letter (and any amendments)</li>
  <li>HRA Approval Letter (and any amendments)</li>
  <li>REC Favourable Opinion Letter (and any amendments)</li>
  <li>NHS R&D Capacity &amp; Capability Confirmation Letter</li>
</ul>

<h3>Protocol &amp; IB</h3>
<ul>
  <li>Signed Protocol (all versions; Protocol Signature Page signed by PI)</li>
  <li>Current Investigator's Brochure (or SmPC)</li>
</ul>

<h3>Informed Consent</h3>
<ul>
  <li>All approved versions of the Patient Information Sheet (PIS)</li>
  <li>All approved versions of the Informed Consent Form (ICF)</li>
  <li>Signed original ICFs per participant (often in a separate secure file)</li>
</ul>

<h3>Staff Documents</h3>
<ul>
  <li>CV of PI (signed and dated; current)</li>
  <li>CVs of all Sub-Investigators</li>
  <li>GCP certificates for PI and all Sub-Is</li>
  <li>Delegation Log (listing all staff and their delegated tasks)</li>
  <li>Training Log</li>
  <li>Financial Disclosure Forms</li>
</ul>

<h3>Safety Documents</h3>
<ul>
  <li>SUSAR notifications received from sponsor</li>
  <li>SAE reports submitted to sponsor</li>
  <li>Annual Safety Report / DSUR received from sponsor</li>
</ul>

<h3>Monitoring</h3>
<ul>
  <li>Site Visit Log</li>
  <li>Monitoring visit reports (received from CRA)</li>
  <li>Correspondence with sponsor/CRA</li>
</ul>
`;

CONTENT.mod2text = `
<h1>Delegation Log, Training Log & ALCOA-CCEA</h1>
<p>Three of the most scrutinised documents in any MHRA inspection or monitoring visit are the Delegation Log, the Training Log, and the evidence of ALCOA-CCEA compliance in source data. The PI is responsible for all three.</p>
<hr/>

<h2>The Delegation Log</h2>
<p>The <strong>Delegation Log</strong> (also called the Staff Signature and Authority Log) documents which members of the site team are authorised to perform specific trial tasks. It is one of the most important documents in the ISF — and one of the most commonly found deficient during monitoring visits.</p>

<h3>Requirements for the Delegation Log</h3>
<ul>
  <li>Lists all site staff participating in the trial</li>
  <li>Each person must be <strong>trained</strong> on the trial tasks they are delegated <strong>before</strong> they carry out those tasks</li>
  <li>All trial tasks must be explicitly listed and delegated</li>
  <li>Each entry must have a <strong>start date</strong> (when the delegation begins) and <strong>end date</strong> (when it ends, e.g. staff member leaves the trial)</li>
  <li>Must be <strong>countersigned by the PI</strong> for each staff member and each task</li>
  <li>It is a <strong>living document</strong> — must be kept up to date throughout the trial</li>
  <li>Must be signed and collected at the <strong>Close-Out Visit (COV)</strong></li>
  <li>Filed in both the ISF and the eTMF as per the DMP</li>
</ul>

<div class="warning-box">
  <p>⚠️ <strong>Common Delegation Log Finding:</strong> The most frequent monitoring finding related to the delegation log is staff performing trial tasks before being formally delegated and trained. This is a protocol deviation. The PI must ensure the delegation log is updated <em>before</em> any new staff member begins trial work.</p>
</div>
<hr/>

<h2>The Training Log</h2>
<p>The <strong>Training Log</strong> records all training completed by site staff on the trial. It is a living document that must be maintained throughout the trial.</p>
<ul>
  <li>Documents protocol training, GCP refreshers, IMP handling training, EDC training</li>
  <li>Must be signed by both the <strong>trainer</strong> and the <strong>trainee</strong></li>
  <li>Each training session must be dated</li>
  <li>Filed in both ISF and eTMF</li>
  <li>Training must occur <strong>before</strong> delegation — you cannot delegate a task to someone who has not been trained</li>
</ul>
<hr/>

<h2>The Site Visit Log</h2>
<p>The <strong>Site Visit Log</strong> records all visits made to the site by the sponsor or CRA. It must be:</p>
<ul>
  <li>Completed during each site visit</li>
  <li>Countersigned by a member of the site staff</li>
  <li>Filed in both ISF and eTMF</li>
  <li>It serves as evidence of CRA attendance and monitoring activity</li>
</ul>
<hr/>

<h2>ALCOA-CCEA: Data Integrity at the Site</h2>
<p>All data recorded by site staff — whether in paper source documents, CRFs, or electronic EDC entries — must comply with the <strong>ALCOA-CCEA</strong> data integrity standard. The PI is responsible for ensuring all site staff understand and apply these principles.</p>

<table>
  <tr><th>Attribute</th><th>Meaning</th><th>Practical Implication for Site Staff</th></tr>
  <tr><td><strong>A — Attributable</strong></td><td>It must be clear who recorded data and when</td><td>Always sign and date entries; EDC audit trail captures this automatically</td></tr>
  <tr><td><strong>L — Legible</strong></td><td>Data must be permanently readable</td><td>Write clearly; never use correction fluid; single strikethrough for corrections</td></tr>
  <tr><td><strong>C — Contemporaneous</strong></td><td>Recorded at the time of the observation</td><td>Enter data into CRF/EDC as close to the observation as possible; do not back-fill</td></tr>
  <tr><td><strong>O — Original</strong></td><td>First recorded data is the source</td><td>Source document takes precedence; copies must be verified against source</td></tr>
  <tr><td><strong>A — Accurate</strong></td><td>Data exactly reflects the observation</td><td>Double-check values before entry; report what actually happened</td></tr>
  <tr><td><strong>C — Complete</strong></td><td>No unexplained gaps</td><td>All required fields completed; missing data documented with reason</td></tr>
  <tr><td><strong>C — Consistent</strong></td><td>Internal consistency across documents</td><td>Dates, values, and events must agree across source, CRF, and EDC</td></tr>
  <tr><td><strong>E — Enduring</strong></td><td>Records retained for required period</td><td>Ensure archive arrangements are in place before trial end</td></tr>
  <tr><td><strong>A — Available</strong></td><td>Accessible for review when needed</td><td>ISF must be organised and accessible to monitors and inspectors at any time</td></tr>
</table>

<h3>Correcting Errors in Paper Records — ALCOA-Compliant Method</h3>
<ol>
  <li>Draw a <strong>single strikethrough</strong> — the original entry must remain legible</li>
  <li>Write the <strong>correct entry</strong> nearby</li>
  <li>Add the <strong>date</strong> of correction</li>
  <li>Add the corrector's <strong>initials</strong></li>
  <li>Briefly state the <strong>reason</strong> for the correction (e.g. "transcription error", "incorrect date")</li>
  <li><strong>Never use correction fluid (Tipp-Ex)</strong> — this violates ALCOA and is a GCP finding</li>
</ol>

<div class="info-box">
  <div class="info-box-title">📌 The Golden Rule: IF not documented = Not Done</div>
  <p>In clinical trials, if an action or observation is not documented, it is treated as though it never happened — regardless of what the site team believes occurred. The PI must instil this principle across the entire site team.</p>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 3 — Informed Consent & Subject Protection
// ══════════════════════════════════════════════════════════════

CONTENT.mod3video = `
<h1>Informed Consent: The PI's Most Critical Responsibility</h1>
<p>Obtaining <strong>valid informed consent</strong> from every trial participant is the most fundamental ethical and legal obligation of the PI. It is also the most frequently cited finding in MHRA GCP inspections and CRA monitoring visits. Under ICH GCP E6(R3) and UK CTR 2025, consent must be freely given, fully informed, and properly documented — before any trial procedures begin.</p>

<h2>The Informed Consent and Patient Information Sheet</h2>
<p>The consent documentation has two parts:</p>
<ul>
  <li><strong>Participant Information Sheet (PIS)</strong> — explains the study in plain, accessible language; reviewed and approved by the REC</li>
  <li><strong>Informed Consent Form (ICF)</strong> — the document the participant signs to indicate their voluntary agreement to participate</li>
</ul>

<h3>What the PIS Must Explain</h3>
<ul>
  <li>What the purpose of the study is</li>
  <li>What procedures are involved in the study</li>
  <li>Whether there are any possible disadvantages or risks from taking part</li>
  <li>How long the study will last</li>
  <li>What happens if participants withdraw</li>
  <li>How their data will be used and protected</li>
  <li>Compensation arrangements for trial-related injury</li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for a detailed walkthrough of the informed consent process — including how to identify and avoid the most common consent process violations found during MHRA inspections.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Consent Must Be Before Procedures</div>
  <p>One of the most serious consent violations is performing any trial procedure — including taking blood, performing a screening examination, or reviewing medical records for eligibility — before the participant has signed and dated a valid consent form. The <strong>consent date equals the screening date</strong> in clinical trial terminology: a participant is not "screened" until they have consented.</p>
</div>
`;

CONTENT.mod3text = `
<h1>The Informed Consent Process: Step by Step</h1>
<p>Valid informed consent is a process — not just a signature on a form. The PI is responsible for ensuring this process is carried out correctly and documented appropriately for every participant.</p>
<hr/>

<h2>The Consent Process — Checklist</h2>
<p>Each step must be completed and documented in the medical records and/or the CRF:</p>

<table>
  <tr><th>Step</th><th>Requirement</th></tr>
  <tr><td>1. Discuss, explain and review</td><td>The consent form/assent was discussed, explained and reviewed with the subject by a qualified, delegated member of staff</td></tr>
  <tr><td>2. Adequate time to review</td><td>The subject was given adequate time to review the consent form and to discuss participation with family members or others before deciding</td></tr>
  <tr><td>3. Questions answered</td><td>All of the subject's questions were answered and concerns addressed</td></tr>
  <tr><td>4. Voluntary decision</td><td>The participant has freely agreed to participate — participation is entirely voluntary and they may withdraw at any time without giving a reason</td></tr>
  <tr><td>5. Signature obtained</td><td>The participant has signed and dated the informed consent document</td></tr>
  <tr><td>6. Copy to participant</td><td>A copy of the signed and dated consent form was given to the subject</td></tr>
  <tr><td>7. Original filed</td><td>The original signed and dated consent form was placed in the subject records / ISF binder</td></tr>
  <tr><td>8. Delegated staff</td><td>Personnel who obtained consent is qualified and has been formally delegated by the PI to perform this task</td></tr>
</table>
<hr/>

<h2>Re-Consent</h2>
<p>If the protocol is amended in a way that changes the risks, procedures, or other material information, participants who are already enrolled must be <strong>re-consented</strong> using the updated PIS/ICF before continuing in the trial. The PI must ensure:</p>
<ul>
  <li>A new approved version of the PIS/ICF is available before approaching participants for re-consent</li>
  <li>Re-consent is documented in the same way as initial consent</li>
  <li>The re-consent date and version number are recorded in the CRF</li>
  <li>Participants who decline re-consent may withdraw from the trial</li>
</ul>
<hr/>

<h2>Screening, Enrolment & Randomisation</h2>
<p>The PI must understand the key terminology used in the consent-to-enrolment pathway:</p>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>Pre-screening</strong></td><td>Preliminary assessment of potential patient eligibility (e.g. reviewing medical records with appropriate permission) — before consent is obtained</td></tr>
  <tr><td><strong>Screened</strong></td><td>A participant who has signed an informed consent form. The screening date = the consent date.</td></tr>
  <tr><td><strong>Screen Failed</strong></td><td>A participant who signed consent but did not meet the eligibility criteria; they cannot be enrolled. Screen failure must be documented.</td></tr>
  <tr><td><strong>Enrolled / Randomised</strong></td><td>A participant assigned an IMP and an enrolment/randomisation number via IRT; this is the formal point of trial enrolment</td></tr>
</table>

<div class="key-points">
  <div class="key-points-title">✅ PI's Responsibilities in Subject Protection</div>
  <ul>
    <li>The PI must ensure no trial procedures are performed before written informed consent is obtained</li>
    <li>The PI must ensure that participants fully understand what they are agreeing to — not just that a form has been signed</li>
    <li>Participants must be informed of their right to withdraw at any time without consequence to their medical care</li>
    <li>The PI must promptly communicate any new safety information that may affect a participant's willingness to continue</li>
    <li>The PI must ensure participant privacy and data confidentiality are maintained throughout the trial</li>
    <li>Pregnancy is an exclusion criterion in most trials; the PI must ensure regular testing per protocol and that participants use effective contraception as specified</li>
  </ul>
</div>
<hr/>

<h2>Vulnerable Populations and Special Consent Situations</h2>
<p>Additional safeguards apply when consenting vulnerable populations:</p>
<ul>
  <li><strong>Incapacitated adults</strong> — consent is obtained from a legal representative (not the participant); strict additional ethical oversight applies</li>
  <li><strong>Minors (under 18)</strong> — parental/guardian consent is required; the minor's assent (agreement) should also be sought where possible</li>
  <li><strong>Emergency consent</strong> — in life-threatening emergencies, treatment may be administered without prior consent with specific ethical and legal safeguards; consent must be obtained as soon as possible afterwards</li>
  <li><strong>Non-English speaking participants</strong> — consent must be obtained in the participant's own language; certified translation of PIS/ICF and an independent interpreter are required</li>
</ul>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 4 — IP Accountability & Safety Reporting
// ══════════════════════════════════════════════════════════════

CONTENT.mod4video = `
<h1>Investigational Product Accountability & Safety Reporting</h1>
<p>Two of the highest-risk areas of clinical trial conduct — and the most frequently cited areas in MHRA GCP inspections — are <strong>Investigational Product (IMP) accountability</strong> and <strong>safety reporting</strong>. The PI bears direct personal responsibility for both at the site level.</p>

<h2>Investigational Product (IMP) Accountability</h2>
<p>The PI is responsible for all IMP held at their site from receipt to final reconciliation at close-out. This includes:</p>
<ul>
  <li><strong>Receipt</strong> — confirming condition and quantity of IMP on arrival; checking temperature logs for cold-chain products</li>
  <li><strong>Storage</strong> — IMP stored according to protocol and IB requirements (temperature, light, security)</li>
  <li><strong>Dispensing</strong> — dispensed by the pharmacist or authorised designee to the correct participant at the correct visit with the correct dose</li>
  <li><strong>Administration</strong> — administered (or self-administered by participant) as per protocol</li>
  <li><strong>Returns</strong> — all unused IMP returned by participants must be collected, counted, and reconciled</li>
  <li><strong>Destruction</strong> — IMP is destroyed only by authorised personnel according to the sponsor's IMP disposal procedures</li>
  <li><strong>Accountability Log</strong> — a complete IMP accountability log maintained throughout the trial; reconciled at each monitoring visit and at close-out</li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for practical guidance on IMP accountability systems, temperature monitoring, and the SAE reporting process from the site's perspective.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 IMP Accountability at the Close-Out Visit</div>
  <p>At the Close-Out Visit (COV), the CRA will perform a <strong>final IMP reconciliation</strong> — comparing every unit of IMP received at the site against dispensing records, administration records, returned units, and destroyed units. Any discrepancy is a GCP finding. The PI must ensure the pharmacy maintains complete, contemporaneous IMP accountability records throughout the trial.</p>
</div>
`;

CONTENT.mod4text = `
<h1>Types of Events in Clinical Trials & the PI's Reporting Duties</h1>
<p>The PI plays a central role in identifying, assessing, and reporting clinical events that occur during a trial. Getting these classifications and timelines right is essential — delays or missed reports can constitute serious GCP violations and, in the case of SUSARs, regulatory breaches.</p>
<hr/>

<h2>Adverse Events and Their Classification</h2>
<p>Every event that occurs to a participant during the trial must be assessed and classified. The PI is responsible for the <strong>causality assessment</strong> — their expert medical opinion on whether the event is related to the IMP.</p>

<table>
  <tr><th>Classification</th><th>Definition</th><th>PI Action</th></tr>
  <tr><td><strong>Adverse Event (AE)</strong></td><td>Any untoward medical occurrence in a participant — whether or not related to the IMP. No causal relationship implied.</td><td>Document in CRF/EDC per protocol schedule; assess severity (CTCAE grade) and causality</td></tr>
  <tr><td><strong>Serious Adverse Event (SAE)</strong></td><td>AE resulting in death, hospitalisation, life-threatening event, persistent disability, congenital abnormality, or medically significant event</td><td>Report to sponsor within <strong>24 hours</strong> of awareness; complete SAE form; follow up until resolution</td></tr>
  <tr><td><strong>Serious Adverse Reaction (SAR)</strong></td><td>SAE with probable or possible causal relationship to the IMP — PI's causality assessment</td><td>Clearly document causality assessment; sponsor escalates if unexpected (SUSAR)</td></tr>
  <tr><td><strong>SUSAR</strong></td><td>SAR that is unexpected (not listed in IB/RSI); sponsor's reporting obligation to MHRA</td><td>PI reports to sponsor within 24 hours; sponsor reports to MHRA (7 or 15 days)</td></tr>
  <tr><td><strong>AESI</strong></td><td>Pre-specified event of scientific/medical interest — may be serious or non-serious</td><td>Report per protocol; enhanced monitoring may apply</td></tr>
</table>
<hr/>

<h2>CTCAE Severity Grading</h2>
<p>The PI grades AE severity using the <strong>Common Terminology Criteria for Adverse Events (CTCAE)</strong>:</p>
<table>
  <tr><th>Grade</th><th>Severity</th><th>Description</th></tr>
  <tr><td><strong>1</strong></td><td>Mild</td><td>Asymptomatic; clinical or diagnostic observations only; intervention not indicated</td></tr>
  <tr><td><strong>2</strong></td><td>Moderate</td><td>Minimal, local or non-invasive intervention needed</td></tr>
  <tr><td><strong>3</strong></td><td>Severe</td><td>Severe symptoms; may be disabling or limit self-care; not immediately life-threatening</td></tr>
  <tr><td><strong>4</strong></td><td>Life-Threatening</td><td>Urgent or emergent intervention needed</td></tr>
  <tr><td><strong>5</strong></td><td>Death</td><td>Fatal outcome related to adverse event</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">⚠️ Severity ≠ Seriousness</div>
  <p>A <strong>severe (Grade 3)</strong> AE is not automatically a <strong>serious</strong> AE. "Severity" describes intensity; "seriousness" is a regulatory classification based on the six SAE criteria (death, hospitalisation, life-threatening, disability, congenital anomaly, medically significant). A Grade 3 headache is severe but may not be serious. A Grade 3 thrombocytopenia requiring hospitalisation is both severe AND serious.</p>
</div>
<hr/>

<h2>SAE Reporting: The 24-Hour Rule</h2>
<p>When the PI becomes aware of a Serious Adverse Event, the following applies:</p>
<ol>
  <li>Report to the sponsor <strong>within 24 hours</strong> of the PI (or any site staff member) becoming aware</li>
  <li>The initial report does <strong>not</strong> need to be complete — send what you have and follow up with additional information</li>
  <li>Report via the sponsor's SAE form or eCRF SAE module, as specified in the protocol</li>
  <li>Follow up the SAE until it is <strong>resolved, stabilised, or the participant withdraws</strong></li>
  <li>The PI must provide their <strong>causality assessment</strong> — i.e. whether in their medical opinion the SAE is related to the IMP</li>
</ol>

<h2>Pregnancy in Clinical Trials</h2>
<p>Pregnancy is typically an exclusion criterion in clinical trials. If a participant (or a participant's partner) becomes pregnant during the trial:</p>
<ul>
  <li>Pregnancy is <strong>NOT classified as an SAE</strong> — it is reported using a special pregnancy notification form</li>
  <li>The PI must report immediately to the sponsor per protocol</li>
  <li>The PI must follow up the pregnancy <strong>until birth and into the baby's infancy</strong></li>
  <li>Any adverse outcomes during pregnancy (miscarriage, complications, congenital anomalies) are reported as AEs or SAEs</li>
  <li>A congenital anomaly in the baby is an SAE (seriousness criterion 5)</li>
</ul>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 5 — Protocol Compliance, Deviations, Delegation & Final Assessment
// ══════════════════════════════════════════════════════════════

CONTENT.mod5video = `
<h1>Protocol Compliance, Protocol Deviations & Delegation</h1>
<p>The PI's responsibility for protocol compliance is absolute. Every participant visit, every procedure, every data point — all must adhere to the approved protocol. When things go wrong, the PI must classify, document, report, and act on protocol deviations. And throughout the trial, the PI must maintain a compliant, up-to-date delegation framework.</p>

<h2>Protocol Deviations — Classification</h2>
<p>A <strong>protocol deviation</strong> is any departure from the approved protocol. There are two main categories:</p>

<h3>Minor Protocol Deviation</h3>
<ul>
  <li>Does NOT increase risk to the participant</li>
  <li>Does NOT decrease benefit to the participant</li>
  <li>Does NOT significantly affect subject rights, safety, welfare, or data integrity</li>
  <li>Examples: visit window deviation of 1–2 days; minor delay in sample processing; missed non-critical assessment</li>
</ul>

<h3>Major / Important Protocol Deviation</h3>
<ul>
  <li>Increases risk or decreases benefit to the participant</li>
  <li>Significantly affects subject rights, safety, or welfare and/or the integrity of the research data</li>
  <li>Examples: enrolling an ineligible participant; administering the wrong dose; performing a procedure before consent; failing to obtain required assessments</li>
</ul>

<div class="info-box">
  <div class="info-box-title">📌 When Can the PI Deviate Without Prior Approval?</div>
  <p>Under ICH GCP E6(R3), the PI may deviate from the protocol <strong>without prior sponsor approval only to protect the immediate safety of a participant</strong>. In this case, the PI must document the deviation and the reason immediately, and notify the sponsor as soon as possible. This is the only exception — all other protocol changes must go through the modification process.</p>
</div>

<blockquote>💡 <strong>Watch the video above</strong> for practical guidance on managing protocol deviations — from immediate documentation through CAPA implementation and sponsor reporting.</blockquote>
`;

CONTENT.mod5text = `
<h1>Protocol Deviation Management, CAPA & Course Summary</h1>
<hr/>

<h2>Protocol Deviation Management Process</h2>
<ol>
  <li><strong>Identify</strong> — deviation identified by site staff, CRA, or during data review</li>
  <li><strong>Document</strong> — record immediately in the Protocol Deviation Log: subject ID, description, date occurred, date detected</li>
  <li><strong>Classify</strong> — minor or major? Assessed by sponsor medical monitor; PI must acknowledge</li>
  <li><strong>Notify</strong> — major deviations reported to sponsor; serious breaches notified to MHRA within 7 days</li>
  <li><strong>PI Sign-Off</strong> — Protocol Deviation Log must be acknowledged, signed, and dated by the PI</li>
  <li><strong>CAPA</strong> — Corrective and Preventive Action implemented to resolve and prevent recurrence</li>
</ol>
<hr/>

<h2>Noncompliance (NC)</h2>
<p>Noncompliance is any action or activity associated with the conduct of a trial that fails to comply with:</p>
<ul>
  <li>The approved research plan / protocol</li>
  <li>A designated IRB/IEC decision</li>
  <li>Federal regulations, UK law, or institutional policies</li>
</ul>
<p>Like protocol deviations, noncompliance must be recorded in a noncompliance log, acknowledged, signed, and dated by the PI. Repeated or systematic noncompliance may escalate to a Serious Breach.</p>
<hr/>

<h2>CAPA — Corrective and Preventive Action</h2>
<p><strong>CAPA (Corrective and Preventive Action)</strong> is a quality system tool used to resolve compliance issues and prevent recurrence. Under UK CTR 2025 and GCP, CAPAs are required for protocol deviations, audit findings, and inspection findings.</p>

<h3>CAPA Process</h3>
<ol>
  <li><strong>Identify</strong> the potential issue and its root cause</li>
  <li><strong>Corrective Action</strong> — fix the specific problem that occurred (e.g. retrain staff, correct data)</li>
  <li><strong>Preventive Action</strong> — change the process to prevent recurrence (e.g. new checklist, updated SOP)</li>
  <li><strong>Document</strong> that actions were carried out</li>
  <li><strong>Verify</strong> that the CAPA resolved the issue (close the CAPA when effective)</li>
</ol>

<div class="info-box">
  <div class="info-box-title">📌 CAPA is Crucial to Patient Safety</div>
  <p>A CAPA plan is crucial to a clinical trial as it helps keep trial participants safe and protects their rights. It also prevents study data from being compromised. A well-documented CAPA shows regulators and auditors that the site takes quality seriously and has a systematic approach to improvement.</p>
</div>
<hr/>

<h2>The Quality Management System (QMS) at Site Level</h2>
<p>The PI operates within the trial's broader <strong>Quality Management System (QMS)</strong>. At site level, this includes:</p>
<ul>
  <li><strong>SOPs</strong> — Standard Operating Procedures for all trial activities (consent, IMP handling, SAE reporting)</li>
  <li><strong>Templates</strong> — standardised forms (delegation log template, SAE form, protocol deviation log)</li>
  <li><strong>Records</strong> — all data, reports, and documents maintained in the ISF</li>
  <li><strong>CTMS / EDC access</strong> — site uses the sponsor's Electronic Data Capture system</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ PI Responsibilities Summary: The Complete Checklist</div>
  <h3>Before the Trial Opens</h3>
  <ul>
    <li>Confirmed qualifications, current CV, and GCP certificate on file</li>
    <li>All four regulatory documents received and filed in ISF (MHRA CTA, HRA, REC, NHS R&amp;D)</li>
    <li>Protocol Signature Page (PSP) signed</li>
    <li>Delegation Log completed for all initial site staff</li>
    <li>All staff trained and Training Log completed</li>
    <li>IMP storage conditions confirmed and pharmacy ready</li>
    <li>EDC and IRT access confirmed for all delegated staff</li>
  </ul>

  <h3>During the Trial</h3>
  <ul>
    <li>Informed consent obtained before any trial procedures</li>
    <li>All SAEs reported to sponsor within 24 hours</li>
    <li>Protocol deviations documented and CAPA implemented</li>
    <li>IMP accountability maintained at all times</li>
    <li>Delegation Log kept current — new staff added before they work; leavers end-dated</li>
    <li>ISF kept up to date; accessible for monitoring visits</li>
    <li>All data entered in EDC according to ALCOA-CCEA principles</li>
  </ul>

  <h3>At Trial Close-Out</h3>
  <ul>
    <li>Final IMP reconciliation completed</li>
    <li>All logs signed and collected: Delegation Log, Training Log, Site Visit Log</li>
    <li>Delegation Log end-dated for all staff</li>
    <li>All open queries and Action Items closed</li>
    <li>Archiving arrangements confirmed: 25 years (MAA trials) / 15 years (other)</li>
    <li>COV report reviewed and any outstanding actions completed</li>
  </ul>
</div>

<blockquote>💡 The final assessment has <strong>15 questions</strong>. Pass mark: <strong>70% (11/15)</strong>. You have <strong>3 attempts</strong>. Your certificate is issued automatically on passing.</blockquote>
`;

// ─────────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────────

const MODULES = [

  // ═══════════════════════════════════════
  // MODULE 1
  // ═══════════════════════════════════════
  {
    title: 'Module 1: Legal & Ethical Framework for the Principal Investigator',
    description: 'PI definition and qualifications; four regulatory documents to open a site; site lifecycle from feasibility to close-out; ICH GCP E6(R3) core obligations; SSV preparation.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'The PI Role: Legal Accountability, Site Opening & Site Visits',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module1, videoDurationMinutes: 18,
        isPreview: true, order: 1, content: CONTENT.mod1video,
      },
      {
        title: 'ICH GCP E6(R3) Obligations, Feasibility Questionnaire & Site Selection Visit',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod1text,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'What distinguishes the PI\'s accountability from that of a Sub-Investigator?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PI holds overall legal accountability for the site — this cannot be delegated. The PI may delegate specific tasks to qualified Sub-Investigators, but they remain personally accountable for the site\'s GCP compliance.',
          marks: 1, order: 1,
          options: [
            { optionText: 'The PI retains overall legal accountability even when tasks are delegated to Sub-Investigators', isCorrect: true, order: 1 },
            { optionText: 'The PI and Sub-Investigators share equal accountability for all trial activities', isCorrect: false, order: 2 },
            { optionText: 'Sub-Investigators take over full accountability once formally delegated', isCorrect: false, order: 3 },
            { optionText: 'Only the sponsor holds legal accountability at the site level', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which four regulatory documents must be in place before a UK clinical trial site can open and enrol participants?',
          questionType: 'MULTI_SELECT',
          explanation: 'All four are required: MHRA CTA, HRA Approval, REC Favourable Opinion, and NHS R&D C&C Confirmation. All must be filed in the ISF before site opening.',
          marks: 2, order: 2,
          options: [
            { optionText: 'MHRA Initial Approval Letter (CTA)', isCorrect: true, order: 1 },
            { optionText: 'HRA Approval Letter', isCorrect: true, order: 2 },
            { optionText: 'REC Favourable Opinion Letter', isCorrect: true, order: 3 },
            { optionText: 'NHS R&D Capacity and Capability Confirmation Letter', isCorrect: true, order: 4 },
            { optionText: 'EMA Scientific Opinion Letter', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'During the Site Selection Visit (SSV), the CRA collects which documents from the PI?',
          questionType: 'MULTI_SELECT',
          explanation: 'At the SSV, the CRA collects PI and Sub-Investigator CVs (signed/dated) and GCP certificates to confirm qualifications before the trial proceeds to SIV.',
          marks: 2, order: 3,
          options: [
            { optionText: 'PI and Sub-Investigator CVs (signed and dated)', isCorrect: true, order: 1 },
            { optionText: 'GCP certificates for PI and Sub-Investigators', isCorrect: true, order: 2 },
            { optionText: 'Signed informed consent forms from participants', isCorrect: false, order: 3 },
            { optionText: 'Protocol Deviation Log from previous trials', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The SSV report must be written by the CRA within how many working days?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Site Selection Visit report must be completed and issued by the CRA within 15 working days of the visit.',
          marks: 1, order: 4,
          options: [
            { optionText: '15 working days', isCorrect: true, order: 1 },
            { optionText: '10 working days', isCorrect: false, order: 2 },
            { optionText: '30 working days', isCorrect: false, order: 3 },
            { optionText: '5 working days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under ICH GCP E6(R3), if a PI does not have sufficient time or resources to conduct the trial safely, they should:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Under ICH GCP E6(R3), the PI must ensure they have adequate time, staff, and resources before agreeing to participate in a trial. If a PI cannot commit adequate resources, they should decline participation rather than conduct the trial inadequately.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Decline to participate or notify the sponsor and address the resource gap before opening', isCorrect: true, order: 1 },
            { optionText: 'Delegate all trial tasks to Sub-Investigators and step back from active involvement', isCorrect: false, order: 2 },
            { optionText: 'Proceed anyway and document the resource limitations in the ISF', isCorrect: false, order: 3 },
            { optionText: 'Ask the CRA to cover the site activities during monitoring visits', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 2
  // ═══════════════════════════════════════
  {
    title: 'Module 2: ISF Management, Delegation Log & ALCOA-CCEA',
    description: 'ISF vs eTMF; essential documents by category; Delegation Log requirements; Training Log; Site Visit Log; ALCOA-CCEA principles; correcting errors in paper records; IF not documented = not done.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'The Investigator Site File: Structure, Documents & Inspection Readiness',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module2, videoDurationMinutes: 16,
        isPreview: false, order: 1, content: CONTENT.mod2video,
      },
      {
        title: 'Delegation Log, Training Log, ALCOA-CCEA & Correcting Errors',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod2text,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The Delegation Log must be countersigned by the PI and must include:',
          questionType: 'MULTI_SELECT',
          explanation: 'The Delegation Log must list all participating staff, their delegated tasks, and the start and end dates of each delegation. It must be countersigned by the PI and kept current throughout the trial.',
          marks: 2, order: 1,
          options: [
            { optionText: 'Start and end dates for each delegation', isCorrect: true, order: 1 },
            { optionText: 'Countersignature by the PI', isCorrect: true, order: 2 },
            { optionText: 'All tasks explicitly listed and delegated', isCorrect: true, order: 3 },
            { optionText: 'Confirmation that staff were trained before being delegated', isCorrect: true, order: 4 },
            { optionText: 'The salary of each delegated staff member', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'The ALCOA-CCEA attribute "Contemporaneous" means data must be:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Contemporaneous" means data must be recorded at the time the observation was made — not retrospectively. Back-filling data after the fact violates ALCOA-CCEA and is a GCP finding.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Recorded at the time the observation was made — not retrospectively', isCorrect: true, order: 1 },
            { optionText: 'Recorded by a person who was present at the event', isCorrect: false, order: 2 },
            { optionText: 'Recorded on a computer system rather than paper', isCorrect: false, order: 3 },
            { optionText: 'Recorded within 48 hours of the observation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'How must errors in paper source documents be corrected to comply with ALCOA-CCEA?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ALCOA-compliant corrections: single strikethrough leaving original readable, write correction, add date, add initials, and give reason. Never use correction fluid — it obscures the original and violates Legible and Attributable attributes.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Single strikethrough (original remains legible) + correction + date + initials + reason', isCorrect: true, order: 1 },
            { optionText: 'Apply correction fluid over the error and write the correct entry', isCorrect: false, order: 2 },
            { optionText: 'Cross out with multiple lines and write "error" above it', isCorrect: false, order: 3 },
            { optionText: 'Create a new document and discard the original', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Training Log must be signed by:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Training Log must be signed by both the trainer (confirming training was delivered) and the trainee (confirming they received and understood the training).',
          marks: 1, order: 4,
          options: [
            { optionText: 'Both the trainer and the trainee', isCorrect: true, order: 1 },
            { optionText: 'Only the PI', isCorrect: false, order: 2 },
            { optionText: 'Only the trainee', isCorrect: false, order: 3 },
            { optionText: 'Only the CRA who witnessed the training', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is the key difference between the ISF and the eTMF?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The ISF is held at the clinical trial site and is owned by the PI. The eTMF is the sponsor\'s master repository for all essential trial documents across all sites. Both must be maintained and inspection-ready throughout the trial.',
          marks: 1, order: 5,
          options: [
            { optionText: 'The ISF is site-owned and held at site; the eTMF is sponsor-owned and covers all sites', isCorrect: true, order: 1 },
            { optionText: 'The ISF is electronic and the eTMF is paper-based', isCorrect: false, order: 2 },
            { optionText: 'The eTMF is held at each site; the ISF is centralised at the sponsor', isCorrect: false, order: 3 },
            { optionText: 'ISF and eTMF contain completely different sets of documents with no overlap', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 3
  // ═══════════════════════════════════════
  {
    title: 'Module 3: Informed Consent & Subject Protection',
    description: 'PIS and ICF requirements; the 8-step consent process; consent before procedures; re-consent; screening/enrolment terminology; vulnerable populations; PI\'s subject protection duties.',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'Informed Consent: The PI\'s Most Critical Responsibility',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module3, videoDurationMinutes: 18,
        isPreview: false, order: 1, content: CONTENT.mod3video,
      },
      {
        title: 'The Consent Process: Step by Step, Re-Consent & Vulnerable Populations',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod3text,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'In clinical trial terminology, a participant is classified as "Screened" when:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Screened means the participant has signed an informed consent form. The screening date equals the consent date. No trial procedures can occur before this point.',
          marks: 1, order: 1,
          options: [
            { optionText: 'They have signed an informed consent form (screening date = consent date)', isCorrect: true, order: 1 },
            { optionText: 'They have been randomised and assigned an IMP', isCorrect: false, order: 2 },
            { optionText: 'They have been assessed as potentially eligible but not yet consented', isCorrect: false, order: 3 },
            { optionText: 'They have completed all baseline assessments', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Who must obtain informed consent from a trial participant?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Consent must be obtained by a qualified person who has been formally delegated by the PI to perform this task — and this delegation must be documented in the Delegation Log with appropriate training recorded.',
          marks: 1, order: 2,
          options: [
            { optionText: 'A qualified person formally delegated by the PI and listed on the Delegation Log', isCorrect: true, order: 1 },
            { optionText: 'Only the PI personally — consent cannot be delegated', isCorrect: false, order: 2 },
            { optionText: 'Any member of the healthcare team who is available', isCorrect: false, order: 3 },
            { optionText: 'The CRA during the monitoring visit', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Re-consent of enrolled participants is required when:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Re-consent is required when a protocol amendment changes material information that could affect a participant\'s willingness to continue — such as new risks, new procedures, or significant changes to the trial design.',
          marks: 1, order: 3,
          options: [
            { optionText: 'A protocol amendment changes material information affecting a participant\'s willingness to continue', isCorrect: true, order: 1 },
            { optionText: 'The PI changes and a new PI takes over the site', isCorrect: false, order: 2 },
            { optionText: 'The participant misses a protocol visit', isCorrect: false, order: 3 },
            { optionText: 'At every annual anniversary of the participant\'s enrolment', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following steps are part of the correct informed consent process?',
          questionType: 'MULTI_SELECT',
          explanation: 'The consent process includes: discussing and explaining the study, giving adequate time for review, answering all questions, obtaining voluntary signature, giving the participant a copy, and filing the original in the ISF.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Discussing, explaining and reviewing the consent form with the participant', isCorrect: true, order: 1 },
            { optionText: 'Giving the participant adequate time to review and discuss with family', isCorrect: true, order: 2 },
            { optionText: 'Giving the participant a copy of their signed consent form', isCorrect: true, order: 3 },
            { optionText: 'Filing the original signed consent form in the ISF', isCorrect: true, order: 4 },
            { optionText: 'Obtaining consent after completing the first blood test for eligibility screening', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Is a pregnancy in a clinical trial classified as a Serious Adverse Event (SAE)?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Pregnancy itself is NOT classified as an SAE. It is reported using a special pregnancy notification form. However, adverse outcomes during the pregnancy (e.g. miscarriage, congenital anomaly) may be classified as AEs or SAEs.',
          marks: 1, order: 5,
          options: [
            { optionText: 'No — pregnancy is reported using a special form; adverse outcomes during pregnancy may be AEs or SAEs', isCorrect: true, order: 1 },
            { optionText: 'Yes — pregnancy always meets the SAE criterion for "medically important event"', isCorrect: false, order: 2 },
            { optionText: 'Only if the pregnancy results in complications', isCorrect: false, order: 3 },
            { optionText: 'Yes — pregnancy is always a Grade 5 adverse event', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 4
  // ═══════════════════════════════════════
  {
    title: 'Module 4: Investigational Product Accountability & Safety Reporting',
    description: 'IMP receipt, storage, dispensing, administration, returns and reconciliation; CTCAE grading; AE/SAE/SAR/SUSAR classification; 24-hour SAE reporting; causality assessment; pregnancy in trials.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'IMP Accountability & the PI\'s Safety Reporting Obligations',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module4, videoDurationMinutes: 20,
        isPreview: false, order: 1, content: CONTENT.mod4video,
      },
      {
        title: 'AE Classification, CTCAE Grading, SAE Reporting & Pregnancy',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod4text,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The PI must report a Serious Adverse Event to the sponsor within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PI (or any site staff member) must report an SAE to the sponsor within 24 hours of becoming aware of the event. The initial report does not need to be complete.',
          marks: 1, order: 1,
          options: [
            { optionText: '24 hours of the PI or site staff becoming aware', isCorrect: true, order: 1 },
            { optionText: '7 days of the PI becoming aware', isCorrect: false, order: 2 },
            { optionText: '48 hours of the event occurring', isCorrect: false, order: 3 },
            { optionText: '15 days as per SUSAR reporting timelines', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A CTCAE Grade 3 adverse event is described as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'CTCAE Grade 3 = Severe: symptoms may be disabling or limit self-care in Activities of Daily Living. It is not immediately life-threatening (Grade 4) but is more significant than Moderate (Grade 2).',
          marks: 1, order: 2,
          options: [
            { optionText: 'Severe symptoms that may be disabling or limit self-care; not immediately life-threatening', isCorrect: true, order: 1 },
            { optionText: 'Life-threatening; urgent intervention needed', isCorrect: false, order: 2 },
            { optionText: 'Moderate; minimal non-invasive intervention needed', isCorrect: false, order: 3 },
            { optionText: 'Fatal outcome related to the adverse event', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are valid SAE seriousness criteria?',
          questionType: 'MULTI_SELECT',
          explanation: 'The six SAE seriousness criteria: death, life-threatening, inpatient hospitalisation (initial or prolonged), persistent/significant disability, congenital anomaly/birth defect, and other medically significant event.',
          marks: 2, order: 3,
          options: [
            { optionText: 'Death', isCorrect: true, order: 1 },
            { optionText: 'Life-threatening', isCorrect: true, order: 2 },
            { optionText: 'Overnight hospitalisation (initial or prolonged)', isCorrect: true, order: 3 },
            { optionText: 'Significant disability or incapacity', isCorrect: true, order: 4 },
            { optionText: 'Congenital anomaly/birth defect', isCorrect: true, order: 5 },
            { optionText: 'CTCAE Grade 2 or higher', isCorrect: false, order: 6 },
          ],
        },
        {
          questionText: 'What does the PI\'s "causality assessment" for an SAE involve?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PI\'s causality assessment is their medical opinion on whether the SAE is probably, possibly, or not related to the IMP. This assessment determines whether the event is an SAR — and if unexpected, a SUSAR requiring expedited MHRA reporting.',
          marks: 1, order: 4,
          options: [
            { optionText: 'The PI\'s medical opinion on whether the SAE is related to the IMP', isCorrect: true, order: 1 },
            { optionText: 'Calculating the CTCAE severity grade for the event', isCorrect: false, order: 2 },
            { optionText: 'Determining whether the event meets seriousness criteria', isCorrect: false, order: 3 },
            { optionText: 'Deciding whether to report the event to the MHRA directly', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'IMP accountability at the site must track:',
          questionType: 'MULTI_SELECT',
          explanation: 'Complete IMP accountability tracks: receipt, dispensing to participants, administration records, returns from participants, and destruction — supported by a contemporaneous accountability log.',
          marks: 2, order: 5,
          options: [
            { optionText: 'Receipt of IMP from the manufacturer/depot', isCorrect: true, order: 1 },
            { optionText: 'Dispensing to each participant', isCorrect: true, order: 2 },
            { optionText: 'Returns of unused IMP from participants', isCorrect: true, order: 3 },
            { optionText: 'Destruction of IMP', isCorrect: true, order: 4 },
            { optionText: 'The manufacturing batch formula for the IMP', isCorrect: false, order: 5 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 5
  // ═══════════════════════════════════════
  {
    title: 'Module 5: Protocol Compliance, Deviations, CAPA & Final Assessment',
    description: 'Protocol deviation classification (minor vs major); when PI can deviate without approval; deviation management process; noncompliance; CAPA; QMS at site level; complete PI checklist; 15-question final assessment.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Protocol Compliance, Deviations & When the PI Can Act Without Prior Approval',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module5, videoDurationMinutes: 16,
        isPreview: false, order: 1, content: CONTENT.mod5video,
      },
      {
        title: 'Deviation Management, CAPA, QMS & Complete PI Responsibilities Checklist',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod5text,
      },
    ],
    quiz: {
      title: 'Final Assessment: Principal Investigator Responsibilities',
      instructions: 'Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Certificate issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 25, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'The PI must ensure staff are formally delegated on the Delegation Log:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Staff must be trained and formally delegated on the Delegation Log BEFORE they perform any trial task. Performing tasks before being delegated is a protocol deviation.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Before they perform any trial task — training must also be completed first', isCorrect: true, order: 1 },
            { optionText: 'Within 30 days of starting work on the trial', isCorrect: false, order: 2 },
            { optionText: 'At the next monitoring visit after they begin trial activities', isCorrect: false, order: 3 },
            { optionText: 'Only if their role involves direct patient contact', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under which circumstances can the PI deviate from the approved protocol without prior approval?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The only circumstance where the PI may deviate without prior approval is to protect the immediate safety of a participant. The deviation must be documented immediately and the sponsor notified as soon as possible.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Only to protect the immediate safety of a participant — with immediate documentation and sponsor notification', isCorrect: true, order: 1 },
            { optionText: 'Whenever the deviation is minor and unlikely to affect data integrity', isCorrect: false, order: 2 },
            { optionText: 'When the sponsor is unavailable for 48 hours or more', isCorrect: false, order: 3 },
            { optionText: 'For any operational reason that makes the protocol impractical at that moment', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is the difference between a minor and a major protocol deviation?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A minor deviation does not increase participant risk or significantly affect data integrity. A major/important deviation increases risk or significantly affects participant rights, safety, welfare, or data integrity.',
          marks: 1, order: 3,
          options: [
            { optionText: 'A major deviation increases participant risk or significantly affects data integrity; a minor deviation does not', isCorrect: true, order: 1 },
            { optionText: 'A minor deviation requires MHRA notification; a major deviation does not', isCorrect: false, order: 2 },
            { optionText: 'Major deviations are accidental; minor deviations are deliberate', isCorrect: false, order: 3 },
            { optionText: 'They differ only in whether the CRA was present at the time', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Serious Breach of GCP must be reported to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach — one likely to affect subject safety or scientific value — must be reported to the MHRA in writing within 7 days of the Sponsor becoming aware.',
          marks: 1, order: 4,
          options: [
            { optionText: '7 days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '24 hours of any site staff becoming aware', isCorrect: false, order: 2 },
            { optionText: '15 days of the Sponsor becoming aware', isCorrect: false, order: 3 },
            { optionText: '30 days in the next Annual Safety Report', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The ALCOA-CCEA principle "Available" means clinical trial data must be:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Available" means data must be accessible and retrievable for review, audit, or inspection when needed. The ISF must be organised and available to monitors and MHRA inspectors at all times.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Accessible and retrievable for review, audit, or inspection when needed', isCorrect: true, order: 1 },
            { optionText: 'Stored on a computer (electronic format)', isCorrect: false, order: 2 },
            { optionText: 'Posted publicly in a clinical trial registry', isCorrect: false, order: 3 },
            { optionText: 'Available only to the PI and not to other site staff', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'At the Close-Out Visit (COV), the PI must ensure the following are completed:',
          questionType: 'MULTI_SELECT',
          explanation: 'At the COV: final IMP reconciliation, payment of outstanding site fees, ISF review and completion, collection of signed logs (delegation, training, site visit), shutdown of vendor system access, closure of all open queries and AIs, and discussion of archiving requirements.',
          marks: 2, order: 6,
          options: [
            { optionText: 'Final IMP reconciliation (dispensed, administered, returned)', isCorrect: true, order: 1 },
            { optionText: 'Collection of signed Delegation Log and Training Log', isCorrect: true, order: 2 },
            { optionText: 'Shutdown of all vendor system access (EDC, IRT)', isCorrect: true, order: 3 },
            { optionText: 'Closure of all open Action Items and queries', isCorrect: true, order: 4 },
            { optionText: 'Submission of a new CTA application for the next trial', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'How many days does the CRA have to write and issue the Site Selection Visit (SSV) report?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Site Selection Visit report must be written within 15 working days of the visit.',
          marks: 1, order: 7,
          options: [
            { optionText: '15 working days', isCorrect: true, order: 1 },
            { optionText: '10 working days', isCorrect: false, order: 2 },
            { optionText: '7 calendar days', isCorrect: false, order: 3 },
            { optionText: '30 calendar days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Protocol Signature Page (PSP) must be signed by the PI:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PSP must be signed by the PI before the trial begins at the site. If the protocol is amended, the new version\'s PSP must be signed before the amendment is implemented.',
          marks: 1, order: 8,
          options: [
            { optionText: 'Before the trial begins at the site', isCorrect: true, order: 1 },
            { optionText: 'After the first participant is enrolled', isCorrect: false, order: 2 },
            { optionText: 'At the Close-Out Visit', isCorrect: false, order: 3 },
            { optionText: 'Only if the trial has more than one site', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which CTCAE grade describes a life-threatening adverse event requiring urgent intervention?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'CTCAE Grade 4 = Life-threatening: urgent or emergent intervention needed. Grade 5 = Death related to adverse event. Grade 3 = Severe but not immediately life-threatening.',
          marks: 1, order: 9,
          options: [
            { optionText: 'Grade 4', isCorrect: true, order: 1 },
            { optionText: 'Grade 3', isCorrect: false, order: 2 },
            { optionText: 'Grade 5', isCorrect: false, order: 3 },
            { optionText: 'Grade 2', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The CAPA process for a protocol deviation must include:',
          questionType: 'MULTI_SELECT',
          explanation: 'A complete CAPA includes: identifying the issue and root cause, implementing corrective action (fix the current problem), implementing preventive action (prevent recurrence), documenting that actions were carried out, and verifying effectiveness.',
          marks: 2, order: 10,
          options: [
            { optionText: 'Root cause analysis to understand why the deviation occurred', isCorrect: true, order: 1 },
            { optionText: 'Corrective action to fix the specific problem', isCorrect: true, order: 2 },
            { optionText: 'Preventive action to stop recurrence', isCorrect: true, order: 3 },
            { optionText: 'Documentation that actions were carried out and resolved the issue', isCorrect: true, order: 4 },
            { optionText: 'Automatic suspension of the trial pending MHRA investigation', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Which of the following describes a "Screened" participant?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Screened" means the participant has signed an informed consent form. The screening date = the consent date. A participant who consented but did not meet eligibility criteria is a "screen failure".',
          marks: 1, order: 11,
          options: [
            { optionText: 'A participant who has signed an informed consent form', isCorrect: true, order: 1 },
            { optionText: 'A participant who has been randomised and assigned an IMP', isCorrect: false, order: 2 },
            { optionText: 'A participant identified as potentially eligible before consent is obtained', isCorrect: false, order: 3 },
            { optionText: 'A participant who has completed all baseline assessments', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'GCP certificates for PI and Sub-Investigators must be renewed every:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'GCP certificates must be renewed every 2 years. CVs must be renewed (re-signed and re-dated) every 3 years.',
          marks: 1, order: 12,
          options: [
            { optionText: '2 years', isCorrect: true, order: 1 },
            { optionText: '3 years', isCorrect: false, order: 2 },
            { optionText: '5 years', isCorrect: false, order: 3 },
            { optionText: '1 year', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are correct statements about the Delegation Log?',
          questionType: 'MULTI_SELECT',
          explanation: 'The Delegation Log must: list all participating staff, have explicit tasks delegated, include start and end dates, be countersigned by the PI, be a living document kept up to date, and be filed in both ISF and eTMF.',
          marks: 2, order: 13,
          options: [
            { optionText: 'It is a living document that must be kept up to date throughout the trial', isCorrect: true, order: 1 },
            { optionText: 'It must be countersigned by the PI', isCorrect: true, order: 2 },
            { optionText: 'Each entry must have a start date and an end date', isCorrect: true, order: 3 },
            { optionText: 'It is filed in both the ISF and the eTMF', isCorrect: true, order: 4 },
            { optionText: 'It only needs to be completed at the Site Initiation Visit and never updated', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'What is the golden rule of documentation in clinical trials?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"If not documented = Not Done" is the foundational rule of clinical trial documentation. Regardless of what actually happened, if it is not documented it is treated as though it never occurred — in the eyes of monitors, auditors, and regulators.',
          marks: 1, order: 14,
          options: [
            { optionText: 'IF not documented = Not Done', isCorrect: true, order: 1 },
            { optionText: 'If it happened, it happened — regardless of documentation', isCorrect: false, order: 2 },
            { optionText: 'Document only critical safety events', isCorrect: false, order: 3 },
            { optionText: 'Verbal confirmation to the CRA is equivalent to written documentation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are correct statements about the PI\'s responsibilities under ICH GCP E6(R3)?',
          questionType: 'MULTI_SELECT',
          explanation: 'Under ICH GCP E6(R3): the PI cannot delegate overall accountability; informed consent must be before procedures; SAEs must be reported within 24 hours; and the ISF must be inspection-ready at all times.',
          marks: 2, order: 15,
          options: [
            { optionText: 'The PI retains overall accountability even when tasks are delegated to Sub-Investigators', isCorrect: true, order: 1 },
            { optionText: 'Informed consent must be obtained before any trial procedures begin', isCorrect: true, order: 2 },
            { optionText: 'SAEs must be reported to the sponsor within 24 hours of site awareness', isCorrect: true, order: 3 },
            { optionText: 'The ISF must be organised and accessible for monitoring visits and MHRA inspections at all times', isCorrect: true, order: 4 },
            { optionText: 'The PI may skip the consent process for urgently needed participants to accelerate enrolment', isCorrect: false, order: 5 },
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
  console.log('  SEEDING: Principal Investigator Responsibilities');
  console.log('  Course 09 | INTERMEDIATE | Investigator & Site Training');
  console.log('  Content: Rich HTML | Videos: Real YouTube clinical trials videos');
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
      title: 'Principal Investigator Responsibilities',
      subtitle: 'Legal, ethical and operational duties of the PI under GCP and UK law',
      description: 'A comprehensive course covering everything a Principal Investigator needs to know about their obligations under ICH GCP E6(R3), UK Clinical Trials Regulations 2025, and MHRA guidance. Covers site qualification, ISF management, delegation logs, informed consent, IMP accountability, AE/SAE reporting, protocol deviation management, CAPA, and the complete close-out process.',
      learningObjectives: [
        'Describe the PI\'s legal accountability under ICH GCP E6(R3) and UK CTR 2025',
        'Manage the Investigator Site File (ISF) to MHRA inspection-ready standard',
        'Maintain a compliant, current Delegation Log and Training Log',
        'Apply ALCOA-CCEA data integrity principles across all site documentation',
        'Conduct the informed consent process correctly and identify common violations',
        'Report Adverse Events and SAEs accurately and within required timelines',
        'Manage IMP accountability from receipt to final reconciliation',
        'Classify and respond to protocol deviations and implement effective CAPAs',
      ],
      prerequisites: [
        'ICH GCP E6 fundamentals (Course 2 recommended)',
        'Basic clinical research awareness',
      ],
      targetAudience: [
        'Principal Investigators and Sub-Investigators in UK clinical trials',
        'Research Nurses and Study Coordinators working at NHS or private clinical trial sites',
        'New investigators taking on their first PI role',
        'CRAs who need to understand PI obligations to monitor sites effectively',
        'Clinical operations staff setting up and supporting investigator sites',
      ],
      durationHours: 4,
      difficultyLevel: 'INTERMEDIATE',
      accreditation: 'ICH GCP E6(R3) Aligned',
      price: 99.00,
      originalPrice: 149.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'Principal Investigator Responsibilities | ICH GCP E6(R3) | UK Clinical Trials | PI Training',
      seoDescription: 'Complete PI training: ISF management, delegation log, informed consent, IMP accountability, SAE reporting, protocol deviations, CAPA. ICH GCP E6(R3) aligned. Certificate on completion.',
      tags: ['PI', 'investigator', 'GCP', 'ISF', 'delegation-log', 'informed-consent', 'IMP', 'SAE', 'ALCOA', 'CAPA', 'UK', 'clinical-trials', 'investigator-training'],
    },
  });
  console.log('✅ Course metadata updated.\n');

  // Certificate template
  const cert = await prisma.certificateTemplate.findUnique({ where: { courseId: existing.id } });
  if (!cert) {
    await prisma.certificateTemplate.create({
      data: {
        courseId: existing.id,
        heading: 'Certificate of Completion',
        bodyText: 'This certifies successful completion of Principal Investigator Responsibilities — ICH GCP E6(R3) Aligned | Issued by Clinical Research Nexus',
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
  console.log('  Content: Rich HTML with tables, info-boxes, key-points, warnings');
  console.log('  Videos: Real YouTube clinical trials/GCP videos');
  console.log('  Preview: /courses/principal-investigator-responsibilities');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
