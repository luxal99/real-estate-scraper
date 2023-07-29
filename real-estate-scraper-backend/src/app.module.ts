import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RealEstate } from "./modules/real-estate/entity/RealEstate";
import { RealEstateModule } from "./modules/real-estate/real-estate.module";
import { NekretnineRsService } from "./core/service/nekretnine-rs.service";
import { FourWallsService } from "./core/service/4zida.service";
import {APP_FILTER} from "@nestjs/core";
import {HttpErrorExceptionFilter} from "./core/filters/HttpErrorExceptionFilter";

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
    NekretnineRsService,
    FourWallsService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
