import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dto/city-response.dto';

export function FindCityByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find a city by id',
      description: 'Find a city by id and recieve the city',
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
            CityIdRequired: {
              summary: 'City id is required',
              value: {
                errors: [
                  {
                    message: 'City id is required',
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
