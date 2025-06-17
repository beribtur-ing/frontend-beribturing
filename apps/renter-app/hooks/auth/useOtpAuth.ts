import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  AuthRntFlowApi,
  CommandResponse,
  FirstParameter,
  Profile
} from '@beribturing/api-stub';

export const useOtpAuth = () => {
  const sendOtpMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthRntFlowApi.sendOtp>
  >({
    mutationFn: AuthRntFlowApi.sendOtp,
  });

  const verifyOtpAndSignUpMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthRntFlowApi.verifyOtpAndSignUp>
  >({
    mutationFn: AuthRntFlowApi.verifyOtpAndSignUp,
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
    profile: Profile
  ): Promise<boolean> => {
    try {
      const response = await verifyOtpAndSignUpMutation.mutateAsync({
        phoneNumber,
        otp,
        password,
        name,
        profile
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
