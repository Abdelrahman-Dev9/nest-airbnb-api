import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { GenerateTokenUseCase } from './generate-token.usecase';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: RegisterDto) {
    // Create user
    const createUserDto: CreateUserDto = { ...body };
    const createUser = await this.usersService.create(createUserDto);

    // Generate token
    return await this.generateTokenUseCase.execute(createUser._id.toString());
  }
}
