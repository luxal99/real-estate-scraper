import { HttpException, HttpStatus } from "@nestjs/common";

export class ScrapingMainElementNotFound extends HttpException {
  constructor(searchedElement: string) {
    super(
      "You're looking for null element: " + searchedElement,
      HttpStatus.BAD_REQUEST
    );
  }
}
