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
exports.PreferenceController = void 0;
const common_1 = require("@nestjs/common");
const preference_service_1 = require("../services/preference.service");
const passport_1 = require("@nestjs/passport");
let PreferenceController = class PreferenceController {
    constructor(pref) {
        this.pref = pref;
    }
    async get(req) {
        return this.pref.get();
    }
    async setFee(req, body) {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "CEO")
            throw new common_1.ForbiddenException("Only CEO can set session fee");
        return this.pref.setSessionFee(body.sessionFee);
    }
    async setName(req, body) {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "CEO")
            throw new common_1.ForbiddenException("Only CEO can set session name");
        return this.pref.setSessionName(body.sessionName);
    }
    async reset(req) {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "CEO")
            throw new common_1.ForbiddenException("Only CEO can reset session");
        return this.pref.resetSession();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)("session-fee"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "setFee", null);
__decorate([
    (0, common_1.Patch)("session-name"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "setName", null);
__decorate([
    (0, common_1.Post)("reset-session"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreferenceController.prototype, "reset", null);
PreferenceController = __decorate([
    (0, common_1.Controller)("preferences"),
    __metadata("design:paramtypes", [preference_service_1.PreferenceService])
], PreferenceController);
exports.PreferenceController = PreferenceController;
//# sourceMappingURL=preference.controller.js.map