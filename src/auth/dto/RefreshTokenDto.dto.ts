import { IsNotEmpty, IsString } from 'class-validator';

export class RefreashTokenDto {
  @IsNotEmpty()
  @IsString()
  RefreshToken: string;
}
