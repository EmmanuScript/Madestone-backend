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
exports.CoachAttendance = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let CoachAttendance = class CoachAttendance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CoachAttendance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], CoachAttendance.prototype, "coach", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CoachAttendance.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], CoachAttendance.prototype, "present", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], CoachAttendance.prototype, "markedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CoachAttendance.prototype, "createdAt", void 0);
CoachAttendance = __decorate([
    (0, typeorm_1.Entity)("coach_attendance")
], CoachAttendance);
exports.CoachAttendance = CoachAttendance;
//# sourceMappingURL=coach-attendance.entity.js.map