import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { CountryRepository } from '../repository/country.repositry';

@Injectable()
export class UpdateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}
  async execute(
    counterId: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryRepository.findOne({
      _id: counterId,
      isdeleted: { $ne: true },
    });
    if (!country) {
      throw new badRequestException('Country not found');
    }

    if (body.name) {
      const existCountry = await this.countryRepository.findOne({
        name: body.name,
        isdeleted: { $ne: true },
        _id: { $ne: counterId },
      });
      if (existCountry) {
        throw new badRequestException('Country already exists');
      }
    }

    const updatedCountry = await this.countryRepository.findByIdAndUpdate(
      counterId,
      body,
      {
        returnDocument: 'after',
      },
    );

    return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
  }
}
