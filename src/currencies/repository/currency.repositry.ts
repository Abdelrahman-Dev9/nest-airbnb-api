import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { BaseRepository, ModelName } from '../../common/data-access';
import { Currency } from '../schema/currency.schema';

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
  constructor(
    @InjectModel(ModelName.CURRENCIES)
    private readonly currencyModel: Model<HydratedDocument<Currency>>,
  ) {
    super(currencyModel);
  }
}
