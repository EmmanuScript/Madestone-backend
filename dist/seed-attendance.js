"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const student_entity_1 = require("./src/entities/student.entity");
const attendance_entity_1 = require("./src/entities/attendance.entity");
const user_entity_1 = require("./src/entities/user.entity");
const center_entity_1 = require("./src/entities/center.entity");
const payment_entity_1 = require("./src/entities/payment.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "madestone_sports",
    entities: [user_entity_1.User, center_entity_1.Center, student_entity_1.Student, attendance_entity_1.Attendance, payment_entity_1.Payment],
    synchronize: false,
});
async function seedAttendance() {
    await AppDataSource.initialize();
    console.log("Database connected for attendance seeding");
    const studentRepo = AppDataSource.getRepository(student_entity_1.Student);
    const attendanceRepo = AppDataSource.getRepository(attendance_entity_1.Attendance);
    const userRepo = AppDataSource.getRepository(user_entity_1.User);
    const students = await studentRepo.find();
    if (students.length === 0) {
        console.log("No students found. Please run the main seed first.");
        await AppDataSource.destroy();
        return;
    }
    const coaches = await userRepo.find({ where: { role: user_entity_1.UserRole.COACH } });
    if (coaches.length === 0) {
        console.log("No coaches found. Please run the main seed first.");
        await AppDataSource.destroy();
        return;
    }
    console.log(`Found ${students.length} students and ${coaches.length} coaches`);
    function getSaturdays(startDate, endDate) {
        const saturdays = [];
        const current = new Date(startDate);
        while (current.getDay() !== 6) {
            current.setDate(current.getDate() + 1);
        }
        while (current <= endDate) {
            saturdays.push(new Date(current));
            current.setDate(current.getDate() + 7);
        }
        return saturdays;
    }
    const startDate = new Date("2024-07-01");
    const endDate = new Date("2024-09-30");
    const saturdays = getSaturdays(startDate, endDate);
    console.log(`Found ${saturdays.length} Saturdays between July and September 2024`);
    let createdCount = 0;
    let skippedCount = 0;
    for (const saturday of saturdays) {
        const dateString = saturday.toISOString().split("T")[0];
        console.log(`Processing attendance for ${dateString}...`);
        for (const student of students) {
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
            const present = Math.random() < 0.8;
            const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];
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
    console.log(`Date range: ${saturdays[0].toISOString().split("T")[0]} to ${saturdays[saturdays.length - 1].toISOString().split("T")[0]}`);
    await AppDataSource.destroy();
}
seedAttendance().catch((err) => {
    console.error("Error seeding attendance:", err);
    process.exit(1);
});
//# sourceMappingURL=seed-attendance.js.map