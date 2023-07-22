import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {spawn} from 'child_process';
import {Request, Response} from "express";
import {RealEstateService} from "./modules/real-estate/service/real-estate/real-estate.service";
import {RealEstate} from "./modules/real-estate/entity/RealEstate";
import {NekretnineRsService} from "./core/service/nekretnine-rs.service";

@Controller()
export class AppController {
    constructor(private realEstateService: RealEstateService,
                private nekretnineRsService: NekretnineRsService) {
    }

    @Get()
    async getNewestRealEstates(@Res() res: Response) {
        this.nekretnineRsService.getNewestRealEstates("https://www.nekretnine.rs/stambeni-objekti/stanovi/izdavanje-prodaja/prodaja/grad/nis/kvadratura/55_70/cena/80000_110000/lista/po-stranici/50/",).then(async (data) => {
            await this.realEstateService.save(data)
            res.sendStatus(200)
        })
    }

    @Post()
    async saveCurrentNewestRealEstates(@Res() res: Response, @Body() realEstates: RealEstate[]) {
        try {
            await this.realEstateService.save(realEstates)
            res.send({status: 'okk'})
        } catch (err) {
            res.send(err)
        }
    }
}
