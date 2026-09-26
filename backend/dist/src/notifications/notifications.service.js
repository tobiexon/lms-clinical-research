"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(NotificationsService_1.name);
    }
    get apiToken() {
        return this.config.get('MAILTRAP_API_TOKEN', '');
    }
    get fromEmail() {
        return this.config.get('FROM_EMAIL', 'noreply@clinicalresearchnexus.com');
    }
    get fromName() {
        return this.config.get('FROM_NAME', 'Clinical Research Nexus');
    }
    get frontendUrl() {
        return this.config.get('FRONTEND_URL', 'http://localhost:3000');
    }
    async send(to, subject, html) {
        const token = this.apiToken;
        const sandboxId = this.config.get('MAILTRAP_SANDBOX_ID', '');
        if (!token || !sandboxId) {
            this.logger.warn(`Mailtrap not configured — skipping email to ${to}`);
            return;
        }
        try {
            const res = await fetch(`https://sandbox.api.mailtrap.io/api/send/${sandboxId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Api-Token': token },
                body: JSON.stringify({
                    from: { email: this.fromEmail, name: this.fromName },
                    to: [{ email: to }],
                    subject,
                    html,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                this.logger.log(`✅ Email sent to ${to} — "${subject}" [${data?.message_ids?.[0] || 'ok'}]`);
            }
            else {
                const err = await res.text();
                this.logger.error(`❌ Mailtrap ${res.status} for ${to}: ${err}`);
            }
        }
        catch (err) {
            this.logger.error(`❌ Email failed to ${to}: ${err.message}`);
        }
    }
    async sendWelcomeEmail(user) {
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Welcome, ${user.firstName}!</h1>
      <p style="color:#555;font-size:16px;margin:0 0 20px">
        Your account has been created on <strong>Clinical Research Nexus</strong>.
        Browse and enrol in our ICH GCP, Pharmacovigilance, Regulatory Affairs, and CRA courses.
      </p>
      ${this.cta('Browse Courses', this.frontendUrl + '/courses')}
      <p style="color:#888;font-size:13px;margin:24px 0 0">If you didn't create this account, ignore this email.</p>
    `);
        return this.send(user.email, 'Welcome to Clinical Research Nexus 🎓', html);
    }
    async sendNewAccountWithPaymentEmail(data) {
        const subject = `Welcome to Clinical Research Nexus — Payment Confirmed #${data.paymentId.slice(-8).toUpperCase()}`;
        const accessUrl = data.magicLoginUrl || (this.frontendUrl + '/login');
        const rows = data.items.map(i => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee">${i.courseTitle}</td>
       <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right">${data.currency} ${i.unitPrice.toFixed(2)}</td></tr>`).join('');
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 4px">Welcome &amp; Payment Confirmed ✓</h1>
      <p style="color:#888;font-size:13px;margin:0 0 24px">
        Receipt #${data.paymentId.slice(-8).toUpperCase()} · ${new Date(data.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <p style="color:#555;font-size:15px;margin:0 0 20px">
        Hi <strong>${data.firstName}</strong>, your payment is confirmed and your account is ready.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
        <thead><tr>
          <th style="text-align:left;padding:8px 0;border-bottom:2px solid #0d2233;color:#0d2233;font-size:13px">Course</th>
          <th style="text-align:right;padding:8px 0;border-bottom:2px solid #0d2233;color:#0d2233;font-size:13px">Amount</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr>
          <td style="padding:12px 0 0;font-weight:bold;color:#0d2233;font-size:16px">Total Paid</td>
          <td style="padding:12px 0 0;font-weight:bold;color:#0d2233;font-size:16px;text-align:right">${data.currency} ${data.totalAmount.toFixed(2)}</td>
        </tr></tfoot>
      </table>
      <div style="background:#f0f9ff;border:1px solid #c9a84c;padding:16px 20px;border-radius:8px;margin:0 0 20px">
        <p style="margin:0 0 6px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px">Your Login Credentials</p>
        <p style="margin:0 0 4px;font-size:14px;color:#333"><strong>Email:</strong> ${data.email}</p>
        <p style="margin:0;font-size:14px;color:#333">
          <strong>Temporary Password:</strong>
          <span style="font-family:monospace;background:#eee;padding:2px 8px;border-radius:4px;font-size:15px;margin-left:8px">${data.temporaryPassword}</span>
        </p>
      </div>
      ${this.cta('Access My Courses Now →', accessUrl)}
      ${data.magicLoginUrl ? '<p style="color:#888;font-size:12px;margin:10px 0 0">☝️ One-time link · valid 48 hours</p>' : ''}
      <p style="color:#888;font-size:13px;margin:20px 0 0">
        Questions? <a href="mailto:support@clinicalresearchnexus.com" style="color:#c9a84c">support@clinicalresearchnexus.com</a>
      </p>
    `);
        return this.send(data.email, subject, html);
    }
    async sendPaymentConfirmationEmail(data) {
        const subject = `Payment Confirmed — Receipt #${data.paymentId.slice(-8).toUpperCase()}`;
        const dashboardUrl = data.magicLoginUrl || (this.frontendUrl + '/dashboard');
        const buttonText = data.magicLoginUrl ? 'Access My Courses Now →' : 'Go to My Dashboard';
        const rows = data.items.map(i => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee">${i.courseTitle}</td>
       <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right">${data.currency} ${i.unitPrice.toFixed(2)}</td></tr>`).join('');
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 4px">Payment Confirmed ✓</h1>
      <p style="color:#888;font-size:13px;margin:0 0 24px">
        Receipt #${data.paymentId.slice(-8).toUpperCase()} · ${new Date(data.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <p style="color:#555;font-size:15px;margin:0 0 20px">
        Hi <strong>${data.firstName}</strong>, your payment has been processed. You now have access to:
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
        <thead><tr>
          <th style="text-align:left;padding:8px 0;border-bottom:2px solid #0d2233;color:#0d2233;font-size:13px">Course</th>
          <th style="text-align:right;padding:8px 0;border-bottom:2px solid #0d2233;color:#0d2233;font-size:13px">Amount</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr>
          <td style="padding:12px 0 0;font-weight:bold;color:#0d2233;font-size:16px">Total Paid</td>
          <td style="padding:12px 0 0;font-weight:bold;color:#0d2233;font-size:16px;text-align:right">${data.currency} ${data.totalAmount.toFixed(2)}</td>
        </tr></tfoot>
      </table>
      ${this.cta(buttonText, dashboardUrl)}
      ${data.magicLoginUrl ? '<p style="color:#888;font-size:12px;margin:8px 0 16px">☝️ This button logs you in automatically (one-time, 48 hours).</p>' : ''}
      <p style="color:#888;font-size:13px;margin:20px 0 0">
        Questions? <a href="mailto:support@clinicalresearchnexus.com" style="color:#c9a84c">support@clinicalresearchnexus.com</a>
      </p>
    `);
        return this.send(data.email, subject, html);
    }
    async sendEnrolmentConfirmationEmail(data) {
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Enrolment Confirmed 🎉</h1>
      <p style="color:#555;font-size:16px;margin:0 0 16px">Hi <strong>${data.firstName}</strong>, you're now enrolled in:</p>
      <div style="background:#f0f9ff;border-left:4px solid #c9a84c;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px">
        <p style="margin:0;font-weight:bold;font-size:18px;color:#0d2233">${data.courseTitle}</p>
      </div>
      <p style="color:#555;font-size:14px;margin:0 0 24px">You have <strong>lifetime access</strong> and a certificate upon completion.</p>
      ${this.cta('Start Learning Now', this.frontendUrl + '/courses/' + data.courseSlug)}
    `);
        return this.send(data.email, `You're enrolled: ${data.courseTitle}`, html);
    }
    async sendCourseCompletionEmail(data) {
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Congratulations, ${data.firstName}! 🏅</h1>
      <p style="color:#555;font-size:16px;margin:0 0 16px">You have successfully completed <strong>${data.courseTitle}</strong>.</p>
      <div style="background:#f9f6ee;border:1px solid #c9a84c;padding:16px 20px;border-radius:8px;margin:0 0 24px;text-align:center">
        <p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px">Verification Code</p>
        <p style="margin:0;font-family:monospace;font-size:20px;font-weight:bold;color:#0d2233;letter-spacing:3px">${data.verificationCode.slice(-12).toUpperCase()}</p>
      </div>
      ${this.cta('Download My Certificate', this.frontendUrl + '/certificates')}
    `);
        return this.send(data.email, `Certificate Issued: ${data.courseTitle} 🏅`, html);
    }
    async sendSubscriptionConfirmationEmail(email) {
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Subscription Confirmed ✓</h1>
      <p style="color:#555;font-size:16px;margin:0 0 20px">
        You'll receive new course announcements, UK regulatory updates, career tips, and exclusive discounts.
      </p>
      ${this.cta('Explore Courses', this.frontendUrl + '/courses')}
    `);
        return this.send(email, 'Subscribed to Clinical Research Nexus updates', html);
    }
    async sendPasswordResetEmail(data) {
        const resetUrl = this.frontendUrl + '/reset-password?token=' + data.resetToken;
        const html = this.baseTemplate(`
      <h1 style="color:#0d2233;margin:0 0 8px">Password Reset Request</h1>
      <p style="color:#555;font-size:16px;margin:0 0 16px">Hi <strong>${data.firstName}</strong>, click below to set a new password. Expires in 1 hour.</p>
      ${this.cta('Reset Password', resetUrl)}
      <p style="color:#888;font-size:13px;margin:20px 0 0">If you didn't request this, ignore this email.</p>
    `);
        return this.send(data.email, 'Reset your Clinical Research Nexus password', html);
    }
    baseTemplate(content) {
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
  <tr><td style="background:#fff;padding:40px 32px;border-radius:0 0 12px 12px">${content}</td></tr>
  <tr>
    <td style="padding:20px 0;text-align:center">
      <p style="margin:0;font-size:12px;color:#999">© ${new Date().getFullYear()} Clinical Research Nexus by Exon Sciences Ltd · UK GDPR Compliant</p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
    }
    cta(text, url) {
        return `<table cellpadding="0" cellspacing="0" style="margin:0 0 8px">
  <tr>
    <td style="border-radius:8px;background:#c9a84c">
      <a href="${url}" style="display:inline-block;padding:14px 32px;color:#fff;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px">${text}</a>
    </td>
  </tr>
</table>`;
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map