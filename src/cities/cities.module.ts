import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { CountriesModule } from 'src/countries/countries.module';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityRepository } from './repository/city.repository';
import { CitySchema } from './schema/city.schema';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { FindAllCitiesUsecase } from './use-cases/find-all-cities.usecase';
import { UpdateCityUsecase } from './use-cases/update-city.usecase';
import { SoftDeleteCityUsecase } from './use-cases/soft-delete-city.usecase';
import { FindCityByIdUsecase } from './use-cases/find-city-by-id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelName.CITIES, schema: CitySchema }]),
    CountriesModule,
  ],
  controllers: [CitiesController],
  providers: [
    CitiesService,
    CityRepository,
    CreateCityUseCase,
    FindAllCitiesUsecase,
    UpdateCityUsecase,
    SoftDeleteCityUsecase,
    FindCityByIdUsecase,
  ],
})
export class CitiesModule {}
