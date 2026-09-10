import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** GET /api/v1/users/me */
  @Get('me')
  async getMe(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  /** PATCH /api/v1/users/me */
  @Patch('me')
  async updateMe(@Request() req: any, @Body() body: any) {
    return this.usersService.updateProfile(req.user.id, body);
  }
}
