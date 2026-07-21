import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrpty from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/register.dto';
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
    return await this.generateToken(createUser._id.toString());
  }

  async login(body: LoginDto) {
    //find user by email
    const user = await this.usersService.findOne({ email: body.email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    //compare password
    const isPasswordMatch = await bcrpty.compare(body.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    //generate & return token
    return await this.generateToken(user._id.toString());
  }

  private async generateToken(userId: string) {
    const accessToken = await this.jwtService.signAsync({ userId });
    return { accessToken: accessToken };
  }
}
