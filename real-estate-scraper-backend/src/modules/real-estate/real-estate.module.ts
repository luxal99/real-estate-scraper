import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RealEstate } from "./entity/RealEstate";
import { RealEstateService } from "./service/real-estate/real-estate.service";
import { RealEstateController } from "./real-estate.controller";
import {NekretnineRsService} from "../../core/service/nekretnine-rs.service";
import {FourWallsService} from "../../core/service/4zida.service";

@Module({
  imports: [TypeOrmModule.forFeature([RealEstate])],
  providers: [RealEstateService,NekretnineRsService,FourWallsService],
  controllers: [RealEstateController],
  exports: [RealEstateService],
})
export class RealEstateModule {}
