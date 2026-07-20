import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserDto) {
    //check email duplication
    const existingUserByEmail = await this.userModel.findOne({
      email: body.email,
    });
    if (existingUserByEmail) {
      throw new badRequestException('Email already exists');
    }
    //check phoneNumber duplication
    const existingUserPhoneNumber = await this.userModel.findOne({
      email: body.email,
    });
    if (existingUserPhoneNumber) {
      throw new badRequestException('Email already exists');
    }
    //hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    //create user
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });
    return user;
  }
}
