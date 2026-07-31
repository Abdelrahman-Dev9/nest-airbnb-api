import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/common/constant';

export class LoginDto {
  @ApiProperty({
    description: 'user email',
    example: 'jhon@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password',
    example: 'Hello@@1',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'string',
    enum: Roles,
    description: 'actor role',
    example: Roles.USER,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
