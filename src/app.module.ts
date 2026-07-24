import { Module } from '@nestjs/common';
import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { LoggerInterceptor } from './common/interceptors';

@Module({
  imports: [CoreModule, UsersModule, AuthModule],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule {}
