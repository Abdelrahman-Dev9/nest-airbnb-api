import { BasecustomerException } from './base-custom.exception';

export class badRequestException extends BasecustomerException {
  status = 400;

  constructor(message: string) {
    super(message);
  }
}
