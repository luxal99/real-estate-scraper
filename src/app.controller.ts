import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { spawn } from "child_process";
import { Request, Response } from "express";
import { RealEstateService } from "./modules/real-estate/service/real-estate/real-estate.service";
import { RealEstate } from "./modules/real-estate/entity/RealEstate";
import { NekretnineRsService } from "./core/service/nekretnine-rs.service";
import { FourWallsService } from "./core/service/4zida.service";

@Controller()
export class AppController {
  constructor(
    private realEstateService: RealEstateService,
    private nekretnineRsService: NekretnineRsService,
    private fourWallsService: FourWallsService
  ) {}

  @Get()
  async getNewestRealEstates(@Res() res: Response) {
    this.fourWallsService
      .getNewestRealEstates(
        "https://www.4zida.rs/prodaja-stanova/nis?jeftinije_od=110000eur&vece_od=60m2&stanje=u_izgradnji&stanje=novo",
        []
      )
      .then(async (data) => {
        await this.realEstateService.save(data);
        res.sendStatus(200);
      });
  }

  @Post()
  async saveCurrentNewestRealEstates(
    @Res() res: Response,
    @Body() realEstates: RealEstate[]
  ) {
    try {
      await this.realEstateService.save(realEstates);
      res.send({ status: "okk" });
    } catch (err) {
      res.send(err);
    }
  }
}
