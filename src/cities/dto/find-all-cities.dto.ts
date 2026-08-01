import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/pagination.dto';

export class FindAllCitiesDto extends PaginationDto {
  @ApiProperty({
    description: 'city name',
    example: 'Egypt',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'country id',
    example: '123456789012345678901234',
  })
  @IsOptional()
  @IsMongoId()
  cityCode?: string;
}
