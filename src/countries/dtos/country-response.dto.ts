import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({
    description: 'country id',
    example: '123456789012345678901234',
    isArray: true,
  })
  _id: string;

  @ApiProperty({
    description: 'country name',
    example: 'Nigeria',
  })
  name: string;

  @ApiProperty({
    description: 'country code',
    example: 'NG',
  })
  code: string;
}
