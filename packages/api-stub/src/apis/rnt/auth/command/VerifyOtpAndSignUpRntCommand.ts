import { Profile } from '~/models';

export interface VerifyOtpAndSignUpRntCommand {
  phoneNumber: string;
  otp: string;
  password: string;
  name: string;
  profile: Profile;
}