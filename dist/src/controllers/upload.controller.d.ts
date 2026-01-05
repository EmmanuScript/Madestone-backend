import { CloudinaryService } from "../services/cloudinary.service";
import { StudentsService } from "../services/students.service";
import { UsersService } from "../services/users.service";
export declare class UploadController {
    private cloudinary;
    private students;
    private users;
    constructor(cloudinary: CloudinaryService, students: StudentsService, users: UsersService);
    uploadStudentImage(id: string, file: any): Promise<{
        success: boolean;
        url: string;
        viewUrl: string;
        publicId: string;
    }>;
    deleteStudentImage(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    uploadUserImage(id: string, file: any): Promise<{
        success: boolean;
        url: string;
        viewUrl: string;
        publicId: string;
    }>;
    deleteUserImage(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
