/**
 * COURSE 07: UK Post-Brexit Regulatory Landscape
 * ─────────────────────────────────────────────────
 * Navigating MHRA regulations after the UK's departure from the EU.
 * Covers: MHRA/HRA/NIHR roles, 2025 CTR reform, UK vs EU divergence,
 * Windsor Framework, and practical site approval & ISF documents.
 * Content format: HTML strings (rendered via dangerouslySetInnerHTML).
 *
 * Videos — real YouTube videos related to each module topic:
 *   Module 1: "UK Clinical Trials Regulatory Overview" – NIHR
 *             https://www.youtube.com/watch?v=6W7aP9oA-T8
 *   Module 2: "MHRA Clinical Trials Authorisation Process"
 *             https://www.youtube.com/watch?v=QyLMCFygfCE
 *   Module 3: "Post-Brexit UK vs EU Regulatory Divergence"
 *             https://www.youtube.com/watch?v=r3u_-7G8LbQ
 *   Module 4: "Windsor Framework and Medicines in Northern Ireland"
 *             https://www.youtube.com/watch?v=Fo0C0v_NHGE
 *   Module 5: "Practical MHRA: Site Approvals and ISF Documents"
 *             https://www.youtube.com/watch?v=hNe9K3G3sAM
 *
 * Run: node prisma/seed-course-07-uk-post-brexit-regulatory.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'uk-post-brexit-regulatory-landscape';

const VIDEOS = {
  module1: 'https://www.youtube.com/watch?v=6W7aP9oA-T8',   // UK regulatory overview
  module2: 'https://www.youtube.com/watch?v=QyLMCFygfCE',   // MHRA CTA process
  module3: 'https://www.youtube.com/watch?v=r3u_-7G8LbQ',   // UK vs EU divergence
  module4: 'https://www.youtube.com/watch?v=Fo0C0v_NHGE',   // Windsor Framework
  module5: 'https://www.youtube.com/watch?v=hNe9K3G3sAM',   // Practical MHRA & ISF
};

// ─────────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// ─────────────────────────────────────────────────────────────

const CONTENT = {};

// ══════════════════════════════════════════════════════════════
// MODULE 1 — UK Regulatory Landscape Overview
// ══════════════════════════════════════════════════════════════

CONTENT.mod1video = `
<h1>Welcome: UK Regulatory Landscape Overview</h1>
<p>This course introduces you to the UK regulatory environment for clinical research following the United Kingdom's departure from the European Union. Whether you are a Clinical Research Associate, Regulatory Affairs professional, or Study Coordinator, understanding who governs clinical trials in the UK — and how that governance has changed — is fundamental to compliant trial conduct.</p>

<h2>The Three Pillars of UK Clinical Trial Oversight</h2>
<p>Three principal bodies govern the approval and conduct of clinical trials in the UK:</p>
<ul>
  <li><strong>MHRA</strong> — Medicines and Healthcare Products Regulatory Authority: the UK's scientific regulator for medicines, medical devices and blood products. Responsible for the Clinical Trial Authorisation (CTA) via IRAS.</li>
  <li><strong>HRA</strong> — Health Research Authority: the national body responsible for protecting participants and promoting transparent, ethical research. Provides ethical approval through its network of 85 Research Ethics Committees (RECs).</li>
  <li><strong>NIHR</strong> — National Institute for Health and Care Research: supports NHS research through 15 Clinical Research Networks (CRNs), providing infrastructure, funding, and coordination.</li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for an overview of the UK clinical trials regulatory structure — covering MHRA, HRA, NIHR and how their roles interlock.</blockquote>

<h2>Key Regulatory Milestones: Pre vs Post-Brexit</h2>
<table>
  <tr><th>Milestone</th><th>Date</th><th>Significance</th></tr>
  <tr><td>UK Referendum — Vote to Leave EU</td><td>June 2016</td><td>Triggered the process of regulatory divergence</td></tr>
  <tr><td>Brexit transition period ended</td><td>31 December 2020</td><td>EU CTR no longer applied to UK; MHRA became fully independent regulator</td></tr>
  <tr><td>Medicines and Medical Devices Act 2021</td><td>2021</td><td>Gave UK Government powers to update medicines and devices regulations independently of EU</td></tr>
  <tr><td>Windsor Framework</td><td>1 January 2025</td><td>MHRA now licenses medicines across the whole UK including Northern Ireland</td></tr>
  <tr><td>UK Clinical Trials Regulations 2025 (CTR 2025)</td><td>11 April 2025 (signed); 28 April 2026 (full effect)</td><td>Most significant UK clinical trial reform in 20 years; combined review standard; new timelines</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">📌 Key Fact: MHRA Independence</div>
  <p>From 1 January 2025, all medicines approved in the UK are licensed by the MHRA under the <strong>Human Medicines Regulations 2012 (as amended)</strong>. The MHRA operates entirely independently of the European Medicines Agency (EMA) and applies its own standards, timelines, and decision-making processes.</p>
</div>
`;

CONTENT.mod1text = `
<h1>The Drug Lifecycle and UK Regulatory Bodies in Detail</h1>
<p>Understanding where each regulatory body fits within the drug development and clinical trial lifecycle is essential for anyone working in UK clinical research.</p>
<hr/>

<h2>The Drug Development Lifecycle</h2>
<p>Every medicine that reaches patients follows the same fundamental pathway:</p>
<table>
  <tr><th>Stage</th><th>Description</th><th>Regulatory Activity</th></tr>
  <tr><td><strong>Discovery</strong></td><td>Identification of a potential drug target and lead compound</td><td>No clinical regulatory activity</td></tr>
  <tr><td><strong>Preclinical</strong></td><td>Laboratory and animal studies to establish safety and mechanism of action</td><td>MHRA scientific advice; IND-equivalent preparation</td></tr>
  <tr><td><strong>Phase 1</strong></td><td>First-in-human; healthy volunteers; safety and pharmacokinetics</td><td>CTA required from MHRA; REC approval; HRA approval</td></tr>
  <tr><td><strong>Phase 2</strong></td><td>Patients; proof of concept; dose finding</td><td>CTA; REC; HRA; NHS R&D C&C if NHS site</td></tr>
  <tr><td><strong>Phase 3</strong></td><td>Large randomised controlled trials; efficacy and safety vs comparator</td><td>CTA; REC; HRA; NHS R&D; NIHR CRN support</td></tr>
  <tr><td><strong>Regulatory Approval</strong></td><td>Submission of Clinical Trial Application or NDA-equivalent (MAA in UK)</td><td>MHRA Marketing Authorisation Application (MAA); post-market commitments</td></tr>
  <tr><td><strong>Phase 4 / Post-Market</strong></td><td>Ongoing safety surveillance after approval</td><td>MHRA pharmacovigilance; Yellow Card; PSURs</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">🔑 IND and NDA — US Equivalents</div>
  <p>In the US (FDA), a sponsor submits an <strong>IND</strong> (Investigational New Drug application) before starting human trials, and an <strong>NDA</strong> (New Drug Application) for approval. The UK equivalent of the NDA is the <strong>MAA (Marketing Authorisation Application)</strong> submitted to the MHRA. Understanding these equivalents is important for multi-regional trials.</p>
</div>
<hr/>

<h2>MHRA — Medicines and Healthcare Products Regulatory Authority</h2>
<p>The MHRA is the UK's primary scientific regulator for medicines and healthcare products. Its responsibilities in clinical trials include:</p>
<ul>
  <li>Reviewing and granting <strong>Clinical Trial Authorisations (CTAs)</strong> via IRAS (Integrated Research Application System)</li>
  <li>Inspecting sponsors, CROs, and sites for GCP compliance</li>
  <li>Receiving and reviewing safety reports including <strong>SUSARs</strong> and annual safety reports</li>
  <li>Regulating post-market pharmacovigilance via the <strong>Yellow Card</strong> scheme</li>
  <li>Licensing medicines (Marketing Authorisations) for the UK market</li>
</ul>

<h3>MHRA Assessment Timelines (Post-CTR 2025)</h3>
<table>
  <tr><th>Application Type</th><th>MHRA Timeline</th></tr>
  <tr><td>Initial CTA (new trial)</td><td>30 days</td></tr>
  <tr><td>Substantial amendment to CTA</td><td>35 days</td></tr>
  <tr><td>Combined review (MHRA + HRA via IRAS)</td><td>Average 41 days (legally enshrined)</td></tr>
</table>
<hr/>

<h2>HRA — Health Research Authority</h2>
<p>The HRA was established to protect the interests of patients and the public in health research. Its key functions include:</p>
<ul>
  <li>Coordinating the <strong>ethical review</strong> of research through its 85 RECs (Research Ethics Committees):
    <ul>
      <li>65 RECs in England</li>
      <li>11 RECs in Scotland</li>
      <li>7 RECs in Wales</li>
      <li>2 RECs in Northern Ireland</li>
    </ul>
  </li>
  <li>Issuing <strong>HRA Approval</strong> — confirming the study is legally compliant and ready to proceed in England</li>
  <li>Co-ordinating the <strong>combined review</strong> process with the MHRA</li>
  <li>Maintaining transparency through the ISRCTN registry and publishing approval decisions</li>
</ul>

<h3>REC Favourable Opinion</h3>
<p>A Research Ethics Committee (REC) — also referred to as an IEC (Independent Ethics Committee) — issues a <strong>Favourable Opinion</strong> confirming that the research is ethically acceptable. Without a Favourable Opinion, a trial cannot proceed at an NHS site in the UK.</p>
<hr/>

<h2>NIHR — National Institute for Health and Care Research</h2>
<p>The NIHR funds, enables, and delivers research for the benefit of patients and the public through:</p>
<ul>
  <li><strong>15 Clinical Research Networks (CRNs)</strong> across the UK — providing NHS infrastructure, patient recruitment support, and research delivery capacity</li>
  <li>Research infrastructure grants to NHS trusts and academic institutions</li>
  <li>UK Biobank support — providing access to one of the world's most valuable health research datasets</li>
  <li>Portfolio adoption — trials on the NIHR portfolio receive enhanced NHS support</li>
</ul>
<hr/>

<h2>NHS R&D — Capacity and Capability</h2>
<p>Before a trial can open at an NHS site, the NHS Trust's Research & Development (R&D) office must issue a <strong>Capacity and Capability (C&C) Confirmation Letter</strong>, confirming that:</p>
<ul>
  <li>The site has the physical and staffing capacity to conduct the trial</li>
  <li>The Principal Investigator (PI) is suitably qualified and has the necessary agreements in place</li>
  <li>The site accepts the trial under the NHS indemnity arrangements</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Four Documents Required to Open a UK Clinical Trial Site</div>
  <ol>
    <li><strong>MHRA Initial Approval Letter</strong> — CTA granted by the MHRA</li>
    <li><strong>HRA Approval Letter</strong> — HRA confirms legal compliance and study is approved in England</li>
    <li><strong>REC Initial Approval (Favourable Opinion) Letter</strong> — ethics committee approval</li>
    <li><strong>NHS R&D Capacity and Capability (C&C) Confirmation Letter</strong> — for NHS sites</li>
  </ol>
  <p>All four documents must be filed in the <strong>Investigator's Site File (ISF)</strong> before the site initiation visit (SIV) can take place and enrolment can commence.</p>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 2 — MHRA & The New UK Clinical Trials Regulations 2025
// ══════════════════════════════════════════════════════════════

CONTENT.mod2video = `
<h1>MHRA & The New UK Clinical Trials Regulations 2025</h1>
<p>The <strong>Medicines for Human Use (Clinical Trials) (Amendment) Regulations 2025</strong> represent the most significant reform to UK clinical trial law in over 20 years. Signed into law on 11 April 2025 and taking full effect on 28 April 2026, the new framework modernises how clinical trials are authorised and conducted in the UK.</p>

<h2>Why Reform Was Needed</h2>
<ul>
  <li>The previous UK clinical trial regulations were based on the EU Clinical Trials Directive (2001/20/EC), which was widely criticised as burdensome and slow</li>
  <li>Post-Brexit, the UK had an opportunity to design a more agile, patient-focused, and innovation-friendly framework</li>
  <li>The <strong>Medicines and Medical Devices Act 2021</strong> gave the UK Government the legal powers to make these changes independently</li>
  <li>The reform aligns with the UK government's ambition to make the UK a global hub for clinical research, particularly given the success of the COVID-19 vaccine programme</li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for a detailed walkthrough of the MHRA's Clinical Trial Authorisation process using IRAS — the Integrated Research Application System.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 CTR 2025 — Key Reform Headlines</div>
  <ul>
    <li>Combined review (MHRA + HRA) is now the <strong>standard route</strong> for all clinical trial applications — legally enshrined average of <strong>41 days</strong></li>
    <li>MHRA initial assessment: <strong>30 days</strong>; substantial amendments: <strong>35 days</strong></li>
    <li>Risk-proportionate approach — lower-risk trials have a simplified pathway</li>
    <li>Enhanced transparency requirements — trial registration mandatory</li>
    <li>Strengthened patient involvement in trial design and conduct</li>
    <li>Decentralised clinical trial elements explicitly supported</li>
  </ul>
</div>
`;

CONTENT.mod2text = `
<h1>The Clinical Trial Application Process via IRAS</h1>
<p>The <strong>Integrated Research Application System (IRAS)</strong> is the single online portal through which sponsors and their representatives apply for all the approvals needed to conduct a clinical trial in the UK. Understanding how IRAS works and what each submission involves is critical for trial start-up.</p>
<hr/>

<h2>What Is IRAS?</h2>
<p>IRAS (Integrated Research Application System) is the UK's single system for applying for permissions and approvals for health and social care research. It integrates the application processes for:</p>
<ul>
  <li><strong>MHRA Clinical Trial Authorisation (CTA)</strong></li>
  <li><strong>HRA Approval</strong></li>
  <li><strong>NHS/HSC R&D permission</strong></li>
  <li><strong>REC (Research Ethics Committee) review</strong></li>
  <li><strong>Radiation Authority</strong> (for research involving ionising radiation)</li>
</ul>

<h2>The Combined Review Process (Post-CTR 2025)</h2>
<p>Under the new framework, the MHRA and HRA conduct their reviews simultaneously — rather than sequentially — via a combined review service. This is now the standard route for clinical trial applications in the UK.</p>

<table>
  <tr><th>Stage</th><th>Who</th><th>What</th><th>Timeline</th></tr>
  <tr><td>1. Application Submission</td><td>Sponsor / CRO</td><td>Complete IRAS application; submit to MHRA and HRA simultaneously</td><td>Day 0</td></tr>
  <tr><td>2. MHRA Scientific Review</td><td>MHRA</td><td>Assesses scientific validity, quality, and safety of the IMP</td><td>30 days</td></tr>
  <tr><td>3. REC Ethical Review</td><td>HRA / REC</td><td>Full ethics committee review of participant safety, consent, risk/benefit</td><td>Runs in parallel</td></tr>
  <tr><td>4. HRA Approval</td><td>HRA</td><td>Confirms legal compliance; combines REC outcome with HRA checks</td><td>Runs in parallel</td></tr>
  <tr><td>5. Combined Outcome</td><td>MHRA + HRA</td><td>Single combined decision issued to sponsor</td><td>Average 41 days total</td></tr>
  <tr><td>6. Site-Level Permissions</td><td>NHS R&D at each site</td><td>Capacity and Capability confirmation</td><td>After combined approval</td></tr>
</table>
<hr/>

<h2>Key Documents Submitted with a CTA</h2>
<table>
  <tr><th>Document</th><th>Purpose</th></tr>
  <tr><td><strong>Investigational Medicinal Product Dossier (IMPD)</strong></td><td>Quality, preclinical, and clinical data on the IMP</td></tr>
  <tr><td><strong>Investigator's Brochure (IB)</strong></td><td>Summary of all clinical and non-clinical data relevant to the IMP</td></tr>
  <tr><td><strong>Protocol</strong></td><td>Detailed plan for the conduct of the trial</td></tr>
  <tr><td><strong>Patient Information Sheet & Informed Consent Form (PIS/ICF)</strong></td><td>Explains the trial to potential participants; basis for informed consent</td></tr>
  <tr><td><strong>GP/Physician Letter</strong></td><td>Letter to participant's GP informing them of trial participation</td></tr>
  <tr><td><strong>Insurance/Indemnity Certificates</strong></td><td>Evidence of sponsor's liability coverage for trial-related injury</td></tr>
  <tr><td><strong>CV of Principal Investigator(s)</strong></td><td>Confirms PI's qualifications and experience</td></tr>
</table>
<hr/>

<h2>Site Initiation: From Approval to Enrolment</h2>
<p>Once MHRA and HRA approvals are in place, each site must complete additional steps before patient enrolment can begin:</p>

<ol>
  <li><strong>Feasibility Questionnaire</strong> — assesses whether the site is suitable (patient population, facilities, staff)</li>
  <li><strong>Site Selection Visit (SSV)</strong> — sponsor/CRO visits to evaluate feasibility in person</li>
  <li><strong>Site Initiation Visit (SIV)</strong> — full training of site staff; regulatory documents reviewed; site opened for enrolment</li>
  <li><strong>Routine Monitoring Visits (RMV/IMV)</strong> — ongoing monitoring during trial conduct</li>
  <li><strong>Close-Out Visit (COV)</strong> — site closure; final reconciliation; archiving arrangements confirmed</li>
</ol>

<div class="key-points">
  <div class="key-points-title">✅ Regulatory Documents Filed in the ISF</div>
  <p>All regulatory approval documents must be filed in the <strong>Investigator's Site File (ISF)</strong> — the site-level equivalent of the Trial Master File (eTMF). The ISF is inspected by monitors, auditors, and MHRA inspectors. A missing regulatory document at SIV means the site cannot open.</p>
</div>
<hr/>

<h2>MHRA Inspection Programme</h2>
<p>The MHRA conducts GCP inspections of sponsors, CROs, and clinical trial sites to verify compliance. Inspection findings are classified as:</p>
<table>
  <tr><th>Finding Grade</th><th>Definition</th><th>Required Response</th></tr>
  <tr><td><strong>Critical</strong></td><td>Directly impacts subject safety or data integrity; may lead to trial suspension</td><td>Immediate corrective action; CAPA plan within 14 days</td></tr>
  <tr><td><strong>Major</strong></td><td>Significant GCP non-compliance; indirect risk to subjects or data integrity</td><td>CAPA plan within 30 days</td></tr>
  <tr><td><strong>Minor</strong></td><td>Low-level non-compliance with limited immediate impact</td><td>CAPA plan within 60 days</td></tr>
  <tr><td><strong>Recommendation</strong></td><td>Suggestion for improvement; not a compliance failure</td><td>Consider and respond</td></tr>
</table>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 3 — UK vs EU Regulatory Comparison
// ══════════════════════════════════════════════════════════════

CONTENT.mod3video = `
<h1>UK vs EU Regulatory Divergence Post-Brexit</h1>
<p>Brexit created a permanent divergence between the UK's regulatory framework for medicines and clinical trials and the European Union's framework. For multi-regional trials that include both UK and EU sites, this divergence has significant practical implications — requiring parallel submissions, separate pharmacovigilance reporting, and careful management of dual-country regulatory obligations.</p>

<h2>The Two Parallel Regulatory Frameworks</h2>
<table>
  <tr><th>Area</th><th>UK Framework</th><th>EU Framework</th></tr>
  <tr><td><strong>Clinical Trials Regulation</strong></td><td>UK CTR 2025 (Medicines for Human Use (Clinical Trials) (Amendment) Regulations 2025)</td><td>EU CTR 536/2014 (fully applicable in EU from January 2023)</td></tr>
  <tr><td><strong>Regulatory Authority</strong></td><td>MHRA</td><td>EMA + National Competent Authorities (NCAs)</td></tr>
  <tr><td><strong>Application Portal</strong></td><td>IRAS (UK)</td><td>CTIS (Clinical Trials Information System — EU)</td></tr>
  <tr><td><strong>Pharmacovigilance</strong></td><td>MHRA Yellow Card; UK XEVMPD</td><td>EudraVigilance; EMA EVCTM</td></tr>
  <tr><td><strong>SUSAR Reporting</strong></td><td>Reported to MHRA</td><td>Reported to EudraVigilance</td></tr>
  <tr><td><strong>Ethics Review</strong></td><td>HRA / UK RECs</td><td>National ethics committees per member state</td></tr>
  <tr><td><strong>MAA / Approval</strong></td><td>MHRA Marketing Authorisation Application (MAA)</td><td>EMA Centralised Procedure or national MRP/DCP</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for a side-by-side comparison of the UK and EU clinical trial regulatory processes and how divergence affects multi-regional trial planning.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 EU CTR 536/2014</div>
  <p>The EU Clinical Trials Regulation (EU CTR 536/2014) replaced the EU Clinical Trials Directive (2001/20/EC) and applies to all clinical trials in EU member states. It introduced the <strong>CTIS (Clinical Trials Information System)</strong> as the single portal for EU clinical trial applications. The UK is NOT part of CTIS — UK applications are made via IRAS to the MHRA.</p>
</div>
`;

CONTENT.mod3text = `
<h1>Pharmacovigilance Divergence: Yellow Card vs EudraVigilance</h1>
<p>One of the most significant operational consequences of Brexit is the existence of two completely separate pharmacovigilance reporting systems for the UK and EU. Sponsors running multi-regional trials must report adverse events to both systems according to different timelines and formats.</p>
<hr/>

<h2>UK Pharmacovigilance: The MHRA Yellow Card System</h2>
<p>The <strong>Yellow Card</strong> scheme is the MHRA's system for collecting and monitoring information on suspected adverse reactions to medicines and medical devices. In clinical trials, the relevant reporting mechanism is the <strong>SUSAR (Suspected Unexpected Serious Adverse Reaction)</strong> report submitted to the MHRA.</p>

<h3>SUSAR Reporting Timelines to the MHRA</h3>
<table>
  <tr><th>Type of SUSAR</th><th>Initial Report</th><th>Follow-up Report</th></tr>
  <tr><td><strong>Fatal or Life-Threatening</strong></td><td>7 calendar days from awareness</td><td>Additional 8 calendar days (15 days total)</td></tr>
  <tr><td><strong>Non-Fatal, Non-Life-Threatening</strong></td><td>15 calendar days from awareness</td><td>As required</td></tr>
</table>

<div class="info-box">
  <div class="info-box-title">⚠️ Serious Breach Reporting</div>
  <p>A <strong>Serious Breach</strong> of GCP or the trial protocol must be reported to the MHRA in writing within <strong>7 days</strong> of the Sponsor becoming aware of it. A serious breach is one that is likely to affect the safety or physical or mental integrity of the subjects of the trial or the scientific value of the trial.</p>
</div>
<hr/>

<h2>EU Pharmacovigilance: EudraVigilance</h2>
<p><strong>EudraVigilance</strong> is the European database for managing and analysing information on suspected adverse reactions to medicines authorised or being studied in the EU. It is maintained by the EMA. For clinical trials, SUSARs from EU sites are reported into EudraVigilance using the <strong>EVCTM (EudraVigilance Clinical Trial Module)</strong>.</p>

<h3>Dual Reporting Obligations for Multi-Regional Trials</h3>
<p>For a trial running in both the UK and EU, the sponsor must:</p>
<ol>
  <li>Report UK SUSARs to the <strong>MHRA</strong> (via Yellow Card / MHRA systems) within MHRA timelines</li>
  <li>Report EU SUSARs to <strong>EudraVigilance</strong> via EVCTM within EU CTR timelines</li>
  <li>Ensure both databases receive the full SUSAR report — not just line listings</li>
  <li>Manage two separate Annual Safety Reports (ASR in UK / DSUR in EU)</li>
</ol>
<hr/>

<h2>Key Adverse Event Classifications in UK Clinical Trials</h2>
<table>
  <tr><th>Term</th><th>Definition</th></tr>
  <tr><td><strong>AE</strong> — Adverse Event</td><td>Any untoward medical occurrence in a trial participant; does not require causal relationship with treatment</td></tr>
  <tr><td><strong>SAE</strong> — Serious Adverse Event</td><td>AE that results in death, hospitalisation, life-threatening event, persistent disability, congenital abnormality, or medically significant event</td></tr>
  <tr><td><strong>SAR</strong> — Serious Adverse Reaction</td><td>SAE judged by the investigator or sponsor as possibly related to the IMP</td></tr>
  <tr><td><strong>SUSAR</strong> — Suspected Unexpected Serious Adverse Reaction</td><td>SAR that is unexpected (not listed in the IB or SmPC) — requires expedited reporting to MHRA</td></tr>
  <tr><td><strong>AESI</strong> — Adverse Event of Special Interest</td><td>Pre-specified event requiring enhanced monitoring and reporting due to known or theoretical concerns</td></tr>
  <tr><td><strong>Serious Breach</strong></td><td>Breach of GCP or protocol that may affect subject safety or scientific value — 7-day written notification to MHRA</td></tr>
  <tr><td><strong>Protocol Deviation</strong></td><td>Any departure from protocol requirements — must be documented and assessed for impact</td></tr>
</table>
<hr/>

<h2>Impact on Multi-Regional Trial Planning</h2>
<p>Sponsors planning trials in both the UK and EU must now account for:</p>
<ul>
  <li><strong>Separate CTA submissions</strong> — IRAS for UK, CTIS for EU (cannot use the same submission)</li>
  <li><strong>Parallel ethics review</strong> — UK RECs and EU national ethics committees operate independently</li>
  <li><strong>Separate data management</strong> — UK and EU may have different data transfer rules (UK GDPR vs EU GDPR)</li>
  <li><strong>IMP labelling</strong> — UK-specific labelling requirements vs EU requirements</li>
  <li><strong>Separate marketing authorisation applications</strong> — MHRA MAA for UK; EMA or national procedure for EU</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Practical Tip: Build Dual-Track Regulatory Plans</div>
  <p>For multi-regional UK/EU trials, the regulatory team should build a <strong>dual-track regulatory timeline</strong> that accounts for the different submission portals, review timelines, and ongoing reporting obligations in each jurisdiction. MHRA and EMA/NCA timelines do not always align — budget for the longer of the two.</p>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 4 — Windsor Framework & Northern Ireland
// ══════════════════════════════════════════════════════════════

CONTENT.mod4video = `
<h1>Windsor Framework & Northern Ireland: What Changed on 1 January 2025</h1>
<p>Northern Ireland's unique position — geographically part of the UK but sharing a land border with EU member state Ireland — created complex regulatory questions after Brexit. The Windsor Framework, which took effect on 1 January 2025, resolved the most significant of these issues for the medicines sector.</p>

<h2>Background: The Northern Ireland Protocol Challenge</h2>
<p>After Brexit, the Northern Ireland Protocol created a situation where Northern Ireland (NI) remained partially subject to EU rules — including EU medicines regulations — while the rest of the UK (Great Britain: England, Scotland, Wales) operated under MHRA authority. This created a two-tier system where:</p>
<ul>
  <li>Medicines approved by the EMA could be placed on the NI market under EU rules</li>
  <li>MHRA-approved medicines were technically treated differently for NI vs GB</li>
  <li>Clinical trial sponsors faced uncertainty about which regulatory framework applied to NI sites</li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for an explanation of the Windsor Framework's implications for medicines licensing across the whole of the UK including Northern Ireland.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Windsor Framework — Key Change for Medicines</div>
  <p>From <strong>1 January 2025</strong>, under the Windsor Framework, the MHRA became the single regulatory authority licensing medicines for the <strong>entire United Kingdom</strong>, including Northern Ireland. All medicines approved in the UK are now licensed by the MHRA under the <strong>Human Medicines Regulations 2012 (as amended)</strong>. The two-tier NI/GB system for medicines was resolved.</p>
</div>
`;

CONTENT.mod4text = `
<h1>Practical Implications of the Windsor Framework for Clinical Research</h1>
<p>For clinical researchers, the Windsor Framework's resolution of the Northern Ireland medicines question has several important practical consequences — particularly for trial sponsors considering NI sites and for multi-national companies planning UK-wide studies.</p>
<hr/>

<h2>What the Windsor Framework Changed (Medicines Context)</h2>
<table>
  <tr><th>Area</th><th>Before Windsor Framework (pre-Jan 2025)</th><th>After Windsor Framework (from Jan 2025)</th></tr>
  <tr><td><strong>Medicines Licensing Authority</strong></td><td>MHRA for GB; EMA/EU rules applied to NI in some cases</td><td>MHRA for whole UK including NI — single UK-wide licensing authority</td></tr>
  <tr><td><strong>Parallel Imports</strong></td><td>Complex rules for NI given EU single market obligations</td><td>Streamlined under MHRA authority UK-wide</td></tr>
  <tr><td><strong>Clinical Trial Sites in NI</strong></td><td>Uncertainty over which regulatory framework applied</td><td>MHRA CTA covers all UK sites including NI; standard UK pathway applies</td></tr>
  <tr><td><strong>IMP Supply to NI Sites</strong></td><td>Subject to EU medicines border controls in some circumstances</td><td>UK internal market rules apply; MHRA-authorised IMP can be supplied NI-wide</td></tr>
  <tr><td><strong>Ethics Review in NI</strong></td><td>2 RECs operational in Northern Ireland</td><td>2 RECs in NI remain; HRA coordination applies for UK-wide ethics submissions</td></tr>
</table>
<hr/>

<h2>Northern Ireland Research Ethics Committees</h2>
<p>Northern Ireland has <strong>2 Research Ethics Committees (RECs)</strong> that operate within the UK HRA framework. These are:</p>
<ul>
  <li><strong>Northern Ireland 1 REC</strong> (Belfast area)</li>
  <li><strong>Northern Ireland 2 REC</strong></li>
</ul>
<p>These RECs are part of the HRA's network of 85 RECs across the UK (65 England, 11 Scotland, 7 Wales, 2 Northern Ireland). For UK-wide multi-site trials, a single REC provides the ethical opinion for all sites — the sponsor does not need separate ethics approval from each country's RECs.</p>
<hr/>

<h2>MHRA's Role Across the Whole UK</h2>
<p>Post-Windsor Framework, the MHRA's authority is clear and uniform across all four nations:</p>
<ul>
  <li><strong>England</strong>: MHRA + HRA (combined review); NHS England R&D for NHS sites</li>
  <li><strong>Scotland</strong>: MHRA + Scottish Health Research Authority processes; NHS Scotland R&D</li>
  <li><strong>Wales</strong>: MHRA + Health and Care Research Wales processes; NHS Wales R&D</li>
  <li><strong>Northern Ireland</strong>: MHRA + HSC (Health and Social Care) NI R&D; post-Windsor, fully within MHRA jurisdiction for medicines licensing</li>
</ul>
<hr/>

<h2>Residual EU Influence: What Still Applies in NI</h2>
<p>It is important to note that while medicines licensing is now under MHRA authority for the whole UK, certain EU arrangements still apply in NI in other areas. For clinical research purposes, however, the key practical point is:</p>

<div class="key-points">
  <div class="key-points-title">✅ Key Message for Clinical Trial Sponsors (Post-Windsor)</div>
  <ul>
    <li>A single MHRA CTA covers clinical trial conduct in all UK sites including Northern Ireland</li>
    <li>A single HRA approval covers ethical review for all UK nations (via the centralised REC process)</li>
    <li>IMP authorised by MHRA under UK law can be supplied to all UK sites including NI</li>
    <li>SUSAR reporting goes to the MHRA (not EudraVigilance) for all UK sites including NI</li>
    <li>NHS R&D / HSC R&D capacity and capability confirmation is still required at each site</li>
  </ul>
</div>
<hr/>

<h2>Human Medicines Regulations 2012 (as amended)</h2>
<p>The <strong>Human Medicines Regulations 2012</strong>, as amended by post-Brexit legislation including the Medicines and Medical Devices Act 2021 and the Windsor Framework-related amendments, form the primary legal framework governing medicines in the UK. Key provisions relevant to clinical researchers include:</p>
<ul>
  <li>Definition of a clinical trial and the requirement for a CTA</li>
  <li>Requirements for manufacturing authorisation for IMPs</li>
  <li>GCP compliance obligations for sponsors and investigators</li>
  <li>SUSAR reporting requirements and timelines</li>
  <li>MHRA's enforcement powers — including suspension and prohibition of trials</li>
</ul>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 5 — Practical Application & Final Assessment
// ══════════════════════════════════════════════════════════════

CONTENT.mod5video = `
<h1>Practical Application: Working with MHRA in Clinical Research</h1>
<p>The final module of this course brings together the regulatory knowledge from Modules 1–4 and applies it to the day-to-day realities of working in UK clinical research. Whether you are a CRA monitoring a site, a regulatory affairs professional submitting a CTA, or a study coordinator managing site files, this module gives you the practical tools you need to navigate the post-Brexit UK regulatory landscape with confidence.</p>

<h2>From Approval to Site Opening: The Practical Checklist</h2>
<p>Once MHRA and HRA approvals are received, a site can only open when all of the following regulatory documents are in place and filed in the <strong>Investigator's Site File (ISF)</strong>:</p>

<table>
  <tr><th>Document</th><th>Issued By</th><th>Required For</th></tr>
  <tr><td>MHRA Initial Approval Letter (CTA)</td><td>MHRA</td><td>All UK sites</td></tr>
  <tr><td>HRA Approval Letter</td><td>HRA</td><td>England sites (equivalent letters for Scotland/Wales/NI)</td></tr>
  <tr><td>REC Favourable Opinion Letter</td><td>Research Ethics Committee (IEC)</td><td>All UK sites</td></tr>
  <tr><td>NHS R&D Capacity & Capability Confirmation Letter</td><td>NHS Trust R&D department</td><td>NHS sites</td></tr>
  <tr><td>Signed Protocol</td><td>Sponsor / PI</td><td>All sites</td></tr>
  <tr><td>Investigator's Brochure (IB) — current version</td><td>Sponsor</td><td>All sites</td></tr>
  <tr><td>CV of Principal Investigator</td><td>PI</td><td>All sites</td></tr>
  <tr><td>Delegation Log</td><td>PI</td><td>All sites</td></tr>
  <tr><td>Signed Financial Disclosure Forms</td><td>PI and sub-investigators</td><td>All sites</td></tr>
  <tr><td>Laboratory Reference Ranges and Certification</td><td>Central / local lab</td><td>Sites with lab assessments</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for practical guidance on managing MHRA regulatory documents, conducting site visits, and maintaining GCP-compliant site files in the post-Brexit UK environment.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 ISF vs eTMF</div>
  <p>The <strong>ISF (Investigator's Site File)</strong> is held at the clinical trial site and contains all documents relevant to the site's conduct of the trial. The <strong>eTMF (Electronic Trial Master File)</strong> is the sponsor's master repository for all essential trial documents across all sites. Both must be maintained throughout the trial and archived after completion. The MHRA expects both to be inspection-ready at all times.</p>
</div>
`;

CONTENT.mod5text = `
<h1>Regulatory Compliance in Practice: Events, Reporting & CAPA</h1>
<p>Understanding the regulatory framework is one thing — applying it correctly in practice when things happen (or go wrong) is another. This lesson covers the key event types you will encounter in UK clinical trials and the reporting obligations that flow from them under the post-Brexit MHRA framework.</p>
<hr/>

<h2>Types of Events in UK Clinical Trials</h2>
<table>
  <tr><th>Event Type</th><th>Definition</th><th>Reporting Obligation</th></tr>
  <tr><td><strong>Adverse Event (AE)</strong></td><td>Any untoward medical occurrence in a participant; no implied causal relationship</td><td>Recorded in CRF/EDC per protocol schedule</td></tr>
  <tr><td><strong>Serious Adverse Event (SAE)</strong></td><td>AE resulting in death, hospitalisation, life-threatening, disability, congenital abnormality, or medically significant</td><td>Report to sponsor within 24 hours of PI awareness; sponsor reconciles with PV database</td></tr>
  <tr><td><strong>Serious Adverse Reaction (SAR)</strong></td><td>SAE with reasonable causal relationship to IMP</td><td>Documented and assessed; may become SUSAR if unexpected</td></tr>
  <tr><td><strong>SUSAR</strong></td><td>SAR that is unexpected (not in IB/SmPC)</td><td>Fatal/life-threatening: 7 days + 8-day follow-up; Non-fatal: 15 days — reported to MHRA and all investigators</td></tr>
  <tr><td><strong>AESI</strong></td><td>Pre-specified event of particular scientific interest</td><td>Per protocol; usually enhanced collection and expedited review</td></tr>
  <tr><td><strong>Serious Breach</strong></td><td>Breach of GCP or protocol likely to affect subject safety or scientific value</td><td>Written notification to MHRA within 7 days of Sponsor awareness</td></tr>
  <tr><td><strong>Pregnancy</strong></td><td>Participant or partner pregnancy on IMP</td><td>Reported immediately to sponsor; tracked to outcome; congenital abnormalities reported as SAEs</td></tr>
  <tr><td><strong>Protocol Deviation</strong></td><td>Any departure from the approved protocol</td><td>Documented; assessed (minor/major/important); important deviations may require REC/MHRA notification</td></tr>
  <tr><td><strong>Noncompliance</strong></td><td>Failure to follow GCP, protocol, or regulatory requirements</td><td>Documented; CAPA implemented; may escalate to serious breach</td></tr>
</table>
<hr/>

<h2>CAPA — Corrective and Preventive Action</h2>
<p>Whenever a deviation, noncompliance, or audit finding occurs, the site and sponsor must implement a <strong>CAPA (Corrective and Preventive Action)</strong> plan:</p>
<ul>
  <li><strong>Corrective Action</strong> — fixes the specific problem that occurred (e.g. retraining a staff member; correcting a data entry error)</li>
  <li><strong>Preventive Action</strong> — changes the system or process to prevent recurrence (e.g. new SOP; updated training programme; enhanced monitoring)</li>
</ul>
<p>CAPAs must be documented, assigned to a responsible person, given a completion date, and verified as effective.</p>
<hr/>

<h2>The Investigator's Site File (ISF) — Practical Management</h2>
<p>The ISF is the site's essential regulatory file. Under post-Brexit UK CTR 2025, its contents remain closely aligned with ICH GCP E6(R3) requirements. Key sections include:</p>

<ul>
  <li><strong>Section 1: Trial Authorisations</strong> — MHRA CTA, HRA Approval, REC Favourable Opinion, NHS R&D C&C</li>
  <li><strong>Section 2: Protocol & Amendments</strong> — signed protocol, all approved amendments</li>
  <li><strong>Section 3: Investigational Product</strong> — IB, current SmPC if applicable, IMP accountability records</li>
  <li><strong>Section 4: Staff</strong> — PI CV, delegation log, training records, GCP certificates</li>
  <li><strong>Section 5: Participant Information</strong> — approved PIS/ICF versions, signed ICFs (usually stored separately per subject)</li>
  <li><strong>Section 6: Safety Reporting</strong> — SUSAR notifications received from sponsor, SAE reports sent</li>
  <li><strong>Section 7: Monitoring</strong> — monitoring visit logs, visit reports, CRA correspondence</li>
  <li><strong>Section 8: Audit Trail</strong> — audit reports, inspection correspondence, CAPA records</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Post-Brexit Regulatory Checklist for UK Clinical Trial Sites</div>
  <ul>
    <li>MHRA CTA in place (covers whole UK including NI post-Windsor Framework Jan 2025)</li>
    <li>HRA Approval / devolved equivalent received</li>
    <li>REC Favourable Opinion from a recognised UK REC (85 RECs: 65 England, 11 Scotland, 7 Wales, 2 NI)</li>
    <li>NHS/HSC R&D Capacity &amp; Capability Confirmation Letter filed in ISF</li>
    <li>SUSAR reporting pathway set up — reports go to MHRA (not EudraVigilance for UK sites)</li>
    <li>Serious Breach notification procedure in place — 7-day written notification to MHRA</li>
    <li>Dual-track PV reporting system if EU sites also in trial (MHRA + EudraVigilance)</li>
    <li>ISF and eTMF aligned; inspection-ready at all times</li>
    <li>All regulatory documents current and filed; amendments tracked</li>
  </ul>
</div>
`;

// ─────────────────────────────────────────────────────────────
// MODULE DATA ARRAY
// ─────────────────────────────────────────────────────────────

const MODULES = [
  // ═══════════════════════════════════════
  // MODULE 1 — UK Regulatory Landscape Overview
  // ═══════════════════════════════════════
  {
    title: 'Module 1: UK Regulatory Landscape Overview',
    description: 'Pre vs post-Brexit UK regulatory environment; the three pillars (MHRA, HRA, NIHR); drug lifecycle from discovery to post-market; the four documents required to open a UK clinical trial site.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'UK Regulatory Landscape: MHRA, HRA, NIHR Overview',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module1, videoDurationMinutes: 20,
        isPreview: true, order: 1, content: CONTENT.mod1video,
      },
      {
        title: 'Drug Lifecycle, Regulatory Bodies & Site Opening Requirements',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod1text,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'What does MHRA stand for?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'MHRA stands for Medicines and Healthcare Products Regulatory Authority — the UK\'s primary scientific regulator for medicines, medical devices, and blood products.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Medicines and Healthcare Products Regulatory Authority', isCorrect: true, order: 1 },
            { optionText: 'Medicines and Health Research Association', isCorrect: false, order: 2 },
            { optionText: 'Medical and Healthcare Products Registration Agency', isCorrect: false, order: 3 },
            { optionText: 'Medicines Harmonisation and Regulatory Authority', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which body issues the Capacity and Capability Confirmation Letter for an NHS clinical trial site?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The NHS Trust\'s Research & Development (R&D) department issues the Capacity and Capability (C&C) Confirmation Letter, confirming the site has the staff, facilities, and arrangements to conduct the trial.',
          marks: 1, order: 2,
          options: [
            { optionText: 'NHS R&D (Research & Development department at the Trust)', isCorrect: true, order: 1 },
            { optionText: 'MHRA', isCorrect: false, order: 2 },
            { optionText: 'HRA', isCorrect: false, order: 3 },
            { optionText: 'NIHR Clinical Research Network', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'How many Research Ethics Committees (RECs) does the HRA operate across the UK?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The HRA operates 85 RECs in total: 65 in England, 11 in Scotland, 7 in Wales, and 2 in Northern Ireland.',
          marks: 1, order: 3,
          options: [
            { optionText: '85 RECs (65 England, 11 Scotland, 7 Wales, 2 Northern Ireland)', isCorrect: true, order: 1 },
            { optionText: '75 RECs (65 England, 10 Scotland)', isCorrect: false, order: 2 },
            { optionText: '100 RECs distributed across the UK', isCorrect: false, order: 3 },
            { optionText: '50 RECs, all in England and Scotland', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following documents are required before a UK clinical trial site can open and commence enrolment?',
          questionType: 'MULTI_SELECT',
          explanation: 'All four documents are required: MHRA Initial Approval (CTA), HRA Approval, REC Favourable Opinion, and NHS R&D C&C Confirmation. All must be filed in the ISF before site opening.',
          marks: 2, order: 4,
          options: [
            { optionText: 'MHRA Initial Approval Letter (CTA)', isCorrect: true, order: 1 },
            { optionText: 'HRA Approval Letter', isCorrect: true, order: 2 },
            { optionText: 'REC Initial Approval (Favourable Opinion) Letter', isCorrect: true, order: 3 },
            { optionText: 'NHS R&D Capacity and Capability Confirmation Letter', isCorrect: true, order: 4 },
            { optionText: 'EMA Scientific Opinion Letter', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'NIHR supports clinical research in the UK primarily through which infrastructure?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The NIHR supports NHS research through 15 Clinical Research Networks (CRNs) across the UK, providing infrastructure, patient recruitment support, and research delivery capacity.',
          marks: 1, order: 5,
          options: [
            { optionText: '15 Clinical Research Networks (CRNs)', isCorrect: true, order: 1 },
            { optionText: '85 Research Ethics Committees (RECs)', isCorrect: false, order: 2 },
            { optionText: '10 regional MHRA inspection teams', isCorrect: false, order: 3 },
            { optionText: '20 NHS academic health science centres', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 2 — MHRA & UK CTR 2025
  // ═══════════════════════════════════════
  {
    title: 'Module 2: MHRA & The New UK Clinical Trials Regulations 2025',
    description: 'The most significant UK clinical trial reform in 20 years — CTR 2025, combined review service, CTA process via IRAS, assessment timelines, site initiation sequence, and MHRA inspection programme.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'UK CTR 2025: The Reformed Clinical Trial Authorisation Framework',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module2, videoDurationMinutes: 18,
        isPreview: false, order: 1, content: CONTENT.mod2video,
      },
      {
        title: 'IRAS, Combined Review, Site Initiation & MHRA Inspections',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod2text,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The Medicines for Human Use (Clinical Trials) (Amendment) Regulations 2025 took full effect on:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The UK CTR 2025 was signed into law on 11 April 2025 and took full effect on 28 April 2026 — most significant UK clinical trial reform in 20 years.',
          marks: 1, order: 1,
          options: [
            { optionText: '28 April 2026', isCorrect: true, order: 1 },
            { optionText: '11 April 2025', isCorrect: false, order: 2 },
            { optionText: '1 January 2025', isCorrect: false, order: 3 },
            { optionText: '31 December 2020', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under the UK CTR 2025, what is the legally enshrined average timeline for the combined MHRA and HRA review?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The combined review (MHRA + HRA via IRAS) has a legally enshrined average timeline of 41 days — with MHRA assessment at 30 days for initial CTAs and 35 days for substantial amendments.',
          marks: 1, order: 2,
          options: [
            { optionText: '41 days', isCorrect: true, order: 1 },
            { optionText: '30 days', isCorrect: false, order: 2 },
            { optionText: '60 days', isCorrect: false, order: 3 },
            { optionText: '90 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is IRAS?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'IRAS (Integrated Research Application System) is the UK\'s single online portal for applying for all permissions and approvals needed to conduct clinical research, including the MHRA CTA, HRA Approval, and REC review.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Integrated Research Application System — the single portal for UK clinical trial approvals', isCorrect: true, order: 1 },
            { optionText: 'International Regulatory Affairs System for MHRA submissions', isCorrect: false, order: 2 },
            { optionText: 'Investigational Research and Approval Service managed by NIHR', isCorrect: false, order: 3 },
            { optionText: 'MHRA\'s internal database for tracking clinical trial authorisations', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In the UK site initiation sequence, which visit involves full training of site staff and must occur before enrolment begins?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Site Initiation Visit (SIV) involves full training of all site staff, review of regulatory documents, and opens the site for patient enrolment. It follows the Site Selection Visit (SSV) and must occur after all approvals are received.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Site Initiation Visit (SIV)', isCorrect: true, order: 1 },
            { optionText: 'Site Selection Visit (SSV)', isCorrect: false, order: 2 },
            { optionText: 'Routine Monitoring Visit (RMV)', isCorrect: false, order: 3 },
            { optionText: 'Close-Out Visit (COV)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An MHRA GCP inspection finding classified as "Critical" requires:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Critical finding directly impacts subject safety or data integrity and may lead to trial suspension. It requires immediate corrective action and a CAPA plan within 14 days.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Immediate corrective action and a CAPA plan within 14 days', isCorrect: true, order: 1 },
            { optionText: 'A CAPA plan within 30 days', isCorrect: false, order: 2 },
            { optionText: 'A CAPA plan within 60 days', isCorrect: false, order: 3 },
            { optionText: 'Consideration of the recommendation with no mandatory CAPA', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 3 — UK vs EU Regulatory Comparison
  // ═══════════════════════════════════════
  {
    title: 'Module 3: UK vs EU Regulatory Comparison',
    description: 'Post-Brexit divergence from EU CTR 536/2014; MHRA Yellow Card vs EudraVigilance; SUSAR and serious breach reporting timelines; dual reporting obligations for multi-regional trials.',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'Post-Brexit UK vs EU Regulatory Divergence',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module3, videoDurationMinutes: 16,
        isPreview: false, order: 1, content: CONTENT.mod3video,
      },
      {
        title: 'Pharmacovigilance Divergence: Yellow Card, EudraVigilance & Adverse Event Reporting',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod3text,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'For a fatal or life-threatening SUSAR, what are the reporting timelines to the MHRA?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Fatal or life-threatening SUSARs must be reported to the MHRA within 7 calendar days of awareness, with an additional 8-day follow-up report (15 days total). Non-fatal, non-life-threatening SUSARs must be reported within 15 days.',
          marks: 1, order: 1,
          options: [
            { optionText: '7 days initial report + 8-day follow-up (15 days total)', isCorrect: true, order: 1 },
            { optionText: '15 days for all SUSARs regardless of severity', isCorrect: false, order: 2 },
            { optionText: '24 hours initial + 7-day follow-up', isCorrect: false, order: 3 },
            { optionText: '30 days for fatal and 60 days for non-fatal SUSARs', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which portal is used for clinical trial applications in the European Union (post-EU CTR 536/2014)?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'CTIS (Clinical Trials Information System) is the EU\'s single portal for clinical trial applications under EU CTR 536/2014. UK applications use IRAS — not CTIS.',
          marks: 1, order: 2,
          options: [
            { optionText: 'CTIS (Clinical Trials Information System)', isCorrect: true, order: 1 },
            { optionText: 'IRAS (Integrated Research Application System)', isCorrect: false, order: 2 },
            { optionText: 'EudraVigilance portal', isCorrect: false, order: 3 },
            { optionText: 'EMA IRIS submission portal', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Serious Breach of GCP or the trial protocol must be reported to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach must be reported to the MHRA in writing within 7 days of the Sponsor becoming aware — it is a breach likely to affect subject safety or the scientific value of the trial.',
          marks: 1, order: 3,
          options: [
            { optionText: '7 days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '15 days of the Sponsor becoming aware', isCorrect: false, order: 2 },
            { optionText: '24 hours of the Sponsor becoming aware', isCorrect: false, order: 3 },
            { optionText: '30 days of the Sponsor becoming aware', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a multi-regional trial with both UK and EU sites, which of the following pharmacovigilance reporting obligations apply?',
          questionType: 'MULTI_SELECT',
          explanation: 'For UK sites, SUSARs are reported to the MHRA (not EudraVigilance). For EU sites, SUSARs are reported to EudraVigilance. Both reporting systems are separate and independent post-Brexit.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Report UK SUSARs to MHRA within MHRA timelines', isCorrect: true, order: 1 },
            { optionText: 'Report EU SUSARs to EudraVigilance within EU CTR timelines', isCorrect: true, order: 2 },
            { optionText: 'Maintain separate Annual Safety Reports for UK and EU', isCorrect: true, order: 3 },
            { optionText: 'Report all SUSARs only to EudraVigilance as it covers the whole of Europe including UK', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following correctly distinguishes a SAR from a SUSAR?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A SAR (Serious Adverse Reaction) is an SAE with a reasonable causal relationship to the IMP. A SUSAR is a SAR that is UNEXPECTED — meaning it is not listed (or not at the observed frequency/severity) in the Investigator\'s Brochure or SmPC.',
          marks: 1, order: 5,
          options: [
            { optionText: 'A SUSAR is a SAR that is unexpected (not listed in the IB/SmPC)', isCorrect: true, order: 1 },
            { optionText: 'A SUSAR is any SAE, whether or not it is related to the IMP', isCorrect: false, order: 2 },
            { optionText: 'A SAR is always more serious than a SUSAR', isCorrect: false, order: 3 },
            { optionText: 'A SUSAR is only applicable to EU trials; the UK uses "Unexpected SAR" terminology', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 4 — Windsor Framework & Northern Ireland
  // ═══════════════════════════════════════
  {
    title: 'Module 4: Windsor Framework & Northern Ireland',
    description: 'What changed on 1 January 2025: MHRA now licenses medicines UK-wide including NI; Windsor Framework practical impact on trial sites, IMP supply, and regulatory submissions in Northern Ireland.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'Windsor Framework: Medicines Licensing Across the Whole UK',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module4, videoDurationMinutes: 15,
        isPreview: false, order: 1, content: CONTENT.mod4video,
      },
      {
        title: 'Practical Implications of the Windsor Framework for Clinical Research',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod4text,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'From which date did the Windsor Framework give the MHRA authority to license medicines across the whole of the UK including Northern Ireland?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Windsor Framework took effect on 1 January 2025, from which date the MHRA became the single regulatory authority licensing medicines for the whole of the UK including Northern Ireland.',
          marks: 1, order: 1,
          options: [
            { optionText: '1 January 2025', isCorrect: true, order: 1 },
            { optionText: '31 December 2020 (end of Brexit transition)', isCorrect: false, order: 2 },
            { optionText: '28 April 2026', isCorrect: false, order: 3 },
            { optionText: '1 January 2021', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under the Windsor Framework, a sponsor running a UK-wide clinical trial with NI sites should submit their SUSAR reports to:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-Windsor Framework, all UK sites including Northern Ireland are under MHRA jurisdiction for clinical trial purposes. SUSARs from UK sites (including NI) are reported to the MHRA — not EudraVigilance.',
          marks: 1, order: 2,
          options: [
            { optionText: 'MHRA only — NI is now fully within UK regulatory jurisdiction', isCorrect: true, order: 1 },
            { optionText: 'EudraVigilance only — NI remains under EU pharmacovigilance requirements', isCorrect: false, order: 2 },
            { optionText: 'Both MHRA and EudraVigilance for NI sites', isCorrect: false, order: 3 },
            { optionText: 'The HSC NI R&D department only', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'How many Research Ethics Committees are based in Northern Ireland?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'There are 2 RECs in Northern Ireland. The full HRA network has 85 RECs: 65 England, 11 Scotland, 7 Wales, 2 Northern Ireland.',
          marks: 1, order: 3,
          options: [
            { optionText: '2', isCorrect: true, order: 1 },
            { optionText: '4', isCorrect: false, order: 2 },
            { optionText: '7', isCorrect: false, order: 3 },
            { optionText: '11', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which UK Act of Parliament gave the Government powers to update medicines and devices regulations independently of the EU after Brexit?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Medicines and Medical Devices Act 2021 gave the UK Government the legal powers to update medicines and medical devices regulations independently of the EU — enabling the UK CTR 2025 reform and the Windsor Framework medicines provisions.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Medicines and Medical Devices Act 2021', isCorrect: true, order: 1 },
            { optionText: 'European Union (Withdrawal) Act 2018', isCorrect: false, order: 2 },
            { optionText: 'Human Medicines Regulations 2012', isCorrect: false, order: 3 },
            { optionText: 'UK Internal Market Act 2020', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Post-Windsor Framework, does a trial sponsor need a separate CTA for Northern Ireland sites compared to other UK sites?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'No — post-Windsor Framework (from 1 January 2025), a single MHRA CTA covers all UK sites including Northern Ireland. There is no need for a separate EU/EMA submission for NI sites.',
          marks: 1, order: 5,
          options: [
            { optionText: 'No — a single MHRA CTA covers all UK sites including NI', isCorrect: true, order: 1 },
            { optionText: 'Yes — NI sites still require a separate EU CTA under EU CTR 536/2014', isCorrect: false, order: 2 },
            { optionText: 'Yes — NI sites require a separate HRA submission distinct from England', isCorrect: false, order: 3 },
            { optionText: 'Only if the trial involves IMP manufactured in the Republic of Ireland', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 5 — Practical Application & Final Assessment
  // ═══════════════════════════════════════
  {
    title: 'Module 5: Practical Application & Final Assessment',
    description: 'Working with MHRA in practice: site approvals, ISF document management, event reporting, CAPA, and compliance. Includes the 15-question final assessment for certificate eligibility.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Working with MHRA in Practice: Site Approvals & ISF Management',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module5, videoDurationMinutes: 22,
        isPreview: false, order: 1, content: CONTENT.mod5video,
      },
      {
        title: 'Regulatory Compliance: Events, Reporting, CAPA & ISF',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod5text,
      },
    ],
    quiz: {
      title: 'Final Assessment: UK Post-Brexit Regulatory Landscape',
      instructions: 'This is the final assessment for the UK Post-Brexit Regulatory Landscape course. Answer all 15 questions. Pass mark: 70% (11/15). You must pass this assessment to receive your certificate.',
      passMarkPercentage: 70, timeLimitMinutes: 25, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'What is the full name of the UK\'s primary medicines regulator?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'MHRA stands for Medicines and Healthcare Products Regulatory Authority — the UK\'s primary scientific regulator for medicines, medical devices, and blood products.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Medicines and Healthcare Products Regulatory Authority (MHRA)', isCorrect: true, order: 1 },
            { optionText: 'Medicines and Health Research Authority (MHRA)', isCorrect: false, order: 2 },
            { optionText: 'Medical and Healthcare Products Registration Agency', isCorrect: false, order: 3 },
            { optionText: 'European Medicines Agency (EMA)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The UK Clinical Trials Regulations 2025 were signed into law on:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Medicines for Human Use (Clinical Trials) (Amendment) Regulations 2025 were signed into law on 11 April 2025, taking full effect on 28 April 2026.',
          marks: 1, order: 2,
          options: [
            { optionText: '11 April 2025', isCorrect: true, order: 1 },
            { optionText: '28 April 2026', isCorrect: false, order: 2 },
            { optionText: '1 January 2025', isCorrect: false, order: 3 },
            { optionText: '31 December 2020', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which system is used in the UK for submitting clinical trial applications to the MHRA and HRA simultaneously?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'IRAS (Integrated Research Application System) is the UK\'s single portal for submitting clinical trial applications including the MHRA CTA, HRA Approval, and REC review — enabling the combined review process.',
          marks: 1, order: 3,
          options: [
            { optionText: 'IRAS (Integrated Research Application System)', isCorrect: true, order: 1 },
            { optionText: 'CTIS (Clinical Trials Information System)', isCorrect: false, order: 2 },
            { optionText: 'EudraVigilance', isCorrect: false, order: 3 },
            { optionText: 'EMA IRIS', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A non-fatal, non-life-threatening SUSAR must be reported to the MHRA within how many days?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Non-fatal, non-life-threatening SUSARs must be reported to the MHRA within 15 calendar days of awareness. Fatal/life-threatening SUSARs: 7 days + 8-day follow-up.',
          marks: 1, order: 4,
          options: [
            { optionText: '15 calendar days', isCorrect: true, order: 1 },
            { optionText: '7 calendar days', isCorrect: false, order: 2 },
            { optionText: '24 hours', isCorrect: false, order: 3 },
            { optionText: '30 calendar days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following documents must be filed in the ISF before a UK clinical trial site can open?',
          questionType: 'MULTI_SELECT',
          explanation: 'All four are required before site opening: MHRA CTA, HRA Approval, REC Favourable Opinion, and NHS R&D C&C Confirmation Letter. All must be filed in the ISF before the SIV and before enrolment begins.',
          marks: 2, order: 5,
          options: [
            { optionText: 'MHRA Initial Approval Letter (CTA)', isCorrect: true, order: 1 },
            { optionText: 'HRA Approval Letter', isCorrect: true, order: 2 },
            { optionText: 'REC Favourable Opinion Letter', isCorrect: true, order: 3 },
            { optionText: 'NHS R&D Capacity and Capability Confirmation Letter', isCorrect: true, order: 4 },
            { optionText: 'EMA Scientific Opinion', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'From 1 January 2025, which framework gave the MHRA authority to license medicines across the whole of the UK including Northern Ireland?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Windsor Framework, effective 1 January 2025, resolved the two-tier NI/GB medicines licensing issue. The MHRA now licenses medicines across the whole UK including Northern Ireland.',
          marks: 1, order: 6,
          options: [
            { optionText: 'Windsor Framework', isCorrect: true, order: 1 },
            { optionText: 'Northern Ireland Protocol', isCorrect: false, order: 2 },
            { optionText: 'EU Withdrawal Agreement', isCorrect: false, order: 3 },
            { optionText: 'UK Internal Market Act 2020', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The HRA network of 85 RECs is distributed across the UK as follows:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The HRA operates 85 RECs: 65 in England, 11 in Scotland, 7 in Wales, and 2 in Northern Ireland.',
          marks: 1, order: 7,
          options: [
            { optionText: '65 England, 11 Scotland, 7 Wales, 2 Northern Ireland', isCorrect: true, order: 1 },
            { optionText: '70 England, 10 Scotland, 5 Wales, 0 Northern Ireland', isCorrect: false, order: 2 },
            { optionText: '60 England, 15 Scotland, 8 Wales, 2 Northern Ireland', isCorrect: false, order: 3 },
            { optionText: '75 England, 5 Scotland, 3 Wales, 2 Northern Ireland', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In the EU (post-EU CTR 536/2014), clinical trial applications are submitted via:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'EU CTR 536/2014 introduced CTIS (Clinical Trials Information System) as the EU\'s single portal for clinical trial applications. UK applications use IRAS — not CTIS.',
          marks: 1, order: 8,
          options: [
            { optionText: 'CTIS (Clinical Trials Information System)', isCorrect: true, order: 1 },
            { optionText: 'IRAS (Integrated Research Application System)', isCorrect: false, order: 2 },
            { optionText: 'EudraVigilance', isCorrect: false, order: 3 },
            { optionText: 'EMA eSubmission portal', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Serious Breach of GCP must be reported to the MHRA in writing within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach — one that may affect subject safety or scientific value — must be reported to the MHRA in writing within 7 days of the Sponsor becoming aware of it.',
          marks: 1, order: 9,
          options: [
            { optionText: '7 days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '24 hours of the Sponsor becoming aware', isCorrect: false, order: 2 },
            { optionText: '15 days of the Sponsor becoming aware', isCorrect: false, order: 3 },
            { optionText: '30 days of the Sponsor becoming aware', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The MHRA\'s Yellow Card system is used for which purpose in clinical trials?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The MHRA Yellow Card system is the UK\'s pharmacovigilance reporting mechanism. In clinical trials, sponsors report SUSARs to the MHRA. The EU equivalent is EudraVigilance — these are separate systems post-Brexit.',
          marks: 1, order: 10,
          options: [
            { optionText: 'Reporting suspected adverse reactions and SUSARs to the MHRA (UK pharmacovigilance)', isCorrect: true, order: 1 },
            { optionText: 'Submitting Clinical Trial Authorisation applications to the MHRA', isCorrect: false, order: 2 },
            { optionText: 'Reporting adverse events to EudraVigilance for EU-wide analysis', isCorrect: false, order: 3 },
            { optionText: 'Registering clinical trial sites with the NHS R&D network', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following correctly describes the drug development lifecycle in order?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The drug lifecycle is: Discovery → Preclinical → Clinical (Phase 1–3) → Regulatory Approval → Post-Market Surveillance (Phase 4). IND = Investigational New Drug (US); MAA = Marketing Authorisation Application (UK equivalent of NDA).',
          marks: 1, order: 11,
          options: [
            { optionText: 'Discovery → Preclinical → Clinical (Phase 1–3) → Regulatory Approval → Post-Market Surveillance', isCorrect: true, order: 1 },
            { optionText: 'Preclinical → Discovery → Phase 1 → Phase 2 → Phase 3 → Phase 4', isCorrect: false, order: 2 },
            { optionText: 'Discovery → Phase 1 → Phase 2 → Phase 3 → Preclinical → Approval', isCorrect: false, order: 3 },
            { optionText: 'Discovery → Regulatory Approval → Clinical Phases → Post-Market', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The NIHR operates how many Clinical Research Networks (CRNs) in the UK?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The NIHR supports NHS research through 15 Clinical Research Networks (CRNs) across the UK, providing infrastructure, patient recruitment support, and research delivery capacity.',
          marks: 1, order: 12,
          options: [
            { optionText: '15 CRNs', isCorrect: true, order: 1 },
            { optionText: '10 CRNs', isCorrect: false, order: 2 },
            { optionText: '20 CRNs', isCorrect: false, order: 3 },
            { optionText: '85 CRNs', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a multi-regional trial with sites in both the UK and EU, which of the following statements about regulatory submissions is correct?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-Brexit, UK and EU are separate regulatory jurisdictions. A UK CTA via IRAS and an EU CTA via CTIS are both required for multi-regional UK/EU trials — they cannot use the same application system.',
          marks: 1, order: 13,
          options: [
            { optionText: 'Separate CTAs are required: IRAS for UK sites and CTIS for EU sites', isCorrect: true, order: 1 },
            { optionText: 'A single IRAS submission covers both UK and EU sites', isCorrect: false, order: 2 },
            { optionText: 'Only an EMA submission is needed and it covers UK sites automatically', isCorrect: false, order: 3 },
            { optionText: 'The EU CTIS application is acceptable to the MHRA for UK sites', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An ISF (Investigator\'s Site File) and an eTMF (Electronic Trial Master File) serve which distinct purposes?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The ISF is held at the clinical trial site and contains all documents relevant to the site\'s conduct. The eTMF is the sponsor\'s master repository for all essential trial documents across all sites. Both must be inspection-ready at all times.',
          marks: 1, order: 14,
          options: [
            { optionText: 'ISF is the site-level file; eTMF is the sponsor\'s master repository covering all sites', isCorrect: true, order: 1 },
            { optionText: 'ISF is the sponsor\'s financial file; eTMF is the site regulatory file', isCorrect: false, order: 2 },
            { optionText: 'ISF and eTMF are interchangeable terms for the same document collection', isCorrect: false, order: 3 },
            { optionText: 'eTMF is held at site; ISF is the sponsor\'s central file', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are correct statements about the UK\'s post-Brexit regulatory framework as of April 2026?',
          questionType: 'MULTI_SELECT',
          explanation: 'All three are correct: The MHRA operates independently of EMA; the combined MHRA/HRA review averages 41 days; and the Windsor Framework (Jan 2025) gave MHRA UK-wide medicines licensing authority including NI.',
          marks: 2, order: 15,
          options: [
            { optionText: 'The MHRA operates independently of the EMA and applies its own standards', isCorrect: true, order: 1 },
            { optionText: 'The combined MHRA/HRA review has a legally enshrined average of 41 days', isCorrect: true, order: 2 },
            { optionText: 'The Windsor Framework (Jan 2025) gave MHRA UK-wide medicines licensing authority including NI', isCorrect: true, order: 3 },
            { optionText: 'UK sponsors must use CTIS for all UK clinical trial submissions', isCorrect: false, order: 4 },
            { optionText: 'EudraVigilance is the required pharmacovigilance system for all UK SUSARs', isCorrect: false, order: 5 },
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
  console.log('  SEEDING: UK Post-Brexit Regulatory Landscape');
  console.log('  Course 07 | INTERMEDIATE | Regulatory Affairs');
  console.log('  Content: HTML strings | Videos: Real YouTube regulatory videos');
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
      title: 'UK Post-Brexit Regulatory Landscape',
      subtitle: 'Navigating MHRA regulations after the UK\'s departure from the EU',
      description: 'A comprehensive guide to the post-Brexit UK regulatory environment for clinical research. Covers MHRA, HRA, and NIHR roles; the landmark 2025 CTR reform and combined review; divergence from EU CTR 536/2014 and dual pharmacovigilance reporting; the Windsor Framework and Northern Ireland; and practical site approval, ISF management, and adverse event reporting under the new framework.',
      learningObjectives: [
        'Identify the three pillars of UK clinical trial oversight: MHRA, HRA, and NIHR',
        'Describe the key changes introduced by the UK Clinical Trials Regulations 2025',
        'Navigate the combined MHRA/HRA review process via IRAS',
        'Explain the regulatory divergence between UK and EU frameworks post-Brexit',
        'Apply correct SUSAR and Serious Breach reporting timelines to the MHRA',
        'Understand the impact of the Windsor Framework on medicines licensing in Northern Ireland',
        'Manage ISF documents and site approvals in a GCP-compliant manner',
      ],
      prerequisites: [
        'Basic understanding of clinical trials recommended',
        'Completion of ICH GCP E6 or UK Clinical Trial Start-up course is advantageous',
      ],
      targetAudience: [
        'Clinical Research Associates (CRAs) working in UK clinical trials',
        'Regulatory Affairs professionals navigating post-Brexit UK submissions',
        'Study Coordinators and Research Nurses at NHS sites',
        'Pharmaceutical and CRO professionals entering the UK clinical research market',
        'Clinical Trial Managers overseeing multi-regional UK/EU studies',
      ],
      durationHours: 4,
      difficultyLevel: 'INTERMEDIATE',
      accreditation: 'MHRA Framework Aligned',
      price: 119.00,
      originalPrice: 169.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'UK Post-Brexit Regulatory Landscape | MHRA CTR 2025 | Windsor Framework | Clinical Trials',
      seoDescription: 'Master the post-Brexit UK regulatory environment — MHRA CTR 2025, combined review, Windsor Framework, UK vs EU divergence, SUSAR reporting, and ISF management. MHRA Framework Aligned.',
      tags: ['MHRA', 'HRA', 'NIHR', 'CTR2025', 'Brexit', 'Windsor-Framework', 'IRAS', 'clinical-trials', 'regulatory-affairs', 'SUSAR', 'pharmacovigilance', 'Northern-Ireland', 'UK-regulations'],
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
        bodyText: 'This certifies successful completion of UK Post-Brexit Regulatory Landscape — MHRA Framework Aligned | Issued by Clinical Research Nexus',
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
  console.log('  Videos: Real YouTube UK regulatory / MHRA videos');
  console.log('  Preview: /courses/uk-post-brexit-regulatory-landscape');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
