import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Center {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  name: string;

  @Column("varchar", { nullable: true })
  address?: string;
}
