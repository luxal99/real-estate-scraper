import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import { RealEstateService } from "./service/real-estate/real-estate.service";
import { NekretnineRsService } from "../../core/service/nekretnine-rs.service";
import { FourWallsService } from "../../core/service/4zida.service";
import { Response } from "express";
import { RealEstateQuery } from "./query/RealEstateQuery";
import { RealEstateQueryParam } from "./annoitations/real-estate-query.annotation";

@Controller("real-estates")
export class RealEstateController {
  constructor(
    private realEstateService: RealEstateService,
    private nekretnineRsService: NekretnineRsService,
    private fourWallsService: FourWallsService
  ) {}

  @Post()
  async saveNewestRealEstates(@Res() res: Response) {
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

  @Get()
  async getRealEstates(
    @RealEstateQueryParam() realEstateQuery: RealEstateQuery,
    @Res() res: Response
  ) {
    const realEstateResponse = await this.realEstateService.getAll(
      realEstateQuery
    );

    res.setHeader("TOTAL", realEstateResponse.numberOfRealEstates);
    res.setHeader(
      "NUMBER_OF_PAGES",
      Math.round(realEstateResponse.numberOfRealEstates / 20)
    );
    res.send(realEstateResponse.realEstates);
  }
}
