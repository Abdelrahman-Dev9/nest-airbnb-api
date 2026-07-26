import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserRepository } from './../repository/user.repository';
@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: QueryFilter<User>) {
    return await this.userRepository.findOne(query);
  }
}
