import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RealEstate } from "./entity/RealEstate";
import { RealEstateService } from "./service/real-estate/real-estate.service";

@Module({
  imports: [TypeOrmModule.forFeature([RealEstate])],
  providers: [RealEstateService],
  exports: [RealEstateService],
})
export class RealEstateModule {}
