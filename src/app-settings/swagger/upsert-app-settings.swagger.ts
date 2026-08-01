import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpsertAppSettingsDto } from '../dto/upsert-app-settings.dto';

export function UpdateAppSettingSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update app settings',
      description: 'Update app settings and recieve the app settings',
    }),
    ApiResponse({ status: 200, type: UpsertAppSettingsDto }),
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
            VatRateLessThanZero: {
              summary: 'Vat rate less than zero',
              value: {
                errors: [
                  {
                    message: 'Vat rate must be greater than zero',
                  },
                ],
              },
            },
            VatRateGreaterThan25: {
              summary: 'Vat rate greater than 25',
              value: {
                errors: [
                  {
                    message: 'Vat rate must be less than 25',
                  },
                ],
              },
            },
            MinPriceLessThanZero: {
              summary: 'Min price less than zero',
              value: {
                errors: [
                  {
                    message: 'Min price must be greater than zero',
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
