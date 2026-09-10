import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Allows only users with ADMIN, SUPER_ADMIN, or CONTENT_EDITOR roles.
 * Apply after JwtAuthGuard.
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR'];
    if (!user || !allowed.includes(user.role)) {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}
