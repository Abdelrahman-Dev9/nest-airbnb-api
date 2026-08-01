import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindCurrencyByIdDto {
  @ApiProperty({
    description: 'The currency ID',
    example: '5f6f6f6f6f6f6f6f6f6f6f6f',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'must be a valid mongo id' })
  id: string;
}
