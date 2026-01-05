"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const express_1 = require("express");
const fs = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigin = process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL ||
            "https://madestone-frontend-prod.railway.app"
        : ["http://localhost:3000", "http://localhost:5001"];
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: "Content-Type, Accept, Authorization",
    });
    app.use((0, express_1.json)({ limit: "10mb" }));
    const uploadsDir = __dirname + "/../uploads";
    if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });
    await app.listen(process.env.PORT || 5000);
    console.log(`Backend listening on port ${process.env.PORT || 5000} (${process.env.NODE_ENV || "development"})`);
}
bootstrap();
//# sourceMappingURL=main.js.map