import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { CountryRepository } from '../repository/country.repositry';

@Injectable()
export class FindCountryByIdUseCase {
  constructor(private readonly CountryRepository: CountryRepository) {}
  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.CountryRepository.findOne({
      _id: id,
      isdeleted: { $ne: true },
    });
    if (!country) {
      throw new notFountException('Country not found');
    }
    return plainToInstance(CountryResponseDto, country?.toObject());
  }
}
