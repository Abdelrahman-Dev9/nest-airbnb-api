import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Roles } from 'src/common/constant';
import { RequestWithUser } from '../guards/jwt-auth.guard';
import { CurrentUserData, IPrincipal } from '../interfaces/principal.interface';

export const CurrentAccount = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!request) return null;

    const { user, role } = request.user;
    return new Principal(user, role);
  },
);

export class Principal implements IPrincipal {
  constructor(
    public user: CurrentUserData,
    public role: Roles,
  ) {}
}
