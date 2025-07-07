import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, LendeeAdmFlowApi} from '@beribturing/api-stub';

export const useLendeeMutation = () => {
  //
  return {
    mutation: {
      modifyLendeeStatus: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof LendeeAdmFlowApi.modifyLendeeStatus>
      >(LendeeAdmFlowApi.modifyLendeeStatus as any, {}),
    },
  };
};
