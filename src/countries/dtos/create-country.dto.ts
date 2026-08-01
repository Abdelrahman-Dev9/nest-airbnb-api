import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    description: 'country name',
    example: 'Nigeria',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'country code',
    example: 'NG',
  })
  @IsString()
  @IsOptional()
  countryCode?: string;
}
