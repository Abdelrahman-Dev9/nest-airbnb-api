import { Injectable } from '@nestjs/common';
import { badRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request.exception';
import { CreateUniteCategoryDto } from '../dto/create-unit-category.dto';
import { UnitCategoriesRepository } from '../repository/unit-category.repository';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUniteCategoryUseCase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(
    body: CreateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    const existingUnitCategories = await this.unitCategoriesRepository.findOne({
      name: body.name,
      isDeleted: { $ne: true },
    });

    if (existingUnitCategories) {
      throw new badRequestException('Unit category already exists');
    }

    const unitCategory = await this.unitCategoriesRepository.create(body);
    return plainToInstance(UnitCategoryResponseDto, unitCategory.toObject());
  }
}
