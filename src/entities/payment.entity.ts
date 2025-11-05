import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn()
  student: Student;

  @Column({ type: "float" })
  amount: number;

  @Column({ type: "date" })
  date: string;
}
