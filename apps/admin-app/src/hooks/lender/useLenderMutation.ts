import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse, FirstParameter, LenderAdmFlowApi } from '@beribturing/api-stub';

export const useLenderMutation = () => {
  //
  return {
    mutation: {
      modifyLenderStatus: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof LenderAdmFlowApi.modifyLenderStatus>
      >(LenderAdmFlowApi.modifyLenderStatus as any, {}),
    },
  };
};
