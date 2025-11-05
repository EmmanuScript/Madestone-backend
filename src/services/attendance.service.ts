import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendance } from "../entities/attendance.entity";
import { Student } from "../entities/student.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance) private repo: Repository<Attendance>,
    @InjectRepository(Student) private students: Repository<Student>,
    @InjectRepository(User) private users: Repository<User>
  ) {}

  async mark(
    studentId: number,
    date: string,
    present: boolean,
    coachId?: number
  ) {
    const student = await this.students.findOne({ where: { id: studentId } });
    if (!student) throw new Error("Student not found");
    const a = this.repo.create({ student, date, present });
    if (coachId) {
      const coach = await this.users.findOne({ where: { id: coachId } });
      if (coach) a.markedBy = coach;
    }
    await this.repo.save(a);
    if (present) {
      student.attendance = (student.attendance || 0) + 1;
      await this.students.save(student);
    }
    return a;
  }

  async getForStudent(studentId: number, start?: string, end?: string) {
    const qb = this.repo
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.student", "student");
    qb.where("student.id = :studentId", { studentId });
    if (start) qb.andWhere("a.date >= :start", { start });
    if (end) qb.andWhere("a.date <= :end", { end });
    qb.orderBy("a.date", "ASC");
    return qb.getMany();
  }

  async getForCenter(centerId: number, start?: string, end?: string) {
    const qb = this.repo
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.student", "student")
      .leftJoinAndSelect("student.center", "center");
    qb.where("center.id = :centerId", { centerId });
    if (start) qb.andWhere("a.date >= :start", { start });
    if (end) qb.andWhere("a.date <= :end", { end });
    qb.orderBy("student.name", "ASC").addOrderBy("a.date", "ASC");
    return qb.getMany();
  }

  // return CSV string for center attendance between start and end
  async exportCenterCsv(centerId: number, start?: string, end?: string) {
    const records = await this.getForCenter(centerId, start, end);
    // build header: Student Name, Date, Present
    const lines = ["Student Name,Date,Present"];
    for (const r of records) {
      const name =
        r.student && r.student.name ? r.student.name.replace(/\"/g, '"') : "";
      const date = r.date;
      const present = r.present ? "Present" : "Absent";
      // escape commas by wrapping name in quotes if needed
      const safeName = name.includes(",")
        ? `"${name.replace(/"/g, '"')}"`
        : name;
      lines.push(`${safeName},${date},${present}`);
    }
    return lines.join("\n");
  }
}
