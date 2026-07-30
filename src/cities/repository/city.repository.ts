import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelName } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { City } from '../schema/city.schema';

@Injectable()
export class CityRepository extends BaseRepository<City> {
  constructor(
    @InjectModel(ModelName.CITIES)
    private readonly cityModel: Model<HydratedDocument<City>>,
  ) {
    super(cityModel);
  }
}
