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
import { ApiTags } from '@nestjs/swagger';
import { PaginatedResult } from 'src/common/data-access';
import { API_TAGES } from 'src/common/swagger';
import { CitiesService } from './cities.service';
import { CityResponseDto } from './dto/city-response.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CreateCitySwagger } from './swagger/create-city.swagger';
import { FindAllCitiesSwagger } from './swagger/find-all-cities.swagger';
import { FindCityByIdSwagger } from './swagger/find-city-by-id.swagger';
import { SoftDeleteCityByIdSwagger } from './swagger/soft-delete-city.swagger';
import { UpdateCitySwagger } from './swagger/update-city.swagger';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constant';

@ApiTags(API_TAGES.CITIES)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @CreateCitySwagger()
  @Post()
  @Authorize(Roles.SYSTEM_ADMIN, Roles.USER)
  async createCity(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return this.citiesService.createCity(body);
  }

  @FindAllCitiesSwagger()
  @Get()
  async findAllCities(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.citiesService.findAllCities(query);
  }

  @FindCityByIdSwagger()
  @Get('/:id')
  async findCityById(@Param('id') cityId: string): Promise<CityResponseDto> {
    return this.citiesService.findCityById(cityId);
  }

  @UpdateCitySwagger()
  @Patch('/:id')
  async updateCity(
    @Param('id') cityId: string,
    @Body() body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.citiesService.updateCity(cityId, body);
  }

  @SoftDeleteCityByIdSwagger()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authorize(Roles.SYSTEM_ADMIN)
  async deleteCity(@Param('id') cityId: string): Promise<void> {
    return this.citiesService.deleteCity(cityId);
  }
}
