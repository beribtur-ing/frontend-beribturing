import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {RentalOwnSeekApi, RentalRecord, QueryResponse, FindRentalRecordsOwnQuery} from '@beribturing/api-stub';
import {useState} from "react";

export const useRentalRecordsPaginated = () => {
  //
  const initialQuery: FindRentalRecordsOwnQuery = {
    offset: {
      offset: 0,
      limit: 10,
      sortDirection: 'DESCENDING',
    },
  }
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { queryKey, queryFn } = RentalOwnSeekApi.query.findRentalRecords({ ...query });

  const { isLoading, data, refetch }: UseQueryResult<QueryResponse<RentalRecord[]>> = useQuery({
    queryKey,
    queryFn,
  });

  const changeCurrentPage = (offset: number) => {
    //
    setQuery((prev) => {
      let newQuery;
      if (prev.offset) {
        newQuery = {
          ...prev,
          offset: { ...prev.offset, offset },
        };
      } else {
        newQuery = prev;
      }
      setSearchQuery(newQuery);
      return newQuery;
    });
  };

  const changePageLimit = (limit: number) => {
    //
    setQuery((prev) => {
      let newQuery;
      if (prev.offset) {
        newQuery = {
          ...prev,
          offset: { offset: 0, limit },
        };
      } else {
        newQuery = prev;
      }
      setSearchQuery(newQuery);
      return newQuery;
    });
  };

  const changeSearchProperties = (key: keyof FindRentalRecordsOwnQuery, value: string | number | boolean | undefined) => {
    //
    setSearchQuery((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const fetchByNewQuery = (key?: keyof FindRentalRecordsOwnQuery, value?: string | number | boolean | undefined) => {
    //
    setSearchQuery((prev) => {
      let newSearchQuery = {
        ...searchQuery,
        offset: { limit: prev.offset?.limit || 10, offset: 0 },
      };
      newSearchQuery = !!key ? { ...newSearchQuery, [key]: value } : newSearchQuery;
      setQuery(newSearchQuery);
      return newSearchQuery;
    });
  };

  const resetQuery = () => {
    //
    setSearchQuery((prev) => {
      const newQuery = {
        name: undefined,
        offset: { limit: prev.offset?.limit || 10, offset: 0 },
      };
      setQuery(newQuery);
      return newQuery;
    });
  };

  return {
    query,
    rentalRecords: (data?.result || []) as RentalRecord[],
    refetchRentalRecords: refetch,
    rentalRecordsIsLoading: isLoading,
    total: data?.offset.totalCount || 0,
    offset: data?.offset.offset || 0,
    limit: data?.offset.limit || 10,
    changeCurrentPage,
    changePageLimit,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    searchQuery,
  };
};
