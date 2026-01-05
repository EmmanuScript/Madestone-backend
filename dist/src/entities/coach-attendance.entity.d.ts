import { User } from "./user.entity";
export declare class CoachAttendance {
    id: number;
    coach: User;
    date: string;
    present: boolean;
    markedBy: User;
    createdAt: Date;
}
