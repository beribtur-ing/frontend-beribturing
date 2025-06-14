import { DomainEntity } from '~/models';
import { Role } from './vo';

export interface Account extends DomainEntity {
  phoneNumber: string;
  password: string;
  email: string;
  role: Role;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
