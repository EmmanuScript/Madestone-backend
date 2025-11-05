import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Center } from "../entities/center.entity";

@Injectable()
export class CentersService {
  constructor(@InjectRepository(Center) private repo: Repository<Center>) {}

  create(data: Partial<Center>) {
    const c = this.repo.create(data as Center);
    return this.repo.save(c);
  }

  findAll() {
    return this.repo.find();
  }
}
