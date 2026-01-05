"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/entities/user.entity");
const center_entity_1 = require("./src/entities/center.entity");
const student_entity_1 = require("./src/entities/student.entity");
const dotenv = require("dotenv");
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [user_entity_1.User, center_entity_1.Center, student_entity_1.Student],
    synchronize: true,
});
async function run() {
    await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(user_entity_1.User);
    const centerRepo = AppDataSource.getRepository(center_entity_1.Center);
    const studentRepo = AppDataSource.getRepository(student_entity_1.Student);
    const bcrypt = await Promise.resolve().then(() => require("bcrypt"));
    let ceo = await userRepo.findOne({ where: { username: "ceo" } });
    if (!ceo) {
        ceo = userRepo.create({
            username: "ceo",
            password: await bcrypt.hash("ceopass123", 10),
            name: "John Smith",
            role: user_entity_1.UserRole.CEO,
            active: true,
        });
        await userRepo.save(ceo);
        console.log("Created CEO user: username=ceo password=ceopass123");
    }
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
            coach = userRepo.create(Object.assign(Object.assign({}, coachData), { password: await bcrypt.hash("coach123", 10), role: user_entity_1.UserRole.COACH, active: true, birthMonthDay: "01-01" }));
            await userRepo.save(coach);
            console.log(`Created Coach: username=${coachData.username} password=coach123`);
        }
    }
    const studentNames = [
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
    const categories = [student_entity_1.Category.U6, student_entity_1.Category.U10, student_entity_1.Category.U15];
    for (let centerIndex = 0; centerIndex < savedCenters.length; centerIndex++) {
        for (let i = 0; i < 10; i++) {
            const name = studentNames[centerIndex][i];
            let student = await studentRepo.findOne({ where: { name } });
            if (!student) {
                const age = Math.floor(Math.random() * 15) + 5;
                const category = categories[Math.floor(age / 7)];
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
                console.log(`Created student: ${name} in ${savedCenters[centerIndex].name}`);
            }
        }
    }
    process.exit(0);
}
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map