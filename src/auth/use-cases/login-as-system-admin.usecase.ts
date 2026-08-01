import { Injectable } from '@nestjs/common';
import * as bcyrpt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { SystemAdminsService } from './../../system-admins/system-admins.service';
import { LoginDto } from './../dto/Login.dto';
import { GenerateTokenUseCase } from './generate-token.usecase';
@Injectable()
export class LoginAsSystemAdminUseCase {
  constructor(
    private readonly generateTokenUseCase: GenerateTokenUseCase,
    private readonly systemAdminsService: SystemAdminsService,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    //find system admin by email
    const systemAdmin = await this.systemAdminsService.findOne({
      email: loginDto.email,
    });
    if (!systemAdmin) {
      throw new badRequestException('invalid credentials');
    }

    //compare password

    const isPasswordMatch = await bcyrpt.compare(
      loginDto.password,
      systemAdmin.password,
    );
    if (!isPasswordMatch) {
      throw new badRequestException('invalid credentials');
    }

    //generate & return token
    const { accessToken, refreshToken } =
      await this.generateTokenUseCase.execute({
        id: systemAdmin._id.toString(),
        role: loginDto.role,
      });

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
