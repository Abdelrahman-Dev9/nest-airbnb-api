import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { CurrencyResponseDto } from '../dto/currency-response.dto';
import { updateCurrencyDto } from '../dto/update-currency.dto';
import { CurrencyRepository } from './../repository/currency.repositry';

@Injectable()
export class UpdateCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}
  async execute(
    currencyId: string,
    body: updateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    const existingCurrency = await this.currencyRepository.findOne({
      _id: currencyId,
      isDeleted: { $ne: true },
    });

    if (!existingCurrency) throw new notFountException('Currency not found');

    // check if the name is already taken
    if (body?.name) {
      const existingCurrency = await this.currencyRepository.findOne({
        name: body.name,
        isDeleted: { $ne: true },
        _id: { $ne: currencyId },
      });

      if (existingCurrency)
        throw new badRequestException('Currency name already exists');
    }

    const updatedCurrency = await this.currencyRepository.findByIdAndUpdate(
      currencyId,
      body,
      {
        returnDocument: 'after',
      },
    );

    return plainToInstance(CurrencyResponseDto, updatedCurrency?.toObject());
  }
}
