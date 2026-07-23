import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrpty from 'bcrypt';
import { Model } from 'mongoose';
import { RefreashTokenDto } from '../dto/RefreshTokenDto.dto';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { GenerateTokenUseCase } from './generate-token.usecase';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: RefreashTokenDto) {
    type RefreshTokenPayload = {
      userId: string;
      type: 'access' | 'refresh';
    };
    let decodedToken: RefreshTokenPayload;
    try {
      decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        body.RefreshToken,
      );

      console.log(decodedToken);

      // return this.generateToken(decodedToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (decodedToken.type !== 'refresh') {
      throw new BadRequestException('Invalid refresh token');
    }

    //hash refresh token
    // const hashedRefreshToken = await bcrpty.hash(body.RefreshToken, 10);

    //find refresh token
    const refreshTokenDoc = await this.refreshTokenModel.findOne({
      userId: decodedToken.userId,
    });

    console.log('refreshTokenDoc', refreshTokenDoc);

    if (!refreshTokenDoc) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    //compare refresh token
    const isRefreshTokenMatched = await bcrpty.compare(
      body.RefreshToken,
      refreshTokenDoc.refreshToken,
    );

    console.log('isRefreshTokenMatched', isRefreshTokenMatched);

    if (!isRefreshTokenMatched) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    //generate & return token
    return await this.generateTokenUseCase.execute(refreshTokenDoc.userId);
  }
}
