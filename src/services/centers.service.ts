import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Center } from "../entities/center.entity";

@Injectable()
export class CentersService {
  constructor(@InjectRepository(Center) private repo: Repository<Center>) {}

  async create(data: Partial<Center>) {
    try {
      const c = this.repo.create(data as Center);
      return await this.repo.save(c);
    } catch (error) {
      throw new Error(`Failed to create center: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new Error(`Failed to fetch centers: ${error.message}`);
    }
  }
}
