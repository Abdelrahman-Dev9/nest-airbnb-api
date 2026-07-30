import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindUnitCategoryById {
  @IsNotEmpty()
  @IsMongoId({
    message: 'id must be a valid mongo id',
  })
  id: string;
}
