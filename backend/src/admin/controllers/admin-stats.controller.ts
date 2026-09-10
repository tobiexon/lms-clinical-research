import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminStatsService } from '../services/admin-stats.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/stats')
export class AdminStatsController {
  constructor(private svc: AdminStatsService) {}

  @Get()
  getDashboardStats() {
    return this.svc.getDashboardStats();
  }
}
