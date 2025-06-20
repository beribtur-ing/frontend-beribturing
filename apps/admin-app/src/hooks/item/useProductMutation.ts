import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ItemAdmFlowApi, ProductAdmRegCdo} from '@beribturing/api-stub';

export const useProductMutation = () => {
  //
  const defaultProductAdmRegCdo: ProductAdmRegCdo = {
    ownerId: '',
    title: '',
    description: '',
    categoryId: ''
  };

  return {
    defaultProductAdmRegCdo,

    mutation: {
      registerProduct: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.registerProduct>
      >(ItemAdmFlowApi.registerProduct as any, {}),
      modifyProduct: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.modifyProduct>
      >(ItemAdmFlowApi.modifyProduct as any, {}),
      removeProduct: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.removeProduct>
      >(ItemAdmFlowApi.removeProduct as any, {}),
    },
  };
};
