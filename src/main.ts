import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentInterface } from './common/configuration/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentInterface>);
  const PORT = configService.getOrThrow<number>('port');
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
