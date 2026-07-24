import { ErrorResponseInterface } from '../error-response.interface';

export abstract class BasecustomerException extends Error {
  abstract status: number;
  protected constructor(message: string) {
    super(message);
  }
  formateError(): ErrorResponseInterface[] {
    return [{ message: this.message }];
  }
}
