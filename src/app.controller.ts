import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { spawn } from 'child_process';
import {Response} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getNewestRealEstates(@Res() res:Response) {
    const nkrs = spawn('node',['./dist/processes/nekretnine-rs.js']);
    nkrs.stdout.on('data',(data)=>{
     res.json(data)
    })
  }
}
