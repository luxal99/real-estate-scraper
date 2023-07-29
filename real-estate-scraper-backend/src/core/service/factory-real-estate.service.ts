import { RealEstateCreateDto } from "../../modules/real-estate/dto/real-estate-create.dto";
import { UrlType } from "../types/url.type";
import { CheerioAPI } from "cheerio";
import { ScrapingMainElementNotFound } from "../exception/ScrapingMainElementNotFound";

export abstract class FactoryRealEstateService {
  abstract getNewestRealEstates(
    url: UrlType,
    realEstateData: RealEstateCreateDto[]
  ): Promise<RealEstateCreateDto[]>;

  protected getMainElement($: CheerioAPI, realEstateElement: string) {
    const realEstates = $(realEstateElement);
    if (!realEstates.length) {
      throw new ScrapingMainElementNotFound(realEstateElement);
    }
    return realEstates;
  }
}
