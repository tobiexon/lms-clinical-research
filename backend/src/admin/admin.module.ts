import { Module } from '@nestjs/common';
import { AdminCoursesController } from './controllers/admin-courses.controller';
import { AdminProgramsController } from './controllers/admin-programs.controller';
import { AdminInstructorsController } from './controllers/admin-instructors.controller';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminStatsController } from './controllers/admin-stats.controller';
import { AdminCoursesService } from './services/admin-courses.service';
import { AdminProgramsService } from './services/admin-programs.service';
import { AdminInstructorsService } from './services/admin-instructors.service';
import { AdminUsersService } from './services/admin-users.service';
import { AdminStatsService } from './services/admin-stats.service';

@Module({
  controllers: [
    AdminCoursesController,
    AdminProgramsController,
    AdminInstructorsController,
    AdminUsersController,
    AdminStatsController,
  ],
  providers: [
    AdminCoursesService,
    AdminProgramsService,
    AdminInstructorsService,
    AdminUsersService,
    AdminStatsService,
  ],
})
export class AdminModule {}
