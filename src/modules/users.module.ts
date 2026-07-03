import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Attendance } from "../entities/attendance.entity";
import { CoachAttendance } from "../entities/coach-attendance.entity";
import { UsersService } from "../services/users.service";
import { UsersController } from "../controllers/users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, Attendance, CoachAttendance])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
