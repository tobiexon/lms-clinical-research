import { Controller, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LegalService } from './legal.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../admin/guards/admin.guard';

@Controller('legal')
export class LegalController {
  constructor(private svc: LegalService) {}

  // ── Public endpoints ─────────────────────────────────────────
  @Get('privacy-policy')
  getPrivacyPolicy() {
    return this.svc.getDocument('PRIVACY_POLICY');
  }

  @Get('terms-of-service')
  getTermsOfService() {
    return this.svc.getDocument('TERMS_OF_SERVICE');
  }

  // ── Admin endpoints ──────────────────────────────────────────
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':type')
  updateDocument(
    @Param('type') type: string,
    @Body() body: { title?: string; content: string },
    @Request() req: any,
  ) {
    const docType = type === 'privacy-policy' ? 'PRIVACY_POLICY' : 'TERMS_OF_SERVICE';
    return this.svc.updateDocument(docType, body, req.user?.sub);
  }
}
