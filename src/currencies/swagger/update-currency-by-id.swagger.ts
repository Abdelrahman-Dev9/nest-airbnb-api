import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrencyResponseDto } from '../dto/currency-response.dto';

export function UpdateCurrenyByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update currency by id',
      description: 'Update currency by id and recieve the currency',
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
              CurrencyNameRequired: {
                summary: 'Currency name is required',
                value: {
                  errors: [
                    {
                      message: 'name should not be empty',
                    },
                  ],
                },
              },
              CurrencyCodeRequired: {
                summary: 'Currency code is required',
                value: {
                  errors: [
                    {
                      message: 'currencyCode should not be empty',
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
