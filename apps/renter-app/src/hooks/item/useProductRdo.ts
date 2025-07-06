import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindProductRdoRntQuery, ItemRntSeekApi, ProductRdo, QueryResponse } from '@beribturing/api-stub';

export const useProductRdo = (productId: string) => {
  //
  const query: FindProductRdoRntQuery = {
    productId,
  };

  const { queryKey, queryFn } = ItemRntSeekApi.query.findProductRdo(query);

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<ProductRdo>> = useQuery({
    queryKey,
    queryFn,
    enabled: !!productId,
  });

  return {
    productRdo: data?.result,
    refetch,
    isLoading,
  };
};
