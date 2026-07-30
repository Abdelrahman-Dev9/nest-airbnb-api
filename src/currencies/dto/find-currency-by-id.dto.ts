import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindCurrencyByIdDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'must be a valid mongo id' })
  id: string;
}
