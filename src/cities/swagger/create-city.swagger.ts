import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dto/city-response.dto';

export function CreateCitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new city',
      description: 'Create a new city and recieve the created city',
    }),
    ApiResponse({ status: 201, type: CityResponseDto }),
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
            CityNameRequired: {
              summary: 'City name is required',
              value: {
                errors: [
                  {
                    message: 'name should not be empty',
                  },
                ],
              },
            },
            CityCodeRequired: {
              summary: 'City code is required',
              value: {
                errors: [
                  {
                    message: 'CityCode should not be empty',
                  },
                ],
              },
            },
            CityAlreadyExists: {
              summary: 'City already exists',
              value: {
                errors: [
                  {
                    message: 'City already exists',
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
