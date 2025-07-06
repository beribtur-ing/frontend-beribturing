import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindLendeesAdmQuery, LendeeAdmSeekApi, Lendee, QueryResponse } from '@beribturing/api-stub';
import { useState } from 'react';

export const useLendees = ({ limit }: { limit?: number }) => {
  const initialQuery: FindLendeesAdmQuery = {
    searchKeyword: '',
    status: '',
    offset: {
      offset: 0,
      limit: limit || 10,
    },
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<Lendee[]>> = useQuery(
    {
      queryKey: ['feature/admin/lendee', 'findLendees', query],
      queryFn: async () => {
        const response = await LendeeAdmSeekApi.findLendees({
          searchKeyword: query.searchKeyword,
          status: query.status,
          offset: query.offset?.offset,
          limit: query.offset?.limit,
        });
        return response.data;
      },
    },
  );

  const changeCurrentPage = (page: number) => {
    setQuery((prev) => {
      const newQuery = {
        ...prev,
        offset: {
          ...prev.offset,
          offset: page * (prev.offset?.limit || 10),
        },
      };
      setSearchQuery(() => newQuery);
      return newQuery;
    });
  };

  const changePageSize = (size: number) => {
    setQuery((prev) => {
      const newQuery = {
        ...prev,
        offset: {
          offset: 0,
          limit: size,
        },
      };
      setSearchQuery(() => newQuery);
      return newQuery;
    });
  };

  const changeSearchKeyword = (searchKeyword: string) => {
    setQuery((prev) => ({
      ...prev,
      searchKeyword,
      offset: {
        ...prev.offset,
        offset: 0, // Reset to first page
      },
    }));
  };

  const changeStatus = (status: string) => {
    setQuery((prev) => ({
      ...prev,
      status,
      offset: {
        ...prev.offset,
        offset: 0, // Reset to first page
      },
    }));
  };

  const changeSearchProperties = (
    key: keyof FindLendeesAdmQuery,
    value: any,
  ) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value,
      offset: {
        ...prev.offset,
        offset: 0, // Reset to first page
      },
    }));
  };

  const fetchByNewQuery = (
    key?: keyof FindLendeesAdmQuery,
    value?: string | number | boolean | undefined,
  ) => {
    setQuery((prev) => {
      let newQuery = {
        ...prev,
        offset: {
          ...prev.offset,
          offset: 0,
        },
      };
      if (key) {
        newQuery = { ...newQuery, [key]: value };
      }
      setSearchQuery(() => newQuery);
      return newQuery;
    });
  };

  const resetQuery = () => {
    setQuery(() => initialQuery);
    setSearchQuery(() => initialQuery);
  };

  const currentPage = Math.floor((query.offset?.offset || 0) / (query.offset?.limit || 10));
  const totalPages = Math.ceil((data?.offset?.totalCount || 0) / (query.offset?.limit || 10));
  const hasPrevious = data?.offset?.previous || false;
  const hasNext = data?.offset?.next || false;

  return {
    query: searchQuery,
    lendees: data?.result || [],
    total: data?.offset?.totalCount || 0,
    page: currentPage,
    size: query.offset?.limit || 10,
    totalPages,
    hasPrevious,
    hasNext,
    changeCurrentPage,
    changePageSize,
    changeSearchKeyword,
    changeStatus,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetch,
    isLoading,
  };
};