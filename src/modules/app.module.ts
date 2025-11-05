import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth.module";
import { UsersModule } from "./users.module";
import { CentersModule } from "./centers.module";
import { StudentsModule } from "./students.module";
import { AttendanceModule } from "./attendance.module";
import { UploadModule } from "./upload.module";
import { User } from "../entities/user.entity";
import { Center } from "../entities/center.entity";
import { Student } from "../entities/student.entity";
import { Attendance } from "../entities/attendance.entity";
import { Payment } from "../entities/payment.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: +configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USERNAME"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        entities: [User, Center, Student, Attendance, Payment],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CentersModule,
    StudentsModule,
    AttendanceModule,
    UploadModule,
  ],
})
export class AppModule {}
