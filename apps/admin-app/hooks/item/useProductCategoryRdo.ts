import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {ItemAdmSeekApi, ProductCategoryRdo, QueryResponse} from '@beribturing/api-stub';


export const useProductCategoryRdo = (categoryId?: string) => {
  //
  const {queryKey, queryFn} = ItemAdmSeekApi.query.findProductCategoryRdo({categoryId: categoryId || ''});
  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ProductCategoryRdo[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!categoryId,
    }
  );

  return {
    productCategoryRdo: data?.result,
    refetch,
    isLoading,
  };
};
