import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindProductCategoryRdoRntQuery, ItemRntSeekApi, ProductCategoryRdo, QueryResponse} from '@beribturing/api-stub';

export const useProductCategoryRdo = (categoryId: string) => {
  //
  const query: FindProductCategoryRdoRntQuery = {
    categoryId
  };

  const {queryKey, queryFn} = ItemRntSeekApi.query.findProductCategoryRdo(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ProductCategoryRdo>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!categoryId,
    }
  );

  return {
    productCategory: data?.result,
    refetch,
    isLoading,
  };
};