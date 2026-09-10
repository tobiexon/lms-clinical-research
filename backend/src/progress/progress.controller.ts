import { Controller, Post, Get, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  /** POST /api/v1/progress/complete */
  @Post('complete')
  markComplete(
    @Request() req: any,
    @Body() body: { courseId: string; lessonId: string; timeSpentSecs?: number },
  ) {
    return this.progressService.markLessonComplete(
      req.user.id,
      body.courseId,
      body.lessonId,
      body.timeSpentSecs || 0,
    );
  }

  /** GET /api/v1/progress/:courseId */
  @Get(':courseId')
  getCourseProgress(@Request() req: any, @Param('courseId') courseId: string) {
    return this.progressService.getCourseProgress(req.user.id, courseId);
  }
}
