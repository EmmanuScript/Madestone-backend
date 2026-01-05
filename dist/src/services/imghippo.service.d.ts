/// <reference types="node" />
/// <reference types="node" />
export declare class ImgHippoService {
    private readonly apiKey;
    private readonly uploadUrl;
    private readonly deleteUrl;
    uploadImage(fileBuffer: Buffer, filename: string, title?: string): Promise<{
        url: string;
        viewUrl: string;
        extension: string;
        size: number;
    }>;
    deleteImage(imageUrl: string): Promise<boolean>;
}
