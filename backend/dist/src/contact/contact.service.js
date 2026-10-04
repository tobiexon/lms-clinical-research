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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("../notifications/notifications.service");
let ContactService = class ContactService {
    constructor(notifications) {
        this.notifications = notifications;
    }
    async submit(data) {
        if (!data.name?.trim() || !data.email?.trim() || !data.subject?.trim() || !data.message?.trim()) {
            throw new common_1.BadRequestException('All fields are required');
        }
        await this.notifications.sendContactFormEmail({
            name: data.name.trim(),
            email: data.email.trim(),
            subject: data.subject.trim(),
            message: data.message.trim(),
        });
        return { message: 'Your message has been sent. We will get back to you within 1 business day.' };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], ContactService);
//# sourceMappingURL=contact.service.js.map