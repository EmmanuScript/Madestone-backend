import { StudentsService } from "../services/students.service";
export declare class StudentsController {
    private students;
    constructor(students: StudentsService);
    create(body: any): Promise<import("../entities/student.entity").Student>;
    findAll(): Promise<import("../entities/student.entity").Student[]>;
    addPayment(id: string, body: {
        amount: number;
    }): Promise<{
        student: import("../entities/student.entity").Student;
        payment: import("../entities/payment.entity").Payment;
    }>;
    getOne(id: string): Promise<import("../entities/student.entity").Student>;
    update(req: any, id: string, body: any): Promise<import("../entities/student.entity").Student>;
}
