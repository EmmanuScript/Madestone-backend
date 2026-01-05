import { Repository } from "typeorm";
import { Center } from "../entities/center.entity";
export declare class CentersService {
    private repo;
    constructor(repo: Repository<Center>);
    create(data: Partial<Center>): Promise<Center>;
    findAll(): Promise<Center[]>;
}
