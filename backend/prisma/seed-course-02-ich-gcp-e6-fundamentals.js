/**
 * COURSE 02: ICH GCP E6(R3) Fundamentals for UK Clinical Research
 * ────────────────────────────────────────────────────────────────
 * Content stored as HTML strings (rendered via dangerouslySetInnerHTML).
 * Videos: MHRA official YouTube placeholder — replace with own recordings.
 * Run: node prisma/seed-course-02-ich-gcp-e6-fundamentals.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSE_SLUG = 'ich-gcp-e6-fundamentals-uk';

// ─────────────────────────────────────────────────────────
// VIDEO URL
// aGYMB4TkJYM = "Implementing the new UK Clinical Trials Regulations Webinar"
// Source: MHRA official YouTube channel (MHRAgovuk) — verified live.
// Used as placeholder across all video lessons until own recordings are ready.
// ─────────────────────────────────────────────────────────
const COURSE_VIDEO = 'https://www.youtube.com/watch?v=aGYMB4TkJYM';

// ─────────────────────────────────────────────────────────
// HTML LESSON CONTENT
// ─────────────────────────────────────────────────────────

const CONTENT = {};

// ── MODULE 1, LESSON 1: Welcome & What is ICH GCP? ───────
CONTENT.welcomeGcp = `
<h1>Welcome &amp; What is ICH GCP?</h1>
<p>Welcome to <strong>ICH GCP E6(R3) Fundamentals for UK Clinical Research</strong>. This course gives you a thorough grounding in the principles and practical requirements of Good Clinical Practice as defined by the International Council for Harmonisation — with particular emphasis on how GCP operates in the United Kingdom under MHRA oversight.</p>

<h2>What Is the International Council for Harmonisation (ICH)?</h2>
<p>The <strong>International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use (ICH)</strong> is a unique global initiative that brings together the regulatory authorities and pharmaceutical industry of Europe, Japan, and the United States — and increasingly other regions — to discuss scientific and technical aspects of drug registration.</p>
<p>Founded in 1990, ICH's mission is to achieve greater harmonisation worldwide to ensure that safe, effective, and high-quality medicines are developed and registered in the most resource-efficient manner. When regulatory requirements are aligned across major markets, a drug company does not need to repeat clinical trials in every country — reducing cost, time, and the number of patients exposed to experimental medicines unnecessarily.</p>

<div class="info-box">
  <div class="info-box-title">📌 ICH Members</div>
  <p>ICH founding members include: the US FDA, the European Medicines Agency (EMA), the Japanese PMDA, the European Federation of Pharmaceutical Industries and Associations (EFPIA), PhRMA (US industry), and JPMA (Japanese industry). The MHRA, as an ICH Regulatory Member since 2023, participates independently from the EMA post-Brexit.</p>
</div>

<h2>What Is Good Clinical Practice (GCP)?</h2>
<p><strong>Good Clinical Practice (GCP)</strong> is an international ethical and scientific quality standard for designing, conducting, recording, and reporting clinical trials that involve human subjects. Compliance with GCP provides public assurance that the rights, safety, and wellbeing of trial subjects are protected, and that clinical trial data are credible.</p>
<p>GCP is not a single document — it is a framework built from multiple ICH guidelines, regional regulations, and national legislation. In the UK, GCP obligations are embedded in the Medicines for Human Use (Clinical Trials) Regulations 2004 (as amended) and will be updated by the upcoming UK Clinical Trials Regulations (expected April 2026).</p>

<h2>The Ethical Foundations of GCP</h2>
<p>GCP did not emerge from bureaucracy. It emerged from tragedy. The ethical principles underlying GCP grew directly from historical abuses in human experimentation:</p>

<h3>The Nuremberg Code (1947)</h3>
<p>Following the Nuremberg Doctors' Trial, in which Nazi physicians were prosecuted for conducting horrific experiments on concentration camp prisoners without consent, the Nuremberg Code was established. Its ten principles represent the first international standard for ethical human experimentation. The most fundamental: <em>the voluntary consent of the human subject is absolutely essential.</em></p>

<h3>The Declaration of Helsinki (1964)</h3>
<p>Developed by the <strong>World Medical Association (WMA)</strong>, the Declaration of Helsinki extended the Nuremberg Code principles specifically to medical research. It introduced the concept of independent ethics committee review, the distinction between therapeutic and non-therapeutic research, and the protection of vulnerable populations. It has been revised multiple times — the current version dates from 2013 (with a 2024 update under consideration). GCP's ethical principles are directly rooted in the Declaration of Helsinki.</p>

<h3>The Belmont Report (1979)</h3>
<p>Published by the US National Commission for the Protection of Human Subjects, the Belmont Report articulated three core ethical principles for human subjects research:</p>
<ul>
  <li><strong>Respect for Persons</strong> — individuals should be treated as autonomous agents; those with diminished autonomy are entitled to protection</li>
  <li><strong>Beneficence</strong> — researchers must maximise benefits and minimise harms</li>
  <li><strong>Justice</strong> — the burdens and benefits of research should be fairly distributed</li>
</ul>
<p>These three principles remain the philosophical backbone of modern GCP.</p>

<h2>The History of ICH E6: From R1 to R3</h2>
<table>
  <tr><th>Version</th><th>Year</th><th>Key Development</th></tr>
  <tr><td><strong>E6(R1)</strong></td><td>1996</td><td>First harmonised GCP guideline. Defined roles of Sponsor, Investigator, and IRB/IEC. Established the 13 GCP principles. Became the foundation for GCP worldwide.</td></tr>
  <tr><td><strong>E6(R2)</strong></td><td>2016</td><td>Addendum to R1. Introduced risk-based monitoring (RBM) and proportionate approaches. Addressed electronic systems, audit trails, and computerised systems validation. Reflected the growth of large, complex, multi-site trials.</td></tr>
  <tr><td><strong>E6(R3)</strong></td><td>2025</td><td>Full revision (not merely an addendum). Reorganised into a principles-based framework. Introduced Quality by Design (QbD), Risk-Based Quality Management (RBQM), and explicit focus on critical data and processes. Addressed decentralised trial elements and digital health technologies. Reduced prescriptive requirements, increasing flexibility while strengthening accountability.</td></tr>
</table>

<blockquote>💡 <strong>Why R3 matters now</strong>: ICH E6(R3) entered into force in 2025 and is now the operative global GCP standard. The MHRA and all major regulatory agencies expect compliance with R3 for new trial applications. This course is aligned to E6(R3) throughout.</blockquote>

<h2>What This Course Covers</h2>
<ol>
  <li>The 13 principles of ICH GCP E6(R3) and how to apply them</li>
  <li>Roles and responsibilities of the Sponsor, Investigator, and CRO</li>
  <li>The informed consent process and special consent situations</li>
  <li>Essential documents, the Trial Master File, and document retention</li>
  <li>GCP inspections by the MHRA and how to prepare</li>
  <li>Risk-Based Quality Management — the new E6(R3) approach</li>
  <li>Applying GCP in the post-Brexit UK regulatory context</li>
</ol>
`;

// ── MODULE 1, LESSON 2: The 13 Principles of ICH GCP E6(R3) ──
CONTENT.thirteenPrinciples = `
<h1>The 13 Principles of ICH GCP E6(R3)</h1>
<p>At the heart of every ICH GCP guideline — from R1 in 1996 through to R3 in 2025 — lies a set of <strong>13 foundational principles</strong>. These are not merely aspirational statements; they are the ethical and operational bedrock from which every GCP requirement flows. Regulatory inspectors assess compliance with GCP through the lens of these principles.</p>
<p>In E6(R3), the principles have been refined and modernised, with greater emphasis on quality systems, proportionate oversight, and the use of technology. However, the ethical core established in R1 — participant protection and data integrity — remains unchanged.</p>
<hr/>

<h2>The 13 GCP Principles: Complete Reference</h2>

<table>
  <tr><th>#</th><th>Principle</th><th>Practical Meaning</th></tr>
  <tr>
    <td><strong>1</strong></td>
    <td>Trials shall be conducted in accordance with the ethical principles that have their origin in the Declaration of Helsinki, and that are consistent with GCP and the applicable regulatory requirement(s).</td>
    <td>Every trial must meet the highest ethical standard — not just legal minimum compliance. The Declaration of Helsinki (2013) is the primary ethical reference.</td>
  </tr>
  <tr>
    <td><strong>2</strong></td>
    <td>Before a trial is initiated, foreseeable risks and inconveniences should be weighed against the anticipated benefit for the individual trial subject and society.</td>
    <td>The Sponsor and Investigator must conduct and document a benefit-risk assessment before the trial begins, and continue to reassess it throughout.</td>
  </tr>
  <tr>
    <td><strong>3</strong></td>
    <td>The rights, safety, and wellbeing of the trial subjects are the most important considerations and should prevail over interests of science and society.</td>
    <td>Patient safety always takes priority. No scientific objective or commercial pressure justifies compromising participant welfare. This principle underpins every safety reporting obligation.</td>
  </tr>
  <tr>
    <td><strong>4</strong></td>
    <td>The available nonclinical and clinical information on an investigational product should be adequate to support the proposed clinical trial.</td>
    <td>The Investigator's Brochure (IB) must contain sufficient preclinical and clinical data to justify exposing trial subjects to the IMP. Insufficient data = inadequate basis for trial conduct.</td>
  </tr>
  <tr>
    <td><strong>5</strong></td>
    <td>Clinical trials should be scientifically sound, and described in a clear, detailed protocol.</td>
    <td>The protocol must be written to a standard that enables consistent, reproducible execution across all sites. Vague or ambiguous protocols directly cause deviations.</td>
  </tr>
  <tr>
    <td><strong>6</strong></td>
    <td>A trial should be conducted in compliance with the protocol that has received prior institutional review board (IRB)/independent ethics committee (IEC) approval/favourable opinion.</td>
    <td>Sites must not begin until favourable ethics opinion is granted. Any substantive change to the protocol requires an amendment, which must be approved by the ethics committee before implementation.</td>
  </tr>
  <tr>
    <td><strong>7</strong></td>
    <td>The medical care given to, and medical decisions made on behalf of, subjects should always be the responsibility of a qualified physician or, when appropriate, of a qualified dentist.</td>
    <td>The Principal Investigator must be a qualified physician (or dentist where relevant). Non-physician study staff (nurses, coordinators) cannot make independent medical decisions about trial participants.</td>
  </tr>
  <tr>
    <td><strong>8</strong></td>
    <td>Each individual involved in conducting a trial should be qualified by education, training, and experience to perform his or her respective task(s).</td>
    <td>Every delegated task on the Delegation Log must be performed by someone with the documented training and competency to do it. CV, GCP certificate, and study-specific training records must be maintained.</td>
  </tr>
  <tr>
    <td><strong>9</strong></td>
    <td>Freely given informed consent should be obtained from every subject prior to clinical trial participation.</td>
    <td>Consent must be voluntary, informed, documented, and obtained before any trial-specific procedure. This principle gives rise to the entire regulatory framework around informed consent documentation, the Participant Information Sheet, and re-consent processes.</td>
  </tr>
  <tr>
    <td><strong>10</strong></td>
    <td>All clinical trial information should be recorded, handled, and stored in a way that allows its accurate reporting, interpretation, and verification.</td>
    <td>ALCOA-CCEA data integrity principles apply. Source data must be legible, contemporaneous, original, accurate, and attributable. This principle underpins all EDC and eTMF requirements.</td>
  </tr>
  <tr>
    <td><strong>11</strong></td>
    <td>The confidentiality of records that could identify subjects should be protected, respecting the privacy and confidentiality rules in accordance with the applicable regulatory requirement(s).</td>
    <td>Patient identity must never appear in sponsor-held documents. Subject IDs are used in all sponsor-facing records. UK GDPR and the Data Protection Act 2018 apply to all personal data from UK trial participants.</td>
  </tr>
  <tr>
    <td><strong>12</strong></td>
    <td>Investigational products should be manufactured, handled, and stored in accordance with applicable good manufacturing practice (GMP). They should be used in accordance with the approved protocol.</td>
    <td>IMP must be manufactured to GMP standards, stored within specified conditions (temperature, light, humidity), dispensed only per protocol, and fully accounted for in the IMP accountability log.</td>
  </tr>
  <tr>
    <td><strong>13</strong></td>
    <td>Systems with procedures that assure the quality of every aspect of the trial should be implemented.</td>
    <td>Quality is not an afterthought — it must be built into trial design, monitoring, data management, and reporting through documented quality systems, SOPs, and proportionate oversight. This principle is the foundation of RBQM in E6(R3).</td>
  </tr>
</table>

<h2>How the Principles Connect to Daily Practice</h2>

<h3>Principle 3 in Action: Safety Reporting</h3>
<p>Principle 3 — that patient safety prevails over all other interests — is operationalised through the entire pharmacovigilance framework: SAE reporting within 24 hours, SUSAR reporting to the MHRA within 7 or 15 days, and the ability of the PI to break the blind in a medical emergency. Every safety reporting deadline exists because of this principle.</p>

<h3>Principle 9 in Action: Informed Consent</h3>
<p>Principle 9 — freely given informed consent — generates the requirement for a written Participant Information Sheet written in plain language, a cooling-off period before consent is sought, re-consent when new safety information emerges, and special provisions for participants who lack mental capacity.</p>

<h3>Principle 10 in Action: ALCOA-CCEA</h3>
<p>Principle 10 — accurate recording and handling of all clinical trial information — underpins the ALCOA-CCEA data integrity framework: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available. This is the foundation of source data verification (SDV) and the audit trail requirements in electronic systems.</p>

<h3>Principle 13 in Action: RBQM</h3>
<p>Principle 13 — quality systems — was expanded significantly in E6(R3). The guideline now explicitly requires Sponsors to implement a <strong>Quality Management System (QMS)</strong> that is proportionate to the complexity and risks of the trial. This includes identifying critical data and processes, conducting formal risk assessments, implementing targeted monitoring strategies, and using central statistical monitoring to detect data quality signals proactively.</p>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>All 13 principles must be followed — they are not optional guidelines, they are binding GCP requirements</li>
    <li>Principle 3 (patient safety above all) is the most frequently cited in inspection findings</li>
    <li>Principle 9 (informed consent) generates the most complex procedural requirements</li>
    <li>Principle 13 (quality systems) is the basis for RBQM and the central monitoring framework</li>
    <li>E6(R3) introduces a more principles-based, less prescriptive framework — but the principles themselves have been in place since 1996</li>
  </ul>
</div>
`;

// ── MODULE 1, LESSON 3: Roles & Responsibilities ─────────
CONTENT.rolesResponsibilities = `
<h1>Roles and Responsibilities: Sponsor, Investigator &amp; CRO</h1>
<p>ICH GCP E6(R3) defines the roles and responsibilities of every party involved in a clinical trial with precision. Understanding these roles is not just theoretical — it directly determines accountability in the event of a GCP violation, a regulatory inspection finding, or a patient safety event.</p>
<hr/>

<h2>The Sponsor</h2>
<p>The <strong>Sponsor</strong> is the individual, company, institution, or organisation that takes responsibility for the initiation, management, and financing (or arranging the financing) of a clinical trial. In the UK, the Sponsor's legal identity must be declared on the IRAS application and the Clinical Trial Authorisation.</p>

<h3>Core Sponsor Responsibilities Under ICH E6(R3)</h3>
<ul>
  <li><strong>Protocol development</strong>: The Sponsor writes and owns the clinical trial protocol. It must be scientifically rigorous, ethically sound, and operationally feasible. All protocol amendments require Sponsor authorisation before submission to the MHRA and ethics committee.</li>
  <li><strong>IMP management</strong>: The Sponsor is responsible for the manufacture, labelling, storage, and supply of the Investigational Medicinal Product (IMP) in accordance with GMP. The Sponsor must also manage IMP accountability and recall procedures.</li>
  <li><strong>Investigator selection and oversight</strong>: The Sponsor selects qualified Principal Investigators, ensures they have adequate resources and experience, and provides oversight through monitoring.</li>
  <li><strong>Monitoring</strong>: The Sponsor must implement a monitoring programme proportionate to the risk and complexity of the trial (E6(R3) emphasis). This includes defining the monitoring strategy, reviewing monitoring reports, and escalating issues.</li>
  <li><strong>SUSAR reporting</strong>: The Sponsor is responsible for identifying SUSARs (Suspected Unexpected Serious Adverse Reactions) and expeditiously reporting them to all relevant regulatory authorities and investigators. In the UK, this means reporting to the MHRA within 7 days (fatal/life-threatening) or 15 days (all others).</li>
  <li><strong>Data management and statistical analysis</strong>: The Sponsor owns the Data Management Plan, the Statistical Analysis Plan, and is responsible for the integrity of the trial database.</li>
  <li><strong>Trial Master File (TMF)</strong>: The Sponsor maintains the Sponsor TMF (eTMF) — the definitive collection of all essential documents that enables reconstruction of the trial conduct.</li>
  <li><strong>Quality Management System</strong>: E6(R3) requires Sponsors to implement a fit-for-purpose QMS, define critical data and processes, and conduct formal risk assessments.</li>
</ul>

<div class="warning-box">
  <p>⚠️ <strong>The Sponsor cannot delegate ultimate responsibility.</strong> Even when all operational functions are contracted to a CRO, the Sponsor retains legal and regulatory accountability. A CRO error is a Sponsor failure in the eyes of the regulator.</p>
</div>

<h2>The Investigator</h2>
<p>The <strong>Investigator</strong> is the individual responsible for the conduct of the clinical trial at a trial site. Where a trial is conducted by a team of individuals at a site, the <strong>Principal Investigator (PI)</strong> is responsible for the team. The PI must be a qualified physician (or dentist where appropriate).</p>

<h3>Core Investigator Responsibilities</h3>
<ul>
  <li><strong>Patient safety</strong>: The PI bears direct medical responsibility for every trial participant at the site. This includes making all medical decisions, assessing adverse events, and determining when a participant should be withdrawn.</li>
  <li><strong>Informed consent</strong>: The PI is responsible for ensuring that the consent process is conducted properly — that participants receive adequate information, understand it, and consent voluntarily. The PI or a qualified delegated physician must be available to answer medical questions during the consent process.</li>
  <li><strong>Delegation</strong>: The PI may delegate specific trial tasks to qualified staff, but must document all delegations on a signed <strong>Delegation of Authority Log</strong>. Tasks must only be delegated to individuals with the appropriate qualifications and training.</li>
  <li><strong>Protocol compliance</strong>: The PI and their team must conduct the trial strictly according to the approved protocol. Any deviation must be documented and reported. Substantive deviations may require protocol amendments.</li>
  <li><strong>Documentation</strong>: The PI is responsible for maintaining accurate, contemporaneous, and complete source documents (medical records, notes, worksheets). These are the foundation of all trial data.</li>
  <li><strong>SAE reporting</strong>: The PI must report all Serious Adverse Events to the Sponsor within 24 hours of awareness (or per protocol timelines). Fatal/life-threatening SAEs may require faster escalation.</li>
  <li><strong>Investigator Site File (ISF)</strong>: The PI is responsible for maintaining a complete, current, and inspection-ready ISF.</li>
  <li><strong>Facilities and resources</strong>: The PI must ensure the site has adequate staffing, space, equipment, and pharmacy facilities to conduct the trial safely and compliantly.</li>
</ul>

<h2>The Contract Research Organisation (CRO)</h2>
<p>A <strong>Contract Research Organisation (CRO)</strong> is a company that provides contracted clinical research services to a Sponsor. When a Sponsor delegates tasks to a CRO, those tasks and the associated responsibilities transfer to the CRO. The CRO operates under the ICH GCP obligations for whichever tasks it has accepted.</p>

<h3>Commonly Contracted CRO Services</h3>
<ul>
  <li>Clinical monitoring (CRA oversight of investigative sites)</li>
  <li>Data management (EDC setup, query management, database lock)</li>
  <li>Regulatory affairs (CTA and ethics submissions)</li>
  <li>Pharmacovigilance (SAE processing, SUSAR reporting)</li>
  <li>Medical writing (protocol, CSR, IB, study reports)</li>
  <li>Biostatistics and statistical analysis</li>
  <li>Central laboratory services</li>
  <li>Trial supply and IMP management</li>
</ul>

<h3>CRO Oversight and Accountability</h3>
<p>E6(R3) places a new emphasis on the Sponsor's responsibility to maintain oversight of contracted CROs. The Sponsor must:</p>
<ul>
  <li>Have a written agreement with the CRO specifying the transferred responsibilities</li>
  <li>Audit the CRO's processes and quality systems</li>
  <li>Ensure the CRO operates under its own GCP-compliant QMS</li>
  <li>Monitor the CRO's performance through key quality metrics (KQIs) and KPIs</li>
</ul>

<h2>Interaction Between the Three Parties</h2>
<table>
  <tr><th>Activity</th><th>Sponsor</th><th>CRO</th><th>Investigator</th></tr>
  <tr><td>Protocol development</td><td>Owns and approves</td><td>May draft under contract</td><td>Reviews and signs</td></tr>
  <tr><td>IMP supply</td><td>Manufactures / procures</td><td>May manage logistics</td><td>Receives and accounts for at site</td></tr>
  <tr><td>Monitoring</td><td>Defines strategy; reviews reports</td><td>Executes visits (CRAs)</td><td>Hosts visits; provides access</td></tr>
  <tr><td>SAE reporting</td><td>Receives from site; assesses causality; reports SUSARs to MHRA</td><td>May receive and process on behalf of Sponsor</td><td>Reports to Sponsor within 24 hours</td></tr>
  <tr><td>SUSAR reporting</td><td>Ultimately responsible</td><td>May submit to MHRA on behalf of Sponsor</td><td>Receives SUSAR notifications; informs IRB/IEC</td></tr>
  <tr><td>TMF/ISF</td><td>Maintains eTMF</td><td>May maintain sections of eTMF</td><td>Maintains ISF at site</td></tr>
</table>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>The Sponsor retains ultimate accountability even when all operations are contracted to a CRO</li>
    <li>The PI has direct medical responsibility for every participant — this cannot be delegated</li>
    <li>All delegated tasks must be documented on a signed Delegation of Authority Log</li>
    <li>E6(R3) strengthens Sponsor oversight requirements for contracted CROs</li>
    <li>SUSAR reporting: 7 days (fatal/life-threatening), 15 days (all others) to MHRA</li>
  </ul>
</div>
`;

// ── MODULE 2, LESSON 1: The Informed Consent Process ─────
CONTENT.informedConsent = `
<h1>The Informed Consent Process</h1>
<p>Informed consent is arguably the most important procedural safeguard in clinical research. It operationalises GCP Principle 9 — that freely given informed consent must be obtained from every subject prior to trial participation — and it is the primary ethical mechanism by which a participant's autonomy and dignity are respected.</p>
<p>Regulatory inspectors examine informed consent records closely. Deficiencies in the consent process are among the most frequent GCP inspection findings globally.</p>
<hr/>

<h2>What Is Informed Consent?</h2>
<p>Informed consent is a process, not a signature. It is an ongoing dialogue through which a potential participant is given all the information they need to make a voluntary, competent, and considered decision about whether to take part in a clinical trial. The signed Informed Consent Form (ICF) is the documentary evidence that the process occurred — but the process itself is what matters.</p>

<h2>The Mental Capacity Act 2005 (England &amp; Wales)</h2>
<p>In England and Wales, the Mental Capacity Act 2005 (MCA) governs decision-making for adults who may lack mental capacity. For clinical research, this is directly relevant. The MCA establishes five key principles:</p>
<ol>
  <li><strong>Presumption of capacity</strong>: A person must be assumed to have capacity unless it is established otherwise</li>
  <li><strong>Right to be supported to make decisions</strong>: All practicable steps must be taken to help a person make their own decision</li>
  <li><strong>Right to make unwise decisions</strong>: A person is not to be treated as lacking capacity merely because they make an unwise decision</li>
  <li><strong>Best interests</strong>: Any act or decision made for a person who lacks capacity must be in their best interests</li>
  <li><strong>Least restrictive option</strong>: Any intervention should be the least restrictive of the person's rights and freedoms</li>
</ol>
<p>A capacity assessment should be conducted by the consenting clinician at the time of consent, not assumed based on diagnosis. Capacity is decision-specific and time-specific — a person may have capacity to consent to routine care but not to a complex research protocol.</p>

<div class="info-box">
  <div class="info-box-title">📌 Scotland: Adults with Incapacity (Scotland) Act 2000</div>
  <p>In Scotland, adults who lack capacity are covered by the Adults with Incapacity (Scotland) Act 2000. The research-specific provisions differ from the English MCA. For Scotland-based trial sites, the consenting team must understand and apply the correct Scottish legislation.</p>
</div>

<h2>The Core Consent Process: Step by Step</h2>

<h3>Step 1: Identification of Potential Participants</h3>
<p>The site team identifies potential participants from clinical records, outpatient lists, or GP referrals. Pre-screening (reviewing records to assess likely eligibility) can occur before consent, but no trial procedure can be performed and no identifiable trial data can be collected until consent is in place.</p>

<h3>Step 2: Provision of Information</h3>
<p>The potential participant receives the HRA/REC-approved <strong>Participant Information Sheet (PIS)</strong> — a document written in plain, non-technical language (typically at a Year 8 reading level). The PIS must contain:</p>
<ul>
  <li>The nature and purpose of the trial</li>
  <li>The experimental nature of the treatment</li>
  <li>The duration of the study and the number and nature of visits</li>
  <li>All foreseeable risks and discomforts</li>
  <li>The anticipated benefits (or lack thereof)</li>
  <li>Alternative treatments available outside the trial</li>
  <li>The participant's right to withdraw at any time without consequence</li>
  <li>How confidentiality will be maintained and data protected</li>
  <li>Contact details for the site team and an independent contact for concerns</li>
</ul>

<h3>Step 3: The Cooling-Off Period</h3>
<p>After receiving the PIS, the participant must be given adequate time to consider their decision, discuss with family or their GP, and ask questions. There is no fixed minimum period in UK regulations, but the ethics committee reviews this — typically a minimum of 24 hours for most studies, unless an emergency or the nature of the disease makes this impractical.</p>

<h3>Step 4: The Consent Discussion</h3>
<p>The consenting clinician (PI or delegated physician, in some countries an advanced nurse practitioner with specific authorisation) meets with the participant to:</p>
<ul>
  <li>Confirm they have read and understood the PIS</li>
  <li>Answer all questions fully and honestly</li>
  <li>Check comprehension — the participant should be able to explain back in their own words what the study involves</li>
  <li>Confirm the decision is voluntary — no coercion, no undue influence</li>
</ul>

<h3>Step 5: Signing the ICF</h3>
<p>Both the participant and the consenting clinician sign and date the ICF on the same day. The participant receives a signed copy. The site retains the original in the medical records (which is the source document) and a copy in the ISF. The date of consent signature is the official screening date.</p>

<div class="warning-box">
  <p>⚠️ <strong>Critical rule</strong>: No screening procedures can occur before the ICF is signed. A participant who has a blood test taken before signing the ICF is a protocol deviation — and potentially a serious GCP breach depending on the test's significance.</p>
</div>

<h2>Re-Consent Triggers</h2>
<p>Informed consent is not a one-time event. Re-consent is required whenever there is new information that could materially affect a participant's willingness to continue. Common triggers:</p>
<ul>
  <li>A protocol amendment that changes the risk-benefit profile, adds new procedures, or changes the duration of participation</li>
  <li>A SUSAR or safety signal that reveals a new risk not previously described in the PIS</li>
  <li>A DSMB recommendation that new safety information be communicated to all participants</li>
  <li>New data from other studies with the same IMP that is relevant to the participant's decision</li>
</ul>
<p>Re-consent uses an updated ICF version. The participant signs the new version; the original signed version is retained in the file. Both copies must be retained.</p>

<h2>Documentation Requirements</h2>
<ul>
  <li>The signed and dated ICF (original in medical records)</li>
  <li>The version number and date of the ICF that was signed</li>
  <li>The name of the person who conducted the consent discussion</li>
  <li>If a witness was present, the witness's signature and relationship to the participant</li>
  <li>For re-consent: all versions of the ICF signed, with dates</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>Informed consent is a process, not just a signature — the discussion is as important as the documentation</li>
    <li>No trial procedures before consent — this is a fundamental GCP requirement (Principle 9)</li>
    <li>The Mental Capacity Act 2005 applies to all research in England and Wales</li>
    <li>Re-consent must be obtained whenever new safety-relevant information becomes available</li>
    <li>Both the participant and the consenting clinician must sign and date the ICF on the same day</li>
  </ul>
</div>
`;

// ── MODULE 2, LESSON 2: Special Consent Situations ───────
CONTENT.specialConsent = `
<h1>Special Consent Situations: Minors, Mental Incapacity &amp; Emergency Research</h1>
<p>While the standard informed consent process applies to mentally competent adults, clinical research frequently involves populations who cannot provide standard consent. ICH GCP E6(R3) and UK legislation establish specific requirements for these situations. These are among the most legally complex areas of clinical trial conduct — and among the most frequently inspected.</p>
<hr/>

<h2>1. Research Involving Children and Young People</h2>
<p>Research involving participants under 18 years of age is governed by the <strong>Medicines for Human Use (Clinical Trials) Regulations 2004</strong> and supplemented by the <strong>ICH E11 guideline on clinical investigation in children</strong>.</p>

<h3>Parental Consent (Legal Representative Consent)</h3>
<p>A child under 16 cannot legally consent to participate in a clinical trial in the UK. Consent must be obtained from a <strong>person with parental responsibility</strong> — typically a parent, but may be a local authority or other legal guardian. Where possible, both parents should be informed, though only one signature is required by law in most circumstances.</p>
<ul>
  <li>The parent/guardian receives a separate, age-appropriate PIS for parents</li>
  <li>The same cooling-off period and voluntariness requirements apply</li>
  <li>The parent/guardian may withdraw the child from the trial at any time</li>
</ul>

<h3>Child Assent</h3>
<p><strong>Assent</strong> — the child's agreement to participate — is ethically required and best practice even where not legally mandated. ICH E11 requires that the trial team seeks the assent of children who are capable of understanding, typically from age 7–8 upwards. Age-appropriate information sheets should be prepared for different age ranges (e.g. 7–11, 12–15).</p>

<div class="info-box">
  <div class="info-box-title">📌 Gillick Competence / Fraser Guidelines</div>
  <p>In England and Wales, a young person under 16 may be able to provide their own consent if they demonstrate sufficient maturity and intelligence to understand the nature and implications of the proposed trial — this is known as <strong>Gillick competence</strong>. However, this is rarely relied upon in clinical trial settings, and most protocols require parental consent regardless of age below 16.</p>
</div>

<h3>Young People Turning 18 During a Trial</h3>
<p>If a participant reaches 18 during the trial, they must re-consent in their own right as a competent adult. The site must have a protocol and SOPs to manage this transition, and the date by which re-consent must occur should be tracked actively.</p>

<h2>2. Adults Lacking Mental Capacity</h2>
<p>For adults who lack the mental capacity to consent to trial participation, UK legislation requires consent from a <strong>Legally Authorised Representative (LAR)</strong>.</p>

<h3>Who Is a Legally Authorised Representative?</h3>
<p>In England and Wales, under the Mental Capacity Act 2005 and the Clinical Trials Regulations, the LAR for an incapacitated adult in a clinical trial is:</p>
<ol>
  <li>A person nominated by the participant in a valid advance decision (if applicable)</li>
  <li>A Personal Legal Representative (PLR): a person not connected to the conduct of the trial who is suitable to act in the participant's best interests — typically a family member, carer, or close friend</li>
  <li>If no PLR is available, a Professional Legal Representative (PrLR): a registered healthcare professional not connected to the trial who is called upon to assess the participant's best interests</li>
</ol>

<h3>Best Interests Assessment</h3>
<p>The LAR's role is not to substitute their own preferences — it is to assess and advocate for the participant's best interests. The trial team and the LAR should consider:</p>
<ul>
  <li>What the participant would have wanted (any expressed wishes before incapacity)</li>
  <li>Whether the trial involves a direct benefit to the participant</li>
  <li>Whether the risk is minimal and justified</li>
  <li>Whether the research could not be carried out as effectively with competent adults</li>
</ul>

<div class="warning-box">
  <p>⚠️ <strong>Key requirement</strong>: If an incapacitated adult regains capacity during the trial, their own informed consent must be sought immediately. If they decline, they must be withdrawn. Continued participation of a now-competent adult without their own consent is a serious GCP breach.</p>
</div>

<h2>3. Emergency Research and Waiver of Consent</h2>
<p>In certain emergency situations — such as trials in acute stroke, cardiac arrest, or major trauma — it may be impossible to obtain consent (or LAR consent) before the first trial procedure, because the condition itself is the emergency. UK regulations permit a waiver of prior consent under tightly controlled conditions.</p>

<h3>Conditions for Emergency Waiver of Consent (UK CTR 2004, Reg. 15)</h3>
<ul>
  <li>The condition requiring treatment is such that prior informed consent cannot be given</li>
  <li>No LAR is available in the time required</li>
  <li>The trial relates directly to the life-threatening or seriously debilitating condition</li>
  <li>The ethics committee has specifically approved the emergency consent procedure</li>
  <li>The participant (or their LAR) is contacted and consent sought as soon as reasonably possible after the emergency</li>
  <li>If consent is refused retrospectively, the participant is withdrawn and any data that they do not consent to is destroyed</li>
</ul>

<h2>4. Vulnerable Populations: Additional Considerations</h2>
<p>ICH GCP E6(R3) requires special consideration for all vulnerable populations — those whose willingness to participate in research may be unduly influenced by their circumstances:</p>
<ul>
  <li><strong>Prisoners and detained persons</strong>: Coercion risk is high; independent oversight is required</li>
  <li><strong>Patients in a dependent or hierarchical relationship with the investigator</strong>: E.g. medical students, employees — special precautions to ensure voluntariness</li>
  <li><strong>People experiencing serious illness</strong>: May feel pressure to participate to access treatment; must be clearly told the trial is not their only option</li>
  <li><strong>People with limited literacy or language barriers</strong>: Interpreter services and translated documents must be provided; verbal consent processes may need to be designed</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>Children cannot consent in the UK — parental consent is required; child assent is best practice</li>
    <li>Adults lacking capacity require a Legally Authorised Representative (Personal or Professional Legal Rep)</li>
    <li>If an incapacitated participant regains capacity, their own consent must be sought immediately</li>
    <li>Emergency waiver of consent is only permitted under very specific, ethics-committee-approved conditions</li>
    <li>The ethics committee must specifically review and approve consent procedures for all vulnerable populations</li>
  </ul>
</div>
`;

// ── MODULE 3, LESSON 1: Essential Documents and the TMF ──
CONTENT.essentialDocs = `
<h1>Essential Documents and the Trial Master File (TMF)</h1>
<p>Essential documents are the records that individually and collectively allow the conduct of a clinical trial to be evaluated and demonstrate compliance with GCP and applicable regulatory requirements. They form the auditable evidence trail of what happened, when, by whom, and why — and they are the primary source that inspectors examine during GCP inspections.</p>
<hr/>

<h2>What Are Essential Documents?</h2>
<p>ICH GCP E6(R3) Appendix defines the essential documents that must be in the TMF at specific points during the trial. They serve two purposes:</p>
<ol>
  <li><strong>Quality assurance</strong>: Allow the Sponsor, monitor, auditor, and regulatory authority to reconstruct trial conduct and assess compliance</li>
  <li><strong>Legal protection</strong>: Provide the documentary evidence to defend the trial's integrity if challenged</li>
</ol>

<h2>The Trial Master File (TMF)</h2>
<p>The <strong>Trial Master File (TMF)</strong> is the collection of all essential documents maintained by the Sponsor (and/or CRO acting on their behalf). The <strong>Investigator Site File (ISF)</strong> is the site-level equivalent, maintained at each investigative site. Together, they should constitute a complete record of the trial.</p>

<table>
  <tr><th></th><th>Sponsor TMF (eTMF)</th><th>Investigator Site File (ISF)</th></tr>
  <tr><td><strong>Maintained by</strong></td><td>Sponsor (or CRO)</td><td>Principal Investigator / site team</td></tr>
  <tr><td><strong>Location</strong></td><td>Electronic (eTMF system, e.g. Veeva Vault)</td><td>Physical binder or electronic (eISF)</td></tr>
  <tr><td><strong>Access</strong></td><td>Sponsor, CRO, auditors, inspectors</td><td>Site team, CRA, MHRA inspectors</td></tr>
  <tr><td><strong>Retention</strong></td><td>Minimum 25 years (UK CTIMPs)</td><td>Minimum 25 years (UK CTIMPs)</td></tr>
</table>

<h2>Documents by Trial Phase</h2>

<h3>Before the Trial Begins</h3>
<p>The following essential documents must be in place before any trial-specific procedure occurs:</p>
<ul>
  <li>Investigator's Brochure (IB) — current edition, version number and date confirmed</li>
  <li>Signed Protocol and all amendments</li>
  <li>Sample Informed Consent Form and Participant Information Sheet (HRA/REC approved)</li>
  <li>Financial Aspects of the Trial (Clinical Trial Agreement)</li>
  <li>Insurance / Indemnity statement</li>
  <li>Signed agreements between involved parties (Sponsor-CRO, Sponsor-site)</li>
  <li>MHRA CTA approval letter</li>
  <li>HRA Approval letter</li>
  <li>REC Favourable Opinion letter</li>
  <li>NHS R&amp;D C&amp;C confirmation (NHS sites)</li>
  <li>CVs of Investigator and all relevant subinvestigators</li>
  <li>GCP training certificates</li>
  <li>Delegation of Authority Log (signed by PI, with all delegates listed)</li>
  <li>Normal ranges for laboratory tests conducted at the site</li>
  <li>IMP (and comparator if applicable): Certificate of Analysis, labels, storage conditions</li>
  <li>IMP accountability log (initiated)</li>
  <li>Screening log (initiated)</li>
  <li>Monitoring visit schedule</li>
</ul>

<h3>During the Trial</h3>
<ul>
  <li>Updated Investigator's Brochure (each new edition)</li>
  <li>All protocol amendments and their approvals</li>
  <li>Revised ICF/PIS versions (when amended)</li>
  <li>Monitoring visit reports</li>
  <li>Correspondence between Sponsor/CRO and site</li>
  <li>Completed IMP accountability logs (updated per dispensation/return)</li>
  <li>Completed screening and enrolment logs</li>
  <li>SAE and deviation reports</li>
  <li>SUSAR notifications received from Sponsor</li>
  <li>Laboratory normal range updates</li>
  <li>Updated CVs and GCP certificates as they expire and are renewed</li>
</ul>

<h3>After the Trial Ends</h3>
<ul>
  <li>IMP reconciliation and destruction certificate</li>
  <li>Final monitoring visit / close-out visit report</li>
  <li>Site closure letter from Sponsor</li>
  <li>Final protocol deviation list</li>
  <li>Clinical Study Report (CSR) — once available</li>
  <li>Notification of end of trial to MHRA</li>
  <li>Archiving confirmation</li>
</ul>

<h2>Document Retention Requirements in the UK</h2>
<p>For UK <strong>CTIMPs (Clinical Trials of Investigational Medicinal Products)</strong>, the minimum document retention period is <strong>25 years from the end of the clinical trial</strong>. This applies to both the Sponsor TMF and the Investigator Site File. This is longer than many other jurisdictions (the EU requires 25 years for paediatric studies, 15 years for others; the US FDA requires 2 years after marketing approval).</p>

<div class="warning-box">
  <p>⚠️ <strong>Documents must not be destroyed without prior written permission from the Sponsor.</strong> If a site needs to relocate or reorganise its archives, the Sponsor must be notified in writing first. Unauthorised destruction of essential documents is a serious GCP breach and can attract regulatory sanction.</p>
</div>

<h2>eTMF: Electronic Trial Master Files</h2>
<p>The industry has largely moved to <strong>electronic TMF (eTMF)</strong> systems. The most widely used platforms include Veeva Vault eTMF, Wingspan eTMF, and Florence eBinders. eTMF systems must be validated computer systems compliant with 21 CFR Part 11 (US) / EU Annex 11 (EU) / MHRA GxP guidance (UK) for electronic records and signatures.</p>

<h3>Key eTMF Requirements</h3>
<ul>
  <li>Audit trail: Every document upload, modification, or deletion is recorded with user identity, date, and time</li>
  <li>Version control: All document versions are retained; superseded versions are visible</li>
  <li>Access control: Permissions are role-based; changes to permissions are logged</li>
  <li>TMF Reference Model: Documents are filed according to the industry-standard DIA TMF Reference Model, enabling consistent structure and inspection readiness</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>Essential documents allow reconstruction of trial conduct — they are the primary target of GCP inspections</li>
    <li>The Sponsor maintains the eTMF; the PI maintains the ISF — together they form the complete record</li>
    <li>UK CTIMPs: 25-year retention from end of trial</li>
    <li>Documents before the trial begins must be in place before ANY participant procedure</li>
    <li>eTMF systems must have validated audit trails, version control, and access control</li>
  </ul>
</div>
`;

// ── MODULE 3, LESSON 2: GCP Inspections ──────────────────
CONTENT.gcpInspections = `
<h1>GCP Inspections: MHRA, FDA and Internal Audits</h1>
<p>GCP inspections are the mechanism by which regulatory authorities verify that clinical trials are conducted, recorded, and reported in accordance with the applicable regulations and GCP. In the UK, the primary inspecting body for clinical trials is the <strong>MHRA's Good Clinical Practice Group</strong>. For global trials that support US marketing applications, the FDA's <strong>Bioresearch Monitoring Group (BIMO)</strong> may also conduct inspections of UK sites.</p>
<hr/>

<h2>Types of GCP Inspections</h2>

<h3>1. Routine Inspections</h3>
<p>Conducted as part of the MHRA's planned inspection programme, regardless of any specific concern. Sites and sponsor organisations are selected based on a risk-based programme considering factors such as:</p>
<ul>
  <li>Time since last inspection</li>
  <li>Number of ongoing trials at the site</li>
  <li>Therapeutic area (higher risk = more scrutiny)</li>
  <li>Scale of operations (large CROs or active sponsors)</li>
</ul>

<h3>2. Application-Linked Inspections (Triggered by MAA)</h3>
<p>When a Marketing Authorisation Application (MAA) is submitted to the MHRA, the agency may inspect the pivotal trial sites and/or the sponsor/CRO before granting approval. These inspections are triggered specifically to verify the integrity of the data that underpins the marketing application. A critical finding at this stage can delay or prevent approval.</p>

<h3>3. For-Cause (Triggered) Inspections</h3>
<p>Triggered by a specific concern, such as:</p>
<ul>
  <li>A Serious Breach notification received by the MHRA</li>
  <li>A whistleblower report from a site staff member, participant, or competitor</li>
  <li>Intelligence from MHRA's pharmacovigilance or device inspection divisions</li>
  <li>Concerns arising from annual progress reports or published literature</li>
  <li>Referral from the HRA or a Research Ethics Committee</li>
</ul>
<p>For-cause inspections may be conducted with very short notice or, in serious cases, unannounced.</p>

<h2>The Inspection Process</h2>

<h3>Pre-Inspection Phase</h3>
<p>The MHRA typically gives <strong>4–8 weeks' notice</strong> for routine inspections. Upon notification, the site or sponsor should:</p>
<ul>
  <li>Acknowledge receipt of the inspection notification promptly</li>
  <li>Confirm the inspection date, inspectors, and scope</li>
  <li>Prepare the TMF/ISF — identify and resolve any known gaps</li>
  <li>Conduct an internal pre-inspection audit or mock inspection</li>
  <li>Brief all relevant staff on their roles and on inspection conduct etiquette</li>
  <li>Prepare a back room team to manage document retrieval during the inspection</li>
  <li>Prepare a hospitality room (meeting room with sufficient space, IT access, printing facilities)</li>
</ul>

<h3>During the Inspection</h3>
<p>The inspection typically begins with an opening meeting in which the lead inspector explains the scope and process. Inspectors will then review documents and interview staff. Key areas inspected:</p>
<ul>
  <li><strong>Protocol compliance</strong>: Were all visits conducted per schedule? Were eligibility criteria met? Were protocol deviations documented and reported?</li>
  <li><strong>Informed consent</strong>: Were ICFs signed before any trial procedure? Are all versions correct? Was re-consent conducted when required?</li>
  <li><strong>Essential documents</strong>: Is the ISF complete, current, and well-organised?</li>
  <li><strong>IMP accountability</strong>: Does the IMP log balance? Are storage conditions documented? Was the IMP dispensed per protocol?</li>
  <li><strong>Adverse event reporting</strong>: Were SAEs reported to the Sponsor within 24 hours? Were SUSARs received and filed correctly?</li>
  <li><strong>Data integrity</strong>: Do source documents support EDC entries? Is there an audit trail? No evidence of data fabrication or falsification?</li>
  <li><strong>Staff training</strong>: Do training records match the Delegation Log? Are GCP certificates current?</li>
</ul>

<h3>Inspection Findings</h3>
<table>
  <tr><th>Finding Level</th><th>Definition</th><th>Response Required</th></tr>
  <tr><td><strong>Critical</strong></td><td>A finding that has or could have a serious impact on participant safety or rights, or the integrity of trial data. Examples: falsified data, participants enrolled without consent, protocol not followed for critical safety data.</td><td>Immediate CAPA required. May result in trial suspension, prosecution, or Warning Letter.</td></tr>
  <tr><td><strong>Major</strong></td><td>A finding that indicates a significant departure from GCP but that is unlikely to have a serious impact on participant safety or data integrity. Examples: missing essential documents, SAEs not reported in time, incomplete training records.</td><td>Formal CAPA plan required within defined timelines.</td></tr>
  <tr><td><strong>Minor</strong></td><td>A finding that is unlikely to have a significant impact but indicates imperfect adherence to GCP. Examples: minor filing errors, late monitoring reports, minor administrative omissions.</td><td>Action plan required; may be combined in a single CAPA response.</td></tr>
</table>

<h2>Audit vs. Inspection</h2>
<table>
  <tr><th></th><th>Internal/Sponsor Audit</th><th>Regulatory Inspection</th></tr>
  <tr><td><strong>Conducted by</strong></td><td>Sponsor QA team or contracted auditors</td><td>MHRA, FDA, or other regulatory authority</td></tr>
  <tr><td><strong>Legal authority</strong></td><td>Contractual / operational</td><td>Statutory / regulatory power</td></tr>
  <tr><td><strong>Consequences of critical findings</strong></td><td>Internal CAPA; possible site suspension by Sponsor</td><td>Trial suspension, prosecution, Warning Letter, withdrawal of CTA</td></tr>
  <tr><td><strong>Auditee obligation</strong></td><td>Cooperate under contract</td><td>Legally required to cooperate and provide access</td></tr>
</table>

<h2>Inspection Readiness Checklist</h2>
<div class="key-points">
  <div class="key-points-title">🔍 Inspection Readiness: Core Checklist</div>
  <ul>
    <li>☐ All approval letters (MHRA, HRA, REC, R&amp;D) present and filed</li>
    <li>☐ Current IB version filed and acknowledged by PI</li>
    <li>☐ Delegation Log complete, signed, all delegates listed with current tasks and dates</li>
    <li>☐ CVs and GCP certificates current (not expired) for all listed staff</li>
    <li>☐ All signed ICFs present with correct version, no pre-consent procedures evidenced</li>
    <li>☐ IMP accountability log complete and balanced</li>
    <li>☐ SAE reports sent to Sponsor within 24-hour timeline (documented)</li>
    <li>☐ Protocol deviations documented, categorised, and reported where required</li>
    <li>☐ EDC data and source documents consistent (no unexplained discrepancies)</li>
    <li>☐ Monitoring visit reports filed; all action items closed</li>
    <li>☐ SUSAR notifications from Sponsor filed and acknowledged by PI</li>
    <li>☐ All staff briefed on their role and inspection etiquette</li>
  </ul>
</div>
`;

// ── MODULE 3, LESSON 3: RBQM in ICH E6(R3) ───────────────
CONTENT.rbqm = `
<h1>Risk-Based Quality Management (RBQM) in ICH E6(R3)</h1>
<p>One of the most significant changes between ICH E6(R2) and E6(R3) is the explicit, systematic integration of <strong>Risk-Based Quality Management (RBQM)</strong> as a core GCP requirement. Where E6(R2) introduced the concept of risk-based monitoring as an addendum, E6(R3) elevates quality management — including risk assessment, critical data identification, and proportionate oversight — to a central, principles-based requirement.</p>
<hr/>

<h2>What Is RBQM?</h2>
<p>RBQM is a systematic, proactive approach to clinical trial quality that focuses resources on what matters most — the <strong>critical data and processes</strong> that are essential to participant safety and the scientific validity of the trial. Rather than applying uniform, 100% monitoring to all data across all sites, RBQM uses risk assessment to direct oversight proportionately: more scrutiny where the risk is greatest, less where the risk is low.</p>

<h2>Quality by Design (QbD)</h2>
<p>RBQM begins before the trial starts, with <strong>Quality by Design (QbD)</strong>. The Sponsor integrates quality requirements into the trial design itself — rather than retrospectively trying to detect and correct quality failures.</p>
<p>QbD involves:</p>
<ul>
  <li>Identifying the <strong>primary trial objective</strong> and the data needed to achieve it</li>
  <li>Defining <strong>critical data</strong>: data elements essential to assessing the primary endpoints or participant safety (e.g. primary efficacy measurement, informed consent date, eligibility criteria data)</li>
  <li>Defining <strong>critical processes</strong>: trial activities whose failure would have a significant impact on participant protection or data reliability (e.g. randomisation, IMP dispensation, SAE reporting)</li>
  <li>Designing the protocol to minimise complexity and protect critical data quality</li>
</ul>

<h2>Risk Identification and Assessment</h2>
<p>ICH E6(R3) requires Sponsors to conduct a formal risk assessment that considers:</p>
<ul>
  <li><strong>What can go wrong</strong>: Identify potential risks to critical data and critical processes</li>
  <li><strong>How likely it is to occur</strong>: Assess the probability of each identified risk</li>
  <li><strong>What the impact would be</strong>: Assess the potential consequence to participant safety or data integrity if the risk materialises</li>
  <li><strong>Whether the risk is detectable</strong>: How early and easily can the risk be identified?</li>
</ul>
<p>This risk assessment drives the design of the monitoring strategy and the quality plan. Risks above a defined threshold require specific mitigation actions and heightened monitoring.</p>

<h2>Risk Mitigation and Monitoring Strategy</h2>
<p>Based on the risk assessment, the Sponsor defines a <strong>monitoring strategy</strong> that is proportionate to the identified risks:</p>
<ul>
  <li><strong>On-site monitoring (OSM)</strong>: Physical monitoring visits — focused on critical data and high-risk sites, not 100% SDV of all data</li>
  <li><strong>Remote monitoring</strong>: Review of source documents and EDC data remotely via secure data access — efficient and scalable</li>
  <li><strong>Central statistical monitoring (CSM)</strong>: Analysis of aggregate data across all sites to detect anomalies, outliers, unusual patterns, or signals of data fabrication — the most powerful tool in RBQM</li>
  <li><strong>Risk indicators (KRIs/KQIs)</strong>: Key Risk Indicators and Key Quality Indicators tracked centrally to identify sites that may be drifting out of compliance before a serious issue occurs</li>
</ul>

<div class="info-box">
  <div class="info-box-title">💡 Central Statistical Monitoring (CSM)</div>
  <p>CSM uses statistical algorithms to compare data patterns across sites. Common signals include: unusually low variability in a continuous endpoint (suggesting fabricated data), high rates of protocol deviations at one site, unusual patterns in adverse event reporting, or data entry that is too perfect (e.g. all measurements exactly on the scheduled visit day). CSM does not replace on-site monitoring — it identifies where it is most needed.</p>
</div>

<h2>Proportionate Oversight</h2>
<p>A core E6(R3) concept is that oversight must be <strong>proportionate</strong> — scaled to the risk profile of the trial. A low-risk, single-site observational study does not require the same monitoring intensity as a Phase 3, multi-site, blinded pivotal trial with a novel IMP. Proportionate oversight means:</p>
<ul>
  <li>Monitoring frequency and intensity matched to site risk profile</li>
  <li>Higher SDV rates for critical data; reduced or targeted SDV for lower-risk data</li>
  <li>More frequent on-site visits for sites with poor performance or high enrolment</li>
  <li>Remote or central monitoring as the primary oversight tool for low-risk, well-performing sites</li>
</ul>

<h2>E6(R3) vs. E6(R2): What Changed?</h2>
<table>
  <tr><th>Topic</th><th>E6(R2) (2016)</th><th>E6(R3) (2025)</th></tr>
  <tr><td>Risk-based monitoring</td><td>Introduced as addendum; optional RBM framework</td><td>Mandated RBQM as core requirement; more comprehensive framework</td></tr>
  <tr><td>Critical data/processes</td><td>Not explicitly defined</td><td>Explicitly required to be identified in quality risk assessment</td></tr>
  <tr><td>Quality by Design</td><td>Not addressed</td><td>Explicitly required; quality integrated at protocol design stage</td></tr>
  <tr><td>Central monitoring</td><td>Mentioned as one option</td><td>CSM promoted as a primary quality oversight tool</td></tr>
  <tr><td>Decentralised trials</td><td>Not addressed</td><td>Explicit guidance on remote visits, eConsent, wearables, digital endpoints</td></tr>
  <tr><td>Structure</td><td>Addendum layered on R1</td><td>Full restructure; principles-based, less prescriptive</td></tr>
</table>

<h2>The RBQM Quality Cycle</h2>
<ol>
  <li><strong>Plan</strong>: Define critical data/processes; conduct risk assessment; design the monitoring strategy</li>
  <li><strong>Do</strong>: Execute monitoring activities (on-site, remote, central); collect risk indicator data</li>
  <li><strong>Check</strong>: Review KRIs and KQIs; assess central monitoring signals; trigger targeted on-site review where needed</li>
  <li><strong>Act</strong>: Implement CAPAs; update the risk assessment and monitoring plan; escalate unresolved issues</li>
</ol>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>E6(R3) mandates RBQM — it is no longer optional</li>
    <li>Quality by Design begins at protocol development — quality must be built in, not inspected in</li>
    <li>Critical data and critical processes must be explicitly identified in the risk assessment</li>
    <li>Central statistical monitoring is the most powerful tool for detecting systemic data quality issues</li>
    <li>Proportionate oversight means more scrutiny where risk is highest, not uniform high scrutiny everywhere</li>
    <li>The RBQM cycle: Plan → Do → Check → Act — continuously throughout the trial lifecycle</li>
  </ul>
</div>
`;

// ── MODULE 4, LESSON 1: Applying GCP in the UK ───────────
CONTENT.ukGcpApplication = `
<h1>Applying GCP in the UK: Post-Brexit Regulatory Context</h1>
<p>The United Kingdom's departure from the European Union on 31 January 2020 — and the end of the transition period on 31 December 2020 — created a distinct, independent regulatory environment for UK clinical trials. Understanding how UK clinical trial regulation differs from the EU framework, and how the two systems interact for global trials, is essential for any professional working in UK clinical research.</p>
<hr/>

<h2>The Pre-Brexit Position</h2>
<p>Before Brexit, UK clinical trial regulation was aligned with the EU's <strong>Clinical Trials Directive 2001/20/EC</strong> — the same framework that governed clinical trials across all EU member states. The UK implemented this via the <strong>Medicines for Human Use (Clinical Trials) Regulations 2004</strong>. The MHRA participated in EU-level scientific committees and the European Medicines Agency (EMA) was headquartered in London until 2019.</p>

<h2>Post-Brexit: The UK as a Sovereign Regulatory Jurisdiction</h2>
<p>After Brexit, the UK became a separate regulatory jurisdiction. The MHRA operates independently from the EMA. UK trials no longer fall under the EU Clinical Trials Regulation (EU CTR 536/2014), which replaced the Directive for EU member states. As a result:</p>
<ul>
  <li>Global trials running in the UK and EU now require separate regulatory submissions to both the MHRA (UK) and the EMA/national competent authorities (EU)</li>
  <li>The MHRA has developed its own guidance and interpretation of GCP requirements, which may diverge from EMA guidance over time</li>
  <li>The MHRA became an ICH Regulatory Member in 2023, participating directly in ICH guideline development independently from the EMA</li>
  <li>Marketing authorisation applications must be made separately to the MHRA (for UK approval) and the EMA (for EU approval)</li>
</ul>

<h2>The Current UK Legal Framework</h2>
<p>Clinical trials in the UK are governed by:</p>
<ul>
  <li><strong>Medicines for Human Use (Clinical Trials) Regulations 2004 (as amended)</strong>: The primary UK legislation for CTIMPs — Clinical Trials of Investigational Medicinal Products</li>
  <li><strong>Medicines and Medical Devices Act 2021</strong>: Provides the framework for updating and modernising UK medicines and device regulation post-Brexit</li>
  <li><strong>MHRA GCP guidance documents</strong>: The MHRA publishes detailed guidance on applying the regulations, which is regularly updated</li>
  <li><strong>ICH E6(R3)</strong>: Adopted by the MHRA as the operative GCP standard</li>
  <li><strong>UK GDPR and Data Protection Act 2018</strong>: Governs personal data processing in clinical trials — including participant data, health records, and biosamples</li>
</ul>

<h2>Upcoming UK Clinical Trials Regulations Reform (April 2026)</h2>
<p>The UK government has committed to a comprehensive overhaul of the Clinical Trials Regulations, with implementation currently expected in <strong>April 2026</strong>. The reforms are designed to:</p>
<ul>
  <li>Modernise and streamline the approval process — the MHRA and HRA are working towards a single, integrated review process rather than two separate parallel submissions</li>
  <li>Reduce bureaucracy and approval timelines to make the UK a more competitive destination for international clinical research</li>
  <li>Align with ICH E6(R3) requirements, including RBQM and decentralised trial elements</li>
  <li>Introduce proportionate requirements based on trial risk — lower-risk trials face reduced regulatory burden</li>
  <li>Strengthen requirements for participant involvement in trial design</li>
  <li>Update safety reporting requirements and transparency obligations</li>
</ul>
<div class="info-box">
  <div class="info-box-title">📌 Monitoring the Reform</div>
  <p>The reform timeline is subject to change. Always check the MHRA website (gov.uk/mhra) and the HRA website (hra.nhs.uk) for the latest confirmed implementation dates and consultation documents. The consultation period generated over 2,000 responses from the clinical research community.</p>
</div>

<h2>Dual Reporting Obligations for Global Trials</h2>
<p>For multi-national trials running in the UK and EU simultaneously, the Sponsor must comply with <em>both</em> the UK regulatory framework and the EU CTR 536/2014 requirements. This means:</p>
<ul>
  <li><strong>Separate SUSAR reporting</strong>: SUSARs must be reported to the MHRA (UK) and to EudraVigilance (EU) separately, each within the applicable timelines</li>
  <li><strong>Separate annual reports</strong>: UK Development Safety Update Reports (DSURs) to MHRA, and EU DSURs via the EU CTR portal</li>
  <li><strong>Separate amendment submissions</strong>: Protocol amendments require separate submissions to the MHRA/HRA and to the EU Member State competent authorities via the CTIS portal</li>
  <li><strong>Protocol consistency</strong>: While separate submissions are required, the underlying protocol, ICF, and IB should be consistent across jurisdictions to maintain data integrity</li>
</ul>

<h2>MHRA as the UK Competent Authority</h2>
<p>The MHRA's specific roles in UK clinical trial oversight include:</p>
<ul>
  <li>Issuing Clinical Trial Authorisations via IRAS</li>
  <li>Receiving and assessing SUSAR reports</li>
  <li>Conducting GCP inspections at sites, sponsors, and CROs</li>
  <li>Receiving Serious Breach notifications</li>
  <li>Receiving End of Trial notifications</li>
  <li>Issuing guidance on GCP compliance and regulatory expectations</li>
  <li>Participating in ICH guideline development</li>
</ul>

<div class="key-points">
  <div class="key-points-title">✅ Key Points to Remember</div>
  <ul>
    <li>Post-Brexit, the UK is a separate regulatory jurisdiction — EU CTR 536/2014 does not apply to UK-only trials</li>
    <li>The MHRA is the UK competent authority; it operates independently from the EMA</li>
    <li>UK trials are governed by the CTR 2004 (as amended) — major reform expected April 2026</li>
    <li>Global trials in UK and EU require parallel, separate regulatory submissions and reporting to both authorities</li>
    <li>The MHRA joined ICH as a Regulatory Member in 2023 — UK now shapes global GCP standards directly</li>
  </ul>
</div>
`;

// ── MODULE 4, LESSON 2: GCP Compliance Checklist ─────────
CONTENT.gcpChecklist = `
<h1>GCP Compliance Checklist and Self-Assessment Guide</h1>
<p>This self-assessment checklist is designed to help site teams, CRAs, and Sponsor/CRO quality professionals evaluate GCP compliance across all key operational areas. Use it regularly — ideally before every monitoring visit, at the start of each quarter, and as part of inspection preparation. Each item should be assessed as <strong>Yes</strong>, <strong>No</strong>, or <strong>N/A</strong>.</p>
<p>Where an item is marked <strong>No</strong>, a corrective action should be initiated and documented. Unresolved No items at the time of an inspection are direct findings.</p>
<hr/>

<h2>Section 1: Site Set-Up and Approvals</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>1.1</td><td>MHRA CTA Initial Approval Letter is present, filed, and dated before first participant screening</td><td></td></tr>
  <tr><td>1.2</td><td>HRA Approval Letter is present and filed</td><td></td></tr>
  <tr><td>1.3</td><td>REC Favourable Opinion Letter is present, from the correct assigned REC</td><td></td></tr>
  <tr><td>1.4</td><td>NHS R&amp;D C&amp;C Confirmation Letter is present (NHS sites only)</td><td></td></tr>
  <tr><td>1.5</td><td>Clinical Trial Agreement (financial agreement) signed between site and Sponsor/CRO</td><td></td></tr>
  <tr><td>1.6</td><td>Current approved protocol version is filed in the ISF</td><td></td></tr>
  <tr><td>1.7</td><td>All protocol amendments and their approval letters are filed in date order</td><td></td></tr>
  <tr><td>1.8</td><td>Current Investigator's Brochure version is filed and the PI has acknowledged receipt</td><td></td></tr>
  <tr><td>1.9</td><td>Insurance/indemnity statement is present and covers the trial period</td><td></td></tr>
</table>

<h2>Section 2: Staff Qualifications and Training</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>2.1</td><td>Delegation of Authority Log is present, signed by the PI, and lists all current delegated staff with their specific roles</td><td></td></tr>
  <tr><td>2.2</td><td>All staff listed on the Delegation Log have a current CV on file</td><td></td></tr>
  <tr><td>2.3</td><td>All staff listed on the Delegation Log have a valid, unexpired GCP certificate (renewed every 2 years)</td><td></td></tr>
  <tr><td>2.4</td><td>Protocol-specific training has been completed and documented for all active delegated staff</td><td></td></tr>
  <tr><td>2.5</td><td>Staff who have left the trial have their delegation end-dated on the log</td><td></td></tr>
  <tr><td>2.6</td><td>Training log is complete with dates, trainer names, and topics for all training sessions</td><td></td></tr>
  <tr><td>2.7</td><td>The PI's speciality and GCP certification are appropriate for the trial indication</td><td></td></tr>
</table>

<h2>Section 3: Informed Consent</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>3.1</td><td>The current HRA/REC-approved version of the ICF is in use — version number and date are correct</td><td></td></tr>
  <tr><td>3.2</td><td>All participants have a signed, dated ICF on file — consent was obtained before any trial procedure</td><td></td></tr>
  <tr><td>3.3</td><td>The consenting clinician is listed on the Delegation Log as authorised to conduct consent</td><td></td></tr>
  <tr><td>3.4</td><td>Participants received a copy of the signed ICF</td><td></td></tr>
  <tr><td>3.5</td><td>Where protocol amendments changed the PIS, re-consent was obtained using the updated version</td><td></td></tr>
  <tr><td>3.6</td><td>For children: parental consent and (where appropriate) child assent are documented</td><td></td></tr>
  <tr><td>3.7</td><td>For incapacitated adults: LAR consent is documented and the LAR's relationship to the participant is recorded</td><td></td></tr>
  <tr><td>3.8</td><td>Withdrawn participants' withdrawal is documented in the medical notes and screening/enrolment log</td><td></td></tr>
</table>

<h2>Section 4: Essential Documents and ISF</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>4.1</td><td>ISF is organised, indexed, and all sections are present</td><td></td></tr>
  <tr><td>4.2</td><td>Screening log is complete — all screened participants listed with screen failure reasons where applicable</td><td></td></tr>
  <tr><td>4.3</td><td>Enrolment log is complete — all enrolled participants listed with randomisation IDs</td><td></td></tr>
  <tr><td>4.4</td><td>Site visit log is complete — all CRA and monitor visits recorded with dates and purpose</td><td></td></tr>
  <tr><td>4.5</td><td>All monitoring visit reports are filed in the ISF (may be copies of reports received from Sponsor/CRO)</td><td></td></tr>
  <tr><td>4.6</td><td>SUSAR notifications from the Sponsor are filed and reviewed by the PI</td><td></td></tr>
  <tr><td>4.7</td><td>Lab normal ranges are current and laboratory certifications/accreditations are on file</td><td></td></tr>
  <tr><td>4.8</td><td>All correspondence with the Sponsor, MHRA, and ethics committee is filed</td><td></td></tr>
</table>

<h2>Section 5: IMP Management</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>5.1</td><td>IMP accountability log is complete and up to date — all receipts, dispensations, returns, and disposals documented</td><td></td></tr>
  <tr><td>5.2</td><td>IMP is stored in a secure, locked area at the protocol-specified temperature</td><td></td></tr>
  <tr><td>5.3</td><td>Temperature logs (manual or automated) are complete, reviewed, and any excursions are documented</td><td></td></tr>
  <tr><td>5.4</td><td>IMP labelling complies with the approved label — no expired product is available for dispensation</td><td></td></tr>
  <tr><td>5.5</td><td>IMP is dispensed only per the protocol-specified regimen (dose, timing, route)</td><td></td></tr>
  <tr><td>5.6</td><td>Pharmacy staff listed on the Delegation Log as authorised to handle/dispense IMP</td><td></td></tr>
</table>

<h2>Section 6: Safety Reporting</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>6.1</td><td>All SAEs have been reported to the Sponsor within 24 hours (or per protocol timeline)</td><td></td></tr>
  <tr><td>6.2</td><td>SAE forms are complete — causality assessment by PI is documented</td><td></td></tr>
  <tr><td>6.3</td><td>Follow-up SAE reports have been submitted until the event resolves or is stable</td><td></td></tr>
  <tr><td>6.4</td><td>Protocol deviations have been documented in a deviation log with root cause and category</td><td></td></tr>
  <tr><td>6.5</td><td>Serious breaches (if any) have been reported to the Sponsor and MHRA</td><td></td></tr>
</table>

<h2>Section 7: Data Quality</h2>
<table>
  <tr><th>#</th><th>Item</th><th>Yes / No / N/A</th></tr>
  <tr><td>7.1</td><td>EDC data is entered within the protocol-specified timeframe after assessments</td><td></td></tr>
  <tr><td>7.2</td><td>EDC queries are responded to within the agreed timelines</td><td></td></tr>
  <tr><td>7.3</td><td>Source documents support all EDC entries — no undocumented changes</td><td></td></tr>
  <tr><td>7.4</td><td>Source documents are ALCOA-CCEA compliant: Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available</td><td></td></tr>
  <tr><td>7.5</td><td>Corrections in source documents follow correct procedure: single strikethrough, initials, date, reason</td><td></td></tr>
</table>

<div class="key-points">
  <div class="key-points-title">✅ How to Use This Checklist</div>
  <ul>
    <li>Complete this self-assessment at least quarterly and before any monitoring visit or audit</li>
    <li>Any item marked <strong>No</strong> should be escalated to the site research lead and a corrective action plan initiated</li>
    <li>Document who completed the self-assessment, the date, and the outcome — keep this record in the ISF</li>
    <li>Share the completed checklist with the CRA at the next monitoring visit as evidence of proactive quality management</li>
    <li>Use the findings to prioritise staff training and process improvement</li>
  </ul>
</div>
`;

// ─────────────────────────────────────────────────────────
// MODULES ARRAY
// ─────────────────────────────────────────────────────────
const MODULES = [
  // ── MODULE 1 ─────────────────────────────────────────────
  {
    title: 'Module 1: Introduction to ICH GCP E6(R3)',
    description: 'Understand the origins of GCP, its ethical foundations, the history of ICH E6 from R1 to R3, and the core responsibilities of Sponsors, Investigators and CROs.',
    order: 1, isMandatory: true,
    lessons: [
      {
        title: 'Welcome & What is ICH GCP?',
        lessonType: 'VIDEO',
        videoUrl: COURSE_VIDEO,
        videoDurationMinutes: 12,
        isPreview: true,
        order: 1,
        content: CONTENT.welcomeGcp,
        downloadableResources: [
          { label: 'ICH GCP E6(R3) Official Guideline (PDF)', url: 'https://exonsciences.com/resources/ich-e6-r3-guideline.pdf' },
          { label: 'Course Overview & Study Guide (PDF)', url: 'https://exonsciences.com/resources/gcp-course-overview.pdf' },
        ],
      },
      {
        title: 'The 13 Principles of ICH GCP E6(R3)',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.thirteenPrinciples,
        downloadableResources: [
          { label: 'The 13 GCP Principles — Quick Reference Card (PDF)', url: 'https://exonsciences.com/resources/gcp-13-principles-reference.pdf' },
        ],
      },
      {
        title: 'Roles and Responsibilities: Sponsor, Investigator & CRO',
        lessonType: 'VIDEO',
        videoUrl: COURSE_VIDEO,
        videoDurationMinutes: 15,
        isPreview: false,
        order: 3,
        content: CONTENT.rolesResponsibilities,
        downloadableResources: [
          { label: 'Roles & Responsibilities Summary Table (PDF)', url: 'https://exonsciences.com/resources/gcp-roles-responsibilities.pdf' },
          { label: 'SUSAR Reporting Timelines Quick Reference', url: 'https://exonsciences.com/resources/susar-reporting-timelines.pdf' },
        ],
      },
    ],
    quiz: {
      title: 'Module 1 Assessment: Introduction to ICH GCP E6(R3)',
      instructions: 'Answer all questions. 70% pass mark required. Questions are randomised.',
      passMarkPercentage: 70,
      timeLimitMinutes: 15,
      maxAttempts: 3,
      randomizeQuestions: true,
      questions: [
        {
          questionText: 'What does ICH stand for?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICH = International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use.',
          marks: 1, order: 1,
          options: [
            { optionText: 'International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use', isCorrect: true, order: 1 },
            { optionText: 'International Committee for Healthcare', isCorrect: false, order: 2 },
            { optionText: 'Integrated Clinical Harmonisation', isCorrect: false, order: 3 },
            { optionText: 'International Consortium for Human research', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which document first established the principle that voluntary consent is absolutely essential in human research?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Nuremberg Code (1947), established after the Nazi Doctors\' Trial, was the first international standard requiring voluntary consent.',
          marks: 1, order: 2,
          options: [
            { optionText: 'The Nuremberg Code (1947)', isCorrect: true, order: 1 },
            { optionText: 'The Declaration of Helsinki (1964)', isCorrect: false, order: 2 },
            { optionText: 'The Belmont Report (1979)', isCorrect: false, order: 3 },
            { optionText: 'ICH E6(R1) (1996)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'ICH E6(R3) was finalised and entered into force in which year?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICH E6(R3) entered into force in 2025 as a full revision of the GCP guideline.',
          marks: 1, order: 3,
          options: [
            { optionText: '2025', isCorrect: true, order: 1 },
            { optionText: '2016', isCorrect: false, order: 2 },
            { optionText: '2020', isCorrect: false, order: 3 },
            { optionText: '1996', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which GCP principle states that patient safety must prevail over interests of science and society?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Principle 3 states: "The rights, safety, and wellbeing of the trial subjects are the most important considerations and should prevail over interests of science and society."',
          marks: 1, order: 4,
          options: [
            { optionText: 'Principle 3', isCorrect: true, order: 1 },
            { optionText: 'Principle 9', isCorrect: false, order: 2 },
            { optionText: 'Principle 1', isCorrect: false, order: 3 },
            { optionText: 'Principle 13', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are responsibilities of the Sponsor under ICH GCP E6(R3)?',
          questionType: 'MULTI_SELECT',
          explanation: 'All of these are Sponsor responsibilities. The PI has direct medical responsibility for participants — this is not a Sponsor responsibility.',
          marks: 2, order: 5,
          options: [
            { optionText: 'Protocol development and ownership', isCorrect: true, order: 1 },
            { optionText: 'SUSAR reporting to regulatory authorities', isCorrect: true, order: 2 },
            { optionText: 'Maintaining the Trial Master File (eTMF)', isCorrect: true, order: 3 },
            { optionText: 'IMP manufacture and supply management', isCorrect: true, order: 4 },
            { optionText: 'Direct medical decisions about individual participants', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'What is the SUSAR reporting timeline to the MHRA for a fatal or life-threatening suspected unexpected serious adverse reaction?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Fatal or life-threatening SUSARs must be reported to the MHRA within 7 days of the Sponsor becoming aware.',
          marks: 1, order: 6,
          options: [
            { optionText: '7 days', isCorrect: true, order: 1 },
            { optionText: '15 days', isCorrect: false, order: 2 },
            { optionText: '24 hours', isCorrect: false, order: 3 },
            { optionText: '30 days', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which GCP principle underpins the ALCOA-CCEA data integrity framework?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Principle 10 states that all clinical trial information should be recorded, handled, and stored in a way that allows its accurate reporting, interpretation, and verification — this is the basis for ALCOA-CCEA.',
          marks: 1, order: 7,
          options: [
            { optionText: 'Principle 10', isCorrect: true, order: 1 },
            { optionText: 'Principle 3', isCorrect: false, order: 2 },
            { optionText: 'Principle 6', isCorrect: false, order: 3 },
            { optionText: 'Principle 12', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'When a Sponsor delegates clinical trial tasks to a CRO, who retains ultimate regulatory accountability?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Sponsor retains ultimate regulatory accountability even when all operations are contracted to a CRO.',
          marks: 1, order: 8,
          options: [
            { optionText: 'The Sponsor', isCorrect: true, order: 1 },
            { optionText: 'The CRO', isCorrect: false, order: 2 },
            { optionText: 'The Principal Investigator', isCorrect: false, order: 3 },
            { optionText: 'The MHRA', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ── MODULE 2 ─────────────────────────────────────────────
  {
    title: 'Module 2: Informed Consent and Participant Protection',
    description: 'Master the informed consent process — including the Mental Capacity Act 2005, re-consent triggers, special consent situations for minors and incapacitated adults, and emergency research provisions.',
    order: 2, isMandatory: true,
    lessons: [
      {
        title: 'The Informed Consent Process',
        lessonType: 'VIDEO',
        videoUrl: COURSE_VIDEO,
        videoDurationMinutes: 14,
        isPreview: false,
        order: 1,
        content: CONTENT.informedConsent,
        downloadableResources: [
          { label: 'Informed Consent Process Flowchart (PDF)', url: 'https://exonsciences.com/resources/consent-process-flowchart.pdf' },
          { label: 'Mental Capacity Act 2005 Summary for Researchers (PDF)', url: 'https://exonsciences.com/resources/mca-2005-research-summary.pdf' },
        ],
      },
      {
        title: 'Special Consent Situations: Minors, Mental Incapacity & Emergency Research',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.specialConsent,
        downloadableResources: [
          { label: 'Legally Authorised Representative Guidance (PDF)', url: 'https://exonsciences.com/resources/lar-guidance.pdf' },
          { label: 'Child Assent Template — Age 7–11 (DOCX)', url: 'https://exonsciences.com/resources/child-assent-7-11.docx' },
          { label: 'Child Assent Template — Age 12–15 (DOCX)', url: 'https://exonsciences.com/resources/child-assent-12-15.docx' },
        ],
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check: Informed Consent and Participant Protection',
      instructions: 'Answer all questions. 70% pass mark required.',
      passMarkPercentage: 70,
      timeLimitMinutes: 10,
      maxAttempts: 3,
      randomizeQuestions: true,
      questions: [
        {
          questionText: 'When must an Informed Consent Form be signed relative to trial procedures?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The ICF must be signed before any trial-specific procedure. This is a fundamental GCP Principle 9 requirement.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Before any trial-specific procedure is performed', isCorrect: true, order: 1 },
            { optionText: 'Before the first dose of IMP', isCorrect: false, order: 2 },
            { optionText: 'At any point during the screening visit', isCorrect: false, order: 3 },
            { optionText: 'Within 24 hours of enrolment', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under the Mental Capacity Act 2005, which of the following is correct?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The MCA 2005 presumes capacity — a person must be assumed to have capacity unless it is established that they lack it.',
          marks: 1, order: 2,
          options: [
            { optionText: 'A person must be assumed to have capacity unless it is established otherwise', isCorrect: true, order: 1 },
            { optionText: 'A diagnosis of dementia means a person lacks capacity to consent', isCorrect: false, order: 2 },
            { optionText: 'An unwise decision proves the person lacks capacity', isCorrect: false, order: 3 },
            { optionText: 'Capacity assessments are not required if the GP confirms the patient is competent', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following scenarios requires re-consent?',
          questionType: 'MULTI_SELECT',
          explanation: 'Re-consent is required for amendments affecting risk-benefit, new safety signals, and DSMB recommendations to inform participants. A change to the sponsor\'s name does not affect the participant\'s decision.',
          marks: 2, order: 3,
          options: [
            { optionText: 'A protocol amendment that adds a new invasive procedure to the visit schedule', isCorrect: true, order: 1 },
            { optionText: 'A SUSAR that reveals a new, previously undescribed risk from the IMP', isCorrect: true, order: 2 },
            { optionText: 'A DSMB recommendation to communicate new safety data to all participants', isCorrect: true, order: 3 },
            { optionText: 'A change to the Sponsor\'s company name (no protocol change)', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'For a participant under 16 years of age, who must provide consent to trial participation in the UK?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A person with parental responsibility must provide consent for participants under 16. Child assent is ethically required best practice but does not substitute for parental consent.',
          marks: 1, order: 4,
          options: [
            { optionText: 'A person with parental responsibility', isCorrect: true, order: 1 },
            { optionText: 'The child themselves if Gillick competent', isCorrect: false, order: 2 },
            { optionText: 'The child\'s GP', isCorrect: false, order: 3 },
            { optionText: 'A Professional Legal Representative', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What must happen if an adult who lacked capacity at enrolment regains capacity during the trial?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'If a participant regains capacity, their own informed consent must be sought immediately. If they decline, they must be withdrawn.',
          marks: 1, order: 5,
          options: [
            { optionText: 'Their own informed consent must be sought immediately; withdrawal if they decline', isCorrect: true, order: 1 },
            { optionText: 'The LAR\'s consent remains valid for the remainder of the trial', isCorrect: false, order: 2 },
            { optionText: 'The PI can continue without re-consent if the participant appears cooperative', isCorrect: false, order: 3 },
            { optionText: 'The ethics committee must be consulted before seeking consent', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ── MODULE 3 ─────────────────────────────────────────────
  {
    title: 'Module 3: Essential Documents, GCP Inspections & Quality Systems',
    description: 'Learn the essential document requirements, how to maintain an inspection-ready TMF/ISF, what MHRA GCP inspections involve, and how Risk-Based Quality Management (RBQM) works in E6(R3).',
    order: 3, isMandatory: true,
    lessons: [
      {
        title: 'Essential Documents and the Trial Master File (TMF)',
        lessonType: 'VIDEO',
        videoUrl: COURSE_VIDEO,
        videoDurationMinutes: 16,
        isPreview: false,
        order: 1,
        content: CONTENT.essentialDocs,
        downloadableResources: [
          { label: 'DIA TMF Reference Model Overview (PDF)', url: 'https://exonsciences.com/resources/tmf-reference-model.pdf' },
          { label: 'ISF Completeness Checklist (PDF)', url: 'https://exonsciences.com/resources/isf-completeness-checklist.pdf' },
        ],
      },
      {
        title: 'GCP Inspections: MHRA, FDA and Internal Audits',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.gcpInspections,
        downloadableResources: [
          { label: 'Inspection Readiness Guide (PDF)', url: 'https://exonsciences.com/resources/inspection-readiness-guide.pdf' },
          { label: 'MHRA GCP Inspection Findings Overview (PDF)', url: 'https://exonsciences.com/resources/mhra-common-findings.pdf' },
        ],
      },
      {
        title: 'Risk-Based Quality Management (RBQM) in ICH E6(R3)',
        lessonType: 'TEXT',
        isPreview: false,
        order: 3,
        content: CONTENT.rbqm,
        downloadableResources: [
          { label: 'RBQM Risk Assessment Template (XLSX)', url: 'https://exonsciences.com/resources/rbqm-risk-assessment-template.xlsx' },
          { label: 'E6(R2) vs E6(R3) Changes Summary (PDF)', url: 'https://exonsciences.com/resources/e6-r2-vs-r3-changes.pdf' },
        ],
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check: Essential Documents, Inspections & RBQM',
      instructions: 'Answer all questions. 70% pass mark required.',
      passMarkPercentage: 70,
      timeLimitMinutes: 12,
      maxAttempts: 3,
      randomizeQuestions: true,
      questions: [
        {
          questionText: 'What is the minimum document retention period for essential documents in a UK CTIMP?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'UK CTIMPs require a minimum of 25 years retention from the end of the clinical trial — longer than many other jurisdictions.',
          marks: 1, order: 1,
          options: [
            { optionText: '25 years from the end of the clinical trial', isCorrect: true, order: 1 },
            { optionText: '15 years from the end of the clinical trial', isCorrect: false, order: 2 },
            { optionText: '10 years from the end of the clinical trial', isCorrect: false, order: 3 },
            { optionText: '2 years after marketing authorisation', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A for-cause GCP inspection by the MHRA may be triggered by which of the following?',
          questionType: 'MULTI_SELECT',
          explanation: 'For-cause inspections are triggered by serious concerns: serious breach notifications, whistleblowers, and concerns from other regulatory intelligence. Routine planned programme inspections are not for-cause.',
          marks: 2, order: 2,
          options: [
            { optionText: 'A Serious Breach notification submitted to the MHRA', isCorrect: true, order: 1 },
            { optionText: 'A whistleblower report from a site staff member', isCorrect: true, order: 2 },
            { optionText: 'Intelligence from the MHRA pharmacovigilance division', isCorrect: true, order: 3 },
            { optionText: 'Being selected as part of the MHRA\'s routine inspection programme', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'What is the difference between an audit and an inspection in GCP terms?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'An audit is conducted by the Sponsor\'s QA team (or contracted auditors) under contractual authority. An inspection is conducted by a regulatory authority (such as the MHRA) under statutory/legal authority.',
          marks: 1, order: 3,
          options: [
            { optionText: 'An audit is conducted by the Sponsor QA team; an inspection by a regulatory authority', isCorrect: true, order: 1 },
            { optionText: 'An inspection is conducted by the Sponsor; an audit by the MHRA', isCorrect: false, order: 2 },
            { optionText: 'They are the same — both are conducted by the MHRA', isCorrect: false, order: 3 },
            { optionText: 'An audit reviews financial records; an inspection reviews clinical data only', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'In the context of RBQM, what is "Quality by Design"?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Quality by Design means integrating quality requirements into the trial design from the start — identifying critical data/processes and designing processes to protect them — rather than retrospectively detecting failures.',
          marks: 1, order: 4,
          options: [
            { optionText: 'Integrating quality requirements into trial design from the outset, rather than detecting failures retrospectively', isCorrect: true, order: 1 },
            { optionText: 'Designing a visually appealing case report form', isCorrect: false, order: 2 },
            { optionText: 'Setting a quality standard for the final clinical study report', isCorrect: false, order: 3 },
            { optionText: 'A post-trial audit of all quality control procedures', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Central Statistical Monitoring (CSM) in RBQM is used to detect which of the following?',
          questionType: 'MULTI_SELECT',
          explanation: 'CSM analyses aggregate data across sites for anomalies: unusually low data variability (potential fabrication), unusual AE patterns, and high deviation rates at one site. It does not replace on-site monitoring.',
          marks: 2, order: 5,
          options: [
            { optionText: 'Unusually low data variability at a single site that may indicate data fabrication', isCorrect: true, order: 1 },
            { optionText: 'Unusual patterns in adverse event reporting rates across sites', isCorrect: true, order: 2 },
            { optionText: 'Sites with abnormally high protocol deviation rates', isCorrect: true, order: 3 },
            { optionText: 'Whether the Investigator\'s Brochure is filed in the correct section of the ISF', isCorrect: false, order: 4 },
          ],
        },
      ],
    },
  },

  // ── MODULE 4 ─────────────────────────────────────────────
  {
    title: 'Module 4: UK-Specific GCP Application & Final Assessment',
    description: 'Apply GCP principles in the UK post-Brexit regulatory context, understand MHRA-specific requirements, complete a comprehensive self-assessment checklist, and demonstrate overall GCP competency in the final assessment.',
    order: 4, isMandatory: true,
    lessons: [
      {
        title: 'Applying GCP in the UK: Post-Brexit Regulatory Context',
        lessonType: 'VIDEO',
        videoUrl: COURSE_VIDEO,
        videoDurationMinutes: 13,
        isPreview: false,
        order: 1,
        content: CONTENT.ukGcpApplication,
        downloadableResources: [
          { label: 'UK vs EU Clinical Trial Regulation Comparison (PDF)', url: 'https://exonsciences.com/resources/uk-eu-ctr-comparison.pdf' },
          { label: 'MHRA IRAS Submission Guide (PDF)', url: 'https://exonsciences.com/resources/iras-submission-guide.pdf' },
        ],
      },
      {
        title: 'GCP Compliance Checklist and Self-Assessment Guide',
        lessonType: 'TEXT',
        isPreview: false,
        order: 2,
        content: CONTENT.gcpChecklist,
        downloadableResources: [
          { label: 'GCP Compliance Self-Assessment Checklist (XLSX)', url: 'https://exonsciences.com/resources/gcp-compliance-checklist.xlsx' },
          { label: 'ALCOA-CCEA Data Integrity Quick Reference (PDF)', url: 'https://exonsciences.com/resources/alcoa-ccea-reference.pdf' },
        ],
      },
    ],
    quiz: {
      title: 'Final Assessment: ICH GCP E6(R3) Fundamentals for UK Clinical Research',
      instructions: 'This is your final assessment covering all four modules. You need 70% (11/15) to pass and receive your certificate. You have 3 attempts. Questions are randomised. Time limit: 25 minutes.',
      passMarkPercentage: 70,
      timeLimitMinutes: 25,
      maxAttempts: 3,
      randomizeQuestions: true,
      questions: [
        {
          questionText: 'The Declaration of Helsinki is directly relevant to GCP because it:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The Declaration of Helsinki established the ethical principles that form the foundation of GCP, including ethics committee review, risk-benefit assessment, and participant protection.',
          marks: 1, order: 1,
          options: [
            { optionText: 'Established the ethical principles that form the foundation of GCP', isCorrect: true, order: 1 },
            { optionText: 'Defined the SUSAR reporting timelines', isCorrect: false, order: 2 },
            { optionText: 'Created the International Council for Harmonisation', isCorrect: false, order: 3 },
            { optionText: 'Established the MHRA as the UK competent authority', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'How many GCP principles are defined in ICH E6(R3)?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ICH GCP E6(R3) defines 13 principles — unchanged in number from E6(R1), though the language and emphasis have been refined.',
          marks: 1, order: 2,
          options: [
            { optionText: '13', isCorrect: true, order: 1 },
            { optionText: '10', isCorrect: false, order: 2 },
            { optionText: '7', isCorrect: false, order: 3 },
            { optionText: '15', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which GCP principle specifically requires that each individual involved in conducting a trial must be qualified by education, training, and experience?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Principle 8: "Each individual involved in conducting a trial should be qualified by education, training, and experience to perform his or her respective task(s)."',
          marks: 1, order: 3,
          options: [
            { optionText: 'Principle 8', isCorrect: true, order: 1 },
            { optionText: 'Principle 5', isCorrect: false, order: 2 },
            { optionText: 'Principle 12', isCorrect: false, order: 3 },
            { optionText: 'Principle 7', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The Belmont Report (1979) identified three core ethical principles for human research. Which of the following are correct?',
          questionType: 'MULTI_SELECT',
          explanation: 'The Belmont Report\'s three principles: Respect for Persons, Beneficence, and Justice. Confidentiality and independence are important but are not Belmont principles.',
          marks: 2, order: 4,
          options: [
            { optionText: 'Respect for Persons', isCorrect: true, order: 1 },
            { optionText: 'Beneficence', isCorrect: true, order: 2 },
            { optionText: 'Justice', isCorrect: true, order: 3 },
            { optionText: 'Confidentiality', isCorrect: false, order: 4 },
            { optionText: 'Independence', isCorrect: false, order: 5 },
          ],
        },
        {
          questionText: 'What is the primary purpose of the Investigator\'s Brochure (IB)?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'The IB compiles all clinical and non-clinical data on the IMP, providing the Investigator with the information needed to conduct the trial safely — underpinning GCP Principle 4 (adequate non-clinical and clinical information).',
          marks: 1, order: 5,
          options: [
            { optionText: 'To compile clinical and non-clinical data on the IMP to support safe trial conduct', isCorrect: true, order: 1 },
            { optionText: 'To describe the procedures the Investigator must follow at each visit', isCorrect: false, order: 2 },
            { optionText: 'To document the informed consent process', isCorrect: false, order: 3 },
            { optionText: 'To list all essential documents in the ISF', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A Principal Investigator at a UK NHS site discovers a patient was given the IMP before signing the Informed Consent Form. What should they do immediately?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'This is a protocol deviation — and potentially a serious breach. The PI must document the deviation, report it to the Sponsor immediately, assess whether the patient was harmed, and consider whether this is reportable as a serious breach to the MHRA.',
          marks: 1, order: 6,
          options: [
            { optionText: 'Document the deviation, report to the Sponsor immediately, and assess patient safety', isCorrect: true, order: 1 },
            { optionText: 'Have the patient sign the ICF retrospectively and note the correct date', isCorrect: false, order: 2 },
            { optionText: 'Withdraw the patient from the trial without documentation', isCorrect: false, order: 3 },
            { optionText: 'Wait to see if the patient experiences any adverse events before reporting', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following statements about the post-Brexit UK regulatory framework is correct?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Post-Brexit, the UK is a sovereign regulatory jurisdiction. EU CTR 536/2014 does not apply to UK-only trials. The MHRA operates independently from the EMA.',
          marks: 1, order: 7,
          options: [
            { optionText: 'The MHRA operates independently from the EMA; EU CTR 536/2014 does not apply to UK-only trials', isCorrect: true, order: 1 },
            { optionText: 'UK trials still fall under EU CTR 536/2014 under a transitional agreement', isCorrect: false, order: 2 },
            { optionText: 'The EMA still has oversight of UK clinical trials through a reciprocal arrangement', isCorrect: false, order: 3 },
            { optionText: 'The MHRA now reports to the EMA for scientific opinion on all clinical trials', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'E6(R3) compared to E6(R2): which of the following were introduced or significantly strengthened in E6(R3)?',
          questionType: 'MULTI_SELECT',
          explanation: 'E6(R3) explicitly mandated RBQM, introduced Quality by Design, addressed decentralised trials, and fully restructured the guideline. E6(R2) introduced the concept of risk-based monitoring as an addendum, but R3 goes much further.',
          marks: 2, order: 8,
          options: [
            { optionText: 'Mandatory Risk-Based Quality Management (RBQM)', isCorrect: true, order: 1 },
            { optionText: 'Explicit guidance on decentralised trial elements and digital health technologies', isCorrect: true, order: 2 },
            { optionText: 'Quality by Design as a core requirement', isCorrect: true, order: 3 },
            { optionText: 'The 13 GCP principles (these were first introduced in E6(R1))', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Under ICH GCP E6(R3), what are "critical data"?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'Critical data are data elements essential to assessing primary endpoints or participant safety — the ones whose absence or inaccuracy would significantly impact the trial\'s conclusions or participant welfare.',
          marks: 1, order: 9,
          options: [
            { optionText: 'Data elements essential to assessing primary endpoints or participant safety', isCorrect: true, order: 1 },
            { optionText: 'All data collected in the electronic CRF', isCorrect: false, order: 2 },
            { optionText: 'Data that must be verified 100% on site', isCorrect: false, order: 3 },
            { optionText: 'Laboratory data only', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'How often must GCP certificates typically be renewed for staff listed on a Delegation of Authority Log?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'GCP certificates must be renewed every 2 years. CVs are typically renewed every 3 years, or when there is a significant change in the individual\'s role or qualifications.',
          marks: 1, order: 10,
          options: [
            { optionText: 'Every 2 years', isCorrect: true, order: 1 },
            { optionText: 'Every year', isCorrect: false, order: 2 },
            { optionText: 'Every 3 years', isCorrect: false, order: 3 },
            { optionText: 'Only when joining a new trial', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'Which of the following are correctly matched to their UK regulatory role?',
          questionType: 'MULTI_SELECT',
          explanation: 'MHRA = competent authority (issues CTA, receives SUSARs, conducts inspections). HRA = governance and ethics oversight. NIHR = NHS research infrastructure and funding. NHS R&D = site-level capacity and capability confirmation.',
          marks: 2, order: 11,
          options: [
            { optionText: 'MHRA — issues the Clinical Trial Authorisation (CTA)', isCorrect: true, order: 1 },
            { optionText: 'HRA — provides ethical and governance approval', isCorrect: true, order: 2 },
            { optionText: 'NIHR — provides NHS research infrastructure and funding support', isCorrect: true, order: 3 },
            { optionText: 'NHS R&D — issues the REC Favourable Opinion', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'A site is preparing for an MHRA GCP inspection. Which of the following is NOT typically reviewed during a GCP inspection?',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'GCP inspections review consent, protocol compliance, IMP accountability, source data, staff training and essential documents. The site\'s financial accounts and salary records are not within the scope of a GCP inspection.',
          marks: 1, order: 12,
          options: [
            { optionText: 'The site\'s financial accounts and salary records', isCorrect: true, order: 1 },
            { optionText: 'Informed consent documentation', isCorrect: false, order: 2 },
            { optionText: 'IMP accountability log', isCorrect: false, order: 3 },
            { optionText: 'Source data vs EDC consistency', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'ALCOA stands for:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'ALCOA = Attributable, Legible, Contemporaneous, Original, Accurate. CCEA extends this: Complete, Consistent, Enduring, Available.',
          marks: 1, order: 13,
          options: [
            { optionText: 'Attributable, Legible, Contemporaneous, Original, Accurate', isCorrect: true, order: 1 },
            { optionText: 'Auditable, Legible, Complete, Original, Accurate', isCorrect: false, order: 2 },
            { optionText: 'Attributable, Linked, Contemporaneous, Official, Assured', isCorrect: false, order: 3 },
            { optionText: 'Accurate, Legible, Complete, Original, Available', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'The upcoming UK Clinical Trials Regulations reform (expected April 2026) is designed to achieve which of the following?',
          questionType: 'MULTI_SELECT',
          explanation: 'The reform aims to streamline approvals, reduce bureaucracy, align with ICH E6(R3) including RBQM, introduce proportionate risk-based requirements, and strengthen participant involvement. It is not designed to re-align with EU CTR 536/2014.',
          marks: 2, order: 14,
          options: [
            { optionText: 'Streamline and integrate the MHRA/HRA approval process', isCorrect: true, order: 1 },
            { optionText: 'Align UK requirements with ICH E6(R3), including RBQM', isCorrect: true, order: 2 },
            { optionText: 'Introduce proportionate requirements based on trial risk', isCorrect: true, order: 3 },
            { optionText: 'Re-align the UK with EU CTR 536/2014', isCorrect: false, order: 4 },
          ],
        },
        {
          questionText: 'An MHRA inspection finding classified as "Critical" means:',
          questionType: 'MULTIPLE_CHOICE',
          explanation: 'A Critical finding indicates that the issue has or could have a serious impact on participant safety, rights, or the integrity of trial data. It may result in trial suspension, prosecution, or a Warning Letter.',
          marks: 1, order: 15,
          options: [
            { optionText: 'The finding has or could have a serious impact on participant safety or data integrity', isCorrect: true, order: 1 },
            { optionText: 'The finding is minor and unlikely to affect data or safety', isCorrect: false, order: 2 },
            { optionText: 'The finding relates only to administrative documentation', isCorrect: false, order: 3 },
            { optionText: 'The finding requires no CAPA as it was self-identified by the site', isCorrect: false, order: 4 },
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
  console.log('═══════════════════════════════════════════════════════');
  console.log('  SEEDING: ICH GCP E6(R3) Fundamentals for UK Clinical Research');
  console.log('  Content format: HTML strings | Videos: YouTube');
  console.log('═══════════════════════════════════════════════════════\n');

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
      title: 'ICH GCP E6(R3) Fundamentals for UK Clinical Research',
      subtitle: 'Master GCP compliance with a focus on MHRA and UK regulatory requirements',
      learningObjectives: [
        'Explain the history of GCP from the Nuremberg Code through ICH E6(R1), R2, and R3',
        'Recite and apply all 13 ICH GCP principles to real clinical trial situations',
        'Describe the roles and responsibilities of Sponsors, Investigators, and CROs',
        'Conduct a GCP-compliant informed consent process including special situations',
        'Maintain an inspection-ready Investigator Site File and Trial Master File',
        'Prepare for and respond to MHRA GCP inspections',
        'Explain the RBQM framework introduced in ICH E6(R3)',
        'Apply GCP in the post-Brexit UK regulatory context',
      ],
      prerequisites: [
        'No prior GCP knowledge required',
        'Basic familiarity with clinical research terminology is helpful but not essential',
      ],
      targetAudience: [
        'Clinical research coordinators and research nurses new to GCP',
        'CRAs and monitors seeking a formal GCP qualification',
        'Sponsor and CRO staff in regulatory, medical, or quality roles',
        'Principal Investigators entering commercial clinical trial research',
        'Healthcare professionals considering a move into clinical research',
      ],
      durationHours: 6,
      difficultyLevel: 'BEGINNER',
      accreditation: 'ACRP Approved | ICH GCP E6(R3) Aligned',
      price: 99.00,
      originalPrice: 149.00,
      isFeatured: true,
      isPublished: true,
      seoTitle: 'ICH GCP E6(R3) Fundamentals for UK Clinical Research | Exon Sciences',
      seoDescription: 'Beginner-friendly ICH GCP E6(R3) course covering all 13 GCP principles, informed consent, essential documents, MHRA inspections, RBQM, and post-Brexit UK regulatory context. ACRP Approved.',
      tags: ['gcp', 'ich', 'uk', 'mhra', 'beginner', 'e6r3', 'clinical-trials'],
    },
  });
  console.log('✅ Course metadata updated.\n');

  // Build modules, lessons, quizzes
  let totalLessons = 0, totalQuestions = 0;

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
          content: l.content,           // stored as HTML string
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
        bodyText: 'This is to certify that the above-named learner has successfully completed "ICH GCP E6(R3) Fundamentals for UK Clinical Research" and demonstrated competency in Good Clinical Practice principles, informed consent, essential documents, GCP inspections, risk-based quality management, and UK regulatory requirements.',
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
  console.log('  Preview: /courses/ich-gcp-e6-fundamentals-uk');
  console.log('═══════════════════════════════════════════════════════\n');
}

main()
  .catch(e => { console.error('❌', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
