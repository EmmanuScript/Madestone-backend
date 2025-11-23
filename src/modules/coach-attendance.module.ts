import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachAttendance } from "../entities/coach-attendance.entity";
import { User } from "../entities/user.entity";
import { CoachAttendanceService } from "../services/coach-attendance.service";
import { CoachAttendanceController } from "../controllers/coach-attendance.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CoachAttendance, User])],
  controllers: [CoachAttendanceController],
  providers: [CoachAttendanceService],
  exports: [CoachAttendanceService],
})
export class CoachAttendanceModule {}
