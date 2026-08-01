import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function FindAllCountries() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find All Countries',
      description: 'Find all countries and recieve the countries',
    }),
    ApiResponse({ status: 200, type: [CountryResponseDto] }),
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
                summary: 'Invalid country name',
                value: {
                  errors: [
                    {
                      message: 'name must be a string',
                    },
                  ],
                },
              },
            },
            required: ['errors'],
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
