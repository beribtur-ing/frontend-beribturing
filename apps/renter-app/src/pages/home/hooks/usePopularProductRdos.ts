import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  FindPopularProductRdosRntQuery,
  ItemRntSeekApi,
  PopularProductRdo,
  QueryResponse,
} from '@beribturing/api-stub';
import { useState } from 'react';

export const usePopularProductRdos = ({ maxCount }: { maxCount?: number }) => {
  //
  const initialQuery: FindPopularProductRdosRntQuery = {
    offset: {
      offset: 0,
      limit: 10,
    },
    maxCount: maxCount,
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { queryKey, queryFn } = ItemRntSeekApi.query.findPopularProductRdos({ ...query });

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<PopularProductRdo[]>> = useQuery({
    queryKey,
    queryFn,
  });

  const changeCurrentPage = (offset: number) => {
    //
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
    //
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

  const changeSearchProperties = (key: keyof FindPopularProductRdosRntQuery, value: any) => {
    //
    setSearchQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchByNewQuery = (
    key?: keyof FindPopularProductRdosRntQuery,
    value?: string | number | boolean | undefined,
  ) => {
    setSearchQuery((prev) => {
      let newSearchQuery = {
        ...searchQuery,
        offset: initialQuery.offset,
      };
      newSearchQuery = !!key ? { ...newSearchQuery, [key]: value } : newSearchQuery;
      setQuery(newSearchQuery);
      return newSearchQuery;
    });
  };

  const resetQuery = () => {
    //
    setSearchQuery(() => initialQuery);
    setQuery(() => initialQuery);
  };

  return {
    popularProductRdos: data?.result || [],
    total: data?.offset?.totalCount || 0,
    offset: data?.offset?.offset || 0,
    limit: data?.offset?.limit || 10,
    changeCurrentPage,
    changePageLimit,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetch,
    isLoading,
  };
};
