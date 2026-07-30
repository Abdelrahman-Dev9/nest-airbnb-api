import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { CurrencyResponseDto } from '../dto/currency-response.dto';
import { CurrencyRepository } from '../repository/currency.repositry';

@Injectable()
export class CreateCurrencyUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    const existingCurrency = await this.currencyRepository.findOne({
      name: body.name,
      isDeleted: { $ne: true },
    });
    if (existingCurrency) {
      throw new badRequestException('Currency already exists');
    }

    const currency = await this.currencyRepository.create(body);
    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
