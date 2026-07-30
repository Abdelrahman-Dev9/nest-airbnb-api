import { Injectable } from '@nestjs/common';
import { AppSettingsResponseDto } from './dto/app-settings-response.dto';
import { UpsertAppSettingsDto } from './dto/upsert-app-settings.dto';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { FindAppSettingsUseCase } from './use-cases/find-app-settings.usecase';

@Injectable()
export class AppSettingsService {
  constructor(
    private readonly upsertAppSettingsUseCase: UpsertAppSettingsUseCase,
    private readonly findAppSettingsUseCase: FindAppSettingsUseCase,
  ) {}

  async upsert(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
    return this.upsertAppSettingsUseCase.execute(body);
  }

  async find(): Promise<AppSettingsResponseDto> {
    return this.findAppSettingsUseCase.execute();
  }
}
