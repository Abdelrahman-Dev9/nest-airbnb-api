import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelName } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UnitCategories } from '../schema/unit-category.schema';

@Injectable()
export class UnitCategoriesRepository extends BaseRepository<UnitCategories> {
  constructor(
    @InjectModel(ModelName.UNITECATEGORIES)
    private readonly unitCategoriesModel: Model<
      HydratedDocument<UnitCategories>
    >,
  ) {
    super(unitCategoriesModel);
  }
}
