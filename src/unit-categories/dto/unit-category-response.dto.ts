import { ApiProperty } from '@nestjs/swagger';

export class UnitCategoryResponseDto {
  @ApiProperty({
    description: 'unit category id',
    example: '5f6f6f6f6f6f6f6f6f6f6f6f',
    isArray: true,
  })
  _id: string;

  @ApiProperty({
    description: 'unit category name',
    example: 'Electronics',
  })
  name: string;

  @ApiProperty({
    description: 'unit category icon',
    example: 'https://example.com/icon.png',
  })
  icon: string;
}
