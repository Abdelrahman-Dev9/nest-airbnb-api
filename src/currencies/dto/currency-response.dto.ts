import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
  @ApiProperty({
    description: 'The currency ID',
    example: '5f6f6f6f6f6f6f6f6f6f6f6f',
  })
  _id: string;

  @ApiProperty({
    description: 'The currency name',
    example: 'Egyption Pound',
  })
  name: string;

  @ApiProperty({
    description: 'The currency code',
    example: 'EGP',
  })
  currencyCode: string;
}
