import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/pagination.dto';

export class FindAllUnitesCategories extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
