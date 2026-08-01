import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindUnitCategoryById {
  @ApiProperty({
    description: 'unit category id',
    example: '5f6f6f6f6f6f6f6f6f6f6f6f',
  })
  @IsNotEmpty()
  @IsMongoId({
    message: 'id must be a valid mongo id',
  })
  id: string;
}
