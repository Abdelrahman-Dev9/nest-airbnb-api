import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, Min } from 'class-validator';

export class UpsertAppSettingsDto {
  @ApiProperty({
    description: 'vat rate',
    example: 0,
  })
  @IsOptional()
  @Min(0)
  @Max(25)
  vatRate: number;

  @ApiProperty({
    description: 'min price',
    example: 0,
  })
  @IsOptional()
  @Min(0)
  minPrice: number;
}
