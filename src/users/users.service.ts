import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindUserUseCase } from './use-cases/find-user.usecase';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  async create(body: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(body);
  }
  async findOne(query: QueryFilter<User>): Promise<UserResponseDto> {
    const user = await this.findUserUseCase.execute(query);
    return plainToInstance(UserResponseDto, user);
  }
}
