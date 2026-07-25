import { BasecustomerException } from './base-custom.exception';

export class forbbidenException extends BasecustomerException {
  status = 403;
  constructor(message: string) {
    super(message);
  }
}
