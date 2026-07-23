import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindUserUseCase } from './use-cases/find-user.usecase';
@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  async create(body: CreateUserDto) {
    return this.createUserUseCase.create(body);
  }
  async findOne(query: QueryFilter<User>) {
    return this.findUserUseCase.execute(query);
  }
}
