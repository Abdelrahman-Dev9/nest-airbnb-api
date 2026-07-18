import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configMapping from './common/configuration/config-mapping';
import { envSchema } from './common/configuration/env-schema-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
