import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    validateUser(username: string, pass: string): Promise<import("../entities/user.entity").User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
