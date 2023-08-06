import { Injectable } from "@nestjs/common";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class AppService {

  @Cron('45 * * * * *')
  getHello(): void {
    console.log('hello')
  }
}
