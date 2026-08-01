import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CountryByIdDto {
  @ApiProperty({
    description: 'country id',
    example: '123456789012345678901234',
  })
  @IsNotEmpty()
  @IsMongoId({ message: 'must be a valid mongo id' })
  id: string;
}
