import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserRepository } from './../repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(body: CreateUserDto): Promise<UserResponseDto> {
    //check email duplication
    const existingUserByEmail = await this.userRepository.findOne({
      email: body.email,
    });
    if (existingUserByEmail) {
      throw new BadRequestException('Email already exists');
    }
    //check phoneNumber duplication
    const existingUserPhoneNumber = await this.userRepository.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (existingUserPhoneNumber) {
      throw new BadRequestException('phoneNumber already exists');
    }
    //hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    //create user
    const user = await this.userRepository.create({
      ...body,
      password: hashedPassword,
    });
    return plainToInstance(UserResponseDto, user.toObject());
  }
}
