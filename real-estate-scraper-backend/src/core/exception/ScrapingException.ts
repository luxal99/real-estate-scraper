import { HttpException, HttpStatus } from "@nestjs/common";
import { UrlType } from "../types/url.type";

export class ScrapingException extends HttpException {
  constructor(private scrapingDomain: UrlType) {
    super("Error while scraping " + scrapingDomain, HttpStatus.BAD_REQUEST);
  }
}
