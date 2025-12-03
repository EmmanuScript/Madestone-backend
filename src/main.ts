import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { json } from "express";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend (flexible for production)
  const corsOrigin =
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL ||
        "https://madestone-frontend-production.up.railway.app"
      : ["http://localhost:3000", "http://localhost:5001"];

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  app.use(json({ limit: "10mb" }));

  // ensure uploads dir exists
  const uploadsDir = __dirname + "/../uploads";
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  await app.listen(process.env.PORT || 5000);
  console.log(
    `Backend listening on port ${process.env.PORT || 5000} (${
      process.env.NODE_ENV || "development"
    })`
  );
}
bootstrap();
