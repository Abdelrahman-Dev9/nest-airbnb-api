import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dto/city-response.dto';

export function FindAllCitiesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all cities',
      description: 'Find all cities and recieve the cities',
    }),
    ApiResponse({ status: 200, type: [CityResponseDto] }),
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
            InvalidPage: {
              summary: 'Invalid page number',
              value: {
                errors: [
                  {
                    message: 'page must be a number',
                  },
                ],
              },
            },

            InvalidLimit: {
              summary: 'Invalid limit',
              value: {
                errors: [
                  {
                    message: 'limit must be a number',
                  },
                ],
              },
            },

            InvalidName: {
              summary: 'Invalid city name',
              value: {
                errors: [
                  {
                    message: 'name must be a string',
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
