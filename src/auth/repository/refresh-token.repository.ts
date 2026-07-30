import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { RefreshToken } from '../../auth/schemas/refresh-token.schema';
import { BaseRepository, ModelName } from '../../common/data-access';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectModel(ModelName.REFRESHTOKEN)
    private readonly refreshTokenModel: Model<HydratedDocument<RefreshToken>>,
  ) {
    super(refreshTokenModel);
  }
}
