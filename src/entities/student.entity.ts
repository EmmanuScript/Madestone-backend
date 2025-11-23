import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Center } from "./center.entity";

export enum Category {
  U6 = "U6",
  U10 = "U10",
  U15 = "U15",
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Center, { nullable: true })
  @JoinColumn()
  center?: Center;

  @Column({ default: 0 })
  attendance: number;

  @Column({ default: 0 })
  age: number;

  @Column({ type: "simple-enum", enum: Category, default: Category.U10 })
  category: Category;

  @Column({ type: "float", default: 0 })
  amountDue: number;

  @Column({ type: "float", default: 0 })
  amountPaid: number;

  @Column({ type: "date", nullable: true })
  dueResetDate?: string; // when amount resets to owing

  @Column({ nullable: true })
  school?: string;

  @Column({ nullable: true })
  parentPhoneNumber?: string;

  @Column({ nullable: true })
  parentEmail?: string;

  @Column({ nullable: true })
  imageUrl?: string; // Public image URL (Cloudinary secure_url)

  @Column({ nullable: true })
  imageViewUrl?: string; // View URL (same as secure_url for Cloudinary)

  @Column({ nullable: true })
  cloudinaryPublicId?: string; // For deleting/replacing images

  @Column({ default: true })
  active: boolean; // Student active status
}
