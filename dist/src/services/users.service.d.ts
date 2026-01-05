import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    findByUsername(username: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findCoaches(): Promise<User[]>;
    findAdmins(): Promise<User[]>;
    setActive(id: number, active: boolean): Promise<User>;
    findOne(id: number): Promise<User>;
    updateProfile(id: number, updates: Partial<User>): Promise<User>;
    delete(id: number): Promise<{
        success: boolean;
    }>;
    changePassword(id: number, newPassword: string): Promise<User>;
}
