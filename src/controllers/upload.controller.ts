import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "../services/cloudinary.service";
import { StudentsService } from "../services/students.service";

@Controller("upload")
export class UploadController {
  constructor(
    private cloudinary: CloudinaryService,
    private students: StudentsService
  ) {}

  @Post("student/:id/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadStudentImage(@Param("id") id: string, @UploadedFile() file: any) {
    const student = await this.students.findOne(+id);
    if (!student) {
      throw new Error("Student not found");
    }

    // Delete old image if exists in Cloudinary
    if (student.cloudinaryPublicId) {
      await this.cloudinary.deleteImage(student.cloudinaryPublicId);
    }

    // Upload new image to Cloudinary
    const uploaded = await this.cloudinary.uploadImageFromBuffer(
      file.buffer,
      undefined,
      "students"
    );

    // Generate transformed view URL (500x500, auto-crop, auto fmt/quality)
    const transformedUrl = this.cloudinary.getTransformedUrl(
      uploaded.public_id,
      {
        width: 500,
        height: 500,
        crop: "auto",
        gravity: "auto",
        fetch_format: "auto",
        quality: "auto",
      }
    );

    // Update student record
    await this.students.update(+id, {
      imageUrl: uploaded.secure_url,
      imageViewUrl: transformedUrl,
      cloudinaryPublicId: uploaded.public_id,
    });

    return {
      success: true,
      url: uploaded.secure_url,
      viewUrl: transformedUrl,
      publicId: uploaded.public_id,
    };
  }

  @Delete("student/:id/image")
  async deleteStudentImage(@Param("id") id: string) {
    const student = await this.students.findOne(+id);
    if (!student) {
      throw new Error("Student not found");
    }

    if (student.cloudinaryPublicId) {
      await this.cloudinary.deleteImage(student.cloudinaryPublicId);
      await this.students.update(+id, {
        imageUrl: null,
        imageViewUrl: null,
        cloudinaryPublicId: null,
      });
    }

    return { success: true, message: "Image deleted successfully" };
  }
}
