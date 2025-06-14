import { DomainEntity } from '~/models';
import { Profile, LenderType } from './vo';

export interface Lender extends DomainEntity {
  name: string;
  phoneNumber: string;
  lenderType: LenderType;
  active: boolean;
  profile: Profile;
  productSequence: number;
}

