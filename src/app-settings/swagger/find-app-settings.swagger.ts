import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function FindAppSettingSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find app settings',
      description: 'Find app settings and recieve the app settings',
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
            VatRate: {
              summary: 'VatRate validation error',
              value: {
                errors: [
                  {
                    message: 'VatRate must be a number',
                  },
                ],
              },
            },
            MinPrice: {
              summary: 'MinPrice validation error',
              value: {
                errors: [
                  {
                    message: 'MinPrice must be a number',
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
