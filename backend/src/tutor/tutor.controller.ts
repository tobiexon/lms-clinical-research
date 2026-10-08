import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { AskTutorDto } from './tutor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  /**
   * POST /api/v1/tutor/ask
   * Ask the AI tutor a question about the current lesson.
   * Requires JWT auth + enrollment in the lesson's course.
   */
  @Post('ask')
  ask(@Body() dto: AskTutorDto, @Request() req: any) {
    return this.tutorService.ask(dto, req.user.id);
  }
}
