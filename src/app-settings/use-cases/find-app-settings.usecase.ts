import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { AppSettingsResponseDto } from '../dto/app-settings-response.dto';
import { AppSettingsRepository } from '../repository/app-settings.repository';

@Injectable()
export class FindAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(): Promise<AppSettingsResponseDto> {
    const appSettings = await this.appSettingsRepository.findOne({});
    return plainToInstance(AppSettingsResponseDto, appSettings);
  }
}
