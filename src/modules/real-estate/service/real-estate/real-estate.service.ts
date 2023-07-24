import { Injectable } from "@nestjs/common";
import { RealEstate } from "../../entity/RealEstate";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UrlType } from "../../../../core/types/url.type";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { ScraperDomain } from "../../../../core/enum/ScraperDomain";
import fs from "fs";
import { RealEstateCreateDto } from "../../dto/real-estate-create.dto";

@Injectable()
export class RealEstateService {
  constructor(
    @InjectRepository(RealEstate)
    private realEstateRepository: Repository<RealEstate>
  ) {}

  async save(realEstates: any): Promise<void> {
    await this.realEstateRepository.save(realEstates);
  }

  async getAll(): Promise<RealEstate[]> {
    return await this.realEstateRepository.find();
  }
}
