import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGES } from 'src/common/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/Login.dto';
import { RefreashTokenDto } from './dto/RefreshTokenDto.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginSwagger } from './swagger/login.swagger';
import { RefreshTokenSwagger } from './swagger/refresh-token.swagger';
import { RegisterSwagger } from './swagger/register.swagger';
import { Public } from './decorators/public.decorators';

@ApiTags(API_TAGES.AUTH)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @RegisterSwagger()
  @Post('register')
  signup(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }
  @LoginSwagger()
  @Post('login')
  @Public()
  login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    this.logger.log('login operation');
    return this.authService.login(body);
  }

  @RefreshTokenSwagger()
  @Post('refresh-token')
  refreshToken(@Body() body: RefreashTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(body);
  }
}
