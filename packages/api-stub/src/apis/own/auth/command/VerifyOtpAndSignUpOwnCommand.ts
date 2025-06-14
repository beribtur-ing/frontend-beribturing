import { Profile, LenderType } from "~/models";

export interface VerifyOtpAndSignUpOwnCommand {
  phoneNumber: string;
  otp: string;
  password: string;
  name: string;
  profile: Profile;
  lenderType: LenderType;
}
