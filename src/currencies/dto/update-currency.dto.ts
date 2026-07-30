import { IsOptional, IsString } from 'class-validator';

export class updateCurrencyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
