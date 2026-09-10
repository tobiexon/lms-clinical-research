import { Controller, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminUsersService } from '../services/admin-users.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private svc: AdminUsersService) {}

  @Get()
  list(@Query('page') page = '1', @Query('limit') limit = '30', @Query('search') search?: string) {
    return this.svc.listUsers(parseInt(page), parseInt(limit), search);
  }

  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.svc.updateUserRole(id, body.role);
  }

  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: string) {
    return this.svc.toggleUserActive(id);
  }
}
