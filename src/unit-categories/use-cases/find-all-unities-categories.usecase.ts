import { Injectable } from '@nestjs/common';
import { UnitCategoriesRepository } from './../repository/unit-category.repository';
import { FindAllUnitesCategories } from '../dto/find-all-unities-categories.dto';
import { PaginatedResult } from 'src/common/data-access';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { QueryFilter } from 'mongoose';
import { UnitCategories } from '../schema/unit-category.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllUnitesCategoriesUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(
    query: FindAllUnitesCategories,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    const matchQuery: QueryFilter<UnitCategories> = {
      isDeleted: { $ne: true },
    };
    if (query?.name) matchQuery.name = { $regex: query.name, $options: 'i' };

    const result = await this.unitCategoriesRepository.findPaginated(
      matchQuery,
      {
        page: query?.page,
        limit: query?.limit,
        ignoreLimit: query?.ignoreLimit,
        lean: true,
      },
    );

    return plainToInstance(PaginatedResult<UnitCategoryResponseDto>, result);
  }
}
