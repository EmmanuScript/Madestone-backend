import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attendance } from "../entities/attendance.entity";
import { Student } from "../entities/student.entity";
import { User } from "../entities/user.entity";
import { AttendanceController } from "../controllers/attendance.controller";
import { AttendanceService } from "../services/attendance.service";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student, User])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
