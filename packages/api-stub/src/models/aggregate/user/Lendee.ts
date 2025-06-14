import { DomainEntity } from '~/models';
import { Profile } from './vo';

export interface Lendee extends DomainEntity {
  name: string;
  phoneNumber: string;
  active: boolean;
  profile: Profile;
  reservationSequence: number;
}

