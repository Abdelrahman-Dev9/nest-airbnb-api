import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryRepository } from './repository/country.repositry';
import { CountrySchema } from './schema/country.schema';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { FindAllCountriesUsecase } from './use-cases/find-all-countries.usecase';
import { FindCountryByIdUseCase } from './use-cases/find-country-by-id.usecase';
import { SoftDeleteCountryUseCase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './use-cases/update-country.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.COUNTRIES, schema: CountrySchema },
    ]),
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    CreateCountryUseCase,
    FindCountryByIdUseCase,
    FindAllCountriesUsecase,
    SoftDeleteCountryUseCase,
    UpdateCountryUseCase,
    CountryRepository,
  ],
})
export class CountriesModule {}
