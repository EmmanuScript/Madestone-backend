import { Response } from "express";
import { AttendanceService } from "../services/attendance.service";
export declare class AttendanceController {
    private att;
    constructor(att: AttendanceService);
    mark(body: {
        studentId: number;
        date: string;
        present: boolean;
        coachId?: number;
    }): Promise<import("../entities/attendance.entity").Attendance>;
    getStudent(id: number, start?: string, end?: string): Promise<import("../entities/attendance.entity").Attendance[]>;
    getCenter(id: number, start?: string, end?: string): Promise<import("../entities/attendance.entity").Attendance[]>;
    exportCenter(id: number, query: any, res: Response): Promise<void>;
}
