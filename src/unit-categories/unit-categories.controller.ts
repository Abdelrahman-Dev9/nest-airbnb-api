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
import { UnitCategoriesService } from './unit-categories.service';
import { UpdateUniteCategoryDto } from './dto/update-unit-category.dto';

@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @Post()
  async createUnitCategory(
    @Body() body: CreateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.createUnitCategory(body);
  }
  @Get()
  async finAllUnitesCategories(
    @Query() query: FindAllUnitesCategories,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.unitCategoriesService.findAllUnitiesCategories(query);
  }
  @Get(':id')
  async findUnitCategoryById(
    @Param() param: FindUnitCategoryById,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.findUnitCategoryById(param.id);
  }
  @Delete(':id')
  async softDeleteUnitCategoryById(
    @Param() param: FindUnitCategoryById,
  ): Promise<void> {
    return this.unitCategoriesService.softDeleteUnitCategoryById(param.id);
  }
  @Patch(':id')
  async updateUnitCategoryById(
    @Param() param: FindUnitCategoryById,
    @Body() body: UpdateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.updateUnitCategoryById(param.id, body);
  }
}
