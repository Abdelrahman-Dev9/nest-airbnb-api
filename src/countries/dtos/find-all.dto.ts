import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/pagination.dto';

export class FindAllDto extends PaginationDto {
  @ApiProperty({
    description: 'country name',
    example: 'Nigeria',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'country code',
    example: 'NG',
  })
  @IsOptional()
  @IsString()
  countryCode?: string;
}
