import { Gender, GeoLocation } from '~/models';

export interface ModifyProfileOwnCommand {
  name: string;
  gender?: Gender;
  email?: string;
  address?: string;
  location?: GeoLocation;
}