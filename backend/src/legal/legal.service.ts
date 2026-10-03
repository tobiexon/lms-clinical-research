import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEFAULTS = {
  PRIVACY_POLICY: {
    title: 'Privacy Policy',
    content: `# Privacy Policy

**Last updated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}**

## 1. Who We Are
Clinical Research Nexus is operated by Exon Sciences Ltd, a company registered in England and Wales. We provide online clinical research training courses and related educational services.

**Contact:** support@clinicalresearchnexus.co.uk

## 2. Information We Collect
We collect information you provide when you register, purchase a course, or contact us:
- **Identity data:** first name, last name, email address
- **Payment data:** handled securely by Stripe — we never store card details
- **Usage data:** courses accessed, progress, quiz results, certificates earned
- **Technical data:** IP address, browser type, device information

## 3. How We Use Your Information
- To provide and manage your course access
- To process payments and issue receipts
- To issue certificates of completion
- To send important account and course updates
- To improve our platform and services

## 4. Legal Basis for Processing
We process your data under the following lawful bases (UK GDPR):
- **Contract:** processing necessary to deliver the services you purchased
- **Legitimate interests:** improving our platform, fraud prevention
- **Consent:** marketing communications (you may withdraw at any time)

## 5. Data Retention
We retain your account data for as long as your account is active and for 7 years thereafter for legal and accounting purposes. You may request deletion of your account at any time.

## 6. Your Rights
Under UK GDPR you have the right to:
- Access your personal data
- Correct inaccurate data
- Request erasure ("right to be forgotten")
- Object to processing
- Data portability

To exercise any right, contact us at support@clinicalresearchnexus.co.uk

## 7. Cookies
We use essential cookies to keep you logged in and functional cookies to remember your preferences. We do not use advertising cookies.

## 8. Third-Party Services
- **Stripe** — payment processing (see stripe.com/privacy)
- **Render** — cloud hosting
- **Vercel** — website delivery

## 9. Changes to This Policy
We will notify you of material changes by email or prominent notice on our website.`,
  },
  TERMS_OF_SERVICE: {
    title: 'Terms of Service',
    content: `# Terms of Service

**Last updated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}**

## 1. Acceptance of Terms
By registering for or purchasing a course on Clinical Research Nexus, you agree to these Terms of Service. If you do not agree, please do not use our services.

## 2. About Us
Clinical Research Nexus is operated by Exon Sciences Ltd, registered in England and Wales. Our courses are designed for professionals in clinical research, pharmacovigilance, and regulatory affairs.

## 3. Course Access
- Upon successful payment, you receive **lifetime access** to the purchased course(s)
- Access is granted to the individual who purchased the course — accounts are non-transferable
- You may access course materials from any device using your account credentials

## 4. Payment and Pricing
- All prices are displayed in GBP (£) and include any applicable VAT
- Payment is processed securely via Stripe
- Your enrolment is confirmed only after payment has been successfully processed

## 5. Refund Policy
We offer a **5-day money-back guarantee**. If you are not satisfied with a course, contact us within 5 days of purchase at support@clinicalresearchnexus.co.uk for a full refund. Refunds will not be issued after a certificate has been issued for the course.

## 6. Intellectual Property
All course content — including videos, text, quizzes, and downloadable resources — is the intellectual property of Exon Sciences Ltd or its licensors. You may not:
- Copy, reproduce, or redistribute course materials
- Share your account login with others
- Use course content for commercial purposes

## 7. Certificates
Certificates are issued upon successful completion of all course requirements including passing any assessments. Certificates are issued to the name on your account and are non-transferable.

## 8. Acceptable Use
You agree not to:
- Use the platform for any unlawful purpose
- Attempt to gain unauthorised access to any part of the platform
- Upload or transmit malicious code or content

## 9. Disclaimers
Course content is for educational purposes and does not constitute medical, legal, or regulatory advice. Always consult qualified professionals for specific guidance.

## 10. Limitation of Liability
To the maximum extent permitted by law, Exon Sciences Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.

## 11. Governing Law
These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.

## 12. Changes to Terms
We reserve the right to update these terms. We will notify you of significant changes by email. Continued use of the platform after changes constitutes acceptance of the new terms.

## 13. Contact
Exon Sciences Ltd  
Email: support@clinicalresearchnexus.co.uk  
Website: clinicalresearchnexus.co.uk`,
  },
};

@Injectable()
export class LegalService {
  constructor(private prisma: PrismaService) {}

  async getDocument(type: 'PRIVACY_POLICY' | 'TERMS_OF_SERVICE') {
    let doc = await this.prisma.legalDocument.findUnique({ where: { type } });

    // Auto-seed defaults on first access
    if (!doc) {
      const defaults = DEFAULTS[type];
      doc = await this.prisma.legalDocument.create({
        data: { type, title: defaults.title, content: defaults.content },
      });
    }

    return doc;
  }

  async updateDocument(
    type: 'PRIVACY_POLICY' | 'TERMS_OF_SERVICE',
    data: { title?: string; content: string },
    adminId?: string,
  ) {
    return this.prisma.legalDocument.upsert({
      where: { type },
      update: { ...data, updatedBy: adminId },
      create: {
        type,
        title: data.title || DEFAULTS[type].title,
        content: data.content,
        updatedBy: adminId,
      },
    });
  }
}
