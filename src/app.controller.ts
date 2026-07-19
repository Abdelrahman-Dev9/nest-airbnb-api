import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { createHelloDto } from './dto/create-hello.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() dto: createHelloDto) {
    return this.appService.getHello();
  }
}
