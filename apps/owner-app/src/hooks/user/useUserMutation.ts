import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse, FirstParameter, UserOwnFlowApi, ModifyProfileOwnCommand } from '@beribturing/api-stub';

export const useUserMutation = () => {
  const defaultModifyProfileOwnCommand: ModifyProfileOwnCommand = {
    name: '',
    gender: '',
    email: '',
    address: '',
    location: '',
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
    },
  };
};