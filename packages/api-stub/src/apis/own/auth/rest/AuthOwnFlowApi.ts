import { RefreshTokenOwnCommand, ResetPasswordOwnCommand, SendOtpOwnCommand, VerifyOtpAndSignUpOwnCommand } from '~/apis';
import { AccountSignInTokenRdo, CommandResponse, LenderType, Profile, QueryResponse } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/owner/auth/${path}`;


const resetPassword = (variables: {
  phoneNumber: string;
  newPassword: string;
  otp: string;
}) => {
  const command = <ResetPasswordOwnCommand>{ ...variables };
  return axios.post<CommandResponse<boolean>>(url('reset-password/command'), command);
};

const sendOtp = (variables: {
  phoneNumber: string;
}) => {
  const command = <SendOtpOwnCommand>{ ...variables };
  return axios.post<CommandResponse<boolean>>(url('send-otp/command'), command);
};

const sendResetPasswordOtp = (variables: {
  phoneNumber: string;
}) => {
  const command = <SendOtpOwnCommand>{ ...variables };
  return axios.post<CommandResponse<boolean>>(url('send-reset-password-otp/command'), command);
};

const verifyOtpAndSignUp = (variables: {
  phoneNumber: string;
  otp: string;
  password: string;
  name: string;
  profile: Profile;
  lenderType: LenderType;
}) => {
  const command = <VerifyOtpAndSignUpOwnCommand>{ ...variables };
  return axios.post<CommandResponse<boolean>>(url('verify-otp-sign-up/command'), command);
};

const refreshToken = (variables: {
  refreshToken: string;
}) => {
  const command = <RefreshTokenOwnCommand>{ ...variables };
  return axios.post<CommandResponse<AccountSignInTokenRdo>>(url('refresh-token/command'), command);
};

export default {
  refreshToken,
  resetPassword,
  sendOtp,
  sendResetPasswordOtp,
  verifyOtpAndSignUp,
};

