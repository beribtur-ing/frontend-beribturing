import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  AuthOwnFlowApi,
  CommandResponse,
  FirstParameter,
  Profile,
  LenderType
} from '@beribturing/api-stub';

export const useOtpAuth = () => {
  const sendOtpMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthOwnFlowApi.sendOtp>
  >({
    mutationFn: AuthOwnFlowApi.sendOtp,
  });

  const verifyOtpAndSignUpMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthOwnFlowApi.verifyOtpAndSignUp>
  >({
    mutationFn: AuthOwnFlowApi.verifyOtpAndSignUp,
  });

  const sendOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      const response = await sendOtpMutation.mutateAsync({ phoneNumber });
      return response.data.response || false;
    } catch (error) {
      console.error('Send OTP failed:', error);
      return false;
    }
  };

  const verifyOtpAndSignUp = async (
    phoneNumber: string,
    otp: string,
    password: string,
    name: string,
    profile: Profile,
    lenderType: LenderType
  ): Promise<boolean> => {
    try {
      const response = await verifyOtpAndSignUpMutation.mutateAsync({
        phoneNumber,
        otp,
        password,
        name,
        profile,
        lenderType
      });
      return response.data.response || false;
    } catch (error) {
      console.error('Verify OTP and sign up failed:', error);
      return false;
    }
  };

  return {
    sendOtp,
    verifyOtpAndSignUp,
    isSendingOtp: sendOtpMutation.isPending,
    isVerifyingOtp: verifyOtpAndSignUpMutation.isPending,
    sendOtpError: sendOtpMutation.error,
    verifyOtpError: verifyOtpAndSignUpMutation.error,
  };
};
