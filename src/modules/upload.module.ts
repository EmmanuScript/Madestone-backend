import { Module } from "@nestjs/common";
import { UploadController } from "../controllers/upload.controller";
import { CloudinaryService } from "../services/cloudinary.service";
import { StudentsModule } from "./students.module";
import { UsersModule } from "./users.module";

@Module({
  imports: [StudentsModule, UsersModule],
  controllers: [UploadController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class UploadModule {}
