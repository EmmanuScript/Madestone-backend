import { Response } from "express";
import { CoachAttendanceService } from "../services/coach-attendance.service";
export declare class CoachAttendanceController {
    private service;
    constructor(service: CoachAttendanceService);
    mark(body: {
        coachId: number;
        date: string;
        present: boolean;
        markedById?: number;
    }): Promise<import("../entities/coach-attendance.entity").CoachAttendance>;
    getCoach(id: number, start?: string, end?: string): Promise<import("../entities/coach-attendance.entity").CoachAttendance[]>;
    getCenter(id: number, start?: string, end?: string): Promise<import("../entities/coach-attendance.entity").CoachAttendance[]>;
    exportCenter(id: number, query: any, res: Response): Promise<void>;
}
