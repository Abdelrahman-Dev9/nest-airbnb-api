import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { BaseRepository, ModelName } from '../../common/data-access';
import { AppSettings } from '../schema/app-settings.schema';

@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSettings> {
  constructor(
    @InjectModel(ModelName.APP_SETTINGS)
    private readonly appSettingsModel: Model<HydratedDocument<AppSettings>>,
  ) {
    super(appSettingsModel);
  }
}
