import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductRdo, ItemRntSeekApi } from '@beribturing/api-stub';
import { QueryResponse } from '~/utils';

export const useRecentProducts = () => {
  return useInfiniteQuery<QueryResponse<ProductRdo[]>>({
    queryKey: ['recentProducts'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await ItemRntSeekApi.findProductRdos({
        offset: {
          offset: pageParam,
          limit: 10,
        },
      });

      return response.data; // { result: [], offset: { ... } }
    },
    getNextPageParam: (lastPage) => {
      const currentOffset = lastPage.offset.offset ?? 0;
      const limit = lastPage.offset.limit ?? 10;
      const total = lastPage.offset.totalCount ?? 0;

      const nextOffset = currentOffset + limit;

      return nextOffset < total ? nextOffset : undefined;
    },
  });
};
