import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @ApiProperty({
    description: 'access token',
    example:
      'kljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfg',
  })
  @Expose()
  accessToken: string;
  @ApiProperty({
    description: 'refresh token',
    example:
      'kljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfgkljsdlk2jo223sds22dsfg',
  })
  @Expose()
  refreshToken: string;
}
