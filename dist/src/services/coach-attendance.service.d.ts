import { Repository } from "typeorm";
import { CoachAttendance } from "../entities/coach-attendance.entity";
import { User } from "../entities/user.entity";
export declare class CoachAttendanceService {
    private repo;
    private users;
    constructor(repo: Repository<CoachAttendance>, users: Repository<User>);
    mark(coachId: number, date: string, present: boolean, markedById?: number): Promise<CoachAttendance>;
    getForCoach(coachId: number, start?: string, end?: string): Promise<CoachAttendance[]>;
    getForCenter(centerId: number, start?: string, end?: string): Promise<CoachAttendance[]>;
    exportCenterCsv(centerId: number, start?: string, end?: string): Promise<string>;
}
