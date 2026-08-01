import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrpty from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { RefreashTokenDto } from '../dto/RefreshTokenDto.dto';
import { RefreshTokenRepository } from './../repository/refresh-token.repository';
import { GenerateTokenUseCase } from './generate-token.usecase';
import { Roles } from 'src/common/constant';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: RefreashTokenDto): Promise<AuthResponseDto> {
    type RefreshTokenPayload = {
      payload: {
        id: string;
        role: string;
      };
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
    const refreshTokenDoc = await this.refreshTokenRepository.findOne({
      userId: decodedToken.payload.id,
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
    const { accessToken, refreshToken } =
      await this.generateTokenUseCase.execute({
        id: decodedToken.payload.id,
        role: decodedToken.payload.role as Roles,
      });

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
