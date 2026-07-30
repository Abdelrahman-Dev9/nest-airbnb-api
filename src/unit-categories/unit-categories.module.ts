import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { UnitCategoriesRepository } from './repository/unit-category.repository';
import { UnitCategorySchema } from './schema/unit-category.schema';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';
import { CreateUniteCategoryUseCase } from './use-cases/create-unit-category.usecase';
import { FindAllUnitesCategoriesUsecase } from './use-cases/find-all-unities-categories.usecase';
import { FindUnitCategoryByIdUseCase } from './use-cases/find-unit-category-id.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUniteCategoryUseCase } from './use-cases/update-unit-category.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.UNITECATEGORIES, schema: UnitCategorySchema },
    ]),
  ],
  controllers: [UnitCategoriesController],
  providers: [
    UnitCategoriesService,
    UnitCategoriesRepository,
    CreateUniteCategoryUseCase,
    FindAllUnitesCategoriesUsecase,
    FindUnitCategoryByIdUseCase,
    SoftDeleteUnitCategoryUseCase,
    UpdateUniteCategoryUseCase,
  ],
})
export class UnitCategoriesModule {}
