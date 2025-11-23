import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Center } from "./center.entity";

export enum UserRole {
  CEO = "CEO",
  ADMIN = "ADMIN",
  COACH = "COACH",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  image?: string;

  @Column({ type: "text", nullable: true })
  imageUrl?: string;

  @Column({ type: "text", nullable: true })
  imageViewUrl?: string;

  @Column({ type: "text", nullable: true })
  cloudinaryPublicId?: string;

  @Column({ type: "simple-enum", enum: UserRole })
  role: UserRole;

  @ManyToOne(() => Center, (c) => c.id, { nullable: true })
  @JoinColumn()
  center?: Center;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  birthMonthDay?: string; // e.g. "07-15"
}
