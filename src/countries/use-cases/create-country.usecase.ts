import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { Country } from '../schema/country.schema';

@Injectable()
export class CreateCountryUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existCountry = await this.countryModel.findOne({
      name: body.name,
      isdeleted: { $ne: true },
    });
    if (existCountry) {
      throw new badRequestException('Country already exists');
    }
    const country = await this.countryModel.create(body);
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
