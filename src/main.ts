import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { EnvironmentInterface } from './common/configuration/configuration.interface';
import { SwaggerConfig } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new CustomExceptionFilter());
  // To use nestjs-i18n in your DTO validation.json
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  //setup swagger

  SwaggerConfig.setup(app);

  // To translate the class-validator errors
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  const configService = app.get(ConfigService<EnvironmentInterface>);
  const PORT = configService.getOrThrow<number>('port');
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
