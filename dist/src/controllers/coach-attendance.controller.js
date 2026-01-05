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
exports.CoachAttendanceController = void 0;
const common_1 = require("@nestjs/common");
const coach_attendance_service_1 = require("../services/coach-attendance.service");
let CoachAttendanceController = class CoachAttendanceController {
    constructor(service) {
        this.service = service;
    }
    mark(body) {
        return this.service.mark(body.coachId, body.date, body.present, body.markedById);
    }
    getCoach(id, start, end) {
        return this.service.getForCoach(id, start, end);
    }
    getCenter(id, start, end) {
        return this.service.getForCenter(id, start, end);
    }
    async exportCenter(id, query, res) {
        const { start, end } = query || {};
        const csv = await this.service.exportCenterCsv(id, start, end);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=coach-attendance-center-${id}.csv`);
        res.send(csv);
    }
};
__decorate([
    (0, common_1.Post)("mark"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoachAttendanceController.prototype, "mark", null);
__decorate([
    (0, common_1.Get)("coach/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)("start")),
    __param(2, (0, common_1.Query)("end")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], CoachAttendanceController.prototype, "getCoach", null);
__decorate([
    (0, common_1.Get)("center/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)("start")),
    __param(2, (0, common_1.Query)("end")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], CoachAttendanceController.prototype, "getCenter", null);
__decorate([
    (0, common_1.Get)("export/center/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CoachAttendanceController.prototype, "exportCenter", null);
CoachAttendanceController = __decorate([
    (0, common_1.Controller)("coach-attendance"),
    __metadata("design:paramtypes", [coach_attendance_service_1.CoachAttendanceService])
], CoachAttendanceController);
exports.CoachAttendanceController = CoachAttendanceController;
//# sourceMappingURL=coach-attendance.controller.js.map