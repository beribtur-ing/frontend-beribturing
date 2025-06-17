import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {ItemAdmSeekApi, ProductRdo, QueryResponse} from '@beribturing/api-stub';


export const useProductRdo = (productId?: string) => {
  //
  const {queryKey, queryFn} = ItemAdmSeekApi.query.findProductRdo({productId: productId || ''});
  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ProductRdo[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!productId,
    }
  );

  return {
    productRdo: data?.result,
    refetch,
    isLoading,
  };
};
