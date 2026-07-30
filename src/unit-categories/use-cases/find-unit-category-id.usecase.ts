import { notFountException } from 'src/common/errors-handling/custom-exceptions/not-found.exception';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { UnitCategoriesRepository } from './../repository/unit-category.repository';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindUnitCategoryByIdUseCase {
  constructor(
    public readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(unitCategoryId: string): Promise<UnitCategoryResponseDto> {
    const unitCategory = await this.unitCategoriesRepository.findOne({
      _id: unitCategoryId,
      isDeleted: { $ne: true },
    });

    if (!unitCategory) throw new notFountException('Unit category not found');

    return plainToInstance(UnitCategoryResponseDto, unitCategory);
  }
}
