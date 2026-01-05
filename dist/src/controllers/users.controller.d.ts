import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    create(body: any): Promise<User>;
    findAll(): Promise<User[]>;
    coaches(): Promise<User[]>;
    admins(): Promise<User[]>;
    setActive(id: string, b: any): Promise<User>;
    getOne(id: string): Promise<User>;
    updateProfile(id: string, updates: Partial<User>): Promise<User>;
    upload(id: string, file: any): {
        filename: any;
    };
    remove(id: string): Promise<{
        success: boolean;
    }>;
    changePassword(id: string, body: {
        newPassword: string;
    }, req: any): Promise<User>;
}
