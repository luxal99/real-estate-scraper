import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { spawn } from "child_process";
import { Request, Response } from "express";
import { RealEstateService } from "./modules/real-estate/service/real-estate/real-estate.service";
import { RealEstate } from "./modules/real-estate/entity/RealEstate";
import { NekretnineRsService } from "./core/service/nekretnine-rs.service";
import { FourWallsService } from "./core/service/4zida.service";
import { RealEstateCreateDto } from "./modules/real-estate/dto/real-estate-create.dto";
import { classToPlain, plainToClass, plainToInstance } from "class-transformer";

@Controller()
export class AppController {
  constructor(
    private realEstateService: RealEstateService,
    private nekretnineRsService: NekretnineRsService,
    private fourWallsService: FourWallsService
  ) {}

  @Post()
  async getNewestRealEstates(@Res() res: Response) {
    const [fourWalls, nekretnineRs] = await Promise.all([
      this.fourWallsService.getNewestRealEstates(
        "https://www.4zida.rs/prodaja-stanova/nis?jeftinije_od=110000eur&vece_od=60m2&stanje=u_izgradnji&stanje=novo",
        []
      ),
      this.nekretnineRsService.getNewestRealEstates(
        "https://www.nekretnine.rs/stambeni-objekti/stanovi/izdavanje-prodaja/prodaja/grad/nis/kvadratura/55_70/cena/80000_110000/lista/po-stranici/50/",
        []
      ),
    ]);
    await this.realEstateService.save([...fourWalls, ...nekretnineRs]);
    res.send("OK");
  }
}
