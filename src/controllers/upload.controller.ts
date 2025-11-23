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
import { UsersService } from "../services/users.service";

@Controller("upload")
export class UploadController {
  constructor(
    private cloudinary: CloudinaryService,
    private students: StudentsService,
    private users: UsersService
  ) {}

  @Post("student/:id/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadStudentImage(@Param("id") id: string, @UploadedFile() file: any) {
    // Validate file size (200KB max)
    const maxFileSize = 200 * 1024; // 200KB in bytes
    if (!file || !file.buffer) {
      throw new Error("No file provided");
    }
    if (file.size > maxFileSize) {
      throw new Error(
        `File size (${(file.size / 1024).toFixed(
          2
        )}KB) exceeds maximum allowed size of 200KB`
      );
    }

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

  @Post("user/:id/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadUserImage(@Param("id") id: string, @UploadedFile() file: any) {
    // Validate file size (200KB max)
    const maxFileSize = 200 * 1024; // 200KB in bytes
    if (!file || !file.buffer) {
      throw new Error("No file provided");
    }
    if (file.size > maxFileSize) {
      throw new Error(
        `File size (${(file.size / 1024).toFixed(
          2
        )}KB) exceeds maximum allowed size of 200KB`
      );
    }

    const user = await this.users.findOne(+id);
    if (!user) {
      throw new Error("User not found");
    }

    // Delete old image if exists in Cloudinary (if it has cloudinaryPublicId)
    if ((user as any).cloudinaryPublicId) {
      await this.cloudinary.deleteImage((user as any).cloudinaryPublicId);
    }

    // Upload new image to Cloudinary
    const uploaded = await this.cloudinary.uploadImageFromBuffer(
      file.buffer,
      undefined,
      "users"
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

    // Update user record
    await this.users.updateProfile(+id, {
      imageUrl: uploaded.secure_url,
      imageViewUrl: transformedUrl,
      cloudinaryPublicId: uploaded.public_id,
    } as any);

    return {
      success: true,
      url: uploaded.secure_url,
      viewUrl: transformedUrl,
      publicId: uploaded.public_id,
    };
  }

  @Delete("user/:id/image")
  async deleteUserImage(@Param("id") id: string) {
    const user = await this.users.findOne(+id);
    if (!user) {
      throw new Error("User not found");
    }

    if ((user as any).cloudinaryPublicId) {
      await this.cloudinary.deleteImage((user as any).cloudinaryPublicId);
      await this.users.updateProfile(+id, {
        imageUrl: null,
        imageViewUrl: null,
        cloudinaryPublicId: null,
      } as any);
    }

    return { success: true, message: "Image deleted successfully" };
  }
}
