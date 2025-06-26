import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindProductCategoryRdoOwnQuery, ItemOwnSeekApi, ProductCategoryRdo, QueryResponse } from '@beribturing/api-stub';

export const useProductCategoryRdo = (categoryId: string) => {
  //
  const query: FindProductCategoryRdoOwnQuery = {
    categoryId,
  };

  const { queryKey, queryFn } = ItemOwnSeekApi.query.findProductCategoryRdo(query);

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<ProductCategoryRdo>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!categoryId,
    },
  );

  return {
    productCategory: data?.result,
    refetch,
    isLoading,
  };
};