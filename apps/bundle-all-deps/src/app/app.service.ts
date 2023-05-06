import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  validateUserData(data: any): { message: string } {
    console.log(JSON.stringify(data, null, 2));
    return { message: 'Never reached with rspack' };
  }
}
