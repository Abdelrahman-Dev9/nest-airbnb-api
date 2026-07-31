import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  EnvironmentInterface,
  ISystemAdmin,
} from 'src/common/configuration/configuration.interface';
import { SystemAdminRepository } from '../repository/system-admins.repository';

@Injectable()
export class InitializeSystemAdminsUseCase {
  private logger = new Logger(InitializeSystemAdminsUseCase.name);
  constructor(
    private readonly systemAdminRepository: SystemAdminRepository,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(): Promise<void> {
    const { name, email, password } =
      this.configService.getOrThrow<ISystemAdmin>('systemAdmin');

    //check if system admin already exist
    const systemAdmin = await this.systemAdminRepository.findOne({ email });
    if (systemAdmin) {
      this.logger.log('system admin already initializad');
      return;
    }

    //if not exist , create one

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.systemAdminRepository.create({
      name,
      email,
      password: hashedPassword,
      isSuperAdmin: true,
    });
    this.logger.log('system admin initializad');
  }
}
