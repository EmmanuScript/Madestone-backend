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

  async create(data: Partial<Student>) {
    try {
      const s = this.repo.create(data as Student);
      return await this.repo.save(s);
    } catch (error) {
      throw new Error(`Failed to create student: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.repo.find({ relations: ["center"] });
    } catch (error) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }
  }

  async findByCenter(centerId: number) {
    try {
      return await this.repo.find({
        where: { center: { id: centerId } as any },
        relations: ["center"],
      });
    } catch (error) {
      throw new Error(`Failed to fetch students by center: ${error.message}`);
    }
  }

  async addPayment(id: number, amount: number) {
    try {
      const student = await this.repo.findOne({ where: { id } });
      if (!student) {
        throw new Error("Student not found");
      }

      if (!amount || amount <= 0) {
        throw new Error("Invalid payment amount");
      }

      student.amountPaid = (student.amountPaid || 0) + amount;
      await this.repo.save(student);

      const p = this.payments.create({
        student,
        amount,
        date: new Date().toISOString().slice(0, 10),
      });
      await this.payments.save(p);

      return { student, payment: p };
    } catch (error) {
      throw new Error(`Failed to add payment: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.repo.findOne({ where: { id }, relations: ["center"] });
    } catch (error) {
      throw new Error(`Failed to fetch student: ${error.message}`);
    }
  }

  async update(id: number, data: Partial<Student>) {
    const student = await this.repo.findOne({ where: { id } });
    if (!student) throw new Error("Student not found");
    Object.assign(student, data);
    return this.repo.save(student);
  }
}
