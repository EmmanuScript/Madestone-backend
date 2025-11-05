import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, UserRole } from "./src/entities/user.entity";
import { Center } from "./src/entities/center.entity";
import { Student, Category } from "./src/entities/student.entity";
import * as dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Center, Student],
  synchronize: true,
});

async function run() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const centerRepo = AppDataSource.getRepository(Center);
  const studentRepo = AppDataSource.getRepository(Student);
  const bcrypt = await import("bcrypt");

  // Create CEO
  let ceo = await userRepo.findOne({ where: { username: "ceo" } });
  if (!ceo) {
    ceo = userRepo.create({
      username: "ceo",
      password: await bcrypt.hash("ceopass123", 10),
      name: "John Smith",
      role: UserRole.CEO,
      active: true,
    });
    await userRepo.save(ceo);
    console.log("Created CEO user: username=ceo password=ceopass123");
  }

  // Create Centers
  const centers = [
    { name: "Akobo Sports Center", address: "123 Akobo Road" },
    { name: "Jericho Sports Center", address: "456 Jericho Avenue" },
  ];

  const savedCenters = [];
  for (const centerData of centers) {
    let center = await centerRepo.findOne({ where: { name: centerData.name } });
    if (!center) {
      center = centerRepo.create(centerData);
      await centerRepo.save(center);
      console.log(`Created center: ${centerData.name}`);
    }
    savedCenters.push(center);
  }

  // Create Coaches (2 for each center)
  const coaches = [
    { username: "coach1", name: "Alex Thompson", center: savedCenters[0] },
    { username: "coach2", name: "Sarah Wilson", center: savedCenters[0] },
    { username: "coach3", name: "Michael Brown", center: savedCenters[1] },
    { username: "coach4", name: "Emma Davis", center: savedCenters[1] },
  ];

  for (const coachData of coaches) {
    let coach = await userRepo.findOne({
      where: { username: coachData.username },
    });
    if (!coach) {
      coach = userRepo.create({
        ...coachData,
        password: await bcrypt.hash("coach123", 10),
        role: UserRole.COACH,
        active: true,
        birthMonthDay: "01-01",
      });
      await userRepo.save(coach);
      console.log(
        `Created Coach: username=${coachData.username} password=coach123`
      );
    }
  }

  // Create Students (10 for each center)
  const studentNames = [
    // Akobo students
    [
      "James Anderson",
      "Emily Brown",
      "Daniel Lee",
      "Sophia Chen",
      "Oliver Wang",
      "Isabella Kim",
      "Lucas Garcia",
      "Mia Martinez",
      "Ethan Taylor",
      "Ava Wilson",
    ],
    // Jericho students
    [
      "Liam Smith",
      "Emma Johnson",
      "Noah Williams",
      "Olivia Jones",
      "William Davis",
      "Charlotte Miller",
      "Henry Wilson",
      "Amelia Moore",
      "Alexander White",
      "Sophia Martin",
    ],
  ];

  const categories = [Category.U6, Category.U10, Category.U15];

  for (let centerIndex = 0; centerIndex < savedCenters.length; centerIndex++) {
    for (let i = 0; i < 10; i++) {
      const name = studentNames[centerIndex][i];
      let student = await studentRepo.findOne({ where: { name } });
      if (!student) {
        const age = Math.floor(Math.random() * 15) + 5; // 5-20 years
        const category = categories[Math.floor(age / 7)]; // Assign category based on age
        student = studentRepo.create({
          name,
          center: savedCenters[centerIndex],
          attendance: Math.floor(Math.random() * 10),
          age,
          category,
          amountDue: 1000,
          amountPaid: Math.floor(Math.random() * 1000),
          dueResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        });
        await studentRepo.save(student);
        console.log(
          `Created student: ${name} in ${savedCenters[centerIndex].name}`
        );
      }
    }
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
