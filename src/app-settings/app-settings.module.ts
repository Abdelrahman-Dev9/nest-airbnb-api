import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { AppSettingsController } from './app-settings.controller';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsRepository } from './repository/app-settings.repository';
import { AppSettingsSchema } from './schema/app-settings.schema';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings.usecase';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: AppSettingsSchema,
        name: ModelName.APP_SETTINGS,
      },
    ]),
  ],
  controllers: [AppSettingsController],
  providers: [
    AppSettingsService,
    AppSettingsRepository,
    UpsertAppSettingsUseCase,
    FindAppSettingsUseCase,
  ],
})
export class AppSettingsModule {}
