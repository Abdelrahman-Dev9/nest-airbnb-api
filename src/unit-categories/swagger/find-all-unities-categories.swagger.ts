import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';

export function FindAllUnitesCategoriesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all unit categories',
      description:
        'Find all unit categories and recieve the found unit categories',
    }),
    ApiResponse({ status: 200, type: [UnitCategoryResponseDto] }),
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
            UniteCategoryNameRequired: {
              summary: 'UniteCategoryNameRequired',
              value: {
                errors: [
                  {
                    message: 'Unit category name is required',
                  },
                ],
              },
            },
            UniteCategoryIconRequired: {
              summary: 'UniteCategoryIconRequired',
              value: {
                errors: [
                  {
                    message: 'Unit category icon is required',
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
