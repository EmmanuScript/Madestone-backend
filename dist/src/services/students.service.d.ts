import { Repository } from "typeorm";
import { Student } from "../entities/student.entity";
import { Payment } from "../entities/payment.entity";
export declare class StudentsService {
    private repo;
    private payments;
    constructor(repo: Repository<Student>, payments: Repository<Payment>);
    create(data: Partial<Student>): Promise<Student>;
    findAll(): Promise<Student[]>;
    findByCenter(centerId: number): Promise<Student[]>;
    addPayment(id: number, amount: number): Promise<{
        student: Student;
        payment: Payment;
    }>;
    findOne(id: number): Promise<Student>;
    update(id: number, data: Partial<Student>): Promise<Student>;
}
