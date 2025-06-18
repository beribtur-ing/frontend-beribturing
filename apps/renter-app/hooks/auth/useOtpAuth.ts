import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  AuthRntFlowApi,
  AuthOwnFlowApi,
  CommandResponse,
  FirstParameter,
  Profile,
  LenderType
} from '@beribturing/api-stub';

export const useOtpAuth = () => {
  const sendOtpRenterMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthRntFlowApi.sendOtp>
  >({
    mutationFn: AuthRntFlowApi.sendOtp,
  });

  const sendOtpOwnerMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthOwnFlowApi.sendOtp>
  >({
    mutationFn: AuthOwnFlowApi.sendOtp,
  });

  const verifyOtpAndSignUpRenterMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthRntFlowApi.verifyOtpAndSignUp>
  >({
    mutationFn: AuthRntFlowApi.verifyOtpAndSignUp,
  });

  const verifyOtpAndSignUpOwnerMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthOwnFlowApi.verifyOtpAndSignUp>
  >({
    mutationFn: AuthOwnFlowApi.verifyOtpAndSignUp,
  });

  const sendOtp = async (phoneNumber: string, userType: 'renter' | 'lender' = 'renter'): Promise<boolean> => {
    try {
      const response = userType === 'renter'
        ? await sendOtpRenterMutation.mutateAsync({ phoneNumber })
        : await sendOtpOwnerMutation.mutateAsync({ phoneNumber });
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
    userType: 'renter' | 'lender' = 'renter',
    lenderType?: keyof typeof LenderType
  ): Promise<boolean> => {
    try {
      const response = userType === 'renter'
        ? await verifyOtpAndSignUpRenterMutation.mutateAsync({
            phoneNumber,
            otp,
            password,
            name,
            profile
          })
        : await verifyOtpAndSignUpOwnerMutation.mutateAsync({
            phoneNumber,
            otp,
            password,
            name,
            profile,
            lenderType: lenderType || 'INDIVIDUAL'
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
    isSendingOtp: sendOtpRenterMutation.isPending || sendOtpOwnerMutation.isPending,
    isVerifyingOtp: verifyOtpAndSignUpRenterMutation.isPending || verifyOtpAndSignUpOwnerMutation.isPending,
    sendOtpError: sendOtpRenterMutation.error || sendOtpOwnerMutation.error,
    verifyOtpError: verifyOtpAndSignUpRenterMutation.error || verifyOtpAndSignUpOwnerMutation.error,
  };
};
