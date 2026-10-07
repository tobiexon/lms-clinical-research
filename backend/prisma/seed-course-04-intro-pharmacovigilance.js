/**
 * COURSE 04: Introduction to Pharmacovigilance
 * ─────────────────────────────────────────────
 * Content stored as HTML strings (rendered via dangerouslySetInnerHTML).
 * Videos: YouTube placeholder — replace with own recordings.
 * Run: node prisma/seed-course-04-intro-pharmacovigilance.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'introduction-to-pharmacovigilance';

const COURSE_VIDEO = 'https://www.youtube.com/watch?v=aGYMB4TkJYM';

const VIDEOS = {
  welcome:       COURSE_VIDEO,
  adrs:          COURSE_VIDEO,
  yellowCard:    COURSE_VIDEO,
  signals:       COURSE_VIDEO,
  riskMgmt:      COURSE_VIDEO,
  mhraReporting: COURSE_VIDEO,
  assessment:    COURSE_VIDEO,
};

// ─────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// ─────────────────────────────────────────────────────────

const CONTENT = {};

// ── MODULE 1, LESSON 1: Welcome ───────────────────────────
CONTENT.welcome = `
<h1>Welcome to Introduction to Pharmacovigilance</h1>
<p>Pharmacovigilance (PV) is the science and set of activities concerned with the detection, assessment, understanding, and prevention of adverse effects of medicines. It sits at the heart of drug safety — and everyone working in clinical trials, regulatory affairs, or post-market surveillance needs a working knowledge of it.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Clinical Research Associates (CRAs)</strong> and monitors who need to understand AE/ADR reporting in a broader context</li>
  <li><strong>Drug Safety Associates</strong> and pharmacovigilance professionals entering the field</li>
  <li><strong>Regulatory Affairs professionals</strong> managing post-marketing surveillance</li>
  <li><strong>Research Nurses, Study Co-ordinators</strong>, and anyone working in clinical trials who handles adverse event data</li>
  <li><strong>Healthcare professionals</strong> who want to understand their pharmacovigilance obligations</li>
</ul>

<h2>What You Will Achieve</h2>
<ol>
  <li>Distinguish between AEs, ADRs, SAEs, and SUSARs with confidence</li>
  <li>Understand the UK Yellow Card scheme and who can report to it</li>
  <li>Explain MHRA pharmacovigilance inspection requirements</li>
  <li>Apply signal detection principles and risk management concepts</li>
  <li>Navigate the post-Brexit UK pharmacovigilance reporting landscape</li>
</ol>

<blockquote>💡 <strong>Watch the video above</strong> for an introduction to pharmacovigilance and why it matters for patient safety.</blockquote>

<h2>Course Structure</h2>
<p>The course has 4 modules with rich lesson content and module quizzes, followed by a 15-question final assessment. Pass mark for all quizzes and the final assessment is <strong>70%</strong>. Your certificate is issued automatically on passing the final assessment.</p>

<div class="info-box">
  <div class="info-box-title">📌 Why Pharmacovigilance Matters</div>
  <p>Every year, adverse drug reactions (ADRs) account for approximately <strong>6.5% of all UK hospital admissions</strong>. Robust pharmacovigilance is what stands between patients and preventable harm from medicines.</p>
</div>
`;

// ── MODULE 1, LESSON 2: PV History & Key Definitions ─────
CONTENT.pvFoundations = `
<h1>Pharmacovigilance: History, Definitions &amp; the Drug Life Cycle</h1>
<p>Pharmacovigilance as a formal discipline emerged from a series of drug safety disasters that demonstrated the inadequacy of pre-market testing alone. Understanding this history — and how it connects to the drug development lifecycle — explains why modern PV systems are designed the way they are.</p>
<hr/>

<h2>The Drug Life Cycle &amp; Where Pharmacovigilance Fits</h2>
<p>Every investigational medicinal product passes through a defined development lifecycle before reaching patients. Pharmacovigilance begins in the clinical phases and intensifies dramatically after regulatory approval — this is the foundation of post-marketing surveillance (Phase 4).</p>
<table>
  <tr><th>Stage</th><th>What Happens</th><th>PV Relevance</th></tr>
  <tr><td><strong>Discovery</strong></td><td>Scientists identify a target and find a compound</td><td>Pre-clinical safety profiling begins</td></tr>
  <tr><td><strong>Preclinical</strong></td><td>Lab and animal studies confirm safety and pharmacology</td><td>Toxicology data informs the Investigator's Brochure (IB)</td></tr>
  <tr><td><strong>Clinical (Ph 1–3)</strong></td><td>Phased human trials — IND submitted before first-in-human dose</td><td>AE/SAE/SUSAR reporting; DSUR submitted annually to regulators</td></tr>
  <tr><td><strong>Regulatory Approval</strong></td><td>NDA/MAA submitted; marketing authorisation granted</td><td>Risk Management Plan (RMP) submitted with application</td></tr>
  <tr><td><strong>Post-Market Surveillance (Ph 4)</strong></td><td>Real-world use in millions of patients begins</td><td>Spontaneous ADR reporting (Yellow Card); PSUR; signal detection</td></tr>
</table>
<div class="info-box">
  <div class="info-box-title">📌 Who Does What?</div>
  <p>Pharma/Biotech companies own the Discovery and Preclinical stages. From Clinical trials onward, they often contract <strong>CROs (Contract Research Organisations)</strong> to manage operations. Pharmacovigilance obligations — during trials and post-marketing — remain with the <strong>Sponsor</strong> and the <strong>Marketing Authorisation Holder (MAH)</strong>.</p>
</div>
<hr/>

<h2>A Brief History of Pharmacovigilance</h2>
<table>
  <tr><th>Year</th><th>Event</th><th>Regulatory Response</th></tr>
  <tr><td><strong>1937</strong></td><td>Sulfanilamide tragedy (USA) — 107 deaths due to diethylene glycol solvent</td><td>US Federal Food, Drug &amp; Cosmetic Act 1938 — mandatory safety testing</td></tr>
  <tr><td><strong>1961</strong></td><td>Thalidomide disaster — thousands of babies born with limb defects worldwide</td><td>WHO International Drug Monitoring Programme launched (1968); stricter pre-market requirements globally</td></tr>
  <tr><td><strong>1964</strong></td><td>UK Yellow Card scheme established following thalidomide</td><td>First voluntary spontaneous reporting system in the world</td></tr>
  <tr><td><strong>2001</strong></td><td>EU Directive 2001/20/EC — first harmonised EU pharmacovigilance framework</td><td>EudraVigilance database established</td></tr>
  <tr><td><strong>2012</strong></td><td>EU Pharmacovigilance Legislation (Directive 2010/84/EU and Regulation 1235/2010) fully implemented</td><td>PRAC (Pharmacovigilance Risk Assessment Committee) established at EMA</td></tr>
  <tr><td><strong>2021</strong></td><td>UK leaves EU single medicines market (post-Brexit)</td><td>MHRA becomes independent regulator; UK Yellow Card runs parallel to EudraVigilance</td></tr>
</table>
<hr/>

<h2>Types of Events in Clinical Trials</h2>
<p>Understanding the full range of events that can occur in a clinical trial is the foundation of pharmacovigilance in a clinical research context. These include:</p>
<table>
  <tr><th>Event Type</th><th>Abbreviation</th></tr>
  <tr><td>Adverse Event</td><td>AE</td></tr>
  <tr><td>Serious Adverse Event</td><td>SAE</td></tr>
  <tr><td>Serious Adverse Reaction</td><td>SAR</td></tr>
  <tr><td>Suspected Unexpected Serious Adverse Reaction</td><td>SUSAR</td></tr>
  <tr><td>Adverse Event of Special Interest</td><td>AESI</td></tr>
  <tr><td>Serious Breach</td><td>—</td></tr>
  <tr><td>Pregnancy</td><td>—</td></tr>
  <tr><td>Protocol Deviation</td><td>PD</td></tr>
  <tr><td>Noncompliance</td><td>NC</td></tr>
</table>
<p>Each of these events has specific definitions, reporting obligations, and timelines. The following lessons cover each in detail.</p>
<hr/>

<h2>Key Definitions</h2>
<p>These definitions are foundational. You must know them precisely because the reporting obligations, timelines, and processes differ between each category.</p>

<h3>Adverse Event (AE)</h3>
<p>An adverse event (AE) is <strong>any untoward medical occurrence in a patient or clinical investigation subject administered a pharmaceutical product and which does not necessarily have a causal relationship with this treatment.</strong></p>
<p>An adverse event can therefore be any <strong>unfavourable and unintended sign</strong> (including an abnormal laboratory finding), symptom, or disease temporally associated with the use of a medicinal (investigational) product, <strong>whether or not related</strong> to the medicinal (investigational) product.</p>
<div class="info-box">
  <div class="info-box-title">📌 Key Point</div>
  <p>An AE is defined by time association, not by causality. If an event occurs during treatment — even if it is clearly unrelated to the IMP — it must be recorded as an AE. Causality is assessed separately.</p>
</div>
<p>AEs must be reported to the Sponsor via eCRF and are included as part of the <strong>Annual Progress Report sent to the Ethics Committee (EC)</strong>.</p>

<h3>Adverse Drug Reaction (ADR)</h3>
<p>A response to a medicinal product which is <strong>noxious and unintended</strong> and which occurs at doses normally used in humans. The critical difference from an AE: an ADR has an established causal relationship with the medicine.</p>
<p>ADRs are the primary focus of post-marketing pharmacovigilance. Under EU/UK legislation, any dose — including overdose, misuse, abuse, or occupational exposure — counts, not just "normal doses".</p>

<h3>Serious Adverse Event (SAE)</h3>
<p>A serious adverse event or reaction is an untoward medical occurrence that is considered to represent a <strong>significant hazard to the patient</strong>. This includes events that result in:</p>
<ol>
  <li><strong>Death</strong></li>
  <li><strong>Life-threatening</strong> (immediately)</li>
  <li><strong>Overnight hospitalisation</strong> (initial or prolonged)</li>
  <li><strong>Significant loss of function or disability</strong></li>
  <li><strong>Congenital malformation/birth defect</strong></li>
  <li><strong>Other medically important event</strong>*</li>
</ol>
<p>* Certain adverse events may not necessarily belong to any of these classifications but are still considered medically significant/important and should be considered serious (i.e. <strong>all malignancies and pregnancy</strong>).</p>

<h3>Serious Adverse Reaction (SAR)</h3>
<p>An SAE with a <strong>certain degree of probability that the causality is the IMP</strong>, regardless of the administered dose. Key rules:</p>
<ul>
  <li>Must be reported within <strong>24 hours</strong> of the PI/site being aware of it</li>
  <li>Normally reported via eCRF or a special SAE/SAR form</li>
  <li>The initial report does <strong>not</strong> need to be complete before reporting — follow-up information can be provided later</li>
  <li>Must be followed up until <strong>closure</strong></li>
</ul>

<h3>SUSAR — Suspected Unexpected Serious Adverse Reaction</h3>
<p>A SUSAR is the term used to refer to an adverse event that occurs in a clinical trial subject, which is assessed by the sponsor and/or study investigator as being <strong>unexpected, serious, and as having a reasonable possibility of a causal relationship with the study drug</strong>.</p>
<p>The reporting timelines to EudraVigilance / MHRA are:</p>
<table>
  <tr><th>SUSAR Type</th><th>Reporting Timeline</th></tr>
  <tr><td>Fatal or life-threatening SUSAR</td><td>As soon as possible, <strong>no later than 7 days</strong> after sponsor awareness; completed report within additional <strong>8 days</strong></td></tr>
  <tr><td>Non-fatal or non-life-threatening SUSAR</td><td>As soon as possible, <strong>no later than 15 days</strong> after sponsor awareness</td></tr>
  <tr><td>Initially non-fatal/non-life-threatening, later found fatal or life-threatening</td><td>As soon as possible, <strong>no later than 7 days</strong> after sponsor becomes aware of the change in status</td></tr>
</table>

<h3>Adverse Event of Special Interest (AESI)</h3>
<p>An adverse event of special interest (AESI) (serious or nonserious) is one of <strong>scientific and medical concern specific to the sponsor's product or programme</strong>, for which ongoing monitoring and rapid communication by the investigator to the sponsor could be appropriate. It may have a special form for reporting, or be reported via eCRF.</p>

<h3>Serious Breach</h3>
<p>A breach that is likely to affect to a significant degree:</p>
<ul>
  <li>The <strong>safety or physical integrity</strong> of the participants</li>
  <li>Or the <strong>mental integrity</strong> of the participants</li>
  <li>Or the <strong>scientific value</strong> of the trial</li>
</ul>
<p>The breach must be reported with a <strong>written notification within 7 days</strong> of the Sponsor becoming aware of the breach.</p>

<h3>Pregnancy in a Clinical Trial</h3>
<p>Pregnancy is usually an <strong>exclusion criterion</strong> in clinical trials. Key rules:</p>
<ul>
  <li>Effective contraception is required as per protocol, with regular testing</li>
  <li>Pregnancy itself is <strong>NOT classified as an SAE</strong> — it is reported using a special pregnancy form</li>
  <li>Conditions arising <em>during</em> a pregnancy (e.g. pre-eclampsia) can be classified as AE or SAE</li>
  <li>The PI must follow up the pregnancy <strong>until birth and into the baby's infancy</strong></li>
</ul>

<hr/>
<h2>The Pharmacovigilance Ecosystem</h2>
<table>
  <tr><th>Organisation</th><th>Role</th></tr>
  <tr><td><strong>MHRA</strong> (UK)</td><td>UK national competent authority; operates the Yellow Card scheme; conducts PV inspections</td></tr>
  <tr><td><strong>EMA</strong> (EU)</td><td>Coordinates EU PV; PRAC committee; operates EudraVigilance database</td></tr>
  <tr><td><strong>WHO</strong></td><td>Global PV via the Uppsala Monitoring Centre (UMC); operates VigiBase</td></tr>
  <tr><td><strong>FDA</strong> (USA)</td><td>MedWatch reporting; FAERS (FDA Adverse Event Reporting System) database</td></tr>
  <tr><td><strong>MAH</strong></td><td>Marketing Authorisation Holder — primary legal obligation for post-marketing PV</td></tr>
  <tr><td><strong>Sponsors</strong></td><td>Responsible for PV during clinical trials; submit SUSAR and annual safety reports</td></tr>
</table>
`;

// ── MODULE 2, LESSON 1: AE/ADR Classification ─────────────
CONTENT.aeClassification = `
<h1>Classifying Adverse Drug Reactions</h1>
<p>Not all ADRs are equal. Understanding how to classify adverse reactions by mechanism, severity, and expectedness is essential for correct reporting and signal detection. There are several classification frameworks used in pharmacovigilance — you need to know all of them.</p>
<hr/>

<h2>1. The ABC(DE) Classification — Mechanism-Based</h2>
<p>The most widely used mechanistic classification divides ADRs into types based on their pharmacological basis:</p>
<table>
  <tr><th>Type</th><th>Name</th><th>Description</th><th>Example</th></tr>
  <tr><td><strong>Type A</strong></td><td>Augmented</td><td>Predictable from the pharmacology of the drug; dose-dependent; most common type (~80% of all ADRs)</td><td>Bleeding with warfarin; hypoglycaemia with insulin</td></tr>
  <tr><td><strong>Type B</strong></td><td>Bizarre</td><td>NOT predictable from pharmacology; idiosyncratic; dose-independent; less common but more serious</td><td>Penicillin anaphylaxis; halothane hepatitis</td></tr>
  <tr><td><strong>Type C</strong></td><td>Chronic/Continuous</td><td>Occurs with long-term use; related to cumulative dose or duration</td><td>Adrenal suppression with long-term corticosteroids; tardive dyskinesia with antipsychotics</td></tr>
  <tr><td><strong>Type D</strong></td><td>Delayed</td><td>Occurs after a long latency period; may appear after treatment ends</td><td>Carcinogenesis; teratogenesis (e.g. thalidomide)</td></tr>
  <tr><td><strong>Type E</strong></td><td>End-of-use</td><td>Withdrawal reactions when a drug is stopped suddenly</td><td>Beta-blocker withdrawal; opioid withdrawal syndrome</td></tr>
  <tr><td><strong>Type F</strong></td><td>Failure</td><td>Unexpected failure of therapy; often dose-related or due to drug interactions</td><td>Contraceptive failure due to enzyme-inducing drugs</td></tr>
</table>
<div class="key-points">
  <div class="key-points-title">✅ Key Point</div>
  <p>Type A reactions are dose-dependent and pharmacologically predictable. They are usually manageable by dose reduction. Type B reactions are idiosyncratic and cannot be predicted — they often require drug withdrawal.</p>
</div>
<hr/>

<h2>2. Severity Classification</h2>
<p>ADR severity is classified on a three-level scale (distinct from the CTCAE 5-point grading used in clinical trials):</p>
<table>
  <tr><th>Severity</th><th>Definition</th></tr>
  <tr><td><strong>Mild</strong></td><td>Signs and symptoms are easily tolerated; do not interfere with daily activities; usually transient and resolve without treatment</td></tr>
  <tr><td><strong>Moderate</strong></td><td>Sufficient discomfort to interfere with daily activities; may require treatment; not life-threatening</td></tr>
  <tr><td><strong>Severe</strong></td><td>Life-threatening; requires immediate medical attention; may cause persistent disability or death</td></tr>
</table>
<p>Note: <strong>Severity ≠ Seriousness</strong>. A "severe" ADR is not necessarily "serious" — a severe headache is severe in intensity but may not meet SAE criteria.</p>
<hr/>

<h2>3. Causality Assessment</h2>
<p>Causality assessment determines how likely a medicine is to have caused a reported event. Multiple tools exist; the most widely used in the UK is the <strong>WHO-UMC Causality Categories</strong>:</p>
<table>
  <tr><th>Category</th><th>Criteria Summary</th></tr>
  <tr><td><strong>Certain</strong></td><td>Plausible time relationship; cannot be explained by disease or other drugs; confirmed on rechallenge</td></tr>
  <tr><td><strong>Probable/Likely</strong></td><td>Plausible time relationship; unlikely to be disease/other drugs; dechallenge response present; rechallenge not required</td></tr>
  <tr><td><strong>Possible</strong></td><td>Plausible time relationship; could be disease or other drugs; information on dechallenge absent or unclear</td></tr>
  <tr><td><strong>Unlikely</strong></td><td>Temporal relationship is improbable; other drugs/disease provide a plausible explanation</td></tr>
  <tr><td><strong>Conditional/Unclassified</strong></td><td>More data needed; or data cannot be assessed due to conflicting information</td></tr>
  <tr><td><strong>Unassessable/Unclassifiable</strong></td><td>Insufficient or contradictory information that cannot be supplemented</td></tr>
</table>

<p>The <strong>Naranjo Algorithm</strong> is another widely-used tool — a 10-question scoring system that yields a probability score from &lt;1 (doubtful) to &gt;9 (definite).</p>
<hr/>

<h2>4. Expectedness Assessment</h2>
<p>In clinical trials, expectedness is assessed against the <strong>Reference Safety Information (RSI)</strong> in the Investigator's Brochure (IB). In post-marketing, it is assessed against the <strong>Summary of Product Characteristics (SmPC)</strong>.</p>
<ul>
  <li><strong>Expected</strong>: The reaction is listed in the RSI/SmPC, and its nature, severity, and outcome are consistent with what is described</li>
  <li><strong>Unexpected</strong>: Not listed; or listed but occurs at a higher frequency, greater severity, or with a different outcome than described</li>
</ul>
`;

// ── MODULE 2, LESSON 2: CTCAE Grading, ALCOA-CCEA & Reporting ────
CONTENT.ctcaeReporting = `
<h1>CTCAE Grading, ALCOA-CCEA &amp; AE Reporting in Clinical Trials</h1>
<p>Adverse event reporting is governed by strict timelines and rules during clinical trials. Getting the grading right — and understanding data integrity requirements — protects patients, satisfies regulators, and protects the integrity of trial data.</p>
<hr/>

<h2>CTCAE Grading System</h2>
<p>The <strong>Common Terminology Criteria for Adverse Events (CTCAE)</strong>, published by the NCI (National Cancer Institute), is the standard grading system used in clinical trials globally. Current version: <strong>CTCAE v5.0</strong>.</p>
<table>
  <tr><th>Grade</th><th>Severity</th><th>Clinical Description</th></tr>
  <tr><td><strong>1</strong></td><td>Mild</td><td>Asymptomatic symptoms; clinical or diagnostic observations only; intervention not indicated</td></tr>
  <tr><td><strong>2</strong></td><td>Moderate</td><td>Minimal, local, or non-invasive intervention was needed</td></tr>
  <tr><td><strong>3</strong></td><td>Severe</td><td>Severe symptoms or medically significant but not life-threatening; may be disabling or <strong>limit self-care in Activities of Daily Living (ADL)</strong></td></tr>
  <tr><td><strong>4</strong></td><td>Life-Threatening</td><td>Urgent or emergent intervention needed</td></tr>
  <tr><td><strong>5</strong></td><td>Death</td><td>Death related to or due to adverse event</td></tr>
</table>
<div class="info-box">
  <div class="info-box-title">📌 Note on Severity vs Seriousness</div>
  <p>A <strong>severe</strong> AE (Grade 3) is not automatically <strong>serious</strong>. "Severity" describes intensity; "seriousness" is a regulatory classification based on the 6 SAE criteria. A severe headache is Grade 3 in intensity but may not meet any SAE criteria.</p>
</div>
<hr/>

<h2>SAE Reporting Timeline (Site to Sponsor)</h2>
<p>All SARs must be reported to the Sponsor within <strong>24 hours</strong> of the PI/site being aware of the event. Key rules:</p>
<ul>
  <li>The initial report does <strong>not</strong> need to be complete before reporting — follow-up information can be provided later</li>
  <li>Normally reported via eCRF or a special SAE/SAR form</li>
  <li>All SAEs/SARs must be followed up until <strong>closure</strong> (resolution or stabilisation)</li>
  <li>AEs are part of the <strong>Annual Progress Report sent to the Ethics Committee (EC)</strong></li>
</ul>

<h2>SUSAR Reporting Timelines (Sponsor to MHRA/EudraVigilance)</h2>
<table>
  <tr><th>SUSAR Type</th><th>Reporting Timeline</th></tr>
  <tr><td>Fatal or life-threatening SUSAR</td><td>As soon as possible, <strong>no later than 7 days</strong> after sponsor awareness; completed report within additional <strong>8 days</strong></td></tr>
  <tr><td>Non-fatal, non-life-threatening SUSAR</td><td>As soon as possible, <strong>no later than 15 days</strong> after sponsor awareness</td></tr>
  <tr><td>Initially non-fatal/non-life-threatening, later found fatal or life-threatening</td><td>As soon as possible, <strong>no later than 7 days</strong> after sponsor becomes aware of the change in status</td></tr>
</table>
<p>In the UK (post-Brexit), SUSARs from UK trials are submitted to the <strong>MHRA</strong>. Sponsors running EU trials also report to <strong>EudraVigilance</strong>. These are now independent reporting pathways.</p>

<hr/>
<h2>ALCOA-CCEA — The Data Integrity Framework</h2>
<p>All pharmacovigilance data — whether collected in clinical trials or post-marketing — must meet the ALCOA-CCEA data integrity standard. This framework defines the nine attributes that all clinical trial data must satisfy:</p>
<table>
  <tr><th>Letter</th><th>Attribute</th><th>What It Means</th></tr>
  <tr><td><strong>A</strong></td><td>Attributable</td><td>It must be clear who recorded or changed data, and when</td></tr>
  <tr><td><strong>L</strong></td><td>Legible</td><td>Data must be readable — permanently — by humans</td></tr>
  <tr><td><strong>C</strong></td><td>Contemporaneous</td><td>Data must be recorded at the time the observation was made</td></tr>
  <tr><td><strong>O</strong></td><td>Original</td><td>First recorded data is the source — copies must be verified against the original</td></tr>
  <tr><td><strong>A</strong></td><td>Accurate</td><td>Data must reflect the actual observation or measurement exactly</td></tr>
  <tr><td><strong>C</strong></td><td>Complete</td><td>All required data fields must be recorded — no gaps without explanation</td></tr>
  <tr><td><strong>C</strong></td><td>Consistent</td><td>Data must be internally consistent across all documents (e.g. same date on source and EDC)</td></tr>
  <tr><td><strong>E</strong></td><td>Enduring</td><td>Records must be maintained and retrievable for the required retention period</td></tr>
  <tr><td><strong>A</strong></td><td>Available</td><td>Data must be accessible and retrievable for review, audit, or inspection when needed</td></tr>
</table>

<h3>Correcting Errors in Paper Records — ALCOA-Compliant Method</h3>
<p>In paper source documents, errors must be corrected using the ALCOA-compliant method:</p>
<ol>
  <li>Draw a <strong>single strikethrough</strong> through the incorrect entry — do <strong>NOT</strong> use correction fluid (Tipp-Ex) or obliterate the original</li>
  <li>Write the correct entry nearby</li>
  <li>Add the <strong>date</strong> of correction</li>
  <li>Add the <strong>initials</strong> of the person making the correction</li>
  <li>Add a brief <strong>reason</strong> for the correction (e.g. "transcription error", "incorrect date")</li>
</ol>
<div class="info-box">
  <div class="info-box-title">📌 Documentation Golden Rule</div>
  <p>In clinical trials: <strong>IF not documented = Not Done.</strong> This applies equally to pharmacovigilance records — every AE, SAE, and safety action must be documented contemporaneously to be valid.</p>
</div>

<hr/>
<h2>Development Safety Update Report (DSUR)</h2>
<p>The <strong>DSUR</strong> (Development Safety Update Report) is the annual safety report for investigational products, submitted by the Sponsor to regulatory authorities.</p>
<div class="key-points">
  <div class="key-points-title">✅ DSUR vs PSUR vs ASR — Know the Difference</div>
  <ul>
    <li><strong>DSUR</strong> — Development Safety Update Report: for <em>investigational products</em> during clinical trials (annual, submitted to MHRA/regulators)</li>
    <li><strong>PSUR/PBRER</strong> — Periodic Safety Update Report / Periodic Benefit-Risk Evaluation Report: for <em>authorised medicines</em> in post-marketing</li>
    <li><strong>ASR</strong> — Annual Safety Report: submitted to the Ethics Committee (EC) during a trial; includes AE/SAE summary</li>
  </ul>
</div>
`;

// ── MODULE 3, LESSON 1: UK Yellow Card Scheme ─────────────
CONTENT.yellowCard = `
<h1>The UK Yellow Card Scheme</h1>
<p>The Yellow Card scheme is the UK's national pharmacovigilance system — the primary mechanism through which suspected adverse drug reactions are reported to the MHRA. Established in <strong>1964</strong> in the aftermath of the thalidomide tragedy, it was the world's first voluntary spontaneous reporting system and remains central to UK drug safety surveillance.</p>
<hr/>

<h2>What Is the Yellow Card Scheme?</h2>
<p>The scheme allows healthcare professionals, patients, carers, and the pharmaceutical industry to report <strong>suspected ADRs</strong> directly to the MHRA. Reports are collected in the <strong>Yellow Card database</strong>, which feeds into the MHRA's signal detection activities and contributes to international pharmacovigilance via the <strong>WHO VigiBase</strong> programme.</p>

<h2>Who Can Report?</h2>
<p>One of the scheme's greatest strengths is its inclusivity — reporting is open to:</p>
<ul>
  <li><strong>Healthcare professionals</strong>: Doctors, dentists, pharmacists, nurses, midwives, allied health professionals</li>
  <li><strong>Patients and carers</strong>: Any member of the public can report their own, or a patient's, suspected ADR</li>
  <li><strong>Marketing Authorisation Holders (MAHs)</strong>: Pharmaceutical companies are required by law to report to the Yellow Card scheme as part of their PV obligations</li>
  <li><strong>Clinical trial sponsors</strong>: For SUSARs and other safety events from UK clinical trials</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 UK vs EU Reporting</div>
  <p>Post-Brexit, the UK and EU run separate pharmacovigilance reporting systems. UK Yellow Card reports go to the <strong>MHRA</strong>; EU reports go to <strong>EudraVigilance</strong> (managed by EMA). MAHs running medicines approved in both markets have reporting obligations to <strong>both</strong> systems.</p>
</div>
<hr/>

<h2>What to Report</h2>
<p>The MHRA operates a <strong>"report anything suspicious"</strong> philosophy — reporters are not expected to be certain of causality before submitting. The scheme specifically requests:</p>

<h3>Healthcare Professionals: Report ALL suspected ADRs to:</h3>
<ul>
  <li><strong>Black triangle medicines</strong> (▼) — newer medicines under additional monitoring</li>
  <li>Vaccines — all suspected reactions</li>
  <li><strong>All serious suspected ADRs</strong> to any established medicine</li>
</ul>

<h3>Patients and Carers: Report ANY suspected ADR</h3>
<p>Patients are encouraged to report any side effect they suspect — regardless of whether the medicine is prescription or OTC. Patient reports often detect ADRs not captured through healthcare professional reports, particularly effects on quality of life and mental health.</p>

<h2>What Makes a Good Yellow Card Report?</h2>
<p>A useful report contains:</p>
<ol>
  <li><strong>Reporter information</strong>: Name and contact details (healthcare professional or patient)</li>
  <li><strong>Patient information</strong>: Age, sex, weight (no identifying information is shared)</li>
  <li><strong>Suspected medicine</strong>: Brand name, batch number if known, dose, route, start/stop dates</li>
  <li><strong>Suspected reaction</strong>: Description, onset date, outcome, severity</li>
  <li><strong>Concomitant medicines</strong>: All other medicines the patient is taking</li>
  <li><strong>Medical history</strong>: Relevant past conditions and allergies</li>
</ol>

<h2>Black Triangle Medicines (▼)</h2>
<p>Medicines with a black inverted triangle symbol are <strong>under additional monitoring</strong> — typically because they are new to the market or have conditional approval. For these medicines:</p>
<ul>
  <li>Healthcare professionals are asked to report <strong>ALL suspected ADRs</strong>, including non-serious ones</li>
  <li>The black triangle status is reviewed periodically and removed when the safety profile is established</li>
  <li>Patients should look for the symbol in the Patient Information Leaflet (PIL)</li>
</ul>

<h2>The Yellow Card Report in Practice</h2>
<p>Reports can be submitted via:</p>
<ul>
  <li><strong>Online</strong>: yellowcard.mhra.gov.uk</li>
  <li><strong>Mobile app</strong>: Yellow Card app</li>
  <li><strong>Paper form</strong>: Available in the British National Formulary (BNF)</li>
  <li><strong>E-mail</strong>: For industry reporters via established channels</li>
</ul>
<div class="key-points">
  <div class="key-points-title">✅ Under-reporting — The Iceberg Effect</div>
  <p>Spontaneous reporting systems like Yellow Card capture only a fraction of actual ADRs. Studies suggest only <strong>6–10% of serious ADRs</strong> in the UK are reported to the Yellow Card scheme. This is the "iceberg effect" — the reported data is just the visible tip. Signal detection methods are designed to account for this inherent under-reporting.</p>
</div>
`;

// ── MODULE 3, LESSON 2: Post-Marketing Pharmacovigilance ──
CONTENT.postMarketing = `
<h1>Post-Marketing Pharmacovigilance &amp; MHRA Reporting Requirements</h1>
<p>When a medicine receives marketing authorisation (MA), the pre-market safety data from clinical trials is, by definition, limited in scope — typically derived from a few thousand patients in controlled settings. Post-marketing pharmacovigilance bridges the gap between this controlled evidence and real-world use in millions of diverse patients.</p>
<hr/>

<h2>The Risk Management Plan (RMP)</h2>
<p>The <strong>Risk Management Plan (RMP)</strong> is a core document required for all new marketing authorisations in the UK. It describes:</p>
<ul>
  <li>The <strong>safety profile</strong> of the medicine and what is known/unknown at time of approval</li>
  <li><strong>Pharmacovigilance activities</strong> — both routine and additional — to characterise risks</li>
  <li><strong>Risk minimisation measures</strong> — routine (SmPC, PIL) and additional (educational materials, patient cards, restricted access programmes)</li>
</ul>

<h3>Components of an RMP</h3>
<table>
  <tr><th>Part</th><th>Content</th></tr>
  <tr><td><strong>Part I</strong></td><td>Product overview (indication, population, pharmaceutical form)</td></tr>
  <tr><td><strong>Part II</strong></td><td>Safety specification — identified risks, potential risks, missing information</td></tr>
  <tr><td><strong>Part III</strong></td><td>Pharmacovigilance plan — all ongoing/planned studies to address safety gaps</td></tr>
  <tr><td><strong>Part IV</strong></td><td>Plans for post-authorisation efficacy studies (PAES) if required</td></tr>
  <tr><td><strong>Part V</strong></td><td>Risk minimisation measures — what measures will minimise each identified risk</td></tr>
  <tr><td><strong>Part VI</strong></td><td>Summary of the RMP</td></tr>
</table>
<hr/>

<h2>Periodic Safety Update Report (PSUR / PBRER)</h2>
<p>The <strong>PSUR</strong> (Periodic Safety Update Report) — also known as the PBRER (Periodic Benefit-Risk Evaluation Report) per ICH E2C(R2) — is the primary post-marketing safety report submitted by MAHs.</p>
<ul>
  <li>Provides a comprehensive assessment of the <strong>benefit-risk balance</strong> of the medicine at the time of submission</li>
  <li>Submitted at defined intervals set by the marketing authorisation (typically annually for the first 2 years, then every 3 years)</li>
  <li>In the UK, PSURs are submitted to the <strong>MHRA</strong>; in the EU, to the <strong>EMA</strong></li>
  <li>Post-Brexit: UK may require separate PSUR submissions to the MHRA on different timelines to EU</li>
</ul>
<hr/>

<h2>MHRA Pharmacovigilance Inspections</h2>
<p>The MHRA conducts routine and triggered pharmacovigilance inspections to verify that MAHs and clinical trial Sponsors are complying with their PV obligations. Inspections can be:</p>
<table>
  <tr><th>Type</th><th>Trigger</th></tr>
  <tr><td><strong>Routine</strong></td><td>Scheduled at regular intervals for MAHs; typically every 2–4 years</td></tr>
  <tr><td><strong>Triggered</strong></td><td>Following a safety signal, serious breach, whistleblower complaint, or risk-based selection</td></tr>
  <tr><td><strong>Announced</strong></td><td>MHRA gives advance notice (most common)</td></tr>
  <tr><td><strong>Unannounced</strong></td><td>Given little or no advance notice in serious cases</td></tr>
</table>

<h3>What Inspectors Assess</h3>
<ul>
  <li>The <strong>Pharmacovigilance System Master File (PSMF)</strong></li>
  <li>Qualified Person for Pharmacovigilance (QPPV) appointment and responsibilities</li>
  <li>Spontaneous reporting processes and timelines (Yellow Card compliance)</li>
  <li>Literature monitoring procedures</li>
  <li>Signal detection and management</li>
  <li>PSUR preparation and submission</li>
  <li>Risk management plan implementation</li>
  <li>Staff training records</li>
</ul>

<h3>Pharmacovigilance System Master File (PSMF)</h3>
<p>The PSMF is the <strong>reference document describing the PV system</strong> of the MAH. It must be kept up to date and be available for inspection at all times. It includes:</p>
<ul>
  <li>Contact details of the QPPV (Qualified Person for Pharmacovigilance)</li>
  <li>List of medicinal products covered by the system</li>
  <li>Organisational structure of the PV department</li>
  <li>Data sources used for safety monitoring</li>
  <li>Computer systems used in PV operations</li>
  <li>PV SOPs (Standard Operating Procedures)</li>
  <li>List of ongoing post-authorisation studies</li>
  <li>Audit history</li>
</ul>

<h2>The Qualified Person for Pharmacovigilance (QPPV)</h2>
<p>Every MAH in the UK must designate a <strong>Qualified Person for Pharmacovigilance (QPPV)</strong> — a named individual who is responsible for the establishment and maintenance of the pharmacovigilance system. The QPPV:</p>
<ul>
  <li>Must be a resident in the UK (EU QPPV must be resident in the EU — separate roles post-Brexit)</li>
  <li>Is the single point of contact with the MHRA for PV matters</li>
  <li>Has overall responsibility for PV system oversight</li>
  <li>Must have the knowledge, expertise, and authority to fulfil their responsibilities</li>
  <li>Is personally accountable for any deficiencies in the PV system</li>
</ul>
`;

// ── MODULE 4, LESSON 1: Signal Detection ─────────────────
CONTENT.signalDetection = `
<h1>Signal Detection in Pharmacovigilance</h1>
<p>Signal detection is the process of identifying new or changing safety information in pharmacovigilance data that may warrant further investigation. It is one of the most intellectually challenging and critically important aspects of post-marketing pharmacovigilance.</p>
<hr/>

<h2>What Is a Signal?</h2>
<p>A pharmacovigilance signal is defined as: <strong>"Information that arises from one or multiple sources, including observations and experiments, which suggests a new potentially causal association, or a new aspect of a known association, between an intervention and an event or a set of related events, either adverse or beneficial, that is judged to be of sufficient likelihood to justify verificatory action."</strong></p>
<p>In simpler terms: a signal is a suspicion — based on data — that a medicine may cause a harm not previously known or fully characterised.</p>

<hr/>

<h2>Data Sources for Signal Detection</h2>
<p>Signals can emerge from multiple sources. Good pharmacovigilance practice requires monitoring all of them:</p>
<table>
  <tr><th>Source</th><th>Examples</th></tr>
  <tr><td><strong>Spontaneous reporting databases</strong></td><td>MHRA Yellow Card, EudraVigilance (EVPM), WHO VigiBase, FDA FAERS</td></tr>
  <tr><td><strong>Literature monitoring</strong></td><td>Systematic review of published medical/scientific literature (mandatory for MAHs)</td></tr>
  <tr><td><strong>Clinical trials</strong></td><td>SUSARs, DSUR findings, trial data packages</td></tr>
  <tr><td><strong>Post-authorisation safety studies (PASS)</strong></td><td>Observational studies, registries, epidemiological studies</td></tr>
  <tr><td><strong>Scientific/medical enquiries</strong></td><td>Requests from healthcare professionals, medical information teams</td></tr>
  <tr><td><strong>Social media and digital sources</strong></td><td>Patient forums, social media (increasing use, complex to validate)</td></tr>
</table>

<hr/>

<h2>Quantitative Signal Detection Methods</h2>
<p>Spontaneous reporting databases use statistical methods to detect signals by identifying medicine-event combinations that occur more frequently than expected by chance.</p>

<h3>Disproportionality Analysis</h3>
<p>The core concept: compare the proportion of reports for a specific drug-event pair in the database against what would be expected if there were no relationship. Two main measures are used:</p>

<table>
  <tr><th>Method</th><th>Name</th><th>Used By</th></tr>
  <tr><td><strong>PRR</strong></td><td>Proportional Reporting Ratio</td><td>MHRA (Yellow Card)</td></tr>
  <tr><td><strong>ROR</strong></td><td>Reporting Odds Ratio</td><td>Various national regulatory agencies</td></tr>
  <tr><td><strong>BCPNN</strong></td><td>Bayesian Confidence Propagation Neural Network (Information Component, IC)</td><td>WHO Uppsala Monitoring Centre (VigiBase)</td></tr>
  <tr><td><strong>MGPS</strong></td><td>Multi-item Gamma Poisson Shrinker (Empirical Bayes Geometric Mean, EBGM)</td><td>FDA FAERS</td></tr>
</table>

<p>These are <strong>screening tools</strong>, not causal proof. A disproportionality signal triggers further clinical evaluation — not automatic regulatory action.</p>

<hr/>

<h2>Signal Evaluation and Prioritisation</h2>
<p>When a potential signal is detected, it is evaluated to determine:</p>
<ol>
  <li><strong>Validate</strong>: Is the signal supported by credible data? (Check for duplicates, confounding, data quality)</li>
  <li><strong>Assess clinical importance</strong>: What is the public health impact? What is the severity and frequency?</li>
  <li><strong>Biological plausibility</strong>: Is there a plausible mechanism? Is it consistent with the drug's pharmacology?</li>
  <li><strong>Consistency</strong>: Is the signal seen in multiple data sources (spontaneous reports, literature, trial data)?</li>
  <li><strong>Temporal relationship</strong>: Does the time between drug exposure and onset make biological sense?</li>
  <li><strong>Dechallenge/Rechallenge</strong>: Does the reaction resolve on stopping the drug? Does it recur on restarting?</li>
</ol>

<hr/>

<h2>Signal Outcomes — Regulatory Actions</h2>
<p>After evaluation, a signal can result in:</p>
<ul>
  <li><strong>No action</strong>: Signal not confirmed; monitoring continues</li>
  <li><strong>SmPC/PIL update</strong>: Addition of new warning, precaution, or contraindication</li>
  <li><strong>DHPC (Direct Healthcare Professional Communication)</strong>: "Dear Doctor" or "Dear Pharmacist" letter sent urgently to healthcare professionals</li>
  <li><strong>Additional risk minimisation</strong>: Controlled access programme, patient alert card, educational material</li>
  <li><strong>Restriction of indication</strong>: Narrowing of the authorised use</li>
  <li><strong>Suspension or withdrawal</strong>: Marketing authorisation suspended or revoked (most severe)</li>
</ul>

<div class="warning-box">
  <p>⚠️ <strong>Real-World Example</strong>: Rofecoxib (Vioxx) was voluntarily withdrawn worldwide in 2004 after post-marketing surveillance data showed a significant increase in the risk of myocardial infarction and stroke. The signal had been detectable in pre-market data but was not acted upon — a landmark case in pharmacovigilance history.</p>
</div>
`;

// ── MODULE 4, LESSON 2: Risk Management & Post-Brexit ────
CONTENT.riskManagement = `
<h1>Risk Management &amp; the UK Post-Brexit Pharmacovigilance Landscape</h1>
<hr/>

<h2>Risk Management in Pharmacovigilance</h2>
<p>Risk management in pharmacovigilance aims to ensure that the <strong>benefits of a medicine outweigh its risks</strong> throughout its entire lifecycle. It is a continuous, iterative process — not a one-time exercise.</p>

<h3>The Benefit-Risk Framework</h3>
<p>Regulatory decisions about medicines are made on the basis of benefit-risk assessment:</p>
<ul>
  <li><strong>Benefit</strong>: Clinical effectiveness, improvement in patient outcomes, quality of life</li>
  <li><strong>Risk</strong>: Adverse drug reactions, drug interactions, misuse potential, harm from improper use</li>
  <li>The balance is assessed at every stage: approval, renewal, signal evaluation, and routine monitoring</li>
  <li>The balance can change — new evidence, new patient populations, new uses can all alter it</li>
</ul>

<h3>Risk Categories in the Safety Specification</h3>
<table>
  <tr><th>Category</th><th>Definition</th><th>Example</th></tr>
  <tr><td><strong>Important Identified Risk</strong></td><td>An ADR for which there is adequate evidence of an association with the medicine</td><td>Hepatotoxicity with valproate</td></tr>
  <tr><td><strong>Important Potential Risk</strong></td><td>An event for which there is concern about potential association, but insufficient evidence</td><td>Immunogenicity concerns with a new biologic</td></tr>
  <tr><td><strong>Missing Information</strong></td><td>Gaps in safety knowledge about specific populations or situations</td><td>Use in pregnancy; paediatric use; renal impairment</td></tr>
</table>

<h3>Post-Authorisation Safety Studies (PASS)</h3>
<p>A PASS is a study carried out after a medicine is authorised, to obtain further information about its safety, or to measure the effectiveness of risk management measures. They can be:</p>
<ul>
  <li><strong>Imposed as conditions of the MA</strong> — mandatory; agreed as part of the RMP</li>
  <li><strong>Voluntarily initiated</strong> by the MAH to address identified safety questions</li>
  <li><strong>Study designs</strong>: Observational (most common), non-interventional, using electronic health records, registries, or prospective cohort studies</li>
</ul>
<hr/>

<h2>UK Post-Brexit Pharmacovigilance Changes</h2>
<p>The UK's departure from the EU single medicines market has created a parallel but independent pharmacovigilance system. Understanding the differences is essential for anyone working in UK drug safety.</p>

<h3>Pre-Brexit vs Post-Brexit</h3>
<table>
  <tr><th>Area</th><th>Before Brexit</th><th>After Brexit (from Jan 2021)</th></tr>
  <tr><td><strong>Regulatory Authority</strong></td><td>EMA (EU-wide)</td><td>MHRA (UK only)</td></tr>
  <tr><td><strong>Spontaneous Reports</strong></td><td>EudraVigilance (EU)</td><td>UK Yellow Card + EudraVigilance (for EU)</td></tr>
  <tr><td><strong>Marketing Authorisation</strong></td><td>EMA Centralised Procedure covered UK</td><td>MHRA issues separate UK licences (UKMA)</td></tr>
  <tr><td><strong>PSUR Submission</strong></td><td>Single submission to EMA</td><td>Separate submissions to MHRA and EMA</td></tr>
  <tr><td><strong>QPPV</strong></td><td>Single EU QPPV covered UK</td><td>UK QPPV (UK-resident) AND EU QPPV (EU-resident)</td></tr>
  <tr><td><strong>RMP</strong></td><td>Single RMP assessed by PRAC</td><td>MHRA may accept EU RMP or require UK-specific version</td></tr>
  <tr><td><strong>Signal Management</strong></td><td>PRAC at EMA co-ordinated signals</td><td>MHRA conducts independent UK signal assessment</td></tr>
</table>

<h3>Medicines and Medical Devices Act 2021 (MMDA 2021)</h3>
<p>The MMDA 2021 provides the UK's post-Brexit legislative framework for medicines regulation. Key provisions relevant to pharmacovigilance:</p>
<ul>
  <li>Confers powers on the Secretary of State and the MHRA to make regulations governing medicines safety</li>
  <li>Enables MHRA to implement a new UK-specific clinical trial regulation (the UK Clinical Trials Regulation, UKCTR)</li>
  <li>Maintains existing pharmacovigilance obligations under retained EU law, with MHRA as the competent authority</li>
  <li>Allows the UK to diverge from EU pharmacovigilance requirements over time</li>
</ul>

<div class="info-box">
  <div class="info-box-title">📌 Northern Ireland — A Special Case</div>
  <p>Under the Windsor Framework (2023), Northern Ireland has a unique regulatory status. Medicines for human use in Northern Ireland continue to be regulated under EU law (via EMA/PRAC) through the EU's regulatory mechanisms. This means PV obligations for NI are aligned with EU requirements, not purely UK MHRA requirements — a complex dual-track situation for MAHs.</p>
</div>

<hr/>
<h2>EudraVigilance &amp; WHO VigiBase</h2>
<h3>EudraVigilance</h3>
<p>EudraVigilance is the EMA's central database for reports of suspected ADRs for medicines authorised or being studied in the EU. Post-Brexit, it covers the EEA (EU + Norway, Iceland, Liechtenstein) but <strong>no longer covers the UK</strong>. MAHs with both EU and UK authorisations must submit ICSRs (Individual Case Safety Reports) separately.</p>

<h3>WHO VigiBase</h3>
<p>VigiBase is the WHO's global ICSR database, managed by the Uppsala Monitoring Centre (UMC) in Sweden. It contains over 35 million reports from more than 150 countries. The UK Yellow Card database feeds into VigiBase, enabling global signal detection across all contributing national databases.</p>
`;

// ─────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────
const MODULES = [
  // ══════════════════════════════════════════
  // MODULE 1: Foundations of Pharmacovigilance
  // ══════════════════════════════════════════
  {
    title: 'Module 1: Foundations of Pharmacovigilance',
    description: 'History of pharmacovigilance, essential definitions (AE, ADR, SAE, SUSAR), and the global PV regulatory landscape.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'Welcome & Course Overview',
        lessonType: 'VIDEO',
        videoUrl: VIDEOS.welcome,
        videoDurationMinutes: 7,
        isPreview: true,
        order: 1,
        content: CONTENT.welcome,
      },
      {
        title: 'History, Definitions & Regulatory Basis',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.pvFoundations,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The Yellow Card scheme was established in the UK in response to which drug safety disaster?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Yellow Card scheme was established in 1964 in direct response to the thalidomide tragedy.',
          marks: 1, order: 1,
          options: [
            { optionText: 'The thalidomide disaster', isCorrect: true, order: 1 },
            { optionText: 'The sulfanilamide tragedy', isCorrect: false, order: 2 },
            { optionText: 'The Vioxx (rofecoxib) withdrawal', isCorrect: false, order: 3 },
            { optionText: 'The BSE crisis', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An Adverse Drug Reaction (ADR) differs from an Adverse Event (AE) in that:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An ADR has an established causal relationship with the medicine. An AE is any event occurring during treatment, regardless of causality.',
          marks: 1, order: 2,
          options: [
            { optionText: 'An ADR has an established causal relationship with the medicine', isCorrect: true, order: 1 },
            { optionText: 'An ADR is always serious; an AE may be mild', isCorrect: false, order: 2 },
            { optionText: 'An ADR occurs only during clinical trials; an AE occurs post-marketing', isCorrect: false, order: 3 },
            { optionText: 'An AE is always reported; an ADR only when serious', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A SUSAR must satisfy which three criteria simultaneously?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'SUSAR = Suspected Unexpected Serious Adverse Reaction. All three criteria — serious, unexpected, and suspected causal relationship — must be met.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Serious, unexpected, and suspected causal relationship with the IMP', isCorrect: true, order: 1 },
            { optionText: 'Fatal, unexpected, and confirmed causal relationship', isCorrect: false, order: 2 },
            { optionText: 'Serious, known, and confirmed causal relationship', isCorrect: false, order: 3 },
            { optionText: 'Mild, unexpected, and temporally associated with the IMP', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which organisation manages WHO VigiBase globally?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'VigiBase is managed by the Uppsala Monitoring Centre (UMC) in Sweden on behalf of the WHO.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Uppsala Monitoring Centre (UMC)', isCorrect: true, order: 1 },
            { optionText: 'EMA (European Medicines Agency)', isCorrect: false, order: 2 },
            { optionText: 'FDA (Food and Drug Administration)', isCorrect: false, order: 3 },
            { optionText: 'MHRA (Medicines and Healthcare Products Regulatory Agency)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: '"Expectedness" of a Serious Adverse Reaction in a clinical trial is assessed against:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'In clinical trials, expectedness is assessed against the Reference Safety Information (RSI) in the Investigator\'s Brochure (IB). Post-marketing, it is the SmPC.',
          marks: 1, order: 5,
          options: [
            { optionText: 'The Reference Safety Information (RSI) in the Investigator\'s Brochure (IB)', isCorrect: true, order: 1 },
            { optionText: 'The patient\'s medical history', isCorrect: false, order: 2 },
            { optionText: 'The CTCAE grading criteria', isCorrect: false, order: 3 },
            { optionText: 'The protocol\'s inclusion/exclusion criteria', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════
  // MODULE 2: Classifying ADRs & AE Reporting in Trials
  // ══════════════════════════════════════════════════════
  {
    title: 'Module 2: Classifying ADRs & AE Reporting in Clinical Trials',
    description: 'ABC(DE) classification of ADRs, CTCAE grading, causality assessment, SAE/SUSAR timelines, and the DSUR.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'Classifying Adverse Drug Reactions',
        lessonType: 'VIDEO',
        videoUrl: VIDEOS.adrs,
        videoDurationMinutes: 15,
        isPreview: false,
        order: 1,
        content: CONTENT.aeClassification,
      },
      {
        title: 'CTCAE Grading & Reporting Timelines',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.ctcaeReporting,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'Type A adverse drug reactions are best described as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Type A (Augmented) reactions are predictable from the drug\'s pharmacology, dose-dependent, and the most common type (~80% of all ADRs).',
          marks: 1, order: 1,
          options: [
            { optionText: 'Predictable from pharmacology; dose-dependent; most common type of ADR', isCorrect: true, order: 1 },
            { optionText: 'Idiosyncratic; not predictable; dose-independent', isCorrect: false, order: 2 },
            { optionText: 'Occurring only after long-term use', isCorrect: false, order: 3 },
            { optionText: 'Withdrawal reactions when the drug is stopped', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An adverse drug reaction whose nature, severity, or outcome is NOT consistent with the Reference Safety Information is classified as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An "Unexpected Adverse Reaction" is one not consistent with the RSI/SmPC. If it is also serious with suspected causality, it becomes a SUSAR.',
          marks: 1, order: 2,
          options: [
            { optionText: 'An Unexpected Adverse Reaction', isCorrect: true, order: 1 },
            { optionText: 'A Type B Adverse Drug Reaction', isCorrect: false, order: 2 },
            { optionText: 'An Adverse Event of Special Interest (AESI)', isCorrect: false, order: 3 },
            { optionText: 'A Protocol Deviation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Using the WHO-UMC Causality Assessment, a "Probable/Likely" causality means:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Probable/Likely" = plausible time relationship; unlikely to be explained by disease/other drugs; positive dechallenge; rechallenge not required.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Plausible time relationship; unlikely explained by disease or other drugs; positive dechallenge', isCorrect: true, order: 1 },
            { optionText: 'Confirmed by rechallenge; cannot be explained by disease or other drugs', isCorrect: false, order: 2 },
            { optionText: 'Plausible time relationship only; could be disease or other drugs', isCorrect: false, order: 3 },
            { optionText: 'Temporal relationship is improbable; other causes are more likely', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A non-fatal SUSAR must be reported by the Sponsor to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Non-fatal, non-life-threatening SUSARs must be reported within 15 calendar days of sponsor awareness.',
          marks: 1, order: 4,
          options: [
            { optionText: '15 calendar days of sponsor awareness', isCorrect: true, order: 1 },
            { optionText: '7 calendar days of sponsor awareness', isCorrect: false, order: 2 },
            { optionText: '24 hours of sponsor awareness', isCorrect: false, order: 3 },
            { optionText: '30 calendar days of sponsor awareness', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The DSUR (Development Safety Update Report) is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The DSUR is the annual safety report for investigational products in clinical trials. The PSUR/PBRER is the equivalent for authorised (post-marketed) medicines.',
          marks: 1, order: 5,
          options: [
            { optionText: 'The annual safety report for investigational products in clinical trials', isCorrect: true, order: 1 },
            { optionText: 'The annual safety report for authorised post-marketed medicines', isCorrect: false, order: 2 },
            { optionText: 'The document submitted to ethics committees for consent updates', isCorrect: false, order: 3 },
            { optionText: 'A signal detection report submitted to EudraVigilance', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════
  // MODULE 3: Yellow Card & Post-Marketing Surveillance
  // ══════════════════════════════════════════════════════
  {
    title: 'Module 3: Yellow Card Scheme & Post-Marketing Surveillance',
    description: 'UK Yellow Card reporting scheme, who can report, what to report, and MHRA post-marketing pharmacovigilance requirements.',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'The UK Yellow Card Scheme',
        lessonType: 'VIDEO',
        videoUrl: VIDEOS.yellowCard,
        videoDurationMinutes: 14,
        isPreview: false,
        order: 1,
        content: CONTENT.yellowCard,
      },
      {
        title: 'Post-Marketing Pharmacovigilance & MHRA Requirements',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.postMarketing,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The UK Yellow Card scheme was established in:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Yellow Card scheme was established in 1964 as the world\'s first voluntary spontaneous ADR reporting system.',
          marks: 1, order: 1,
          options: [
            { optionText: '1964', isCorrect: true, order: 1 },
            { optionText: '1937', isCorrect: false, order: 2 },
            { optionText: '1968', isCorrect: false, order: 3 },
            { optionText: '2001', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For black triangle (▼) medicines, healthcare professionals are asked to report:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'For black triangle medicines, ALL suspected ADRs — including non-serious ones — should be reported to the Yellow Card scheme.',
          marks: 1, order: 2,
          options: [
            { optionText: 'All suspected ADRs, including non-serious ones', isCorrect: true, order: 1 },
            { optionText: 'Only serious suspected ADRs', isCorrect: false, order: 2 },
            { optionText: 'Only fatal or life-threatening suspected ADRs', isCorrect: false, order: 3 },
            { optionText: 'Nothing — black triangle medicines are exempt from reporting', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Pharmacovigilance System Master File (PSMF) must be:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PSMF is the MAH\'s reference document for its PV system. It must be kept up to date and available for MHRA inspection at all times.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Kept up to date and available for MHRA inspection at all times', isCorrect: true, order: 1 },
            { optionText: 'Submitted annually to the MHRA', isCorrect: false, order: 2 },
            { optionText: 'Kept confidential and never shared with regulators', isCorrect: false, order: 3 },
            { optionText: 'Updated only when a new product is authorised', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are required contents of an RMP (Risk Management Plan)?',
          questionType: 'MULTI_SELECT',
          explanation: 'An RMP must include: safety specification (identified/potential risks, missing information), pharmacovigilance plan, and risk minimisation measures.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Safety specification including identified risks, potential risks, and missing information', isCorrect: true, order: 1 },
            { optionText: 'Pharmacovigilance plan with ongoing/planned studies', isCorrect: true, order: 2 },
            { optionText: 'Risk minimisation measures for each identified risk', isCorrect: true, order: 3 },
            { optionText: 'Full clinical trial protocols for all Phase 3 studies', isCorrect: false, order: 4 },
            { optionText: 'Product manufacturing details and batch records', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Under-reporting in spontaneous pharmacovigilance systems (the "iceberg effect") means:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Studies suggest only 6–10% of serious ADRs in the UK are reported to the Yellow Card scheme. This systematic under-reporting is the "iceberg effect" — the visible reports are just the tip.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Only a small fraction of actual ADRs are reported to Yellow Card', isCorrect: true, order: 1 },
            { optionText: 'Most ADRs reported are duplicates of the same event', isCorrect: false, order: 2 },
            { optionText: 'Healthcare professionals report more than patients expect', isCorrect: false, order: 3 },
            { optionText: 'Serious ADRs are always over-reported to the MHRA', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════
  // MODULE 4: Signal Detection, Risk Management & Final Assessment
  // ══════════════════════════════════════════════════════
  {
    title: 'Module 4: Signal Detection & Risk Management',
    description: 'Signal detection methods, benefit-risk assessment, post-authorisation safety studies, and the UK post-Brexit pharmacovigilance landscape.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'Signal Detection in Pharmacovigilance',
        lessonType: 'VIDEO',
        videoUrl: VIDEOS.signals,
        videoDurationMinutes: 16,
        isPreview: false,
        order: 1,
        content: CONTENT.signalDetection,
      },
      {
        title: 'Risk Management & the UK Post-Brexit PV Landscape',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.riskManagement,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'Signal detection using the Proportional Reporting Ratio (PRR) is used by:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'PRR is the disproportionality method used by the MHRA on the UK Yellow Card database.',
          marks: 1, order: 1,
          options: [
            { optionText: 'MHRA (for the Yellow Card database)', isCorrect: true, order: 1 },
            { optionText: 'WHO Uppsala Monitoring Centre (for VigiBase)', isCorrect: false, order: 2 },
            { optionText: 'FDA (for FAERS)', isCorrect: false, order: 3 },
            { optionText: 'EMA (for EudraVigilance)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In the RMP safety specification, an "Important Potential Risk" is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Important Potential Risk" = an event for which there is concern about potential association with the medicine, but insufficient evidence to confirm it.',
          marks: 1, order: 2,
          options: [
            { optionText: 'An event for which there is concern about potential association but insufficient evidence', isCorrect: true, order: 1 },
            { optionText: 'A confirmed ADR for which there is adequate evidence of association', isCorrect: false, order: 2 },
            { optionText: 'Missing information about the drug\'s use in a specific population', isCorrect: false, order: 3 },
            { optionText: 'A risk that has already been minimised through labelling changes', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Post-Brexit, which statement about UK pharmacovigilance obligations is CORRECT?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-Brexit, MAHs with both UK and EU authorisations must submit PSURs separately to MHRA (for UK) and EMA (for EU). They also require separate QPPVs.',
          marks: 1, order: 3,
          options: [
            { optionText: 'MAHs with UK and EU licences must submit PSURs separately to MHRA and EMA', isCorrect: true, order: 1 },
            { optionText: 'A single EU QPPV covers both UK and EU obligations', isCorrect: false, order: 2 },
            { optionText: 'UK Yellow Card reports are automatically shared with EudraVigilance', isCorrect: false, order: 3 },
            { optionText: 'The MHRA now operates under EMA oversight post-Brexit', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Post-Authorisation Safety Study (PASS) is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A PASS is a study carried out after marketing authorisation to obtain further safety information or to measure the effectiveness of risk minimisation measures.',
          marks: 1, order: 4,
          options: [
            { optionText: 'A study carried out after MA to obtain further safety information or measure risk minimisation effectiveness', isCorrect: true, order: 1 },
            { optionText: 'A Phase 3 clinical trial required before marketing authorisation', isCorrect: false, order: 2 },
            { optionText: 'A retrospective analysis of pre-market clinical trial data', isCorrect: false, order: 3 },
            { optionText: 'An audit conducted by the MHRA to assess PV compliance', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following can be an outcome of a confirmed pharmacovigilance signal?',
          questionType: 'MULTI_SELECT',
          explanation: 'Signal outcomes include: SmPC/PIL update, DHPC to healthcare professionals, additional risk minimisation, restriction of indication, or even suspension/withdrawal of the MA.',
          marks: 2, order: 5,
          options: [
            { optionText: 'Update to the SmPC/PIL with a new warning', isCorrect: true, order: 1 },
            { optionText: 'Direct Healthcare Professional Communication (DHPC)', isCorrect: true, order: 2 },
            { optionText: 'Restriction or suspension of the marketing authorisation', isCorrect: true, order: 3 },
            { optionText: 'Automatic re-approval of the medicine without review', isCorrect: false, order: 4 },
            { optionText: 'Implementation of an additional risk minimisation programme', isCorrect: true, order: 5 },
          ],
        },
      ],
    },
  },

  // ══════════════════════════════════════════════════════
  // MODULE 5: Final Assessment
  // ══════════════════════════════════════════════════════
  {
    title: 'Module 5: Final Assessment',
    description: 'Comprehensive final assessment covering all Introduction to Pharmacovigilance modules. Pass to unlock your certificate.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Course Summary & Exam Preparation',
        lessonType: 'TEXT',
        isPreview: false,
        order: 1,
        content: `
<h1>Course Summary &amp; Exam Preparation</h1>
<p>You have now covered all four modules of Introduction to Pharmacovigilance. Use this summary to consolidate your knowledge before the final assessment.</p>

<h2>Key Points to Remember</h2>

<h3>Definitions</h3>
<ul>
  <li><strong>AE:</strong> Any untoward medical occurrence in a patient administered a pharmaceutical product — does not necessarily have a causal relationship with treatment</li>
  <li><strong>ADR:</strong> A noxious and unintended response to a medicine — causal relationship established</li>
  <li><strong>SAE criteria:</strong> Death; life-threatening; overnight hospitalisation; significant disability; congenital malformation; other medically important event (including all malignancies and pregnancy)</li>
  <li><strong>SAR:</strong> SAE with a certain degree of probability that causality is the IMP — report within <strong>24 hours</strong> of PI/site awareness</li>
  <li><strong>SUSAR:</strong> Unexpected + Serious + Suspected causal relationship — all three required</li>
  <li><strong>AESI:</strong> Adverse event of scientific/medical concern specific to the sponsor's product or programme</li>
  <li><strong>Serious Breach:</strong> Written notification to MHRA within <strong>7 days</strong> of sponsor awareness</li>
  <li><strong>Pregnancy:</strong> NOT an SAE — use special pregnancy form; PI follows up to birth and baby's infancy</li>
</ul>

<h3>SUSAR Timelines (Sponsor to MHRA/EudraVigilance)</h3>
<ul>
  <li>Fatal or life-threatening: <strong>7 days</strong> from sponsor awareness + completed report in additional <strong>8 days</strong></li>
  <li>Non-fatal/non-life-threatening: <strong>15 days</strong> from sponsor awareness</li>
  <li>Initially non-fatal, later found fatal/life-threatening: 7-day clock restarts</li>
</ul>

<h3>CTCAE Grading</h3>
<ul>
  <li>Grade 1 = Mild: Asymptomatic, no intervention needed</li>
  <li>Grade 2 = Moderate: Minimal or non-invasive intervention needed</li>
  <li>Grade 3 = Severe: Medically significant, not life-threatening; may limit self-care ADL</li>
  <li>Grade 4 = Life-threatening: Urgent or emergent intervention needed</li>
  <li>Grade 5 = Death: Related to the AE</li>
</ul>

<h3>ADR Classification</h3>
<ul>
  <li><strong>Type A:</strong> Predictable from pharmacology; dose-dependent; most common (~80% of ADRs). e.g. bleeding with warfarin</li>
  <li><strong>Type B:</strong> Bizarre/idiosyncratic; not predictable; dose-independent. e.g. penicillin anaphylaxis</li>
  <li><strong>Type C:</strong> Chronic/cumulative; long-term use. e.g. adrenal suppression with steroids</li>
  <li><strong>Type D:</strong> Delayed; long latency. e.g. thalidomide teratogenesis</li>
  <li><strong>Type E:</strong> End-of-use/withdrawal. e.g. beta-blocker withdrawal</li>
</ul>

<h3>ALCOA-CCEA — Data Integrity</h3>
<ul>
  <li><strong>A</strong> = Attributable | <strong>L</strong> = Legible | <strong>C</strong> = Contemporaneous | <strong>O</strong> = Original | <strong>A</strong> = Accurate</li>
  <li><strong>C</strong> = Complete | <strong>C</strong> = Consistent | <strong>E</strong> = Enduring | <strong>A</strong> = Available</li>
  <li>Paper error correction: single strikethrough, correct entry, date, initials, reason — never Tipp-Ex</li>
  <li>Golden rule: <strong>IF not documented = Not Done</strong></li>
</ul>

<h3>Yellow Card &amp; Post-Marketing</h3>
<ul>
  <li>Yellow Card established <strong>1964</strong> — world's first voluntary spontaneous ADR reporting system</li>
  <li>Open to: Healthcare professionals, patients/carers, MAHs, clinical trial sponsors</li>
  <li><strong>Black triangle (▼):</strong> Report ALL suspected ADRs, including non-serious</li>
  <li>Under-reporting "iceberg effect": only ~6–10% of serious ADRs reported</li>
  <li><strong>PSMF:</strong> Must be kept up to date; available for MHRA inspection at all times</li>
  <li><strong>QPPV:</strong> UK-resident (separate from EU QPPV post-Brexit)</li>
  <li><strong>RMP:</strong> Safety specification + PV plan + Risk minimisation measures</li>
</ul>

<h3>Signal Detection &amp; Post-Brexit</h3>
<ul>
  <li><strong>PRR:</strong> Used by MHRA (Yellow Card); <strong>IC/BCPNN:</strong> WHO VigiBase; <strong>EBGM:</strong> FDA FAERS</li>
  <li><strong>DSUR:</strong> Annual safety report for investigational products. <strong>PSUR/PBRER:</strong> For authorised (post-marketed) medicines</li>
  <li>Post-Brexit: Separate UK (MHRA) and EU (EMA) obligations — separate QPPV, PSUR submissions, and signal management</li>
</ul>

<blockquote>💡 The final assessment has <strong>15 questions</strong> covering all 4 modules. Pass mark is <strong>70% (11/15)</strong>. You have <strong>3 attempts</strong>. Your certificate is issued automatically on passing.</blockquote>
`,
      },
    ],
    quiz: {
      title: 'Final Assessment: Introduction to Pharmacovigilance',
      instructions: 'This is the final course assessment covering all modules. Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Your certificate is issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 30, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'The UK Yellow Card scheme was established in response to which event?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The thalidomide disaster prompted the creation of the Yellow Card scheme in 1964.',
          marks: 1, order: 1,
          options: [
            { optionText: 'The thalidomide disaster', isCorrect: true, order: 1 },
            { optionText: 'The sulfanilamide tragedy in the USA', isCorrect: false, order: 2 },
            { optionText: 'The Vioxx (rofecoxib) worldwide withdrawal', isCorrect: false, order: 3 },
            { optionText: 'The introduction of EU pharmacovigilance legislation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following best defines an Adverse Drug Reaction (ADR)?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An ADR is a noxious and unintended response to a medicine where a causal relationship has been established.',
          marks: 1, order: 2,
          options: [
            { optionText: 'A noxious and unintended response to a medicine for which a causal relationship has been established', isCorrect: true, order: 1 },
            { optionText: 'Any untoward medical occurrence during treatment, regardless of causality', isCorrect: false, order: 2 },
            { optionText: 'An event that is always serious and requires hospitalisation', isCorrect: false, order: 3 },
            { optionText: 'A reaction that only occurs at higher than therapeutic doses', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which criteria make an event an SAE? Select ALL that apply.',
          questionType: 'MULTI_SELECT',
          explanation: 'SAE criteria: death, life-threatening, hospitalisation, persistent disability, congenital anomaly, or medically important event.',
          marks: 2, order: 3,
          options: [
            { optionText: 'Results in death', isCorrect: true, order: 1 },
            { optionText: 'Is life-threatening', isCorrect: true, order: 2 },
            { optionText: 'Requires inpatient hospitalisation', isCorrect: true, order: 3 },
            { optionText: 'Results in a Grade 2 nausea in a clinical trial', isCorrect: false, order: 4 },
            { optionText: 'Results in persistent or significant disability', isCorrect: true, order: 5 },
            { optionText: 'Is a congenital anomaly', isCorrect: true, order: 6 },
          ],
        },
        {
          questionText: 'A fatal SUSAR must be reported by the Sponsor to the MHRA no later than:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Fatal/life-threatening SUSARs: 7 calendar days from sponsor awareness, with a complete report within an additional 8 days.',
          marks: 1, order: 4,
          options: [
            { optionText: '7 calendar days, with a complete report within an additional 8 days', isCorrect: true, order: 1 },
            { optionText: '15 calendar days of sponsor awareness', isCorrect: false, order: 2 },
            { optionText: '24 hours of sponsor awareness', isCorrect: false, order: 3 },
            { optionText: '30 calendar days of sponsor awareness', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Type B adverse drug reactions are characterised by:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Type B (Bizarre) reactions are idiosyncratic, not predictable from pharmacology, and dose-independent. Penicillin anaphylaxis is a classic example.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Being idiosyncratic, unpredictable from pharmacology, and dose-independent', isCorrect: true, order: 1 },
            { optionText: 'Being dose-dependent and predictable from pharmacology', isCorrect: false, order: 2 },
            { optionText: 'Occurring only with long-term cumulative drug use', isCorrect: false, order: 3 },
            { optionText: 'Occurring at the end of therapy when the drug is stopped', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'CTCAE Grade 4 adverse events are defined as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'CTCAE Grade 4 = Life-threatening consequences; urgent intervention indicated.',
          marks: 1, order: 6,
          options: [
            { optionText: 'Life-threatening; urgent intervention indicated', isCorrect: true, order: 1 },
            { optionText: 'Severe; medically significant but not life-threatening', isCorrect: false, order: 2 },
            { optionText: 'Mild; asymptomatic; no intervention needed', isCorrect: false, order: 3 },
            { optionText: 'Death related to the adverse event', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Who can submit a report to the UK Yellow Card scheme?',
          questionType: 'MULTI_SELECT',
          explanation: 'The Yellow Card scheme accepts reports from healthcare professionals, patients and carers, Marketing Authorisation Holders (MAHs), and clinical trial sponsors.',
          marks: 2, order: 7,
          options: [
            { optionText: 'Healthcare professionals (doctors, pharmacists, nurses)', isCorrect: true, order: 1 },
            { optionText: 'Patients and carers', isCorrect: true, order: 2 },
            { optionText: 'Marketing Authorisation Holders (MAHs)', isCorrect: true, order: 3 },
            { optionText: 'Clinical trial sponsors reporting SUSARs', isCorrect: true, order: 4 },
            { optionText: 'Only the Principal Investigator of a clinical trial', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'The Proportional Reporting Ratio (PRR) is a signal detection method used in:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'PRR is used by the MHRA to detect signals in the UK Yellow Card database.',
          marks: 1, order: 8,
          options: [
            { optionText: 'The MHRA Yellow Card database', isCorrect: true, order: 1 },
            { optionText: 'The WHO VigiBase database', isCorrect: false, order: 2 },
            { optionText: 'The FDA FAERS database', isCorrect: false, order: 3 },
            { optionText: 'The EMA EudraVigilance database', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following is the correct definition of "Missing Information" in a Risk Management Plan?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Missing Information" refers to gaps in safety knowledge about specific populations or situations — e.g., use in pregnancy, paediatric use, or patients with renal impairment.',
          marks: 1, order: 9,
          options: [
            { optionText: 'Gaps in safety knowledge about specific populations or situations (e.g. pregnancy, paediatrics)', isCorrect: true, order: 1 },
            { optionText: 'An ADR that has been identified but not yet reported to regulators', isCorrect: false, order: 2 },
            { optionText: 'A potential risk for which there is insufficient evidence of association', isCorrect: false, order: 3 },
            { optionText: 'A risk that has been fully characterised and minimised', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is the "iceberg effect" in spontaneous pharmacovigilance reporting?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The iceberg effect refers to the systematic under-reporting in spontaneous systems — only 6–10% of serious ADRs are reported to Yellow Card; the rest are invisible below the surface.',
          marks: 1, order: 10,
          options: [
            { optionText: 'Only a small fraction of actual ADRs are captured in spontaneous reporting systems', isCorrect: true, order: 1 },
            { optionText: 'Most reports in Yellow Card are duplicates of the same event', isCorrect: false, order: 2 },
            { optionText: 'Serious ADRs are over-reported relative to mild ones', isCorrect: false, order: 3 },
            { optionText: 'Post-marketing data contains more ADRs than clinical trial data', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Post-Brexit, a Marketing Authorisation Holder (MAH) with both UK and EU licences must:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-Brexit: UK and EU PV obligations are independent. MAHs need separate UK and EU QPPVs and must submit PSURs to both MHRA and EMA.',
          marks: 1, order: 11,
          options: [
            { optionText: 'Submit PSURs separately to both the MHRA and EMA, and have separate UK and EU QPPVs', isCorrect: true, order: 1 },
            { optionText: 'Submit a single PSUR to the EMA, which shares it with the MHRA', isCorrect: false, order: 2 },
            { optionText: 'Only report to the MHRA if the medicine is manufactured in the UK', isCorrect: false, order: 3 },
            { optionText: 'Appoint a single EU-resident QPPV to cover all obligations', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An "Important Identified Risk" in the RMP safety specification means:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Important Identified Risk" = an ADR for which there is adequate evidence of an association with the medicine.',
          marks: 1, order: 12,
          options: [
            { optionText: 'An ADR for which there is adequate evidence of an association with the medicine', isCorrect: true, order: 1 },
            { optionText: 'A risk for which there is concern but insufficient evidence', isCorrect: false, order: 2 },
            { optionText: 'Missing information about use in a specific population', isCorrect: false, order: 3 },
            { optionText: 'A risk detected only through signal detection, not clinical trials', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The PSUR / PBRER is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PSUR (Periodic Safety Update Report), also called PBRER (Periodic Benefit-Risk Evaluation Report), is the periodic safety report for authorised post-marketed medicines. The DSUR is for investigational products.',
          marks: 1, order: 13,
          options: [
            { optionText: 'The periodic safety report for authorised post-marketed medicines', isCorrect: true, order: 1 },
            { optionText: 'The annual safety report for investigational products in clinical trials', isCorrect: false, order: 2 },
            { optionText: 'The safety report submitted to the ethics committee during a trial', isCorrect: false, order: 3 },
            { optionText: 'The signal detection report submitted by the MHRA to WHO', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What does "expectedness" of a serious adverse reaction refer to in post-marketing pharmacovigilance?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-marketing expectedness is assessed against the SmPC. A reaction is "unexpected" if its nature, severity, specificity, or outcome is not consistent with the SmPC.',
          marks: 1, order: 14,
          options: [
            { optionText: 'Whether the reaction is consistent with the Summary of Product Characteristics (SmPC)', isCorrect: true, order: 1 },
            { optionText: 'Whether the reaction was predicted by the Phase 3 clinical trial data', isCorrect: false, order: 2 },
            { optionText: 'Whether the reaction occurs within the expected dosage range', isCorrect: false, order: 3 },
            { optionText: 'Whether the reaction was reported by the patient or the healthcare professional', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following outcomes can result from a confirmed pharmacovigilance signal?',
          questionType: 'MULTI_SELECT',
          explanation: 'Confirmed signals can lead to: SmPC/PIL update, DHPC, additional risk minimisation, restriction of indication, or suspension/withdrawal of the MA.',
          marks: 2, order: 15,
          options: [
            { optionText: 'Update to the SmPC/PIL adding a new warning or contraindication', isCorrect: true, order: 1 },
            { optionText: 'Issue of a Direct Healthcare Professional Communication (DHPC)', isCorrect: true, order: 2 },
            { optionText: 'Restriction of the marketing authorisation indication', isCorrect: true, order: 3 },
            { optionText: 'Automatic approval of a new dose level to replace the current one', isCorrect: false, order: 4 },
            { optionText: 'Suspension or withdrawal of the marketing authorisation', isCorrect: true, order: 5 },
          ],
        },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  SEEDING: Introduction to Pharmacovigilance (Course 04)');
  console.log('  Content: HTML strings | Videos: YouTube placeholders');
  console.log('═══════════════════════════════════════════════════════════════\n');

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
      title: 'Introduction to Pharmacovigilance',
      subtitle: 'Drug safety fundamentals for the UK and global clinical research context',
      description: 'A foundational pharmacovigilance course covering adverse drug reactions, signal detection, the UK Yellow Card scheme, and MHRA reporting requirements. Essential for anyone working in clinical trials or post-market drug safety in the UK.',
      learningObjectives: [
        'Distinguish between AEs, ADRs, SAEs, and SUSARs with confidence',
        'Classify adverse drug reactions using the ABC(DE) and CTCAE frameworks',
        'Apply WHO-UMC causality assessment criteria to suspected ADRs',
        'Describe the UK Yellow Card scheme, who can report, and what to report',
        'Explain MHRA pharmacovigilance inspection requirements and the PSMF',
        'Understand signal detection methods and benefit-risk management principles',
        'Navigate the post-Brexit UK pharmacovigilance reporting landscape',
      ],
      prerequisites: ['Basic clinical research knowledge', 'ICH GCP fundamentals recommended'],
      targetAudience: [
        'Drug Safety Associates entering the pharmacovigilance profession',
        'Clinical Research Associates (CRAs) seeking broader PV knowledge',
        'Regulatory Affairs professionals managing post-marketing surveillance',
        'Research Nurses and Study Co-ordinators handling adverse event data',
        'Healthcare professionals with a pharmacovigilance reporting obligation',
      ],
      durationHours: 5,
      difficultyLevel: 'BEGINNER',
      accreditation: 'MHRA Guidelines Aligned | ICH E2A/E2C(R2) Aligned',
      price: 129.00,
      originalPrice: 169.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'Introduction to Pharmacovigilance | Drug Safety Course UK | MHRA Aligned',
      seoDescription: 'Learn pharmacovigilance fundamentals: AEs, ADRs, SUSARs, UK Yellow Card, MHRA reporting, signal detection, and risk management. MHRA and ICH aligned. Ideal for CRAs and drug safety professionals.',
      tags: ['pharmacovigilance', 'drug-safety', 'MHRA', 'yellow-card', 'ADR', 'SUSAR', 'signal-detection', 'risk-management', 'post-Brexit', 'PSUR', 'DSUR'],
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
          downloadableResources: l.downloadableResources || null,
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
        bodyText: 'This is to certify that the above-named learner has successfully completed "Introduction to Pharmacovigilance" and demonstrated competency in all assessed learning outcomes.',
        signatureName: 'Dr. Sarah Mitchell',
        signatureTitle: 'Lead Clinical Research Trainer, Exon Sciences',
        logoUrl: 'https://exonsciences.com/assets/logo-dark.png',
      },
    });
    console.log('\n  🏅 Certificate template created.');
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  ✨ SEED COMPLETE');
  console.log(`  Modules: ${MODULES.length} | Lessons: ${totalLessons} | Quiz Questions: ${totalQuestions}`);
  console.log('  Content: Rich HTML strings (rendered via dangerouslySetInnerHTML)');
  console.log('  Videos: YouTube placeholders (replace with own recordings)');
  console.log('  Preview: /courses/introduction-to-pharmacovigilance');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main()
  .catch(e => { console.error('❌', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
