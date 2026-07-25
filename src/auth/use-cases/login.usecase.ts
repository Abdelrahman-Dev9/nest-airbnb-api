import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrpty from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/Login.dto';
import { GenerateTokenUseCase } from './generate-token.usecase';

@Injectable()
export class LoginUseCase {
  private readonly looger = new Logger(LoginUseCase.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    this.looger.log('login request for email: ', body.email);
    //find user by email
    const user = await this.usersService.findOne({ email: body.email });
    if (!user) {
      throw new badRequestException('Invalid credentials');
    }
    //compare password
    const isPasswordMatch = await bcrpty.compare(body.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    //generate & return token
    const { accessToken, refreshToken } =
      await this.generateTokenUseCase.execute(user._id.toString());

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
