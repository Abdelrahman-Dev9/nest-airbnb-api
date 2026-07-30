import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { LoggerInterceptor } from './common/interceptors';
import { CoreModule } from './core.module';
import { CountriesModule } from './countries/countries.module';
import { UsersModule } from './users/users.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, CountriesModule, CitiesModule, CurrenciesModule],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule {}
