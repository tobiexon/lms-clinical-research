/**
 * NotificationsService — uses Mailtrap HTTP API
 * No nodemailer dependency — pure fetch calls
 * Credentials: sandbox.smtp.mailtrap.io credentials in .env
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private config: ConfigService) {}

  private get apiToken(): string {
    // Use dedicated API token — different from SMTP password
    return this.config.get<string>('MAILTRAP_API_TOKEN', '');
  }

  private get fromEmail(): string {
    return this.config.get<string>('FROM_EMAIL', 'noreply@clinicalresearchnexus.com');
  }

  private get fromName(): string {
    return this.config.get<string>('FROM_NAME', 'Clinical Research Nexus');
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    const token = this.apiToken;
    const sandboxId = this.config.get<string>('MAILTRAP_SANDBOX_ID', '');

    if (!token || token === 'REPLACE_WITH_YOUR_API_TOKEN_FROM_MAILTRAP_IO_API_TOKENS_PAGE' || !sandboxId || sandboxId === 'your_inbox_id_number_here') {
      this.logger.warn(`Mailtrap API token or sandbox ID not configured — skipping email to ${to}`);
      return;
    }

    try {
      const body = {
        from: { email: this.fromEmail, name: this.fromName },
        to: [{ email: to }],
        subject,
        html,
      };

      // Mailtrap Sandbox API — requires sandbox inbox ID in path
      // Header is 'Api-Token', not 'Bearer'
      const res = await fetch(`https://sandbox.api.mailtrap.io/api/send/${sandboxId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': token,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json() as any;
        this.logger.log(`✅ Email sent to ${to} — "${subject}" [id: ${data?.message_ids?.[0] || 'ok'}]`);
      } else {
        const err = await res.text();
        this.logger.error(`❌ Mailtrap API ${res.status} for ${to}: ${err}`);
      }
    } catch (err: any) {
      this.logger.error(`❌ Email send failed to ${to}: ${err.message}`);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // WELCOME EMAIL — sent on registration
  // ─────────────────────────────────────────────────────────────
  async sendWelcomeEmail(user: { email: string; firstName: string }) {
    const subject = 'Welcome to Clinical Research Nexus 🎓';
    const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Welcome, ${user.firstName}!</h1>
      <p style="color:#555;font-size:16px;margin:0 0 20px">
        Your account has been created on <strong>Clinical Research Nexus</strong> — 
        the UK's premier online clinical research training platform.
      </p>
      <p style="color:#555;font-size:15px;margin:0 0 24px">
        Browse and enrol in our ICH GCP, Pharmacovigilance, Regulatory Affairs, and CRA training courses.
      </p>
      ${this.ctaButton('Browse Courses', 'http://localhost:3000/courses')}
      <p style="color:#888;font-size:13px;margin:24px 0 0">
        If you didn't create this account, please ignore this email.
      </p>
    `);
    return this.send(user.email, subject, html);
  }

  // ─────────────────────────────────────────────────────────────
  // PAYMENT CONFIRMATION
  // ─────────────────────────────────────────────────────────────
  async sendPaymentConfirmationEmail(data: {
    email: string;
    firstName: string;
    lastName: string;
    paymentId: string;
    totalAmount: number;
    currency: string;
    paidAt: Date;
    items: { courseTitle: string; unitPrice: number }[];
    magicLoginUrl?: string;  // ← one-time auto-login link
  }) {
    const subject = `Payment Confirmed — Receipt #${data.paymentId.slice(-8).toUpperCase()}`;
    const itemRows = data.items.map((item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#333">${item.courseTitle}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#333;text-align:right">
          ${data.currency} ${item.unitPrice.toFixed(2)}
        </td>
      </tr>
    `).join('');

    // Use magic link if available, otherwise standard dashboard link
    const dashboardUrl = data.magicLoginUrl || 'http://localhost:3000/dashboard';
    const buttonText = data.magicLoginUrl ? 'Access My Courses Now →' : 'Go to My Dashboard';

    const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 4px">Payment Confirmed ✓</h1>
      <p style="color:#888;font-size:13px;margin:0 0 24px">
        Receipt #${data.paymentId.slice(-8).toUpperCase()} · 
        ${new Date(data.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <p style="color:#555;font-size:15px;margin:0 0 20px">
        Hi <strong>${data.firstName}</strong>, your payment has been processed successfully. 
        You now have access to:
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 0;border-bottom:2px solid #0d2233;color:#0d2233;font-size:13px">Course</th>
            <th style="text-align:right;padding:8px 0;border-bottom:2px solid #0d2233;color:#0d2233;font-size:13px">Amount</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr>
            <td style="padding:12px 0 0;font-weight:bold;color:#0d2233;font-size:16px">Total Paid</td>
            <td style="padding:12px 0 0;font-weight:bold;color:#0d2233;font-size:16px;text-align:right">
              ${data.currency} ${data.totalAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      ${this.ctaButton(buttonText, dashboardUrl)}
      ${data.magicLoginUrl ? `
      <p style="color:#888;font-size:12px;margin:8px 0 16px">
        ☝️ This button logs you in automatically. It can only be used once and expires in 48 hours.
      </p>` : ''}
      <p style="color:#888;font-size:13px;margin:20px 0 0">
        Questions? Contact us at 
        <a href="mailto:support@clinicalresearchnexus.com" style="color:#c9a84c">support@clinicalresearchnexus.com</a>
      </p>
    `);
    return this.send(data.email, subject, html);
  }

  // ─────────────────────────────────────────────────────────────
  // ENROLMENT CONFIRMATION
  // ─────────────────────────────────────────────────────────────
  async sendEnrolmentConfirmationEmail(data: {
    email: string;
    firstName: string;
    courseTitle: string;
    courseSlug: string;
  }) {
    const subject = `You're enrolled: ${data.courseTitle}`;
    const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Enrolment Confirmed 🎉</h1>
      <p style="color:#555;font-size:16px;margin:0 0 16px">
        Hi <strong>${data.firstName}</strong>, you're now enrolled in:
      </p>
      <div style="background:#f0f9ff;border-left:4px solid #c9a84c;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px">
        <p style="margin:0;font-weight:bold;font-size:18px;color:#0d2233">${data.courseTitle}</p>
      </div>
      <p style="color:#555;font-size:14px;margin:0 0 24px">
        You have <strong>lifetime access</strong> to all course materials and a certificate upon completion.
      </p>
      ${this.ctaButton('Start Learning Now', `http://localhost:3000/courses/${data.courseSlug}`)}
    `);
    return this.send(data.email, subject, html);
  }

  // ─────────────────────────────────────────────────────────────
  // COURSE COMPLETION
  // ─────────────────────────────────────────────────────────────
  async sendCourseCompletionEmail(data: {
    email: string;
    firstName: string;
    courseTitle: string;
    verificationCode: string;
  }) {
    const subject = `Certificate Issued: ${data.courseTitle} 🏅`;
    const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Congratulations, ${data.firstName}! 🏅</h1>
      <p style="color:#555;font-size:16px;margin:0 0 16px">
        You have successfully completed <strong>${data.courseTitle}</strong>.
      </p>
      <div style="background:#f9f6ee;border:1px solid #c9a84c;padding:16px 20px;border-radius:8px;margin:0 0 24px;text-align:center">
        <p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px">Verification Code</p>
        <p style="margin:0;font-family:monospace;font-size:20px;font-weight:bold;color:#0d2233;letter-spacing:3px">
          ${data.verificationCode.slice(-12).toUpperCase()}
        </p>
      </div>
      ${this.ctaButton('Download My Certificate', 'http://localhost:3000/certificates')}
    `);
    return this.send(data.email, subject, html);
  }

  // ─────────────────────────────────────────────────────────────
  // NEWSLETTER SUBSCRIPTION
  // ─────────────────────────────────────────────────────────────
  async sendSubscriptionConfirmationEmail(email: string) {
    const subject = 'Subscribed to Clinical Research Nexus updates';
    const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Subscription Confirmed ✓</h1>
      <p style="color:#555;font-size:16px;margin:0 0 20px">
        You're now subscribed! You'll receive new course announcements, UK regulatory updates, 
        career tips, and exclusive discounts.
      </p>
      ${this.ctaButton('Explore Courses', 'http://localhost:3000/courses')}
    `);
    return this.send(email, subject, html);
  }

  // ─────────────────────────────────────────────────────────────
  // PASSWORD RESET
  // ─────────────────────────────────────────────────────────────
  async sendPasswordResetEmail(data: { email: string; firstName: string; resetToken: string }) {
    const resetUrl = `http://localhost:3000/reset-password?token=${data.resetToken}`;
    const subject = 'Reset your Clinical Research Nexus password';
    const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Password Reset Request</h1>
      <p style="color:#555;font-size:16px;margin:0 0 16px">
        Hi <strong>${data.firstName}</strong>, click below to set a new password. 
        This link expires in <strong>1 hour</strong>.
      </p>
      ${this.ctaButton('Reset Password', resetUrl)}
      <p style="color:#888;font-size:13px;margin:20px 0 0">
        If you didn't request this, ignore this email.
      </p>
    `);
    return this.send(data.email, subject, html);
  }

  // ─────────────────────────────────────────────────────────────
  // BASE TEMPLATE
  // ─────────────────────────────────────────────────────────────
  private baseTemplate(content: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr>
    <td style="background:#055d69;padding:24px 32px;border-radius:12px 12px 0 0">
      <span style="font-size:20px;font-weight:900;color:#67e8f9">Clinical Research Nexus</span><br>
      <span style="font-size:11px;color:#a5f3fc;letter-spacing:2px;text-transform:uppercase">by Exon Sciences</span>
    </td>
  </tr>
  <tr>
    <td style="background:#fff;padding:40px 32px;border-radius:0 0 12px 12px">
      ${content}
    </td>
  </tr>
  <tr>
    <td style="padding:20px 0;text-align:center">
      <p style="margin:0;font-size:12px;color:#999">
        © ${new Date().getFullYear()} Clinical Research Nexus by Exon Sciences Ltd · UK GDPR Compliant
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
  }

  private ctaButton(text: string, url: string): string {
    return `<table cellpadding="0" cellspacing="0" style="margin:0 0 8px">
  <tr>
    <td style="border-radius:8px;background:#c9a84c">
      <a href="${url}" style="display:inline-block;padding:14px 32px;color:#fff;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px">${text}</a>
    </td>
  </tr>
</table>`;
  }
}
