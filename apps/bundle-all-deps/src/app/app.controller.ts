import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class subData {
  @IsString()
  public subString: string;

  @IsNumber()
  public subNumber: number;
}

class subObject {
  @IsString()
  public firstname: string;

  @IsString()
  public lastname: string;
}

class userDataPostDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => subData)
  public userSubData: subData[];

  @ValidateNested()
  @Type(() => subObject)
  public userSubObject: subObject;

  // webpack and rspack behave differently when the property is optional but the annotation @IsOptional() is not present
  // With the following payload:
  // {
  //   "userSubData": [
  //     { "subString": "hello", "subNumber": 3 },
  //     { "subNumber": 5, "subString": "there" }
  //   ]
  // }
  // 
  // webpack returns 200
  // rspack returns a 400, BadRequest
  //
  // When @IsOptional() is added, both behave the same way and accept the payload

  public iAmOptional?: string;
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
