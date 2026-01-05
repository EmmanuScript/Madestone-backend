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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    uploadImageFromBuffer(buffer, publicId, folder) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "image",
                public_id: publicId,
                folder,
                overwrite: true,
            }, (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error("No result from Cloudinary"));
                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            });
            upload.end(buffer);
        });
    }
    async deleteImage(publicId) {
        try {
            const res = await cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: "image",
            });
            return res.result === "ok" || res.result === "not found";
        }
        catch (e) {
            return false;
        }
    }
    getTransformedUrl(publicId, opts) {
        const { width = 500, height = 500, crop = "auto", gravity = "auto", quality = "auto", fetch_format = "auto", } = opts || {};
        return cloudinary_1.v2.url(publicId, {
            width,
            height,
            crop: crop,
            gravity: gravity,
            quality,
            fetch_format,
            secure: true,
            resource_type: "image",
        });
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map