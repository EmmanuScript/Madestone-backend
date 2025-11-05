import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as FormData from "form-data";

@Injectable()
export class ImgHippoService {
  private readonly apiKey = process.env.IMGHIPPO_API_KEY || "YOUR_API_KEY_HERE";
  private readonly uploadUrl = "https://api.imghippo.com/v1/upload";
  private readonly deleteUrl = "https://api.imghippo.com/v1/delete";

  async uploadImage(
    fileBuffer: Buffer,
    filename: string,
    title?: string
  ): Promise<{
    url: string;
    viewUrl: string;
    extension: string;
    size: number;
  }> {
    const formData = new FormData();
    formData.append("api_key", this.apiKey);
    formData.append("file", fileBuffer, filename);
    if (title) {
      formData.append("title", title);
    }

    try {
      const response = await axios.post(this.uploadUrl, formData, {
        headers: formData.getHeaders(),
      });

      if (response.data.success) {
        return {
          url: response.data.data.url,
          viewUrl: response.data.data.view_url,
          extension: response.data.data.extension,
          size: response.data.data.size,
        };
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      const response = await axios.post(this.deleteUrl, {
        api_key: this.apiKey,
        Url: imageUrl,
      });

      return response.data.status === 200;
    } catch (error) {
      console.error("Failed to delete image:", error.message);
      return false;
    }
  }
}
