import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private notifications: NotificationsService,
  ) {}

  // -------------------------------------------------------
  // Register new learner
  // -------------------------------------------------------
  async register(dto: RegisterDto) {
    // Check email not already taken
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('An account with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        country: dto.country || 'GB',
        timezone: dto.timezone || 'Europe/London',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        country: true,
        createdAt: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Send welcome email (non-blocking)
    this.notifications.sendWelcomeEmail({ email: user.email, firstName: user.firstName })
      .catch(() => {}); // fire-and-forget

    return { user, ...tokens };
  }

  // -------------------------------------------------------
  // Login
  // -------------------------------------------------------
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        country: user.country,
      },
      ...tokens,
    };
  }

  // -------------------------------------------------------
  // Refresh access token
  // -------------------------------------------------------
  async refreshToken(token: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }

    // Rotate — delete old, issue new
    await this.prisma.refreshToken.delete({ where: { token } });

    const tokens = await this.generateTokens(
      stored.user.id,
      stored.user.email,
      stored.user.role,
    );
    return tokens;
  }

  // -------------------------------------------------------
  // Logout — revoke refresh token
  // -------------------------------------------------------
  async logout(token: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token } });
    return { message: 'Logged out successfully' };
  }

  // -------------------------------------------------------
  // Generate a magic login token for a user
  // Used in payment emails — single-use, 48hr expiry
  // -------------------------------------------------------
  async generateMagicToken(userId: string): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    const magic = await this.prisma.magicToken.create({
      data: { userId, expiresAt },
    });
    return magic.token;
  }

  // -------------------------------------------------------
  // Magic link login — validate token, return JWT pair
  // -------------------------------------------------------
  async magicLogin(token: string) {
    const magic = await this.prisma.magicToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!magic) {
      throw new UnauthorizedException('Invalid or expired link');
    }
    if (magic.used) {
      throw new UnauthorizedException('This login link has already been used. Please log in normally.');
    }
    if (magic.expiresAt < new Date()) {
      throw new UnauthorizedException('This login link has expired. Please log in with your email and password.');
    }
    if (!magic.user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Mark as used — one-time only
    await this.prisma.magicToken.update({
      where: { token },
      data: { used: true },
    });

    const tokens = await this.generateTokens(magic.user.id, magic.user.email, magic.user.role);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: magic.user.id,
        email: magic.user.email,
        firstName: magic.user.firstName,
        lastName: magic.user.lastName,
        role: magic.user.role,
      },
    };
  }

  // -------------------------------------------------------
  // Private: generate access + refresh token pair
  // -------------------------------------------------------
  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwtService.sign(payload);

    // Refresh token — longer lived, stored in DB
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRY', '7d'),
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId, expiresAt },
    });

    return { accessToken, refreshToken };
  }
}
