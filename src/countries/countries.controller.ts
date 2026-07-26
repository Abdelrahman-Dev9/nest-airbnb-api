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
import { CountriesService } from './countries.service';
import { CountryByIdDto } from './dtos/country-by-id.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.createCountry(body);
  }
  @Get(':id')
  getCountry(@Param() param: CountryByIdDto): Promise<CountryResponseDto> {
    return this.countriesService.findCountryById(param.id);
  }
  @Get()
  FindAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.findAllCountries(query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCountry(@Param() param: CountryByIdDto): Promise<void> {
    return this.countriesService.deleteCountryById(param.id);
  }

  @Patch(':id')
  updateCountry(
    @Param() param: CountryByIdDto,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.updateCountryById(param.id, body);
  }
}
