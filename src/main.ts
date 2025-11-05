import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { json } from "express";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: "http://localhost:5001", // React app's port
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  app.use(json({ limit: "10mb" }));

  // ensure uploads dir exists
  const uploadsDir = __dirname + "/../uploads";
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  await app.listen(5000);
  console.log("Backend listening on http://localhost:5000");
}
bootstrap();
