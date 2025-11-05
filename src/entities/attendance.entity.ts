import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./student.entity";
import { User } from "./user.entity";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn()
  student: Student;

  @Column({ type: "date" })
  date: string;

  @Column({ default: false })
  present: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  markedBy?: User; // coach who marked
}
