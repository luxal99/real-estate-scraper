import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json } from "express";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: "5000mb" }));
  await app.listen(3000);
}
bootstrap();
