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
import { HttpErrorException } from "../../../../core/exception/HttpErrorException";
import { RealEstateSaveException } from "../../../../core/exception/RealEstateSaveException";

@Injectable()
export class RealEstateService {
  constructor(
    @InjectRepository(RealEstate)
    private realEstateRepository: Repository<RealEstate>
  ) {}

  async save(realEstates: RealEstateCreateDto[]): Promise<void> {
    try {
      await this.realEstateRepository.save(realEstates);
    } catch (err) {
      throw new RealEstateSaveException();
    }
  }

  async getAll(): Promise<RealEstate[]> {
    return await this.realEstateRepository.find();
  }
}
