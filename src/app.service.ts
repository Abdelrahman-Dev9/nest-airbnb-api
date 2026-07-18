import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/configuration.interface';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<EnvironmentInterface>) {}

  getHello(): string {
    console.log('post is ', this.configService.getOrThrow('port'));

    return 'Hello World!';
  }
}
