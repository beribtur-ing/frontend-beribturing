import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ItemAdmFlowApi, ProductVariantRegCdo} from '@beribturing/api-stub';

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
        FirstParameter<typeof ItemAdmFlowApi.registerProductVariant>
      >(ItemAdmFlowApi.registerProductVariant as any, {}),
      modifyProductVariant: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.modifyProductVariant>
      >(ItemAdmFlowApi.modifyProductVariant as any, {}),
      removeProductVariant: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.removeProductVariant>
      >(ItemAdmFlowApi.removeProductVariant as any, {}),
    },
  };
};
