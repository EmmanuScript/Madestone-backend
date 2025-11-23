import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Preference } from "../entities/preference.entity";
import { Student } from "../entities/student.entity";

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference) private prefs: Repository<Preference>,
    @InjectRepository(Student) private students: Repository<Student>
  ) {}

  async get(): Promise<Preference> {
    let pref = await this.prefs.findOne({ where: { id: 1 } });
    if (!pref) {
      pref = this.prefs.create({ sessionFee: 0, sessionName: "" });
      pref = await this.prefs.save(pref);
    }
    return pref;
  }

  async setSessionFee(sessionFee: number) {
    if (sessionFee < 0) throw new Error("Session fee cannot be negative");
    const pref = await this.get();
    pref.sessionFee = sessionFee;
    await this.prefs.save(pref);
    // Bulk update all students amountDue
    await this.students
      .createQueryBuilder()
      .update(Student)
      .set({ amountDue: sessionFee })
      .execute();
    return pref;
  }

  async setSessionName(sessionName: string) {
    const pref = await this.get();
    pref.sessionName = sessionName || "";
    await this.prefs.save(pref);
    return pref;
  }

  async resetSession() {
    const pref = await this.get();
    // Reset: amountPaid = 0, amountDue = sessionFee
    await this.students
      .createQueryBuilder()
      .update(Student)
      .set({ amountPaid: 0, amountDue: pref.sessionFee })
      .execute();
    return { ok: true, preference: pref };
  }
}
