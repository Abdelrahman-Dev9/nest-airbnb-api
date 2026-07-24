// import { ValidationError } from '@nestjs/common';
// import { ErrorResponseInterface } from '../error-response.interface';

// export function formatInputValidationErrors(
//   errors: ValidationError[],
// ): ErrorResponseInterface[] {
//   return errors.map((error: ValidationError) => {
//     const messages: string = Object.values(error.constraints ?? []);
//     return messages.map((message: string):ErrorResponseInterface => {
//         field:error.property,
//         message
//     }).flat()
// }

import { ValidationError } from '@nestjs/common';
import { ErrorResponseInterface } from '../error-response.interface';

export function formatInputValidationErrors(
  errors: ValidationError[],
): ErrorResponseInterface[] {
  return errors.flatMap((error: ValidationError) => {
    const messages = Object.values(error.constraints ?? []);

    return messages.map((message: string): ErrorResponseInterface => ({
      field: error.property,
      message,
    }));
  });
}
