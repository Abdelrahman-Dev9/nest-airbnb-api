import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function SoftDeleteCurrencyByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Soft delete currency by id',
      description: 'Soft delete currency by id and recieve the currency',
    }),
    ApiResponse({ status: 200 }),
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
            CurrencyIdIsRequired: {
              summary: 'Currency id is required',
              value: {
                errors: [
                  {
                    message: 'id should not be empty',
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
