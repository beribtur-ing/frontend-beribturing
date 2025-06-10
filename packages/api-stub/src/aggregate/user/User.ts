import { DomainEntity } from '../../core';
import { UserStatus } from './vo';

export interface User extends DomainEntity {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  status: UserStatus;
  profileImage: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  accountId: string;
} 