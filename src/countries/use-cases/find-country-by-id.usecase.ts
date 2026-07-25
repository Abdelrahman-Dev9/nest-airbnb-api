import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { Country } from '../schema/country.schema';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class FindCountryByIdUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}
  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.countryModel.findOne({
      _id: id,
      isdeleted: { $ne: true },
    });
    if (!country) {
      throw new notFountException('Country not found');
    }
    return plainToInstance(CountryResponseDto, country?.toObject());
  }
}
