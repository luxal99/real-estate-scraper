import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import * as process from "process";

@Injectable()
export class AppService {
  constructor() {
    console.log(process.env.NODE_ENV)
  }
  @Cron("45 * * * * *")
  getHello(): void {
    console.log("hello");
  }
}
