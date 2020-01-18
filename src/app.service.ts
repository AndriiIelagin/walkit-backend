import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { name: string } {
    return { name: 'Andrew' };
  }
  // getHello(): string {
  //   return '<h1>Hello World!</h1>';
  // }
}
