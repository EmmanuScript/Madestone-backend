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
exports.PreferenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const preference_entity_1 = require("../entities/preference.entity");
const student_entity_1 = require("../entities/student.entity");
let PreferenceService = class PreferenceService {
    constructor(prefs, students) {
        this.prefs = prefs;
        this.students = students;
    }
    async get() {
        let pref = await this.prefs.findOne({ where: { id: 1 } });
        if (!pref) {
            pref = this.prefs.create({ sessionFee: 0, sessionName: "" });
            pref = await this.prefs.save(pref);
        }
        return pref;
    }
    async setSessionFee(sessionFee) {
        if (sessionFee < 0)
            throw new Error("Session fee cannot be negative");
        const pref = await this.get();
        pref.sessionFee = sessionFee;
        await this.prefs.save(pref);
        await this.students
            .createQueryBuilder()
            .update(student_entity_1.Student)
            .set({ amountDue: sessionFee })
            .execute();
        return pref;
    }
    async setSessionName(sessionName) {
        const pref = await this.get();
        pref.sessionName = sessionName || "";
        await this.prefs.save(pref);
        return pref;
    }
    async resetSession() {
        const pref = await this.get();
        await this.students
            .createQueryBuilder()
            .update(student_entity_1.Student)
            .set({ amountPaid: 0, amountDue: pref.sessionFee })
            .execute();
        return { ok: true, preference: pref };
    }
};
PreferenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(preference_entity_1.Preference)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PreferenceService);
exports.PreferenceService = PreferenceService;
//# sourceMappingURL=preference.service.js.map