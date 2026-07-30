import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { BaseRepository, ModelName } from '../../common/data-access';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(ModelName.USERS)
    private readonly userModel: Model<HydratedDocument<User>>,
  ) {
    super(userModel);
  }
}
