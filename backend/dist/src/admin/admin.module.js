"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_courses_controller_1 = require("./controllers/admin-courses.controller");
const admin_programs_controller_1 = require("./controllers/admin-programs.controller");
const admin_instructors_controller_1 = require("./controllers/admin-instructors.controller");
const admin_users_controller_1 = require("./controllers/admin-users.controller");
const admin_stats_controller_1 = require("./controllers/admin-stats.controller");
const admin_payments_controller_1 = require("./controllers/admin-payments.controller");
const admin_courses_service_1 = require("./services/admin-courses.service");
const admin_programs_service_1 = require("./services/admin-programs.service");
const admin_instructors_service_1 = require("./services/admin-instructors.service");
const admin_users_service_1 = require("./services/admin-users.service");
const admin_stats_service_1 = require("./services/admin-stats.service");
const payments_module_1 = require("../payments/payments.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [payments_module_1.PaymentsModule],
        controllers: [
            admin_courses_controller_1.AdminCoursesController,
            admin_programs_controller_1.AdminProgramsController,
            admin_instructors_controller_1.AdminInstructorsController,
            admin_users_controller_1.AdminUsersController,
            admin_stats_controller_1.AdminStatsController,
            admin_payments_controller_1.AdminPaymentsController,
        ],
        providers: [
            admin_courses_service_1.AdminCoursesService,
            admin_programs_service_1.AdminProgramsService,
            admin_instructors_service_1.AdminInstructorsService,
            admin_users_service_1.AdminUsersService,
            admin_stats_service_1.AdminStatsService,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map