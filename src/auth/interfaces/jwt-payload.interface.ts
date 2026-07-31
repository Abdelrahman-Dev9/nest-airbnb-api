import { Roles } from 'src/common/constant';

export class JwtPayload {
  id: string;
  role: Roles;
}
