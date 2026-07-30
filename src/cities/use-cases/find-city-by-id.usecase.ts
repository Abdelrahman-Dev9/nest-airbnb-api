import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';
import { notFountException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { CityResponseDto } from '../dto/city-response.dto';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class FindCityByIdUsecase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(cityId: string): Promise<CityResponseDto> {
    const city = await this.cityRepository.findOne({
      _id: new Types.ObjectId(cityId),
      isDeleted: false,
    });

    if (!city) throw new notFountException('City not found');

    return plainToInstance(CityResponseDto, city);
  }
}
