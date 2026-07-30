import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
