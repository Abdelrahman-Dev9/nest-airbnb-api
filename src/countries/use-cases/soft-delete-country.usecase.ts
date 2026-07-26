import { Injectable } from '@nestjs/common';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { CountryRepository } from '../repository/country.repositry';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<void> {
    const existingCountry = await this.countryRepository.findOne({
      _id: id,
      isdeleted: { $ne: true },
    });
    if (!existingCountry) {
      throw new notFountException('Country not found');
    }

    await this.countryRepository.findByIdAndUpdate(id, {
      isdeleted: true,
      deletedAt: new Date(),
    });
  }
}
