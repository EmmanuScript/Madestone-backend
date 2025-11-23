import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Preference } from "../entities/preference.entity";
import { Student } from "../entities/student.entity";
import { PreferenceService } from "../services/preference.service";
import { PreferenceController } from "../controllers/preference.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Preference, Student])],
  providers: [PreferenceService],
  controllers: [PreferenceController],
  exports: [PreferenceService],
})
export class PreferenceModule {}
