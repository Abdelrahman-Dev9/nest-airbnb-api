import { Injectable } from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyResponseDto } from './dto/currency-response.dto';
import { FindAllCurrenciesDto } from './dto/find-all-currencies.dto';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { FindAllCurrenciesUsecase } from './use-cases/find-all-currencies.usecase';
import { FindCurrencyByIdUseCase } from './use-cases/find-currency-by-id.usecase';
import { SoftDeleteCurrencyUseCase } from './use-cases/soft-delete-currency.usecase';
import { updateCurrencyDto } from './dto/update-currency.dto';
import { UpdateCurrencyUseCase } from './use-cases/update-currency.usecase';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly createCurrencyUseCase: CreateCurrencyUseCase,
    private readonly findAllCurrenciesUseCase: FindAllCurrenciesUsecase,
    private readonly findCurrencyByIdUseCase: FindCurrencyByIdUseCase,
    private readonly softDeleteCurrencyUseCase: SoftDeleteCurrencyUseCase,
    private readonly updateCurrencyUseCase: UpdateCurrencyUseCase,
  ) {}

  async createCurrency(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.createCurrencyUseCase.execute(body);
  }
  async findAllCurrencies(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.findAllCurrenciesUseCase.execute(query);
  }
  async findCurrencyById(currencyId: string): Promise<CurrencyResponseDto> {
    return this.findCurrencyByIdUseCase.execute(currencyId);
  }
  async deleteCurrency(currencyId: string): Promise<void> {
    return this.softDeleteCurrencyUseCase.execute(currencyId);
  }
  async updateCurrency(
    currencyId: string,
    body: updateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.updateCurrencyUseCase.execute(currencyId, body);
  }
}
