import { Injectable } from '@nestjs/common';
import { UnitCategoriesRepository } from '../repository/unit-category.repository';
import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteUnitCategoryUseCase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(unitCategoryId: string): Promise<void> {
    const unitCategory = await this.unitCategoriesRepository.findOne({
      _id: unitCategoryId,
      isDeleted: { $ne: true },
    });

    if (!unitCategory) throw new notFountException('Unit category not found');

    await this.unitCategoriesRepository.findByIdAndUpdate(unitCategoryId, {
      isDeleted: true,
    });
  }
}
