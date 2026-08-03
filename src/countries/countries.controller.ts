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
import { CountriesService } from './countries.service';
import { CountryByIdDto } from './dtos/country-by-id.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { CreateCountrySwagger } from './swagger/create-country.swagger';
import { FindAllCountries } from './swagger/find-all.swagger';
import { FindCountryByIdSwagger } from './swagger/find-country-by-id.swagger';
import { SoftDeleteCountryByIdSwagger } from './swagger/soft-delete-country.swagger';
import { UpdateCountryByIdSwagger } from './swagger/update-country.swagger';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constant';

@ApiTags(API_TAGES.COUNTRIES)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @CreateCountrySwagger()
  @Post()
  @Authorize(Roles.SYSTEM_ADMIN)
  create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.createCountry(body);
  }

  @FindCountryByIdSwagger()
  @Get(':id')
  getCountry(@Param() param: CountryByIdDto): Promise<CountryResponseDto> {
    return this.countriesService.findCountryById(param.id);
  }

  @FindAllCountries()
  @Get()
  FindAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.findAllCountries(query);
  }

  @UpdateCountryByIdSwagger()
  @Patch(':id')
  @Authorize(Roles.SYSTEM_ADMIN)
  updateCountry(
    @Param() param: CountryByIdDto,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.updateCountryById(param.id, body);
  }

  @SoftDeleteCountryByIdSwagger()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authorize(Roles.SYSTEM_ADMIN)
  deleteCountry(@Param() param: CountryByIdDto): Promise<void> {
    return this.countriesService.deleteCountryById(param.id);
  }
}
