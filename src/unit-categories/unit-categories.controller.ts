import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginatedResult } from 'src/common/data-access';
import { CreateUniteCategoryDto } from './dto/create-unit-category.dto';
import { FindAllUnitesCategories } from './dto/find-all-unities-categories.dto';
import { FindUnitCategoryById } from './dto/unit-category-by-id.dto';
import { UnitCategoryResponseDto } from './dto/unit-category-response.dto';
import { UpdateUniteCategoryDto } from './dto/update-unit-category.dto';
import { CreateUniteCategorySwagger } from './swagger/create-unit-category.swagger';
import { FindAllUnitesCategoriesSwagger } from './swagger/find-all-unities-categories.swagger';
import { FindUniteCategorySwagger } from './swagger/find-unit-category-id.swagger';
import { SoftDeleteUniteCategoryByIdSwagger } from './swagger/soft-delete-unit-category.swagger';
import { UpdateUniteCategorySwagger } from './swagger/update-unit-category.swagger';
import { UnitCategoriesService } from './unit-categories.service';
import { Authorize } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constant';

@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @CreateUniteCategorySwagger()
  @Post()
  @Authorize(Roles.SYSTEM_ADMIN)
  async createUnitCategory(
    @Body() body: CreateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.createUnitCategory(body);
  }

  @FindAllUnitesCategoriesSwagger()
  @Get()
  async finAllUnitesCategories(
    @Query() query: FindAllUnitesCategories,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.unitCategoriesService.findAllUnitiesCategories(query);
  }

  @FindUniteCategorySwagger()
  @Get(':id')
  async findUnitCategoryById(
    @Param() param: FindUnitCategoryById,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.findUnitCategoryById(param.id);
  }

  @UpdateUniteCategorySwagger()
  @Patch(':id')
  @Authorize(Roles.SYSTEM_ADMIN)
  async updateUnitCategoryById(
    @Param() param: FindUnitCategoryById,
    @Body() body: UpdateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.updateUnitCategoryById(param.id, body);
  }

  @SoftDeleteUniteCategoryByIdSwagger()
  @Delete(':id')
  @Authorize(Roles.SYSTEM_ADMIN)
  async softDeleteUnitCategoryById(
    @Param() param: FindUnitCategoryById,
  ): Promise<void> {
    return this.unitCategoriesService.softDeleteUnitCategoryById(param.id);
  }
}
