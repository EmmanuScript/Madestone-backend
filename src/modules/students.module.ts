import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Payment } from "../entities/payment.entity";
import { StudentsController } from "../controllers/students.controller";
import { StudentsService } from "../services/students.service";

@Module({
  imports: [TypeOrmModule.forFeature([Student, Payment])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
