import { Role } from '~/models';

export interface UserMeRdo {
  avatarUrl: string;
  phoneNumber: string;
  email: string;
  role: Role;
  name: string;
}
