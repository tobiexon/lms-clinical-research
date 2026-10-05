/**
 * COURSE 01: Clinical Trial in the UK — Start-up to Closure
 * ─────────────────────────────────────────────────────────
 * Content stored as HTML strings (rendered via dangerouslySetInnerHTML).
 * Videos: verified working YouTube IDs from NHS, FDA, ICH official channels.
 * Run: node prisma/seed-course-01-uk-startup-to-closure.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'clinical-trial-uk-startup-to-closure';

// ─────────────────────────────────────────────────────────
// VIDEO URLS
// Currently set to null — shows "Video Coming Soon" placeholder.
// Replace each null with your actual video URL when ready.
// Supported formats (update videoUrl in any lesson):
//   YouTube:      https://www.youtube.com/watch?v=VIDEO_ID
//   Vimeo:        https://vimeo.com/VIDEO_ID
//   Bunny Stream: https://iframe.mediadelivery.net/embed/LIBRARY_ID/VIDEO_ID
//   Wistia:       https://fast.wistia.com/medias/VIDEO_ID
//   Loom:         https://www.loom.com/share/VIDEO_ID
//   Google Drive: https://drive.google.com/file/d/FILE_ID/view
//   Direct MP4:   https://your-cdn.com/videos/lesson-01.mp4
// ─────────────────────────────────────────────────────────
const VIDEOS = {
  drugLifecycle:  null,   // Module 1 Lesson 1 — replace with your recording
  ukRegulatory:   null,   // Module 1 Lesson 3 — replace with your recording
  feasibilitySsv: null,   // Module 2 Lesson 1 — replace with your recording
  sivDocs:        null,   // Module 3 Lesson 1 — replace with your recording
  monitoring:     null,   // Module 4 Lesson 1 — replace with your recording
  adverseEvents:  null,   // Module 4 Lesson 2 — replace with your recording
  dataQuality:    null,   // Module 5 Lesson 1 — replace with your recording
  closure:        null,   // Module 6 Lesson 1 — replace with your recording
};

// ─────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// Each lesson stores rich HTML in lesson.content (as a string).
// The learn page renders it via dangerouslySetInnerHTML.
// ─────────────────────────────────────────────────────────

const CONTENT = {};

// ── MODULE 1, LESSON 1: Welcome ──────────────────────────
CONTENT.welcome = `
<h1>Welcome to Clinical Trial in the UK: Start-up to Closure</h1>
<p>This course takes you through the complete lifecycle of a UK clinical trial — from the very first regulatory submission to final site closure and document archiving. Every module mirrors how clinical trials actually run in NHS and private research sites across the United Kingdom.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Clinical Research Associates (CRAs)</strong> and clinical trial monitors seeking a structured UK-focused foundation</li>
  <li><strong>Research Nurses and Site Co-ordinators</strong> at NHS or private investigative sites</li>
  <li><strong>Principal Investigators</strong> entering commercial clinical trial research for the first time</li>
  <li><strong>Sponsor and CRO professionals</strong> in start-up, regulatory, or clinical operations roles</li>
  <li><strong>Clinical research graduates</strong> building a career in the UK trial industry</li>
</ul>

<h2>What You Will Achieve</h2>
<ol>
  <li>Explain the complete drug development life cycle from discovery to post-market surveillance</li>
  <li>Identify the three UK regulatory authorities and their specific roles in clinical trial governance</li>
  <li>Prepare and conduct Site Selection, Initiation, Monitoring, and Close-out Visits</li>
  <li>Manage Adverse Events, SAEs, SUSARs, and Protocol Deviations compliantly</li>
  <li>Apply ALCOA-CCEA data integrity principles across all trial documentation</li>
  <li>Execute a GCP-compliant site closure and archiving procedure</li>
</ol>

<blockquote>💡 <strong>Watch the video above</strong> for an overview of how clinical trials are structured and why they matter to patients and healthcare globally.</blockquote>

<h2>How to Use This Course</h2>
<p>Each module contains a mix of video lessons and detailed reading lessons. Work through them in order. At the end of each module there is a knowledge check quiz — you need <strong>70% or above</strong> to proceed. The course ends with a final assessment of 15 questions. Pass to unlock your certificate.</p>
<p>All downloadable resources (templates, checklists, reference guides) are listed at the bottom of each lesson. You can access them at any time after completing the lesson.</p>
`;

// ── MODULE 1, LESSON 2: Drug Development Life Cycle ──────
CONTENT.drugLifecycle = `
<h1>The Drug Development Life Cycle</h1>
<p>Every licensed medicine available today began as a concept in a research laboratory and travelled through a rigorous, multi-stage development process before it could be administered to patients. This process — the <strong>Drug Development Life Cycle</strong> — typically spans 10 to 15 years and costs billions of pounds, with no guarantee of success at any stage.</p>
<p>Understanding this lifecycle is foundational for anyone working in clinical research. It explains <em>why</em> trials are structured the way they are, what the Sponsor is trying to achieve, and where your role as a CRA, site team member, or regulatory professional fits.</p>
<hr/>

<h2>Stage 1: Discovery</h2>
<p>The life cycle begins when scientists identify a <strong>biological target</strong> — a receptor, enzyme, protein, or gene — that is known to be involved in a disease process. The goal is then to find a molecule that interacts with that target in a therapeutically useful way.</p>
<ul>
  <li><strong>Target identification and validation</strong>: Confirming the target plays a meaningful role in the disease</li>
  <li><strong>High-throughput screening</strong>: Testing thousands of compounds rapidly to identify candidates that bind to the target</li>
  <li><strong>Lead compound identification</strong>: Selecting the most promising candidate for further optimisation</li>
  <li><strong>Medicinal chemistry</strong>: Modifying the compound's structure to improve potency, selectivity, and drug-like properties</li>
  <li><strong>Initial patent filing</strong>: Protecting the intellectual property before public disclosure</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 Did You Know?</div>
  <p>Only about 1 in 10,000 compounds screened during discovery ever makes it to clinical testing in humans.</p>
</div>

<h2>Stage 2: Preclinical Studies</h2>
<p>Before any human is exposed to the compound, extensive laboratory and animal studies establish whether the drug is safe enough to test in people, and whether it has any biological activity worth pursuing.</p>
<ul>
  <li><strong>In vitro studies</strong>: Cell culture experiments to assess pharmacological activity and initial toxicity</li>
  <li><strong>In vivo studies</strong>: Animal models (rodent, non-human primate) to assess pharmacokinetics and toxicology</li>
  <li><strong>ADME profiling</strong>: How the body Absorbs, Distributes, Metabolises, and Excretes the compound</li>
  <li><strong>Toxicology studies</strong>: Acute, sub-acute, chronic, reproductive, and genotoxicity testing</li>
  <li><strong>Formulation development</strong>: Determining how the drug will be made (tablet, injection, inhaler, etc.)</li>
</ul>
<blockquote>⚠️ <strong>Key regulatory milestone</strong>: If preclinical data support adequate safety margins, the Sponsor submits an <strong>Investigational New Drug (IND)</strong> application to the US FDA, or a <strong>Clinical Trial Authorisation (CTA)</strong> via IRAS to the MHRA in the UK, before the first human dose.</blockquote>

<h2>Stage 3: Clinical Trials — Phases 1 to 4</h2>
<p>Clinical trials are the systematic, controlled investigation of an Investigational Medicinal Product (IMP) in human subjects. They are divided into four phases, each with a different population, purpose, and size:</p>

<table>
  <tr><th>Phase</th><th>Population</th><th>Primary Purpose</th><th>Typical Participants</th></tr>
  <tr><td><strong>Phase 1</strong></td><td>Healthy volunteers (oncology: patients)</td><td>Safety, tolerability, PK/PD, dose escalation — <em>"Is it safe?"</em></td><td>20–100</td></tr>
  <tr><td><strong>Phase 2</strong></td><td>Patients with the target disease</td><td>Efficacy signals, dose finding, safety profile — <em>"Does it work?"</em></td><td>100–500</td></tr>
  <tr><td><strong>Phase 3</strong></td><td>Large, diverse patient population</td><td>Confirm efficacy vs. control, safety at scale — <em>"Is it better than existing treatments?"</em></td><td>1,000–10,000+</td></tr>
  <tr><td><strong>Phase 4</strong></td><td>Post-approval real-world patients</td><td>Long-term safety, effectiveness, new indications — <em>"Post-market surveillance"</em></td><td>Thousands</td></tr>
</table>

<h3>Phase 1: First-in-Human</h3>
<p>Phase 1 is the first time the compound is given to human subjects. The primary concern is <strong>safety</strong>. Researchers determine the maximum tolerated dose, characterise how the drug behaves in the body (pharmacokinetics), and identify any early signs of toxicity. In oncology trials, Phase 1 typically uses cancer patients rather than healthy volunteers because the toxicity profile of cytotoxic agents would be unacceptable in healthy people.</p>

<h3>Phase 2: Proof of Concept</h3>
<p>Phase 2 introduces the drug to patients with the target disease. The aims are to: demonstrate that the drug has therapeutic activity, refine the dosing regimen, and gather more detailed safety data. Phase 2 is often divided into 2a (dose finding) and 2b (dose confirmation). Many compounds fail at Phase 2 due to insufficient efficacy or unacceptable side effects.</p>

<h3>Phase 3: Pivotal Trials</h3>
<p>Phase 3 trials are the large, definitive studies that form the basis of a regulatory submission. They compare the new treatment against standard of care (or placebo where no standard exists) in a large, representative patient population across multiple sites and countries. Statistical analysis plans are pre-specified. A statistically significant result that demonstrates clinically meaningful benefit with an acceptable safety profile leads to a regulatory submission.</p>

<h3>Phase 4: Post-Market Surveillance</h3>
<p>After approval, the drug enters the real world. Phase 4 includes post-authorisation safety studies (PASS), observational studies, registries, and spontaneous adverse drug reaction reporting (the UK Yellow Card scheme). The Sponsor has ongoing pharmacovigilance obligations indefinitely.</p>
<hr/>

<h2>Stage 4: Regulatory Review and Approval</h2>
<p>After successful Phase 3 trials, the Sponsor compiles all clinical, non-clinical, and manufacturing data into a submission package:</p>
<ul>
  <li><strong>USA (FDA)</strong>: New Drug Application (NDA) for small molecules; Biologics License Application (BLA) for biologics</li>
  <li><strong>UK (MHRA)</strong>: Marketing Authorisation Application (MAA)</li>
  <li><strong>EU (EMA)</strong>: Centralised marketing authorisation procedure</li>
</ul>
<p>Regulatory review takes 12–24 months. The agency assesses benefit-risk balance. Approval may include <strong>Risk Evaluation and Mitigation Strategies (REMS)</strong> in the US, or <strong>Risk Management Plans (RMPs)</strong> in the UK/EU.</p>

<h2>Stage 5: Post-Market Surveillance</h2>
<p>Approval does not end the life cycle. Signal detection, periodic safety update reports (PSURs/PADERs), post-authorisation efficacy studies, and the real-world evidence gathered from Phase 4 all contribute to ongoing benefit-risk assessment. In the UK, the MHRA's Yellow Card scheme allows healthcare professionals and patients to report suspected adverse drug reactions spontaneously — this data feeds into global pharmacovigilance systems.</p>
<hr/>

<h2>The Role of Sponsors and CROs</h2>
<p>The organisation that takes legal and financial responsibility for initiating and managing a clinical trial is called the <strong>Sponsor</strong>. This is typically a pharmaceutical or biotechnology company. Sponsors may outsource operational responsibilities to a <strong>Contract Research Organisation (CRO)</strong> — companies such as IQVIA, ICON, PAREXEL, Covance (Labcorp Drug Development), PPD, or Syneos Health.</p>
<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>The drug development lifecycle typically takes 10–15 years from discovery to approval</li>
    <li>IND (US) and CTA via IRAS (UK) are required before the first human dose in Phase 1</li>
    <li>Phase 3 trials generate the data that supports a marketing authorisation application</li>
    <li>Post-market surveillance (Phase 4 / pharmacovigilance) continues indefinitely after approval</li>
    <li>"Sponsor" means the legally responsible organisation — not necessarily the funder</li>
  </ul>
</div>
`;

// ── MODULE 1, LESSON 3: UK Regulatory Authorities ────────
CONTENT.ukRegulatory = `
<h1>UK Regulatory Authorities: MHRA, HRA &amp; NIHR</h1>
<p>Running a clinical trial in the United Kingdom requires approval and oversight from three distinct national bodies. Understanding the role of each — and the order in which they operate — is essential knowledge for any UK clinical research professional.</p>
<hr/>

<h2>The Three Pillars of UK Clinical Trial Governance</h2>
<table>
  <tr><th>Body</th><th>Full Name</th><th>Primary Role</th></tr>
  <tr><td><strong>MHRA</strong></td><td>Medicines and Healthcare Products Regulatory Authority</td><td>Scientific and regulatory authorisation of the trial</td></tr>
  <tr><td><strong>HRA</strong></td><td>Health Research Authority</td><td>Ethical and governance approval</td></tr>
  <tr><td><strong>NIHR</strong></td><td>National Institute for Health and Care Research</td><td>Funding, infrastructure support, and Clinical Research Networks</td></tr>
</table>

<h2>1. MHRA — Medicines and Healthcare Products Regulatory Authority</h2>
<p>The MHRA is the UK government agency responsible for ensuring that medicines, medical devices, and blood and tissue products work and are acceptably safe. For clinical trials, the MHRA acts as the <strong>competent authority</strong> — the body with the legal power to authorise the study to take place.</p>

<h3>What the MHRA Does in Clinical Trials</h3>
<ul>
  <li>Reviews the Investigational Medicinal Product (IMP) dossier — manufacturing, quality, non-clinical, and clinical data</li>
  <li>Assesses the scientific rationale and safety of the proposed trial design</li>
  <li>Issues the <strong>Clinical Trial Authorisation (CTA) Initial Approval Letter</strong> — required before any patient can be recruited</li>
  <li>Must be notified of any <strong>Substantial Protocol Amendments</strong> that may affect the risk to participants or the scientific value</li>
  <li>Receives all SUSAR (Suspected Unexpected Serious Adverse Reaction) reports for UK trials</li>
  <li>Conducts <strong>GCP Inspections</strong> at sponsor/CRO offices and investigative sites</li>
  <li>Can suspend or terminate a trial if there are unacceptable safety concerns</li>
</ul>
<blockquote>🇬🇧 <strong>Post-Brexit change</strong>: Since the UK left the EU, the MHRA operates independently of the European Medicines Agency (EMA). UK trials no longer fall under EU Clinical Trials Regulation (EU CTR 536/2014). The UK has its own Medicines and Medical Devices Act 2021 and updated Clinical Trial Regulations (effective April 2026).</blockquote>

<h2>2. HRA — Health Research Authority</h2>
<p>The HRA brings together the Research Ethics Service and other national functions under one roof, acting as a single UK-wide gateway for research governance approvals in England. Scotland, Wales, and Northern Ireland have equivalent bodies (NHS Research Scotland, Health and Care Research Wales, and the Public Health Agency) that co-ordinate through the UK-wide system.</p>

<h3>HRA Approval</h3>
<p><strong>HRA Approval</strong> is a combined assessment that confirms the research is legally compliant and has satisfactory governance arrangements. It replaced the NHS Trust-by-Trust Research and Development (R&amp;D) approval system in England. Receiving HRA Approval means the Sponsor no longer needs to get separate R&amp;D approval from every NHS Trust running the trial — only NHS R&amp;D Capacity &amp; Capability (C&amp;C) confirmation is still needed at site level.</p>

<h3>Research Ethics Committees (RECs)</h3>
<p>The HRA oversees <strong>85 Research Ethics Committees (RECs)</strong> across the UK:</p>
<ul>
  <li><strong>65 RECs</strong> in England</li>
  <li><strong>11 RECs</strong> in Scotland</li>
  <li><strong>7 RECs</strong> in Wales</li>
  <li><strong>2 RECs</strong> in Northern Ireland</li>
</ul>
<p>One REC is assigned to review each study. The REC issues a <strong>Favourable Opinion</strong> — the ethics committee's formal statement that the study is ethically acceptable. Both the <strong>HRA Approval Letter</strong> and the <strong>REC Favourable Opinion Letter</strong> must be obtained before any site can open.</p>

<h3>What the Ethics Committee Reviews</h3>
<ul>
  <li>The scientific and statistical rationale (is this trial worth the burden it places on participants?)</li>
  <li>The recruitment and consent procedures (are patients being treated fairly and given enough information?)</li>
  <li>The risk-benefit assessment (are the risks acceptable given the potential benefits?)</li>
  <li>The Participant Information Sheet and Informed Consent Form — reviewed carefully for clarity and completeness</li>
  <li>Arrangements for participant welfare, confidentiality, and data protection (GDPR compliance)</li>
</ul>

<h2>3. NIHR — National Institute for Health and Care Research</h2>
<p>The NIHR does not grant regulatory approval, but it is the backbone of NHS-hosted clinical research in England. Funded by the UK government through the Department of Health and Social Care, it supports the infrastructure that enables clinical trials to run in NHS settings.</p>
<ul>
  <li>Provides <strong>funding</strong> for NHS clinical research infrastructure, staff, and facilities</li>
  <li>Manages <strong>15 Clinical Research Networks (CRNs)</strong> across England — regional networks that provide operational and financial support to NHS research sites</li>
  <li>The CRNs cover geographic regions and therapeutic areas (e.g., Cancer Research Network, Cardiovascular Network)</li>
  <li>Helps sites with patient identification, recruitment, and data systems</li>
</ul>

<h2>NHS R&amp;D: Capacity and Capability (C&amp;C) Confirmation</h2>
<p>For any study running at an NHS site, there is one additional site-level step: the NHS Trust's own Research &amp; Development (R&amp;D) department must confirm that the site has the <strong>Capacity</strong> (enough time, staff, and space) and <strong>Capability</strong> (relevant expertise and experience) to conduct the trial. This results in the <strong>NHS R&amp;D C&amp;C Confirmation Letter</strong>.</p>

<h2>Summary: Approvals Required Before a UK Site Can Open</h2>
<ol>
  <li><strong>MHRA Initial Approval Letter</strong> — Clinical Trial Authorisation</li>
  <li><strong>HRA Approval Letter</strong></li>
  <li><strong>REC Favourable Opinion Letter</strong> — from the assigned Research Ethics Committee</li>
  <li><strong>NHS R&amp;D C&amp;C Confirmation Letter</strong> — NHS sites only</li>
</ol>
<div class="warning-box">
  <p>⚠️ <strong>All four approvals must be in place before the first patient is consented or any trial procedure is performed.</strong> Running any study activity before approvals are received is a Serious Breach. Every approval letter — including any Amendment Approval letters — must be filed in the Investigator Site File (ISF) and uploaded to the eTMF.</p>
</div>
`;

// ── MODULE 1, LESSON 4: Therapeutic Areas ────────────────
CONTENT.therapeuticAreas = `
<h1>Therapeutic Area Overview: Oncology, Cardiology &amp; More</h1>
<p>Clinical trials are conducted across every disease area. As a CRA or site professional, you will typically develop depth in one or two therapeutic areas over your career. Each area has its own patient population, assessment tools, safety considerations, and protocol complexity. This lesson introduces the key areas featured in the UK trial landscape.</p>
<hr/>

<h2>Oncology</h2>
<p>Oncology is the single largest therapeutic area in global clinical trial activity, representing nearly 30% of all active trials. UK oncology trials are predominantly run through Cancer Research UK-affiliated centres, NHS Cancer Alliances, and NIHR-funded research hospitals.</p>

<h3>Breast Cancer</h3>
<ul>
  <li>Trials stratify patients by receptor status: <strong>ER+ (oestrogen receptor positive)</strong>, <strong>PR+ (progesterone receptor positive)</strong>, <strong>HER2+</strong>, or <strong>Triple Negative Breast Cancer (TNBC)</strong></li>
  <li>Studies may target the neoadjuvant (before surgery), adjuvant (after surgery), or metastatic setting</li>
  <li>Novel agents include CDK4/6 inhibitors (e.g. palbociclib), PARP inhibitors, and antibody-drug conjugates (ADCs)</li>
  <li>Source documents: pathology reports, surgical histology, imaging (CT, MRI, bone scan), oncology clinic letters</li>
</ul>

<h3>Prostate Cancer</h3>
<ul>
  <li>PSA (Prostate Specific Antigen) levels are a key monitoring biomarker throughout trials</li>
  <li>Androgen deprivation therapy (ADT) is the backbone of treatment — many trials layer novel agents on top</li>
  <li>Trial settings: localised, locally advanced, metastatic castration-sensitive (mCSPC), metastatic castration-resistant (mCRPC)</li>
  <li>LHRH analogues and next-generation androgen receptor (AR) inhibitors (e.g. enzalutamide, apalutamide) are common IMPs</li>
</ul>

<h3>Cervical Cancer</h3>
<ul>
  <li>HPV (Human Papillomavirus) status is a key eligibility biomarker</li>
  <li>FIGO staging (I–IV) determines eligibility — many trials focus on locally advanced or recurrent/metastatic disease</li>
  <li>Radiosensitising agents and checkpoint inhibitors (PD-1/PD-L1 inhibitors) are increasingly studied</li>
  <li>Colposcopy and gynaecological examination records are often source documents</li>
</ul>

<h3>Diffuse Large B-Cell Lymphoma (DLBCL)</h3>
<ul>
  <li>DLBCL is an aggressive B-cell non-Hodgkin lymphoma — one of the most common lymphoma subtypes in clinical trials</li>
  <li><strong>Rapid disease progression</strong> means screening timelines are extremely tight — delays can render patients ineligible</li>
  <li>CHOP-based chemotherapy regimens and CD20-targeted monoclonal antibodies (e.g. rituximab, obinutuzumab) are mainstays</li>
  <li>CAR-T cell therapies represent an emerging class with special site requirements (apheresis, certified administration centres)</li>
  <li>CNS (central nervous system) prophylaxis and monitoring requirements are commonly included</li>
</ul>
<div class="warning-box">
  <p>⚠️ <strong>Oncology trials require Data Safety Monitoring Boards (DSMBs) or Data Monitoring Committees (DMCs)</strong> — independent committees that review unblinded interim safety and efficacy data. Sites may receive temporary holds on enrolment pending DSMB review.</p>
</div>

<hr/>
<h2>Cardiology</h2>
<p>Cardiovascular trials often involve large numbers of patients over long follow-up periods (2–5 years), with event-driven endpoints (the trial continues until a pre-specified number of events — heart attacks, strokes, cardiovascular deaths — occurs).</p>

<h3>Hypertension</h3>
<ul>
  <li><strong>Ambulatory Blood Pressure Monitoring (ABPM)</strong>: 24-hour BP monitoring is frequently used as a primary or secondary endpoint — accurate device calibration and patient instruction are critical</li>
  <li>Concomitant medications are complex — many antihypertensives interact with IMPs</li>
  <li>Office BP measurements must be taken in standardised conditions (patient seated quietly for 5 minutes, correct cuff size)</li>
</ul>

<h3>Coronary Heart Disease</h3>
<ul>
  <li><strong>MACE endpoints</strong>: Major Adverse Cardiovascular Events (cardiovascular death, non-fatal MI, non-fatal stroke) are typical primary endpoints</li>
  <li>Coronary angiography images and cardiac catheterisation reports are key source documents</li>
  <li>Events Adjudication Committees (EACs): independent committees review and adjudicate all potential MACE events — sites must provide supporting documentation promptly</li>
  <li>Long-term compliance monitoring (medication adherence, lifestyle modifications) is a significant site workload</li>
</ul>

<hr/>
<h2>Dermatology</h2>
<p>Dermatology trials often use validated, standardised disease activity scales as primary endpoints. Accuracy and inter-rater reliability in scoring are critical — sites typically require rater training and certification.</p>
<ul>
  <li><strong>PASI (Psoriasis Area and Severity Index)</strong>: 0–72 score assessing psoriasis across 4 body regions</li>
  <li><strong>IGA (Investigator Global Assessment)</strong>: 5-point scale of overall disease severity</li>
  <li><strong>EASI (Eczema Area and Severity Index)</strong>: Used in atopic dermatitis trials</li>
  <li>Standardised photography protocols: consistent lighting, distance, and positioning are required</li>
  <li>IMPs: biologics (IL-17, IL-23, IL-4/13 inhibitors) and small-molecule JAK inhibitors are currently dominant</li>
</ul>

<hr/>
<h2>Gastroenterology</h2>
<p>GI trials often involve invasive assessments (endoscopy, colonoscopy) as part of the primary endpoint evaluation.</p>
<ul>
  <li>Endoscopy teams must be trained on the specific scoring systems used (e.g. Mayo Endoscopic Score for ulcerative colitis, SES-CD for Crohn's disease)</li>
  <li><strong>Central reading</strong>: Endoscopy images are often sent to a central reader (an expert gastroenterologist not at the site) for blinded assessment — images must be of specified quality</li>
  <li>Patient-Reported Outcome (PRO) instruments: daily diaries, symptom questionnaires (stool frequency, rectal bleeding scores) are key data sources</li>
  <li>Disease activity indices: <strong>Mayo Score</strong> (ulcerative colitis), <strong>CDAI (Crohn's Disease Activity Index)</strong>, <strong>HBI (Harvey-Bradshaw Index)</strong></li>
</ul>

<hr/>
<div class="key-points">
  <div class="key-points-title">✅ Why Therapeutic Area Knowledge Matters</div>
  <ul>
    <li>Helps you understand eligibility criteria and catch screen failures before they happen</li>
    <li>Enables meaningful SDV — you know what the source data should look like and whether values are plausible</li>
    <li>Improves patient safety oversight — you anticipate which adverse events are likely and ensure they are correctly graded</li>
    <li>Makes you a more credible partner to the site team — they trust a monitor who understands their patients</li>
    <li>Accelerates your career — therapeutic area expertise commands higher rates and better opportunities</li>
  </ul>
</div>
`;

// ── MODULE 2, LESSON 1: Feasibility ──────────────────────
CONTENT.feasibility = `
<h1>Site Feasibility: Process and Purpose</h1>
<p>Before committing resources to a site, the Sponsor or CRO must confirm that the site has the capacity (time, staff, space) and capability (expertise, patient population) to conduct the trial successfully. This is the <strong>Feasibility Assessment</strong> — and it is the very first step in the site relationship.</p>
<hr/>

<h2>Why Feasibility Matters</h2>
<p>Poor site selection is one of the most common reasons clinical trials fail to deliver on time and on budget. Sites that cannot recruit sufficient patients, or lack the staff or infrastructure to follow the protocol, create delays, protocol deviations, and poor data quality. A rigorous feasibility process protects the trial by ensuring that only suitable sites are selected.</p>

<h2>Step 1: Confidentiality Disclosure Agreement (CDA)</h2>
<p>Before any trial-specific information is shared with a potential site, the Principal Investigator (PI) or authorised institution representative must sign a <strong>Confidentiality Disclosure Agreement (CDA)</strong> — also called a Non-Disclosure Agreement (NDA). This legally protects the Sponsor's proprietary information (the IMP, the protocol design, business strategy) from being shared outside the site.</p>
<div class="warning-box">
  <p>⚠️ The CDA must be fully executed <strong>before</strong> any protocol synopsis, IB, or confidential study information is provided to the site. Sharing information before CDA execution is a legal and regulatory risk.</p>
</div>

<h2>Step 2: The Protocol Synopsis</h2>
<p>Along with (or shortly after) the CDA, the site receives a <strong>Protocol Synopsis</strong> — a condensed summary of the trial design. This is not the full protocol, but enough information for the site to assess whether the study is relevant to their patient population and feasible within their setting. The synopsis typically covers:</p>
<ul>
  <li>Study indication and IMP overview</li>
  <li>Inclusion and exclusion criteria (summary)</li>
  <li>Visit schedule and key assessments</li>
  <li>Estimated number of patients to be recruited per site</li>
  <li>Anticipated study duration</li>
</ul>

<h2>Step 3: The Feasibility Questionnaire (FQ)</h2>
<p>The Feasibility Questionnaire is a structured document sent to the site that asks specific questions to help the Sponsor/CRO assess suitability. The site's responses are scored and reviewed by the study team.</p>

<h3>Key Questions in a Typical Feasibility Questionnaire</h3>
<ol>
  <li>How many patients with this indication do you see annually? What is your estimated monthly recruitment rate?</li>
  <li>Are there currently any competing trials in this indication running at your site?</li>
  <li>Do you have dedicated research staff — a Research Nurse, Study Co-ordinator, Data Manager?</li>
  <li>Does your pharmacy have capacity to receive, store, and dispense investigational product (including temperature-controlled storage)?</li>
  <li>Do you have access to required facilities (imaging suite, specialist laboratory, procedure room)?</li>
  <li>Does the PI have experience in clinical trials in this therapeutic area? How many studies have they led in the past 5 years?</li>
  <li>Are all relevant staff GCP-trained and up to date (within 2 years)?</li>
  <li>What is your site's current capacity for new study start-ups?</li>
</ol>

<h2>Feasibility Assessment Outcome</h2>
<p>The study team scores and reviews all returned feasibility questionnaires and makes a selection decision. Sites that are selected proceed to the <strong>Site Selection Visit (SSV)</strong>. Sites not selected receive formal notification. The process is competitive — sites that respond promptly, completely, and with realistic recruitment projections tend to be selected.</p>
<div class="key-points">
  <div class="key-points-title">✅ Tips for Sites Completing a Feasibility Questionnaire</div>
  <ul>
    <li>Be realistic — overpromising recruitment numbers leads to underperformance and site relationship strain</li>
    <li>Respond quickly — speed of response signals organisational capability</li>
    <li>Highlight relevant PI publications and prior trial experience</li>
    <li>Flag resource constraints honestly — the Sponsor may be able to provide support</li>
    <li>Ensure the PI reviews and endorses the submission before sending</li>
  </ul>
</div>
`;

// ── MODULE 2, LESSON 2: SSV ───────────────────────────────
CONTENT.ssv = `
<h1>Site Selection Visit (SSV): Objectives &amp; Documentation</h1>
<p>The Site Selection Visit (SSV) is the first formal visit by a CRA or sponsor representative to an investigative site. It follows a positive feasibility assessment and is designed to <strong>confirm in person</strong> that the site can conduct the trial compliantly and effectively.</p>
<hr/>

<h2>Primary Objectives of the SSV</h2>
<ol>
  <li><strong>Introduce the study</strong> to key site personnel: PI, Sub-Investigators, Research Nurses, Study Co-ordinator, Pharmacist</li>
  <li><strong>Confirm adequate resources</strong>: staff, time, equipment, patient population</li>
  <li><strong>Conduct a facility tour</strong>: verify suitability of all areas that will be used in the trial</li>
  <li><strong>Collect key documents</strong>: PI and Sub-I CVs, GCP certificates</li>
  <li><strong>Understand recruitment strategy</strong>: how patients will be identified, prescreened, and approached</li>
  <li><strong>Confirm staff experience</strong> in the relevant therapeutic area</li>
  <li><strong>Identify early risks</strong>: competing trials, upcoming staff changes, equipment limitations</li>
</ol>

<h2>The Facility Tour: What to Assess</h2>
<table>
  <tr><th>Area</th><th>What to Verify</th></tr>
  <tr><td><strong>Clinical Assessment Rooms</strong></td><td>Availability, privacy, examination couch, vital signs equipment (calibrated), ECG machine if required</td></tr>
  <tr><td><strong>Pharmacy</strong></td><td>IMP storage (temperature-controlled fridges/freezers with alarms and logs), dispensing area, accountability procedures, qualified pharmacist availability</td></tr>
  <tr><td><strong>Laboratory</strong></td><td>Sample processing equipment, centrifuge, cold chain capability, central lab logistics (courier arrangements)</td></tr>
  <tr><td><strong>Imaging / Diagnostics</strong></td><td>CT scanner, MRI, spirometry, ABPM device — calibration records, technician availability</td></tr>
  <tr><td><strong>IT Systems</strong></td><td>Computers with internet access for EDC entry, VPN if required, EDC system compatibility</td></tr>
  <tr><td><strong>ISF Storage</strong></td><td>Lockable, fireproof or fire-resistant, temperature/humidity controlled, dedicated to trial documents</td></tr>
  <tr><td><strong>Patient Waiting Area</strong></td><td>Comfortable, suitable for vulnerable populations, accessible</td></tr>
</table>

<h2>Documents Collected at SSV</h2>
<ul>
  <li><strong>PI CV</strong> — signed and dated (must be within 3 years)</li>
  <li><strong>Sub-Investigator CVs</strong> — for all doctors who may prescribe or assess patients in the trial</li>
  <li><strong>GCP certificates</strong> — for PI and sub-Is (must be within 2 years; ICH GCP E6(R2/R3) or equivalent)</li>
  <li>Signed CDA (if not already obtained)</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 Note on CVs and GCP</div>
  <p><strong>CVs</strong> must be signed, dated, and renewed every <strong>3 years</strong>. <strong>GCP certificates</strong> must be renewed every <strong>2 years</strong>. Outdated documents are a common ISF finding during monitoring visits — collect them early and track expiry dates.</p>
</div>

<h2>SSV Report</h2>
<p>After the visit, the CRA completes the <strong>Site Selection Visit Report</strong> and submits it to the study team within <strong>15 working days</strong>. The report covers:</p>
<ul>
  <li>Summary of facility and staff assessment</li>
  <li>Confirmation of site suitability (or rationale for non-selection)</li>
  <li>Documents collected</li>
  <li>Any outstanding items or concerns identified</li>
  <li>Recommended action: proceed to SIV / do not proceed / proceed with conditions</li>
</ul>
<blockquote>📋 <strong>Best practice</strong>: A well-written SSV report is your contemporaneous record of the site's status at selection. If a site later struggles with recruitment or has a deviation, the SSV report is the baseline against which site capability was assessed. Make it thorough.</blockquote>
`;

// ── MODULE 3, LESSON 1: SIV ───────────────────────────────
CONTENT.siv = `
<h1>Site Initiation Visit (SIV): Preparation &amp; Execution</h1>
<p>The Site Initiation Visit (SIV) is the most operationally intensive visit in the clinical trial lifecycle. It is the point at which the site formally transitions from "selected" to "active" — from this visit, the site is trained, documented, and authorised to begin screening and enrolling patients.</p>
<hr/>

<h2>The Purpose of the SIV</h2>
<p>The SIV achieves three things simultaneously:</p>
<ol>
  <li><strong>Training</strong>: Every member of the site team is trained on the protocol, procedures, and systems</li>
  <li><strong>Documentation</strong>: All essential documents are collected, reviewed, and filed in the ISF</li>
  <li><strong>Activation</strong>: The site is confirmed ready — the Sponsor issues a formal Site Activation notification</li>
</ol>
<div class="warning-box">
  <p>⚠️ <strong>No patients may be screened or consented until the SIV is complete, all essential documents are in the ISF, and the Sponsor has issued written Site Activation confirmation.</strong> Enrolling before activation is a Major Protocol Deviation.</p>
</div>

<h2>Pre-SIV Checklist: Before You Arrive</h2>
<p>The CRA must verify all of the following are in place before scheduling the SIV:</p>
<ul>
  <li>All regulatory approvals received: MHRA CTA, HRA Approval, REC Favourable Opinion, NHS R&amp;D C&amp;C (where applicable)</li>
  <li>Clinical Trial Agreement (CTA) fully executed between the site/Trust and the Sponsor</li>
  <li>Staff CVs and GCP certificates collected and current</li>
  <li>EDC access set up and confirmed for all data-entering staff</li>
  <li>IRT access set up (if applicable)</li>
  <li>IMP shipped to pharmacy and receipt confirmed (if required before SIV)</li>
  <li>Laboratory kits shipped and received</li>
  <li>ISF binder set up with correct index tabs</li>
  <li>All SSV action items closed</li>
</ul>

<h2>Training Conducted During the SIV</h2>
<table>
  <tr><th>Training Topic</th><th>Audience</th><th>Key Content</th></tr>
  <tr><td><strong>Protocol Overview</strong></td><td>All site staff</td><td>Study rationale, objectives, endpoints, eligibility criteria, Schedule of Assessments</td></tr>
  <tr><td><strong>Investigator's Brochure</strong></td><td>PI, Sub-Is, Research Nurses</td><td>IMP pharmacology, non-clinical/clinical safety data, Reference Safety Information</td></tr>
  <tr><td><strong>Pharmacy Manual</strong></td><td>Pharmacist, Research Nurse</td><td>IMP receipt, storage conditions, preparation, dispensing, accountability, return/destruction</td></tr>
  <tr><td><strong>Schedule of Assessments</strong></td><td>All clinical staff</td><td>What procedure happens at which visit, timing windows, what constitutes a protocol deviation</td></tr>
  <tr><td><strong>Laboratory Manual</strong></td><td>Research Nurse, Lab technician</td><td>Sample collection tubes, processing steps, storage, labelling, shipping, central lab contacts</td></tr>
  <tr><td><strong>Informed Consent Procedure</strong></td><td>PI, Sub-Is, delegated Research Nurses</td><td>Who may consent, when consent must be obtained, re-consent triggers, documentation requirements</td></tr>
  <tr><td><strong>EDC Training</strong></td><td>All data-entering staff</td><td>How to navigate the CRF, enter data, correct errors, respond to queries</td></tr>
  <tr><td><strong>IRT / Randomisation System</strong></td><td>Pharmacist, Research Nurse</td><td>How to screen, randomise, and assign IMP in the IRT system</td></tr>
  <tr><td><strong>SAE Reporting</strong></td><td>PI, Research Nurse, Co-ordinator</td><td>24-hour reporting pathway, SAE form completion, sponsor contacts, follow-up obligations</td></tr>
</table>

<h2>Documents Collected and Finalised at the SIV</h2>
<ul>
  <li><strong>Protocol Signature Page (PSP)</strong> — signed and dated by the PI before the visit ends</li>
  <li><strong>Delegation Log</strong> — completed with all staff, tasks, and start dates; countersigned by PI</li>
  <li><strong>Training Log</strong> — all SIV training documented, signed by trainer and each trainee</li>
  <li><strong>FDA 1572 / Site Investigation Form (SIF)</strong> — signed by PI</li>
  <li><strong>Informed Consent Form and PIS</strong> — master approved versions filed</li>
  <li>Updated CVs and GCP certificates for any staff not yet collected</li>
  <li>Pharmacy temperature logs (if IMP already received)</li>
  <li>Lab manual receipt confirmation</li>
  <li>ISF completeness checklist — reviewed and signed off</li>
</ul>

<h2>SIV Report</h2>
<p>The SIV Report must be finalised and distributed within <strong>10 working days</strong> of the visit. It documents:</p>
<ul>
  <li>All training delivered and attendees</li>
  <li>All documents collected and their filing location</li>
  <li>Any outstanding items (action items with owner and due date)</li>
  <li>Confirmation of site activation status</li>
</ul>
<blockquote>💡 The SIV report becomes a critical reference document if a site is later audited or inspected. Inspectors will compare the SIV report against the ISF to verify that all essential documents were in place before patients were enrolled.</blockquote>
`;

// ── MODULE 3, LESSON 2: Key Documents ────────────────────
CONTENT.keyDocs = `
<h1>Key Start-up Documents: Protocol, IB, Consent &amp; Delegation Log</h1>
<p>Every clinical trial generates a specific set of essential documents that must be maintained throughout the study. These documents collectively demonstrate that the trial was conducted in compliance with GCP, the approved protocol, and applicable regulations. They are filed at the site in the <strong>Investigator Site File (ISF)</strong> and by the Sponsor in the electronic <strong>Trial Master File (eTMF)</strong>.</p>
<hr/>

<h2>1. The Protocol</h2>
<p>The protocol is the <strong>complete manual for the trial</strong>. It defines exactly how every aspect of the study will be conducted. Every site team member with any responsibility in the trial must read, understand, and follow the protocol.</p>

<h3>Key Sections of a Clinical Trial Protocol</h3>
<ul>
  <li><strong>Protocol Signature Page (PSP)</strong>: Must be signed and dated by the Principal Investigator <em>before</em> the trial starts at that site. It is the PI's formal commitment to conduct the study in accordance with the protocol.</li>
  <li><strong>Synopsis / Summary</strong>: A brief overview of the key design elements — useful for rapid reference during the trial</li>
  <li><strong>Study Rationale / Background</strong>: The scientific justification — why this IMP, why this patient population, why this design</li>
  <li><strong>Objectives and Endpoints</strong>: Primary, secondary, and exploratory endpoints with precise definitions</li>
  <li><strong>Inclusion and Exclusion Criteria</strong>: The eligibility rules — arguably the most critical section for the site team to master; every patient enrolled must meet all inclusion criteria and none of the exclusion criteria</li>
  <li><strong>Schedule of Assessments (SoA)</strong>: The table showing what procedure/assessment is required at each visit, in what sequence, and within what time window</li>
  <li><strong>Trial Design and Statistical Analysis Plan</strong>: Randomisation, blinding, sample size, primary analysis</li>
  <li><strong>IMP Information</strong>: Dosing, administration, storage, accountability requirements</li>
  <li><strong>Safety Monitoring</strong>: AE/SAE definitions, reporting requirements, stopping rules</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 Protocol Amendments</div>
  <p>The protocol can be amended during the trial by the Sponsor with regulatory authority approval. Any <strong>Substantial Amendment</strong> (one that may affect participant safety or scientific integrity) requires MHRA and REC re-approval before implementation. Non-substantial amendments may be implemented after notification. All amendment approval letters must be filed in the ISF.</p>
</div>

<h2>2. The Investigator's Brochure (IB)</h2>
<p>The IB is the Sponsor's compilation of all known information about the IMP that is relevant to the stage of clinical development. It is the primary reference for the site team on the IMP's pharmacology, safety, and clinical experience.</p>

<h3>Contents of the IB</h3>
<ul>
  <li><strong>Summary</strong>: Brief overview of all key IMP information</li>
  <li><strong>Physical, Chemical &amp; Pharmaceutical Properties</strong>: What the drug looks like, how it is formulated, stability data</li>
  <li><strong>Non-Clinical Studies</strong>: Animal pharmacology, pharmacokinetics, and toxicology data</li>
  <li><strong>Effects in Humans</strong>: PK/PD in humans, safety and efficacy from earlier clinical studies</li>
  <li><strong>Reference Safety Information (RSI)</strong>: The current list of expected adverse reactions — used to determine whether a newly observed SAR is <em>expected</em> or <em>unexpected</em> (which determines SUSAR classification)</li>
  <li><strong>Marketing Experience</strong>: If the drug is approved in any country, this section captures the real-world safety profile</li>
  <li><strong>Summary of Data and Guidance for Investigators</strong>: Practical safety guidance for the clinical team</li>
</ul>
<blockquote>📌 <strong>The IB is a living document.</strong> It is updated by the Sponsor throughout the trial as new safety or clinical data emerge. When a new IB version is issued, all site staff must be retrained and the training documented. The old version is archived, not destroyed.</blockquote>

<h2>3. Informed Consent Form (ICF) &amp; Patient Information Sheet (PIS)</h2>
<p>Informed consent is one of the most fundamental ethical obligations in clinical research. The process — and the documentation of it — must be meticulous.</p>

<h3>The Two-Part Consent Package</h3>
<ul>
  <li><strong>Patient Information Sheet (PIS)</strong>: A plain-language document explaining the study to the participant. It must be written at an appropriate reading level (typically Grade 6–8 in the UK). It must explain: what the study is about, what participation involves (visits, procedures, time commitment), possible risks and benefits, the right to withdraw at any time without giving a reason, how personal data will be used and protected, who to contact with questions.</li>
  <li><strong>Informed Consent Form (ICF)</strong>: The signature document. Signed and dated by both the participant and the investigator who obtained consent. A copy must be given to the participant on the day of signing. The original is filed in the ISF.</li>
</ul>

<h3>The Informed Consent Process</h3>
<ol>
  <li>The consenting investigator introduces the study and provides the PIS and ICF</li>
  <li>The participant is given <strong>adequate time</strong> to read, consider, and discuss with family — never rushed</li>
  <li>All questions are answered fully and honestly</li>
  <li>Both the participant and the investigator sign and date the ICF <em>before any trial procedure begins</em></li>
  <li>A signed copy is given to the participant immediately</li>
  <li>The original is filed in the ISF; a note is made in the medical record that consent was obtained</li>
</ol>
<div class="warning-box">
  <p>⚠️ Only investigators named on the <strong>Delegation Log</strong> as authorised to obtain informed consent may do so. Consent obtained by a non-delegated person, or before the REC-approved version of the ICF was available, is a Major Protocol Deviation.</p>
</div>

<h2>4. The Delegation Log</h2>
<p>The Delegation Log — sometimes called the <strong>Staff Signature and Authority Log</strong> — is the formal record of which tasks the PI has delegated to which members of the site team.</p>
<ul>
  <li>Lists every staff member participating in the trial with their role, qualifications, and delegated tasks</li>
  <li>Each task must be specifically listed — e.g. "informed consent", "physical examination", "EDC data entry", "IMP dispensing", "sample collection"</li>
  <li>Each person must be <strong>trained on their tasks before delegation is granted</strong></li>
  <li>Includes a <strong>start date</strong> and an <strong>end date</strong> for each delegation — end date is completed when the staff member leaves the study</li>
  <li>Must be <strong>countersigned by the Principal Investigator</strong></li>
  <li>A <strong>living document</strong> — updated whenever staff join or leave the study</li>
  <li>Filed in the ISF and uploaded to the eTMF at regular intervals</li>
</ul>

<h2>5. Training Log</h2>
<p>The Training Log records all study-specific training completed by site staff. It is a living document maintained throughout the trial.</p>
<ul>
  <li>Training entries for: protocol, IB, pharmacy manual, lab manual, EDC, IRT, SAE reporting, consent procedure</li>
  <li>Each entry must include: date, training topic, trainer name and signature, trainee name and signature</li>
  <li>Training must be documented <em>before</em> the staff member begins performing their delegated tasks</li>
</ul>

<h2>6. FDA 1572 / Site Investigation Form (SIF)</h2>
<p>For studies with FDA oversight (or where the Sponsor chooses to use this form globally), the FDA 1572 — or equivalent SIF — is a formal commitment document signed by the PI. It contains:</p>
<ul>
  <li>Name and address of the PI, Sub-Investigators, and all co-investigators</li>
  <li>The investigator's education, training, and expertise</li>
  <li>Name and address of all research facilities used in the study (clinics, labs, pharmacies, imaging centres)</li>
  <li>Name and address of the IRB/IEC/REC responsible for the study</li>
  <li>The PI's declaration to: conduct the study per the protocol and GCP; personally supervise the study; obtain informed consent; report all AEs and SAEs; maintain adequate records; permit inspection of records</li>
</ul>

<h2>Other Documents Filed in the ISF</h2>
<ul>
  <li><strong>ISF Checklist</strong>: A living document tracking completeness — reviewed at every monitoring visit</li>
  <li><strong>Pre-screening Log</strong>: Records patients considered before formal consent (may be based on medical records review)</li>
  <li><strong>Subject Screening Log</strong>: All patients who have signed consent — includes screen failures with reasons</li>
  <li><strong>Subject Identification Log</strong>: Maps each patient's trial ID number to their real identity — held at site only, never shared with Sponsor</li>
  <li><strong>Subject Enrolment Log</strong>: All randomised / enrolled patients with enrolment dates</li>
  <li><strong>IMP Accountability Logs</strong>: All IMP received, dispensed per patient, returned by patients, destroyed — must balance to zero at closure</li>
  <li><strong>Annual Progress Reports</strong>: Submitted to the REC every year</li>
  <li><strong>Site Visit Log</strong>: Record of all monitoring visits conducted at the site</li>
  <li><strong>Email Communications</strong>: Trial-relevant correspondence filed and retrievable</li>
</ul>
<div class="key-points">
  <div class="key-points-title">✅ The Golden Rule</div>
  <p><strong>"If it was not documented, it was not done."</strong> This is the foundational principle of GCP documentation. In the absence of a record, a regulatory inspector will treat the absence of documentation as the absence of the action itself — regardless of whether it actually occurred.</p>
</div>
`;

// ── MODULE 4, LESSON 1: Monitoring Visit ─────────────────
CONTENT.monitoring = `
<h1>Routine &amp; Interim Monitoring Visits (RMV / IMV)</h1>
<p>Monitoring is the process by which the Sponsor ensures that the trial is being conducted in compliance with the approved protocol, GCP, and applicable regulatory requirements. For the CRA, the monitoring visit is the primary — and most visible — part of the role.</p>
<hr/>

<h2>Types of Monitoring Visits</h2>
<ul>
  <li><strong>Routine Monitoring Visit (RMV)</strong>: Scheduled, regular visits conducted at intervals defined in the Monitoring Plan</li>
  <li><strong>Interim Monitoring Visit (IMV)</strong>: Conducted between scheduled visits when a specific issue requires attention — e.g. a cluster of deviations, a safety signal, or a recruitment concern</li>
  <li><strong>Remote Monitoring Visit</strong>: Conducted off-site using EDC data review, document sharing platforms, and telephone/video — increasingly common since the COVID-19 pandemic and formally supported by ICH GCP E6(R3)</li>
</ul>

<h2>Before the Visit</h2>
<ul>
  <li>Agree the visit date with the site in advance — confirm with an <strong>official visit confirmation letter</strong> sent to the PI</li>
  <li>Review the previous monitoring visit report and all open Action Items</li>
  <li>Review all data entered in the EDC since the last visit — check for missing data, implausible values, and late entries</li>
  <li>Check the query status — how many open queries are there? Are any aged?</li>
  <li>Review safety event status — any new AEs/SAEs entered since last visit?</li>
  <li>Check if any protocol amendments have been issued — if so, verify the site has received, trained on, and implemented them</li>
  <li>Prepare the monitoring visit agenda and share it with the site in advance</li>
  <li>Review the Delegation Log — any staff changes expected?</li>
</ul>

<h2>Core Activities During the Visit</h2>

<h3>1. Source Data Verification (SDV)</h3>
<p><strong>SDV</strong> is the direct comparison of data entered into the EDC (eCRF) against the <strong>original source documents</strong> — the patient's medical records, lab reports, ECG printouts, clinic letters, nursing notes. The CRA verifies that what was entered in the system accurately and completely reflects what actually happened to the patient.</p>
<p>For each data point verified, the CRA confirms:</p>
<ul>
  <li><strong>Accuracy</strong>: The EDC value matches the source document exactly</li>
  <li><strong>Completeness</strong>: No required data fields are missing or blank</li>
  <li><strong>Consistency</strong>: The same value appears the same way in different places (e.g. date of birth in the ICF matches the EDC)</li>
  <li><strong>Timeliness</strong>: Data was entered within the timeframes specified in the monitoring plan</li>
</ul>

<h3>2. Source Document Review (SDR)</h3>
<p>SDR is a broader review of source documents for clinical context and completeness — without necessarily verifying every data point against the EDC. Used in <strong>Risk-Based Monitoring (RBM)</strong> approaches where not all data requires 100% SDV. Focus is placed on critical data (primary endpoints, eligibility criteria, safety data) while non-critical data is sampled.</p>

<h3>3. Protocol Compliance Check</h3>
<p>The CRA verifies that trial procedures were conducted exactly as required by the protocol:</p>
<ul>
  <li>Were all assessments at each visit performed within the protocol-defined time window?</li>
  <li>Were eligibility criteria met for every enrolled patient?</li>
  <li>Was consent obtained before any trial procedure?</li>
  <li>Was IMP administered at the correct dose on the correct schedule?</li>
  <li>Were mandatory laboratory samples collected at the correct time points?</li>
</ul>

<h3>4. AE and SAE Log Review</h3>
<ul>
  <li>Review all adverse events recorded since the last visit</li>
  <li>Verify that events are correctly graded (using CTCAE or protocol-specific grading)</li>
  <li>Confirm causality assessment has been made by the PI</li>
  <li>For SAEs: verify that the 24-hour reporting timeline to the Sponsor was met</li>
  <li>Check that SAE follow-up reports have been submitted and events are being followed to resolution</li>
</ul>

<h3>5. Protocol Deviation (PD) and Non-Compliance (NC) Log Review</h3>
<ul>
  <li>Review the PD log — are all deviations documented?</li>
  <li>Confirm classification (minor vs. major) is appropriate</li>
  <li>Verify that CAPA plans are in place for all major deviations</li>
  <li>Confirm the PI has signed and dated the PD log</li>
</ul>

<h3>6. ISF Review</h3>
<ul>
  <li>Check the ISF against the completeness checklist</li>
  <li>Verify all documents are the correct, current version</li>
  <li>Check that the Delegation Log is up to date — staff who have joined or left have been added/closed</li>
  <li>Confirm Training Log reflects all training completed since the last visit</li>
  <li>Check consent forms — correct version, properly signed and dated</li>
</ul>

<h3>7. IMP Accountability and Reconciliation</h3>
<ul>
  <li>Review the IMP accountability logs with the pharmacist</li>
  <li>Verify quantities received, dispensed to each patient, returned by patients, and any destroyed stock</li>
  <li>Check IMP storage temperature logs — confirm no temperature excursions</li>
  <li>Confirm sufficient IMP stock to continue the trial until the next visit</li>
</ul>

<h3>8. Lab Kit and Expiration Review</h3>
<ul>
  <li>Inspect lab kits provided by the central laboratory</li>
  <li>Check expiry dates on all kits — flag and arrange replacement for any nearing expiry</li>
  <li>Confirm adequate stock for upcoming visits</li>
  <li>Check cold storage conditions for temperature-sensitive kits</li>
</ul>

<h3>9. Debrief with PI and Study Team</h3>
<p>End every monitoring visit with a face-to-face or telephone debrief with the PI (or delegate). Cover:</p>
<ul>
  <li>Key findings from the visit — both positive and areas requiring action</li>
  <li>Any immediate patient safety concerns</li>
  <li>Outstanding action items and agreed timelines</li>
  <li>Upcoming milestones (next patient visit, data cut, interim analysis)</li>
  <li>Recruitment status and any barriers to enrolment</li>
</ul>

<h2>After the Visit</h2>
<ul>
  <li>Write and submit the Monitoring Visit Report within <strong>10 working days</strong></li>
  <li>Issue a <strong>follow-up letter</strong> to the site confirming all findings and agreed action items with due dates</li>
  <li>Raise Action Items (AIs) in the CTMS</li>
  <li>Raise EDC queries for any data discrepancies found during SDV</li>
  <li>Update metrics (SDV coverage %, query rate, deviation rate, AI closure rate)</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 Risk-Based Monitoring (RBM)</div>
  <p>ICH GCP E6(R3) supports a risk-proportionate monitoring approach. Not all data requires 100% SDV. <strong>Critical data</strong> (primary endpoints, eligibility criteria, informed consent, SAEs) receives 100% SDV. <strong>Secondary and exploratory data</strong> is sampled based on risk signals and historical site performance. This makes monitoring more efficient without compromising data integrity.</p>
</div>
`;

// ── MODULE 4, LESSON 2: AEs/SAEs/Deviations ──────────────
CONTENT.adverseEvents = `
<h1>Adverse Events, SAEs, SUSARs &amp; Protocol Deviations</h1>
<p>Understanding, correctly classifying, and responding to clinical trial events — adverse events, serious adverse events, safety reactions, and protocol deviations — is one of the most critical competencies in clinical research. Errors in event management can directly compromise patient safety and data integrity.</p>
<hr/>

<h2>Adverse Event (AE)</h2>
<p>An <strong>Adverse Event (AE)</strong> is defined as:</p>
<blockquote>Any untoward medical occurrence in a patient or clinical investigation subject administered a pharmaceutical product, which does not necessarily have a causal relationship with this treatment.</blockquote>
<p>This broad definition includes: any unfavourable or unintended sign (including an abnormal laboratory finding), symptom, or disease temporally associated with the use of an IMP — whether or not considered related to the IMP.</p>

<h3>CTCAE Grading</h3>
<p>The <strong>Common Terminology Criteria for Adverse Events (CTCAE)</strong> is the standard grading system, especially in oncology, for describing severity:</p>
<table>
  <tr><th>Grade</th><th>Severity</th><th>Description</th></tr>
  <tr><td><strong>Grade 1</strong></td><td>Mild</td><td>Asymptomatic or mild symptoms; clinical/diagnostic observations only; intervention not indicated</td></tr>
  <tr><td><strong>Grade 2</strong></td><td>Moderate</td><td>Minimal, local or non-invasive intervention indicated; limiting age-appropriate instrumental ADL</td></tr>
  <tr><td><strong>Grade 3</strong></td><td>Severe</td><td>Severe or medically significant but not immediately life-threatening; hospitalisation or prolongation indicated; disabling; limiting self-care ADL</td></tr>
  <tr><td><strong>Grade 4</strong></td><td>Life-threatening</td><td>Life-threatening consequences; urgent intervention indicated</td></tr>
  <tr><td><strong>Grade 5</strong></td><td>Death</td><td>Death related to AE</td></tr>
</table>
<p>AEs must be reported to the Sponsor via the eCRF and are summarised in Annual Progress Reports to the Ethics Committee.</p>

<h2>Serious Adverse Event (SAE)</h2>
<p>An SAE is an untoward medical occurrence that meets <strong>any one</strong> of the following criteria:</p>
<ol>
  <li>Results in <strong>death</strong></li>
  <li>Is <strong>life-threatening</strong> (places the patient at immediate risk of death at the time of the event)</li>
  <li>Requires <strong>inpatient hospitalisation</strong> or <strong>prolongation of existing hospitalisation</strong></li>
  <li>Results in <strong>persistent or significant disability or incapacity</strong></li>
  <li>Results in a <strong>congenital malformation or birth defect</strong></li>
  <li>Is a <strong>medically important event</strong> — an event that may not be immediately life-threatening but that requires medical or surgical intervention to prevent one of the above outcomes (e.g. all malignancies, pregnancy)</li>
</ol>
<div class="warning-box">
  <p>⚠️ <strong>SAEs must be reported to the Sponsor within 24 hours of the site/PI becoming aware of the event.</strong> An initial, incomplete report is acceptable — additional information can follow. Do not delay reporting while waiting for all information.</p>
</div>

<h2>Serious Adverse Reaction (SAR)</h2>
<p>A <strong>Serious Adverse Reaction (SAR)</strong> is an SAE where the PI or Sponsor assesses that there is a reasonable probability that the event was caused by the IMP (i.e. it cannot be excluded as drug-related). SARs must be followed up until resolution or stabilisation, regardless of the dose administered.</p>

<h2>Suspected Unexpected Serious Adverse Reaction (SUSAR)</h2>
<p>A <strong>SUSAR</strong> is a SAR that is both:</p>
<ul>
  <li><strong>Serious</strong> (meets SAE criteria)</li>
  <li><strong>Unexpected</strong> (not consistent with the current Reference Safety Information in the IB — either not listed, or occurring at a higher frequency than documented)</li>
</ul>
<p>The Sponsor is responsible for reporting SUSARs to EudraVigilance (EU) and the MHRA (UK) within the following timeframes:</p>
<table>
  <tr><th>SUSAR Type</th><th>Reporting Deadline</th><th>Follow-up Report</th></tr>
  <tr><td>Fatal or life-threatening</td><td>7 days from Sponsor awareness</td><td>Complete report within additional 8 days</td></tr>
  <tr><td>Non-fatal, non-life threatening</td><td>15 days from Sponsor awareness</td><td>N/A (or as new information becomes available)</td></tr>
  <tr><td>Non-fatal initially, later becomes fatal</td><td>7 days from determination of fatal outcome</td><td>Complete report within additional 8 days</td></tr>
</table>

<h2>Adverse Event of Special Interest (AESI)</h2>
<p>An <strong>AESI</strong> is an event of specific scientific or medical concern for the Sponsor's product — serious or non-serious — that requires ongoing monitoring and rapid communication from the site to the Sponsor. AESIs are defined in the protocol and may have a dedicated reporting form or be captured via the standard eCRF.</p>

<h2>Pregnancy in Clinical Trials</h2>
<ul>
  <li>Almost universally an <strong>exclusion criterion</strong> — effective contraception is a standard protocol requirement</li>
  <li>Regular pregnancy testing (urine or serum HCG) is typically required throughout the trial</li>
  <li>Pregnancy is <strong>not classified as an AE or SAE</strong> per se — it has its own reporting form</li>
  <li>The IMP must be discontinued upon confirmed pregnancy</li>
  <li>The PI must <strong>follow the patient through to birth and into infant follow-up</strong> — outcomes must be reported to the Sponsor</li>
  <li>Any complications during pregnancy (pre-eclampsia, miscarriage, congenital abnormality) may constitute an SAE</li>
</ul>

<h2>Protocol Deviation (PD)</h2>
<p>A <strong>Protocol Deviation</strong> is any departure from the requirements of the approved protocol. Deviations occur for many reasons: staff error, system failure, patient non-compliance, communication breakdown.</p>
<table>
  <tr><th>Type</th><th>Characteristics</th><th>Examples</th></tr>
  <tr><td><strong>Minor PD</strong></td><td>Does not significantly increase risk or decrease benefit; does not significantly affect patient rights/safety/welfare or data integrity</td><td>Blood sample taken 2 hours outside the protocol window; minor documentation error</td></tr>
  <tr><td><strong>Major / Important PD</strong></td><td>Increases risk or decreases benefit; significantly affects patient rights/safety/welfare and/or data integrity; may need reporting to REC/MHRA</td><td>Patient enrolled without meeting all eligibility criteria; consent not obtained before trial procedures; IMP given at wrong dose</td></tr>
</table>
<ul>
  <li>All deviations must be <strong>documented in the Protocol Deviation Log</strong></li>
  <li>The PI must acknowledge, sign, and date all entries</li>
  <li>Major deviations require a <strong>CAPA plan</strong></li>
  <li>Major deviations must be reported to the REC as part of the Annual Progress Report, and to the MHRA if they constitute a Serious Breach</li>
</ul>

<h2>Serious Breach</h2>
<p>A <strong>Serious Breach</strong> is a breach of the protocol or GCP requirements that is likely to significantly affect:</p>
<ul>
  <li>The safety or physical or mental integrity of the trial participants, <strong>or</strong></li>
  <li>The scientific value of the trial</li>
</ul>
<p>The Sponsor must notify the MHRA of a Serious Breach with a written notification within <strong>7 days</strong> of becoming aware of it, followed by a full report.</p>

<h2>Non-Compliance (NC)</h2>
<p>Non-Compliance covers any action or activity associated with the conduct or oversight of research that fails to comply with: the approved research plan, IRB/IEC/REC requirements, federal regulations, or institutional policies. Documented in the NC log; the PI must acknowledge and sign.</p>
`;

// ── MODULE 5, LESSON 1: ALCOA ─────────────────────────────
CONTENT.alcoa = `
<h1>ALCOA-CCEA: The Golden Rules of GCP Data Integrity</h1>
<p>Every piece of data collected in a clinical trial — whether recorded in a paper CRF, an EDC system, a laboratory notebook, or a pharmacy log — must meet the <strong>ALCOA-CCEA</strong> standard. This framework is the internationally recognised set of principles for data integrity in clinical research, accepted by the MHRA, FDA, EMA, and ICH.</p>
<hr/>

<h2>ALCOA-CCEA Explained</h2>
<table>
  <tr><th>Letter</th><th>Principle</th><th>What It Means in Practice</th></tr>
  <tr><td><strong>A</strong></td><td>Attributable</td><td>It must be possible to identify who created, changed, or reviewed data, and when. Use unique EDC logins — never share credentials. Sign and date all paper entries with your own signature.</td></tr>
  <tr><td><strong>L</strong></td><td>Legible</td><td>Data must be readable now and in the future. Illegible handwriting, faded ink, or white-out (correction fluid) on paper records are non-compliant. Use permanent ink for paper records.</td></tr>
  <tr><td><strong>C</strong></td><td>Contemporaneous</td><td>Data should be recorded at the time the observation is made, or as soon as practically possible. Retrospective data entry must be explained and justified.</td></tr>
  <tr><td><strong>O</strong></td><td>Original</td><td>The first recording of data is the original source. Do not transcribe data unnecessarily. If a copy is made, it must be a certified copy (certified as a true copy of the original).</td></tr>
  <tr><td><strong>A</strong></td><td>Accurate</td><td>Data must precisely reflect the actual observation or measurement. Errors must be corrected by: a single strikethrough of the error, the corrected value written nearby, the date, and the initials of the person making the correction — and a reason if not obvious.</td></tr>
  <tr><td><strong>C</strong></td><td>Complete</td><td>No required data should be missing without a documented explanation. Partial records must be explained (e.g. "patient refused assessment" — not simply blank).</td></tr>
  <tr><td><strong>C</strong></td><td>Consistent</td><td>Data across different records (eCRF, source document, pharmacy log, lab report) should not contradict each other without documented explanation. Inconsistencies trigger queries.</td></tr>
  <tr><td><strong>E</strong></td><td>Enduring</td><td>Data must be stored on a durable medium that will survive the required retention period — minimum 25 years for UK CTIMPs. Paper must not fade; electronic records must be on stable, backed-up systems.</td></tr>
  <tr><td><strong>A</strong></td><td>Available</td><td>Data must be accessible for review, audit, or inspection on demand. Archived data must be retrievable within reasonable timeframes. "We cannot find the records" is not an acceptable response to an inspector.</td></tr>
</table>

<h2>Common ALCOA-CCEA Violations and How to Avoid Them</h2>
<table>
  <tr><th>Violation</th><th>Example</th><th>How to Avoid</th></tr>
  <tr><td>Not attributable</td><td>Shared EDC login between two research nurses; unsigned paper form</td><td>Unique logins for every person; sign all entries</td></tr>
  <tr><td>Not contemporaneous</td><td>Adverse event recorded in eCRF 3 weeks after it occurred, with no explanation</td><td>Enter data promptly; if late, document the reason</td></tr>
  <tr><td>Not accurate (correction error)</td><td>White-out used on paper CRF; incorrect data scribbled out illegibly</td><td>Single strikethrough, date, initials, reason</td></tr>
  <tr><td>Not complete</td><td>Required field left blank; "N/A" entered without explanation</td><td>Document reason for missing data in a comment field</td></tr>
  <tr><td>Not consistent</td><td>Date of birth in ICF is 05/03/1980; in eCRF is 03/05/1980</td><td>Cross-check data sources; resolve discrepancies with queries</td></tr>
  <tr><td>Not original</td><td>Source document is a handwritten copy of a printed lab report</td><td>Keep and file the original; certify copies if needed</td></tr>
</table>

<h2>Real-World Example: ALCOA-CCEA in Action</h2>
<p>The image below (from your training material) shows a real handwritten document demonstrating correct ALCOA-CCEA correction practice. Here is what it shows and why each element is compliant:</p>
<div class="info-box">
  <div class="info-box-title">📋 Example from Clinical Research Nexus Training Material</div>
  <p>A paper document has two corrections visible:</p>
  <ul>
    <li><strong>Correction 1 — Word error:</strong> The word "Inspetion" (misspelled) is crossed out with a single line. The correct word "Inspection" is written next to it. Then: <em>"FO, 16 Dec 2023"</em> — the initials "FO" and date confirm who made the correction and when. This satisfies: <strong>Attributable</strong> (FO's initials), <strong>Contemporaneous</strong> (16 Dec 2023), <strong>Accurate</strong> (correct spelling), <strong>Legible</strong> (readable). No white-out used.</li>
    <li><strong>Correction 2 — Outdated document reference:</strong> "IB Version 9 dated 23 Feb 2023" is crossed through. Next to it is written: <em>"FO, 16 Dec 2023, obsolete, replaced by Version 10 date_01 Jan 2023"</em>. This explains <em>why</em> the original entry is no longer valid — the IB was superseded. The correction is Attributed, has a reason, and is dated.</li>
    <li><strong>Pagination note:</strong> "Page 1 of 4, Page 2 of 4, Page 3 of 4, Page 4 of 4 (Correct numbering) ✓" — confirming document completeness. This demonstrates the <strong>Complete</strong> and <strong>Consistent</strong> principles.</li>
  </ul>
</div>
<h3>Key Rules for Paper Corrections</h3>
<ul>
  <li>Use a <strong>single strikethrough</strong> — the original entry must still be readable</li>
  <li><strong>Never use correction fluid (Tipp-Ex/white-out)</strong> — this destroys the original and violates "Original" and "Legible"</li>
  <li>Write the correct value nearby</li>
  <li>Add your <strong>initials</strong>, the <strong>date</strong>, and a <strong>reason</strong> if not obvious</li>
  <li>In EDC systems, all changes are automatically audit-trailed — the system captures who changed what, when, and the original value</li>
</ul>

<h2>Note to File (NTF)</h2>
<p>A Note to File is a brief explanatory document used to explain gaps or discrepancies in trial processes when no other documentation is available. It is important to understand what an NTF can and cannot do:</p>
<ul>
  <li><strong>Can do</strong>: Explain a gap in records (e.g. "The patient's clinic letter from Visit 3 was lost when the clinic moved premises — verbal confirmation from the treating physician confirms that all assessments were completed as scheduled")</li>
  <li><strong>Cannot do</strong>: Replace missing data, reverse a deviation, or substitute for a signature that was never obtained</li>
  <li>Must be used as a <strong>last resort</strong> — if the gap/discrepancy could have been prevented, an NTF is not appropriate</li>
  <li>Is <strong>not a source document</strong></li>
  <li>Consider filing an email conversation instead if the clarification exists in written form</li>
</ul>
<div class="warning-box">
  <p>⚠️ The MHRA has explicitly stated: <strong>"NTF is not a panacea"</strong> — Warning Letter, October 23, 2007. Over-reliance on NTFs as a fix for data integrity issues is a red flag in both audits and inspections. Systematic NTF use indicates a process failure, not a documentation solution.</p>
</div>
`;

// ── MODULE 5, LESSON 2: CAPA / Audit ─────────────────────
CONTENT.capa = `
<h1>CAPA, Quality Issues &amp; Audit/Inspection Readiness</h1>
<p>Maintaining and demonstrating quality throughout a clinical trial is a shared responsibility of the Sponsor, CRO, and investigative site. This lesson covers the tools and processes used to identify, correct, and prevent quality failures — and how to be ready when an auditor or inspector arrives.</p>
<hr/>

<h2>Data Quality Issues in Clinical Trials</h2>
<p>Data quality issues arise from a range of behaviours: unintentional errors, system failures, inadequate training, poor processes, and — in rare but serious cases — misconduct or fraud. Regardless of origin, quality issues can compromise the validity of trial results and ultimately patient safety.</p>
<ul>
  <li>Poor data quality identified <em>during</em> the trial can be corrected and the impact limited</li>
  <li>Quality issues identified <em>after</em> database lock can invalidate entire datasets and lead to regulatory rejection</li>
  <li>The CRA is the first line of quality defence — systematic monitoring catches issues early</li>
</ul>

<h2>CAPA: Corrective and Preventive Action</h2>
<p>A <strong>CAPA plan</strong> is a structured quality system response to a compliance issue. It is required for all major protocol deviations and audit/inspection findings, and is best practice for significant quality concerns.</p>

<h3>The CAPA Process</h3>
<ol>
  <li><strong>Identify the issue</strong>: Document the finding clearly — what happened, when, which patients/data were affected</li>
  <li><strong>Root Cause Analysis</strong>: Determine the underlying cause — was it a training gap? A process failure? A system limitation? An ambiguity in the protocol? Never stop at the surface cause.</li>
  <li><strong>Corrective Action</strong>: Actions taken to fix the current issue — e.g. re-train staff, correct eCRF data with appropriate documentation, amend the SOP</li>
  <li><strong>Preventive Action</strong>: Actions taken to prevent the issue from recurring — e.g. implement a new checklist, update the protocol reminder sheet, add a system alert in EDC</li>
  <li><strong>Document completion</strong>: Record evidence that all CAPA actions were carried out, by whom, and when</li>
  <li><strong>Verify effectiveness</strong>: Confirm at the next monitoring visit that the issue has not recurred — close the CAPA only after effectiveness is confirmed</li>
</ol>
<div class="info-box">
  <div class="info-box-title">💡 CAPA Best Practice</div>
  <p>Regulatory inspectors look for <strong>systemic thinking</strong> in CAPA responses — not blame. A CAPA that says "staff member was retrained" is weaker than one that says "root cause was an ambiguous protocol visit window; protocol clarification was issued to all sites; a protocol visit window reference card was developed and added to the SIV training pack."</p>
</div>

<h2>Action Items (AIs) and EDC Queries</h2>
<ul>
  <li><strong>Action Items (AIs)</strong>: Specific tasks raised by the CRA (typically after a monitoring visit) for the site or CRA to complete within an agreed timeline. Tracked in the CTMS. AI resolution rate is a key CRA performance metric.</li>
  <li><strong>EDC Queries</strong>: Raised in the EDC system by the CRA, Data Manager, or automated system validation rules, to request clarification or correction of data from the site. Sites must respond within defined timelines. Query rate and aging queries are tracked by sponsors as site quality indicators.</li>
</ul>

<h2>Quality Management System (QMS)</h2>
<p>A QMS is the organised set of processes, documents, and records that an organisation uses to achieve consistent quality. Clinical trial sponsors and CROs are required to operate under a QMS. Key components include:</p>
<ul>
  <li><strong>Quality Manual</strong>: Overview of the organisation's quality framework and all processes</li>
  <li><strong>SOPs (Standard Operating Procedures)</strong>: Detailed, step-by-step instructions for all key processes (monitoring, SAE reporting, data management, TMF filing, etc.)</li>
  <li><strong>Templates</strong>: Standardised forms, logs, and report templates that ensure consistency</li>
  <li><strong>Records</strong>: The data, reports, and documents that demonstrate that the QMS was followed</li>
  <li><strong>CTMS (Clinical Trial Management System)</strong>: Operational database tracking all aspects of trial conduct — visits, action items, enrolment, payments, contacts</li>
  <li><strong>eTMF</strong>: Electronic Trial Master File — the secure, controlled repository for all essential documents</li>
</ul>

<h2>Audit vs. Inspection</h2>
<table>
  <tr><th></th><th>Audit</th><th>Inspection</th></tr>
  <tr><td><strong>Conducted by</strong></td><td>Sponsor's Quality Assurance (QA) team or an independent contract auditor appointed by the Sponsor</td><td>Regulatory authority — in the UK, typically the MHRA</td></tr>
  <tr><td><strong>Trigger</strong></td><td>Routine (per audit plan) or for-cause (following a concern)</td><td>Routine, application-linked, or triggered by a serious breach or whistleblower</td></tr>
  <tr><td><strong>Notice</strong></td><td>Usually planned with notice</td><td>Usually with notice, but MHRA may give little or no notice for triggered inspections</td></tr>
  <tr><td><strong>Findings</strong></td><td>Minor / Major / Critical</td><td>Minor / Major / Critical</td></tr>
  <tr><td><strong>Consequences</strong></td><td>CAPA required; may affect site status</td><td>CAPA required; may result in suspension, prosecution, or Warning Letter</td></tr>
</table>

<h3>Inspection Triggers</h3>
<p>The MHRA may initiate an inspection for a number of reasons:</p>
<ul>
  <li>A Serious Breach notification received</li>
  <li>A whistleblower report</li>
  <li>Intelligence from other MHRA departments or the HRA</li>
  <li>Part of a marketing authorisation application review — inspecting the pivotal trial sites</li>
  <li>Routine GCP inspection programme</li>
</ul>

<h2>QMS Technology Vendors</h2>
<table>
  <tr><th>System Type</th><th>Vendors</th><th>Users</th></tr>
  <tr><td><strong>EDC (Electronic Data Capture)</strong></td><td>Medidata Rave, Veeva Vault EDC, Oracle InForm, iMedidata</td><td>Site + Sponsor/CRO</td></tr>
  <tr><td><strong>CTMS</strong></td><td>Veeva Vault CTMS, Medidata CTMS, eTMF Suite</td><td>Sponsor/CRO only</td></tr>
  <tr><td><strong>eTMF</strong></td><td>Veeva Vault eTMF, Wingspan, Dropbox for Trials</td><td>Sponsor/CRO (site has ISF)</td></tr>
  <tr><td><strong>IRT / RTSM</strong></td><td>Suvoda, 4G Clinical, HMD Clinical, Medidata Balance</td><td>Site (screening/randomisation) + Sponsor</td></tr>
  <tr><td><strong>EMR (Site Patient Records)</strong></td><td>EPIC, SystemOne, EMIS, Cerner</td><td>Site only — never shared with Sponsor</td></tr>
</table>
`;

// ── MODULE 6, LESSON 1: COV ───────────────────────────────
CONTENT.cov = `
<h1>Site Close-out Visit (COV): Procedure &amp; Checklist</h1>
<p>The Close-out Visit (COV) is the final formal visit to a clinical trial site. It marks the end of the site's participation in the study and represents the <strong>mirror image of the Site Initiation Visit (SIV)</strong> — systematically closing down everything that was set up at the start.</p>
<hr/>

<h2>When Does the COV Occur?</h2>
<p>The COV is triggered by one of the following:</p>
<ul>
  <li>The last patient at the site has completed all protocol-required visits and follow-up</li>
  <li>The site has been closed early (due to poor recruitment, a safety signal, a sponsor decision, or a protocol change)</li>
  <li>The overall study has ended and all sites are being closed</li>
</ul>

<h2>Pre-COV Preparation</h2>
<ul>
  <li>Confirm the COV date with the site in advance — issue an <strong>official confirmation letter</strong> to the PI</li>
  <li>Confirm all patients have completed the study or been formally discontinued — no active patients should remain at the time of COV</li>
  <li>Verify in the EDC that all data has been entered and all queries are resolved (or minimal outstanding)</li>
  <li>Arrange final IMP reconciliation with the pharmacy — confirm quantities, returns, and any pending destruction</li>
  <li>Confirm all outstanding financial payments are ready to be settled (site fees, per-patient payments, overtime invoices)</li>
  <li>Review the ISF for completeness — identify any missing documents and request them in advance</li>
  <li>Check for any open Action Items — aim to have all closed before or at the COV</li>
</ul>

<h2>During the COV — Core Activities</h2>

<h3>1. Final IMP Accountability and Reconciliation</h3>
<p>Conducted with the site pharmacist:</p>
<ul>
  <li>Account for every unit of IMP received, dispensed per patient, returned by patients, and any unused stock</li>
  <li>The IMP accountability log must balance to zero — all IMP is accounted for</li>
  <li>Witness the destruction of any remaining IMP (or confirm return-to-sponsor arrangements)</li>
  <li>Complete the final pharmacy accountability log entry; pharmacist signs</li>
</ul>

<h3>2. Final Lab Kit and Equipment Reconciliation</h3>
<ul>
  <li>Count all remaining lab kits — confirm quantities reconcile with the delivery manifest</li>
  <li>Return any unused kits or equipment provided by the Sponsor per the protocol's instructions</li>
  <li>Document the reconciliation in the ISF</li>
</ul>

<h3>3. Settlement of Outstanding Payments</h3>
<ul>
  <li>Confirm all site fees have been paid or are in final processing</li>
  <li>Confirm per-patient and per-procedure invoices are settled</li>
  <li>Issue any final payments for co-investigator time, pharmacy fees, and lab costs</li>
</ul>

<h3>4. Final ISF Review</h3>
<ul>
  <li>Review the ISF against the completeness checklist for the final time</li>
  <li>Confirm all documents are the correct final version, properly filed and indexed</li>
  <li>Verify all logs are fully completed, signed, and dated through to the last patient's last visit</li>
</ul>

<h3>5. Collect and Sign All Logs</h3>
<ul>
  <li><strong>Site Visit Log</strong>: Final entry made; countersigned by site staff</li>
  <li><strong>Delegation Log</strong>: All active delegations closed with end dates; final PI signature obtained</li>
  <li><strong>Training Log</strong>: Confirmed complete; final signatures obtained</li>
  <li>Original documents or certified copies of key logs are collected for the eTMF as per the Data Management Plan</li>
</ul>

<h3>6. Vendor Shutdown</h3>
<ul>
  <li>Confirm EDC access is deactivated for all site staff after data lock</li>
  <li>Confirm IRT access is deactivated</li>
  <li>Confirm central laboratory account for the site is closed</li>
  <li>Confirm any other site-specific vendor platforms (imaging upload systems, ePRO devices, ABPM devices) are returned and accounts closed</li>
</ul>

<h3>7. Close All Open Action Items and Queries</h3>
<ul>
  <li>Review and close all remaining Action Items</li>
  <li>Review any outstanding EDC queries — if unresolvable, document the reason with appropriate explanation</li>
  <li>Confirm no remaining action items will be issued after the COV (unless critical)</li>
</ul>

<h3>8. Archiving Briefing with Study Team</h3>
<ul>
  <li>Discuss archiving requirements with the PI and site Research and Development team</li>
  <li>Confirm the site's archiving location (secure, controlled, accessible, fireproof storage)</li>
  <li>UK CTIMP requirement: <strong>minimum 25 years retention</strong> from the end of the trial</li>
  <li>Confirm who at the site is the designated archiving contact if documents are ever requested for inspection</li>
  <li>Explain that the ISF must not be destroyed without Sponsor authorisation, even after the retention period</li>
</ul>

<h2>Post-COV</h2>
<ul>
  <li>Finalise and issue the COV Report</li>
  <li>Issue a formal <strong>site closure letter</strong> to the PI confirming the site is closed and all activities are complete</li>
  <li>Confirm the eTMF is complete and ready for archiving on the Sponsor side</li>
  <li>If this was the last site to close: contribute to database lock preparation</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 Document Retention Requirement</div>
  <p>For UK CTIMPs, the Investigator Site File and all trial-essential documents must be retained for a <strong>minimum of 25 years</strong> from the end of the clinical trial. This obligation applies to both the investigative site <em>and</em> the Sponsor. Sites must not move, destroy, or transfer documents without prior written consent from the Sponsor.</p>
</div>
`;

// ── MODULE 6, LESSON 2: Terminology / Summary ────────────
CONTENT.terminology = `
<h1>Clinical Trial Terminology Reference &amp; Course Summary</h1>
<p>This reference lesson consolidates the key terminology you will encounter every day in clinical trial work. Bookmark it for quick reference throughout your career.</p>
<hr/>

<h2>Patient Status Terms</h2>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>Pre-screening</strong></td><td>Preliminary assessment of potential patient eligibility — often a medical records review — before formal consent is sought. No trial procedure has occurred. Patient has not signed consent.</td></tr>
  <tr><td><strong>Screened</strong></td><td>Patient has signed the Informed Consent Form. Screening date = date of ICF signature. Screening procedures may now begin.</td></tr>
  <tr><td><strong>Screen Failed</strong></td><td>Patient signed consent but did not meet one or more eligibility criteria (inclusion or exclusion). Recorded in the Screening Log with the reason for failure.</td></tr>
  <tr><td><strong>Enrolled / Randomised</strong></td><td>Patient has passed all screening assessments, met all eligibility criteria, and been assigned a treatment and trial ID via the IRT system. Enrolment date = randomisation date.</td></tr>
  <tr><td><strong>Discontinued</strong></td><td>Patient withdrew consent, experienced an AE requiring study drug cessation, or was removed from the trial by the PI before completing the protocol. The reason must be documented.</td></tr>
  <tr><td><strong>Completed</strong></td><td>Patient completed all protocol-required visits and assessments through to the study's defined end point or last visit.</td></tr>
</table>

<h2>Data and Systems Terms</h2>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>EDC</strong></td><td>Electronic Data Capture — the digital system used to enter and manage trial data. Both site staff (entering) and Sponsor/CRO staff (reviewing, querying) have access.</td></tr>
  <tr><td><strong>eCRF</strong></td><td>Electronic Case Report Form — the individual data entry form within the EDC for each patient visit.</td></tr>
  <tr><td><strong>IRT / RTSM</strong></td><td>Interactive Response Technology / Randomisation and Trial Supply Management — system used for screening patients, randomising them to treatment, and managing IMP supply. Patients are randomised in IRT; data is auto-populated into EDC.</td></tr>
  <tr><td><strong>CTMS</strong></td><td>Clinical Trial Management System — operational database used by the Sponsor/CRO to manage site relationships, visit scheduling, action items, and payments. Sites generally do not have access.</td></tr>
  <tr><td><strong>eTMF</strong></td><td>Electronic Trial Master File — the Sponsor's secure, controlled document repository for all trial-essential documents.</td></tr>
  <tr><td><strong>ISF</strong></td><td>Investigator Site File — the site's version of the TMF; a physical or electronic binder containing all trial-essential documents at the site.</td></tr>
  <tr><td><strong>EMR / EHR</strong></td><td>Electronic Medical Record / Electronic Health Record — the site's own patient record system (e.g. EPIC, SystemOne, EMIS). Owned and controlled by the site/NHS Trust. Never shared with the Sponsor — it is the primary source document.</td></tr>
  <tr><td><strong>Data Cut-off</strong></td><td>A defined calendar date for an interim analysis — data entered after this date is excluded from that analysis. Different from database lock.</td></tr>
  <tr><td><strong>Database Lock</strong></td><td>The EDC is locked at the end of the study — no further changes can be made to the data. Occurs after all queries are resolved and data is validated.</td></tr>
</table>

<h2>Regulatory and Document Terms</h2>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>CTA</strong></td><td>Clinical Trial Authorisation — the MHRA's approval for a clinical trial to commence in the UK.</td></tr>
  <tr><td><strong>IRAS</strong></td><td>Integrated Research Application System — the online portal through which UK research applications (CTA, HRA, REC) are submitted.</td></tr>
  <tr><td><strong>IMP</strong></td><td>Investigational Medicinal Product — the drug (or placebo) being tested in the clinical trial.</td></tr>
  <tr><td><strong>PSP</strong></td><td>Protocol Signature Page — signed by the PI before the trial starts at the site.</td></tr>
  <tr><td><strong>RSI</strong></td><td>Reference Safety Information — the current list of expected adverse reactions for the IMP (from the IB); used to determine whether a SAR is expected or unexpected.</td></tr>
  <tr><td><strong>DMP</strong></td><td>Data Management Plan — describes how trial data will be collected, validated, transferred, and archived.</td></tr>
  <tr><td><strong>DSMB / DMC</strong></td><td>Data Safety Monitoring Board / Data Monitoring Committee — independent expert committee that reviews unblinded safety and efficacy data during the trial.</td></tr>
  <tr><td><strong>CRO</strong></td><td>Contract Research Organisation — a company that provides outsourced research services to the Sponsor (e.g. IQVIA, ICON, PAREXEL, Covance).</td></tr>
</table>
<hr/>

<h2>Course Summary</h2>
<p>You have now completed all six modules of <strong>Clinical Trial in the UK: Start-up to Closure</strong>. Here is what you have covered:</p>
<ol>
  <li><strong>Module 1</strong>: The drug development lifecycle from discovery through post-market surveillance; the roles of MHRA, HRA, NIHR, and NHS R&amp;D; therapeutic areas including oncology, cardiology, dermatology, and gastroenterology</li>
  <li><strong>Module 2</strong>: The feasibility process — CDAs, protocol synopses, feasibility questionnaires — and the Site Selection Visit (SSV)</li>
  <li><strong>Module 3</strong>: The Site Initiation Visit (SIV) — preparation, training, documentation, and activation; the key ISF documents: protocol, IB, ICF/PIS, Delegation Log, Training Log, SIF</li>
  <li><strong>Module 4</strong>: Routine and Interim Monitoring Visits — SDV, SDR, protocol compliance, AE/SAE review, IMP accountability; adverse events, SAEs, SUSARs and their reporting timelines; protocol deviations and serious breaches</li>
  <li><strong>Module 5</strong>: ALCOA-CCEA data integrity principles; CAPA processes; audit vs. inspection; quality management systems and vendor landscape</li>
  <li><strong>Module 6</strong>: Site Close-out Visit — IMP reconciliation, log collection, vendor shutdown, archiving; clinical trial terminology reference</li>
</ol>
<div class="key-points">
  <div class="key-points-title">🏅 Ready for Your Final Assessment?</div>
  <p>The <strong>Final Assessment</strong> contains 15 questions drawn from all six modules. You need <strong>70% (11/15)</strong> to pass. You have <strong>3 attempts</strong>. On passing, your <strong>Certificate of Completion</strong> will be generated automatically and available in your dashboard.</p>
  <p>Note: The original course assessment document sets a pass mark of 50%. This LMS platform sets a higher standard of <strong>70%</strong> to ensure learners have a solid working knowledge before receiving a certificate. This reflects industry best practice for professional clinical research certification.</p>
</div>
`;

// ─────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────
const MODULES = [
  {
    title: 'Module 1: Drug Life Cycle & UK Regulatory Landscape',
    description: 'Understand the complete drug development lifecycle from discovery to post-market surveillance, and the three UK regulatory authorities governing clinical trials.',
    order: 1, isMandatory: true,
    lessons: [
      { title: 'Welcome & Course Overview', lessonType: 'VIDEO', videoUrl: VIDEOS.drugLifecycle, videoDurationMinutes: 9, isPreview: true, order: 1, content: CONTENT.welcome,
        downloadableResources: [{ label: 'Course Overview & Study Guide (PDF)', url: 'https://exonsciences.com/resources/course-overview-uk-startup-closure.pdf' }] },
      { title: 'The Drug Development Life Cycle', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.drugLifecycle,
        downloadableResources: [{ label: 'Drug Life Cycle Diagram (PDF)', url: 'https://exonsciences.com/resources/drug-lifecycle-diagram.pdf' }] },
      { title: 'UK Regulatory Authorities: MHRA, HRA & NIHR', lessonType: 'VIDEO', videoUrl: VIDEOS.ukRegulatory, videoDurationMinutes: 14, isPreview: false, order: 3, content: CONTENT.ukRegulatory,
        downloadableResources: [
          { label: 'UK Regulatory Approvals Checklist (PDF)', url: 'https://exonsciences.com/resources/uk-regulatory-approvals-checklist.pdf' },
          { label: 'IRAS Portal Quick Start Guide', url: 'https://exonsciences.com/resources/iras-quick-start.pdf' },
        ] },
      { title: 'Therapeutic Areas: Oncology, Cardiology & More', lessonType: 'TEXT', isPreview: false, order: 4, content: CONTENT.therapeuticAreas,
        downloadableResources: [{ label: 'Therapeutic Area Reference Guide (PDF)', url: 'https://exonsciences.com/resources/therapeutic-area-guide.pdf' }] },
    ],
    quiz: {
      title: 'Module 1 Assessment: Drug Life Cycle & UK Regulatory Landscape',
      instructions: 'Answer all questions. 70% pass mark. 3 attempts allowed. Questions are randomised.',
      passMarkPercentage: 70, timeLimitMinutes: 15, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: 'What does IND stand for in clinical research?', questionType: 'MULTIPLE_CHOICE', explanation: 'IND = Investigational New Drug application — the US FDA application required before first-in-human testing.', marks: 1, order: 1,
          options: [{ optionText: 'Investigational New Drug application', isCorrect: true, order: 1 }, { optionText: 'Investigational Novel Device application', isCorrect: false, order: 2 }, { optionText: 'Integrated New Drug application', isCorrect: false, order: 3 }, { optionText: 'Investigational New Development application', isCorrect: false, order: 4 }] },
        { questionText: 'Which UK body issues the Clinical Trial Authorisation (CTA)?', questionType: 'MULTIPLE_CHOICE', explanation: 'The MHRA is the UK competent authority that grants the CTA via IRAS.', marks: 1, order: 2,
          options: [{ optionText: 'MHRA', isCorrect: true, order: 1 }, { optionText: 'HRA', isCorrect: false, order: 2 }, { optionText: 'NIHR', isCorrect: false, order: 3 }, { optionText: 'NHS England', isCorrect: false, order: 4 }] },
        { questionText: 'How many Research Ethics Committees (RECs) does the HRA oversee in the UK?', questionType: 'MULTIPLE_CHOICE', explanation: '85 RECs: 65 in England, 11 in Scotland, 7 in Wales, 2 in Northern Ireland.', marks: 1, order: 3,
          options: [{ optionText: '85', isCorrect: true, order: 1 }, { optionText: '65', isCorrect: false, order: 2 }, { optionText: '100', isCorrect: false, order: 3 }, { optionText: '15', isCorrect: false, order: 4 }] },
        { questionText: 'Before a UK NHS site can open, which approvals are required?', questionType: 'MULTI_SELECT', explanation: 'All four: MHRA, HRA, REC Favourable Opinion, and NHS R&D C&C Confirmation.', marks: 2, order: 4,
          options: [{ optionText: 'MHRA Initial Approval Letter', isCorrect: true, order: 1 }, { optionText: 'HRA Approval Letter', isCorrect: true, order: 2 }, { optionText: 'REC Favourable Opinion Letter', isCorrect: true, order: 3 }, { optionText: 'NHS R&D C&C Confirmation Letter', isCorrect: true, order: 4 }, { optionText: 'NIHR Funding Letter', isCorrect: false, order: 5 }] },
        { questionText: 'Phase 1 clinical trials typically use which population?', questionType: 'MULTIPLE_CHOICE', explanation: 'Phase 1 uses healthy volunteers — except in oncology, where patients are used due to the toxic nature of IMPs.', marks: 1, order: 5,
          options: [{ optionText: 'Healthy volunteers (oncology: patients)', isCorrect: true, order: 1 }, { optionText: 'Large diverse patient populations', isCorrect: false, order: 2 }, { optionText: 'Post-approval patients only', isCorrect: false, order: 3 }, { optionText: 'Animal subjects', isCorrect: false, order: 4 }] },
        { questionText: 'Which phase of clinical trials is primarily concerned with long-term post-approval safety surveillance?', questionType: 'MULTIPLE_CHOICE', explanation: 'Phase 4 occurs after regulatory approval and focuses on real-world safety monitoring and pharmacovigilance.', marks: 1, order: 6,
          options: [{ optionText: 'Phase 4', isCorrect: true, order: 1 }, { optionText: 'Phase 3', isCorrect: false, order: 2 }, { optionText: 'Phase 2', isCorrect: false, order: 3 }, { optionText: 'Phase 1', isCorrect: false, order: 4 }] },
        { questionText: 'DLBCL stands for:', questionType: 'MULTIPLE_CHOICE', explanation: 'Diffuse Large B-Cell Lymphoma — an aggressive non-Hodgkin lymphoma commonly studied in clinical trials.', marks: 1, order: 7,
          options: [{ optionText: 'Diffuse Large B-Cell Lymphoma', isCorrect: true, order: 1 }, { optionText: 'Diffuse Lymphoid B-Cell Lesion', isCorrect: false, order: 2 }, { optionText: 'Directed Large Biological Cell Lymphoma', isCorrect: false, order: 3 }, { optionText: 'Diffuse Low-grade B-Cell Lymphadenoma', isCorrect: false, order: 4 }] },
        { questionText: 'What scoring system is commonly used to grade adverse events in oncology trials?', questionType: 'MULTIPLE_CHOICE', explanation: 'CTCAE (Common Terminology Criteria for Adverse Events) is the standard grading system.', marks: 1, order: 8,
          options: [{ optionText: 'CTCAE (Common Terminology Criteria for Adverse Events)', isCorrect: true, order: 1 }, { optionText: 'PASI (Psoriasis Area and Severity Index)', isCorrect: false, order: 2 }, { optionText: 'EASI (Eczema Area and Severity Index)', isCorrect: false, order: 3 }, { optionText: 'Mayo Score', isCorrect: false, order: 4 }] },
      ],
    },
  },
  {
    title: 'Module 2: Feasibility & Site Selection Visit (SSV)',
    description: 'Learn how sites are assessed for suitability — from the initial Feasibility Questionnaire through to the formal Site Selection Visit.',
    order: 2, isMandatory: true,
    lessons: [
      { title: 'Site Feasibility: Process and Purpose', lessonType: 'VIDEO', videoUrl: VIDEOS.feasibilitySsv, videoDurationMinutes: 11, isPreview: false, order: 1, content: CONTENT.feasibility,
        downloadableResources: [{ label: 'Sample Feasibility Questionnaire (PDF)', url: 'https://exonsciences.com/resources/feasibility-questionnaire-sample.pdf' }] },
      { title: 'Site Selection Visit (SSV): Objectives & Documentation', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.ssv,
        downloadableResources: [{ label: 'SSV Report Template (DOCX)', url: 'https://exonsciences.com/resources/ssv-report-template.docx' }] },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check: Feasibility & SSV',
      instructions: 'Answer all questions. 70% pass mark required.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: 'What must be signed before trial-specific information is shared with a site?', questionType: 'MULTIPLE_CHOICE', explanation: 'A Confidentiality Disclosure Agreement (CDA) must be signed before any proprietary trial information is shared.', marks: 1, order: 1,
          options: [{ optionText: 'Confidentiality Disclosure Agreement (CDA)', isCorrect: true, order: 1 }, { optionText: 'Clinical Trial Agreement (CTA)', isCorrect: false, order: 2 }, { optionText: 'Protocol Signature Page', isCorrect: false, order: 3 }, { optionText: 'Delegation Log', isCorrect: false, order: 4 }] },
        { questionText: 'The SSV Report must be completed within how many working days?', questionType: 'MULTIPLE_CHOICE', explanation: 'The Site Selection Visit report must be completed within 15 working days of the visit.', marks: 1, order: 2,
          options: [{ optionText: '15 working days', isCorrect: true, order: 1 }, { optionText: '10 working days', isCorrect: false, order: 2 }, { optionText: '5 working days', isCorrect: false, order: 3 }, { optionText: '30 calendar days', isCorrect: false, order: 4 }] },
        { questionText: 'GCP certificates must be renewed every:', questionType: 'MULTIPLE_CHOICE', explanation: 'GCP certificates must be renewed every 2 years. CVs are renewed every 3 years.', marks: 1, order: 3,
          options: [{ optionText: '2 years', isCorrect: true, order: 1 }, { optionText: '1 year', isCorrect: false, order: 2 }, { optionText: '3 years', isCorrect: false, order: 3 }, { optionText: '5 years', isCorrect: false, order: 4 }] },
        { questionText: 'Which of the following is a primary objective of the SSV?', questionType: 'MULTIPLE_CHOICE', explanation: 'The SSV introduces the study and confirms the site has adequate resources to conduct it.', marks: 1, order: 4,
          options: [{ optionText: 'Confirm the site has adequate resources to conduct the trial', isCorrect: true, order: 1 }, { optionText: 'Train all site staff on the protocol', isCorrect: false, order: 2 }, { optionText: 'Randomise the first patient', isCorrect: false, order: 3 }, { optionText: 'Lock the trial database', isCorrect: false, order: 4 }] },
      ],
    },
  },
  {
    title: 'Module 3: Site Initiation Visit (SIV) & Site Activation',
    description: 'Master the SIV — the training and activation visit that enables a site to begin enrolling patients.',
    order: 3, isMandatory: true,
    lessons: [
      { title: 'Site Initiation Visit (SIV): Preparation & Execution', lessonType: 'VIDEO', videoUrl: VIDEOS.sivDocs, videoDurationMinutes: 18, isPreview: false, order: 1, content: CONTENT.siv,
        downloadableResources: [
          { label: 'SIV Pre-Visit Checklist (PDF)', url: 'https://exonsciences.com/resources/siv-pre-visit-checklist.pdf' },
          { label: 'SIV Report Template (DOCX)', url: 'https://exonsciences.com/resources/siv-report-template.docx' },
          { label: 'Sample Delegation Log (XLSX)', url: 'https://exonsciences.com/resources/delegation-log-template.xlsx' },
        ] },
      { title: 'Key Start-up Documents: Protocol, IB, Consent & Delegation Log', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.keyDocs,
        downloadableResources: [
          { label: 'ISF Essential Documents Index (PDF)', url: 'https://exonsciences.com/resources/isf-index-template.pdf' },
          { label: 'Protocol Sections Quick Reference (PDF)', url: 'https://exonsciences.com/resources/protocol-sections-reference.pdf' },
        ] },
    ],
    quiz: {
      title: 'Module 3 Assessment: SIV & Start-up Documents',
      instructions: 'Select the best answer(s). Pass mark 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 12, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: 'The SIV Report must be finalised within:', questionType: 'MULTIPLE_CHOICE', explanation: 'The SIV report must be completed within 10 working days of the visit.', marks: 1, order: 1,
          options: [{ optionText: '10 working days', isCorrect: true, order: 1 }, { optionText: '15 working days', isCorrect: false, order: 2 }, { optionText: '5 working days', isCorrect: false, order: 3 }, { optionText: '30 calendar days', isCorrect: false, order: 4 }] },
        { questionText: 'Who must sign the Protocol Signature Page (PSP)?', questionType: 'MULTIPLE_CHOICE', explanation: 'The Protocol Signature Page must be signed by the PI before the trial starts.', marks: 1, order: 2,
          options: [{ optionText: 'The Principal Investigator (PI)', isCorrect: true, order: 1 }, { optionText: 'The CRA', isCorrect: false, order: 2 }, { optionText: 'The Research Ethics Committee', isCorrect: false, order: 3 }, { optionText: 'The site pharmacist', isCorrect: false, order: 4 }] },
        { questionText: 'The Delegation Log must include which of the following for each staff member?', questionType: 'MULTI_SELECT', explanation: 'Each entry requires: delegated tasks, start date, end date, and PI countersignature.', marks: 2, order: 3,
          options: [{ optionText: 'Delegated tasks', isCorrect: true, order: 1 }, { optionText: 'Start date of delegation', isCorrect: true, order: 2 }, { optionText: 'End date of delegation', isCorrect: true, order: 3 }, { optionText: 'PI countersignature', isCorrect: true, order: 4 }, { optionText: "Staff member's national insurance number", isCorrect: false, order: 5 }] },
        { questionText: "What is the primary purpose of the Investigator's Brochure (IB)?", questionType: 'MULTIPLE_CHOICE', explanation: 'The IB summarises all known clinical and non-clinical information about the IMP to help investigators assess benefit/risk and patient safety.', marks: 1, order: 4,
          options: [{ optionText: 'To summarise all known clinical and non-clinical information about the IMP', isCorrect: true, order: 1 }, { optionText: 'To provide EDC instructions', isCorrect: false, order: 2 }, { optionText: 'To record all adverse events', isCorrect: false, order: 3 }, { optionText: 'To list all enrolled patients', isCorrect: false, order: 4 }] },
        { questionText: 'Informed consent must be obtained:', questionType: 'MULTIPLE_CHOICE', explanation: 'ICH GCP requires consent to be obtained before any trial-related procedures begin.', marks: 1, order: 5,
          options: [{ optionText: 'Before any trial-related procedures begin', isCorrect: true, order: 1 }, { optionText: 'After the first dose of IMP', isCorrect: false, order: 2 }, { optionText: 'At the screening visit only', isCorrect: false, order: 3 }, { optionText: 'Only for invasive procedures', isCorrect: false, order: 4 }] },
      ],
    },
  },
  {
    title: 'Module 4: Routine & Interim Monitoring Visits (RMV/IMV)',
    description: 'Learn to conduct effective monitoring visits — the CRA core activity — including SDV, AE review, deviation logs, and IMP accountability.',
    order: 4, isMandatory: true,
    lessons: [
      { title: 'The Monitoring Visit: Objectives & Preparation', lessonType: 'VIDEO', videoUrl: VIDEOS.monitoring, videoDurationMinutes: 16, isPreview: false, order: 1, content: CONTENT.monitoring,
        downloadableResources: [
          { label: 'Monitoring Visit Agenda Template (DOCX)', url: 'https://exonsciences.com/resources/monitoring-visit-agenda.docx' },
          { label: 'RMV Report Writing Guide (PDF)', url: 'https://exonsciences.com/resources/monitoring-report-guide.pdf' },
        ] },
      { title: 'Adverse Events, SAEs, SUSARs & Protocol Deviations', lessonType: 'VIDEO', videoUrl: VIDEOS.adverseEvents, videoDurationMinutes: 14, isPreview: false, order: 2, content: CONTENT.adverseEvents,
        downloadableResources: [
          { label: 'AE/SAE Reporting Quick Reference Card (PDF)', url: 'https://exonsciences.com/resources/ae-sae-reporting-card.pdf' },
          { label: 'CTCAE Grading Summary Table (PDF)', url: 'https://exonsciences.com/resources/ctcae-grading-table.pdf' },
          { label: 'SUSAR Reporting Timeline Diagram (PDF)', url: 'https://exonsciences.com/resources/susar-timeline.pdf' },
        ] },
    ],
    quiz: {
      title: 'Module 4 Assessment: Monitoring & Safety Events',
      instructions: 'Answer carefully — some questions have multiple correct answers. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 15, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: 'Which of the following qualify as Serious Adverse Events (SAEs)?', questionType: 'MULTI_SELECT', explanation: 'SAEs: death, life-threatening, hospitalisation, significant disability, congenital malformation, medically important events.', marks: 2, order: 1,
          options: [{ optionText: 'Death', isCorrect: true, order: 1 }, { optionText: 'Life-threatening event', isCorrect: true, order: 2 }, { optionText: 'Overnight hospitalisation', isCorrect: true, order: 3 }, { optionText: 'Congenital malformation', isCorrect: true, order: 4 }, { optionText: 'Grade 1 nausea not requiring intervention', isCorrect: false, order: 5 }] },
        { questionText: 'An SAE must be reported to the Sponsor within:', questionType: 'MULTIPLE_CHOICE', explanation: 'SAEs must be reported to the Sponsor within 24 hours of site awareness. An incomplete initial report is acceptable.', marks: 1, order: 2,
          options: [{ optionText: '24 hours', isCorrect: true, order: 1 }, { optionText: '48 hours', isCorrect: false, order: 2 }, { optionText: '72 hours', isCorrect: false, order: 3 }, { optionText: '7 days', isCorrect: false, order: 4 }] },
        { questionText: 'A fatal SUSAR must be reported to EudraVigilance within:', questionType: 'MULTIPLE_CHOICE', explanation: 'Fatal/life-threatening SUSARs: 7 days from Sponsor awareness, with a complete report within an additional 8 days.', marks: 1, order: 3,
          options: [{ optionText: '7 days (with follow-up within 8 more days)', isCorrect: true, order: 1 }, { optionText: '15 days', isCorrect: false, order: 2 }, { optionText: '24 hours', isCorrect: false, order: 3 }, { optionText: '30 days', isCorrect: false, order: 4 }] },
        { questionText: 'CTCAE Grade 4 indicates:', questionType: 'MULTIPLE_CHOICE', explanation: 'CTCAE Grade 4 = Life-threatening; urgent/emergent intervention indicated. Grade 5 = Death.', marks: 1, order: 4,
          options: [{ optionText: 'Life-threatening event requiring urgent intervention', isCorrect: true, order: 1 }, { optionText: 'Severe but not life-threatening', isCorrect: false, order: 2 }, { optionText: 'Death related to AE', isCorrect: false, order: 3 }, { optionText: 'Mild, intervention not indicated', isCorrect: false, order: 4 }] },
        { questionText: 'SDV (Source Data Verification) involves:', questionType: 'MULTIPLE_CHOICE', explanation: 'SDV = directly comparing EDC data against the original source documents to verify accuracy and completeness.', marks: 1, order: 5,
          options: [{ optionText: 'Comparing EDC data against original source documents to verify accuracy', isCorrect: true, order: 1 }, { optionText: 'Verifying the Delegation Log', isCorrect: false, order: 2 }, { optionText: 'Confirming patient consent was taken', isCorrect: false, order: 3 }, { optionText: 'Checking IMP storage temperatures', isCorrect: false, order: 4 }] },
        { questionText: 'A Major Protocol Deviation is one that:', questionType: 'MULTIPLE_CHOICE', explanation: "A Major PD increases risk or decreases benefit to the patient and/or significantly affects subject rights, safety, or data integrity.", marks: 1, order: 6,
          options: [{ optionText: "Increases risk or decreases benefit, or significantly affects participant safety or data integrity", isCorrect: true, order: 1 }, { optionText: 'Is an administrative oversight with no patient impact', isCorrect: false, order: 2 }, { optionText: 'Was found during a remote monitoring visit', isCorrect: false, order: 3 }, { optionText: 'Requires only documentation in the visit report', isCorrect: false, order: 4 }] },
      ],
    },
  },
  {
    title: 'Module 5: Data Quality, ALCOA-CCEA & Quality Management',
    description: 'Master the principles of GCP data integrity, ALCOA-CCEA, CAPA processes, and audit/inspection readiness.',
    order: 5, isMandatory: true,
    lessons: [
      { title: 'ALCOA-CCEA: The Golden Rules of GCP Data Integrity', lessonType: 'VIDEO', videoUrl: VIDEOS.dataQuality, videoDurationMinutes: 12, isPreview: false, order: 1, content: CONTENT.alcoa,
        downloadableResources: [{ label: 'ALCOA-CCEA Quick Reference Poster (PDF)', url: 'https://exonsciences.com/resources/alcoa-poster.pdf' }] },
      { title: 'CAPA, Quality Issues & Audit/Inspection Readiness', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.capa,
        downloadableResources: [{ label: 'CAPA Template & Root Cause Analysis Guide (DOCX)', url: 'https://exonsciences.com/resources/capa-template.docx' }] },
    ],
    quiz: {
      title: 'Module 5 Assessment: Data Quality & ALCOA-CCEA',
      instructions: 'Select correct answer(s). Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 12, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: '"Contemporaneous" in ALCOA-CCEA means:', questionType: 'MULTIPLE_CHOICE', explanation: 'Contemporaneous = data recorded at the time of the observation, or as soon as practically possible afterwards.', marks: 1, order: 1,
          options: [{ optionText: 'Data recorded at the time of observation', isCorrect: true, order: 1 }, { optionText: 'Data that must be copied from the original', isCorrect: false, order: 2 }, { optionText: 'Data that is consistent across records', isCorrect: false, order: 3 }, { optionText: 'Data that is available for inspection', isCorrect: false, order: 4 }] },
        { questionText: 'Which statements about a Note to File (NTF) are correct?', questionType: 'MULTI_SELECT', explanation: 'NTFs explain gaps but are not source documents, are last resort, and cannot fix data integrity failures.', marks: 2, order: 2,
          options: [{ optionText: 'An NTF is not a source document', isCorrect: true, order: 1 }, { optionText: 'An NTF should be used as a last resort only', isCorrect: true, order: 2 }, { optionText: 'An NTF cannot replace missing data or reverse a deviation', isCorrect: true, order: 3 }, { optionText: 'An NTF is the preferred method for correcting all data errors', isCorrect: false, order: 4 }] },
        { questionText: 'In a CAPA, "Preventive Action" means:', questionType: 'MULTIPLE_CHOICE', explanation: 'Preventive Action = steps taken to prevent the same or similar issue from occurring again in the future.', marks: 1, order: 3,
          options: [{ optionText: 'Actions taken to prevent the issue from recurring', isCorrect: true, order: 1 }, { optionText: 'Actions taken to correct the current issue', isCorrect: false, order: 2 }, { optionText: 'Protocol amendments made by the Sponsor', isCorrect: false, order: 3 }, { optionText: 'Payments to the site as remediation', isCorrect: false, order: 4 }] },
        { questionText: 'An MHRA GCP Inspection differs from a Sponsor Audit in that:', questionType: 'MULTIPLE_CHOICE', explanation: 'An inspection is conducted by the MHRA (regulatory authority); an audit is conducted by the Sponsor or an independent auditor.', marks: 1, order: 4,
          options: [{ optionText: 'An inspection is by the MHRA (regulatory authority); an audit is by the Sponsor or independent auditors', isCorrect: true, order: 1 }, { optionText: 'An inspection is internal; an audit is by regulators', isCorrect: false, order: 2 }, { optionText: 'They are the same thing with different names', isCorrect: false, order: 3 }, { optionText: 'Only inspections result in formal findings', isCorrect: false, order: 4 }] },
      ],
    },
  },
  {
    title: 'Module 6: Site Close-out Visit (COV) & Trial Archiving',
    description: 'Complete the trial lifecycle: close a site compliantly with IMP reconciliation, document collection, archiving, and the final assessment.',
    order: 6, isMandatory: true,
    lessons: [
      { title: 'The Close-out Visit (COV): Procedure & Checklist', lessonType: 'VIDEO', videoUrl: VIDEOS.closure, videoDurationMinutes: 13, isPreview: false, order: 1, content: CONTENT.cov,
        downloadableResources: [
          { label: 'COV Pre-Visit Checklist (PDF)', url: 'https://exonsciences.com/resources/cov-checklist.pdf' },
          { label: 'COV Report Template (DOCX)', url: 'https://exonsciences.com/resources/cov-report-template.docx' },
          { label: 'IMP Final Reconciliation Log Template (XLSX)', url: 'https://exonsciences.com/resources/imp-reconciliation-log.xlsx' },
        ] },
      { title: 'Clinical Trial Terminology Reference & Course Summary', lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.terminology },
    ],
    quiz: {
      title: 'Final Assessment: Clinical Trial in the UK — Start-up to Closure',
      instructions: 'This is the final course assessment covering all 6 modules. Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Your certificate is issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 30, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        { questionText: 'The correct order of the drug development life cycle is:', questionType: 'MULTIPLE_CHOICE', explanation: 'Discovery → Preclinical → Clinical (Phases 1–3) → Regulatory Approval → Post-Market Surveillance.', marks: 1, order: 1,
          options: [{ optionText: 'Discovery → Preclinical → Clinical → Regulatory Approval → Post-Market Surveillance', isCorrect: true, order: 1 }, { optionText: 'Clinical → Preclinical → Discovery → Regulatory Approval', isCorrect: false, order: 2 }, { optionText: 'Preclinical → Discovery → Clinical → Post-Market Surveillance', isCorrect: false, order: 3 }, { optionText: 'Regulatory Approval → Clinical → Discovery → Surveillance', isCorrect: false, order: 4 }] },
        { questionText: 'Which UK body issues the Clinical Trial Authorisation (CTA)?', questionType: 'MULTIPLE_CHOICE', explanation: 'The MHRA grants the CTA via the IRAS portal.', marks: 1, order: 2,
          options: [{ optionText: 'MHRA', isCorrect: true, order: 1 }, { optionText: 'HRA', isCorrect: false, order: 2 }, { optionText: 'NIHR', isCorrect: false, order: 3 }, { optionText: 'NHS England', isCorrect: false, order: 4 }] },
        { questionText: 'How many RECs does the HRA oversee across the UK?', questionType: 'MULTIPLE_CHOICE', explanation: '85 RECs: 65 England, 11 Scotland, 7 Wales, 2 Northern Ireland.', marks: 1, order: 3,
          options: [{ optionText: '85', isCorrect: true, order: 1 }, { optionText: '65', isCorrect: false, order: 2 }, { optionText: '100', isCorrect: false, order: 3 }, { optionText: '50', isCorrect: false, order: 4 }] },
        { questionText: 'What must be signed before a site receives trial-specific feasibility information?', questionType: 'MULTIPLE_CHOICE', explanation: 'A CDA must be signed before any proprietary trial information is shared.', marks: 1, order: 4,
          options: [{ optionText: 'Confidentiality Disclosure Agreement (CDA)', isCorrect: true, order: 1 }, { optionText: 'Clinical Trial Agreement (CTA)', isCorrect: false, order: 2 }, { optionText: 'Protocol Signature Page', isCorrect: false, order: 3 }, { optionText: 'Delegation Log', isCorrect: false, order: 4 }] },
        { questionText: 'The SSV Report must be completed within:', questionType: 'MULTIPLE_CHOICE', explanation: 'The Site Selection Visit report must be completed within 15 working days.', marks: 1, order: 5,
          options: [{ optionText: '15 working days', isCorrect: true, order: 1 }, { optionText: '10 working days', isCorrect: false, order: 2 }, { optionText: '5 working days', isCorrect: false, order: 3 }, { optionText: '30 days', isCorrect: false, order: 4 }] },
        { questionText: 'No patient can be enrolled until:', questionType: 'MULTIPLE_CHOICE', explanation: 'Sites cannot enrol patients until SIV is complete, all essential documents are in the ISF, and Sponsor has issued written Site Activation.', marks: 1, order: 6,
          options: [{ optionText: 'SIV is complete, ISF is ready, and Sponsor confirms site activation in writing', isCorrect: true, order: 1 }, { optionText: 'The CRA has received verbal confirmation from the PI', isCorrect: false, order: 2 }, { optionText: 'The feasibility questionnaire is returned', isCorrect: false, order: 3 }, { optionText: 'The first monitoring report is filed', isCorrect: false, order: 4 }] },
        { questionText: 'Which of the following are classified as Serious Adverse Events?', questionType: 'MULTI_SELECT', explanation: 'SAEs: death, life-threatening, hospitalisation, disability, congenital malformation, medically important events.', marks: 2, order: 7,
          options: [{ optionText: 'Death', isCorrect: true, order: 1 }, { optionText: 'Life-threatening event', isCorrect: true, order: 2 }, { optionText: 'Prolonged hospitalisation', isCorrect: true, order: 3 }, { optionText: 'Grade 1 nausea without intervention', isCorrect: false, order: 4 }, { optionText: 'Congenital malformation', isCorrect: true, order: 5 }] },
        { questionText: 'SUSAR stands for:', questionType: 'MULTIPLE_CHOICE', explanation: 'Suspected Unexpected Serious Adverse Reaction.', marks: 1, order: 8,
          options: [{ optionText: 'Suspected Unexpected Serious Adverse Reaction', isCorrect: true, order: 1 }, { optionText: 'Serious Unexpected Suspected Adverse Reaction', isCorrect: false, order: 2 }, { optionText: 'Suspected Unrelated Serious Adverse Report', isCorrect: false, order: 3 }, { optionText: 'Safety Update Submission and Adverse Reaction', isCorrect: false, order: 4 }] },
        { questionText: 'A fatal SUSAR must be reported to EudraVigilance within:', questionType: 'MULTIPLE_CHOICE', explanation: 'Fatal/life-threatening SUSARs: 7 days from Sponsor awareness, complete report in 8 more days.', marks: 1, order: 9,
          options: [{ optionText: '7 days (+ 8-day follow-up)', isCorrect: true, order: 1 }, { optionText: '15 days', isCorrect: false, order: 2 }, { optionText: '24 hours', isCorrect: false, order: 3 }, { optionText: '30 days', isCorrect: false, order: 4 }] },
        { questionText: '"A — Accurate" in ALCOA-CCEA means:', questionType: 'MULTIPLE_CHOICE', explanation: 'Accurate = data reflects the actual observation exactly. Errors corrected with single strikethrough, date, initials, reason.', marks: 1, order: 10,
          options: [{ optionText: 'Data reflects the actual observation or measurement precisely', isCorrect: true, order: 1 }, { optionText: 'Data is traceable to the person who recorded it', isCorrect: false, order: 2 }, { optionText: 'Data was recorded at the time of observation', isCorrect: false, order: 3 }, { optionText: 'Data is available for inspection at any time', isCorrect: false, order: 4 }] },
        { questionText: 'Which is NOT an objective of the Close-out Visit?', questionType: 'MULTIPLE_CHOICE', explanation: 'Protocol training is an SIV activity. The COV closes down all trial activities.', marks: 1, order: 11,
          options: [{ optionText: 'Training the site on the study protocol', isCorrect: true, order: 1 }, { optionText: 'Final IMP accountability and reconciliation', isCorrect: false, order: 2 }, { optionText: 'Collecting signed logs from the site', isCorrect: false, order: 3 }, { optionText: 'Shutting down EDC and IRT access', isCorrect: false, order: 4 }] },
        { questionText: '"If it was not documented, it was not done." This principle applies to:', questionType: 'MULTIPLE_CHOICE', explanation: 'This fundamental GCP principle applies to all clinical trial activities without exception.', marks: 1, order: 12,
          options: [{ optionText: 'All clinical trial activities', isCorrect: true, order: 1 }, { optionText: 'Safety events (AEs/SAEs) only', isCorrect: false, order: 2 }, { optionText: 'Protocol procedures only', isCorrect: false, order: 3 }, { optionText: 'Financial transactions only', isCorrect: false, order: 4 }] },
        { questionText: 'The Delegation Log must include:', questionType: 'MULTI_SELECT', explanation: 'The log must include: tasks, start date, end date, and PI countersignature. It is a living document.', marks: 2, order: 13,
          options: [{ optionText: 'Delegated tasks for each staff member', isCorrect: true, order: 1 }, { optionText: 'Start date of each delegation', isCorrect: true, order: 2 }, { optionText: 'End date of each delegation', isCorrect: true, order: 3 }, { optionText: 'PI countersignature', isCorrect: true, order: 4 }, { optionText: "Staff national insurance number", isCorrect: false, order: 5 }] },
        { questionText: 'UK CTIMPs must retain trial documents for a minimum of:', questionType: 'MULTIPLE_CHOICE', explanation: 'UK regulations require CTIMP document retention for a minimum of 25 years from the end of the trial.', marks: 1, order: 14,
          options: [{ optionText: '25 years', isCorrect: true, order: 1 }, { optionText: '10 years', isCorrect: false, order: 2 }, { optionText: '15 years', isCorrect: false, order: 3 }, { optionText: '5 years', isCorrect: false, order: 4 }] },
        { questionText: 'Source Data Verification (SDV) involves:', questionType: 'MULTIPLE_CHOICE', explanation: 'SDV = comparing EDC data directly against original source documents to verify accuracy and completeness.', marks: 1, order: 15,
          options: [{ optionText: 'Comparing EDC data against original source documents to verify accuracy', isCorrect: true, order: 1 }, { optionText: 'Checking that the ISF is complete', isCorrect: false, order: 2 }, { optionText: 'Reviewing the IMP accountability log', isCorrect: false, order: 3 }, { optionText: 'Confirming the Delegation Log is up to date', isCorrect: false, order: 4 }] },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  SEEDING: Clinical Trial UK — Start-up to Closure');
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
      title: 'Clinical Trial in the UK: Start-up to Closure',
      subtitle: 'End-to-end UK clinical trial training: from MHRA authorisation to site closure and archiving',
      learningObjectives: [
        'Explain the complete drug development life cycle from discovery to post-market surveillance',
        'Identify the roles of MHRA, HRA, NIHR and NHS R&D in UK clinical trial governance',
        'Prepare and conduct Site Selection, Initiation, Monitoring, and Close-out Visits',
        'Manage Adverse Events, SAEs, SUSARs, and Protocol Deviations compliantly',
        'Apply ALCOA-CCEA data integrity principles to all trial documentation',
        'Execute GCP-compliant site closure and archiving procedures',
      ],
      prerequisites: ['Basic understanding of clinical research terminology', 'No prior CRA or site experience required'],
      targetAudience: ['CRAs and monitors', 'Research Nurses and Site Co-ordinators', 'Principal Investigators entering commercial trials', 'Sponsor and CRO start-up professionals', 'Clinical research graduates'],
      durationHours: 10,
      difficultyLevel: 'INTERMEDIATE',
      accreditation: 'MHRA Aligned | ICH GCP E6(R3) | ACRP Approved',
      price: 149.00,
      originalPrice: 199.00,
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Clinical Trial UK Start-up to Closure | Exon Sciences LMS',
      seoDescription: 'Comprehensive UK clinical trial training covering MHRA, HRA, site initiation, monitoring, SAE/SUSAR reporting, ALCOA-CCEA, and site closure. ICH GCP E6(R3) aligned.',
      tags: ['UK', 'clinical-trials', 'CRA', 'MHRA', 'GCP', 'site-management', 'monitoring', 'SAE', 'SUSAR', 'ALCOA', 'ISF', 'TMF', 'SIV', 'SSV', 'COV'],
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
          content: l.content,          // stored as HTML string
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
      data: { courseId: existing.id, heading: 'Certificate of Completion', bodyText: 'This is to certify that the above-named learner has successfully completed "Clinical Trial in the UK: Start-up to Closure" and demonstrated competency in all assessed learning outcomes.', signatureName: 'Dr. Sarah Mitchell', signatureTitle: 'Lead Clinical Research Trainer, Exon Sciences', logoUrl: 'https://exonsciences.com/assets/logo-dark.png' },
    });
    console.log('\n  🏅 Certificate template created.');
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  ✨ SEED COMPLETE');
  console.log(`  Modules: ${MODULES.length} | Lessons: ${totalLessons} | Quiz Questions: ${totalQuestions}`);
  console.log('  Content: Rich HTML strings (rendered via dangerouslySetInnerHTML)');
  console.log('  Videos: YouTube embeds (replace with own recordings when ready)');
  console.log('  Preview: /courses/clinical-trial-uk-startup-to-closure');
  console.log('═══════════════════════════════════════════════════════\n');
}

main()
  .catch(e => { console.error('❌', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
