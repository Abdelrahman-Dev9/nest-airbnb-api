import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'user name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'user email',
    example: 'jhon@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user phone number',
    example: '0123456789',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'user password',
    example: 'Hello@@1',
  })
  @IsNotEmpty()
  password: string;
}
