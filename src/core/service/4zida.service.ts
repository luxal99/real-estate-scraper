import { Injectable } from "@nestjs/common";
import { FactoryRealEstateInterface } from "./factory-real-estate.interface";
import { RealEstateCreateDto } from "../../modules/real-estate/dto/real-estate-create.dto";
import { UrlType } from "../types/url.type";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { ScraperDomain } from "../enum/ScraperDomain";

@Injectable()
export class FourWallsService implements FactoryRealEstateInterface {
  link =
    "https://www.4zida.rs/prodaja-stanova/nis?jeftinije_od=110000eur&vece_od=60m2&stanje=u_izgradnji&stanje=novo";

  async getNewestRealEstates(
    url: UrlType,
    realEstateData: RealEstateCreateDto[]
  ): Promise<RealEstateCreateDto[]> {
    const realEstateResponse: AxiosResponse<string> = await axios.get(url);
    const $ = cheerio.load(realEstateResponse.data);
    const realEstates = $("app-ad-search-preview-compact");

    realEstates.each(function () {
      const title = $(this)
        .find('[class="truncate bg-gray-100 p-1 text-xs text-gray-400"]')
        .text();
      const price = Number.parseInt(
        $(this)
          .find("app-link")
          .find("a")
          .find("span")
          .text()
          .replace("€", "")
          .replace(".", "")
      );
      let link = $(this).find("app-link").find("a").attr("href");
      link = link.includes("https://www.4zida.rs")
        ? link
        : ScraperDomain.FOUR_WALLS + link;
      const picture = $(this)
        .find("app-link")
        .find("a")
        .find("source")
        .attr("srcset");
      const area = Number.parseInt(
        $(this)
          .find("app-link")
          .find("a")
          .find("strong:first-child")
          .text()
          .replace("m²", "")
      );
      realEstateData.push({ title, price, link, picture, area });
    });

    const next: string = $('[data-cy="showPlusOne"]').attr("href");

    if (next) {
      return await this.getNewestRealEstates(
        `${ScraperDomain.FOUR_WALLS}${next}`,
        realEstateData
      );
    } else {
      return realEstateData;
    }
  }
}
