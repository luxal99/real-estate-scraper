import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json } from "express";
import * as fs from "fs";
import { HttpErrorExceptionFilter } from "./core/filters/HttpErrorExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpErrorExceptionFilter());
  await app.listen(3000);
}
bootstrap();
