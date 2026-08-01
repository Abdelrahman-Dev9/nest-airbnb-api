import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCityDto {
  @ApiProperty({
    description: 'city name',
    example: 'cairo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'city name',
    example: '123456789012345678901234',
  })
  @IsOptional()
  @IsMongoId()
  cityCode?: string;
}
