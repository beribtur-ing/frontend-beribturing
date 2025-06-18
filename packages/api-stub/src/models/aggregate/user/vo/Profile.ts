import { Gender } from './Gender';
import { GeoLocation } from './GeoLocation';

export interface Profile {
  gender?: Gender;
  email?: string;
  address?: string;
  avatarUrl?: string;
  location?: GeoLocation;
}

