import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function CreateCountrySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Country',
      description: 'Create a new country and recieve the created country',
    }),
    ApiResponse({ status: 201, type: CountryResponseDto }),
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
            CountryAlreadyExists: {
              summary: 'Country already exists',
              value: {
                errors: [
                  {
                    message: 'Country already exists',
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
