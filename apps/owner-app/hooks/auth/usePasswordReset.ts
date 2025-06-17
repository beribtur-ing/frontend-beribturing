import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  AuthOwnFlowApi,
  CommandResponse,
  FirstParameter
} from '@beribturing/api-stub';

export const usePasswordReset = () => {
  const sendResetPasswordOtpMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthOwnFlowApi.sendResetPasswordOtp>
  >({
    mutationFn: AuthOwnFlowApi.sendResetPasswordOtp,
  });

  const resetPasswordMutation = useMutation<
    AxiosResponse<CommandResponse<boolean>>,
    unknown,
    FirstParameter<typeof AuthOwnFlowApi.resetPassword>
  >({
    mutationFn: AuthOwnFlowApi.resetPassword,
  });

  const sendResetPasswordOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      const response = await sendResetPasswordOtpMutation.mutateAsync({ phoneNumber });
      return response.data.response || false;
    } catch (error) {
      console.error('Send reset password OTP failed:', error);
      return false;
    }
  };

  const resetPassword = async (
    phoneNumber: string,
    newPassword: string,
    otp: string
  ): Promise<boolean> => {
    try {
      const response = await resetPasswordMutation.mutateAsync({
        phoneNumber,
        newPassword,
        otp
      });
      return response.data.response || false;
    } catch (error) {
      console.error('Reset password failed:', error);
      return false;
    }
  };

  return {
    sendResetPasswordOtp,
    resetPassword,
    isSendingResetOtp: sendResetPasswordOtpMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    sendResetOtpError: sendResetPasswordOtpMutation.error,
    resetPasswordError: resetPasswordMutation.error,
  };
};
