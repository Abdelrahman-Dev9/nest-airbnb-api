import { ApiProperty } from '@nestjs/swagger';

export class CityResponseDto {
  @ApiProperty({
    description: 'city id',
    example: '5f6f6f6f6f6f6f6f6f6f6f6f',
    isArray: true,
  })
  _id: string;

  @ApiProperty({
    description: 'city name',
    example: 'cairo',
  })
  name: string;

  @ApiProperty({
    description: 'country code',
    example: '123456789012345678901234',
  })
  cityCode: string;
}
