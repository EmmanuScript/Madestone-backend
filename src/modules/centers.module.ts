import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Center } from "../entities/center.entity";
import { CentersController } from "../controllers/centers.controller";
import { CentersService } from "../services/centers.service";
import { StudentsModule } from "./students.module";

@Module({
  imports: [TypeOrmModule.forFeature([Center]), StudentsModule],
  controllers: [CentersController],
  providers: [CentersService],
  exports: [CentersService],
})
export class CentersModule {}
