import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

class userDataPostDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => subData)
  public userSubData: subData[];
}

class subData {
  public subString: string;
  public subNumber: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  validateUserData(@Body() body: userDataPostDto) {
    return this.appService.validateUserData(body);
  }
}
