import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse, FirstParameter, UserOwnFlowApi, ModifyProfileOwnCommand, ChangePasswordOwnCommand } from '@beribturing/api-stub';

export const useUserMutation = () => {
  const defaultModifyProfileOwnCommand: ModifyProfileOwnCommand = {
    name: '',
  };

  return {
    defaultModifyProfileOwnCommand,

    mutation: {
      modifyProfile: useMutation<
        AxiosResponse<CommandResponse<boolean>>,
      unknown,
        FirstParameter<typeof UserOwnFlowApi.modifyProfile>
      >({
        mutationFn: UserOwnFlowApi.modifyProfile,
      }),

      updateNotificationPreferences: useMutation<
        AxiosResponse<CommandResponse<boolean>>,
        unknown,
        FirstParameter<typeof UserOwnFlowApi.updateNotificationPreferences>
      >({
        mutationFn: UserOwnFlowApi.updateNotificationPreferences,
      }),

      changePassword: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        ChangePasswordOwnCommand
      >({
        mutationFn: UserOwnFlowApi.changePassword,
      }),
    },
  };
};
