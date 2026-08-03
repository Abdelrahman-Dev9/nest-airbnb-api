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
import { CreateCurrencySwagger } from './swagger/create-currency.swagger';
import { FindAllCurrenciesSwagger } from './swagger/find-all-currencies.swagger';
import { FindCurrencyById } from './swagger/find-currency-by-id.swagger';
import { SoftDeleteCurrencyByIdSwagger } from './swagger/soft-delete-currency-by-id.swagger';
import { UpdateCurrenyByIdSwagger } from './swagger/update-currency-by-id.swagger';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constant';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @CreateCurrencySwagger()
  @Post()
  @Authorize(Roles.SYSTEM_ADMIN)
  createCurrency(
    @Body() body: CreateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.createCurrency(body);
  }

  @FindAllCurrenciesSwagger()
  @Get()
  findAllCurries(
    @Query() query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.currenciesService.findAllCurrencies(query);
  }

  @FindCurrencyById()
  @Get(':id')
  findCurrencyById(
    @Param() param: FindCurrencyByIdDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.findCurrencyById(param.id);
  }

  @UpdateCurrenyByIdSwagger()
  @Patch(':id')
  @Authorize(Roles.SYSTEM_ADMIN)
  updateCurrency(
    @Param() param: FindCurrencyByIdDto,
    @Body() body: updateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.updateCurrency(param.id, body);
  }

  @SoftDeleteCurrencyByIdSwagger()
  @Delete(':id')
  @Authorize(Roles.SYSTEM_ADMIN)
  softDeleteCurrency(@Param() param: FindCurrencyByIdDto): Promise<void> {
    return this.currenciesService.deleteCurrency(param.id);
  }
}
