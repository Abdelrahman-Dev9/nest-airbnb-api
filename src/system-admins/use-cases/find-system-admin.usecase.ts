import { SystemAdminRepository } from './../repository/system-admins.repository';
import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from '../schema/system-admin.schema';
import { SystemAdminResponseDto } from '../dto/system-admin-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindSystemAdminUseCase {
  constructor(private readonly systemAdminRepository: SystemAdminRepository) {}

  async execute(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminResponseDto> {
    const systemAdmin = await this.systemAdminRepository.findOne(query);
    return plainToInstance(SystemAdminResponseDto, systemAdmin);
  }
}
