import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { UpdateUniteCategoryDto } from '../dto/update-unit-category.dto';
import { UnitCategoriesRepository } from '../repository/unit-category.repository';

@Injectable()
export class UpdateUniteCategoryUseCase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(
    unitCategoryId: string,
    body: UpdateUniteCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    const unitCategory = await this.unitCategoriesRepository.findOne({
      _id: unitCategoryId,
      isDeleted: { $ne: true },
    });

    if (!unitCategory) throw new notFountException('Unit category not found');

    const updatedUnitCategory =
      await this.unitCategoriesRepository.findByIdAndUpdate(
        unitCategoryId,
        body,
        { returnDocument: 'after' },
      );

    return plainToInstance(
      UnitCategoryResponseDto,
      updatedUnitCategory?.toObject(),
    );
  }
}
