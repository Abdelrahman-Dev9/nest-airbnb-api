import { IsOptional, IsString } from 'class-validator';

export class UpdateUniteCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
