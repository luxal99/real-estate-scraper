import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RealEstate } from "./modules/real-estate/entity/RealEstate";
import { RealEstateModule } from "./modules/real-estate/real-estate.module";
import { APP_FILTER, Reflector } from "@nestjs/core";
import { HttpErrorExceptionFilter } from "./core/filters/HttpErrorExceptionFilter";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Luxal.99",
      database: "real_estate_scrapper",
      entities: [RealEstate],
    }),
    RealEstateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
