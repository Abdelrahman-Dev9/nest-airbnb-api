import { BasecustomerException } from './base-custom.exception';

export class notFountException extends BasecustomerException {
  status: 404;
  constructor(message: string) {
    super(message);
  }
}
