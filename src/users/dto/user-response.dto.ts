import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  _id: string;
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: string;
}
