import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { HttpErrorException } from "../exception/HttpErrorException";
import { Response } from "express";

@Catch(HttpErrorException)
export class HttpErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    response.status(exception.getStatus());
    response.json({
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      statusCode: exception.getStatus(),
      message:exception.message
    });
  }
}
