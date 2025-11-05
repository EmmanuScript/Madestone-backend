import { Module } from "@nestjs/common";
import { UploadController } from "../controllers/upload.controller";
import { CloudinaryService } from "../services/cloudinary.service";
import { StudentsModule } from "./students.module";

@Module({
  imports: [StudentsModule],
  controllers: [UploadController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class UploadModule {}
