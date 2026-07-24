import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { User } from '../schemas/user.schema';
@Injectable()
export class FindUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async execute(query: QueryFilter<User>) {
    return await this.userModel.findOne(query);
  }
}
