import { Repository } from "typeorm";
import { Attendance } from "../entities/attendance.entity";
import { Student } from "../entities/student.entity";
import { User } from "../entities/user.entity";
export declare class AttendanceService {
    private repo;
    private students;
    private users;
    constructor(repo: Repository<Attendance>, students: Repository<Student>, users: Repository<User>);
    mark(studentId: number, date: string, present: boolean, coachId?: number): Promise<Attendance>;
    getForStudent(studentId: number, start?: string, end?: string): Promise<Attendance[]>;
    getForCenter(centerId: number, start?: string, end?: string): Promise<Attendance[]>;
    exportCenterCsv(centerId: number, start?: string, end?: string): Promise<string>;
}
