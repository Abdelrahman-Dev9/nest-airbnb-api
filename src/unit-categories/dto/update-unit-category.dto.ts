import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUniteCategoryDto {
  @ApiProperty({
    description: 'unit category name',
    example: 'Electronics',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'unit category icon',
    example: 'https://example.com/icon.png',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
