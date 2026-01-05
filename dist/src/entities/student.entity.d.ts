import { Center } from "./center.entity";
export declare enum Category {
    U6 = "U6",
    U10 = "U10",
    U15 = "U15"
}
export declare class Student {
    id: number;
    name: string;
    center?: Center;
    attendance: number;
    age: number;
    category: Category;
    amountDue: number;
    amountPaid: number;
    dueResetDate?: string;
    school?: string;
    parentPhoneNumber?: string;
    parentEmail?: string;
    jerseyName?: string;
    imageUrl?: string;
    imageViewUrl?: string;
    cloudinaryPublicId?: string;
    active: boolean;
}
