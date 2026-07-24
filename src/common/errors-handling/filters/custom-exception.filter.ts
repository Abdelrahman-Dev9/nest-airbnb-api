// import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
// import { Response } from 'express';
// import { BasecustomerException } from '../custom-exceptions/base-custom.exception';
// import { I18nValidationException } from 'nestjs-i18n';

// @Catch()
// export class customExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const response = host.switchToHttp().getResponse<Response>();

//     if (exception instanceof BasecustomerException) {
//       return response.status(exception.status).send({
//         errors: exception.formateError(),
//       });
//     }

//     if (exception instanceof I18nValidationException) {
//       return response.status(exception.status).send({
//         errors: exception.formateError(),
//       });
//     }

//     //unkonw error
//     response.status(500).json({
//       errors: [{ message: 'Internal server error' }],
//     });
//   }
// }
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';

import { BasecustomerException } from '../custom-exceptions/base-custom.exception';
import { formatInputValidationErrors } from '../input-validation/format-input-validation-errors';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof BasecustomerException) {
      return response.status(exception.status).json({
        errors: exception.formateError(),
      });
    }

    if (exception instanceof I18nValidationException) {
      return response.status(400).json({
        errors: formatInputValidationErrors(exception.errors),
      });
    }

    return response.status(500).json({
      errors: [{ message: 'Internal server error' }],
    });
  }
}
