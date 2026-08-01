import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dto/currency-response.dto';

export function FindCurrencyById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find currency by id',
      description: 'Find currency by id and recieve the currency',
    }),
    ApiResponse({ status: 200, type: CurrencyResponseDto }),
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
              InvalidId: {
                summary: 'Invalid currency id',
                value: {
                  errors: [
                    {
                      message: 'id must be a string',
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
