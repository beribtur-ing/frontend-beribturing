import { CreationDataObject } from '../../../core';
import { UserStatus } from '../vo';

export interface UserCdo extends CreationDataObject {
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