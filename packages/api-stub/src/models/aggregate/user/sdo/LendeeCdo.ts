import { CreationDataObject } from '~/models';
import { Profile } from '../vo';

export interface LendeeCdo extends CreationDataObject {
  name: string;
  phoneNumber: string;
  active: boolean;
  profile: Profile;
  accountId: string;
}