import { useQuery, UseQueryResult } from '@tanstack/react-query';
import  { FindProductRdoOwnQuery, ItemOwnSeekApi, ProductRdo, QueryResponse } from '@beribturing/api-stub';

export const useProductRdo = (productId: string) => {
  //
  const query: FindProductRdoOwnQuery = {
    productId,
  };

  const { queryKey, queryFn } = ItemOwnSeekApi.query.findProductRdo(query);

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<ProductRdo>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!productId,
    },
  );

  return {
    product: data?.result,
    refetch,
    isLoading,
  };
};