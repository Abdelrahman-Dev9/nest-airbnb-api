import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class createHelloDto {
  @IsEmail(
    {},
    { message: i18nValidationMessage('validation.EMAIL_NOT_FORMATTED') },
  )
  email: string;
}
