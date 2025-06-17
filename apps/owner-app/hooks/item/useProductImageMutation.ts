import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ItemOwnFlowApi} from '@beribturing/api-stub';

export const useProductImageMutation = () => {
  //
  return {
    mutation: {
      modifyProductImage: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemOwnFlowApi.modifyProductImage>
      >(ItemOwnFlowApi.modifyProductImage as any, {}),
      removeProductImage: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemOwnFlowApi.removeProductImage>
      >(ItemOwnFlowApi.removeProductImage as any, {}),
    },
  };
};