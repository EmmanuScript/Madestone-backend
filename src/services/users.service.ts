import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "../entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username }, relations: ["center"] });
  }

  async create(user: Partial<User>) {
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
    const e = this.repo.create(user as User);
    return this.repo.save(e);
  }

  findAll() {
    return this.repo.find({ relations: ["center"] });
  }

  findCoaches() {
    return this.repo.find({
      where: { role: UserRole.COACH },
      relations: ["center"],
    });
  }

  async setActive(id: number, active: boolean) {
    await this.repo.update(id, { active });
    return this.repo.findOne({ where: { id } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["center"] });
  }

  async updateProfile(id: number, updates: Partial<User>) {
    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password;
    delete updates.role;
    delete updates.active;

    await this.repo.update(id, updates);
    return this.findOne(id);
  }
}
