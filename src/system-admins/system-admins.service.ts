import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitializeSystemAdminsUseCase } from './use-cases/initialize-system-admins.usecase';
import { FindSystemAdminUseCase } from './use-cases/find-system-admin.usecase';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from './schema/system-admin.schema';
import { SystemAdminResponseDto } from './dto/system-admin-response.dto';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
  constructor(
    private readonly initializeSystemAdminsUseCase: InitializeSystemAdminsUseCase,
    private readonly findSystemAdminUseCase: FindSystemAdminUseCase,
  ) {}
  async onModuleInit() {
    await this.initializeSystemAdminsUseCase.execute();
  }
  async findOne(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminResponseDto> {
    return this.findSystemAdminUseCase.execute(query);
  }
}
