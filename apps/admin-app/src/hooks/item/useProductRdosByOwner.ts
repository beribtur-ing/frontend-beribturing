import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindProductRdosAdmQuery, ItemAdmSeekApi, ProductRdo, QueryResponse } from '@beribturing/api-stub';
import { useState } from 'react';

export const useProductRdosByOwner = ({ ownerId, limit = 5 }: { ownerId?: string; limit?: number }) => {
  const initialQuery: FindProductRdosAdmQuery = {
    ownerIds: ownerId ? [ownerId] : [],
    offset: {
      offset: 0,
      limit,
    },
  };

  const [query, setQuery] = useState(initialQuery);

  const { queryKey, queryFn } = ItemAdmSeekApi.query.findProductRdos({ ...query });

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<ProductRdo[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!ownerId,
    },
  );

  const changeCurrentPage = (offset: number) => {
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { ...prev.offset, offset },
        };
      }
      return prev;
    });
  };

  const changePageLimit = (limit: number) => {
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { offset: 0, limit },
        };
      }
      return prev;
    });
  };

  return {
    productRdos: data?.result || [],
    total: data?.offset?.totalCount || 0,
    offset: data?.offset?.offset || 0,
    limit: data?.offset?.limit || 5,
    changeCurrentPage,
    changePageLimit,
    refetch,
    isLoading,
  };
};