import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyResponseDto } from './dto/currency-response.dto';
import { FindAllCurrenciesDto } from './dto/find-all-currencies.dto';
import { FindCurrencyByIdDto } from './dto/find-currency-by-id.dto';
import { updateCurrencyDto } from './dto/update-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  createCurrency(
    @Body() body: CreateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.createCurrency(body);
  }
  @Get()
  findAllCurries(
    @Query() query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.currenciesService.findAllCurrencies(query);
  }

  @Get(':id')
  findCurrencyById(
    @Param() param: FindCurrencyByIdDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.findCurrencyById(param.id);
  }

  @Delete(':id')
  softDeleteCurrency(@Param() param: FindCurrencyByIdDto): Promise<void> {
    return this.currenciesService.deleteCurrency(param.id);
  }

  @Patch(':id')
  updateCurrency(
    @Param() param: FindCurrencyByIdDto,
    @Body() body: updateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.updateCurrency(param.id, body);
  }
}
