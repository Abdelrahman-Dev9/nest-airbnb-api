import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUniteCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
