import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("coach_attendance")
export class CoachAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  coach: User;

  @Column()
  date: string;

  @Column()
  present: boolean;

  @ManyToOne(() => User, { nullable: true })
  markedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
