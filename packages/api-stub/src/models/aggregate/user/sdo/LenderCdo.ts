import { CreationDataObject } from '~/models';
import { Profile, LenderType } from '../vo';

export interface LenderCdo extends CreationDataObject {
  name: string;
  phoneNumber: string;
  lenderType: LenderType;
  active: boolean;
  profile: Profile;
  accountId: string;
}