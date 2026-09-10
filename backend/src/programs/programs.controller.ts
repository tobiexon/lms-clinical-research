import { Controller, Get, Param } from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  /** GET /api/v1/programs */
  @Get()
  async getAllPrograms() {
    return this.programsService.getAllPrograms();
  }

  /** GET /api/v1/programs/:slug */
  @Get(':slug')
  async getProgramBySlug(@Param('slug') slug: string) {
    return this.programsService.getProgramBySlug(slug);
  }
}
