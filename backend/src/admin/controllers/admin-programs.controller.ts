import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminProgramsService } from '../services/admin-programs.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/programs')
export class AdminProgramsController {
  constructor(private svc: AdminProgramsService) {}

  @Get()                    list()                                              { return this.svc.listPrograms(); }
  @Get(':id')               get(@Param('id') id: string)                       { return this.svc.getProgram(id); }
  @Post()                   create(@Body() b: any)                             { return this.svc.createProgram(b); }
  @Put(':id')               update(@Param('id') id: string, @Body() b: any)   { return this.svc.updateProgram(id, b); }
  @Delete(':id')            remove(@Param('id') id: string)                    { return this.svc.deleteProgram(id); }
  @Patch(':id/publish')     togglePublish(@Param('id') id: string)             { return this.svc.togglePublished(id); }
}
