import { Injectable } from "@nestjs/common";
import { FactoryRealEstateService } from "./factory-real-estate.service";
import { UrlType } from "../types/url.type";
import { RealEstateCreateDto } from "../../modules/real-estate/dto/real-estate-create.dto";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { ScraperDomain } from "../enum/ScraperDomain";
import { ScrapingException } from "../exception/ScrapingException";
import { ScrapingMainElementNotFound } from "../exception/ScrapingMainElementNotFound";
import { CheerioAPI } from "cheerio";

@Injectable()
export class NekretnineRsService extends FactoryRealEstateService {
  async getNewestRealEstates(
    url: UrlType,
    realEstateData: RealEstateCreateDto[] = []
  ): Promise<RealEstateCreateDto[]> {
    const realEstateElement = ".advert-list .offer";
    try {
      const realEstateResponse: AxiosResponse<string> = await axios.get(url);
      const $ = cheerio.load(realEstateResponse.data);
      const realEstates = this.getMainElement($, realEstateElement);
      realEstates.each(function () {
        const title = $(this)
          .find(".offer-body .offer-title")
          .text()
          .replace(/^\s+|\s+$/g, "");
        const price = Number.parseFloat(
          $(this)
            .find(".offer-body")
            .find(".offer-price span:not(.offer-price--invert)")
            .text()
            .split("€")[0]
        );
        const link =
          ScraperDomain.NEKRETNINE_RS +
          $(this).find(".offer-body").find(".offer-title a").attr("href");
        const picture = $(this).find("img").attr("data-src");
        realEstateData.push({ title, price, link, picture, area: 0 });
      });

      const next: string = $(".next-article-button").attr("href");

      if (next) {
        return await this.getNewestRealEstates(
          `${ScraperDomain.NEKRETNINE_RS}${next}`,
          realEstateData
        );
      } else {
        return realEstateData;
      }
    } catch (err) {
      if (err instanceof ScrapingMainElementNotFound) {
        throw new ScrapingMainElementNotFound(realEstateElement);
      } else {
        throw new ScrapingException(url);
      }
    }
  }
}
