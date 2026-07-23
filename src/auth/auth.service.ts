import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { RefreashTokenDto } from './dto/RefreshTokenDto.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';
@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async register(body: RegisterDto) {
    return this.registerUseCase.execute(body);
  }

  async login(body: LoginDto) {
    return this.loginUseCase.execute(body);
  }

  async refreshToken(body: RefreashTokenDto) {
    return this.refreshTokenUseCase.execute(body);
  }
}
