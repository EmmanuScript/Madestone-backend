import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Student } from "./src/entities/student.entity";
import { Attendance } from "./src/entities/attendance.entity";
import { User, UserRole } from "./src/entities/user.entity";
import { Center } from "./src/entities/center.entity";
import { Payment } from "./src/entities/payment.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DATABASE_NAME || "madestone_sports",
  entities: [User, Center, Student, Attendance, Payment],
  synchronize: false,
});

async function seedAttendance() {
  await AppDataSource.initialize();
  console.log("Database connected for attendance seeding");

  const studentRepo = AppDataSource.getRepository(Student);
  const attendanceRepo = AppDataSource.getRepository(Attendance);
  const userRepo = AppDataSource.getRepository(User);

  // Get all students
  const students = await studentRepo.find();
  if (students.length === 0) {
    console.log("No students found. Please run the main seed first.");
    await AppDataSource.destroy();
    return;
  }

  // Get all coaches to mark attendance
  const coaches = await userRepo.find({ where: { role: UserRole.COACH } });
  if (coaches.length === 0) {
    console.log("No coaches found. Please run the main seed first.");
    await AppDataSource.destroy();
    return;
  }

  console.log(
    `Found ${students.length} students and ${coaches.length} coaches`
  );

  // Function to get all Saturdays between two dates
  function getSaturdays(startDate: Date, endDate: Date): Date[] {
    const saturdays: Date[] = [];
    const current = new Date(startDate);

    // Find the first Saturday
    while (current.getDay() !== 6) {
      current.setDate(current.getDate() + 1);
    }

    // Collect all Saturdays
    while (current <= endDate) {
      saturdays.push(new Date(current));
      current.setDate(current.getDate() + 7); // Move to next Saturday
    }

    return saturdays;
  }

  // Define date range: July 1, 2024 to September 30, 2024
  const startDate = new Date("2024-07-01");
  const endDate = new Date("2024-09-30");

  const saturdays = getSaturdays(startDate, endDate);
  console.log(
    `Found ${saturdays.length} Saturdays between July and September 2024`
  );

  let createdCount = 0;
  let skippedCount = 0;

  // Create attendance records for each Saturday
  for (const saturday of saturdays) {
    const dateString = saturday.toISOString().split("T")[0];
    console.log(`Processing attendance for ${dateString}...`);

    for (const student of students) {
      // Check if attendance already exists
      const existing = await attendanceRepo.findOne({
        where: {
          student: { id: student.id },
          date: dateString,
        },
      });

      if (existing) {
        skippedCount++;
        continue;
      }

      // Randomly decide if student was present (80% attendance rate)
      const present = Math.random() < 0.8;

      // Randomly assign a coach
      const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];

      // Create attendance record
      const attendance = attendanceRepo.create({
        student: student,
        date: dateString,
        present: present,
        markedBy: randomCoach,
      });

      await attendanceRepo.save(attendance);
      createdCount++;
    }
  }

  console.log("\n✅ Attendance seeding completed!");
  console.log(`Created: ${createdCount} records`);
  console.log(`Skipped (already exists): ${skippedCount} records`);
  console.log(`Total Saturdays: ${saturdays.length}`);
  console.log(
    `Date range: ${saturdays[0].toISOString().split("T")[0]} to ${
      saturdays[saturdays.length - 1].toISOString().split("T")[0]
    }`
  );

  await AppDataSource.destroy();
}

seedAttendance().catch((err) => {
  console.error("Error seeding attendance:", err);
  process.exit(1);
});
