import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindProductCategoryRdosOwnQuery, ItemOwnSeekApi, ProductCategoryRdo, QueryResponse } from '@beribturing/api-stub';
import { useState } from 'react';

export const useProductCategoryRdos = ({ limit }: { limit?: number }) => {
  //
  const initialQuery: FindProductCategoryRdosOwnQuery = {
    offset: {
      offset: 0,
      limit: limit || 2147483647,
    },
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { queryKey, queryFn } = ItemOwnSeekApi.query.findProductCategoryRdos({ ...query });

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<ProductCategoryRdo[]>> = useQuery(
    {
      queryKey,
      queryFn,
    },
  );

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

  const changeSearchProperties = (
    key: keyof FindProductCategoryRdosOwnQuery,
    value: any,
  ) => {
    //
    setSearchQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchByNewQuery = (
    key?: keyof FindProductCategoryRdosOwnQuery,
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
    data,
    query: searchQuery,
    productCategories: data?.result || [],
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
