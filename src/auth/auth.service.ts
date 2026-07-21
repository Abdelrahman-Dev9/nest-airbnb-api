import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    // Create user
    const createUserDto: CreateUserDto = { ...body };
    const createUser = await this.usersService.create(createUserDto);

    // Generate token
    const token = await this.generateToken(createUser._id.toString());

    return token;
  }

  private async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    return { accessToken: accessToken };
  }
}
