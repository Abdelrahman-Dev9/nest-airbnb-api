import { Injectable, Logger } from '@nestjs/common';
import { Roles } from 'src/common/constant';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/Login.dto';
import { LoginAsSystemAdminUseCase } from './login-as-system-admin.usecase';
import { LoginAsUserUseCase } from './login-as-user.usecase';

@Injectable()
export class LoginUseCase {
  private readonly looger = new Logger(LoginUseCase.name);
  constructor(
    private readonly loginAsUserUseCase: LoginAsUserUseCase,
    private readonly loginAsSystemAdminUseCase: LoginAsSystemAdminUseCase,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    if (body.role.includes(Roles.USER)) {
      return this.loginAsUserUseCase.execute(body);
    }

    return this.loginAsSystemAdminUseCase.execute(body);
  }
}
