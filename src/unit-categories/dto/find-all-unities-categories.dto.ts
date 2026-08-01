import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/pagination.dto';

export class FindAllUnitesCategories extends PaginationDto {
  @ApiProperty({
    description: 'unit category name ',
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
