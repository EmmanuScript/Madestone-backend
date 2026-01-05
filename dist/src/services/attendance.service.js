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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("../entities/attendance.entity");
const student_entity_1 = require("../entities/student.entity");
const user_entity_1 = require("../entities/user.entity");
let AttendanceService = class AttendanceService {
    constructor(repo, students, users) {
        this.repo = repo;
        this.students = students;
        this.users = users;
    }
    async mark(studentId, date, present, coachId) {
        const student = await this.students.findOne({ where: { id: studentId } });
        if (!student)
            throw new Error("Student not found");
        const a = this.repo.create({ student, date, present });
        if (coachId) {
            const coach = await this.users.findOne({ where: { id: coachId } });
            if (coach)
                a.markedBy = coach;
        }
        await this.repo.save(a);
        if (present) {
            student.attendance = (student.attendance || 0) + 1;
            await this.students.save(student);
        }
        return a;
    }
    async getForStudent(studentId, start, end) {
        const qb = this.repo
            .createQueryBuilder("a")
            .leftJoinAndSelect("a.student", "student");
        qb.where("student.id = :studentId", { studentId });
        if (start)
            qb.andWhere("a.date >= :start", { start });
        if (end)
            qb.andWhere("a.date <= :end", { end });
        qb.orderBy("a.date", "ASC");
        return qb.getMany();
    }
    async getForCenter(centerId, start, end) {
        const qb = this.repo
            .createQueryBuilder("a")
            .leftJoinAndSelect("a.student", "student")
            .leftJoinAndSelect("student.center", "center");
        qb.where("center.id = :centerId", { centerId });
        if (start)
            qb.andWhere("a.date >= :start", { start });
        if (end)
            qb.andWhere("a.date <= :end", { end });
        qb.orderBy("student.name", "ASC").addOrderBy("a.date", "ASC");
        return qb.getMany();
    }
    async exportCenterCsv(centerId, start, end) {
        const records = await this.getForCenter(centerId, start, end);
        const lines = ["Student Name,Date,Present"];
        for (const r of records) {
            const name = r.student && r.student.name ? r.student.name.replace(/\"/g, '"') : "";
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
AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map