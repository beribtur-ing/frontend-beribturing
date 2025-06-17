import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {CommandResponse, FirstParameter, ItemAdmFlowApi, ProductCategoryRegCdo} from '@beribturing/api-stub';

export const useProductCategoryMutation = () => {
  //
  const defaultProductCategoryRegCdo: ProductCategoryRegCdo = {
    name: '',
    description: '',
    parentId: ''
  };

  return {
    defaultProductCategoryRegCdo,

    mutation: {
      registerProductCategory: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.registerProductCategory>
      >(ItemAdmFlowApi.registerProductCategory as any, {}),
      modifyProductCategory: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.modifyProductCategory>
      >(ItemAdmFlowApi.modifyProductCategory as any, {}),
      removeProductCategory: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        FirstParameter<typeof ItemAdmFlowApi.removeProductCategory>
      >(ItemAdmFlowApi.removeProductCategory as any, {}),
    },
  };
};
