import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { CountriesService } from 'src/countries/countries.service';
import { CityResponseDto } from '../dto/city-response.dto';
import { CreateCityDto } from '../dto/create-city.dto';
import { CityRepository } from './../repository/city.repository';

@Injectable()
export class CreateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countriesService: CountriesService,
  ) {}

  async execute(body: CreateCityDto): Promise<CityResponseDto> {
    const existingCity = await this.cityRepository.findOne({
      name: body.name,
      country: body.country,
      isDeleted: { $ne: true },
    });

    if (existingCity) {
      throw new badRequestException('City already exists');
    }

    //validate by id
    // await this.countriesService.findCountryById(body.country);

    const city = await this.cityRepository.create(body);
    return plainToInstance(CityResponseDto, city.toObject());
  }
}
