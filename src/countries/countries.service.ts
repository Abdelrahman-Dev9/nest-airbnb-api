import { Injectable } from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { FindAllCountriesUsecase } from './use-cases/find-all-countries.usecase';
import { FindCountryByIdUseCase } from './use-cases/find-country-by-id.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';

@Injectable()
export class CountriesService {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly findCountryByIdUseCase: FindCountryByIdUseCase,
    private readonly findAllCountriesUseCase: FindAllCountriesUsecase,
    private readonly softDeleteCountryUseCase: SoftDeleteCountryUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
  ) {}

  async createCountry(body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.createCountryUseCase.execute(body);
  }
  async findCountryById(id: string): Promise<CountryResponseDto> {
    return this.findCountryByIdUseCase.execute(id);
  }
  async findAllCountries(
    query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.findAllCountriesUseCase.execute(query);
  }

  async deleteCountryById(id: string): Promise<void> {
    return this.softDeleteCountryUseCase.execute(id);
  }
  async updateCountryById(
    id: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.updateCountryUseCase.execute(id, body);
  }
}
