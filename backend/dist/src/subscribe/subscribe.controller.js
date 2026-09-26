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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeController = void 0;
const common_1 = require("@nestjs/common");
const subscribe_service_1 = require("./subscribe.service");
const subscribe_dto_1 = require("./dto/subscribe.dto");
let SubscribeController = class SubscribeController {
    constructor(subscribeService) {
        this.subscribeService = subscribeService;
    }
    async subscribe(dto, req) {
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            req.socket?.remoteAddress ||
            undefined;
        const result = await this.subscribeService.subscribe({ ...dto, ipAddress: ip });
        return {
            success: true,
            message: 'You\'re subscribed! Check your inbox for a confirmation email.',
        };
    }
};
exports.SubscribeController = SubscribeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscribe_dto_1.SubscribeDto, Object]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "subscribe", null);
exports.SubscribeController = SubscribeController = __decorate([
    (0, common_1.Controller)('subscribe'),
    __metadata("design:paramtypes", [subscribe_service_1.SubscribeService])
], SubscribeController);
//# sourceMappingURL=subscribe.controller.js.map