import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { Country } from '../schema/country.schema';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string): Promise<void> {
    const existingCountry = await this.countryModel.findOne({
      _id: id,
      isdeleted: { $ne: true },
    });
    if (!existingCountry) {
      throw new notFountException('Country not found');
    }

    await this.countryModel.findByIdAndUpdate(id, {
      isdeleted: true,
      deletedAt: new Date(),
    });
  }
}
