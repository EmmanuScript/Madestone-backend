import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  uploadImageFromBuffer(
    buffer: Buffer,
    publicId?: string,
    folder?: string
  ): Promise<{ secure_url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: publicId,
          folder,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("No result from Cloudinary"));
          resolve({
            secure_url: result.secure_url as string,
            public_id: result.public_id as string,
          });
        }
      );

      upload.end(buffer);
    });
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const res = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
      return res.result === "ok" || res.result === "not found";
    } catch (e) {
      return false;
    }
  }

  // Build a transformed URL for consistent avatar display
  getTransformedUrl(
    publicId: string,
    opts?: {
      width?: number;
      height?: number;
      crop?: string;
      gravity?: string;
      quality?: string | number;
      fetch_format?: string;
    }
  ): string {
    const {
      width = 500,
      height = 500,
      crop = "auto",
      gravity = "auto",
      quality = "auto",
      fetch_format = "auto",
    } = opts || {};

    return cloudinary.url(publicId, {
      width,
      height,
      crop: crop as any,
      gravity: gravity as any,
      quality,
      fetch_format,
      secure: true,
      resource_type: "image",
    });
  }
}
