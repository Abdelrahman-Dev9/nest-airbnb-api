import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreashTokenDto {
  @ApiProperty({
    description: 'refresh token',
    example:
      'kljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfg',
  })
  @IsNotEmpty()
  @IsString()
  RefreshToken: string;
}
