import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CitiesService } from './cities.service';
import { CityResponseDto } from './dto/city-response.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async createCity(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return this.citiesService.createCity(body);
  }

  @Get()
  async findAllCities(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.citiesService.findAllCities(query);
  }

  // @Patch(':id')
  // async updateCity(
  //   @Param() cityId: CountryByIdDto,
  //   @Body() body: CreateCityDto,
  // ): Promise<CityResponseDto> {
  //   return this.citiesService.updateCity(cityId.id, body);
  // }

  @Get('/:id')
  async findCityById(@Param('id') cityId: string): Promise<CityResponseDto> {
    return this.citiesService.findCityById(cityId);
  }

  @Patch('/:id')
  async updateCity(
    @Param('id') cityId: string,
    @Body() body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.citiesService.updateCity(cityId, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCity(@Param('id') cityId: string): Promise<void> {
    return this.citiesService.deleteCity(cityId);
  }
}
