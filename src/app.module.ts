import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { CitiesModule } from './cities/cities.module';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { LoggerInterceptor } from './common/interceptors';
import { CoreModule } from './core.module';
import { CountriesModule } from './countries/countries.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { SystemAdminsModule } from './system-admins/system-admins.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthModule,
    CountriesModule,
    CitiesModule,
    CurrenciesModule,
    UnitCategoriesModule,
    AppSettingsModule,
    SystemAdminsModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [UsersModule, SystemAdminsModule],
})
export class AppModule {}
