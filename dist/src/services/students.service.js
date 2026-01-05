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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../entities/student.entity");
const payment_entity_1 = require("../entities/payment.entity");
let StudentsService = class StudentsService {
    constructor(repo, payments) {
        this.repo = repo;
        this.payments = payments;
    }
    create(data) {
        const s = this.repo.create(data);
        return this.repo.save(s);
    }
    findAll() {
        return this.repo.find({ relations: ["center"] });
    }
    findByCenter(centerId) {
        return this.repo.find({
            where: { center: { id: centerId } },
            relations: ["center"],
        });
    }
    async addPayment(id, amount) {
        const student = await this.repo.findOne({ where: { id } });
        if (!student)
            throw new Error("Student not found");
        student.amountPaid = (student.amountPaid || 0) + amount;
        await this.repo.save(student);
        const p = this.payments.create({
            student,
            amount,
            date: new Date().toISOString().slice(0, 10),
        });
        await this.payments.save(p);
        return { student, payment: p };
    }
    findOne(id) {
        return this.repo.findOne({ where: { id }, relations: ["center"] });
    }
    async update(id, data) {
        const student = await this.repo.findOne({ where: { id } });
        if (!student)
            throw new Error("Student not found");
        Object.assign(student, data);
        return this.repo.save(student);
    }
};
StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map