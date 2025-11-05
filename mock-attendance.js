"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var student_entity_1 = require("./src/entities/student.entity");
var attendance_entity_1 = require("./src/entities/attendance.entity");
var dotenv = require("dotenv");
dotenv.config();
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [student_entity_1.Student, attendance_entity_1.Attendance],
    synchronize: true
});
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var studentRepo, attendanceRepo, students, startDate, _i, students_1, student, currentDate, present, attendance, existing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    studentRepo = AppDataSource.getRepository(student_entity_1.Student);
                    attendanceRepo = AppDataSource.getRepository(attendance_entity_1.Attendance);
                    return [4 /*yield*/, studentRepo.find()];
                case 2:
                    students = _a.sent();
                    startDate = new Date();
                    startDate.setMonth(startDate.getMonth() - 3); // Go back 3 months
                    _i = 0, students_1 = students;
                    _a.label = 3;
                case 3:
                    if (!(_i < students_1.length)) return [3 /*break*/, 10];
                    student = students_1[_i];
                    console.log("Generating attendance for student: ".concat(student.name));
                    currentDate = new Date(startDate);
                    _a.label = 4;
                case 4:
                    if (!(currentDate <= new Date())) return [3 /*break*/, 9];
                    if (!(currentDate.getDay() === 6)) return [3 /*break*/, 8];
                    present = Math.random() < 0.85;
                    attendance = attendanceRepo.create({
                        student: { id: student.id },
                        date: currentDate.toISOString().split('T')[0],
                        present: present
                    });
                    return [4 /*yield*/, attendanceRepo.findOne({
                            where: {
                                student: { id: student.id },
                                date: currentDate.toISOString().split('T')[0]
                            }
                        })];
                case 5:
                    existing = _a.sent();
                    if (!!existing) return [3 /*break*/, 7];
                    return [4 /*yield*/, attendanceRepo.save(attendance)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    console.log("Created attendance for ".concat(student.name, " on ").concat(currentDate.toISOString().split('T')[0], ": ").concat(present ? 'Present' : 'Absent'));
                    _a.label = 8;
                case 8:
                    // Move to next day
                    currentDate.setDate(currentDate.getDate() + 1);
                    return [3 /*break*/, 4];
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10:
                    console.log("Mock attendance data generation complete!");
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
run()["catch"](function (err) {
    console.error(err);
    process.exit(1);
});
