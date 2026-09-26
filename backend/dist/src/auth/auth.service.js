"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AuthService = class AuthService {
    constructor(prisma, usersService, jwtService, config, notifications) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.config = config;
        this.notifications = notifications;
    }
    async register(dto) {
        const exists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (exists) {
            throw new common_1.ConflictException('An account with this email already exists');
        }
        const passwordHash = await bcrypt.hash(dto.password, 12);
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
        this.notifications.sendWelcomeEmail({ email: user.email, firstName: user.firstName })
            .catch(() => { });
        return { user, ...tokens };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
    async refreshToken(token) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });
        if (!stored || stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token expired or invalid');
        }
        await this.prisma.refreshToken.delete({ where: { token } });
        const tokens = await this.generateTokens(stored.user.id, stored.user.email, stored.user.role);
        return tokens;
    }
    async logout(token) {
        await this.prisma.refreshToken.deleteMany({ where: { token } });
        return { message: 'Logged out successfully' };
    }
    async generateMagicToken(userId) {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 48);
        const magic = await this.prisma.magicToken.create({
            data: { userId, expiresAt },
        });
        return magic.token;
    }
    async magicLogin(token) {
        const magic = await this.prisma.magicToken.findUnique({
            where: { token },
            include: { user: true },
        });
        if (!magic) {
            throw new common_1.UnauthorizedException('Invalid or expired link');
        }
        if (magic.used) {
            throw new common_1.UnauthorizedException('This login link has already been used. Please log in normally.');
        }
        if (magic.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('This login link has expired. Please log in with your email and password.');
        }
        if (!magic.user.isActive) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
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
    async generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRY', '7d'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: { token: refreshToken, userId, expiresAt },
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map