import { CreationDataObject } from '../../../core';
import { Role } from '../vo';

export interface AccountCdo extends CreationDataObject {
  phoneNumber: string;
  password: string;
  email: string;
  role: Role;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
} 