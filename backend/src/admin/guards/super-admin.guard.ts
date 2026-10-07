import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Restricts access to SUPER_ADMIN role ONLY.
 * Used for payout settings — no other admin role may change banking details.
 * Apply AFTER JwtAuthGuard.
 */
@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException(
        'Only Super Admins can access payout settings',
      );
    }
    return true;
  }
}
