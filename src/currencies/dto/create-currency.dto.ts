import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty({
    description: 'currency name',
    example: 'Egyption Pound',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'currency code',
    example: 'EGP',
  })
  @IsString()
  @IsOptional()
  currencyCode?: string;
}
