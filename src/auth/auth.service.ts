import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrpty from 'bcrypt';
import { Model } from 'mongoose';
import { EnvironmentInterface } from 'src/common/configuration/configuration.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/Login.dto';
import { RefreashTokenDto } from './dto/RefreshTokenDto.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshToken } from './schemas/refresh-token.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async register(body: RegisterDto) {
    // Create user
    const createUserDto: CreateUserDto = { ...body };
    const createUser = await this.usersService.create(createUserDto);

    // Generate token
    return await this.generateToken(createUser._id.toString());
  }

  async login(body: LoginDto) {
    //find user by email
    const user = await this.usersService.findOne({ email: body.email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    //compare password
    const isPasswordMatch = await bcrpty.compare(body.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    //generate & return token
    return await this.generateToken(user._id.toString());
  }

  private async generateToken(userId: string) {
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

  async refreshToken(body: RefreashTokenDto) {
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
      if (decodedToken.type !== 'refresh') {
        throw new BadRequestException('Invalid refresh token');
      }
      // return this.generateToken(decodedToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
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
    return await this.generateToken(refreshTokenDoc.userId);
  }
}
