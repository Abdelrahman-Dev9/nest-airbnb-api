import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentInterface } from 'src/common/configuration/configuration.interface';
import { ModelName } from 'src/common/data-access';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { GenerateTokenUseCase } from './use-cases/generate-token.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.REFRESHTOKEN,
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
    RefreshTokenRepository,
  ],
})
export class AuthModule {}
