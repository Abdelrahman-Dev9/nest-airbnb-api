import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { CityResponseDto } from '../dto/city-response.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class UpdateCityUsecase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(cityId: string, body: UpdateCityDto): Promise<CityResponseDto> {
    // check city exists
    const city = await this.cityRepository.findOne({
      _id: cityId,
      isDeleted: false,
    });
    if (!city) throw new NotFoundException('City not found');

    // check name duplication per-country
    const existingCityByName = await this.cityRepository.findOne({
      name: body.name,
      country: city.cityCode,
      isDeleted: false,
      _id: { $ne: cityId },
    });

    if (existingCityByName)
      throw new badRequestException('City name already exists');

    const updatedCity = await this.cityRepository.findByIdAndUpdate(
      cityId,
      body,
    );

    return plainToInstance(CityResponseDto, updatedCity?.toObject());
  }
}
