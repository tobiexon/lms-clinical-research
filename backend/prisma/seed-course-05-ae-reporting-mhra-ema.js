/**
 * COURSE 05: Adverse Event Reporting: MHRA & EMA Requirements
 * ─────────────────────────────────────────────────────────────
 * Advanced course: SAE/SUSAR reporting timelines, SAE narratives,
 * EudraVigilance submissions, and post-Brexit dual reporting.
 * Content format: HTML strings (rendered via dangerouslySetInnerHTML).
 * Videos: YouTube placeholder — replace with own recordings.
 * Run: node prisma/seed-course-05-ae-reporting-mhra-ema.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'adverse-event-reporting-mhra-ema';
const COURSE_VIDEO = 'https://www.youtube.com/watch?v=aGYMB4TkJYM';

const VIDEOS = {
  welcome:        COURSE_VIDEO,
  aeFramework:    COURSE_VIDEO,
  saeReporting:   COURSE_VIDEO,
  susarReporting: COURSE_VIDEO,
  narratives:     COURSE_VIDEO,
  eudravigilance: COURSE_VIDEO,
  postBrexit:     COURSE_VIDEO,
  assessment:     COURSE_VIDEO,
};

// ─────────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// ─────────────────────────────────────────────────────────────

const CONTENT = {};

// ── MODULE 1, LESSON 1: Welcome ──────────────────────────────
CONTENT.welcome = `
<h1>Welcome to Adverse Event Reporting: MHRA &amp; EMA Requirements</h1>
<p>This is an advanced-level course for clinical research professionals who need to master the operational mechanics of adverse event and serious adverse event reporting under UK and EU regulatory frameworks. It builds directly on the foundational pharmacovigilance knowledge from Course 4 and takes you into the specifics of compliance.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Drug Safety Associates and Pharmacovigilance Officers</strong> responsible for case processing and regulatory submissions</li>
  <li><strong>Clinical Research Associates (CRAs)</strong> and monitors who review and escalate AE/SAE data at sites</li>
  <li><strong>Regulatory Affairs professionals</strong> managing MHRA and EMA submissions</li>
  <li><strong>Sponsors and CRO staff</strong> responsible for SUSAR reporting and DSUR preparation</li>
  <li><strong>Medical Writers</strong> preparing SAE narratives and safety reports</li>
</ul>

<h2>What You Will Achieve</h2>
<ol>
  <li>Apply the 7-day and 15-day SUSAR reporting timelines correctly in all scenarios</li>
  <li>Classify adverse events with precision: AE, ADR, SAE, SAR, SUSAR, AESI, and Serious Breach</li>
  <li>Prepare a compliant, well-structured Individual Case Safety Report (ICSR) narrative</li>
  <li>Submit ICSRs to EudraVigilance and understand the UK Yellow Card parallel pathway</li>
  <li>Navigate the post-Brexit dual reporting landscape for UK and EU authorised products</li>
</ol>

<blockquote>💡 <strong>Watch the video above</strong> for an introduction to the course structure and what to expect.</blockquote>

<h2>Course Structure</h2>
<p>The course has 5 modules. Each module has two lessons — a video lesson and a detailed reading. Module quizzes have a 70% pass mark. The final assessment is 15 questions — pass to earn your certificate.</p>

<div class="info-box">
  <div class="info-box-title">📌 Course Prerequisites</div>
  <p>This course assumes you have completed <strong>Introduction to Pharmacovigilance (Course 4)</strong> or have equivalent knowledge of AE/ADR/SAE/SUSAR definitions, CTCAE grading, and the regulatory landscape (MHRA, EMA, Yellow Card).</p>
</div>
`;

// ── MODULE 1, LESSON 2: AE Classification Framework ──────────
CONTENT.aeFramework = `
<h1>The Adverse Event Classification Framework</h1>
<p>Correct classification of adverse events is the foundation of everything that follows. Misclassifying an event — calling an SAE a non-serious AE, or missing a SUSAR — has direct regulatory and patient safety consequences. This lesson consolidates the full classification framework in one place.</p>
<hr/>

<h2>The Classification Hierarchy</h2>
<p>Think of adverse event classification as a decision tree. Every event starts as an AE. You then apply sequential tests to determine whether it escalates to SAE, SAR, or SUSAR.</p>

<table>
  <tr><th>Event Type</th><th>Definition</th><th>Key Test</th></tr>
  <tr>
    <td><strong>AE</strong><br/>Adverse Event</td>
    <td>Any untoward medical occurrence in a patient or clinical investigation subject administered a pharmaceutical product — does not necessarily have a causal relationship with treatment</td>
    <td>Did it occur during treatment? (Temporal association — causality NOT required)</td>
  </tr>
  <tr>
    <td><strong>ADR</strong><br/>Adverse Drug Reaction</td>
    <td>A noxious and unintended response to a medicine — causal relationship established</td>
    <td>Is there a reasonable possibility the IMP caused it?</td>
  </tr>
  <tr>
    <td><strong>SAE</strong><br/>Serious Adverse Event</td>
    <td>An untoward medical occurrence representing a significant hazard to the patient</td>
    <td>Does it meet any of the 6 seriousness criteria? (See below)</td>
  </tr>
  <tr>
    <td><strong>SAR</strong><br/>Serious Adverse Reaction</td>
    <td>An SAE with a certain degree of probability that causality is the IMP</td>
    <td>SAE + suspected IMP causality</td>
  </tr>
  <tr>
    <td><strong>SUSAR</strong><br/>Suspected Unexpected Serious Adverse Reaction</td>
    <td>An adverse event assessed as unexpected, serious, and with a reasonable possibility of causal relationship with the study drug</td>
    <td>SAR + unexpected (not in RSI/SmPC)?</td>
  </tr>
  <tr>
    <td><strong>AESI</strong><br/>Adverse Event of Special Interest</td>
    <td>An event of scientific/medical concern specific to the sponsor's product or programme — may be serious or non-serious</td>
    <td>Is it on the sponsor's AESI list for this product?</td>
  </tr>
</table>

<hr/>
<h2>The Six Seriousness Criteria</h2>
<p>An event meets the definition of an SAE if it results in <strong>any one</strong> of the following:</p>
<ol>
  <li><strong>Death</strong> — the event caused or contributed to the patient's death</li>
  <li><strong>Life-threatening</strong> — the patient was at immediate risk of death at the time of the event (not "might have caused death if more severe")</li>
  <li><strong>Inpatient hospitalisation (initial or prolonged)</strong> — admission to hospital, or significant prolongation of an existing admission</li>
  <li><strong>Persistent or significant disability/incapacity</strong> — substantial disruption of normal life functions</li>
  <li><strong>Congenital anomaly/birth defect</strong> — in the offspring of a patient exposed to the product</li>
  <li><strong>Other medically important event</strong>* — events that may jeopardise the patient and may require medical or surgical intervention to prevent one of the outcomes above</li>
</ol>
<div class="warning-box">
  <p>⚠️ <strong>* Medically Important Events</strong>: This catch-all category includes all malignancies and pregnancy. An unexpected pregnancy in a trial is reported via a special pregnancy form — it is NOT classified as an SAE itself, but any complications during that pregnancy (e.g. pre-eclampsia, miscarriage) are classified as AEs or SAEs.</p>
</div>

<hr/>
<h2>Expectedness Assessment</h2>
<p>Once an event is classified as a serious adverse reaction (SAR), it must be assessed for <strong>expectedness</strong> to determine whether it is a SUSAR.</p>

<table>
  <tr><th>Context</th><th>Reference Document for Expectedness</th></tr>
  <tr><td>During a clinical trial (investigational product)</td><td><strong>Investigator's Brochure (IB)</strong> — specifically the Reference Safety Information (RSI) section</td></tr>
  <tr><td>Post-marketing (authorised product)</td><td><strong>Summary of Product Characteristics (SmPC)</strong> — the current approved version</td></tr>
  <tr><td>Product with SmPC used as IB in a trial</td><td>The SmPC serves as the RSI</td></tr>
</table>

<p>An event is <strong>unexpected</strong> if its nature, severity, specificity, or outcome is not consistent with the RSI/SmPC. An event that is listed in the RSI but occurs with greater frequency, greater severity, or with a different outcome than described is also considered unexpected.</p>

<div class="key-points">
  <div class="key-points-title">✅ The SUSAR Decision Tree — Quick Reference</div>
  <ol>
    <li>Is there a reasonable possibility the IMP caused it? → If <strong>No</strong>: non-SAR AE. If <strong>Yes</strong>: continue ↓</li>
    <li>Does it meet any seriousness criterion? → If <strong>No</strong>: non-serious ADR. If <strong>Yes</strong>: continue ↓</li>
    <li>Is it unexpected (not in RSI/SmPC)? → If <strong>No</strong>: expected SAR (report per protocol, not as SUSAR). If <strong>Yes</strong>: <strong>SUSAR — urgent reporting timelines apply</strong></li>
  </ol>
</div>

<hr/>
<h2>CTCAE Severity vs Seriousness — The Critical Distinction</h2>
<p>A common error is conflating CTCAE <em>severity grade</em> with regulatory <em>seriousness</em>. They are entirely separate assessments:</p>
<table>
  <tr><th>CTCAE Grade</th><th>Severity Label</th><th>Automatically Serious?</th></tr>
  <tr><td>1</td><td>Mild</td><td>No</td></tr>
  <tr><td>2</td><td>Moderate</td><td>No</td></tr>
  <tr><td>3</td><td>Severe</td><td>Not automatically — "severe" ≠ "serious"</td></tr>
  <tr><td>4</td><td>Life-threatening</td><td>Yes — meets seriousness criterion #2</td></tr>
  <tr><td>5</td><td>Death</td><td>Yes — meets seriousness criterion #1</td></tr>
</table>
<div class="info-box">
  <div class="info-box-title">📌 Classic Example</div>
  <p>A Grade 3 headache is <strong>severe</strong> in intensity but is NOT <strong>serious</strong> unless it results in hospitalisation, disability, or meets another seriousness criterion. A Grade 3 thrombocytopenia that leads to emergency hospitalisation IS both severe AND serious.</p>
</div>
`;

// ── MODULE 2, LESSON 1: SAE Reporting — Site to Sponsor ──────
CONTENT.saeReporting = `
<h1>SAE Reporting: Site to Sponsor</h1>
<p>When an SAE occurs at a clinical trial site, a strict chain of reporting must be followed. As a CRA or site staff member, understanding your exact responsibilities — and the timelines — is critical. Getting this wrong can constitute a Serious Breach.</p>
<hr/>

<h2>The SAE Reporting Chain</h2>
<p>There are three legs to the SAE reporting journey in a clinical trial:</p>
<ol>
  <li><strong>Site → Sponsor/CRO</strong> (initial and follow-up reports)</li>
  <li><strong>Sponsor → Regulatory Authorities</strong> (MHRA for UK trials; EudraVigilance for EU trials — for SUSARs only)</li>
  <li><strong>Sponsor → Ethics Committee/IEC</strong> (included in the Annual Safety Report / ASR)</li>
</ol>
<hr/>

<h2>Site Reporting Obligations — Timelines</h2>
<table>
  <tr><th>Event Type</th><th>Site → Sponsor Timeline</th><th>Form/Method</th></tr>
  <tr><td>SAE (any)</td><td><strong>Within 24 hours</strong> of the PI/site becoming aware</td><td>eCRF SAE module, or sponsor SAE/SAR form</td></tr>
  <tr><td>SAR (SAE with suspected IMP causality)</td><td><strong>Within 24 hours</strong> of the PI/site becoming aware</td><td>Same as above</td></tr>
  <tr><td>SUSAR (identified at site)</td><td><strong>Within 24 hours</strong> — sponsor then assesses and escalates</td><td>Sponsor SAE form; sponsor routes to MHRA/EudraVigilance</td></tr>
  <tr><td>Pregnancy</td><td>Per protocol — typically within 24 hours of site awareness</td><td>Special Pregnancy Notification Form (not SAE form)</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 The 24-Hour Rule</div>
  <p>The initial report does <strong>not</strong> need to be complete. Send what you have. The rule is: <strong>report first, complete later</strong>. A follow-up report with additional information can be submitted at any time after the initial report. The 24-hour clock starts when the PI or any site staff member <em>becomes aware</em> of the event — not when the sponsor becomes aware.</p>
</div>
<hr/>

<h2>What the Initial SAE Report Must Contain</h2>
<p>At minimum, the initial report must have the <strong>"minimum dataset"</strong> to be valid:</p>
<ul>
  <li>A <strong>suspect drug</strong> (the IMP or comparator)</li>
  <li>An <strong>identifiable patient</strong> (subject number, initials, or DOB — not a name)</li>
  <li>An <strong>identifiable reporter</strong> (site name/number, PI contact)</li>
  <li>A <strong>suspected adverse reaction</strong> (description of the event, even if incomplete)</li>
</ul>
<p>Additional information submitted in follow-up reports should include: onset date, outcome, medical history, concomitant medications, causality assessment by the PI, and relevant lab values.</p>
<hr/>

<h2>SAE Follow-Up Reports</h2>
<p>After the initial report, the site must provide follow-up reports until the SAE is <strong>resolved, stabilised, or the subject withdraws from the trial</strong>. Follow-up reports are numbered sequentially (Follow-up 1, Follow-up 2, etc.) and should update:</p>
<ul>
  <li>Current status of the event (ongoing, resolved, resolving, resolved with sequelae, fatal)</li>
  <li>Any new information about causality, diagnosis, or treatment</li>
  <li>Outcome at the end of the trial follow-up period</li>
</ul>
<hr/>

<h2>Serious Breach Reporting</h2>
<p>Failure to report an SAE within 24 hours — or failure to report a SUSAR at all — can constitute a <strong>Serious Breach</strong>. A Serious Breach is a breach that is likely to affect to a significant degree:</p>
<ul>
  <li>The <strong>safety or physical or mental integrity</strong> of the participants</li>
  <li>Or the <strong>scientific value</strong> of the trial</li>
</ul>
<p>The Sponsor must submit a written notification of a Serious Breach to the MHRA <strong>within 7 days</strong> of becoming aware. Failure to do so is itself a further breach.</p>

<div class="warning-box">
  <p>⚠️ <strong>CRA Responsibility at Site Visits:</strong> At every Routine Monitoring Visit (RMV), the CRA must review the SAE log and verify that all SAEs have been reported to the Sponsor within 24 hours. Gaps in reporting must be documented as Protocol Deviations and escalated to the Sponsor's pharmacovigilance team immediately.</p>
</div>
`;

// ── MODULE 2, LESSON 2: SUSAR Reporting — Sponsor to Regulators
CONTENT.susarReporting = `
<h1>SUSAR Reporting: Sponsor to MHRA &amp; EudraVigilance</h1>
<p>Once the Sponsor receives an SAE from the site and assesses it as a SUSAR, urgent regulatory reporting timelines apply. This lesson covers every scenario — including the edge cases that trip people up.</p>
<hr/>

<h2>The Complete SUSAR Reporting Timeline Matrix</h2>
<table>
  <tr><th>SUSAR Type</th><th>Reporting Deadline</th><th>Completed Report</th><th>Destination</th></tr>
  <tr>
    <td>Fatal or life-threatening SUSAR</td>
    <td>As soon as possible — <strong>no later than 7 calendar days</strong> after the Sponsor becomes aware</td>
    <td>Completed report within an additional <strong>8 calendar days</strong></td>
    <td>MHRA (UK) and/or EudraVigilance (EU)</td>
  </tr>
  <tr>
    <td>Non-fatal, non-life-threatening SUSAR</td>
    <td>As soon as possible — <strong>no later than 15 calendar days</strong> after the Sponsor becomes aware</td>
    <td>No separate timeline — complete before submission</td>
    <td>MHRA (UK) and/or EudraVigilance (EU)</td>
  </tr>
  <tr>
    <td>SUSAR initially non-fatal/non-life-threatening, later found to be fatal or life-threatening</td>
    <td><strong>7-day clock restarts</strong> from the date the Sponsor becomes aware of the change in status</td>
    <td>Completed report within additional 8 days</td>
    <td>MHRA (UK) and/or EudraVigilance (EU)</td>
  </tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 Calendar Days vs Working Days</div>
  <p>SUSAR timelines use <strong>calendar days</strong>, not working days. Weekends and bank holidays count. If the 7th calendar day falls on a Sunday, the submission is still due by end of that Sunday — not the following Monday.</p>
</div>
<hr/>

<h2>When Does the Clock Start?</h2>
<p>The clock starts from the date the <strong>Sponsor becomes aware</strong> of the minimum information required to identify the case as a potential SUSAR:</p>
<ul>
  <li>Suspect drug</li>
  <li>Identifiable patient</li>
  <li>Identifiable reporter</li>
  <li>Suspected adverse reaction</li>
</ul>
<p>The sponsor's awareness date is Day 0. Day 1 is the next calendar day. The 7-day deadline is therefore Day 7.</p>
<hr/>

<h2>SUSAR Line Listings and Blinded Data</h2>
<p>In blinded clinical trials, the Sponsor must have procedures for <strong>unblinding</strong> a case when a SUSAR is suspected. Key principles:</p>
<ul>
  <li>If the treatment assignment is unknown (blinded), the Sponsor should assume the worst case for reporting purposes</li>
  <li>Unblinding for a single patient's SUSAR assessment should be done in a controlled manner — typically by the pharmacovigilance department or medical monitor, not the CRA or site</li>
  <li>The <strong>Trial Steering Committee (TSC)</strong> or <strong>Data Safety Monitoring Board (DSMB)</strong> is responsible for unblinded safety monitoring in randomised controlled trials</li>
  <li>SUSAR line listings submitted to investigators must be <strong>blinded</strong> (treatment allocation removed) to preserve trial integrity</li>
</ul>
<hr/>

<h2>SUSAR Reporting to Investigators</h2>
<p>The Sponsor must also notify all <strong>active investigators</strong> running the same trial of all SUSARs, so they can re-evaluate the benefit-risk for their own participants. Timelines for investigator notification:</p>
<ul>
  <li>Fatal/life-threatening SUSARs: As soon as possible, in any event within <strong>7 days</strong> of Sponsor awareness</li>
  <li>Non-fatal/non-life-threatening SUSARs: Within <strong>15 days</strong> of Sponsor awareness</li>
</ul>
<p>Investigator notification is typically done via a <strong>Safety Letter</strong> or <strong>Safety Signal Communication</strong> — these must be filed in both the ISF at site and the eTMF at the Sponsor.</p>
<hr/>

<h2>Development Safety Update Report (DSUR)</h2>
<p>Beyond individual SUSAR reports, the Sponsor must submit an annual safety summary — the <strong>DSUR (Development Safety Update Report)</strong> — to the MHRA (UK) and relevant competent authorities for ongoing trials. The DSUR:</p>
<ul>
  <li>Covers a 12-month period (the <em>Data Lock Point</em> anniversary of the IND/CTA)</li>
  <li>Includes line listings of all SUSARs during the period</li>
  <li>Provides a cumulative summary of the IMP's safety profile</li>
  <li>Identifies any new safety signals and their management</li>
  <li>Assesses whether the benefit-risk profile of the IMP has changed</li>
  <li>Is submitted within <strong>60 days</strong> of the data lock point</li>
</ul>
`;

// ── MODULE 3, LESSON 1: SAE Narratives ───────────────────────
CONTENT.saeNarratives = `
<h1>Writing SAE Narratives</h1>
<p>The Individual Case Safety Report (ICSR) narrative is the written account of a single adverse event case. It is the most important document in pharmacovigilance case processing — it tells the story of what happened to the patient, allows medical reviewers to assess causality, and forms the basis for regulatory decision-making.</p>
<hr/>

<h2>What Is an ICSR Narrative?</h2>
<p>An ICSR narrative is a <strong>chronological, factual, and medically accurate summary</strong> of the adverse event case. It is part of the structured ICSR form submitted to regulatory databases (EudraVigilance / Yellow Card / FAERS). A well-written narrative answers five questions:</p>
<ol>
  <li><strong>Who?</strong> — Patient demographics and relevant medical history</li>
  <li><strong>What?</strong> — Description of the adverse event</li>
  <li><strong>When?</strong> — Timeline of drug exposure and event onset</li>
  <li><strong>How?</strong> — Clinical course, treatment, and outcome</li>
  <li><strong>Why?</strong> — Causality assessment and relevant context</li>
</ol>
<hr/>

<h2>Structure of a Compliant SAE Narrative</h2>
<p>While formats vary by sponsor, the EMA/ICH E2B(R3) guidance recommends the following information be included:</p>

<h3>1. Patient Information</h3>
<ul>
  <li>Age (or date of birth), sex, weight, height where relevant</li>
  <li>Relevant medical history (prior conditions, allergies, prior drug reactions)</li>
  <li>Concomitant medications (with start/stop dates and doses)</li>
</ul>

<h3>2. Drug Information</h3>
<ul>
  <li>Suspect drug(s): name, dose, route, frequency, indication</li>
  <li>Start date and stop date of the suspect drug</li>
  <li>Batch number if known (especially important for biologics and vaccines)</li>
  <li>Any dose modifications before the event</li>
</ul>

<h3>3. Event Description</h3>
<ul>
  <li>Onset date of the adverse event</li>
  <li>Description of signs, symptoms, and clinical findings</li>
  <li>Relevant laboratory values with units and normal ranges</li>
  <li>Diagnostic investigations performed</li>
  <li>Treatment given for the adverse event</li>
</ul>

<h3>4. Dechallenge and Rechallenge</h3>
<ul>
  <li><strong>Dechallenge</strong>: Was the drug stopped or dose reduced? What happened to the event? (Positive dechallenge = event improved on stopping)</li>
  <li><strong>Rechallenge</strong>: Was the drug restarted? Did the event recur? (Positive rechallenge = strong evidence of causality)</li>
</ul>

<h3>5. Outcome</h3>
<ul>
  <li>Resolved, resolving, resolved with sequelae, ongoing, fatal, unknown</li>
  <li>Date of resolution if resolved</li>
</ul>

<h3>6. Causality Assessment</h3>
<ul>
  <li>Reporter's causality assessment (the PI's opinion)</li>
  <li>Sponsor's causality assessment (the medical monitor's opinion)</li>
  <li>Expectedness assessment against the RSI/SmPC</li>
</ul>
<hr/>

<h2>Example Narrative — Compliant Format</h2>
<div class="info-box">
  <div class="info-box-title">📄 Example ICSR Narrative</div>
  <p><em>A 54-year-old male patient (Subject 001-003) with a medical history of hypertension and type 2 diabetes mellitus was enrolled in Study XYZ-001. The patient was receiving Study Drug A 200 mg once daily (commenced 15 January 2024) and concomitant metformin 1000 mg twice daily.</em></p>
  <p><em>On 20 February 2024 (Day 36 of treatment), the patient presented to the emergency department with sudden onset of right-sided weakness and slurred speech. Brain MRI confirmed an acute ischaemic stroke. The patient was admitted to the neurology unit and treated with anticoagulation therapy. Study Drug A was permanently discontinued on 20 February 2024.</em></p>
  <p><em>Following dechallenge, the neurological symptoms partially resolved over 4 weeks. At Day 28 post-event, the patient had residual mild right-hand weakness (NIHSS score 2). The event was assessed as serious (hospitalisation; significant disability) and unexpected (acute ischaemic stroke not listed in the current IB v3.0 RSI). The PI assessed causality as "Possible." The Sponsor's Medical Monitor assessed causality as "Possible" and classified the event as a SUSAR.</em></p>
  <p><em>This is the initial report. Follow-up information will be provided when available.</em></p>
</div>
<hr/>

<h2>Common Narrative Errors to Avoid</h2>
<table>
  <tr><th>Error</th><th>Why It Matters</th></tr>
  <tr><td>Omitting concomitant medications</td><td>Prevents drug interaction assessment — may lead to incorrect causality</td></tr>
  <tr><td>Missing laboratory values (without units/normal ranges)</td><td>Reviewers cannot assess severity without reference ranges</td></tr>
  <tr><td>Using jargon or abbreviations not defined</td><td>Must be understandable to any qualified medical reviewer globally</td></tr>
  <tr><td>Stating "no dechallenge information available" when drug was stopped</td><td>Always document what happened when the drug was stopped — even if unrelated</td></tr>
  <tr><td>Giving causality without evidence</td><td>Causality must be justified by the timeline, dechallenge, and plausibility — not just asserted</td></tr>
  <tr><td>Copying source document verbatim without synthesis</td><td>A narrative is a <em>summary</em>, not a transcript of notes</td></tr>
</table>
`;

// ── MODULE 3, LESSON 2: ICSR Processing & Case Management ────
CONTENT.icsrProcessing = `
<h1>ICSR Processing &amp; Case Management</h1>
<p>Individual Case Safety Report (ICSR) processing is the operational backbone of pharmacovigilance. Every reported adverse event — whether from a clinical trial site, healthcare professional, or patient — must be received, triaged, assessed, coded, and submitted within defined timelines. This lesson covers the end-to-end case workflow.</p>
<hr/>

<h2>The ICSR Processing Workflow</h2>
<ol>
  <li><strong>Case Receipt</strong> — The case arrives via SAE form, eCRF, Yellow Card, medical information call, literature, or other source</li>
  <li><strong>Triage</strong> — Does the case meet the minimum dataset? Is it a duplicate? What is the seriousness/expectedness?</li>
  <li><strong>Data Entry</strong> — Case details entered into the safety database (e.g. ARISg, Veeva Vault Safety, Oracle Argus)</li>
  <li><strong>Medical Coding</strong> — Adverse event terms coded using <strong>MedDRA (Medical Dictionary for Regulatory Activities)</strong></li>
  <li><strong>Medical Review</strong> — Causality assessment, expectedness assessment, and narrative writing by the medical reviewer</li>
  <li><strong>Quality Review</strong> — QC check against source documents</li>
  <li><strong>Regulatory Submission</strong> — Submission to MHRA (Yellow Card / UK CTR) and/or EudraVigilance within applicable timelines</li>
  <li><strong>Follow-up</strong> — Requesting additional information; processing follow-up reports</li>
  <li><strong>Case Closure</strong> — Case closed when event is resolved or no further information expected</li>
</ol>
<hr/>

<h2>MedDRA Coding</h2>
<p>MedDRA is the international medical terminology dictionary used to code adverse events in regulatory submissions. It has a five-level hierarchy:</p>
<table>
  <tr><th>Level</th><th>Name</th><th>Example</th></tr>
  <tr><td>1 (broadest)</td><td>System Organ Class (SOC)</td><td>Nervous system disorders</td></tr>
  <tr><td>2</td><td>High Level Group Term (HLGT)</td><td>Neurological disorders NEC</td></tr>
  <tr><td>3</td><td>High Level Term (HLT)</td><td>Cerebrovascular disorders</td></tr>
  <tr><td>4</td><td>Preferred Term (PT)</td><td>Ischaemic stroke</td></tr>
  <tr><td>5 (most specific)</td><td>Lowest Level Term (LLT)</td><td>Acute ischaemic stroke</td></tr>
</table>
<p>ICSRs are coded at the <strong>Preferred Term (PT)</strong> level. The PT is the primary coding unit for regulatory submissions and signal detection. MedDRA is updated twice yearly (March and September); PTs may change between versions.</p>
<hr/>

<h2>Safety Databases Used in Industry</h2>
<table>
  <tr><th>System</th><th>Used By</th><th>Notes</th></tr>
  <tr><td><strong>Oracle Argus</strong></td><td>Large pharma, CROs</td><td>Industry standard; complex configuration</td></tr>
  <tr><td><strong>ARISg (now Veeva Vault Safety)</strong></td><td>Pharma, CROs, MAHs</td><td>Widely used; cloud-based successor to ARISg</td></tr>
  <tr><td><strong>AERS / OmniCom (now Aris Global)</strong></td><td>Various</td><td>Legacy systems still in use</td></tr>
  <tr><td><strong>EudraVigilance</strong></td><td>EMA + MAHs for EU submissions</td><td>Regulatory database — not an internal PV system</td></tr>
  <tr><td><strong>Yellow Card</strong></td><td>MHRA + UK reporters</td><td>Regulatory database — not an internal PV system</td></tr>
</table>
<hr/>

<h2>Duplicate Case Detection</h2>
<p>A single adverse event may be reported multiple times — by the patient, the prescribing physician, and the hospital simultaneously. Failing to identify duplicates inflates case counts and distorts signal detection. Duplicate detection relies on matching:</p>
<ul>
  <li>Patient identifiers (initials, DOB, country)</li>
  <li>Suspect drug</li>
  <li>Adverse event term</li>
  <li>Event onset date</li>
  <li>Reporter details</li>
</ul>
<p>Cases suspected as duplicates must be assessed by a medically qualified reviewer before being merged or rejected.</p>
<hr/>

<h2>Literature Monitoring</h2>
<p>MAHs are legally required to conduct <strong>systematic literature monitoring</strong> — reviewing published scientific and medical literature for case reports and case series that may contain adverse event data for their products. Key requirements:</p>
<ul>
  <li>Monitor at least <strong>MEDLINE</strong> (via PubMed) weekly or biweekly</li>
  <li>Screen for the INN (International Nonproprietary Name) of each product</li>
  <li>Cases identified must be processed as ICSRs and submitted within applicable timelines</li>
  <li>Literature monitoring is a specific focus of MHRA pharmacovigilance inspections</li>
</ul>
`;

// ── MODULE 4, LESSON 1: EudraVigilance & UK Yellow Card ──────
CONTENT.eudravigilance = `
<h1>EudraVigilance &amp; the UK Yellow Card Submission Pathway</h1>
<p>EudraVigilance is the EMA's central pharmacovigilance database; the Yellow Card scheme is the MHRA's. Post-Brexit, they operate as entirely independent systems. This lesson covers how to submit to each and what happens after submission.</p>
<hr/>

<h2>EudraVigilance — The EU System</h2>
<p>EudraVigilance (EV) is the European database for reports of suspected adverse drug reactions in medicines authorised or under clinical investigation in the European Economic Area (EEA). It is managed by the EMA and is used by:</p>
<ul>
  <li>Marketing Authorisation Holders (MAHs) to submit post-marketing ICSRs</li>
  <li>Sponsors to submit SUSARs from EU clinical trials</li>
  <li>National Competent Authorities (NCAs) in EU member states to exchange pharmacovigilance data</li>
</ul>

<h3>EudraVigilance Access and Submission Methods</h3>
<table>
  <tr><th>Submission Method</th><th>Used For</th></tr>
  <tr><td><strong>EV Gateway</strong> (machine-to-machine)</td><td>High-volume MAH submissions; requires direct connection from safety database (Argus, Vault Safety)</td></tr>
  <tr><td><strong>EVWEB</strong> (browser-based)</td><td>Manual entry of individual ICSRs; used by smaller organisations or for occasional submissions</td></tr>
  <tr><td><strong>EV Reporting Tool</strong></td><td>Simplified browser tool for NCAs and MAHs reporting in E2B(R3) XML format</td></tr>
</table>

<h3>ICH E2B(R3) — The ICSR Data Standard</h3>
<p>All EudraVigilance submissions must conform to <strong>ICH E2B(R3)</strong> — the international standard for electronic transmission of ICSRs. E2B(R3) defines:</p>
<ul>
  <li>The XML structure and data fields for an ICSR</li>
  <li>Mandatory vs optional fields</li>
  <li>MedDRA coding requirements</li>
  <li>Controlled vocabulary for outcome, causality, and expectedness fields</li>
</ul>
<hr/>

<h2>UK Yellow Card — Post-Brexit MHRA Pathway</h2>
<p>From 1 January 2021, the UK Yellow Card scheme operates completely independently from EudraVigilance. The MHRA no longer receives data from EV and does not share UK data with EV automatically.</p>

<h3>UK ICSR Submission Requirements</h3>
<table>
  <tr><th>Submission Method</th><th>Used For</th></tr>
  <tr><td><strong>ICSR Submission Portal</strong> (formerly Yellow Card)</td><td>MAH electronic submissions in E2B(R3) format; accessible via the MHRA portal</td></tr>
  <tr><td><strong>Yellow Card website/app</strong></td><td>Healthcare professionals and patients — spontaneous reports</td></tr>
  <tr><td><strong>E2B XML via secure API</strong></td><td>High-volume MAH/CRO submissions directly from safety database</td></tr>
</table>

<h3>Key Post-Brexit Differences</h3>
<table>
  <tr><th>Area</th><th>EU (EudraVigilance)</th><th>UK (Yellow Card / MHRA Portal)</th></tr>
  <tr><td>Governing Legislation</td><td>EU Regulation 726/2004; EU CTR 536/2014</td><td>UK Human Medicines Regulations 2012 (as amended); MMDA 2021</td></tr>
  <tr><td>SUSAR reporting (trials)</td><td>Via EudraVigilance EV Gateway or EVWEB</td><td>Via MHRA ICSR portal or direct UK Yellow Card scheme</td></tr>
  <tr><td>Post-marketing ADR reporting</td><td>EudraVigilance — 15 days for serious; 90 days for non-serious</td><td>MHRA Yellow Card portal — 15 days for serious</td></tr>
  <tr><td>PSUR submission</td><td>EMA via eSubmission portal</td><td>MHRA via eSubmission portal (separate submission)</td></tr>
  <tr><td>Signal detection database</td><td>EudraVigilance EVPM</td><td>UK Yellow Card database (MHRA)</td></tr>
  <tr><td>QPPV residence requirement</td><td>EU/EEA resident QPPV</td><td>UK-resident QPPV (separate role post-Brexit)</td></tr>
</table>
<hr/>

<h2>The PSUR/PBRER — Periodic Safety Update</h2>
<p>For authorised medicines, MAHs must submit <strong>Periodic Safety Update Reports (PSURs)</strong> — also called Periodic Benefit-Risk Evaluation Reports (PBRERs) per ICH E2C(R2). Post-Brexit:</p>
<ul>
  <li>EU PSURs are submitted to the EMA via the eSubmission portal; assessed by the <strong>PRAC (Pharmacovigilance Risk Assessment Committee)</strong></li>
  <li>UK PSURs are submitted to the MHRA separately — the MHRA may accept the EU PSUR or require UK-specific data</li>
  <li>The EU and UK PSUR submission dates may differ — MAHs must track both calendars</li>
  <li>First PSUR: typically 6 months after initial authorisation; then annually for 2 years; then every 3 years</li>
</ul>
<hr/>

<h2>Good Vigilance Practice (GVP) Modules</h2>
<p>EMA's <strong>Good Vigilance Practice (GVP) guidelines</strong> are the operational guidance documents for EU pharmacovigilance. The key modules relevant to this course:</p>
<table>
  <tr><th>Module</th><th>Topic</th></tr>
  <tr><td><strong>Module I</strong></td><td>Pharmacovigilance Systems and their Quality Systems</td></tr>
  <tr><td><strong>Module II</strong></td><td>Pharmacovigilance System Master File (PSMF)</td></tr>
  <tr><td><strong>Module III</strong></td><td>Pharmacovigilance Inspections</td></tr>
  <tr><td><strong>Module VI</strong></td><td>Collection, Management and Submission of Reports of Suspected ADRs</td></tr>
  <tr><td><strong>Module VII</strong></td><td>Periodic Safety Update Report (PSUR)</td></tr>
  <tr><td><strong>Module IX</strong></td><td>Signal Management</td></tr>
  <tr><td><strong>Module XV</strong></td><td>Safety Communication (DHPCs, RMPs)</td></tr>
  <tr><td><strong>Module XVI</strong></td><td>Risk Minimisation Measures</td></tr>
</table>
<p>The MHRA publishes its own parallel guidance — the <strong>Good Pharmacovigilance Practice (GPvP) guidance</strong> — which aligns with GVP but reflects UK-specific requirements post-Brexit.</p>
`;

// ── MODULE 4, LESSON 2: Post-Brexit Dual Reporting ───────────
CONTENT.postBrexitReporting = `
<h1>Post-Brexit Dual Reporting: Navigating UK and EU Obligations</h1>
<p>For organisations running clinical trials or holding marketing authorisations in both the UK and EU, post-Brexit has created a genuinely dual-track regulatory environment. This lesson maps every key obligation so you know exactly what needs to go where — and when.</p>
<hr/>

<h2>The Regulatory Split — What Changed on 1 January 2021</h2>
<p>Before Brexit, UK marketing authorisations issued via the EMA Centralised Procedure automatically applied in the UK. The MHRA was part of the EU PV network and shared data via EudraVigilance. From 1 January 2021:</p>
<ul>
  <li>The MHRA became the UK's independent national competent authority</li>
  <li>The UK is no longer part of EudraVigilance — UK Yellow Card data is not automatically shared with EMA</li>
  <li>Companies need separate UK Marketing Authorisations (UKMAs) and EU Marketing Authorisations (EMA/national)</li>
  <li>Each jurisdiction requires its own QPPV, PSMF, and periodic report submissions</li>
</ul>
<hr/>

<h2>Clinical Trial SUSAR Reporting — Dual Track</h2>
<p>For a clinical trial running in both the UK and the EU, the Sponsor has independent reporting obligations to both regulators:</p>
<table>
  <tr><th>Obligation</th><th>UK (MHRA)</th><th>EU (EMA / Member State NCAs)</th></tr>
  <tr><td>SUSAR reporting — fatal/life-threatening</td><td>7 days to MHRA + 8-day follow-up</td><td>7 days to EudraVigilance + 8-day follow-up</td></tr>
  <tr><td>SUSAR reporting — non-fatal</td><td>15 days to MHRA</td><td>15 days to EudraVigilance</td></tr>
  <tr><td>Annual safety summary</td><td>DSUR to MHRA within 60 days of data lock</td><td>DSUR to relevant NCAs within 60 days of data lock</td></tr>
  <tr><td>Serious Breach</td><td>Written notification to MHRA within 7 days</td><td>Notification to relevant NCAs and Ethics Committees</td></tr>
</table>
<div class="warning-box">
  <p>⚠️ <strong>Practical impact:</strong> If a trial has UK and EU sites, you may need to submit the same SUSAR to both MHRA and EudraVigilance with the same 7/15-day clock. Many sponsors use a single safety database (Argus/Vault Safety) with separate submission workflows configured for each destination.</p>
</div>
<hr/>

<h2>Post-Marketing ADR Reporting — Dual Track</h2>
<table>
  <tr><th>ADR Type</th><th>UK (MHRA Yellow Card)</th><th>EU (EudraVigilance)</th></tr>
  <tr><td>Serious ADR (including fatal)</td><td><strong>15 days</strong> from MAH awareness</td><td><strong>15 days</strong> from MAH awareness</td></tr>
  <tr><td>Non-serious ADR</td><td><strong>90 days</strong> from MAH awareness</td><td><strong>90 days</strong> from MAH awareness</td></tr>
  <tr><td>Solicited reports from interventional trials</td><td>Expedited reporting per trial protocol</td><td>Expedited reporting per EU CTR</td></tr>
</table>
<hr/>

<h2>Northern Ireland — A Special Case</h2>
<p>Under the <strong>Windsor Framework (2023)</strong>, Northern Ireland (NI) has a unique regulatory position for human medicines:</p>
<ul>
  <li>Medicines for human use in NI continue to be regulated under EU law (EMA/PRAC mechanisms)</li>
  <li>NI pharmacovigilance obligations remain aligned with EU requirements, not purely MHRA</li>
  <li>MAHs must track NI separately — it is not simply covered by the UK MHRA authorisation</li>
  <li>This creates a three-track situation in some cases: UK (MHRA) + EU (EMA) + NI (EU rules via Windsor Framework)</li>
</ul>
<hr/>

<h2>Practical Checklist: Running a UK/EU Dual-Track Trial</h2>
<div class="key-points">
  <div class="key-points-title">✅ Dual-Track Compliance Checklist</div>
  <ul>
    <li>☐ Separate UK QPPV (UK resident) and EU QPPV (EEA resident) appointed</li>
    <li>☐ UK PSMF and EU PSMF maintained separately (or unified with UK-specific and EU-specific sections)</li>
    <li>☐ Safety database configured with separate submission profiles for MHRA and EudraVigilance</li>
    <li>☐ SUSAR reporting SOPs cover both MHRA and EV timelines</li>
    <li>☐ DSUR submitted to MHRA and all relevant EU NCAs on same timeline</li>
    <li>☐ PSUR/PBRER submitted to MHRA and EMA on respective calendars</li>
    <li>☐ NI Windsor Framework obligations assessed for any NI-specific marketing</li>
    <li>☐ Literature monitoring covers UK and EU-specific publications</li>
    <li>☐ RMP assessed by both MHRA and PRAC — may require separate versions</li>
  </ul>
</div>
`;

// ── MODULE 5, LESSON 1: Practical Case Studies ───────────────
CONTENT.caseStudies = `
<h1>Practical Case Studies in AE Reporting</h1>
<p>The best way to consolidate your understanding of adverse event reporting is to work through real scenarios. Each case below presents a clinical situation and asks you to classify the event, determine the reporting timeline, and identify the correct actions.</p>
<hr/>

<h2>Case Study 1 — The Hospitalisation</h2>
<div class="info-box">
  <div class="info-box-title">📋 Scenario</div>
  <p>Subject 004-012 is enrolled in a Phase 2 oncology trial receiving Study Drug B 150 mg daily. On Day 45, the subject is admitted to hospital with Grade 3 neutropenia and fever (febrile neutropenia). Hospitalisation lasts 5 days. Grade 3 neutropenia is listed in the IB RSI with an expected frequency of 15% of patients.</p>
</div>
<h3>Analysis</h3>
<table>
  <tr><th>Question</th><th>Answer</th></tr>
  <tr><td>Is this an AE?</td><td>✅ Yes — untoward medical occurrence during treatment</td></tr>
  <tr><td>Is this an SAE?</td><td>✅ Yes — overnight hospitalisation (seriousness criterion #3)</td></tr>
  <tr><td>Is causality suspected?</td><td>✅ Yes — neutropenia is a known effect of the class; Grade 3 with fever consistent with IMP</td></tr>
  <tr><td>Is it expected?</td><td>✅ Yes — Grade 3 neutropenia listed in RSI at 15% frequency</td></tr>
  <tr><td>Classification</td><td><strong>Expected SAR</strong> — NOT a SUSAR</td></tr>
  <tr><td>Reporting timeline</td><td>Report to Sponsor within <strong>24 hours</strong>. Sponsor does NOT need to expedite-report to MHRA/EV. Include in DSUR and ASR.</td></tr>
</table>

<hr/>
<h2>Case Study 2 — The Unexpected Reaction</h2>
<div class="info-box">
  <div class="info-box-title">📋 Scenario</div>
  <p>Subject 007-003 is enrolled in a Phase 3 cardiovascular trial receiving Study Drug C 20 mg daily. On Day 89, the subject is diagnosed with Stevens-Johnson Syndrome (SJS) and hospitalised for 10 days. SJS is not listed anywhere in the current IB RSI.</p>
</div>
<h3>Analysis</h3>
<table>
  <tr><th>Question</th><th>Answer</th></tr>
  <tr><td>Is this an SAE?</td><td>✅ Yes — hospitalisation (criterion #3) + significant disability (criterion #4)</td></tr>
  <tr><td>Causality suspected?</td><td>✅ Yes — SJS is a known drug-induced reaction class; reasonable possibility</td></tr>
  <tr><td>Expected?</td><td>❌ No — not in the RSI</td></tr>
  <tr><td>Classification</td><td><strong>SUSAR</strong></td></tr>
  <tr><td>Reporting timeline</td><td>Non-fatal SUSAR: Sponsor must report to MHRA/EV within <strong>15 calendar days</strong> of Sponsor awareness. Site must report to Sponsor within <strong>24 hours</strong>.</td></tr>
  <tr><td>Additional actions</td><td>All active investigators must be notified within 15 days via Safety Letter. Consider IB update. Consider protocol amendment if SJS monitoring required.</td></tr>
</table>

<hr/>
<h2>Case Study 3 — The Fatal SUSAR</h2>
<div class="info-box">
  <div class="info-box-title">📋 Scenario</div>
  <p>Subject 002-008 in a Phase 2 neurology trial dies on Day 12 of treatment. Cause of death: acute liver failure. Hepatotoxicity is not mentioned in the IB RSI. The Sponsor becomes aware on a Monday morning. The initial SAE form arrives incomplete — lab values are missing.</p>
</div>
<h3>Analysis</h3>
<table>
  <tr><th>Question</th><th>Answer</th></tr>
  <tr><td>Classification</td><td><strong>Fatal SUSAR</strong></td></tr>
  <tr><td>Reporting timeline</td><td>Sponsor must report to MHRA/EV within <strong>7 calendar days</strong> of Monday (= by end of Sunday of the same week). Completed report within additional 8 days (Day 15).</td></tr>
  <tr><td>Can the Sponsor wait for complete data?</td><td>❌ No. Submit with minimum dataset by Day 7. Missing labs can follow in the Day-15 complete report.</td></tr>
  <tr><td>Investigator notification</td><td>All active investigators notified within 7 days via urgent Safety Letter</td></tr>
  <tr><td>IB update trigger?</td><td>Yes — fatal unexpected hepatotoxicity triggers IB RSI review by Sponsor's medical team</td></tr>
</table>

<hr/>
<h2>Case Study 4 — Pregnancy</h2>
<div class="info-box">
  <div class="info-box-title">📋 Scenario</div>
  <p>Subject 003-015, a 32-year-old female enrolled in a Phase 3 dermatology trial, reports a positive pregnancy test on Day 67. The protocol requires effective contraception throughout. She had been using a contraceptive patch but reports she may have forgotten to replace it on time.</p>
</div>
<h3>Analysis</h3>
<table>
  <tr><th>Question</th><th>Answer</th></tr>
  <tr><td>Is pregnancy an SAE?</td><td>❌ No — pregnancy itself is NOT an SAE. Report via special Pregnancy Notification Form.</td></tr>
  <tr><td>Is there a Protocol Deviation?</td><td>✅ Yes — contraception protocol not followed. Must be recorded in the PD log and acknowledged by PI.</td></tr>
  <tr><td>What must the PI do?</td><td>Follow up the pregnancy until birth and into the baby's infancy. Any adverse outcomes during pregnancy (miscarriage, pre-eclampsia, congenital anomaly at birth) must be reported as AE/SAE.</td></tr>
  <tr><td>Congenital anomaly?</td><td>A congenital anomaly in the baby would be classified as an SAE (criterion #5) and assessed for SUSAR status against the RSI.</td></tr>
</table>
`;

// ─────────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────────
const MODULES = [

  // ═══════════════════════════════════════════════════════
  // MODULE 1: AE Classification & Decision Framework
  // ═══════════════════════════════════════════════════════
  {
    title: 'Module 1: The AE Classification Framework',
    description: 'From AE to SUSAR — the complete decision framework including seriousness criteria, expectedness assessment, and the severity vs seriousness distinction.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'Welcome & Course Overview',
        lessonType: 'VIDEO', videoUrl: VIDEOS.welcome, videoDurationMinutes: 7,
        isPreview: true, order: 1, content: CONTENT.welcome,
      },
      {
        title: 'The AE Classification Decision Framework',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.aeFramework,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'An event must meet how many of the six seriousness criteria to be classified as an SAE?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An event is classified as an SAE if it meets ANY ONE of the six seriousness criteria.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Any one criterion', isCorrect: true, order: 1 },
            { optionText: 'At least two criteria', isCorrect: false, order: 2 },
            { optionText: 'All six criteria', isCorrect: false, order: 3 },
            { optionText: 'At least three criteria', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'During a clinical trial, expectedness of a serious adverse reaction is assessed against:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'In a clinical trial, expectedness is assessed against the Reference Safety Information (RSI) in the Investigator\'s Brochure (IB). Post-marketing, it is the SmPC.',
          marks: 1, order: 2,
          options: [
            { optionText: 'The Reference Safety Information (RSI) in the Investigator\'s Brochure', isCorrect: true, order: 1 },
            { optionText: 'The Summary of Product Characteristics (SmPC)', isCorrect: false, order: 2 },
            { optionText: 'The CTCAE v5.0 grading criteria', isCorrect: false, order: 3 },
            { optionText: 'The protocol\'s inclusion/exclusion criteria', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A CTCAE Grade 3 event is described as "severe." Is it automatically classified as an SAE?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Severe" (intensity) ≠ "Serious" (regulatory classification). A Grade 3 event is only an SAE if it meets one of the six seriousness criteria independently.',
          marks: 1, order: 3,
          options: [
            { optionText: 'No — severity and seriousness are separate assessments', isCorrect: true, order: 1 },
            { optionText: 'Yes — Grade 3 automatically meets the SAE definition', isCorrect: false, order: 2 },
            { optionText: 'Yes — but only if it results in hospitalisation', isCorrect: false, order: 3 },
            { optionText: 'No — only Grade 4 and 5 events can be SAEs', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a Suspected Unexpected Serious Adverse Reaction (SUSAR), which three criteria must ALL be met?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SUSAR = Serious + Unexpected + Suspected causal relationship with the study drug. All three must apply simultaneously.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Serious + Unexpected + Suspected causal relationship with the IMP', isCorrect: true, order: 1 },
            { optionText: 'Fatal + Unexpected + Confirmed by autopsy', isCorrect: false, order: 2 },
            { optionText: 'Serious + Expected + Confirmed causal relationship', isCorrect: false, order: 3 },
            { optionText: 'Grade 4 or 5 + Unexpected + Any adverse event', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Pregnancy in a clinical trial subject is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Pregnancy itself is NOT an SAE. It is reported via a special Pregnancy Notification Form. Complications during the pregnancy (e.g. miscarriage, congenital anomaly) may be classified as AEs or SAEs.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Not an SAE — reported using a special Pregnancy Notification Form', isCorrect: true, order: 1 },
            { optionText: 'Always classified as an SAE under the "medically important event" criterion', isCorrect: false, order: 2 },
            { optionText: 'A Grade 4 adverse event requiring urgent reporting', isCorrect: false, order: 3 },
            { optionText: 'A Protocol Deviation only — no separate form required', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════
  // MODULE 2: SAE & SUSAR Reporting Timelines
  // ═══════════════════════════════════════════════════════
  {
    title: 'Module 2: SAE & SUSAR Reporting Timelines',
    description: 'The complete reporting chain from site to sponsor to regulators — 24-hour, 7-day, and 15-day timelines, minimum datasets, the DSUR, and Serious Breach obligations.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'SAE Reporting: Site to Sponsor',
        lessonType: 'VIDEO', videoUrl: VIDEOS.saeReporting, videoDurationMinutes: 14,
        isPreview: false, order: 1, content: CONTENT.saeReporting,
      },
      {
        title: 'SUSAR Reporting: Sponsor to MHRA & EudraVigilance',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.susarReporting,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'How long does a site have to report a Serious Adverse Reaction to the Sponsor?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SARs must be reported by the site to the Sponsor within 24 hours of the PI or site becoming aware. The initial report does not need to be complete.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Within 24 hours of PI/site awareness', isCorrect: true, order: 1 },
            { optionText: 'Within 7 calendar days of PI/site awareness', isCorrect: false, order: 2 },
            { optionText: 'Within 15 calendar days of PI/site awareness', isCorrect: false, order: 3 },
            { optionText: 'Within 48 hours of PI/site awareness', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A fatal SUSAR must be reported by the Sponsor to the MHRA no later than:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Fatal SUSARs: 7 calendar days from Sponsor awareness for the initial report, with a completed report within an additional 8 days (Day 15 total).',
          marks: 1, order: 2,
          options: [
            { optionText: '7 calendar days, with completed report by Day 15', isCorrect: true, order: 1 },
            { optionText: '15 calendar days from Sponsor awareness', isCorrect: false, order: 2 },
            { optionText: '24 hours from Sponsor awareness', isCorrect: false, order: 3 },
            { optionText: '7 working days from Sponsor awareness', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A SUSAR initially reported as non-fatal is later found to have caused death. The new reporting deadline is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'When a non-fatal SUSAR is later found to be fatal or life-threatening, the 7-day clock RESTARTS from the date the Sponsor becomes aware of the change in status.',
          marks: 1, order: 3,
          options: [
            { optionText: '7 calendar days from when the Sponsor becomes aware it is fatal', isCorrect: true, order: 1 },
            { optionText: 'No new deadline — the original 15-day report already covers it', isCorrect: false, order: 2 },
            { optionText: '24 hours from when the Sponsor becomes aware it is fatal', isCorrect: false, order: 3 },
            { optionText: '15 calendar days from the original reporting date', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The minimum dataset required to initiate a valid SUSAR report includes:',
          questionType: 'MULTI_SELECT',
          explanation: 'The minimum dataset for a valid initial ICSR report: suspect drug, identifiable patient, identifiable reporter, suspected adverse reaction. All four must be present.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Suspect drug', isCorrect: true, order: 1 },
            { optionText: 'Identifiable patient', isCorrect: true, order: 2 },
            { optionText: 'Identifiable reporter', isCorrect: true, order: 3 },
            { optionText: 'Suspected adverse reaction', isCorrect: true, order: 4 },
            { optionText: 'Complete laboratory results', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'The Development Safety Update Report (DSUR) is submitted by the Sponsor within how many days of the data lock point?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The DSUR must be submitted within 60 days of the data lock point (the anniversary of the first approval of the clinical trial application).',
          marks: 1, order: 5,
          options: [
            { optionText: '60 days', isCorrect: true, order: 1 },
            { optionText: '30 days', isCorrect: false, order: 2 },
            { optionText: '90 days', isCorrect: false, order: 3 },
            { optionText: '15 days', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════
  // MODULE 3: SAE Narratives & ICSR Processing
  // ═══════════════════════════════════════════════════════
  {
    title: 'Module 3: SAE Narratives & ICSR Processing',
    description: 'Writing compliant Individual Case Safety Report narratives, MedDRA coding, case management workflow, and duplicate detection.',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'Writing SAE Narratives',
        lessonType: 'VIDEO', videoUrl: VIDEOS.narratives, videoDurationMinutes: 18,
        isPreview: false, order: 1, content: CONTENT.saeNarratives,
      },
      {
        title: 'ICSR Processing & Case Management',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.icsrProcessing,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'A well-structured SAE narrative must answer five core questions. Which of the following is NOT one of them?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The five core questions are: Who? What? When? How? Why? "Where was the drug manufactured?" is not part of the narrative framework.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Where was the drug manufactured?', isCorrect: true, order: 1 },
            { optionText: 'Who is the patient? (demographics and medical history)', isCorrect: false, order: 2 },
            { optionText: 'When did the event occur? (timeline of exposure and onset)', isCorrect: false, order: 3 },
            { optionText: 'Why is causality assessed as it is?', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: '"Dechallenge" in an ICSR narrative refers to:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Dechallenge = stopping or reducing the dose of the suspect drug and observing what happens to the event. Positive dechallenge (event improves on stopping) supports causality.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Stopping or dose-reducing the suspect drug and observing the outcome of the event', isCorrect: true, order: 1 },
            { optionText: 'Restarting the suspect drug and observing whether the event recurs', isCorrect: false, order: 2 },
            { optionText: 'Challenging the causality assessment with new evidence', isCorrect: false, order: 3 },
            { optionText: 'Reporting the event to a national regulatory authority', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In MedDRA, adverse events in ICSRs are coded at which level?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICSRs are coded at the Preferred Term (PT) level — the fourth level of the MedDRA hierarchy. The PT is the primary unit for regulatory submissions and signal detection.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Preferred Term (PT)', isCorrect: true, order: 1 },
            { optionText: 'System Organ Class (SOC)', isCorrect: false, order: 2 },
            { optionText: 'Lowest Level Term (LLT)', isCorrect: false, order: 3 },
            { optionText: 'High Level Term (HLT)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are required components of an SAE narrative?',
          questionType: 'MULTI_SELECT',
          explanation: 'A complete SAE narrative must include: patient info (demographics, medical history), drug information (dose, start/stop), event description, dechallenge/rechallenge information, outcome, and causality assessment.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Patient demographics and relevant medical history', isCorrect: true, order: 1 },
            { optionText: 'Suspect drug name, dose, route, and start/stop dates', isCorrect: true, order: 2 },
            { optionText: 'Dechallenge and rechallenge information', isCorrect: true, order: 3 },
            { optionText: 'Causality assessment by the PI and Sponsor', isCorrect: true, order: 4 },
            { optionText: 'The patient\'s full name and home address', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'MAHs are required to monitor which database at minimum for literature-sourced adverse event case reports?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Regulatory guidance requires MAHs to monitor at least MEDLINE (via PubMed) systematically for case reports and case series containing adverse event data for their products.',
          marks: 1, order: 5,
          options: [
            { optionText: 'MEDLINE (via PubMed)', isCorrect: true, order: 1 },
            { optionText: 'EudraVigilance only', isCorrect: false, order: 2 },
            { optionText: 'The WHO VigiBase database', isCorrect: false, order: 3 },
            { optionText: 'The sponsor\'s internal safety database', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════
  // MODULE 4: EudraVigilance, Yellow Card & Post-Brexit
  // ═══════════════════════════════════════════════════════
  {
    title: 'Module 4: EudraVigilance, Yellow Card & Post-Brexit Dual Reporting',
    description: 'EudraVigilance submission pathways, the MHRA Yellow Card scheme, GVP modules, and the complete post-Brexit dual reporting framework for UK/EU trials and MAHs.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'EudraVigilance & the UK Yellow Card Submission Pathway',
        lessonType: 'VIDEO', videoUrl: VIDEOS.eudravigilance, videoDurationMinutes: 16,
        isPreview: false, order: 1, content: CONTENT.eudravigilance,
      },
      {
        title: 'Post-Brexit Dual Reporting: UK and EU Obligations',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.postBrexitReporting,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The EudraVigilance Gateway (machine-to-machine) submission method is used by:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The EV Gateway is used for high-volume MAH submissions and requires a direct connection from a safety database such as Oracle Argus or Veeva Vault Safety.',
          marks: 1, order: 1,
          options: [
            { optionText: 'MAHs making high-volume submissions directly from their safety database', isCorrect: true, order: 1 },
            { optionText: 'Individual healthcare professionals reporting spontaneous ADRs', isCorrect: false, order: 2 },
            { optionText: 'Patients submitting Yellow Card reports', isCorrect: false, order: 3 },
            { optionText: 'MHRA inspectors reviewing safety data', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Post-Brexit, which of the following statements about UK pharmacovigilance obligations is CORRECT?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-Brexit, UK Yellow Card data is NOT automatically shared with EudraVigilance. MAHs with both UK and EU authorisations must submit ICSRs to both MHRA and EudraVigilance separately.',
          marks: 1, order: 2,
          options: [
            { optionText: 'UK Yellow Card reports are no longer shared automatically with EudraVigilance', isCorrect: true, order: 1 },
            { optionText: 'A single EU QPPV covers both UK and EU obligations', isCorrect: false, order: 2 },
            { optionText: 'The MHRA continues to participate in EudraVigilance data exchange', isCorrect: false, order: 3 },
            { optionText: 'EMA PSUR assessments now cover the UK market', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'GVP Module VI covers which pharmacovigilance topic?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'EMA GVP Module VI covers "Collection, Management and Submission of Reports of Suspected ADRs" — the core operational PV module covering ICSR handling and reporting.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Collection, Management and Submission of Reports of Suspected ADRs', isCorrect: true, order: 1 },
            { optionText: 'Periodic Safety Update Reports (PSUR)', isCorrect: false, order: 2 },
            { optionText: 'Signal Management', isCorrect: false, order: 3 },
            { optionText: 'Risk Minimisation Measures', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under the Windsor Framework (2023), how are medicines for human use in Northern Ireland regulated?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Under the Windsor Framework, medicines for human use in Northern Ireland continue to be regulated under EU law via EMA/PRAC mechanisms — not solely under MHRA UK rules.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Under EU law via EMA/PRAC mechanisms', isCorrect: true, order: 1 },
            { optionText: 'Exclusively under MHRA UK regulations', isCorrect: false, order: 2 },
            { optionText: 'Under a separate Northern Ireland Medicines Authority', isCorrect: false, order: 3 },
            { optionText: 'Under Irish Medicines Board (HPRA) oversight', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a clinical trial running in both the UK and EU, a fatal SUSAR must be reported to:',
          questionType: 'MULTI_SELECT',
          explanation: 'For a dual UK/EU trial, a fatal SUSAR must be reported to both MHRA (UK) and EudraVigilance (EU) — both within 7 days. These are independent reporting obligations.',
          marks: 2, order: 5,
          options: [
            { optionText: 'MHRA within 7 calendar days', isCorrect: true, order: 1 },
            { optionText: 'EudraVigilance within 7 calendar days', isCorrect: true, order: 2 },
            { optionText: 'All active investigators within 7 days', isCorrect: true, order: 3 },
            { optionText: 'WHO Uppsala Monitoring Centre within 7 days', isCorrect: false, order: 4 },
            { optionText: 'The FDA within 7 calendar days', isCorrect: false, order: 5 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════
  // MODULE 5: Final Assessment
  // ═══════════════════════════════════════════════════════
  {
    title: 'Module 5: Final Assessment',
    description: 'Comprehensive final assessment covering all modules. Apply your knowledge through practical case scenarios. Pass to unlock your certificate.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Case Studies & Exam Preparation',
        lessonType: 'VIDEO', videoUrl: VIDEOS.assessment, videoDurationMinutes: 10,
        isPreview: false, order: 1, content: CONTENT.caseStudies,
      },
      {
        title: 'Course Summary',
        lessonType: 'TEXT', isPreview: false, order: 2,
        content: `
<h1>Course Summary &amp; Final Exam Preparation</h1>
<p>You have now completed all four teaching modules. Use this summary to consolidate your knowledge before the final assessment.</p>

<h2>Key Points by Module</h2>

<h3>Module 1 — AE Classification Framework</h3>
<ul>
  <li><strong>AE:</strong> Any untoward medical occurrence — temporal association only, no causality required</li>
  <li><strong>ADR:</strong> Established causal relationship with the medicine</li>
  <li><strong>SAE:</strong> Meets ANY ONE of 6 criteria: death; life-threatening; hospitalisation; disability; congenital anomaly; medically important event</li>
  <li><strong>SUSAR:</strong> SAE + unexpected (not in RSI) + suspected IMP causality — all three required</li>
  <li><strong>Pregnancy:</strong> NOT an SAE — report via special form; follow up to birth and baby's infancy</li>
  <li><strong>Severity ≠ Seriousness:</strong> CTCAE Grade 3 ("severe") does NOT automatically equal "serious"</li>
  <li><strong>Expectedness:</strong> In trials = RSI in IB; Post-marketing = SmPC</li>
</ul>

<h3>Module 2 — Reporting Timelines</h3>
<ul>
  <li><strong>Site → Sponsor:</strong> All SARs within <strong>24 hours</strong> of site awareness. Initial report need not be complete.</li>
  <li><strong>Fatal SUSAR:</strong> Sponsor → MHRA/EV within <strong>7 calendar days</strong> + completed report by Day 15</li>
  <li><strong>Non-fatal SUSAR:</strong> Sponsor → MHRA/EV within <strong>15 calendar days</strong></li>
  <li><strong>Non-fatal → later fatal:</strong> 7-day clock <strong>restarts</strong> from date Sponsor learns of status change</li>
  <li><strong>Serious Breach:</strong> Written notification to MHRA within <strong>7 days</strong></li>
  <li><strong>DSUR:</strong> Submitted within <strong>60 days</strong> of the data lock point</li>
  <li><strong>Minimum dataset:</strong> Suspect drug + identifiable patient + identifiable reporter + suspected reaction</li>
</ul>

<h3>Module 3 — SAE Narratives & ICSR Processing</h3>
<ul>
  <li><strong>Narrative answers:</strong> Who? What? When? How? Why?</li>
  <li><strong>Must include:</strong> patient info, drug details, event description, dechallenge/rechallenge, outcome, causality</li>
  <li><strong>MedDRA coding level:</strong> Preferred Term (PT)</li>
  <li><strong>Dechallenge:</strong> Drug stopped → event outcome. Rechallenge: Drug restarted → event recurrence</li>
  <li><strong>Literature monitoring:</strong> MAHs must monitor MEDLINE at minimum</li>
  <li><strong>Safety databases:</strong> Oracle Argus, Veeva Vault Safety (internal); EudraVigilance, Yellow Card (regulatory)</li>
</ul>

<h3>Module 4 — EudraVigilance &amp; Post-Brexit</h3>
<ul>
  <li><strong>Post-Brexit:</strong> UK Yellow Card data NOT shared with EudraVigilance — entirely separate systems</li>
  <li><strong>Dual QPPV:</strong> UK-resident QPPV (MHRA) + EU-resident QPPV (EMA) — separate roles required</li>
  <li><strong>GVP Module VI:</strong> Collection, Management and Submission of Reports of Suspected ADRs</li>
  <li><strong>Northern Ireland:</strong> EU law applies via Windsor Framework — not purely MHRA</li>
  <li><strong>Dual track reporting:</strong> Same SUSAR must go to MHRA (7/15 days) AND EudraVigilance (7/15 days) for UK/EU trials</li>
  <li><strong>PSUR/PBRER:</strong> Separate submissions to MHRA and EMA on different calendars post-Brexit</li>
</ul>

<blockquote>💡 The final assessment has <strong>15 questions</strong>. Pass mark: <strong>70% (11/15)</strong>. You have <strong>3 attempts</strong>. Your certificate is issued automatically on passing.</blockquote>
`,
      },
    ],
    quiz: {
      title: 'Final Assessment: Adverse Event Reporting — MHRA & EMA Requirements',
      instructions: 'This is the final course assessment. Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Your certificate is issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 30, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'An event is classified as an SAE if it meets any one of six seriousness criteria. Which of the following IS a recognised SAE seriousness criterion?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Congenital anomaly/birth defect is one of the six formal SAE seriousness criteria. Grade 3 severity alone, the patient\'s subjective distress, and sponsor financial impact are not seriousness criteria.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Congenital anomaly/birth defect', isCorrect: true, order: 1 },
            { optionText: 'CTCAE Grade 3 severity rating', isCorrect: false, order: 2 },
            { optionText: 'Patient reports significant distress', isCorrect: false, order: 3 },
            { optionText: 'Financial cost to the sponsor', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are the six SAE seriousness criteria?',
          questionType: 'MULTI_SELECT',
          explanation: 'The six SAE seriousness criteria: death; life-threatening; inpatient hospitalisation or prolongation; persistent/significant disability; congenital anomaly/birth defect; other medically important event.',
          marks: 2, order: 2,
          options: [
            { optionText: 'Death', isCorrect: true, order: 1 },
            { optionText: 'Life-threatening', isCorrect: true, order: 2 },
            { optionText: 'Inpatient hospitalisation or prolongation', isCorrect: true, order: 3 },
            { optionText: 'Persistent or significant disability', isCorrect: true, order: 4 },
            { optionText: 'Congenital anomaly/birth defect', isCorrect: true, order: 5 },
            { optionText: 'CTCAE Grade 2 or higher', isCorrect: false, order: 6 },
          ],
        },
        {
          questionText: 'A site reports a SAR to the Sponsor. The initial report is incomplete — laboratory values are missing. The correct action is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The 24-hour rule is: report first, complete later. Send the initial report within 24 hours with whatever is available. Follow-up reports with additional data can be submitted afterwards.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Submit the initial report within 24 hours and follow up with missing data later', isCorrect: true, order: 1 },
            { optionText: 'Wait until the complete report is available before submitting', isCorrect: false, order: 2 },
            { optionText: 'Notify the MHRA directly and bypass the Sponsor', isCorrect: false, order: 3 },
            { optionText: 'Only submit once the PI has provided a formal causality assessment', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A non-fatal SUSAR must be reported by the Sponsor to EudraVigilance within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Non-fatal, non-life-threatening SUSARs must be reported to EudraVigilance (and MHRA) within 15 calendar days of Sponsor awareness.',
          marks: 1, order: 4,
          options: [
            { optionText: '15 calendar days of Sponsor awareness', isCorrect: true, order: 1 },
            { optionText: '7 calendar days of Sponsor awareness', isCorrect: false, order: 2 },
            { optionText: '24 hours of Sponsor awareness', isCorrect: false, order: 3 },
            { optionText: '60 days of Sponsor awareness', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The 7-day SUSAR reporting clock starts from:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The clock starts from the date the Sponsor becomes aware of the minimum dataset (suspect drug, identifiable patient, identifiable reporter, suspected reaction) — Day 0 is Sponsor awareness, Day 1 is the next calendar day.',
          marks: 1, order: 5,
          options: [
            { optionText: 'The date the Sponsor becomes aware of the minimum SUSAR dataset', isCorrect: true, order: 1 },
            { optionText: 'The date the adverse event occurred at the site', isCorrect: false, order: 2 },
            { optionText: 'The date the completed SUSAR narrative is written', isCorrect: false, order: 3 },
            { optionText: 'The date the PI signs the SAE form', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An SAE narrative should be structured to answer five core questions. Select ALL five from the options below.',
          questionType: 'MULTI_SELECT',
          explanation: 'The five narrative questions: Who? (patient demographics/history), What? (event description), When? (timeline), How? (clinical course/outcome), Why? (causality assessment).',
          marks: 2, order: 6,
          options: [
            { optionText: 'Who is the patient?', isCorrect: true, order: 1 },
            { optionText: 'What happened?', isCorrect: true, order: 2 },
            { optionText: 'When did it occur?', isCorrect: true, order: 3 },
            { optionText: 'How did it progress and resolve?', isCorrect: true, order: 4 },
            { optionText: 'Why is causality assessed as it is?', isCorrect: true, order: 5 },
            { optionText: 'What is the batch number of every concomitant medicine?', isCorrect: false, order: 6 },
          ],
        },
        {
          questionText: 'MedDRA adverse event terms in ICSRs are coded at which hierarchical level?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICSRs use Preferred Terms (PTs) — the fourth level of the five-level MedDRA hierarchy. PTs are the primary coding unit for regulatory submissions and signal detection.',
          marks: 1, order: 7,
          options: [
            { optionText: 'Preferred Term (PT)', isCorrect: true, order: 1 },
            { optionText: 'System Organ Class (SOC)', isCorrect: false, order: 2 },
            { optionText: 'Lowest Level Term (LLT)', isCorrect: false, order: 3 },
            { optionText: 'High Level Group Term (HLGT)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In Case Study 1 (febrile neutropenia hospitalisation), the event was classified as an "Expected SAR" rather than a SUSAR because:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The event was serious (hospitalisation) and had suspected IMP causality — but Grade 3 neutropenia was listed in the IB RSI at 15% frequency, making it EXPECTED. Expected SARs do not meet the SUSAR definition.',
          marks: 1, order: 8,
          options: [
            { optionText: 'Grade 3 neutropenia was listed in the RSI — the event was expected', isCorrect: true, order: 1 },
            { optionText: 'The event was not serious enough to be a SUSAR', isCorrect: false, order: 2 },
            { optionText: 'There was no suspected causal relationship with the IMP', isCorrect: false, order: 3 },
            { optionText: 'The patient recovered fully within 5 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'EMA GVP Module VI covers:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'GVP Module VI covers "Collection, Management and Submission of Reports of Suspected ADRs" — the core operational pharmacovigilance module.',
          marks: 1, order: 9,
          options: [
            { optionText: 'Collection, Management and Submission of Reports of Suspected ADRs', isCorrect: true, order: 1 },
            { optionText: 'Periodic Safety Update Reports', isCorrect: false, order: 2 },
            { optionText: 'Signal Management', isCorrect: false, order: 3 },
            { optionText: 'Pharmacovigilance System Master File', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Post-Brexit, a MAH holding both UK and EU marketing authorisations must:',
          questionType: 'MULTI_SELECT',
          explanation: 'Post-Brexit dual obligations include: separate UK QPPV (UK resident) and EU QPPV (EU resident); separate ICSR submissions to MHRA and EudraVigilance; separate PSUR submissions to MHRA and EMA.',
          marks: 2, order: 10,
          options: [
            { optionText: 'Appoint a separate UK-resident QPPV for MHRA obligations', isCorrect: true, order: 1 },
            { optionText: 'Submit ICSRs separately to both MHRA and EudraVigilance', isCorrect: true, order: 2 },
            { optionText: 'Submit PSURs separately to MHRA and EMA', isCorrect: true, order: 3 },
            { optionText: 'Rely on a single EU QPPV to cover all UK obligations', isCorrect: false, order: 4 },
            { optionText: 'Submit only to MHRA and request MHRA forward data to EMA', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'A Serious Breach must be reported by the Sponsor to the MHRA with written notification within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach must be reported to the MHRA with written notification within 7 days of the Sponsor becoming aware.',
          marks: 1, order: 11,
          options: [
            { optionText: '7 calendar days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '15 calendar days of the Sponsor becoming aware', isCorrect: false, order: 2 },
            { optionText: '24 hours of the Sponsor becoming aware', isCorrect: false, order: 3 },
            { optionText: '30 calendar days of the Sponsor becoming aware', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In Case Study 3 (fatal SUSAR — acute liver failure), the Sponsor receives the initial SAE form on a Monday with missing lab values. The correct action is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'For a fatal SUSAR, the initial report must be submitted to MHRA/EV within 7 calendar days — regardless of completeness. Missing labs can follow in the Day-15 completed report. Do not wait for complete data.',
          marks: 1, order: 12,
          options: [
            { optionText: 'Submit the initial report to MHRA/EV by Day 7; submit the completed report by Day 15', isCorrect: true, order: 1 },
            { optionText: 'Wait for the complete report including lab values before submitting', isCorrect: false, order: 2 },
            { optionText: 'Submit the report within 15 days as lab values are missing', isCorrect: false, order: 3 },
            { optionText: 'Only submit when the post-mortem report is available', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'SUSAR line listings sent to investigators during a blinded clinical trial must be:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SUSAR line listings sent to investigators in a blinded trial must have treatment allocation removed (blinded) to preserve trial integrity — even though the Sponsor has unblinded internally to assess the event.',
          marks: 1, order: 13,
          options: [
            { optionText: 'Blinded — treatment allocation removed to preserve trial integrity', isCorrect: true, order: 1 },
            { optionText: 'Fully unblinded so investigators can assess their patients\' risk', isCorrect: false, order: 2 },
            { optionText: 'Withheld until the trial database is locked', isCorrect: false, order: 3 },
            { optionText: 'Submitted only to the DSMB — not to individual investigators', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The DSUR (Development Safety Update Report) is submitted within how many days of the data lock point?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The DSUR must be submitted within 60 days of the annual data lock point (the anniversary of the IND/CTA approval date).',
          marks: 1, order: 14,
          options: [
            { optionText: '60 days', isCorrect: true, order: 1 },
            { optionText: '30 days', isCorrect: false, order: 2 },
            { optionText: '90 days', isCorrect: false, order: 3 },
            { optionText: '15 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under the Windsor Framework (2023), Northern Ireland medicines for human use are regulated under:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Under the Windsor Framework, medicines for human use in Northern Ireland continue to be regulated under EU law (EMA/PRAC), not purely MHRA UK rules — creating potential three-track obligations for some MAHs.',
          marks: 1, order: 15,
          options: [
            { optionText: 'EU law via EMA/PRAC mechanisms', isCorrect: true, order: 1 },
            { optionText: 'Exclusively under MHRA UK regulations', isCorrect: false, order: 2 },
            { optionText: 'Irish HPRA regulations', isCorrect: false, order: 3 },
            { optionText: 'A transitional joint UK-EU framework', isCorrect: false, order: 4 },
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
  console.log('  SEEDING: Adverse Event Reporting — MHRA & EMA Requirements');
  console.log('  Course 05 | ADVANCED | Pharmacovigilance');
  console.log('  Content: HTML strings | Videos: YouTube placeholders');
  console.log('══════════════════════════════════════════════════════════════════\n');

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
      title: 'Adverse Event Reporting: MHRA & EMA Requirements',
      subtitle: 'Master SAE and SUSAR reporting timelines for UK and EU clinical trials',
      description: 'Advanced course covering the operational mechanics of adverse event and serious adverse event reporting under UK (MHRA) and EU (EMA) regulatory frameworks. Covers 7-day and 15-day SUSAR timelines, SAE narrative writing, EudraVigilance submissions, ICSR processing, and the complete post-Brexit dual reporting landscape.',
      learningObjectives: [
        'Apply the AE → SAE → SAR → SUSAR classification framework with precision',
        'Implement 7-day and 15-day SUSAR reporting timelines correctly in all scenarios',
        'Write compliant, well-structured Individual Case Safety Report (ICSR) narratives',
        'Submit ICSRs to EudraVigilance and understand the UK Yellow Card parallel pathway',
        'Navigate the post-Brexit dual reporting landscape for UK/EU authorised products and trials',
        'Apply MedDRA coding at the Preferred Term level for adverse event data',
      ],
      prerequisites: [
        'Introduction to Pharmacovigilance (Course 4) or equivalent knowledge',
        'Basic understanding of AE/ADR/SAE/SUSAR definitions',
        'Familiarity with UK and EU regulatory landscape',
      ],
      targetAudience: [
        'Drug Safety Associates and Pharmacovigilance Officers',
        'Clinical Research Associates (CRAs) reviewing and escalating AE/SAE data',
        'Regulatory Affairs professionals managing MHRA and EMA submissions',
        'Sponsor and CRO staff responsible for SUSAR reporting',
        'Medical Writers preparing SAE narratives and safety reports',
      ],
      durationHours: 5,
      difficultyLevel: 'ADVANCED',
      accreditation: 'MHRA & EMA Aligned | ICH E2A/E2B(R3)/E2C(R2) Aligned',
      price: 149.00,
      originalPrice: 199.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'SAE & SUSAR Reporting Course | MHRA & EMA Requirements | UK Clinical Trials',
      seoDescription: 'Advanced adverse event reporting course: SUSAR timelines (7-day, 15-day), SAE narratives, EudraVigilance submissions, post-Brexit dual reporting. MHRA & EMA aligned.',
      tags: ['SAE', 'SUSAR', 'EudraVigilance', 'MHRA', 'EMA', 'pharmacovigilance', 'ICSR', 'narrative', 'post-Brexit', 'DSUR', 'MedDRA', 'Yellow Card'],
    },
  });
  console.log('✅ Course metadata updated.\n');

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
          content: l.content,
          videoUrl: l.videoUrl || null,
          videoDurationMinutes: l.videoDurationMinutes || null,
          isPreview: l.isPreview,
          order: l.order,
          downloadableResources: null,
        },
      });
      totalLessons++;
    }

    if (modData.quiz) {
      const { questions, ...qMeta } = modData.quiz;
      const quiz = await prisma.quiz.create({
        data: {
          moduleId: module.id,
          title: qMeta.title,
          instructions: qMeta.instructions,
          passMarkPercentage: qMeta.passMarkPercentage,
          timeLimitMinutes: qMeta.timeLimitMinutes || null,
          maxAttempts: qMeta.maxAttempts,
          randomizeQuestions: qMeta.randomizeQuestions,
        },
      });
      for (const q of questions) {
        const { options, ...qData } = q;
        const question = await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            questionText: qData.questionText,
            questionType: qData.questionType,
            explanation: qData.explanation,
            marks: qData.marks,
            order: qData.order,
          },
        });
        for (const opt of options) {
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

    console.log(`✅ (${modData.lessons.length} lessons, ${modData.quiz?.questions?.length || 0} quiz Qs)`);
  }

  // Certificate template
  const cert = await prisma.certificateTemplate.findUnique({ where: { courseId: existing.id } });
  if (!cert) {
    await prisma.certificateTemplate.create({
      data: {
        courseId: existing.id,
        heading: 'Certificate of Completion',
        bodyText: 'This is to certify that the above-named learner has successfully completed "Adverse Event Reporting: MHRA & EMA Requirements" and demonstrated competency in all assessed learning outcomes.',
        signatureName: 'Dr. Sarah Mitchell',
        signatureTitle: 'Lead Clinical Research Trainer, Exon Sciences',
        logoUrl: 'https://exonsciences.com/assets/logo-dark.png',
      },
    });
    console.log('\n  🏅 Certificate template created.');
  }

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log('  ✨ SEED COMPLETE');
  console.log(`  Modules: ${MODULES.length} | Lessons: ${totalLessons} | Quiz Questions: ${totalQuestions}`);
  console.log('  Content: Rich HTML strings (rendered via dangerouslySetInnerHTML)');
  console.log('  Videos: YouTube placeholders (replace with own recordings)');
  console.log('  Preview: /courses/adverse-event-reporting-mhra-ema');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

main()
  .catch(e => { console.error('❌', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
