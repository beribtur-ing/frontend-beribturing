import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse, FirstParameter, UserRntFlowApi, ModifyProfileRntCommand } from '@beribturing/api-stub';

export const useUserMutation = () => {
  const defaultModifyProfileRntCommand: ModifyProfileRntCommand = {
    name: '',
    gender: '',
    email: '',
    address: '',
    location: '',
  };

  return {
    defaultModifyProfileRntCommand,

    mutation: {
      modifyProfile: useMutation<
        AxiosResponse<CommandResponse<boolean>>,
        unknown,
        FirstParameter<typeof UserRntFlowApi.modifyProfile>
      >({
        mutationFn: UserRntFlowApi.modifyProfile,
      }),
    },
  };
};