import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CountryByIdDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'must be a valid mongo id' })
  id: string;
}
