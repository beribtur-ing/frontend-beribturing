import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ItemAdmFlowApi} from '@beribturing/api-stub';

export const useProductImageMutation = () => {
  //
  return {
    mutation: {
      modifyProductImage: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.modifyProductImage>
      >(ItemAdmFlowApi.modifyProductImage as any, {}),
      removeProductImage: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.removeProductImage>
      >(ItemAdmFlowApi.removeProductImage as any, {}),
    },
  };
};
