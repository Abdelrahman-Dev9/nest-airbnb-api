import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryFilter } from 'mongoose';
import { PaginatedResult } from '../../common/data-access';
import { CurrencyResponseDto } from '../dto/currency-response.dto';
import { FindAllCurrenciesDto } from '../dto/find-all-currencies.dto';
import { CurrencyRepository } from '../repository/currency.repositry';
import { Currency } from '../schema/currency.schema';

@Injectable()
export class FindAllCurrenciesUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    const matchQuery: QueryFilter<Currency> = { isDeleted: { $ne: true } };
    if (query?.name) matchQuery.name = { $regex: query.name, $options: 'i' };
    if (query?.currencyCode) matchQuery.currencyCode = query.currencyCode;

    const result = await this.currencyRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      lean: true,
    });

    return plainToInstance(PaginatedResult<CurrencyResponseDto>, result);
  }
}
