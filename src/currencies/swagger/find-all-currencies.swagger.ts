import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dto/currency-response.dto';

export function FindAllCurrenciesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all currencies',
      description: 'Find all currencies and recieve the currencies',
    }),
    ApiResponse({ status: 200, type: [CurrencyResponseDto] }),
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
                summary: 'Invalid currency name',
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
