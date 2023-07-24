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

    // console.log(realEstateResponse.data)
    realEstates.each(function () {
      //@ts-ignore
      // console.log($(this).children()[0].firstChild.sourceCodeLocation)
      // console.log($(this).find('#hello').attr("href"))
      // console.log($(this).find('#internal').attr("href"))
      const title = $(this).children("div").text();
      console.log(
        $(this)
          .children("div")
          .find("div:nth-child(2)")
          .find("div:first-child")
          .find("div")
          .find("h3")
            .text()
      );
      const price = $(this)
        .find(".block .text-2xl .font-medium")
        .text()
        .split("€")[0];
      let link = $(this).find("app-link").find("a").attr("href");
      link = link.includes("https://www.4zida.rs")
        ? link
        : ScraperDomain.FOUR_WALLS + link;
      const picture = $(this)
        .find("app-link")
        .find("a")
        .find("source")
        .attr("srcset");
      realEstateData.push({ title, price: 0, link, picture, area: 0 });
    });

    // console.log(realEstateData)

    const next: string = $(".next-article-button").attr("href");
    return realEstateData;
  }
}
