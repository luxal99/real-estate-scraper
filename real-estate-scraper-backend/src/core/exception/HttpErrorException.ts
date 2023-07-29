import {
  HttpException,
  HttpStatus,
} from "@nestjs/common";

export class HttpErrorException extends HttpException {
  constructor() {
    super("Bad Request", HttpStatus.BAD_REQUEST);
  }
}
