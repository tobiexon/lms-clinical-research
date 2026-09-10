import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  /** POST /api/v1/enrollments */
  @Post()
  enroll(@Request() req: any, @Body() body: { courseId: string }) {
    return this.enrollmentsService.enroll(req.user.id, body.courseId);
  }

  /** GET /api/v1/enrollments */
  @Get()
  getMyEnrollments(@Request() req: any) {
    return this.enrollmentsService.getUserEnrollments(req.user.id);
  }

  /** GET /api/v1/enrollments/:courseId */
  @Get(':courseId')
  getEnrollment(@Request() req: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.getEnrollment(req.user.id, courseId);
  }

  /** GET /api/v1/enrollments/:courseId/check */
  @Get(':courseId/check')
  async checkEnrolled(@Request() req: any, @Param('courseId') courseId: string) {
    const enrolled = await this.enrollmentsService.isEnrolled(req.user.id, courseId);
    return { enrolled };
  }
}
