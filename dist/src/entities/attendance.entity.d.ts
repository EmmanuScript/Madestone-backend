import { Student } from "./student.entity";
import { User } from "./user.entity";
export declare class Attendance {
    id: number;
    student: Student;
    date: string;
    present: boolean;
    markedBy?: User;
}
