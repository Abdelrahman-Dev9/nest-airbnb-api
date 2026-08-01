import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/pagination.dto';

export class FindAllCurrenciesDto extends PaginationDto {
  @ApiProperty({
    description: 'currency name',
    example: 'Egyption Pound',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'currency code',
    example: 'EGP',
  })
  @IsOptional()
  @IsString()
  currencyCode?: string;
}
