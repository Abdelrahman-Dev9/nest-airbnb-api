import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { RefreashTokenDto } from './dto/RefreshTokenDto.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';
import { AuthResponseDto } from './dto/auth-response.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async register(body: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUseCase.execute(body);
  }

  async login(body: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(body);
  }

  async refreshToken(body: RefreashTokenDto): Promise<AuthResponseDto> {
    return this.refreshTokenUseCase.execute(body);
  }
}
