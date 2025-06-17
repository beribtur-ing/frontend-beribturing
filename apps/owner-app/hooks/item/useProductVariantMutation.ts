import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ItemOwnFlowApi, ProductVariantRegCdo} from '@beribturing/api-stub';

export const useProductVariantMutation = () => {
  //
  const defaultProductVariantRegCdo: ProductVariantRegCdo = {
    productId: '',
    name: '',
    description: ''
  };

  return {
    defaultProductVariantRegCdo,

    mutation: {
      registerProductVariant: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemOwnFlowApi.registerProductVariant>
      >(ItemOwnFlowApi.registerProductVariant as any, {}),
      modifyProductVariant: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemOwnFlowApi.modifyProductVariant>
      >(ItemOwnFlowApi.modifyProductVariant as any, {}),
      removeProductVariant: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemOwnFlowApi.removeProductVariant>
      >(ItemOwnFlowApi.removeProductVariant as any, {}),
    },
  };
};