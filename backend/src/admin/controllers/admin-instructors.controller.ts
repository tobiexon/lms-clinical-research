import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminInstructorsService } from '../services/admin-instructors.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/instructors')
export class AdminInstructorsController {
  constructor(private svc: AdminInstructorsService) {}

  @Get()           list()                                              { return this.svc.list(); }
  @Post()          create(@Body() b: any)                             { return this.svc.create(b); }
  @Put(':id')      update(@Param('id') id: string, @Body() b: any)   { return this.svc.update(id, b); }
  @Delete(':id')   remove(@Param('id') id: string)                    { return this.svc.delete(id); }
}
