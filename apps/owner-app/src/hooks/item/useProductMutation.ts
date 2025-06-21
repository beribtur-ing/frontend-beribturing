import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse, FirstParameter, ItemOwnFlowApi, ProductOwnRegCdo } from '@beribturing/api-stub';

export const useProductMutation = () => {
  //
  const defaultProductOwnRegCdo: ProductOwnRegCdo = {
    title: '',
    description: '',
    categoryId: '',
  };

  return {
    defaultProductOwnRegCdo,

    mutation: {
      registerProduct: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof ItemOwnFlowApi.registerProduct>
      >(ItemOwnFlowApi.registerProduct as any, {}),
      modifyProduct: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof ItemOwnFlowApi.modifyProduct>
      >(ItemOwnFlowApi.modifyProduct as any, {}),
      removeProduct: useMutation<
      AxiosResponse<CommandResponse<string>>,
      unknown,
      FirstParameter<typeof ItemOwnFlowApi.removeProduct>
      >(ItemOwnFlowApi.removeProduct as any, {}),
    },
  };
};