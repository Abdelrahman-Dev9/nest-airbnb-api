import { Injectable } from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CityResponseDto } from './dto/city-response.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { FindAllCitiesUsecase } from './use-cases/find-all-cities.usecase';
import { FindCityByIdUsecase } from './use-cases/find-city-by-id.usecase';
import { SoftDeleteCityUsecase } from './use-cases/soft-delete-city.usecase';
import { UpdateCityUsecase } from './use-cases/update-city.usecase';

@Injectable()
export class CitiesService {
  constructor(
    private readonly createCityUseCase: CreateCityUseCase,
    private readonly findAllCitiesUsecase: FindAllCitiesUsecase,
    private readonly updateCityUseCase: UpdateCityUsecase,
    private readonly findCityByIdUsecase: FindCityByIdUsecase,
    private readonly softDeleteCityUsecase: SoftDeleteCityUsecase,
  ) {}

  async createCity(body: CreateCityDto): Promise<CityResponseDto> {
    return this.createCityUseCase.execute(body);
  }
  async findAllCities(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.findAllCitiesUsecase.execute(query);
  }
  async updateCity(
    cityId: string,
    body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.updateCityUseCase.execute(cityId, body);
  }

  async findCityById(cityId: string): Promise<CityResponseDto> {
    return this.findCityByIdUsecase.execute(cityId);
  }

  async deleteCity(cityId: string): Promise<void> {
    return this.softDeleteCityUsecase.execute(cityId);
  }

  // async findOne(query: QueryFilter<City>): Promise<CityResponseDto> {
  //   return this..execute(query);
  // }
}
