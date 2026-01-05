import { Center } from "./center.entity";
export declare enum UserRole {
    CEO = "CEO",
    ADMIN = "ADMIN",
    COACH = "COACH"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    name: string;
    image?: string;
    imageUrl?: string;
    imageViewUrl?: string;
    cloudinaryPublicId?: string;
    role: UserRole;
    center?: Center;
    active: boolean;
    birthMonthDay?: string;
}
