import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { EnvironmentInterface } from 'src/common/configuration/configuration.interface';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { GenerateTokenUseCase } from './use-cases/generate-token.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        secret: configService.getOrThrow('jwtSecret'),
        signOptions: {
          expiresIn: configService.getOrThrow('accessTokenExpireIn'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUseCase,
    GenerateTokenUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
