import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Luxal.99',
    database: 'real_estate_scraper',
    entities: [],
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
