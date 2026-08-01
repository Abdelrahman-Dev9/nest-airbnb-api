import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Roles } from 'src/common/constant';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { RegisterDto } from '../dto/register.dto';
import { GenerateTokenUseCase } from './generate-token.usecase';

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
      await this.generateTokenUseCase.execute({
        id: createUser._id.toString(),
        role: Roles.USER,
      });

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
