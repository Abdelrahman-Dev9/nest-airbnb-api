import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function UpdateCountryByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Country',
      description: 'Update country and reciev the updated country',
    }),
    ApiResponse({ status: 200, type: CountryResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation or business logic errors',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              errors: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                  required: ['message'],
                },
              },
            },
            required: ['errors'],
          },
          examples: {
            CountryNameRequired: {
              summary: 'Country name is required',
              value: {
                errors: [
                  {
                    message: 'name should not be empty',
                  },
                ],
              },
            },
            CountryCodeRequired: {
              summary: 'Country code is required',
              value: {
                errors: [
                  {
                    message: 'countryCode should not be empty',
                  },
                ],
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal server error',
                },
              },
              required: ['message'],
            },
          },
        },
        required: ['errors'],
      },
    }),
  );
}
