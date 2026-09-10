import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  /** GET /api/v1/certificates/verify/:code — PUBLIC */
  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.certificatesService.verifyCertificate(code);
  }

  /** GET /api/v1/certificates — protected */
  @UseGuards(JwtAuthGuard)
  @Get()
  getMyCertificates(@Request() req: any) {
    return this.certificatesService.getUserCertificates(req.user.id);
  }

  /** POST /api/v1/certificates/issue — protected */
  @UseGuards(JwtAuthGuard)
  @Post('issue')
  issue(@Request() req: any, @Body() body: { courseId: string }) {
    return this.certificatesService.issueCertificate(req.user.id, body.courseId);
  }
}
