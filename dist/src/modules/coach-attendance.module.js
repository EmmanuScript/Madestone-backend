"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachAttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coach_attendance_entity_1 = require("../entities/coach-attendance.entity");
const user_entity_1 = require("../entities/user.entity");
const coach_attendance_service_1 = require("../services/coach-attendance.service");
const coach_attendance_controller_1 = require("../controllers/coach-attendance.controller");
let CoachAttendanceModule = class CoachAttendanceModule {
};
CoachAttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([coach_attendance_entity_1.CoachAttendance, user_entity_1.User])],
        controllers: [coach_attendance_controller_1.CoachAttendanceController],
        providers: [coach_attendance_service_1.CoachAttendanceService],
        exports: [coach_attendance_service_1.CoachAttendanceService],
    })
], CoachAttendanceModule);
exports.CoachAttendanceModule = CoachAttendanceModule;
//# sourceMappingURL=coach-attendance.module.js.map