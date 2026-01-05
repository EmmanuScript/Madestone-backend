import { CentersService } from "../services/centers.service";
import { StudentsService } from "../services/students.service";
export declare class CentersController {
    private centers;
    private studentsService;
    constructor(centers: CentersService, studentsService: StudentsService);
    create(body: any): Promise<import("../entities/center.entity").Center>;
    findAll(): Promise<import("../entities/center.entity").Center[]>;
    getStudents(id: string): Promise<import("../entities/student.entity").Student[]>;
}
