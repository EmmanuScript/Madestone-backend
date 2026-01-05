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
exports.Student = exports.Category = void 0;
const typeorm_1 = require("typeorm");
const center_entity_1 = require("./center.entity");
var Category;
(function (Category) {
    Category["U6"] = "U6";
    Category["U10"] = "U10";
    Category["U15"] = "U15";
})(Category = exports.Category || (exports.Category = {}));
let Student = class Student {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => center_entity_1.Center, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", center_entity_1.Center)
], Student.prototype, "center", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-enum", enum: Category, default: Category.U10 }),
    __metadata("design:type", String)
], Student.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "amountDue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "amountPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "dueResetDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "parentPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "parentEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "jerseyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "imageViewUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "cloudinaryPublicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Student.prototype, "active", void 0);
Student = __decorate([
    (0, typeorm_1.Entity)()
], Student);
exports.Student = Student;
//# sourceMappingURL=student.entity.js.map