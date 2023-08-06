import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RealEstate } from "./modules/real-estate/entity/RealEstate";
import { RealEstateModule } from "./modules/real-estate/real-estate.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorExceptionFilter } from "./core/filters/HttpErrorExceptionFilter";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as process from "process";
import { DataSource } from "typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "development"
          ? "src/environments/.dev.env"
          : "src/environments/.prod.env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mariadb",
        host: "localhost",
        port: 3306,
        username: "root",
        password: configService.getOrThrow("PASSWORD"),
        database: configService.getOrThrow("DATABASE"),
        entities: [RealEstate],
      }),
      // dataSourceFactory: async (options) => {
      //   return await new DataSource(options).initialize();
      // },
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
