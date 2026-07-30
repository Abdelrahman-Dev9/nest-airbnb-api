import { Injectable } from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CreateUniteCategoryDto } from './dto/create-unit-category.dto';
import { FindAllUnitesCategories } from './dto/find-all-unities-categories.dto';
import { UnitCategoryResponseDto } from './dto/unit-category-response.dto';
import { CreateUniteCategoryUseCase } from './use-cases/create-unit-category.usecase';
import { FindAllUnitesCategoriesUsecase } from './use-cases/find-all-unities-categories.usecase';
import { FindUnitCategoryByIdUseCase } from './use-cases/find-unit-category-id.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUniteCategoryDto } from './dto/update-unit-category.dto';
import { UpdateUniteCategoryUseCase } from './use-cases/update-unit-category.usecase';

@Injectable()
export class UnitCategoriesService {
  constructor(
    private readonly createUniteCategoryUseCase: CreateUniteCategoryUseCase,
    private readonly findAllUnitesCategoriesUsecase: FindAllUnitesCategoriesUsecase,
    private readonly findUnitCategoryByIdUseCase: FindUnitCategoryByIdUseCase,
    private readonly softDeleteUnitCategoryUseCase: SoftDeleteUnitCategoryUseCase,
    private readonly updateUniteCategoryUseCase: UpdateUniteCategoryUseCase,
  ) {}

  async createUnitCategory(
    body: CreateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return await this.createUniteCategoryUseCase.execute(body);
  }

  async findAllUnitiesCategories(
    query: FindAllUnitesCategories,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return await this.findAllUnitesCategoriesUsecase.execute(query);
  }

  async findUnitCategoryById(
    unitCategoryId: string,
  ): Promise<UnitCategoryResponseDto> {
    return await this.findUnitCategoryByIdUseCase.execute(unitCategoryId);
  }
  async softDeleteUnitCategoryById(unitCategoryId: string): Promise<void> {
    return await this.softDeleteUnitCategoryUseCase.execute(unitCategoryId);
  }
  async updateUnitCategoryById(
    unitCategoryId: string,
    body: UpdateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return await this.updateUniteCategoryUseCase.execute(unitCategoryId, body);
  }
}
