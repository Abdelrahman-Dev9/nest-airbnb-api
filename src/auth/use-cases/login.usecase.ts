import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrpty from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from '../dto/Login.dto';
import { GenerateTokenUseCase } from './generate-token.usecase';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: LoginDto) {
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
    return await this.generateTokenUseCase.execute(user._id.toString());
  }
}
