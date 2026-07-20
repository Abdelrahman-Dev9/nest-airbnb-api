import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly UsersService: UsersService) {}
  async register(body: RegisterDto) {
    //create user

    const createUserDto: CreateUserDto = { ...body };
    await this.UsersService.create(createUserDto);

    //generate token
    //return token
  }
}
