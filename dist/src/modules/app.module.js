"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth.module");
const users_module_1 = require("./users.module");
const centers_module_1 = require("./centers.module");
const students_module_1 = require("./students.module");
const attendance_module_1 = require("./attendance.module");
const coach_attendance_module_1 = require("./coach-attendance.module");
const upload_module_1 = require("./upload.module");
const user_entity_1 = require("../entities/user.entity");
const center_entity_1 = require("../entities/center.entity");
const student_entity_1 = require("../entities/student.entity");
const attendance_entity_1 = require("../entities/attendance.entity");
const coach_attendance_entity_1 = require("../entities/coach-attendance.entity");
const payment_entity_1 = require("../entities/payment.entity");
const preference_entity_1 = require("../entities/preference.entity");
const preference_module_1 = require("./preference.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("DATABASE_HOST"),
                    port: +configService.get("DATABASE_PORT"),
                    username: configService.get("DATABASE_USERNAME"),
                    password: configService.get("DATABASE_PASSWORD"),
                    database: configService.get("DATABASE_NAME"),
                    entities: [
                        user_entity_1.User,
                        center_entity_1.Center,
                        student_entity_1.Student,
                        attendance_entity_1.Attendance,
                        coach_attendance_entity_1.CoachAttendance,
                        payment_entity_1.Payment,
                        preference_entity_1.Preference,
                    ],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            centers_module_1.CentersModule,
            students_module_1.StudentsModule,
            attendance_module_1.AttendanceModule,
            coach_attendance_module_1.CoachAttendanceModule,
            upload_module_1.UploadModule,
            preference_module_1.PreferenceModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map