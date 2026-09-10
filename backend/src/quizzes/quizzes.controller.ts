import { Controller, Get, Post, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  /** GET /api/v1/quizzes/:id?courseId=xxx */
  @Get(':id')
  getQuiz(
    @Request() req: any,
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ) {
    return this.quizzesService.getQuizForLearner(id, req.user.id, courseId);
  }

  /** POST /api/v1/quizzes/:id/submit */
  @Post(':id/submit')
  submit(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: { courseId: string; answers: { questionId: string; optionId: string }[] },
  ) {
    return this.quizzesService.submitQuiz(req.user.id, id, body.courseId, body.answers);
  }

  /** GET /api/v1/quizzes/:id/attempts */
  @Get(':id/attempts')
  getAttempts(@Request() req: any, @Param('id') id: string) {
    return this.quizzesService.getMyAttempts(req.user.id, id);
  }
}
