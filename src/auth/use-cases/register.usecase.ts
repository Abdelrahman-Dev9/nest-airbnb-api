import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { GenerateTokenUseCase } from './generate-token.usecase';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: RegisterDto): Promise<AuthResponseDto> {
    // Create user
    const createUserDto: CreateUserDto = { ...body };
    const createUser = await this.usersService.create(createUserDto);

    // Generate token
    const { accessToken, refreshToken } =
      await this.generateTokenUseCase.execute(createUser._id.toString());

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
