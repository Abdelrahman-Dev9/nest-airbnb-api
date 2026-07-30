import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { UserSchema } from './schemas/user.schema';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { FindUserUseCase } from './use-cases/find-user.usecase';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.USERS,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CreateUserUseCase, FindUserUseCase, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
