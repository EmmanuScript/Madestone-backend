import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../entities/student.entity";
import { Payment } from "../entities/payment.entity";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repo: Repository<Student>,
    @InjectRepository(Payment) private payments: Repository<Payment>
  ) {}

  create(data: Partial<Student>) {
    const s = this.repo.create(data as Student);
    return this.repo.save(s);
  }

  findAll() {
    return this.repo.find({ relations: ["center"] });
  }

  findByCenter(centerId: number) {
    return this.repo.find({
      where: { center: { id: centerId } as any },
      relations: ["center"],
    });
  }

  async addPayment(id: number, amount: number) {
    const student = await this.repo.findOne({ where: { id } });
    if (!student) throw new Error("Student not found");
    student.amountPaid = (student.amountPaid || 0) + amount;
    await this.repo.save(student);
    const p = this.payments.create({
      student,
      amount,
      date: new Date().toISOString().slice(0, 10),
    });
    await this.payments.save(p);
    return { student, payment: p };
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["center"] });
  }

  async update(id: number, data: Partial<Student>) {
    const student = await this.repo.findOne({ where: { id } });
    if (!student) throw new Error("Student not found");
    Object.assign(student, data);
    return this.repo.save(student);
  }
}
