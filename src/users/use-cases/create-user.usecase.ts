import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UserResponseDto } from '../dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(body: CreateUserDto): Promise<UserResponseDto> {
    //check email duplication
    const existingUserByEmail = await this.userModel.findOne({
      email: body.email,
    });
    if (existingUserByEmail) {
      throw new BadRequestException('Email already exists');
    }
    //check phoneNumber duplication
    const existingUserPhoneNumber = await this.userModel.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (existingUserPhoneNumber) {
      throw new BadRequestException('phoneNumber already exists');
    }
    //hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    //create user
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });
    return plainToInstance(UserResponseDto, user.toObject());
  }
}
