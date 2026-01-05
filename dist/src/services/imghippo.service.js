"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgHippoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const FormData = require("form-data");
let ImgHippoService = class ImgHippoService {
    constructor() {
        this.apiKey = process.env.IMGHIPPO_API_KEY || "YOUR_API_KEY_HERE";
        this.uploadUrl = "https://api.imghippo.com/v1/upload";
        this.deleteUrl = "https://api.imghippo.com/v1/delete";
    }
    async uploadImage(fileBuffer, filename, title) {
        const formData = new FormData();
        formData.append("api_key", this.apiKey);
        formData.append("file", fileBuffer, filename);
        if (title) {
            formData.append("title", title);
        }
        try {
            const response = await axios_1.default.post(this.uploadUrl, formData, {
                headers: formData.getHeaders(),
            });
            if (response.data.success) {
                return {
                    url: response.data.data.url,
                    viewUrl: response.data.data.view_url,
                    extension: response.data.data.extension,
                    size: response.data.data.size,
                };
            }
            else {
                throw new Error(response.data.message || "Upload failed");
            }
        }
        catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
    async deleteImage(imageUrl) {
        try {
            const response = await axios_1.default.post(this.deleteUrl, {
                api_key: this.apiKey,
                Url: imageUrl,
            });
            return response.data.status === 200;
        }
        catch (error) {
            console.error("Failed to delete image:", error.message);
            return false;
        }
    }
};
ImgHippoService = __decorate([
    (0, common_1.Injectable)()
], ImgHippoService);
exports.ImgHippoService = ImgHippoService;
//# sourceMappingURL=imghippo.service.js.map