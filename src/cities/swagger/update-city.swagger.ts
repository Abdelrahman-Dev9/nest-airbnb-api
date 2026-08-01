import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dto/city-response.dto';

export function UpdateCitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a city',
      description: 'Update a city and recieve the updated city',
    }),
    ApiResponse({ status: 200, type: CityResponseDto }),
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
