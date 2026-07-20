import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'path';
import configMapping from './common/configuration/config-mapping';
import { envSchema } from './common/configuration/env-schema-validation';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentInterface } from './common/configuration/configuration.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ar',

      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        uri: configService.getOrThrow('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
