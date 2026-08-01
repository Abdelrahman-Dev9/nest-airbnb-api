import { ApiProperty } from '@nestjs/swagger';
export class AppSettingsResponseDto {
  @ApiProperty({
    description: 'vat rate',
    example: 0,
  })
  vatRate: number;
  @ApiProperty({
    description: 'min price',
    example: 0,
  })
  minPrice: number;
}
