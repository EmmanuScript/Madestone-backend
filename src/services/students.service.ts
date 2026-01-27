import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../entities/student.entity";
import { Payment } from "../entities/payment.entity";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repo: Repository<Student>,
    @InjectRepository(Payment) private payments: Repository<Payment>,
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
    console.log(`[StudentsService] Updating student ${id} with data:`, data);
    const student = await this.repo.findOne({ where: { id } });
    if (!student) {
      console.error(`[StudentsService] Student ${id} not found`);
      throw new Error("Student not found");
    }
    console.log(`[StudentsService] Found student:`, student);

    // Handle center relation separately
    if (data.center) {
      console.log(`[StudentsService] Updating center relation:`, data.center);
      student.center = data.center as any;
      delete data.center;
    }

    console.log(`[StudentsService] Assigning data to student:`, data);
    Object.assign(student, data);
    console.log(`[StudentsService] Student before save:`, student);
    const result = await this.repo.save(student);
    console.log(`[StudentsService] Student saved successfully:`, result);
    return result;
  }
}
