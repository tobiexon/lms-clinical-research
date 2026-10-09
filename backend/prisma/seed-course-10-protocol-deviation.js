/**
 * COURSE 10: Protocol Deviation Management
 * ─────────────────────────────────────────
 * INTERMEDIATE | Investigator & Site Training
 *
 * Content sources:
 *  - Clinical Research Nexus training document:
 *    Protocol Deviation (PD), Noncompliance (NC), CAPA, Quality Issues,
 *    Serious Breach, Action Items, Queries, Audit, Inspection,
 *    QMS, ALCOA-CCEA, documentation golden rule, types of events
 *  - ICH GCP E6(R3) protocol deviation guidance
 *  - UK CTR 2025 / MHRA deviation reporting requirements
 *  - Industry best practice: risk-based monitoring and deviation prevention
 *
 * Modules:
 *  1. Understanding Protocol Deviations — Definitions & Framework
 *  2. Classifying Deviations — Minor, Major & Serious Breach
 *  3. Documenting & Reporting Deviations
 *  4. CAPA — Root Cause Analysis & Preventive Action
 *  5. Prevention Strategies, Quality Systems & Final Assessment
 *
 * Run: node prisma/seed-course-10-protocol-deviation.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'protocol-deviation-management';

const VIDEOS = {
  module1: 'https://www.youtube.com/watch?v=Fo0C0v_NHGE',
  module2: 'https://www.youtube.com/watch?v=r3u_-7G8LbQ',
  module3: 'https://www.youtube.com/watch?v=QyLMCFygfCE',
  module4: 'https://www.youtube.com/watch?v=hNe9K3G3sAM',
  module5: 'https://www.youtube.com/watch?v=6W7aP9oA-T8',
};

const CONTENT = {};

// ══════════════════════════════════════════════════════════════
// MODULE 1 — Understanding Protocol Deviations
// ══════════════════════════════════════════════════════════════

CONTENT.mod1video = `
<h1>Understanding Protocol Deviations: Definitions and Framework</h1>
<p>A <strong>protocol deviation (PD)</strong> is any departure from the approved clinical trial protocol — intentional or unintentional. Whether it's a missed visit, a wrong dose, an ineligible participant enrolled, or a consent form signed a day late, every departure from the approved protocol is a deviation that must be identified, documented, classified, and managed.</p>
<p>Protocol deviation management is one of the most scrutinised areas in MHRA GCP inspections and CRA monitoring visits. Understanding what constitutes a deviation, who is responsible for managing it, and what the consequences of poor management are is fundamental to anyone working in UK clinical research.</p>

<h2>Who Is This Course For?</h2>
<ul>
  <li><strong>Principal Investigators and Sub-Investigators</strong> who are accountable for protocol compliance at their site</li>
  <li><strong>Research Nurses and Study Coordinators</strong> who conduct day-to-day trial activities and are most likely to identify deviations</li>
  <li><strong>Clinical Research Associates (CRAs)</strong> who identify and escalate deviations during monitoring visits</li>
  <li><strong>Quality Assurance professionals</strong> responsible for deviation tracking and CAPA oversight</li>
  <li><strong>Sponsor and CRO regulatory teams</strong> managing deviation logs and sponsor reporting</li>
</ul>

<h2>The Protocol: The Binding Standard</h2>
<p>The <strong>protocol</strong> is the binding document that defines every aspect of the trial — who can participate, what procedures are performed and when, how the IMP is administered, and what data is collected. It is provided by the Sponsor, reviewed and approved by the MHRA (via CTA) and the REC, and signed by the PI before the trial begins.</p>
<p>Key protocol sections that frequently give rise to deviations include:</p>
<table>
  <tr><th>Section</th><th>Common Deviation Type</th></tr>
  <tr><td><strong>Inclusion/Exclusion Criteria</strong></td><td>Enrolling an ineligible participant; missing a screening criterion</td></tr>
  <tr><td><strong>Visit Windows</strong></td><td>Visit conducted outside the allowed window (±days)</td></tr>
  <tr><td><strong>IMP Dosing Schedule</strong></td><td>Wrong dose, missed dose, dose administered outside window</td></tr>
  <tr><td><strong>Informed Consent</strong></td><td>Procedures performed before consent signed; wrong consent version used</td></tr>
  <tr><td><strong>Schedule of Assessments</strong></td><td>Required procedure missed or not performed correctly</td></tr>
  <tr><td><strong>Prohibited Medications</strong></td><td>Participant takes a concomitant medication that is prohibited by the protocol</td></tr>
  <tr><td><strong>Safety Monitoring</strong></td><td>Required safety assessment missed; AE not reported in required timeframe</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for an introduction to protocol deviation management — what deviations are, why they occur, and the regulatory framework that governs how they must be handled in UK clinical trials.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Protocol vs GCP Deviation</div>
  <p>A <strong>protocol deviation</strong> is a departure from the approved protocol document. A <strong>GCP deviation</strong> is a departure from the broader Good Clinical Practice principles (ICH GCP E6(R3)). Both are compliance failures. A single event can be both — for example, failing to obtain informed consent before procedures is a protocol deviation (if consent timing is specified in the protocol) AND a GCP violation.</p>
</div>
`;

CONTENT.mod1text = `
<h1>Types of Events in Clinical Trials: Deviations in Context</h1>
<p>Protocol deviations are one category within the broader set of events that must be monitored and managed in clinical trials. Understanding how deviations relate to other event types — particularly noncompliance, quality issues, and serious breaches — is essential for correct classification and escalation.</p>
<hr/>

<h2>The Full Range of Trial Events</h2>
<p>From the Clinical Research Nexus training framework, the complete list of event types that must be monitored in clinical trials includes:</p>
<table>
  <tr><th>Event Type</th><th>Definition</th></tr>
  <tr><td><strong>Adverse Event (AE)</strong></td><td>Any untoward medical occurrence — no causal relationship required</td></tr>
  <tr><td><strong>Serious Adverse Event (SAE)</strong></td><td>AE meeting one of the six seriousness criteria (death, hospitalisation, life-threatening, disability, congenital anomaly, medically significant)</td></tr>
  <tr><td><strong>SAR / SUSAR</strong></td><td>Serious adverse reactions and suspected unexpected serious adverse reactions — expedited MHRA reporting</td></tr>
  <tr><td><strong>Adverse Event of Special Interest (AESI)</strong></td><td>Pre-specified events requiring enhanced monitoring per protocol</td></tr>
  <tr><td><strong>Serious Breach</strong></td><td>Breach of GCP or protocol likely to affect subject safety or scientific value — 7-day MHRA notification</td></tr>
  <tr><td><strong>Pregnancy</strong></td><td>Participant or partner pregnancy — special form; PI follows up until birth</td></tr>
  <tr><td><strong>Protocol Deviation (PD)</strong></td><td>Any departure from the approved protocol</td></tr>
  <tr><td><strong>Noncompliance (NC)</strong></td><td>Failure to comply with GCP, protocol, or regulatory requirements</td></tr>
  <tr><td><strong>Quality Issue</strong></td><td>Data quality issues affecting reliability or regulatory compliance</td></tr>
  <tr><td><strong>CAPA</strong></td><td>Corrective and Preventive Action plan — response to identified compliance issues</td></tr>
  <tr><td><strong>Action Item (AI)</strong></td><td>Actions required to be taken by CRA or site to resolve a monitoring finding</td></tr>
  <tr><td><strong>Query</strong></td><td>Data clarification request in the EDC — issued by CRA or DM team to site</td></tr>
  <tr><td><strong>Audit</strong></td><td>Independent systematic examination of trial conduct by sponsor-appointed auditors</td></tr>
  <tr><td><strong>Inspection</strong></td><td>MHRA examination of trial conduct — triggered for serious breaches or routine programme</td></tr>
</table>
<hr/>

<h2>Protocol Deviation — Detailed Definition</h2>
<p>Under ICH GCP E6(R3) and UK CTR 2025, a protocol deviation is defined as <strong>any deviation from the protocol</strong>. This includes:</p>
<ul>
  <li>Actions that deviate from what the protocol requires (a procedure not performed as required)</li>
  <li>Actions that violate the protocol's prohibitions (a prohibited medication administered)</li>
  <li>Actions taken outside the permitted timeframe (a visit done outside the visit window)</li>
  <li>Actions performed on a participant who does not meet the eligibility criteria</li>
</ul>
<p>The key point is that <strong>intent is irrelevant</strong> — an accidental deviation is still a deviation. The relevant question is what happened compared to what the protocol required.</p>
<hr/>

<h2>Noncompliance — The Broader Category</h2>
<p><strong>Noncompliance (NC)</strong> is defined as any action or activity associated with the conduct or oversight of research involving human participants that fails to comply with:</p>
<ul>
  <li>The research plan (protocol) as approved by the Project Team</li>
  <li>A designated IRB/IEC decision</li>
  <li>Federal regulations or UK law (UK CTR 2025)</li>
  <li>Institutional policies governing such research</li>
</ul>
<p>All protocol deviations are noncompliance, but not all noncompliance events are protocol deviations. For example:</p>
<ul>
  <li>Failing to report an SAE within 24 hours is a GCP noncompliance — but it may not be a protocol deviation if the reporting timeline is not specified in the protocol itself</li>
  <li>A missing delegation log entry is a GCP noncompliance — but is not a protocol deviation</li>
  <li>Enrolling an ineligible participant is both a protocol deviation AND noncompliance</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Key Distinction: Protocol Deviation vs Noncompliance</div>
  <ul>
    <li><strong>Protocol Deviation (PD)</strong> — departure from the approved protocol document specifically</li>
    <li><strong>Noncompliance (NC)</strong> — broader category covering all GCP, legal, and institutional requirements</li>
    <li>Both must be documented in their respective logs, acknowledged and signed by the PI</li>
    <li>Both require CAPA to address root cause and prevent recurrence</li>
    <li>Serious noncompliance that affects subject safety or scientific value = Serious Breach → 7-day MHRA notification</li>
  </ul>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 2 — Classifying Deviations
// ══════════════════════════════════════════════════════════════

CONTENT.mod2video = `
<h1>Classifying Protocol Deviations: Minor, Major & Serious Breach</h1>
<p>Not all protocol deviations are equal. Correct classification determines the reporting pathway, the urgency of response, and whether the deviation triggers regulatory notification. Misclassifying a major deviation as minor — or failing to recognise a serious breach — are among the most significant quality failures in clinical trial management.</p>

<h2>The Three-Level Classification System</h2>

<h3>Minor Protocol Deviation</h3>
<p>A minor deviation is one that:</p>
<ul>
  <li>Does <strong>NOT</strong> increase the risk to the participant</li>
  <li>Does <strong>NOT</strong> decrease the benefit to the participant</li>
  <li>Does <strong>NOT</strong> significantly affect the participant's rights, safety or welfare</li>
  <li>Does <strong>NOT</strong> significantly affect the integrity of the research data</li>
</ul>

<h3>Major / Important Protocol Deviation</h3>
<p>A major deviation is one that:</p>
<ul>
  <li><strong>Increases</strong> the risk or <strong>decreases</strong> the benefit to the participant</li>
  <li><strong>Significantly affects</strong> the subject's rights, safety or welfare and/or the integrity of the research data</li>
</ul>

<h3>Serious Breach</h3>
<p>A serious breach goes beyond a major deviation. It is a breach of GCP or the protocol that is <strong>likely to affect to a significant degree</strong>:</p>
<ul>
  <li>The <strong>safety or physical integrity</strong> of the participants</li>
  <li>Or the <strong>mental integrity</strong> of the participants</li>
  <li>Or the <strong>scientific value</strong> of the trial</li>
</ul>
<p>The Sponsor must submit a written notification to the MHRA <strong>within 7 days</strong> of becoming aware of a serious breach.</p>

<blockquote>💡 <strong>Watch the video above</strong> for worked examples of deviation classification — including borderline cases and how context affects whether a deviation is minor, major, or a serious breach.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Classification Is Not Binary</div>
  <p>Classification is a judgment that depends on <strong>context and impact</strong>. The same nominal deviation can be classified differently depending on: the therapeutic area (oncology vs dermatology), the participant's vulnerability, the frequency of recurrence, and the impact on the trial's primary endpoint data. A visit 2 days outside the window in a low-risk study is minor; the same deviation in a pharmacokinetic study where sampling timing is critical could be major.</p>
</div>
`;

CONTENT.mod2text = `
<h1>Classification Examples & Decision Framework</h1>
<p>Classification of protocol deviations requires both knowledge of the definitions and practical judgment about context and impact. The following examples, drawn from common clinical trial scenarios, illustrate how to apply the framework correctly.</p>
<hr/>

<h2>Worked Classification Examples</h2>
<table>
  <tr><th>Scenario</th><th>Classification</th><th>Rationale</th></tr>
  <tr><td>Protocol visit conducted 2 days outside the ±7-day window due to bank holiday</td><td>Minor PD</td><td>Small timing deviation; participant safety not affected; data integrity not significantly impacted</td></tr>
  <tr><td>Blood sample for PK assessment taken 45 minutes late (window is ±15 minutes)</td><td>Major PD</td><td>PK timing is critical — the data cannot be used for primary analysis; scientific integrity affected</td></tr>
  <tr><td>Participant enrolled despite failing one exclusion criterion (asymptomatic)</td><td>Major PD</td><td>Eligibility criteria define who can safely participate; violation directly affects subject rights and data validity</td></tr>
  <tr><td>Participant enrolled despite meeting a key safety-based exclusion criterion</td><td>Major PD / Serious Breach</td><td>Direct risk to participant safety; could constitute serious breach depending on severity of exclusion criterion</td></tr>
  <tr><td>Informed consent signed 30 minutes after a non-invasive questionnaire was completed</td><td>Major PD</td><td>Any trial procedure before consent — even non-invasive — is a consent violation; significantly affects participant rights</td></tr>
  <tr><td>Informed consent signed the day after a physical examination was performed</td><td>Major PD / Serious Breach</td><td>Physical examination before consent is a clear GCP violation; likely constitutes a serious breach</td></tr>
  <tr><td>Wrong dose of IMP administered on one occasion — participant not harmed</td><td>Major PD</td><td>IMP administration error affects protocol compliance and data integrity; participant safety assessment required</td></tr>
  <tr><td>Same wrong dose administered to multiple participants across multiple visits</td><td>Serious Breach</td><td>Systematic error with potential safety implications; affects scientific value of the trial</td></tr>
  <tr><td>Delayed SAE report — submitted 48 hours after awareness instead of 24 hours</td><td>Major PD / NC</td><td>GCP noncompliance with safety reporting obligation; regulatory and safety implications</td></tr>
  <tr><td>Correction of a minor typo in the protocol document without going through amendment process</td><td>Minor PD</td><td>Administrative; no impact on conduct, safety, or scientific value</td></tr>
</table>
<hr/>

<h2>The Classification Decision Framework</h2>
<p>When assessing any deviation, work through these questions in order:</p>

<ol>
  <li><strong>Did the deviation affect subject safety or increase participant risk?</strong>
    <ul>
      <li>Yes, significantly → consider Serious Breach</li>
      <li>Yes, to some extent → Major PD</li>
      <li>No → proceed to step 2</li>
    </ul>
  </li>
  <li><strong>Did the deviation affect the participant's rights or welfare?</strong>
    <ul>
      <li>Yes (e.g. consent violation, eligibility breach) → Major PD or Serious Breach</li>
      <li>No → proceed to step 3</li>
    </ul>
  </li>
  <li><strong>Did the deviation significantly affect data integrity?</strong>
    <ul>
      <li>Yes (e.g. PK timing, missed primary endpoint assessment) → Major PD</li>
      <li>Unlikely → proceed to step 4</li>
    </ul>
  </li>
  <li><strong>Was the deviation isolated and correctable?</strong>
    <ul>
      <li>Yes, with no safety or data impact → Minor PD</li>
      <li>No (systematic/recurring) → reconsider Major PD or Serious Breach</li>
    </ul>
  </li>
</ol>

<div class="warning-box">
  <p>⚠️ <strong>When in doubt, classify upward.</strong> It is always better to classify a borderline deviation as major rather than minor. Downgrading a major deviation to minor to avoid a reporting obligation is a quality failure in itself — and will be identified during audits and inspections. The sponsor's medical monitor should review any borderline case.</p>
</div>
<hr/>

<h2>The Serious Breach Threshold</h2>
<p>The threshold for <strong>Serious Breach</strong> reporting to the MHRA is defined in UK CTR 2025 as a breach that is likely to affect to a significant degree the safety, physical or mental integrity of participants, or the scientific value of the trial. Examples include:</p>
<ul>
  <li>Systematic failure to obtain informed consent before procedures</li>
  <li>Repeated administration of incorrect IMP across multiple participants</li>
  <li>Enrolling participants who meet key safety-based exclusion criteria repeatedly</li>
  <li>Systematic failure to report SAEs to the sponsor</li>
  <li>Evidence of data fabrication or falsification at a site</li>
</ul>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 3 — Documenting & Reporting Deviations
// ══════════════════════════════════════════════════════════════

CONTENT.mod3video = `
<h1>Documenting and Reporting Protocol Deviations</h1>
<p>Identifying a deviation is only the first step. The deviation must then be <strong>documented immediately</strong>, reported to the appropriate parties, and managed through to resolution. Every deviation requires a contemporaneous record — because in clinical trials, if it is not documented, it did not happen.</p>

<h2>The Protocol Deviation Log</h2>
<p>The <strong>Protocol Deviation Log</strong> is the central document for tracking all protocol deviations at a site. It must be:</p>
<ul>
  <li>Started at site initiation and maintained throughout the trial</li>
  <li>Updated whenever a deviation is identified — contemporaneously, not retrospectively</li>
  <li>Acknowledged, <strong>signed and dated by the PI</strong> — each entry requires PI sign-off</li>
  <li>Reviewed by the CRA at every monitoring visit</li>
  <li>Filed in both the ISF and submitted to the sponsor/eTMF</li>
  <li>Collected and finalised at the Close-Out Visit (COV)</li>
</ul>

<h3>What Each Deviation Log Entry Must Include</h3>
<table>
  <tr><th>Field</th><th>Content</th></tr>
  <tr><td>Subject ID / Participant number</td><td>Anonymous identifier — never full name</td></tr>
  <tr><td>Deviation description</td><td>Clear factual description of what deviated from the protocol</td></tr>
  <tr><td>Protocol section violated</td><td>Reference to the specific protocol section (e.g. Section 6.2: Visit Window)</td></tr>
  <tr><td>Date deviation occurred</td><td>When the deviation actually happened</td></tr>
  <tr><td>Date deviation was detected</td><td>When it was first identified (may differ from when it occurred)</td></tr>
  <tr><td>Classification</td><td>Minor / Major / Serious Breach</td></tr>
  <tr><td>Immediate action taken</td><td>What was done when the deviation was discovered</td></tr>
  <tr><td>CAPA reference</td><td>Link to the CAPA plan addressing this deviation</td></tr>
  <tr><td>PI signature and date</td><td>PI acknowledgement of each entry</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for a step-by-step guide to completing a protocol deviation log correctly — including what level of detail is required and how to handle retrospectively identified deviations.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Retrospective Discovery of Deviations</div>
  <p>Many deviations are discovered retrospectively — for example, during a monitoring visit the CRA identifies that a participant was enrolled outside the eligibility criteria. When this happens, the deviation is recorded with <strong>two dates</strong>: the date it occurred and the date it was detected. The CAPA starts from the date of detection, not the date of occurrence.</p>
</div>
`;

CONTENT.mod3text = `
<h1>Reporting Pathways: From Site to Sponsor to MHRA</h1>
<p>Once a deviation is identified and documented, the reporting pathway depends on the classification. Different deviations require different levels of escalation — from an entry in the deviation log all the way to a formal written notification to the MHRA.</p>
<hr/>

<h2>Reporting Pathways by Classification</h2>
<table>
  <tr><th>Classification</th><th>Site Action</th><th>Sponsor Action</th><th>MHRA Action</th></tr>
  <tr>
    <td><strong>Minor PD</strong></td>
    <td>Document in PD log; PI signs; CAPA if recurring</td>
    <td>Reviewed at monitoring visit; included in aggregate deviation summary</td>
    <td>No MHRA notification required; included in Annual Safety Report summary</td>
  </tr>
  <tr>
    <td><strong>Major PD</strong></td>
    <td>Document in PD log; PI signs; notify sponsor promptly; CAPA required</td>
    <td>Assess impact on subject safety and data integrity; consider protocol amendment if structural issue</td>
    <td>Major deviations included in DSUR; not individually reportable unless repeated or systematic</td>
  </tr>
  <tr>
    <td><strong>Serious Breach</strong></td>
    <td>Notify sponsor immediately; document in PD/breach log; PI signs</td>
    <td>Notify MHRA in writing within <strong>7 days</strong> of Sponsor awareness; consider trial suspension at site</td>
    <td>MHRA receives written notification; may trigger inspection</td>
  </tr>
</table>
<hr/>

<h2>Action Items (AIs) and Queries</h2>
<p>In practice, deviation management at the site level is closely linked to two operational tools:</p>

<h3>Action Items (AIs)</h3>
<p>An <strong>Action Item</strong> is a formal task required to be taken by the CRA or site personnel to resolve a finding — typically created after a monitoring visit during report writing.</p>
<ul>
  <li>Created by the CRA in response to a finding (which may include a deviation, a documentation gap, or a query)</li>
  <li>Must be <strong>closed once the need is resolved</strong> — not left open indefinitely</li>
  <li>There is a defined timeline for closing AIs (set in the monitoring plan or SOP)</li>
  <li>AI closure rates count as part of <strong>CRA performance metrics</strong></li>
  <li>CRAs follow up AIs with site personnel during RMVs and between visits</li>
</ul>

<h3>Queries</h3>
<p>A <strong>Query</strong> is created in the EDC by the CRA, data management team, or system to the site, to correct or clarify information in the EDC. Queries are separate from AIs but may arise from the same deviation (e.g. a deviation leads to incorrect data entry which generates a query).</p>
<ul>
  <li>Site must resolve and close queries in the EDC in a timely manner</li>
  <li>Query closure rates count as CRA metrics</li>
  <li>Outstanding queries at the time of database lock can delay the trial</li>
</ul>
<hr/>

<h2>Communicating Deviations to Participants</h2>
<p>In some cases, deviations directly affect participants and they must be informed:</p>
<ul>
  <li>If a deviation means a participant was exposed to a risk they did not consent to, they must be informed and offered re-consent</li>
  <li>If a deviation means a participant received the wrong dose, they must be assessed for safety and told what happened</li>
  <li>If a deviation means a participant did not receive a required assessment, the assessment may need to be performed retrospectively (where clinically meaningful)</li>
  <li>If a participant was enrolled despite not meeting eligibility criteria, the PI must assess whether continuing participation is safe</li>
</ul>
<hr/>

<h2>ALCOA-CCEA and Deviation Documentation</h2>
<p>All deviation documentation must comply with ALCOA-CCEA data integrity principles. Common failures in deviation documentation that are cited during audits and inspections:</p>
<table>
  <tr><th>Failure</th><th>ALCOA-CCEA Attribute Violated</th></tr>
  <tr><td>Deviation logged retrospectively weeks after it occurred</td><td>Contemporaneous</td></tr>
  <tr><td>Deviation log entry not signed or dated by PI</td><td>Attributable</td></tr>
  <tr><td>Vague or unclear description of what deviated</td><td>Accurate, Legible</td></tr>
  <tr><td>Deviation classified without reference to the protocol section violated</td><td>Accurate</td></tr>
  <tr><td>CAPA described but no evidence it was implemented</td><td>Complete</td></tr>
  <tr><td>Date of deviation different in PD log vs source document</td><td>Consistent</td></tr>
</table>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 4 — CAPA: Root Cause Analysis & Preventive Action
// ══════════════════════════════════════════════════════════════

CONTENT.mod4video = `
<h1>CAPA: Corrective and Preventive Action</h1>
<p><strong>CAPA (Corrective and Preventive Action)</strong> is the quality management response to a protocol deviation or compliance failure. A CAPA plan is not just a box-ticking exercise — it is the mechanism by which the clinical trial team demonstrates that they understand why a deviation occurred, what they did to fix it, and what they changed to prevent it happening again.</p>
<p>Under UK CTR 2025 and ICH GCP E6(R3), CAPA is a mandatory quality system component. A CAPA plan is crucial to a clinical trial as it helps keep trial participants safe and protects their rights — and prevents study data from being compromised.</p>

<h2>CAPA vs Immediate Corrective Action</h2>
<p>It is important to distinguish between:</p>
<ul>
  <li><strong>Immediate Action</strong> — taken at the point the deviation is discovered to stop ongoing harm or risk (e.g. stop dosing a participant who has been given the wrong dose; inform the sponsor; assess participant safety)</li>
  <li><strong>CAPA</strong> — the systematic, documented plan addressing the root cause and preventing recurrence (completed after the immediate situation is controlled)</li>
</ul>

<blockquote>💡 <strong>Watch the video above</strong> for a practical walkthrough of writing an effective CAPA plan — including root cause analysis techniques, how to write meaningful corrective and preventive actions, and how to close a CAPA effectively.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 The CAPA Process</div>
  <ol>
    <li><strong>Identify</strong> the potential issue</li>
    <li><strong>Identify the root cause</strong> of the issue</li>
    <li><strong>Corrective Action</strong> — actions to prevent the recurrence of the specific issue that occurred</li>
    <li><strong>Preventive Action</strong> — actions to prevent a similar problem from occurring in the future (addresses systemic vulnerability, not just the specific incident)</li>
    <li><strong>Document</strong> that the corrective and preventive actions were carried out</li>
    <li><strong>Document</strong> that the corrective and preventive actions resolved the issue(s)</li>
  </ol>
</div>
`;

CONTENT.mod4text = `
<h1>Root Cause Analysis Techniques & Effective CAPA Writing</h1>
<p>The quality of a CAPA is determined by the quality of the root cause analysis. A CAPA that addresses a symptom rather than the underlying cause will not prevent recurrence — and a recurring deviation with repeated inadequate CAPAs is itself a red flag in an audit or inspection.</p>
<hr/>

<h2>Root Cause Analysis (RCA)</h2>
<p>Root cause analysis asks "why did this happen?" rather than just "what happened?". Common RCA techniques used in clinical trials include:</p>

<h3>The 5 Whys</h3>
<p>Ask "why?" repeatedly until you reach the underlying cause. Example:</p>
<ol>
  <li><strong>What happened?</strong> Participant enrolled outside the eligible age range (exclusion criterion missed)</li>
  <li><strong>Why?</strong> Study Coordinator did not check the age exclusion criterion before enrolment</li>
  <li><strong>Why?</strong> There was no eligibility checklist used at screening</li>
  <li><strong>Why?</strong> The eligibility checklist was not created when the site was initiated</li>
  <li><strong>Why?</strong> Site initiation training did not include creation of site-specific tools</li>
  <li><strong>Root cause:</strong> Inadequate site initiation process — no checklist tool to support eligibility verification</li>
</ol>

<h3>Fishbone (Ishikawa) Diagram</h3>
<p>Organises potential causes into categories — typically: People, Process, Equipment, Environment, Materials, Management. Useful for complex, multi-factor deviations.</p>

<h3>ALCOA-CCEA as a Root Cause Framework</h3>
<p>For documentation failures, reviewing which ALCOA-CCEA attribute was violated often points directly to the root cause:</p>
<ul>
  <li>Contemporaneous violation → data entry process is too slow or staff are not trained on timing requirements</li>
  <li>Attributable violation → no clear ownership of data entry tasks; delegation log not current</li>
  <li>Complete violation → no checklist to confirm all required fields are completed</li>
</ul>
<hr/>

<h2>Writing Effective CAPA Actions</h2>
<p>Effective CAPA actions are SMART: <strong>Specific, Measurable, Achievable, Relevant, Time-bound</strong>.</p>

<h3>Weak vs Strong CAPA Examples</h3>
<table>
  <tr><th>Weak CAPA</th><th>Strong CAPA</th><th>Why the Strong Version Is Better</th></tr>
  <tr>
    <td>"Staff will be retrained."</td>
    <td>"All consenting staff will receive a 30-minute GCP consent process refresher by [date], with sign-off on the Training Log. Confirmation submitted to CRA by [date+14 days]."</td>
    <td>Specific, time-bound, evidenced by Training Log signature</td>
  </tr>
  <tr>
    <td>"Eligibility criteria will be checked more carefully."</td>
    <td>"An eligibility checklist covering all inclusion/exclusion criteria will be created and implemented for all new screens by [date]. Checklist to be filed with the screening source document for each participant."</td>
    <td>Creates a new process control; generates auditable evidence</td>
  </tr>
  <tr>
    <td>"We will ensure this does not happen again."</td>
    <td>"A visit preparation SOP will be created and implemented by [date]. The SOP will include a pre-visit checklist covering IMP dispensing, required assessments, and window verification. CRA to confirm SOP is in place at next monitoring visit."</td>
    <td>Addresses the systemic gap; verifiable by CRA</td>
  </tr>
</table>
<hr/>

<h2>CAPA Verification and Closure</h2>
<p>A CAPA is not closed until there is evidence that the actions were implemented AND that they were effective. The CRA is responsible for verifying CAPA effectiveness at subsequent monitoring visits:</p>
<ul>
  <li>Evidence of retraining: Training Log signatures, meeting minutes, attendance records</li>
  <li>Evidence of new process: SOPs, checklists, templates in use</li>
  <li>Evidence of no recurrence: Review subsequent visits and data entries for the same error type</li>
  <li>If the deviation recurs after CAPA closure, the CAPA must be re-opened and the root cause re-analysed</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ CAPA Documentation Requirements</div>
  <p>For each CAPA, the following must be documented:</p>
  <ul>
    <li>The deviation or issue that triggered the CAPA</li>
    <li>Root cause identified</li>
    <li>Corrective action — specific, with responsible person and deadline</li>
    <li>Preventive action — specific, with responsible person and deadline</li>
    <li>Evidence that corrective action was completed (date, signature, document reference)</li>
    <li>Evidence that preventive action was completed</li>
    <li>Verification that the CAPA resolved the issue (CRA confirmation at follow-up visit)</li>
    <li>Date of CAPA closure and authorising signature</li>
  </ul>
</div>
`;

// ══════════════════════════════════════════════════════════════
// MODULE 5 — Prevention Strategies, Quality Systems & Final Assessment
// ══════════════════════════════════════════════════════════════

CONTENT.mod5video = `
<h1>Prevention Strategies & Quality Systems for Deviation Management</h1>
<p>The best deviation management is deviation prevention. While no clinical trial site can guarantee zero deviations, sites that implement robust quality systems, conduct proactive risk assessments, and build a culture of quality consistently achieve lower deviation rates and recover more effectively when deviations do occur.</p>

<h2>Why Deviations Occur: Common Root Causes</h2>
<p>Understanding why deviations commonly occur is the first step to preventing them. The most frequent root causes identified across clinical trial sites include:</p>
<table>
  <tr><th>Category</th><th>Common Root Causes</th></tr>
  <tr><td><strong>Staff factors</strong></td><td>Inadequate training; high staff turnover; fatigue; unclear responsibility; not following SOPs</td></tr>
  <tr><td><strong>Process factors</strong></td><td>No checklist or SOP for the task; process too complex; poor visit preparation</td></tr>
  <tr><td><strong>Communication factors</strong></td><td>Protocol amendments not communicated to all site staff; sponsor instructions unclear</td></tr>
  <tr><td><strong>System factors</strong></td><td>EDC usability issues; IRT system errors; scheduling system not flagging visit windows</td></tr>
  <tr><td><strong>Protocol factors</strong></td><td>Complex or ambiguous eligibility criteria; narrow visit windows; burdensome assessment schedule</td></tr>
  <tr><td><strong>Resource factors</strong></td><td>Insufficient staff for number of participants; pharmacy or lab availability issues</td></tr>
</table>

<blockquote>💡 <strong>Watch the video above</strong> for practical strategies to prevent protocol deviations — including proactive risk assessment, effective site training, and the role of the Quality Management System in creating a culture of quality at site level.</blockquote>

<div class="info-box">
  <div class="info-box-title">📌 Proactive vs Reactive Deviation Management</div>
  <p><strong>Reactive</strong> deviation management responds to deviations after they occur. <strong>Proactive</strong> management identifies risks before they materialise into deviations. The best sites do both — and use their deviation data to drive continuous improvement in their trial processes.</p>
</div>
`;

CONTENT.mod5text = `
<h1>Quality Systems, Audit, Inspection & Course Summary</h1>
<hr/>

<h2>The Quality Management System (QMS) and Deviation Prevention</h2>
<p>A <strong>Quality Management System (QMS)</strong> is a planned and systematic set of processes, guidelines, and tools designed to maintain or improve the quality of clinical trial conduct. It provides the infrastructure within which deviation prevention operates.</p>
<p>For deviation prevention specifically, the QMS includes:</p>
<ul>
  <li><strong>SOPs (Standard Operating Procedures)</strong> — step-by-step instructions for all trial activities (consent process, IMP dispensing, SAE reporting, deviation management)</li>
  <li><strong>Checklists and Templates</strong> — eligibility screening checklists, visit preparation checklists, monitoring checklists</li>
  <li><strong>Training Programme</strong> — structured protocol training at SIV; ongoing training for new staff; refresher training triggered by CAPAs</li>
  <li><strong>Risk Assessment</strong> — pre-trial and ongoing identification of activities or participant populations at highest risk of deviation</li>
  <li><strong>Data Quality Reviews</strong> — regular review of EDC data for patterns suggesting systematic deviations</li>
</ul>
<hr/>

<h2>Quality Issues and Data Integrity</h2>
<p>Data quality issues in clinical trials can be caused by a variety of behaviours including fraud, misconduct, intentional or unintentional noncompliance, and significant carelessness. Regardless of how these behaviours are defined, they may compromise the validity of the study results.</p>
<p>Reliable study results and quality data are needed to evaluate products for marketing approval and for decisions that are made on the use of medicine. <strong>Early detection of data quality issues is important</strong> so that corrective actions taken can be implemented during the conduct of the trial, recurrence can be prevented, and data quality can be preserved.</p>
<hr/>

<h2>Audit vs Inspection</h2>
<p>Both audits and inspections examine protocol deviation records, CAPA documentation, and site quality systems — but they differ in who conducts them and their purpose:</p>
<table>
  <tr><th>Feature</th><th>Audit</th><th>Inspection</th></tr>
  <tr><td><strong>Conducted by</strong></td><td>Independent auditors appointed by the Sponsor/CRO</td><td>MHRA inspectors (Regulatory Authority)</td></tr>
  <tr><td><strong>Purpose</strong></td><td>Assess and assure reliability and integrity of trial systems against written standards (SOPs, protocol, GCP)</td><td>Ensure compliance with GCP, UK CTR 2025, and applicable regulatory requirements</td></tr>
  <tr><td><strong>Trigger</strong></td><td>Planned (routine) or for-cause (following serious concern)</td><td>Routine, triggered by serious breach, or following whistleblower/other reports</td></tr>
  <tr><td><strong>Findings classified as</strong></td><td>Minor / Major / Critical</td><td>Minor / Major / Critical</td></tr>
  <tr><td><strong>Outcome for Critical finding</strong></td><td>Immediate action; CAPA plan within 14 days; possible trial suspension</td><td>MHRA enforcement action; possible suspension; criminal prosecution for fraud</td></tr>
</table>
<hr/>

<h2>Course Summary: Protocol Deviation Management</h2>
<div class="key-points">
  <div class="key-points-title">✅ Key Points — All Modules</div>

  <h3>Module 1 — Understanding Deviations</h3>
  <ul>
    <li>A protocol deviation is any departure from the approved protocol — intent is irrelevant</li>
    <li>All deviations are noncompliance; not all noncompliance is a protocol deviation</li>
    <li>Common deviation sources: eligibility criteria, visit windows, consent, IMP dosing, prohibited medications</li>
    <li>Full range of trial events: AE, SAE, SAR, SUSAR, AESI, Serious Breach, Pregnancy, PD, NC, CAPA, AI, Query, Audit, Inspection</li>
  </ul>

  <h3>Module 2 — Classification</h3>
  <ul>
    <li>Minor: no increase in risk, no data integrity impact</li>
    <li>Major: increases risk OR significantly affects rights/safety/welfare/data integrity</li>
    <li>Serious Breach: likely to significantly affect safety/mental integrity/scientific value → MHRA 7-day notification</li>
    <li>When in doubt, classify upward; context matters (therapeutic area, frequency, participant vulnerability)</li>
  </ul>

  <h3>Module 3 — Documentation &amp; Reporting</h3>
  <ul>
    <li>PD Log: updated contemporaneously; must include occurrence date, detection date, classification, CAPA reference</li>
    <li>PI must sign and date every PD log entry</li>
    <li>Minor PD: document and CAPA; no direct MHRA reporting</li>
    <li>Major PD: document, notify sponsor promptly, CAPA required; included in DSUR</li>
    <li>Serious Breach: MHRA written notification within 7 days of Sponsor awareness</li>
    <li>Action Items (AIs): closed in timely manner by CRA/site; count as CRA metrics</li>
    <li>Queries: resolved in EDC by site; count as CRA metrics</li>
  </ul>

  <h3>Module 4 — CAPA</h3>
  <ul>
    <li>6-step CAPA: Identify → Root Cause → Corrective Action → Preventive Action → Document → Verify</li>
    <li>Root Cause Analysis tools: 5 Whys, Fishbone, ALCOA-CCEA framework</li>
    <li>Effective CAPA = SMART actions: Specific, Measurable, Achievable, Relevant, Time-bound</li>
    <li>CAPA closed only when evidence of implementation AND no recurrence</li>
    <li>Recurring deviation after closed CAPA = CAPA must be re-opened</li>
  </ul>

  <h3>Module 5 — Prevention &amp; Quality Systems</h3>
  <ul>
    <li>Prevention > reaction: SOPs, checklists, structured training, risk assessment</li>
    <li>Common root causes: staff training gaps, no checklists/SOPs, communication failures, complex protocols</li>
    <li>Data quality issues: early detection through central monitoring and regular data review</li>
    <li>Audit (sponsor): assesses reliability; findings Minor/Major/Critical</li>
    <li>Inspection (MHRA): enforces compliance; triggered by serious breach or routine programme</li>
    <li>QMS = SOPs + Templates + Training + Risk Assessment + Data Quality Review</li>
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
    title: 'Module 1: Understanding Protocol Deviations — Definitions & Framework',
    description: 'What is a protocol deviation; how deviations differ from noncompliance; protocol sections that commonly generate deviations; full range of trial events; the protocol as binding standard.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'Protocol Deviations: What They Are and Why They Matter',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module1, videoDurationMinutes: 16,
        isPreview: true, order: 1, content: CONTENT.mod1video,
      },
      {
        title: 'Types of Trial Events: Deviations, Noncompliance & the Full Event Framework',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod1text,
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'A protocol deviation is best defined as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A protocol deviation is any departure from the approved protocol — whether intentional or unintentional. Intent is irrelevant to classification.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Any departure from the approved clinical trial protocol, intentional or unintentional', isCorrect: true, order: 1 },
            { optionText: 'Only deliberate changes to the protocol made without approval', isCorrect: false, order: 2 },
            { optionText: 'Any adverse event reported during the trial', isCorrect: false, order: 3 },
            { optionText: 'Any departure that directly harms a participant', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following protocol sections most commonly give rise to protocol deviations?',
          questionType: 'MULTI_SELECT',
          explanation: 'Common deviation sources include inclusion/exclusion criteria (eligibility), visit windows (timing), IMP dosing schedule, and informed consent requirements.',
          marks: 2, order: 2,
          options: [
            { optionText: 'Inclusion and exclusion criteria', isCorrect: true, order: 1 },
            { optionText: 'Visit windows and scheduling', isCorrect: true, order: 2 },
            { optionText: 'IMP dosing schedule', isCorrect: true, order: 3 },
            { optionText: 'Informed consent process and timing', isCorrect: true, order: 4 },
            { optionText: 'The study title and sponsor name', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Is it possible for an event to be both a protocol deviation AND a GCP noncompliance?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Yes — for example, enrolling an ineligible participant is both a protocol deviation (departure from the protocol\'s eligibility criteria) and a GCP noncompliance (failure to comply with ICH GCP requirements for participant protection).',
          marks: 1, order: 3,
          options: [
            { optionText: 'Yes — for example, enrolling an ineligible participant is both a protocol deviation and GCP noncompliance', isCorrect: true, order: 1 },
            { optionText: 'No — protocol deviations and GCP noncompliance are mutually exclusive categories', isCorrect: false, order: 2 },
            { optionText: 'Only if the event causes direct harm to the participant', isCorrect: false, order: 3 },
            { optionText: 'Only in Phase 3 trials where stricter rules apply', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Serious Breach must be reported by the Sponsor to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach — one that is likely to affect the safety, physical or mental integrity of participants, or the scientific value of the trial — must be reported to the MHRA in writing within 7 days of the Sponsor becoming aware.',
          marks: 1, order: 4,
          options: [
            { optionText: '7 calendar days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '15 calendar days of the Sponsor becoming aware', isCorrect: false, order: 2 },
            { optionText: '24 hours of site detection', isCorrect: false, order: 3 },
            { optionText: '30 days in the next DSUR', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are types of events that must be monitored and managed in clinical trials?',
          questionType: 'MULTI_SELECT',
          explanation: 'The full range includes: AE, SAE, SAR, SUSAR, AESI, Serious Breach, Pregnancy, Protocol Deviation, Noncompliance, Quality Issue, CAPA, Action Item, Query, Audit, and Inspection.',
          marks: 2, order: 5,
          options: [
            { optionText: 'Protocol Deviation (PD)', isCorrect: true, order: 1 },
            { optionText: 'Noncompliance (NC)', isCorrect: true, order: 2 },
            { optionText: 'CAPA (Corrective and Preventive Action)', isCorrect: true, order: 3 },
            { optionText: 'Action Item (AI)', isCorrect: true, order: 4 },
            { optionText: 'Annual staff appraisal review', isCorrect: false, order: 5 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 2
  // ═══════════════════════════════════════
  {
    title: 'Module 2: Classifying Deviations — Minor, Major & Serious Breach',
    description: 'Three-level classification system; contextual factors affecting classification; 10 worked examples; decision framework (4-step); serious breach threshold; when to classify upward.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'Classification Framework: Minor, Major & Serious Breach',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module2, videoDurationMinutes: 18,
        isPreview: false, order: 1, content: CONTENT.mod2video,
      },
      {
        title: 'Worked Classification Examples & the Decision Framework',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod2text,
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'A Major / Important Protocol Deviation is defined as one that:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A major deviation increases risk or decreases benefit to the participant, OR significantly affects the subject\'s rights, safety, welfare, and/or the integrity of the research data.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Increases risk or decreases benefit, OR significantly affects subject rights/safety/data integrity', isCorrect: true, order: 1 },
            { optionText: 'Occurs more than once at the same site', isCorrect: false, order: 2 },
            { optionText: 'Must always be reported to the MHRA within 7 days', isCorrect: false, order: 3 },
            { optionText: 'Only involves IMP administration errors', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A blood sample for pharmacokinetic (PK) assessment is taken 45 minutes late when the window is ±15 minutes. How should this be classified?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'PK sampling windows are scientifically critical — the data cannot be validly used in the primary analysis if samples are taken outside the window. This significantly affects data integrity, making it a Major PD.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Major Protocol Deviation — PK timing is critical; data integrity is significantly affected', isCorrect: true, order: 1 },
            { optionText: 'Minor Protocol Deviation — no patient harm occurred', isCorrect: false, order: 2 },
            { optionText: 'Serious Breach — sampling outside the window always requires MHRA notification', isCorrect: false, order: 3 },
            { optionText: 'Not a deviation — a 45-minute delay is clinically insignificant', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'When classifying a borderline deviation, the correct approach is to:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"When in doubt, classify upward" is the principle. It is always better to over-classify a deviation as major than to under-classify it as minor to avoid reporting obligations. Downgrading to avoid reporting is itself a quality failure.',
          marks: 1, order: 3,
          options: [
            { optionText: 'Classify upward (e.g. major rather than minor) — downgrading to avoid reporting is a quality failure', isCorrect: true, order: 1 },
            { optionText: 'Always classify as minor unless the sponsor specifies otherwise', isCorrect: false, order: 2 },
            { optionText: 'Leave it unclassified pending the next monitoring visit', isCorrect: false, order: 3 },
            { optionText: 'Classify based on whether the participant was harmed, not on protocol impact', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Informed consent was obtained and signed the day AFTER a physical examination was performed on a trial participant. This deviation is classified as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Any trial procedure performed before informed consent is obtained is a clear GCP violation. A physical examination before consent is a Major PD at minimum — and depending on context, it could meet the threshold for a Serious Breach (breach of participant\'s right to voluntary participation).',
          marks: 1, order: 4,
          options: [
            { optionText: 'Major PD, potentially a Serious Breach — consent must precede all procedures', isCorrect: true, order: 1 },
            { optionText: 'Minor PD — the participant was not harmed by the examination', isCorrect: false, order: 2 },
            { optionText: 'Not a deviation — a physical examination is a non-invasive procedure', isCorrect: false, order: 3 },
            { optionText: 'Minor PD — the consent was still obtained before IMP administration', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following would most likely constitute a Serious Breach requiring MHRA 7-day notification?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Systematic failure to obtain informed consent from multiple participants affects the safety, mental integrity, and rights of all those participants. It is likely to significantly affect the scientific value of the trial. This meets the Serious Breach threshold.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Systematic failure to obtain informed consent from multiple participants across multiple visits', isCorrect: true, order: 1 },
            { optionText: 'A single blood sample taken 2 hours outside the visit window', isCorrect: false, order: 2 },
            { optionText: "One participant's visit conducted 3 days outside the ±7-day window", isCorrect: false, order: 3 },
            { optionText: 'A minor typo corrected in the Protocol Deviation Log', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 3
  // ═══════════════════════════════════════
  {
    title: 'Module 3: Documenting & Reporting Protocol Deviations',
    description: 'Protocol Deviation Log requirements; retrospective deviations; reporting pathways (minor/major/serious breach); Action Items and Queries; communicating deviations to participants; ALCOA-CCEA in deviation documentation.',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'The Protocol Deviation Log: Completing It Correctly',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module3, videoDurationMinutes: 15,
        isPreview: false, order: 1, content: CONTENT.mod3video,
      },
      {
        title: 'Reporting Pathways, Action Items, Queries & ALCOA-CCEA',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod3text,
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'The Protocol Deviation Log must be signed and dated by:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Protocol Deviation Log must be acknowledged, signed, and dated by the PI for each entry. The PI\'s signature confirms they are aware of and accountable for each deviation at their site.',
          marks: 1, order: 1,
          options: [
            { optionText: 'The Principal Investigator (PI) — required for each entry', isCorrect: true, order: 1 },
            { optionText: 'The CRA — signed at the monitoring visit only', isCorrect: false, order: 2 },
            { optionText: 'The sponsor medical monitor only', isCorrect: false, order: 3 },
            { optionText: 'Only the site staff member who identified the deviation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'When a protocol deviation is discovered retrospectively (e.g. during a monitoring visit), the deviation log entry should include:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'When a deviation is discovered retrospectively, two dates must be recorded: the date the deviation occurred and the date it was detected. The CAPA starts from the detection date.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Both the date the deviation occurred AND the date it was detected', isCorrect: true, order: 1 },
            { optionText: 'Only the date of the monitoring visit when it was found', isCorrect: false, order: 2 },
            { optionText: 'Only the date the deviation occurred — detection date is not relevant', isCorrect: false, order: 3 },
            { optionText: 'The current date only, as the original occurrence cannot be verified', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An Action Item (AI) in clinical trial monitoring is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An Action Item is a formal task created by the CRA (usually after a monitoring visit during report writing) requiring action by the CRA or site personnel to resolve a finding. AIs must be closed once resolved and count as CRA performance metrics.',
          marks: 1, order: 3,
          options: [
            { optionText: 'A task created by the CRA requiring action by site or CRA to resolve a monitoring finding', isCorrect: true, order: 1 },
            { optionText: 'A query raised in the EDC about incorrect data entry', isCorrect: false, order: 2 },
            { optionText: 'A MHRA enforcement notice requiring immediate site closure', isCorrect: false, order: 3 },
            { optionText: 'An instruction from the sponsor to re-train site staff', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a Minor Protocol Deviation, what is the MHRA reporting requirement?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Minor protocol deviations do not require individual MHRA notification. They are documented in the PD log, managed with CAPA if recurring, and included in aggregate deviation summaries in the DSUR/Annual Safety Report.',
          marks: 1, order: 4,
          options: [
            { optionText: 'No direct MHRA notification required; included in aggregate DSUR summary', isCorrect: true, order: 1 },
            { optionText: 'Must be reported to MHRA within 15 days', isCorrect: false, order: 2 },
            { optionText: 'Must be reported to MHRA within 7 days', isCorrect: false, order: 3 },
            { optionText: 'Must be reported to MHRA immediately at time of detection', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Logging a protocol deviation weeks after it occurred violates which ALCOA-CCEA attribute?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Contemporaneous" means data must be recorded at the time of the observation or event. Logging a deviation retrospectively weeks later violates the Contemporaneous attribute.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Contemporaneous — data must be recorded at the time of the event, not retrospectively', isCorrect: true, order: 1 },
            { optionText: 'Attributable — it is unclear who recorded the deviation', isCorrect: false, order: 2 },
            { optionText: 'Original — the first record has been lost', isCorrect: false, order: 3 },
            { optionText: 'Available — the deviation log is not accessible', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 4
  // ═══════════════════════════════════════
  {
    title: 'Module 4: CAPA — Root Cause Analysis & Preventive Action',
    description: 'CAPA definition and 6-step process; difference between immediate action and CAPA; root cause analysis techniques (5 Whys, Fishbone, ALCOA-CCEA); SMART CAPA writing; weak vs strong examples; CAPA verification and closure.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'CAPA: The 6-Step Process and Why It Matters',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module4, videoDurationMinutes: 17,
        isPreview: false, order: 1, content: CONTENT.mod4video,
      },
      {
        title: 'Root Cause Analysis, SMART CAPA Writing & Verification',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod4text,
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check',
      instructions: 'Answer all questions. Pass mark: 70%.',
      passMarkPercentage: 70, timeLimitMinutes: 10, maxAttempts: 3, randomizeQuestions: false,
      questions: [
        {
          questionText: 'What distinguishes a Corrective Action from a Preventive Action in a CAPA plan?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Corrective Action addresses the specific problem that occurred (fixes what went wrong). Preventive Action addresses the systemic vulnerability to stop a similar problem occurring in future — it is forward-looking.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Corrective Action fixes the current problem; Preventive Action stops a similar problem occurring in future', isCorrect: true, order: 1 },
            { optionText: 'They are interchangeable terms for the same activity', isCorrect: false, order: 2 },
            { optionText: 'Corrective Action is taken by the CRA; Preventive Action is taken by the sponsor', isCorrect: false, order: 3 },
            { optionText: 'Preventive Action is only required for Serious Breaches', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The "5 Whys" root cause analysis technique involves:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The 5 Whys involves repeatedly asking "why did this happen?" — typically five times — until the underlying root cause is identified, rather than stopping at the immediate surface-level cause.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Repeatedly asking "why?" until the underlying root cause is identified', isCorrect: true, order: 1 },
            { optionText: 'Listing five possible causes and selecting the most likely', isCorrect: false, order: 2 },
            { optionText: 'Asking five staff members for their opinion on the cause', isCorrect: false, order: 3 },
            { optionText: 'Requiring five approvals before implementing a CAPA', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following is an example of a STRONG (effective) CAPA action?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An effective CAPA is SMART: Specific, Measurable, Achievable, Relevant, Time-bound. "All consenting staff will receive a 30-minute GCP consent refresher by [date], with Training Log sign-off" is specific, time-bound, and generates auditable evidence.',
          marks: 1, order: 3,
          options: [
            { optionText: '"All consenting staff will receive a 30-minute GCP consent refresher by [date], with Training Log sign-off"', isCorrect: true, order: 1 },
            { optionText: '"Staff will be retrained to avoid this happening again"', isCorrect: false, order: 2 },
            { optionText: '"We will ensure this does not happen again"', isCorrect: false, order: 3 },
            { optionText: '"The team is aware of the issue and will be more careful"', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A CAPA can be considered closed when:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A CAPA is only closed when there is evidence that the actions were implemented AND that they were effective (no recurrence). The CRA verifies effectiveness at subsequent monitoring visits.',
          marks: 1, order: 4,
          options: [
            { optionText: 'There is evidence that actions were implemented AND there is no recurrence of the deviation', isCorrect: true, order: 1 },
            { optionText: 'The CAPA plan document has been signed and filed in the ISF', isCorrect: false, order: 2 },
            { optionText: 'Thirty days have elapsed since the CAPA was written', isCorrect: false, order: 3 },
            { optionText: 'The CRA has reviewed the CAPA plan at the next monitoring visit', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'If a protocol deviation recurs after a CAPA has been closed, the correct response is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Recurrence after CAPA closure means the original root cause was not properly addressed. The CAPA must be re-opened and a new, deeper root cause analysis conducted.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Re-open the CAPA and conduct a new, deeper root cause analysis', isCorrect: true, order: 1 },
            { optionText: 'Document the recurrence as a new separate deviation only; the closed CAPA is complete', isCorrect: false, order: 2 },
            { optionText: 'Escalate directly to MHRA as the original CAPA failed', isCorrect: false, order: 3 },
            { optionText: 'Close the new deviation without a CAPA as it is already covered', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════
  // MODULE 5
  // ═══════════════════════════════════════
  {
    title: 'Module 5: Prevention Strategies, Quality Systems & Final Assessment',
    description: 'Common root causes of deviations; proactive vs reactive management; QMS components for deviation prevention; data quality issues; audit vs inspection; 15-question final assessment.',
    order: 5, isMandatory: true,
    lessons: [
      {
        title: 'Prevention Strategies: Building a Quality Culture at Site Level',
        lessonType: 'VIDEO', videoUrl: VIDEOS.module5, videoDurationMinutes: 15,
        isPreview: false, order: 1, content: CONTENT.mod5video,
      },
      {
        title: 'Quality Systems, Audit, Inspection & Course Summary',
        lessonType: 'TEXT', isPreview: false, order: 2, content: CONTENT.mod5text,
      },
    ],
    quiz: {
      title: 'Final Assessment: Protocol Deviation Management',
      instructions: 'Answer all 15 questions. Pass mark: 70% (11/15). You have 3 attempts. Certificate issued automatically on passing.',
      passMarkPercentage: 70, timeLimitMinutes: 25, maxAttempts: 3, randomizeQuestions: true,
      questions: [
        {
          questionText: 'A protocol deviation is defined as:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A protocol deviation is any departure from the approved clinical trial protocol — whether intentional or unintentional. Intent does not determine whether something is a deviation.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Any departure from the approved clinical trial protocol, whether intentional or unintentional', isCorrect: true, order: 1 },
            { optionText: 'Only deliberate changes made without prior regulatory approval', isCorrect: false, order: 2 },
            { optionText: 'Any adverse event that occurs during the trial', isCorrect: false, order: 3 },
            { optionText: 'Any departure from GCP that directly harms a participant', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which classification applies to a deviation that increases risk to a participant?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Major / Important Protocol Deviation is one that increases risk or decreases benefit to the participant, or significantly affects their rights, safety, welfare, or data integrity.',
          marks: 1, order: 2,
          options: [
            { optionText: 'Major / Important Protocol Deviation', isCorrect: true, order: 1 },
            { optionText: 'Minor Protocol Deviation', isCorrect: false, order: 2 },
            { optionText: 'Routine non-compliance', isCorrect: false, order: 3 },
            { optionText: 'Action Item only', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Serious Breach must be reported to the MHRA within:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Serious Breach must be reported to the MHRA in writing within 7 calendar days of the Sponsor becoming aware of it.',
          marks: 1, order: 3,
          options: [
            { optionText: '7 calendar days of the Sponsor becoming aware', isCorrect: true, order: 1 },
            { optionText: '15 calendar days of the Sponsor becoming aware', isCorrect: false, order: 2 },
            { optionText: '24 hours of site detection', isCorrect: false, order: 3 },
            { optionText: '30 days in the next Annual Safety Report', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Protocol Deviation Log must be acknowledged, signed, and dated by:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Protocol Deviation Log must be acknowledged, signed, and dated by the PI for each entry. This is a GCP requirement demonstrating PI accountability for all deviations at their site.',
          marks: 1, order: 4,
          options: [
            { optionText: 'The Principal Investigator (PI)', isCorrect: true, order: 1 },
            { optionText: 'The Clinical Research Associate (CRA) only', isCorrect: false, order: 2 },
            { optionText: 'Any delegated site staff member', isCorrect: false, order: 3 },
            { optionText: 'The sponsor medical monitor', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The 6 steps of the CAPA process in order are:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The CAPA process: 1) Identify the issue, 2) Identify the root cause, 3) Corrective Action, 4) Preventive Action, 5) Document actions were carried out, 6) Document that the issue was resolved.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Identify → Root Cause → Corrective Action → Preventive Action → Document actions → Verify resolution', isCorrect: true, order: 1 },
            { optionText: 'Report → Classify → CAPA → Close → Archive → Verify', isCorrect: false, order: 2 },
            { optionText: 'Detect → Notify MHRA → Classify → Correct → Prevent → Sign', isCorrect: false, order: 3 },
            { optionText: 'Classify → Report → Train → Monitor → Close → Archive', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'When classifying a borderline protocol deviation, you should:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"When in doubt, classify upward." Under-classifying a borderline deviation to avoid reporting obligations is itself a quality failure. A sponsor medical monitor should review any borderline case.',
          marks: 1, order: 6,
          options: [
            { optionText: 'Classify upward (major rather than minor) — downgrading to avoid reporting is a quality failure', isCorrect: true, order: 1 },
            { optionText: 'Default to minor to reduce regulatory burden', isCorrect: false, order: 2 },
            { optionText: 'Leave it unclassified until the next monitoring visit', isCorrect: false, order: 3 },
            { optionText: 'Ask the participant to sign a waiver', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An Action Item (AI) in clinical trial monitoring must be:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Action Items must be closed once the need is resolved — there is a defined timeline for closure. AI closure rates count as part of CRA performance metrics.',
          marks: 1, order: 7,
          options: [
            { optionText: 'Closed once the need is resolved — AI closure rates count as CRA performance metrics', isCorrect: true, order: 1 },
            { optionText: 'Left open until the trial closes so they can be reviewed collectively', isCorrect: false, order: 2 },
            { optionText: 'Submitted to the MHRA within 30 days of the monitoring visit', isCorrect: false, order: 3 },
            { optionText: 'Only created for Serious Breaches', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a Minor Protocol Deviation, which of the following represents correct management?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Minor deviations are documented in the PD log, PI signs, CAPA implemented if recurring, and included in aggregate DSUR summaries. No individual MHRA notification is required.',
          marks: 1, order: 8,
          options: [
            { optionText: 'Document in PD log, PI signs, CAPA if recurring, included in DSUR aggregate summary', isCorrect: true, order: 1 },
            { optionText: 'Report to MHRA within 7 days; PI signs; CAPA mandatory', isCorrect: false, order: 2 },
            { optionText: 'No documentation required; only verbal notification to CRA needed', isCorrect: false, order: 3 },
            { optionText: 'Immediately suspend enrolment at the site', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Logging a deviation weeks after it occurred violates which ALCOA-CCEA attribute?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: '"Contemporaneous" means data is recorded at the time of the observation. Logging a deviation retrospectively weeks later violates this attribute.',
          marks: 1, order: 9,
          options: [
            { optionText: 'Contemporaneous', isCorrect: true, order: 1 },
            { optionText: 'Attributable', isCorrect: false, order: 2 },
            { optionText: 'Enduring', isCorrect: false, order: 3 },
            { optionText: 'Original', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The difference between an Audit and an MHRA Inspection is:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An audit is conducted by sponsor-appointed independent auditors to assess reliability and integrity. An MHRA inspection is conducted by the regulatory authority to enforce compliance with GCP and UK CTR 2025.',
          marks: 1, order: 10,
          options: [
            { optionText: 'An audit is by sponsor-appointed auditors; an inspection is by MHRA (regulatory authority)', isCorrect: true, order: 1 },
            { optionText: 'They are the same process with different names', isCorrect: false, order: 2 },
            { optionText: 'An inspection is internal; an audit is external', isCorrect: false, order: 3 },
            { optionText: 'Audits only examine financial records; inspections only examine clinical data', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are common root causes of protocol deviations at clinical trial sites?',
          questionType: 'MULTI_SELECT',
          explanation: 'Common root causes include: inadequate staff training, high staff turnover, no checklists/SOPs, poor communication of protocol amendments, complex/narrow visit windows, and insufficient site resources.',
          marks: 2, order: 11,
          options: [
            { optionText: 'Inadequate or incomplete staff training', isCorrect: true, order: 1 },
            { optionText: 'No checklist or SOP for the trial activity', isCorrect: true, order: 2 },
            { optionText: 'Protocol amendments not communicated to all site staff', isCorrect: true, order: 3 },
            { optionText: 'Complex or ambiguous eligibility criteria', isCorrect: true, order: 4 },
            { optionText: 'The CRA visited the site too frequently', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'A study coordinator reports that a participant received the wrong IMP dose on one occasion and was not harmed. How should this be classified and managed?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An IMP administration error is a Major PD — it affects protocol compliance and data integrity and requires participant safety assessment. It does not automatically meet the Serious Breach threshold if it is a single isolated event without harm — but CAPA is mandatory.',
          marks: 1, order: 12,
          options: [
            { optionText: 'Major PD — document, assess participant safety, notify sponsor, implement CAPA', isCorrect: true, order: 1 },
            { optionText: 'Minor PD — no patient harm occurred so no significant action needed', isCorrect: false, order: 2 },
            { optionText: 'Immediate Serious Breach notification to MHRA required', isCorrect: false, order: 3 },
            { optionText: 'Not a deviation if the participant did not experience adverse effects', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Early detection of data quality issues in clinical trials is important because:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Early detection allows corrective actions to be implemented during the trial, prevents recurrence, and preserves data quality — all of which are necessary for a valid regulatory submission and participant safety.',
          marks: 1, order: 13,
          options: [
            { optionText: 'It allows corrective actions during the trial, prevents recurrence, and preserves data quality', isCorrect: true, order: 1 },
            { optionText: 'MHRA requires all quality issues to be reported within 24 hours of detection', isCorrect: false, order: 2 },
            { optionText: 'It reduces the need for monitoring visits from the CRA', isCorrect: false, order: 3 },
            { optionText: 'It allows the sponsor to conceal issues before database lock', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What must a Protocol Deviation Log entry include in addition to the description of the deviation?',
          questionType: 'MULTI_SELECT',
          explanation: 'A complete PD log entry must include: subject ID, protocol section violated, date deviation occurred, date detected, classification, immediate action taken, CAPA reference, and PI signature/date.',
          marks: 2, order: 14,
          options: [
            { optionText: 'Date the deviation occurred and date it was detected', isCorrect: true, order: 1 },
            { optionText: 'Protocol section violated', isCorrect: true, order: 2 },
            { optionText: 'Classification (minor/major/serious breach)', isCorrect: true, order: 3 },
            { optionText: 'PI signature and date', isCorrect: true, order: 4 },
            { optionText: 'The participant\'s full name and date of birth', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'Which of the following correctly describes the relationship between Noncompliance and Protocol Deviations?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'All protocol deviations are a form of noncompliance. However, noncompliance is broader — it includes GCP violations and regulatory failures that may not be protocol deviations. For example, a missing delegation log entry is noncompliance but not a protocol deviation.',
          marks: 1, order: 15,
          options: [
            { optionText: 'All protocol deviations are noncompliance; but not all noncompliance is a protocol deviation', isCorrect: true, order: 1 },
            { optionText: 'Protocol deviations and noncompliance are exactly the same thing', isCorrect: false, order: 2 },
            { optionText: 'Noncompliance is a subset of protocol deviations', isCorrect: false, order: 3 },
            { optionText: 'Noncompliance only applies to sponsor obligations; protocol deviations are site-only', isCorrect: false, order: 4 },
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
  console.log('  SEEDING: Protocol Deviation Management');
  console.log('  Course 10 | INTERMEDIATE | Investigator & Site Training');
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
    console.error(`❌ Course "${COURSE_SLUG}" not found. Run seed.js && seed-courses.js first.\n`);
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

  await prisma.course.update({
    where: { id: existing.id },
    data: {
      title: 'Protocol Deviation Management',
      subtitle: 'Identifying, classifying, reporting and preventing protocol deviations',
      description: 'Learn to identify and correctly classify protocol deviations and violations, complete deviation reports, implement CAPAs, and communicate with sponsors and ethics committees. Covers the full event framework (PD, NC, Serious Breach, CAPA, AI, Query, Audit, Inspection), the three-level classification system, ALCOA-CCEA in documentation, root cause analysis techniques, SMART CAPA writing, and prevention strategies using quality systems.',
      learningObjectives: [
        'Define protocol deviation and distinguish it from noncompliance and GCP violation',
        'Classify deviations correctly as minor, major, or serious breach using the decision framework',
        'Complete a compliant Protocol Deviation Log entry including all required fields',
        'Apply the correct reporting pathway for each deviation classification',
        'Conduct root cause analysis using the 5 Whys and other techniques',
        'Write effective SMART CAPA actions and verify their closure correctly',
        'Implement site-level prevention strategies using SOPs, checklists, and risk assessment',
      ],
      prerequisites: [
        'ICH GCP E6 fundamentals (Course 2 recommended)',
        'Principal Investigator Responsibilities (Course 9) or equivalent site experience',
      ],
      targetAudience: [
        'Principal Investigators and Sub-Investigators',
        'Research Nurses and Study Coordinators',
        'Clinical Research Associates (CRAs)',
        'Quality Assurance professionals in clinical research',
        'Sponsor and CRO regulatory and clinical operations teams',
      ],
      durationHours: 3,
      difficultyLevel: 'INTERMEDIATE',
      accreditation: 'GCP Aligned',
      price: 89.00,
      originalPrice: 129.00,
      isFeatured: false,
      isPublished: true,
      seoTitle: 'Protocol Deviation Management | GCP Clinical Trials | CAPA | UK Regulatory',
      seoDescription: 'Master protocol deviation identification, classification (minor/major/serious breach), documentation, CAPA root cause analysis, and prevention strategies. GCP Aligned. Certificate on completion.',
      tags: ['protocol-deviation', 'CAPA', 'GCP', 'serious-breach', 'noncompliance', 'root-cause', 'QMS', 'UK', 'clinical-trials', 'ISF', 'ALCOA', 'site-training'],
    },
  });
  console.log('✅ Course metadata updated.\n');

  const cert = await prisma.certificateTemplate.findUnique({ where: { courseId: existing.id } });
  if (!cert) {
    await prisma.certificateTemplate.create({
      data: {
        courseId: existing.id,
        heading: 'Certificate of Completion',
        bodyText: 'This certifies successful completion of Protocol Deviation Management — GCP Aligned | Issued by Clinical Research Nexus',
        signatureName: 'Clinical Research Nexus',
        signatureTitle: 'Continuing Professional Development',
      },
    });
    console.log('  🏅 Certificate template created.\n');
  }

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
  console.log('  Preview: /courses/protocol-deviation-management');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
