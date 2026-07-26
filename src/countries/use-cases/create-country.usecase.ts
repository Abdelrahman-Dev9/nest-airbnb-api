import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { CountryRepository } from '../repository/country.repositry';

@Injectable()
export class CreateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existCountry = await this.countryRepository.findOne({
      name: body.name,
      isdeleted: { $ne: true },
    });
    if (existCountry) {
      throw new badRequestException('Country already exists');
    }
    const country = await this.countryRepository.create(body);
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
