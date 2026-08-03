import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    description: 'city name',
    example: 'cairo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'country id',
    example: '123456789012345678901234',
  })
  @IsNotEmpty()
  @IsString()
  cityCode: string;
}
