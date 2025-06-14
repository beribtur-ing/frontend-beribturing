export interface ResetPasswordRntCommand {
  phoneNumber: string;
  newPassword: string;
  otp: string;
}