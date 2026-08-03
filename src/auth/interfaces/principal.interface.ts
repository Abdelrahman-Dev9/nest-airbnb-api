import { Roles } from 'src/common/constant';

export interface CurrentUserData {
  _id: string;
  name: string;
  email: string;
}

export interface IPrincipal {
  user: CurrentUserData;
  role: Roles;
}
