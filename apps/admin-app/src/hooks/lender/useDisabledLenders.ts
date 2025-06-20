import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindDisabledLendersAdmQuery, LenderAdmSeekApi, Lender, QueryResponse} from '@beribturing/api-stub';
import {useState} from 'react';

export const useDisabledLenders = ({limit}: { limit?: number }) => {
  //
  const initialQuery: FindDisabledLendersAdmQuery = {
    page: 0,
    size: limit || 10,
    sort: 'id'
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const {queryKey, queryFn} = LenderAdmSeekApi.query.findDisabledLenders({...query});

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Lender[]>> = useQuery(
    {
      queryKey,
      queryFn,
    }
  );

  const changeCurrentPage = (page: number) => {
    //
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  const changePageSize = (size: number) => {
    //
    setQuery((prev) => ({
      ...prev,
      page: 0,
      size,
    }));
  };

  const changeSort = (sort: string) => {
    //
    setQuery((prev) => ({
      ...prev,
      sort,
    }));
  };

  const changeSearchProperties = (
    key: keyof FindDisabledLendersAdmQuery,
    value: any,
  ) => {
    //
    setSearchQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchByNewQuery = (
    key?: keyof FindDisabledLendersAdmQuery,
    value?: string | number | boolean | undefined
  ) => {
    setSearchQuery((prev) => {
      let newSearchQuery = {
        ...searchQuery,
        page: 0,
      };
      newSearchQuery = !!key ? {...newSearchQuery, [key]: value} : newSearchQuery;
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
    query: searchQuery,
    lenders: data?.result || [],
    total: data?.offset?.totalCount || 0,
    page: query.page,
    size: query.size,
    changeCurrentPage,
    changePageSize,
    changeSort,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetch,
    isLoading,
  };
};