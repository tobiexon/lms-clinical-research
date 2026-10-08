"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const notifications_module_1 = require("./notifications/notifications.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const courses_module_1 = require("./courses/courses.module");
const programs_module_1 = require("./programs/programs.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
const progress_module_1 = require("./progress/progress.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const certificates_module_1 = require("./certificates/certificates.module");
const admin_module_1 = require("./admin/admin.module");
const payments_module_1 = require("./payments/payments.module");
const subscribe_module_1 = require("./subscribe/subscribe.module");
const legal_module_1 = require("./legal/legal.module");
const contact_module_1 = require("./contact/contact.module");
const tutor_module_1 = require("./tutor/tutor.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            prisma_module_1.PrismaModule,
            notifications_module_1.NotificationsModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            programs_module_1.ProgramsModule,
            enrollments_module_1.EnrollmentsModule,
            progress_module_1.ProgressModule,
            quizzes_module_1.QuizzesModule,
            certificates_module_1.CertificatesModule,
            admin_module_1.AdminModule,
            payments_module_1.PaymentsModule,
            subscribe_module_1.SubscribeModule,
            legal_module_1.LegalModule,
            contact_module_1.ContactModule,
            tutor_module_1.TutorModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map