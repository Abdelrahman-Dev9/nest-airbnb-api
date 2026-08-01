import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class updateCurrencyDto {
  @ApiProperty({
    description: 'currency name',
    example: 'Egyption Pound',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'currency code',
    example: 'EGP',
  })
  @IsString()
  @IsOptional()
  currencyCode?: string;
}
