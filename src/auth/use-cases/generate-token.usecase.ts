import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrpty from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { EnvironmentInterface } from 'src/common/configuration/configuration.interface';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { RefreshTokenRepository } from './../repository/refresh-token.repository';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}
  async execute(userId: string): Promise<AuthResponseDto> {
    const accessToken = await this.jwtService.signAsync({ userId });
    const refreshToken = await this.jwtService.signAsync(
      { userId, type: 'refresh' },
      {
        expiresIn: this.configService.getOrThrow('refreshTokenExpireIn'),
      },
    );

    //hash refreshToken

    const hashedRefreshToken = await bcrpty.hash(refreshToken, 10);

    await this.refreshTokenRepository.findOneAndUpdate(
      { userId },
      { refreshToken: hashedRefreshToken },
      { returnDocument: 'after', upsert: true },
    );
    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
