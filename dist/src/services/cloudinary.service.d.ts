/// <reference types="node" />
/// <reference types="node" />
export declare class CloudinaryService {
    constructor();
    uploadImageFromBuffer(buffer: Buffer, publicId?: string, folder?: string): Promise<{
        secure_url: string;
        public_id: string;
    }>;
    deleteImage(publicId: string): Promise<boolean>;
    getTransformedUrl(publicId: string, opts?: {
        width?: number;
        height?: number;
        crop?: string;
        gravity?: string;
        quality?: string | number;
        fetch_format?: string;
    }): string;
}
