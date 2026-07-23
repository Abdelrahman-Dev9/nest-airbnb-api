import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentInterface } from 'src/common/configuration/configuration.interface';
import * as bcrpty from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}
  async execute(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    const refreshToken = await this.jwtService.signAsync(
      { userId, type: 'refresh' },
      {
        expiresIn: this.configService.getOrThrow('refreshTokenExpireIn'),
      },
    );

    //hash refreshToken

    const hashedRefreshToken = await bcrpty.hash(refreshToken, 10);

    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { refreshToken: hashedRefreshToken },
      { returnDocument: 'after', upsert: true },
    );
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
