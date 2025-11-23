import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoachAttendance } from "../entities/coach-attendance.entity";
import { User, UserRole } from "../entities/user.entity";

@Injectable()
export class CoachAttendanceService {
  constructor(
    @InjectRepository(CoachAttendance)
    private repo: Repository<CoachAttendance>,
    @InjectRepository(User) private users: Repository<User>
  ) {}

  async mark(
    coachId: number,
    date: string,
    present: boolean,
    markedById?: number
  ) {
    const coach = await this.users.findOne({
      where: { id: coachId, role: UserRole.COACH },
    });
    if (!coach) throw new Error("Coach not found");

    const attendance = this.repo.create({ coach, date, present });
    if (markedById) {
      const markedBy = await this.users.findOne({ where: { id: markedById } });
      if (markedBy) attendance.markedBy = markedBy;
    }
    return await this.repo.save(attendance);
  }

  async getForCoach(coachId: number, start?: string, end?: string) {
    const qb = this.repo
      .createQueryBuilder("ca")
      .leftJoinAndSelect("ca.coach", "coach");
    qb.where("coach.id = :coachId", { coachId });
    if (start) qb.andWhere("ca.date >= :start", { start });
    if (end) qb.andWhere("ca.date <= :end", { end });
    qb.orderBy("ca.date", "ASC");
    return qb.getMany();
  }

  async getForCenter(centerId: number, start?: string, end?: string) {
    const qb = this.repo
      .createQueryBuilder("ca")
      .leftJoinAndSelect("ca.coach", "coach")
      .leftJoinAndSelect("coach.center", "center");
    qb.where("center.id = :centerId", { centerId });
    if (start) qb.andWhere("ca.date >= :start", { start });
    if (end) qb.andWhere("ca.date <= :end", { end });
    qb.orderBy("coach.name", "ASC").addOrderBy("ca.date", "ASC");
    return qb.getMany();
  }

  async exportCenterCsv(centerId: number, start?: string, end?: string) {
    const records = await this.getForCenter(centerId, start, end);
    const lines = ["Coach Name,Date,Present"];
    for (const r of records) {
      const name =
        r.coach && r.coach.name ? r.coach.name.replace(/\"/g, '"') : "";
      const date = r.date;
      const present = r.present ? "Present" : "Absent";
      const safeName = name.includes(",")
        ? `"${name.replace(/"/g, '"')}"`
        : name;
      lines.push(`${safeName},${date},${present}`);
    }
    return lines.join("\n");
  }
}
