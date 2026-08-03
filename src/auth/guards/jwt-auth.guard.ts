import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnAuthorizedException } from 'src/common/errors-handling/custom-exceptions/un-authorized.exception';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { SystemAdminResponseDto } from 'src/system-admins/dto/system-admin-response.dto';
import { Roles } from 'src/common/constant';
import { UsersService } from 'src/users/users.service';
import { SystemAdminsService } from 'src/system-admins/system-admins.service';
import { IPrincipal } from '../interfaces/principal.interface';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';

type RequestWithUser = Request & {
  user: IPrincipal;
};
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private logger = new Logger(JwtAuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly systemAdminsService: SystemAdminsService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    //1) extract token from request header
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnAuthorizedException('No token provided');
    }
    //2) verfiy token
    try {
      //3) if token is valid
      const payload: JwtPayload = this.jwtService.verify(token);
      //4) build user object
      const currentAccount = await this.buildCurrentUser(payload);
      //4) attach user object to the request
      request.user = currentAccount;
    } catch (error) {
      throw new UnAuthorizedException('Invalid token');
    }

    return true;
  }

  private async buildCurrentUser(payload: JwtPayload): Promise<IPrincipal> {
    let currentAccount: UserResponseDto | SystemAdminResponseDto;

    if (payload.role === Roles.USER) {
      currentAccount = await this.usersService.findOne({
        _id: payload.id,
      });
    } else {
      currentAccount = await this.systemAdminsService.findOne({
        _id: payload.id,
      });
    }

    return {
      user: {
        _id: currentAccount._id,
        name: currentAccount.name,
        email: currentAccount.email,
      },
      role: payload.role,
    };
  }
}
