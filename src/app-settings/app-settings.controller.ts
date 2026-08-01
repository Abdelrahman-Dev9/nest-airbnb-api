import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dto/upsert-app-settings.dto';
import { FindAppSettingSwagger } from './swagger/find-app-settings.swagger';
import { UpdateAppSettingSwagger } from './swagger/upsert-app-settings.swagger';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @FindAppSettingSwagger()
  @Get()
  async findAppSettings(): Promise<UpsertAppSettingsDto> {
    return this.appSettingsService.find();
  }

  @UpdateAppSettingSwagger()
  @Put()
  async upsertAppSettings(
    @Body() body: UpsertAppSettingsDto,
  ): Promise<UpsertAppSettingsDto> {
    return this.appSettingsService.upsert(body);
  }
}
