import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { CurrencyRepository } from './repository/currency.repositry';
import { CurrencySchema } from './schema/currency.schema';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { FindAllCurrenciesUsecase } from './use-cases/find-all-currencies.usecase';
import { FindCurrencyByIdUseCase } from './use-cases/find-currency-by-id.usecase';
import { SoftDeleteCurrencyUseCase } from './use-cases/soft-delete-currency.usecase';
import { UpdateCurrencyUseCase } from './use-cases/update-currency.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.CURRENCIES, schema: CurrencySchema },
    ]),
  ],
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    CurrencyRepository,
    CreateCurrencyUseCase,
    FindAllCurrenciesUsecase,
    FindCurrencyByIdUseCase,
    SoftDeleteCurrencyUseCase,
    UpdateCurrencyUseCase,
  ],
})
export class CurrenciesModule {}
