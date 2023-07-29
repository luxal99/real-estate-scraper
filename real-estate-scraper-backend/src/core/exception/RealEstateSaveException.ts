import {
  HttpException,
  HttpStatus,
} from "@nestjs/common";

export class RealEstateSaveException extends HttpException {
  constructor() {
    super("Error on save real estates", HttpStatus.BAD_REQUEST);
  }
}
