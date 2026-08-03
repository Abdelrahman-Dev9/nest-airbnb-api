import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/constant';

export const ROLES_KEY = 'roles';
export const Authorize = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
