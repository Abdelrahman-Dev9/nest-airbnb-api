import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './../schema/country.schema';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateCountryUseCase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}
  async execute(
    counterId: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryModel.findOne({
      _id: counterId,
      isdeleted: { $ne: true },
    });
    if (!country) {
      throw new badRequestException('Country not found');
    }

    if (body.name) {
      const existCountry = await this.countryModel.findOne({
        name: body.name,
        isdeleted: { $ne: true },
        _id: { $ne: counterId },
      });
      if (existCountry) {
        throw new badRequestException('Country already exists');
      }
    }

    const updatedCountry = await this.countryModel.findByIdAndUpdate(
      counterId,
      body,
      {
        returnDocument: 'after',
      },
    );

    return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
  }
}
