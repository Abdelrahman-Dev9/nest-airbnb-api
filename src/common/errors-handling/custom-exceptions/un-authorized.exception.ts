import { HttpStatus } from '@nestjs/common';
import { BasecustomerException } from './base-custom.exception';

export class UnAuthorizedException extends BasecustomerException {
  status = HttpStatus.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}
