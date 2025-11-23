import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 0 })
  sessionFee: number;

  @Column({ default: "" })
  sessionName: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
