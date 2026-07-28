import { Injectable } from '@nestjs/common';
import { notFountException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class SoftDeleteCityUsecase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(cityId: string): Promise<void> {
    const existingCity = await this.cityRepository.findOne({
      _id: cityId,
      isDeleted: false,
    });

    if (!existingCity)
      throw new notFountException('City not fount to be deleted');

    await this.cityRepository.findByIdAndDelete(cityId);
  }
}
