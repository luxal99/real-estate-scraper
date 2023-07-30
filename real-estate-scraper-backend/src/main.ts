import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpErrorExceptionFilter } from "./core/filters/HttpErrorExceptionFilter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalFilters(new HttpErrorExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
