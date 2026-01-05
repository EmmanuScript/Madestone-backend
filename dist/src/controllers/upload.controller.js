"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../services/cloudinary.service");
const students_service_1 = require("../services/students.service");
const users_service_1 = require("../services/users.service");
let UploadController = class UploadController {
    constructor(cloudinary, students, users) {
        this.cloudinary = cloudinary;
        this.students = students;
        this.users = users;
    }
    async uploadStudentImage(id, file) {
        const maxFileSize = 200 * 1024;
        if (!file || !file.buffer) {
            throw new Error("No file provided");
        }
        if (file.size > maxFileSize) {
            throw new Error(`File size (${(file.size / 1024).toFixed(2)}KB) exceeds maximum allowed size of 200KB`);
        }
        const student = await this.students.findOne(+id);
        if (!student) {
            throw new Error("Student not found");
        }
        if (student.cloudinaryPublicId) {
            await this.cloudinary.deleteImage(student.cloudinaryPublicId);
        }
        const uploaded = await this.cloudinary.uploadImageFromBuffer(file.buffer, undefined, "students");
        const transformedUrl = this.cloudinary.getTransformedUrl(uploaded.public_id, {
            width: 500,
            height: 500,
            crop: "auto",
            gravity: "auto",
            fetch_format: "auto",
            quality: "auto",
        });
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
    async deleteStudentImage(id) {
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
    async uploadUserImage(id, file) {
        const maxFileSize = 200 * 1024;
        if (!file || !file.buffer) {
            throw new Error("No file provided");
        }
        if (file.size > maxFileSize) {
            throw new Error(`File size (${(file.size / 1024).toFixed(2)}KB) exceeds maximum allowed size of 200KB`);
        }
        const user = await this.users.findOne(+id);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.cloudinaryPublicId) {
            await this.cloudinary.deleteImage(user.cloudinaryPublicId);
        }
        const uploaded = await this.cloudinary.uploadImageFromBuffer(file.buffer, undefined, "users");
        const transformedUrl = this.cloudinary.getTransformedUrl(uploaded.public_id, {
            width: 500,
            height: 500,
            crop: "auto",
            gravity: "auto",
            fetch_format: "auto",
            quality: "auto",
        });
        await this.users.updateProfile(+id, {
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
    async deleteUserImage(id) {
        const user = await this.users.findOne(+id);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.cloudinaryPublicId) {
            await this.cloudinary.deleteImage(user.cloudinaryPublicId);
            await this.users.updateProfile(+id, {
                imageUrl: null,
                imageViewUrl: null,
                cloudinaryPublicId: null,
            });
        }
        return { success: true, message: "Image deleted successfully" };
    }
};
__decorate([
    (0, common_1.Post)("student/:id/image"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadStudentImage", null);
__decorate([
    (0, common_1.Delete)("student/:id/image"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteStudentImage", null);
__decorate([
    (0, common_1.Post)("user/:id/image"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadUserImage", null);
__decorate([
    (0, common_1.Delete)("user/:id/image"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteUserImage", null);
UploadController = __decorate([
    (0, common_1.Controller)("upload"),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        students_service_1.StudentsService,
        users_service_1.UsersService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map