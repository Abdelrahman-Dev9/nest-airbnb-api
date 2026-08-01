import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @ApiProperty({
    description: 'country name',
    example: 'Egypt',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'country code',
    example: 'EG',
  })
  @IsString()
  @IsOptional()
  countryCode?: string;
}
