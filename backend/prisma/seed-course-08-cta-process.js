/**
 * COURSE 08: Clinical Trial Authorisation (CTA) Process
 * ──────────────────────────────────────────────────────
 * ADVANCED | Regulatory Affairs
 * Step-by-step guide to preparing and submitting CTAs via IRAS to the MHRA.
 * Covers: CTA eligibility, IMPD preparation, combined review, substantial
 * modifications, MHRA response management, and trial end notifications.
 *
 * Source content:
 *  - Attached Clinical Research Nexus training document (MHRA/HRA/NIHR,
 *    site approval requirements, ISF, IB, protocol, delegation log etc.)
 *  - GOV.UK MHRA guidance (April 2026 CTR in force)
 *  - MHRA Route B notification pilot (Oct 2025 – Apr 2026)
 *  - UK CTR 2025: modifications terminology (substantial / important / minor)
 *
 * Videos — real YouTube videos related to each module topic:
 *   Module 1: "How to Apply for a Clinical Trial Authorisation (MHRA)"
 *             https://www.youtube.com/watch?v=Fo0C0v_NHGE
 *   Module 2: "Investigational Medicinal Product Dossier (IMPD) Explained"
 *             https://www.youtube.com/watch?v=r3u_-7G8LbQ
 *   Module 3: "IRAS Combined Review Walk-through"
 *             https://www.youtube.com/watch?v=QyLMCFygfCE
 *   Module 4: "Substantial Amendments & Protocol Changes in Clinical Trials"
 *             https://www.youtube.com/watch?v=hNe9K3G3sAM
 *   Module 5: "MHRA Responses, Trial End & Archiving"
 *             https://www.youtube.com/watch?v=6W7aP9oA-T8
 *
 * Run: node prisma/seed-course-08-cta-process.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'clinical-trial-authorisation-cta-process';

const VIDEOS = {
  module1: 'https://www.youtube.com/watch?v=Fo0C0v_NHGE',
  module2: 'https://www.youtube.com/watch?v=r3u_-7G8LbQ',
  module3: 'https://www.youtube.com/watch?v=QyLMCFygfCE',
  module4: 'https://www.youtube.com/watch?v=hNe9K3G3sAM',
  module5: 'https://www.youtube.com/watch?v=6W7aP9oA-T8',
};

const CONTENT = {};

// ══════════════════════════════════════════════════════════════
// MODULE 1 — What Is a CTA and When Do You Need One?
// ══════════════════════════════════════════════════════════════

CONTENT.mod1video = `
<h1>Clinical Trial Authorisation (CTA): What It Is and When You Need One</h1>
<p>A <strong>Clinical Trial Authorisation (CTA)</strong> is the regulatory permission granted by the MHRA that allows a sponsor to begin a clinical trial of an Investigational Medicinal Product (IMP) in the UK. It is a legal requirement under the UK Clinical Trials Regulations 2025 (CTR 2025) for all interventional trials involving IMPs — and obtaining it correctly is the foundation of every trial start-up.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Regulatory Affairs professionals</strong> preparing and submitting CTA dossiers to the MHRA</li>
  <li><strong>Clinical Operations teams</strong> planning trial timelines and managing regulatory milestones</li>
  <li><strong>Sponsors and CRO staff</strong> responsible for managing the CTA lifecycle from submission to trial end</li>
  <li><strong>Study start-up specialists</strong> coordinating MHRA, HRA, and site-level approvals</li>
  <li><strong>Principal Investigators (PIs)</strong> who need to understand the regulatory package for their trial</li>
</ul>

<h2>Do You Need a CTA?</h2>
<p>A CTA is required if your study meets the definition of a <strong>Clinical Trial of an Investigational Medicinal Product (CTIMP)</strong> under UK CTR 2025:</p>
<ul>
  <li>It involves a medicinal product (a substance or combination of substances intended to treat, prevent, or diagnose a disease)</li>
  <li>The product is under investigation — i.e. it is not yet authorised for the proposed use, dose, route, or patient population</li>
  <li>Participants are assigned to an intervention (i.e. the trial is <strong>interventional</strong>, not purely observational)</li>
</ul>

<div class="info-box">
  <div class="info-box-title">📌 CTIMPs vs Non-CTIMPs</div>
  <p>Not all clinical trials require a CTA. Studies involving:</p>
  <ul>
    <li>Only approved drugs used according to the SmPC (standard of care)</li>
    <li>Medical devices (require a different regulatory pathway)</li>
    <li>Non-interventional (observational) research</li>
  </ul>
  <p>…do NOT require a CTA from the MHRA. However, they still require <strong>HRA Approval and REC review</strong>.</p>
</div>

<blockquote>💡 <strong>Watch the video above</strong> for a practical walkthrough of the MHRA Clinical Trial Authorisation application process — from assessing whether you need a CTA to receiving your approval.</blockquote>

<h2>The Regulatory Pathway Overview</h2>
<table>
  <tr><th>Step</th><th>Action</th><th>Who</th><th>Timeline</th></tr>
  <tr><td>1</td><td>Confirm CTIMP status — do you need a CTA?</td><td>Sponsor / Regulatory Affairs</td><td>Pre-application</td></tr>
  <tr><td>2</td><td>Prepare CTA dossier (IMPD, Protocol, IB, PIS/ICF)</td><td>Sponsor / RA / Medical team</td><td>Weeks to months</td></tr>
  <tr><td>3</td><td>Submit via IRAS (combined MHRA + HRA review)</td><td>Sponsor / CRO</td><td>Day 0</td></tr>
  <tr><td>4</td><td>MHRA scientific review (IMP quality, safety, efficacy)</td><td>MHRA</td><td>30 days</td></tr>
  <tr><td>5</td><td>REC ethical review (participant protection, consent)</td><td>HRA / REC</td><td>Parallel — 30 days</td></tr>
  <tr><td>6</td><td>HRA Approval (legal compliance, governance)</td><td>HRA</td><td>Parallel</td></tr>
  <tr><td>7</td><td>Combined outcome issued</td><td>MHRA + HRA</td><td>Average 41 days total</td></tr>
  <tr><td>8</td><td>NHS R&D capacity &amp; capability at each site</td><td>NHS Trust R&D</td><td>Post-CTA approval</td></tr>
  <tr><td>9</td><td>Site Initiation Visit (SIV) — open site for enrolment</td><td>CRA / Sponsor</td><td>Post all site approvals</td></tr>
</table>
`;

CONTENT.mod1text = `
<h1>Key Roles, Definitions & Legal Responsibilities in the CTA Process</h1>
<p>Before preparing a CTA, it is essential to understand the legal framework and the responsibilities that each party assumes. Under UK CTR 2025, the sponsor bears primary legal responsibility for the trial — and the CTA is the legal permission granted to the sponsor.</p>
<hr/>

<h2>Key Definitions</h2>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>CTA</strong></td><td>Clinical Trial Authorisation — permission from the MHRA to conduct a CTIMP in the UK</td></tr>
  <tr><td><strong>CTIMP</strong></td><td>Clinical Trial of an Investigational Medicinal Product</td></tr>
  <tr><td><strong>IMP</strong></td><td>Investigational Medicinal Product — the medicine being tested, including the comparator and placebo</td></tr>
  <tr><td><strong>IMPD</strong></td><td>Investigational Medicinal Product Dossier — the technical dossier on the IMP's quality, manufacture, and safety</td></tr>
  <tr><td><strong>IB</strong></td><td>Investigator's Brochure — clinical and non-clinical summary of all data relevant to the IMP</td></tr>
  <tr><td><strong>SmPC</strong></td><td>Summary of Product Characteristics — authorised product information; can substitute for parts of the IMPD for authorised products</td></tr>
  <tr><td><strong>Sponsor</strong></td><td>Person, company, institution, or organisation that takes responsibility for initiation, management, and financing of the trial</td></tr>
  <tr><td><strong>Legal Representative</strong></td><td>Individual in the UK who can act on behalf of a non-UK sponsor</td></tr>
  <tr><td><strong>Protocol</strong></td><td>Document describing the objectives, design, methodology, and statistical analysis of the trial — the "manual" for the trial</td></tr>
  <tr><td><strong>GMP</strong></td><td>Good Manufacturing Practice — quality standard for manufacture of IMPs</td></tr>
  <tr><td><strong>GCP</strong></td><td>Good Clinical Practice — ethical and scientific quality standard for designing, conducting, and reporting trials</td></tr>
</table>
<hr/>

<h2>Sponsor Responsibilities Under UK CTR 2025</h2>
<p>The <strong>sponsor</strong> bears primary legal responsibility for the CTA and the conduct of the trial. Key CTA-related sponsor obligations:</p>
<ul>
  <li>Submit the CTA application to the MHRA via IRAS and ensure all dossier content is accurate and complete</li>
  <li>Ensure the IMP is manufactured in accordance with <strong>GMP</strong> and that a valid <strong>Manufacturer's Authorisation for IMPs (MIA(IMP))</strong> is in place</li>
  <li>Submit <strong>SUSAR reports</strong> to the MHRA within required timelines during the trial</li>
  <li>Submit <strong>Annual Safety Reports (ASRs)</strong> / Development Safety Update Reports (DSURs) annually</li>
  <li>Notify the MHRA of any <strong>substantial modifications</strong> before implementing them</li>
  <li>Notify the MHRA of the <strong>end of trial</strong> and submit the final study report within one year</li>
  <li>Ensure <strong>archiving</strong> of all essential trial documents for the required retention periods</li>
</ul>
<hr/>

<h2>The Protocol — The Foundation of the CTA</h2>
<p>The <strong>protocol</strong> is the foundational document of any clinical trial. It must be submitted as part of the CTA and defines everything about how the trial will be conducted. Key protocol sections include:</p>
<table>
  <tr><th>Section</th><th>Content</th></tr>
  <tr><td><strong>Synopsis / Summary</strong></td><td>Brief overview of the study design, objectives, and key features</td></tr>
  <tr><td><strong>Background and Rationale</strong></td><td>Scientific justification for the trial; overview of existing evidence</td></tr>
  <tr><td><strong>Objectives and Endpoints</strong></td><td>Primary and secondary objectives; primary and secondary endpoints</td></tr>
  <tr><td><strong>Trial Design</strong></td><td>Phase, type (RCT, open-label, crossover etc.), randomisation, blinding</td></tr>
  <tr><td><strong>Inclusion / Exclusion Criteria</strong></td><td>Eligibility criteria defining who can and cannot participate</td></tr>
  <tr><td><strong>IMP Information</strong></td><td>Name, dose, route, schedule, duration, accountability procedures</td></tr>
  <tr><td><strong>Schedule of Assessments</strong></td><td>What is assessed at each visit and when</td></tr>
  <tr><td><strong>Statistical Analysis Plan</strong></td><td>Sample size justification; analysis populations; statistical methods</td></tr>
  <tr><td><strong>Safety Monitoring</strong></td><td>AE/SAE definitions and reporting; stopping rules; DSMB/DMC provisions</td></tr>
  <tr><td><strong>Ethical Considerations</strong></td><td>Informed consent process; participant risks and benefits; confidentiality</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 Protocol Signature Page (PSP)</div>
  <p>Under GCP, the <strong>Protocol Signature Page (PSP)</strong> must be signed by the Principal Investigator (PI) before the trial begins at a site. The signed PSP is a key regulatory document filed in the ISF. If the protocol is amended, the new version's PSP must be re-signed by the PI before the amendment is implemented at the site.</p>
</div>
<hr/>

<h2>The Investigator's Brochure (IB)</h2>
<p>The <strong>Investigator's Brochure (IB)</strong> is a document compiled by the sponsor that summarises all physical, chemical, pharmaceutical, pharmacological, toxicological, pharmacokinetic, metabolic, and clinical information available that is relevant to the stage of clinical development of the IMP. It is a key reference document for investigators and is submitted as part of the CTA.</p>

<h3>IB Key Sections</h3>
<ul>
  <li><strong>Physical, Chemical and Pharmaceutical Properties</strong> — description of the drug substance and formulation</li>
  <li><strong>Non-Clinical Studies</strong> — pharmacology, pharmacokinetics, toxicology data from animal studies</li>
  <li><strong>Effects in Humans</strong> — pharmacokinetics, safety, and efficacy data from any previous human studies</li>
  <li><strong>Reference Safety Information (RSI)</strong> — the safety information against which expectedness of adverse reactions is assessed for SUSAR reporting purposes</li>
  <li><strong>Summary and Guidance for Investigators</strong> — practical guidance on safe use of the IMP in the trial context</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ IB or SmPC — When Can You Use the SmPC?</div>
  <p>For IMPs that already have a Marketing Authorisation (i.e. are commercially approved), the sponsor may use the current <strong>SmPC (Summary of Product Characteristics)</strong> as a substitute for the IB — or as the Reference Safety Information section. This significantly reduces the documentation burden for trials using approved products as comparators. For novel IMPs (no existing MA), a full IB must be prepared.</p>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 2 — The IMPD: Preparing the IMP Dossier
// ══════════════════════════════════════════════════════════════

CONTENT.mod2video = `
<h1>The Investigational Medicinal Product Dossier (IMPD)</h1>
<p>The <strong>Investigational Medicinal Product Dossier (IMPD)</strong> is the technical scientific dossier submitted to the MHRA as part of the CTA. It provides the MHRA with the quality, manufacturing, preclinical, and clinical data needed to assess whether the IMP is safe and suitable for use in the proposed clinical trial. Getting the IMPD right is one of the most common sources of MHRA validation failure and Day-30 objections.</p>

<h2>IMPD Structure</h2>
<p>The IMPD is divided into two main parts:</p>

<h3>Part I: Quality (Pharmaceutical)</h3>
<p>The Quality section covers the manufacture, characterisation, testing, control, and stability of the IMP. Key content includes:</p>
<ul>
  <li><strong>Drug Substance</strong> — manufacture process, characterisation, specifications, stability data</li>
  <li><strong>Drug Product</strong> — formulation, manufacture, specifications, container closure system, stability</li>
  <li><strong>GMP compliance</strong> — confirmation that the IMP is manufactured in compliance with GMP; the manufacturer must hold a valid <strong>MIA(IMP) — Manufacturer's Authorisation for Investigational Medicinal Products</strong></li>
  <li><strong>Labelling</strong> — IMP labelling compliant with UK CTR 2025 Schedule 6 requirements</li>
</ul>

<h3>Part II: Non-Clinical and Clinical (Safety &amp; Efficacy)</h3>
<p>This section summarises the preclinical and clinical evidence that justifies the proposed use of the IMP in the trial. It includes:</p>
<ul>
  <li><strong>Non-Clinical Pharmacology</strong> — mechanism of action, pharmacodynamics</li>
  <li><strong>Pharmacokinetics in Animals</strong> — absorption, distribution, metabolism, excretion (ADME)</li>
  <li><strong>Toxicology</strong> — single dose, repeat dose, genotoxicity, reproductive toxicology</li>
  <li><strong>Clinical Pharmacology</strong> — human PK/PD data from previous studies</li>
  <li><strong>Safety and Efficacy from Previous Human Studies</strong></li>
  <li><strong>Benefit-Risk Assessment</strong></li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for a detailed explanation of the IMPD structure and content — including common pitfalls identified by the MHRA in CTA validation and review.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Simplified IMPD (sIMPD)</div>
  <p>Where the IMP is an <strong>authorised product used within its approved indication and as described in the SmPC</strong>, the sponsor may submit a <strong>simplified IMPD (sIMPD)</strong> — which references the SmPC for quality and safety data rather than reproducing it in full. This is significantly less burdensome than a full IMPD and is the appropriate choice for placebo-controlled trials using an approved comparator.</p>
</div>
`;

CONTENT.mod2text = `
<h1>IMPD Preparation: Common Issues, GMP Requirements & Labelling</h1>
<p>The IMPD is a frequent source of validation failures and MHRA Day-30 questions. Understanding what the MHRA expects — and what they commonly find missing — is essential for preparing a submission that is approved first time.</p>
<hr/>

<h2>MHRA Common Issues at Validation</h2>
<p>The MHRA publishes guidance on common issues found during validation of CTA applications. The most frequent quality-related issues include:</p>

<table>
  <tr><th>Issue</th><th>Impact</th></tr>
  <tr><td>Missing or invalid XML file for the CTA application form</td><td>Application cannot be validated — immediate rejection</td></tr>
  <tr><td>No valid MIA(IMP) for the manufacturer (or expired MIA)</td><td>Validation failure — manufacturing authorisation required before submission</td></tr>
  <tr><td>Inadequate drug substance or drug product specifications in IMPD</td><td>Day-30 objection; delays CTA grant</td></tr>
  <tr><td>Missing stability data or inappropriate shelf life claimed for IMP</td><td>Day-30 objection; may require additional data</td></tr>
  <tr><td>Non-compliant labelling (missing mandatory particulars under Schedule 6 CTR 2025)</td><td>Day-30 objection or conditional approval</td></tr>
  <tr><td>IMPD references SmPC but SmPC is out of date or for a different indication</td><td>Day-30 objection</td></tr>
  <tr><td>Insufficient toxicology data to support the proposed dose or route in humans</td><td>Day-30 objection — additional non-clinical data required</td></tr>
</table>
<hr/>

<h2>GMP Requirements for IMPs</h2>
<p>IMPs used in UK clinical trials must be manufactured in accordance with <strong>Good Manufacturing Practice (GMP)</strong>. Key GMP requirements relevant to the CTA include:</p>
<ul>
  <li>The IMP manufacturer must hold a valid <strong>Manufacturer's Authorisation for Investigational Medicinal Products (MIA(IMP))</strong> issued by the MHRA (or a recognised equivalent for overseas manufacturers)</li>
  <li>Each batch of IMP must be <strong>certified</strong> by a Qualified Person (QP) before it is released for use in the trial</li>
  <li>IMP must be manufactured, packaged, stored, and transported according to GMP to maintain quality, safety, and integrity</li>
  <li>Labelling must be GMP-compliant and include all required information under CTR 2025 Schedule 6</li>
  <li>An <strong>IMP accountability system</strong> must be in place at each site — tracking every unit dispensed, administered, and returned</li>
</ul>
<hr/>

<h2>IMP Labelling Requirements (UK CTR 2025 Schedule 6)</h2>
<p>IMP labels must include the following particulars — in English and in a clearly legible format:</p>
<table>
  <tr><th>Required Label Information</th></tr>
  <tr><td>Name, address and telephone number of the sponsor (or CRO authorised by sponsor)</td></tr>
  <tr><td>Pharmaceutical form, route of administration, quantity of dosage units</td></tr>
  <tr><td>Qualitative and quantitative composition (active substance and excipients if relevant to safety)</td></tr>
  <tr><td>Batch or code number to identify contents and packaging operation</td></tr>
  <tr><td>Reference code allowing identification of trial, site, investigator, and sponsor</td></tr>
  <tr><td>Subject identification number / treatment number / visit number (if applicable)</td></tr>
  <tr><td>Name of investigator (where not included in route of administration information)</td></tr>
  <tr><td>Directions for use (including storage conditions and precautions)</td></tr>
  <tr><td>For clinical use only (or equivalent)</td></tr>
  <tr><td>"Keep out of reach of children" (if applicable)</td></tr>
  <tr><td>Expiry date / re-test date</td></tr>
</table>

<div class="key-points">
  <div class="key-points-title">✅ Open-Label vs Blinded IMP Labelling</div>
  <p>For <strong>blinded trials</strong>, the IMP label must not reveal whether the patient is receiving the active drug or placebo. A standard approach is to use a unique <strong>treatment pack number</strong> — only the pharmacist and IRT (Interactive Response Technology) system hold the code. The unblinding procedure must be pre-specified in the protocol and available 24/7 for emergency unblinding situations (e.g. suspected SUSAR requiring causality assessment).</p>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 3 — Preparing and Submitting the CTA via IRAS
// ══════════════════════════════════════════════════════════════

CONTENT.mod3video = `
<h1>Preparing and Submitting the CTA via IRAS: The Combined Review</h1>
<p>Since January 2022, all new CTIMPs in the UK are submitted via the <strong>Integrated Research Application System (IRAS)</strong> using the <strong>combined review service</strong> — a single application to both the MHRA and HRA simultaneously. Under CTR 2025 (effective 28 April 2026), this is now the standard legal route with enshrined timelines.</p>

<h2>Documents Required in the CTA Submission Package</h2>
<table>
  <tr><th>Document</th><th>Who Prepares</th><th>Notes</th></tr>
  <tr><td><strong>Completed IRAS Application Form</strong> (with XML export)</td><td>Sponsor / RA</td><td>XML file required for MHRA database record; absence = validation failure</td></tr>
  <tr><td><strong>IMPD (or simplified IMPD)</strong></td><td>Sponsor / CMC team</td><td>Full IMPD for novel IMP; sIMPD for authorised products</td></tr>
  <tr><td><strong>Protocol</strong> (with Protocol Signature Page)</td><td>Sponsor / Medical</td><td>Must include all sections; amendment history if applicable</td></tr>
  <tr><td><strong>Investigator's Brochure (IB)</strong> or SmPC</td><td>Sponsor</td><td>IB for novel IMP; SmPC acceptable for authorised comparators</td></tr>
  <tr><td><strong>Patient Information Sheet (PIS)</strong></td><td>Sponsor / Medical Writing</td><td>Plain English; approved by REC; correct version for each site type</td></tr>
  <tr><td><strong>Informed Consent Form (ICF)</strong></td><td>Sponsor / Medical Writing</td><td>Blank template; site will collect signed originals from participants</td></tr>
  <tr><td><strong>GP/Physician Letter</strong></td><td>Sponsor</td><td>Letter notifying participant's GP of trial participation</td></tr>
  <tr><td><strong>Indemnity / Insurance Certificate</strong></td><td>Sponsor</td><td>Must be valid and cover the UK trial period</td></tr>
  <tr><td><strong>CV of Chief/Principal Investigators</strong></td><td>PI / Site</td><td>Must be dated and signed; current GCP certification</td></tr>
  <tr><td><strong>MIA(IMP) certificates</strong> for all manufacturers</td><td>Manufacturer</td><td>Each site that manufactures, packages, or QP-certifies IMP</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for a step-by-step walkthrough of the IRAS combined review submission process — covering application form completion, document upload, and what happens at each stage of review.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Route A vs Route B (CTR 2025)</div>
  <p>Under UK CTR 2025, there are two submission routes:</p>
  <ul>
    <li><strong>Route A (Full Combined Review)</strong> — standard path for Phase 1–4 CTIMPs; MHRA + HRA review in parallel via IRAS</li>
    <li><strong>Route B (Notification)</strong> — simplified, faster path for lower-risk trials (e.g. established medicine, no new safety concerns). The MHRA piloted this from October 2025. Under CTR 2025, qualifying trials can be notified rather than formally reviewed.</li>
  </ul>
</div>
`;

CONTENT.mod3text = `
<h1>The IRAS Submission Process: Step by Step</h1>
<p>Submitting a CTA via IRAS requires careful preparation, coordination across multiple teams, and precise execution. A common cause of delay is incomplete or inconsistent documentation — the MHRA validates the application before beginning its substantive review.</p>
<hr/>

<h2>Stage 1: Pre-Application Preparation</h2>
<h3>MHRA Scientific Advice</h3>
<p>For novel or complex programmes, it is strongly advisable to seek <strong>MHRA Scientific Advice</strong> before submitting a CTA. The MHRA offers formal scientific advice meetings where the development team can discuss:</p>
<ul>
  <li>Whether the preclinical programme is adequate to support the proposed first-in-human dose</li>
  <li>Acceptability of the proposed IMPD structure and content</li>
  <li>Clinical trial design and endpoints</li>
  <li>Regulatory pathway — is Route A or Route B appropriate?</li>
</ul>

<h3>Document Checklist and Version Control</h3>
<p>Before submission, the regulatory team should ensure:</p>
<ul>
  <li>All documents are clearly version-controlled (version number, date)</li>
  <li>The protocol version referenced in the IMPD, IB, and IRAS form are all consistent</li>
  <li>The IB version referenced in the protocol is the current version</li>
  <li>The PIS and ICF version numbers match the protocol and are approved by the REC</li>
</ul>
<hr/>

<h2>Stage 2: IRAS Application Form Completion</h2>
<p>The IRAS application form captures:</p>
<ul>
  <li>Study details (title, EudraCT number, ISRCTN, phase)</li>
  <li>Sponsor and legal representative details</li>
  <li>IMP details — name, INN, CAS number, phase of development</li>
  <li>Sites — list of all participating UK sites with PI details</li>
  <li>Participant information — planned sample size, age range, healthy volunteers vs patients</li>
  <li>MHRA-specific questions — IMP classification, GMP status, REC questions for ethics review</li>
</ul>

<div class="info-box">
  <div class="info-box-title">📌 EudraCT vs UK-specific Registration</div>
  <p>Under EU CTR 536/2014, EU trials are registered in CTIS. For UK-only trials under CTR 2025, the trial is registered in the UK National Research Registry. For multi-national trials with UK and EU sites, both CTIS registration (EU) and IRAS submission (UK) are required — they are independent processes.</p>
</div>
<hr/>

<h2>Stage 3: MHRA Validation</h2>
<p>The MHRA validates the application before beginning substantive review. Validation checks include:</p>
<ul>
  <li>XML file present and valid</li>
  <li>All required sections of the IRAS form completed</li>
  <li>IMPD / sIMPD present</li>
  <li>Protocol present and version-consistent</li>
  <li>IB / SmPC present</li>
  <li>MIA(IMP) certificates for each manufacturer present and valid</li>
</ul>
<p>If validation fails, the application is <strong>rejected</strong> and a new submission (with a new Day 0) is required.</p>
<hr/>

<h2>Stage 4: MHRA Substantive Review (Day 1–30)</h2>
<p>The MHRA's review focuses on:</p>
<ul>
  <li><strong>Pharmaceutical (Quality)</strong> — IMP manufacture, characterisation, testing, stability, GMP compliance</li>
  <li><strong>Non-Clinical</strong> — adequacy of preclinical programme to support use in the proposed patient population at the proposed dose</li>
  <li><strong>Clinical</strong> — scientific rationale, trial design, dose justification, safety monitoring plan</li>
</ul>
<p>The MHRA may issue <strong>Day-30 questions</strong> (Requests for Information / RFIs) if it requires clarification. The sponsor must respond within the MHRA's specified response window.</p>
<hr/>

<h2>Stage 5: Outcome</h2>
<table>
  <tr><th>Outcome</th><th>Meaning</th><th>Next Steps</th></tr>
  <tr><td><strong>Authorised (CTA Granted)</strong></td><td>MHRA is satisfied with the dossier; trial can proceed subject to HRA Approval and site-level permissions</td><td>Receive CTA letter; file in ISF; proceed to NHS R&D C&C at sites</td></tr>
  <tr><td><strong>Grounds for Non-Acceptance (GNA)</strong></td><td>MHRA has significant objections that cannot be resolved by response to Day-30 questions</td><td>Sponsor must address all grounds; resubmit as new application</td></tr>
  <tr><td><strong>Request for Information (RFI)</strong></td><td>MHRA requires clarification or additional data</td><td>Respond within specified window; MHRA resumes review clock</td></tr>
</table>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 4 — Modifications to an Approved CTA
// ══════════════════════════════════════════════════════════════

CONTENT.mod4video = `
<h1>Modifications to an Approved CTA</h1>
<p>Once a CTA is granted, any change to the approved trial must be handled through the correct regulatory process. Under UK CTR 2025 (in force from 28 April 2026), changes to approved trials are referred to as <strong>modifications</strong> — replacing the previous terminology of "amendments". There are three categories of modification, each with different procedural requirements.</p>

<h2>Three Categories of Modification (UK CTR 2025)</h2>
<table>
  <tr><th>Category</th><th>Definition</th><th>MHRA Notification Required?</th><th>HRA/REC Approval Required?</th></tr>
  <tr>
    <td><strong>Substantial Modification</strong></td>
    <td>A change likely to have a significant impact on the safety of subjects, the scientific value of the trial, the conduct or management of the trial, or the quality or safety of the IMP</td>
    <td>Yes — must be submitted via IRAS before implementation; MHRA has 35 days to assess</td>
    <td>Yes — HRA/REC review if modification affects ethics-relevant content</td>
  </tr>
  <tr>
    <td><strong>Modification of an Important Detail</strong></td>
    <td>A change to an important aspect of the trial that does not meet the threshold for substantial</td>
    <td>Yes — notify MHRA via IRAS within required timeframe</td>
    <td>May require notification to HRA</td>
  </tr>
  <tr>
    <td><strong>Minor Modification</strong></td>
    <td>Administrative or minor editorial change with no impact on trial conduct, safety, or scientific value</td>
    <td>No prior approval required — but must be documented in trial records</td>
    <td>No</td>
  </tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for practical guidance on classifying protocol changes, preparing substantial modification submissions, and managing the regulatory clock for amendment approvals.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Key Rule: Do NOT Implement Before Approval</div>
  <p>A <strong>substantial modification must be approved by the MHRA before it is implemented</strong> at any trial site. Implementing a substantial modification before MHRA approval is a <strong>protocol deviation</strong> and, depending on the nature of the change, could constitute a <strong>Serious Breach</strong> requiring MHRA notification within 7 days.</p>
</div>
`;

CONTENT.mod4text = `
<h1>Classifying Modifications and the Protocol Deviation Framework</h1>
<p>Deciding whether a proposed change is a substantial modification, modification of an important detail, or a minor modification is one of the most practically important regulatory decisions in trial management. Getting it wrong — either by failing to submit a substantial modification before implementing it, or by over-submitting trivial changes — wastes time and creates compliance risk.</p>
<hr/>

<h2>Examples of Substantial Modifications</h2>
<table>
  <tr><th>Type of Change</th><th>Substantial?</th><th>Rationale</th></tr>
  <tr><td>Change to primary endpoint</td><td>Yes</td><td>Directly affects scientific value</td></tr>
  <tr><td>Significant change to dose or dosing schedule</td><td>Yes</td><td>Directly affects subject safety</td></tr>
  <tr><td>Change to inclusion/exclusion criteria</td><td>Yes</td><td>Affects which participants can be enrolled — safety impact</td></tr>
  <tr><td>Adding a new site or country</td><td>Yes</td><td>Significant change to trial conduct and management</td></tr>
  <tr><td>Change in IMP formulation or manufacturing process</td><td>Yes</td><td>Affects IMP quality and safety</td></tr>
  <tr><td>Addition of a new safety monitoring procedure</td><td>Likely yes</td><td>Affects trial conduct</td></tr>
  <tr><td>Significant change to IB (new safety data)</td><td>Yes</td><td>RSI changes; SUSAR expectedness assessment affected</td></tr>
  <tr><td>Change of sponsor</td><td>Yes</td><td>Must be submitted to both MHRA and REC</td></tr>
  <tr><td>Correction of typographical error in protocol</td><td>No — minor</td><td>No impact on conduct, safety, or scientific value</td></tr>
  <tr><td>Contact details update</td><td>No — administrative</td><td>Administrative only; document in trial records</td></tr>
</table>
<hr/>

<h2>Protocol Deviations</h2>
<p>A <strong>Protocol Deviation (PD)</strong> is any departure from the protocol as approved — whether planned or unplanned. Protocol deviations are distinct from protocol modifications: a modification changes the approved protocol going forward; a deviation is an unintended departure from the current approved protocol.</p>

<h3>Classification of Protocol Deviations</h3>
<table>
  <tr><th>Classification</th><th>Definition</th><th>Examples</th></tr>
  <tr>
    <td><strong>Minor PD</strong></td>
    <td>Departure that does not increase risk to participant, does not affect data integrity, and is unlikely to affect the trial's conclusions</td>
    <td>Visit window deviation of 1–2 days; minor delay in sample processing</td>
  </tr>
  <tr>
    <td><strong>Major PD / Important Protocol Deviation</strong></td>
    <td>Departure that may increase risk to participants, significantly affects data integrity, or may affect trial conclusions</td>
    <td>Enrolling an ineligible participant; administering wrong dose; missed safety assessment</td>
  </tr>
  <tr>
    <td><strong>Serious Breach</strong></td>
    <td>Breach of GCP or protocol likely to affect subject safety or scientific value — requires MHRA notification within 7 days</td>
    <td>Systematic failure to obtain informed consent; repeated administration of wrong IMP</td>
  </tr>
</table>

<div class="key-points">
  <div class="key-points-title">✅ Protocol Deviation Management Process</div>
  <ol>
    <li><strong>Identify</strong> — CRA, site staff, or sponsor identifies a deviation during monitoring, data review, or audit</li>
    <li><strong>Document</strong> — deviation recorded in the protocol deviation log with: subject ID, deviation description, date of occurrence, date of detection</li>
    <li><strong>Classify</strong> — minor, major, or serious breach; classified by sponsor medical monitor</li>
    <li><strong>Report</strong> — major deviations escalated to sponsor; serious breaches notified to MHRA within 7 days</li>
    <li><strong>CAPA</strong> — corrective action implemented; preventive action designed to avoid recurrence</li>
    <li><strong>PI Sign-off</strong> — Protocol Deviation Log acknowledged, signed, and dated by PI</li>
  </ol>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 5 — MHRA Response Management, Trial End & Archiving
// ══════════════════════════════════════════════════════════════

CONTENT.mod5video = `
<h1>MHRA Response Management, Trial End Notifications & Archiving</h1>
<p>The CTA lifecycle does not end when the CTA is granted. Throughout the trial and at its conclusion, sponsors have ongoing regulatory obligations to the MHRA. Managing these obligations efficiently — responding to MHRA questions, notifying the end of trial, submitting safety reports, and archiving records — is an essential part of clinical trial oversight.</p>

<h2>Ongoing Regulatory Obligations During the Trial</h2>
<table>
  <tr><th>Obligation</th><th>Timing</th><th>Submitted To</th></tr>
  <tr><td>SUSAR reports (fatal/life-threatening)</td><td>7 days from awareness (+ 8-day follow-up)</td><td>MHRA</td></tr>
  <tr><td>SUSAR reports (non-fatal/non-life-threatening)</td><td>15 days from awareness</td><td>MHRA</td></tr>
  <tr><td>Serious Breach notification</td><td>7 days from Sponsor awareness</td><td>MHRA (written)</td></tr>
  <tr><td>Annual Safety Report (ASR) / DSUR</td><td>Annually; within 60 days of data lock point</td><td>MHRA + REC</td></tr>
  <tr><td>Substantial modification</td><td>Before implementation; MHRA has 35 days</td><td>MHRA via IRAS</td></tr>
  <tr><td>Temporary halt (safety or logistics)</td><td>Notify MHRA as soon as decision made</td><td>MHRA</td></tr>
  <tr><td>End of trial notification</td><td>Within 90 days of end of trial globally</td><td>MHRA + REC</td></tr>
  <tr><td>End of trial summary report</td><td>Within 12 months of end of trial</td><td>MHRA</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for practical guidance on managing MHRA response cycles, preparing annual safety reports, and completing the end of trial process compliantly.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 End of Trial vs End of Study</div>
  <p>The <strong>end of trial</strong> is defined as the last visit of the last participant globally (LVLV) — or an earlier point if the trial is terminated early. This is distinct from the <strong>end of study</strong> in individual countries or sites. Under CTR 2025, the sponsor must notify the MHRA of the global end of trial within 90 days — and submit a lay summary within 12 months.</p>
</div>
`;

CONTENT.mod5text = `
<h1>Trial Close-Out, Archiving & Final Summary</h1>
<p>The final phase of the CTA lifecycle covers the formal close-out of the trial, submission of the end of trial report, and the archiving of all essential documents for the required retention periods. These activities are governed by UK CTR 2025 Regulation 31A and ICH GCP E6(R3).</p>
<hr/>

<h2>The Close-Out Visit (COV)</h2>
<p>The <strong>Close-Out Visit (COV)</strong> at each site is the final monitoring visit — effectively the opposite of the Site Initiation Visit (SIV). It is agreed in advance and confirmed by official letter. Key COV activities include:</p>
<ul>
  <li>Final reconciliation of all IMP (Investigational Medicinal Product) — dispensed, administered, and returned</li>
  <li>Payment of all outstanding site payments</li>
  <li>Final review of the ISF (Investigator's Site File) for completeness</li>
  <li>Collection of signed and completed logs: Site Visit Log, Delegation Log, Training Log</li>
  <li>Shutdown of all vendor access (EDC, IRT, lab portals)</li>
  <li>Closure of all open Action Items (AIs) and queries in the EDC</li>
  <li>Meeting with site team to discuss archiving requirements and retention obligations</li>
</ul>
<hr/>

<h2>Document Archiving Requirements</h2>
<p>Under UK CTR 2025 Regulation 31A, all <strong>essential documents</strong> must be retained for defined periods after the end of the trial:</p>

<table>
  <tr><th>Trial Type / Scenario</th><th>Minimum Retention Period</th></tr>
  <tr><td>Trial supporting a UK Marketing Authorisation Application (MAA)</td><td>At least <strong>25 years</strong> from global end of trial</td></tr>
  <tr><td>Paediatric trial (involving participants under 18)</td><td>Until youngest participant is 25 years old, or 25 years from end of trial — whichever is longer</td></tr>
  <tr><td>All other CTIMPs</td><td>At least <strong>15 years</strong> from end of trial (or per Sponsor SOP / applicable regulation)</td></tr>
</table>

<h3>Essential Documents Include:</h3>
<ul>
  <li>CTA and all approval letters (MHRA, HRA, REC, NHS R&D)</li>
  <li>All protocol versions and amendments/modifications</li>
  <li>All IB versions</li>
  <li>All PIS/ICF versions and signed consent forms</li>
  <li>Staff CVs, GCP certificates, Delegation Logs, Training Logs</li>
  <li>All monitoring visit reports</li>
  <li>SAE/SUSAR reports and follow-up correspondence</li>
  <li>Laboratory reference ranges and certifications</li>
  <li>IMP accountability records</li>
  <li>Data management documents (DMP, edit check specs, database lock certificate)</li>
  <li>Correspondence with MHRA, HRA, REC</li>
  <li>End of trial report and lay summary</li>
</ul>
<hr/>

<h2>Course Summary: The CTA Lifecycle</h2>
<div class="key-points">
  <div class="key-points-title">✅ Key Points from All Modules</div>

  <h3>Module 1 — What Is a CTA?</h3>
  <ul>
    <li>CTA required for all CTIMPs in the UK; not required for non-CTIMPs</li>
    <li>Sponsor bears primary legal responsibility for the CTA and trial conduct</li>
    <li>Protocol must include all required sections; PSP signed by PI before site opens</li>
    <li>IB required for novel IMPs; SmPC acceptable for authorised products as comparators</li>
  </ul>

  <h3>Module 2 — The IMPD</h3>
  <ul>
    <li>IMPD has two parts: Quality (pharmaceutical) + Non-Clinical and Clinical (safety/efficacy)</li>
    <li>sIMPD acceptable for authorised products</li>
    <li>MIA(IMP) required for all manufacturers; QP certification required for each batch</li>
    <li>Labels must include all Schedule 6 particulars; blinded trials use treatment pack numbers</li>
    <li>Common MHRA validation failures: missing XML, expired MIA, inadequate stability data</li>
  </ul>

  <h3>Module 3 — Submitting via IRAS</h3>
  <ul>
    <li>Combined review (MHRA + HRA) via IRAS; average 41 days; 30 days for MHRA alone</li>
    <li>Route A (standard) vs Route B (notification for lower-risk trials)</li>
    <li>Validation check before substantive review; rejection if documents missing</li>
    <li>MHRA outcome: Authorised / GNA / RFI (Day-30 questions)</li>
  </ul>

  <h3>Module 4 — Modifications</h3>
  <ul>
    <li>CTR 2025 uses "modifications" not "amendments": substantial / important detail / minor</li>
    <li>Substantial modifications must be MHRA-approved BEFORE implementation (35 days)</li>
    <li>Protocol deviations: minor / major / serious breach (7-day MHRA notification)</li>
    <li>Serious breach = breach likely to affect subject safety or scientific value</li>
  </ul>

  <h3>Module 5 — Ongoing Obligations &amp; Close-Out</h3>
  <ul>
    <li>SUSAR: fatal 7 days + 8-day follow-up; non-fatal 15 days — reported to MHRA</li>
    <li>ASR/DSUR: annually within 60 days of data lock</li>
    <li>End of trial notification: within 90 days; final report within 12 months</li>
    <li>Archiving: 25 years for MAA-supporting trials; 15 years for others</li>
    <li>COV: final IMP reconciliation; ISF completion; logs collected; vendors shut down</li>
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
    title: 'Module 1: What Is a CTA and When Do You Need One?',
    description: 'CTA eligibility, CTIMP definition, IMP/IMPD/IB/protocol definitions, sponsor responsibilities, protocol structure including PSP, and when SmPC substitutes the IB.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'CTA Overview: Definition, Eligibility & Regulatory Pathway',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module1, videoDurationMinutes: 18,
        isPreview: true, order: 1, content: CONTENT.mod1video,
      },
      {
        title: 'Key Definitions, Sponsor Responsibilities, Protocol & Investigator\'s Brochure',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod1text,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'A CTA from the MHRA is required for which type of study?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A CTA is required for a Clinical Trial of an Investigational Medicinal Product (CTIMP) — an interventional trial involving an IMP. Purely observational studies and non-IMP trials do not require a CTA from the MHRA.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Any CTIMP — interventional trial of an Investigational Medicinal Product', isCorrect: true, order: 1 },
            { optionText: 'Any clinical research study involving human participants', isCorrect: false, order: 2 },
            { optionText: 'Observational studies involving licensed medicines', isCorrect: false, order: 3 },
            { optionText: 'Only Phase 3 pivotal trials for new medicines', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Protocol Signature Page (PSP) must be signed by the Principal Investigator:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The PSP must be signed by the PI before the trial begins at a site — confirming the PI has read, understood, and agrees to conduct the trial according to the protocol. The signed PSP is filed in the ISF.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Before the trial begins at the site', isCorrect: true, order: 1 },
            { optionText: 'After the first participant is enrolled', isCorrect: false, order: 2 },
            { optionText: 'Only if the protocol is amended during the trial', isCorrect: false, order: 3 },
            { optionText: 'At the Close-Out Visit (COV)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'When can a Summary of Product Characteristics (SmPC) be used instead of a full Investigator\'s Brochure (IB)?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The SmPC can substitute for the IB (or serve as the Reference Safety Information section) when the IMP is an authorised medicinal product — i.e. it holds a Marketing Authorisation. For novel IMPs without existing authorisation, a full IB must be prepared.',
          marks: 1, order: 3,
          options: [
            { optionText: 'When the IMP already holds a Marketing Authorisation (is a licensed product)', isCorrect: true, order: 1 },
            { optionText: 'For all Phase 1 trials regardless of IMP authorisation status', isCorrect: false, order: 2 },
            { optionText: 'When the sponsor decides an IB is too burdensome to prepare', isCorrect: false, order: 3 },
            { optionText: 'Only in multi-regional trials with EU and UK sites', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are key sections of a clinical trial protocol?',
          questionType: 'MULTI_SELECT',
          explanation: 'Key protocol sections include: objectives and endpoints, inclusion/exclusion criteria, IMP information, schedule of assessments, statistical analysis plan, and safety monitoring provisions. All must be present for a valid CTA submission.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Objectives and primary / secondary endpoints', isCorrect: true, order: 1 },
            { optionText: 'Inclusion and exclusion criteria', isCorrect: true, order: 2 },
            { optionText: 'Schedule of assessments', isCorrect: true, order: 3 },
            { optionText: 'Statistical analysis plan and sample size justification', isCorrect: true, order: 4 },
            { optionText: 'Sponsor\'s quarterly financial accounts', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'The Reference Safety Information (RSI) in the Investigator\'s Brochure is used to assess:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The RSI in the IB defines the safety information against which the expectedness of adverse reactions is assessed. If a SAR is not listed in the RSI, it is classified as unexpected — making it a SUSAR and requiring expedited reporting to the MHRA.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Whether a serious adverse reaction is expected or unexpected (SUSAR determination)', isCorrect: true, order: 1 },
            { optionText: 'Whether the IMP is manufactured according to GMP', isCorrect: false, order: 2 },
            { optionText: 'The statistical power of the clinical trial', isCorrect: false, order: 3 },
            { optionText: 'The number of approved clinical trial sites in the UK', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 2
  // ═══════════════════════════════════════
  {
    title: 'Module 2: The Investigational Medicinal Product Dossier (IMPD)',
    description: 'IMPD structure (Quality + Non-clinical/Clinical); simplified IMPD; GMP and MIA(IMP) requirements; IMP labelling under CTR 2025 Schedule 6; MHRA common validation issues.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'IMPD Explained: Structure, Content & Common Pitfalls',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module2, videoDurationMinutes: 20,
        isPreview: false, order: 1, content: CONTENT.mod2video,
      },
      {
        title: 'MHRA Common Issues, GMP Requirements & IMP Labelling',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod2text,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The Quality section of the IMPD covers which of the following?',
          questionType: 'MULTI_SELECT',
          explanation: 'The IMPD Quality section covers: manufacture of the drug substance and drug product, characterisation, specifications, stability data, and GMP compliance. The Non-Clinical and Clinical section covers toxicology, pharmacokinetics, and human safety/efficacy data.',
          marks: 2, order: 1,
          options: [
            { optionText: 'Drug substance and drug product manufacturing processes', isCorrect: true, order: 1 },
            { optionText: 'Specifications and stability data', isCorrect: true, order: 2 },
            { optionText: 'GMP compliance and MIA(IMP) certification', isCorrect: true, order: 3 },
            { optionText: 'Non-clinical pharmacology and toxicology', isCorrect: false, order: 4 },
            { optionText: 'Phase 2 clinical efficacy results', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'What is a simplified IMPD (sIMPD) and when is it appropriate?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A simplified IMPD references the current SmPC for quality and safety data rather than reproducing it in full. It is appropriate when the IMP is an authorised product used within its approved indication — significantly reducing the documentation burden.',
          marks: 1, order: 2,
          options: [
            { optionText: 'An IMPD that references the SmPC for authorised products — appropriate when the IMP holds a Marketing Authorisation', isCorrect: true, order: 1 },
            { optionText: 'A shortened IMPD used for Phase 1 first-in-human trials only', isCorrect: false, order: 2 },
            { optionText: 'An IMPD submitted without a Quality section for biosimilar products', isCorrect: false, order: 3 },
            { optionText: 'A format used only for Route B notification submissions', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Before each batch of IMP can be released for use in a clinical trial, it must be:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Each batch of IMP must be certified by a Qualified Person (QP) employed by the holder of a Manufacturer\'s Authorisation for Investigational Medicinal Products (MIA(IMP)). QP certification confirms GMP compliance before the batch can be dispatched to trial sites.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Certified by a Qualified Person (QP) at an MIA(IMP) holder', isCorrect: true, order: 1 },
            { optionText: 'Approved by the MHRA on a batch-by-batch basis', isCorrect: false, order: 2 },
            { optionText: 'Inspected by the Principal Investigator at each site', isCorrect: false, order: 3 },
            { optionText: 'Validated against the protocol by the clinical pharmacist', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following is a common MHRA validation failure that causes immediate rejection of a CTA application?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The MHRA requires an XML file of the completed IRAS application form to create an electronic record. If the XML is missing or invalid, the application is rejected at validation — before any substantive review begins.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Missing or invalid XML file from the IRAS application form', isCorrect: true, order: 1 },
            { optionText: 'A Phase 2 trial design instead of Phase 3', isCorrect: false, order: 2 },
            { optionText: 'Protocol dated one month before the submission', isCorrect: false, order: 3 },
            { optionText: 'Using a simplified IMPD for a licensed product', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For blinded clinical trials, how is participant confidentiality maintained in IMP labelling?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'In blinded trials, a unique treatment pack number is used on the IMP label — it does not reveal whether the patient is receiving active drug or placebo. Only the pharmacist and the IRT (Interactive Response Technology) system hold the unblinding code.',
          marks: 1, order: 5,
          options: [
            { optionText: 'A unique treatment pack number is used; the unblinding code is held by the pharmacist and IRT', isCorrect: true, order: 1 },
            { optionText: 'The IMP is labelled with the patient\'s full name and date of birth', isCorrect: false, order: 2 },
            { optionText: 'Labels for active and placebo use identical colours and shapes without any distinguishing code', isCorrect: false, order: 3 },
            { optionText: 'All blinded IMPs must have "PLACEBO" printed on the label to ensure safety', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 3
  // ═══════════════════════════════════════
  {
    title: 'Module 3: Preparing and Submitting the CTA via IRAS',
    description: 'Full CTA submission package; IRAS form completion; MHRA scientific advice; Route A vs Route B; validation checks; MHRA substantive review (Day 1–30); outcomes (CTA granted, GNA, RFI).',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'The CTA Submission Package & Combined Review via IRAS',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module3, videoDurationMinutes: 22,
        isPreview: false, order: 1, content: CONTENT.mod3video,
      },
      {
        title: 'IRAS Step-by-Step: From Pre-Application to MHRA Outcome',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod3text,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'Under UK CTR 2025, what is the average combined MHRA and HRA review timeline via IRAS?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The combined MHRA + HRA review via IRAS has a legally enshrined average of 41 days — with the MHRA scientific review alone at 30 days (35 days for substantial modifications).',
          marks: 1, order: 1,
          options: [
            { optionText: '41 days (legally enshrined average)', isCorrect: true, order: 1 },
            { optionText: '30 days', isCorrect: false, order: 2 },
            { optionText: '60 days', isCorrect: false, order: 3 },
            { optionText: '90 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Route B (Notification route) under UK CTR 2025 is designed for:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Route B is a simplified, faster notification pathway for lower-risk trials — such as those using established medicines with known safety profiles and no new safety concerns. It is less burdensome than the full Route A combined review.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Lower-risk trials using established medicines with no new safety concerns', isCorrect: true, order: 1 },
            { optionText: 'Novel first-in-human Phase 1 trials', isCorrect: false, order: 2 },
            { optionText: 'Any trial with fewer than 50 participants', isCorrect: false, order: 3 },
            { optionText: 'Post-marketing studies only (Phase 4)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'If the MHRA issues a "Grounds for Non-Acceptance (GNA)" for a CTA application, this means:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A GNA indicates the MHRA has significant objections that cannot be resolved through Day-30 questions. The sponsor must address all grounds and resubmit as a new application with a new Day 0.',
          marks: 1, order: 3,
          options: [
            { optionText: 'The MHRA has significant objections; the sponsor must resubmit as a new application', isCorrect: true, order: 1 },
            { optionText: 'Minor clarification questions that can be answered without a resubmission', isCorrect: false, order: 2 },
            { optionText: 'The application is approved subject to conditions being met within 30 days', isCorrect: false, order: 3 },
            { optionText: 'The trial is suspended pending a safety review by the MHRA', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following documents must be included in the CTA submission package?',
          questionType: 'MULTI_SELECT',
          explanation: 'A complete CTA submission requires: completed IRAS form with XML, IMPD (or sIMPD), Protocol, IB (or SmPC), PIS, ICF, GP/Physician Letter, Insurance Certificate, PI CV, and MIA(IMP) certificates for all manufacturers.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Completed IRAS application form (with XML export)', isCorrect: true, order: 1 },
            { optionText: 'IMPD or simplified IMPD', isCorrect: true, order: 2 },
            { optionText: 'Protocol (with Protocol Signature Page)', isCorrect: true, order: 3 },
            { optionText: 'Investigator\'s Brochure or current SmPC', isCorrect: true, order: 4 },
            { optionText: 'Sponsor\'s audited annual accounts', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Why is it important to seek MHRA Scientific Advice before submitting a CTA for a novel first-in-human programme?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'MHRA Scientific Advice allows the development team to discuss the adequacy of preclinical data, IMPD content, trial design, and regulatory pathway before investing time in a full submission. This reduces the risk of GNA or Day-30 objections and saves significant regulatory timeline.',
          marks: 1, order: 5,
          options: [
            { optionText: 'To discuss preclinical data adequacy, IMPD content, and trial design before submission — reducing GNA risk', isCorrect: true, order: 1 },
            { optionText: 'Because the MHRA mandates scientific advice for all Phase 1 trials', isCorrect: false, order: 2 },
            { optionText: 'To replace the need for an IMPD with a single MHRA advisory letter', isCorrect: false, order: 3 },
            { optionText: 'To bypass the standard 30-day review timeline', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 4
  // ═══════════════════════════════════════
  {
    title: 'Module 4: Modifications to an Approved CTA',
    description: 'CTR 2025 modification terminology (substantial / important detail / minor); examples of each; pre-implementation requirement; protocol deviation classification; CAPA; serious breach.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'Modifications Under CTR 2025: Substantial, Important & Minor',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module4, videoDurationMinutes: 16,
        isPreview: false, order: 1, content: CONTENT.mod4video,
      },
      {
        title: 'Classifying Modifications, Protocol Deviations & CAPA',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod4text,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'Under UK CTR 2025, what replaced the term "substantial amendment"?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Under UK CTR 2025 (in force from 28 April 2026), the term "amendment" is replaced by "modification". Changes are categorised as substantial modifications, modifications of an important detail, or minor modifications.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Substantial modification', isCorrect: true, order: 1 },
            { optionText: 'Substantial revision', isCorrect: false, order: 2 },
            { optionText: 'Protocol update', isCorrect: false, order: 3 },
            { optionText: 'Clinical alteration', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following changes to an approved CTA is likely to be classified as a substantial modification?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A change to inclusion/exclusion criteria directly affects which participants can be enrolled and has significant patient safety implications — it is a substantial modification requiring MHRA review before implementation.',
          marks: 1, order: 2,
          options: [
            { optionText: 'A change to the inclusion/exclusion criteria', isCorrect: true, order: 1 },
            { optionText: 'Correcting a typographical error in a study site address', isCorrect: false, order: 2 },
            { optionText: 'Updating a contact telephone number in the protocol', isCorrect: false, order: 3 },
            { optionText: 'Changing the document version date format', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The MHRA assessment timeline for a substantial modification is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The MHRA has 35 days to assess a substantial modification. This is distinct from the initial CTA review timeline of 30 days.',
          marks: 1, order: 3,
          options: [
            { optionText: '35 days', isCorrect: true, order: 1 },
            { optionText: '30 days', isCorrect: false, order: 2 },
            { optionText: '14 days', isCorrect: false, order: 3 },
            { optionText: '60 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Serious Breach of GCP or the protocol must be notified to the MHRA in writing within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach must be reported to the MHRA in writing within 7 days of the Sponsor becoming aware. It is a breach likely to affect subject safety or the scientific value of the trial.',
          marks: 1, order: 4,
          options: [
            { optionText: '7 days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '15 days of the Sponsor becoming aware', isCorrect: false, order: 2 },
            { optionText: '24 hours of the Sponsor becoming aware', isCorrect: false, order: 3 },
            { optionText: '30 days of the Sponsor becoming aware', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In the protocol deviation management process, which step must occur BEFORE implementing corrective actions?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Root cause analysis / classification (identifying whether the deviation is minor, major, or a serious breach) must occur before appropriate corrective and preventive actions can be designed and implemented.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Identifying the deviation and classifying its severity', isCorrect: true, order: 1 },
            { optionText: 'Closing the trial at that site immediately', isCorrect: false, order: 2 },
            { optionText: 'Submitting a substantial modification to the MHRA', isCorrect: false, order: 3 },
            { optionText: 'Obtaining new ethical approval for the affected subjects', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 5
  // ═══════════════════════════════════════
  {
    title: 'Module 5: MHRA Responses, Trial End & Final Assessment',
    description: 'Ongoing safety reporting obligations (SUSAR, ASR/DSUR); trial close-out (COV); end of trial notification; document archiving periods; 15-question final assessment.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Ongoing MHRA Obligations, Trial Close-Out & End of Trial',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module5, videoDurationMinutes: 18,
        isPreview: false, order: 1, content: CONTENT.mod5video,
      },
      {
        title: 'Close-Out Visit, Document Archiving & Course Summary',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod5text,
      },
    ],
    quiz: {
      title: 'Final Assessment: Clinical Trial Authorisation (CTA) Process',
      instructions: 'Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Certificate issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 30, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'What does CTIMP stand for?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'CTIMP = Clinical Trial of an Investigational Medicinal Product. This is the type of trial that requires a CTA from the MHRA.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Clinical Trial of an Investigational Medicinal Product', isCorrect: true, order: 1 },
            { optionText: 'Clinical Trial Information Management Protocol', isCorrect: false, order: 2 },
            { optionText: 'Controlled Trial Involving Medicines and Pharmacological Products', isCorrect: false, order: 3 },
            { optionText: 'Certificate of Trial Initiation for Medicinal Products', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A CTA is submitted via which UK system?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Integrated Research Application System (IRAS) is the UK portal for CTA submissions. It enables the combined MHRA + HRA review. The EU equivalent is CTIS.',
          marks: 1, order: 2,
          options: [
            { optionText: 'IRAS (Integrated Research Application System)', isCorrect: true, order: 1 },
            { optionText: 'CTIS (Clinical Trials Information System)', isCorrect: false, order: 2 },
            { optionText: 'EudraVigilance', isCorrect: false, order: 3 },
            { optionText: 'MHRA gateway portal directly', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The MHRA has how many days to assess an initial CTA application under UK CTR 2025?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The MHRA has 30 days for initial CTA assessment and 35 days for substantial modifications. The combined MHRA + HRA review averages 41 days.',
          marks: 1, order: 3,
          options: [
            { optionText: '30 days', isCorrect: true, order: 1 },
            { optionText: '41 days', isCorrect: false, order: 2 },
            { optionText: '35 days', isCorrect: false, order: 3 },
            { optionText: '60 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which part of the IMPD covers the drug substance manufacture, specifications, and stability?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Quality (Pharmaceutical) section of the IMPD covers drug substance and drug product manufacture, characterisation, specifications, stability, and GMP compliance.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Part I: Quality (Pharmaceutical)', isCorrect: true, order: 1 },
            { optionText: 'Part II: Non-Clinical and Clinical', isCorrect: false, order: 2 },
            { optionText: 'The Investigator\'s Brochure', isCorrect: false, order: 3 },
            { optionText: 'The Protocol Synopsis', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A substantial modification to an approved CTA must be submitted to the MHRA:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A substantial modification must be submitted to the MHRA via IRAS and approved BEFORE it is implemented at any trial site. Implementation before approval is a protocol deviation and potentially a Serious Breach.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Before implementation — MHRA approval required first', isCorrect: true, order: 1 },
            { optionText: 'Within 30 days of implementation', isCorrect: false, order: 2 },
            { optionText: 'Only if the modification affects patient safety', isCorrect: false, order: 3 },
            { optionText: 'At the next Annual Safety Report submission', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A fatal SUSAR must be reported to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Fatal or life-threatening SUSARs must be reported to the MHRA within 7 calendar days of Sponsor awareness, with a completed follow-up report within an additional 8 days (15 days total).',
          marks: 1, order: 6,
          options: [
            { optionText: '7 days of awareness (+ 8-day follow-up report)', isCorrect: true, order: 1 },
            { optionText: '15 days of awareness', isCorrect: false, order: 2 },
            { optionText: '24 hours of awareness', isCorrect: false, order: 3 },
            { optionText: '30 days at the next ASR submission', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is the purpose of the Manufacturer\'s Authorisation for Investigational Medicinal Products (MIA(IMP))?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The MIA(IMP) is a MHRA licence authorising a manufacturer to manufacture, import, or process IMPs. All manufacturers involved in IMP manufacture for UK clinical trials must hold a valid MIA(IMP) — its absence causes validation failure at CTA submission.',
          marks: 1, order: 7,
          options: [
            { optionText: 'It authorises a manufacturer to manufacture, import, or process IMPs for UK clinical trials', isCorrect: true, order: 1 },
            { optionText: 'It is a clinical trial site licence required by NHS trusts', isCorrect: false, order: 2 },
            { optionText: 'It is the MHRA\'s approval for the marketing of a new medicine', isCorrect: false, order: 3 },
            { optionText: 'It certifies that the IMP has passed Phase 3 clinical trials', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Annual Safety Report (ASR) / DSUR must be submitted within how many days of the data lock point?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Annual Safety Report / Development Safety Update Report (DSUR) must be submitted to the MHRA within 60 days of the annual data lock point.',
          marks: 1, order: 8,
          options: [
            { optionText: '60 days', isCorrect: true, order: 1 },
            { optionText: '30 days', isCorrect: false, order: 2 },
            { optionText: '90 days', isCorrect: false, order: 3 },
            { optionText: '15 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Documents from a clinical trial supporting a UK Marketing Authorisation Application (MAA) must be retained for:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Under UK CTR 2025 Regulation 31A, essential documents supporting a Marketing Authorisation Application must be retained for at least 25 years from the global end of trial.',
          marks: 1, order: 9,
          options: [
            { optionText: 'At least 25 years from the global end of trial', isCorrect: true, order: 1 },
            { optionText: '10 years from last patient visit', isCorrect: false, order: 2 },
            { optionText: '5 years from marketing authorisation', isCorrect: false, order: 3 },
            { optionText: '15 years from database lock', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'At the Close-Out Visit (COV), which of the following activities must be completed?',
          questionType: 'MULTI_SELECT',
          explanation: 'The COV involves: final IMP reconciliation, payment of outstanding site fees, ISF review, collection of signed logs (delegation, training, site visit), shutdown of all vendor system access, closure of all open queries and action items, and discussion of archiving requirements.',
          marks: 2, order: 10,
          options: [
            { optionText: 'Final IMP reconciliation (dispensed, administered, returned)', isCorrect: true, order: 1 },
            { optionText: 'Collection of signed Delegation Log and Training Log', isCorrect: true, order: 2 },
            { optionText: 'Shutdown of all vendor access (EDC, IRT)', isCorrect: true, order: 3 },
            { optionText: 'Closure of all open Action Items and queries', isCorrect: true, order: 4 },
            { optionText: 'Submission of the CTA to the MHRA for the next trial', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Which of the following is classified as a substantial modification under UK CTR 2025?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A change to the primary endpoint is a substantial modification — it directly affects the scientific value of the trial. Corrections of typos and contact updates are minor modifications.',
          marks: 1, order: 11,
          options: [
            { optionText: 'A change to the primary efficacy endpoint', isCorrect: true, order: 1 },
            { optionText: 'Correcting a typographical error in the protocol', isCorrect: false, order: 2 },
            { optionText: 'Updating a site contact telephone number', isCorrect: false, order: 3 },
            { optionText: 'Changing the document version date format', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The end of trial notification must be submitted to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The sponsor must notify the MHRA of the global end of trial within 90 days. The final lay summary must be submitted within 12 months of the end of trial.',
          marks: 1, order: 12,
          options: [
            { optionText: '90 days of the global end of trial', isCorrect: true, order: 1 },
            { optionText: '30 days of the last patient visit globally', isCorrect: false, order: 2 },
            { optionText: '12 months of the database lock', isCorrect: false, order: 3 },
            { optionText: '60 days of the last patient visit at the UK site', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which section of the Investigator\'s Brochure defines the safety information used to assess whether a SAR is expected or unexpected?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Reference Safety Information (RSI) in the IB defines the safety information against which expectedness is assessed. An SAR not listed in the RSI is unexpected — making it a SUSAR requiring expedited MHRA reporting.',
          marks: 1, order: 13,
          options: [
            { optionText: 'Reference Safety Information (RSI)', isCorrect: true, order: 1 },
            { optionText: 'Clinical Pharmacology section', isCorrect: false, order: 2 },
            { optionText: 'Non-Clinical Pharmacology section', isCorrect: false, order: 3 },
            { optionText: 'Physical and Chemical Properties section', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following correctly describes the difference between a protocol modification and a protocol deviation?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A modification is a prospective, planned change to the approved protocol (submitted to MHRA before implementation). A deviation is an unintended departure from the currently approved protocol that has already occurred.',
          marks: 1, order: 14,
          options: [
            { optionText: 'A modification is a prospective planned change; a deviation is an unintended departure from the approved protocol', isCorrect: true, order: 1 },
            { optionText: 'A deviation is submitted to MHRA in advance; a modification is documented retrospectively', isCorrect: false, order: 2 },
            { optionText: 'Both modifications and deviations require the same MHRA submission process', isCorrect: false, order: 3 },
            { optionText: 'A modification is less serious than a deviation and does not require MHRA notification', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following statements about the CTA lifecycle under UK CTR 2025 are correct?',
          questionType: 'MULTI_SELECT',
          explanation: 'All three are correct: MHRA initial review is 30 days; substantial modifications require MHRA approval before implementation (35-day timeline); and archiving for MAA-supporting trials is at least 25 years.',
          marks: 2, order: 15,
          options: [
            { optionText: 'MHRA initial CTA review: 30 days', isCorrect: true, order: 1 },
            { optionText: 'Substantial modifications must be approved by MHRA before implementation (35-day review)', isCorrect: true, order: 2 },
            { optionText: 'Archiving: at least 25 years for MAA-supporting trial documents', isCorrect: true, order: 3 },
            { optionText: 'CTA applications for UK trials are submitted via EU CTIS', isCorrect: false, order: 4 },
            { optionText: 'The MHRA does not review IMP quality as part of the CTA assessment', isCorrect: false, order: 5 },
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
  console.log('  SEEDING: Clinical Trial Authorisation (CTA) Process');
  console.log('  Course 08 | ADVANCED | Regulatory Affairs');
  console.log('  Content: Rich HTML | Videos: Real YouTube regulatory videos');
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
      title: 'Clinical Trial Authorisation (CTA) Process',
      subtitle: 'Step-by-step guide to submitting CTAs through IRAS to the MHRA',
      description: 'Advanced practical guide to preparing and submitting Clinical Trial Authorisation applications to the MHRA via IRAS. Covers CTIMP eligibility, IMPD preparation, combined review process, Route A vs Route B, MHRA validation and response management, substantial modifications under CTR 2025, protocol deviation management, SUSAR reporting, trial close-out, and document archiving.',
      learningObjectives: [
        'Determine whether a study requires a CTA and identify the appropriate regulatory route',
        'Prepare a compliant CTA dossier including IMPD, protocol, IB, and consent documents',
        'Navigate the IRAS combined review process step by step',
        'Manage Day-30 MHRA questions and Grounds for Non-Acceptance responses',
        'Classify and submit substantial modifications under UK CTR 2025 before implementation',
        'Apply protocol deviation management and CAPA procedures correctly',
        'Meet ongoing MHRA obligations including SUSAR reporting, ASR submission, and trial end notifications',
      ],
      prerequisites: [
        'UK Post-Brexit Regulatory Landscape (Course 7) recommended',
        'Basic understanding of clinical trial conduct and GCP',
      ],
      targetAudience: [
        'Regulatory Affairs professionals preparing and submitting CTA dossiers',
        'Clinical Operations and trial start-up teams',
        'Sponsors and CROs responsible for the CTA lifecycle',
        'Study Coordinators and Research Nurses involved in site regulatory activities',
        'Principal Investigators needing to understand their regulatory package',
      ],
      durationHours: 6,
      difficultyLevel: 'ADVANCED',
      accreditation: 'MHRA Aligned',
      price: 149.00,
      originalPrice: 199.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'CTA Process Course | MHRA IRAS IMPD | UK Clinical Trial Authorisation | CTR 2025',
      seoDescription: 'Step-by-step CTA process: IMPD preparation, IRAS combined review, Route A vs B, MHRA responses, CTR 2025 modifications, SUSAR reporting, trial end and archiving. MHRA Aligned.',
      tags: ['CTA', 'IRAS', 'MHRA', 'IMPD', 'IMP', 'IB', 'protocol', 'CTR2025', 'modifications', 'SUSAR', 'archiving', 'GMP', 'regulatory-affairs', 'clinical-trials'],
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
        bodyText: 'This certifies successful completion of Clinical Trial Authorisation (CTA) Process — MHRA Aligned | Issued by Clinical Research Nexus',
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
  console.log('  Videos: Real YouTube MHRA/regulatory videos');
  console.log('  Preview: /courses/clinical-trial-authorisation-cta-process');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
