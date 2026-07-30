import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repositry';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(currencyId: string): Promise<void> {
    const existingCurrency = await this.currencyRepository.findOne({
      _id: currencyId,
      isDeleted: { $ne: true },
    });

    if (!existingCurrency) throw new notFountException('Currency not fount ');

    await this.currencyRepository.findByIdAndUpdate(currencyId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
