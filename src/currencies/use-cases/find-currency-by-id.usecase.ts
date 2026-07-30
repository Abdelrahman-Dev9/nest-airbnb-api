import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { CurrencyResponseDto } from '../dto/currency-response.dto';
import { CurrencyRepository } from '../repository/currency.repositry';

@Injectable()
export class FindCurrencyByIdUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!currency) throw new notFountException('No currency found');

    return plainToInstance(CurrencyResponseDto, currency);
  }
}
