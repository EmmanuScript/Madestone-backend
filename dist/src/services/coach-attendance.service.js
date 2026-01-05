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
exports.CoachAttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coach_attendance_entity_1 = require("../entities/coach-attendance.entity");
const user_entity_1 = require("../entities/user.entity");
let CoachAttendanceService = class CoachAttendanceService {
    constructor(repo, users) {
        this.repo = repo;
        this.users = users;
    }
    async mark(coachId, date, present, markedById) {
        const coach = await this.users.findOne({
            where: { id: coachId, role: user_entity_1.UserRole.COACH },
        });
        if (!coach)
            throw new Error("Coach not found");
        const attendance = this.repo.create({ coach, date, present });
        if (markedById) {
            const markedBy = await this.users.findOne({ where: { id: markedById } });
            if (markedBy)
                attendance.markedBy = markedBy;
        }
        return await this.repo.save(attendance);
    }
    async getForCoach(coachId, start, end) {
        const qb = this.repo
            .createQueryBuilder("ca")
            .leftJoinAndSelect("ca.coach", "coach");
        qb.where("coach.id = :coachId", { coachId });
        if (start)
            qb.andWhere("ca.date >= :start", { start });
        if (end)
            qb.andWhere("ca.date <= :end", { end });
        qb.orderBy("ca.date", "ASC");
        return qb.getMany();
    }
    async getForCenter(centerId, start, end) {
        const qb = this.repo
            .createQueryBuilder("ca")
            .leftJoinAndSelect("ca.coach", "coach")
            .leftJoinAndSelect("coach.center", "center");
        qb.where("center.id = :centerId", { centerId });
        if (start)
            qb.andWhere("ca.date >= :start", { start });
        if (end)
            qb.andWhere("ca.date <= :end", { end });
        qb.orderBy("coach.name", "ASC").addOrderBy("ca.date", "ASC");
        return qb.getMany();
    }
    async exportCenterCsv(centerId, start, end) {
        const records = await this.getForCenter(centerId, start, end);
        const lines = ["Coach Name,Date,Present"];
        for (const r of records) {
            const name = r.coach && r.coach.name ? r.coach.name.replace(/\"/g, '"') : "";
            const date = r.date;
            const present = r.present ? "Present" : "Absent";
            const safeName = name.includes(",")
                ? `"${name.replace(/"/g, '"')}"`
                : name;
            lines.push(`${safeName},${date},${present}`);
        }
        return lines.join("\n");
    }
};
CoachAttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coach_attendance_entity_1.CoachAttendance)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CoachAttendanceService);
exports.CoachAttendanceService = CoachAttendanceService;
//# sourceMappingURL=coach-attendance.service.js.map