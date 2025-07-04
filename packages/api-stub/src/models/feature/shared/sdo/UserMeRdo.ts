import { Role, Gender, GeoLocation } from '~/models';

export interface UserMeRdo {
  avatarUrl: string;
  address: string;
  location: GeoLocation;
  gender: Gender;
  phoneNumber: string;
  email: string;
  role: Role;
  name: string;
}
