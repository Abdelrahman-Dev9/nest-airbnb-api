import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/common/data-access';
import { SystemAdminRepository } from './repository/system-admins.repository';
import { SystemAdminSchema } from './schema/system-admin.schema';
import { SystemAdminsService } from './system-admins.service';
import { InitializeSystemAdminsUseCase } from './use-cases/initialize-system-admins.usecase';
import { FindSystemAdminUseCase } from './use-cases/find-system-admin.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.SETTINGS_ADMINS, schema: SystemAdminSchema },
    ]),
  ],
  providers: [
    SystemAdminsService,
    SystemAdminRepository,
    InitializeSystemAdminsUseCase,
    FindSystemAdminUseCase,
  ],
  exports: [SystemAdminsService],
})
export class SystemAdminsModule {}
