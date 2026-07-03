import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "../entities/user.entity";
import { Attendance } from "../entities/attendance.entity";
import { CoachAttendance } from "../entities/coach-attendance.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Attendance) private attendanceRepo: Repository<Attendance>,
    @InjectRepository(CoachAttendance) private coachAttendanceRepo: Repository<CoachAttendance>,
  ) {}

  async findByUsername(username: string) {
    try {
      return await this.repo.findOne({
        where: { username },
        relations: ["center"],
      });
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error.message}`);
    }
  }

  async create(user: Partial<User>) {
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
    const e = this.repo.create(user as User);
    try {
      return await this.repo.save(e);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      }
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.repo.find({ relations: ["center"] });
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async findCoaches() {
    try {
      return await this.repo.find({
        where: { role: UserRole.COACH },
        relations: ["center"],
      });
    } catch (error) {
      throw new Error(`Failed to fetch coaches: ${error.message}`);
    }
  }

  async findAdmins() {
    try {
      return await this.repo.find({
        where: { role: UserRole.ADMIN },
        relations: ["center"],
      });
    } catch (error) {
      throw new Error(`Failed to fetch admins: ${error.message}`);
    }
  }

  async setActive(id: number, active: boolean) {
    try {
      await this.repo.update(id, { active });
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to set user active status: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.repo.findOne({ where: { id }, relations: ["center"] });
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async updateProfile(id: number, updates: Partial<User>) {
    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password;
    delete updates.role;
    delete updates.active;

    await this.repo.update(id, updates);
    return this.findOne(id);
  }

  async delete(id: number) {
    // Nullify markedBy references in attendance records
    await this.attendanceRepo
      .createQueryBuilder()
      .update()
      .set({ markedBy: null })
      .where("markedById = :id", { id })
      .execute();

    // Delete coach_attendance records for this coach or marked by this coach
    await this.coachAttendanceRepo
      .createQueryBuilder()
      .delete()
      .where("coachId = :id OR markedById = :id", { id })
      .execute();

    await this.repo.delete(id);
    return { success: true };
  }

  async changePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.repo.update(id, { password: hashedPassword });
    return this.findOne(id);
  }
}
