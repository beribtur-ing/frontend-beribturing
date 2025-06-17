import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindProductRdosAdmQuery, ItemAdmSeekApi, ProductRdo, QueryResponse} from '@beribturing/api-stub';
import {useState} from 'react';


export const useProductRdos = ({limit}: { limit?: number }) => {
  //
  const initialQuery: FindProductRdosAdmQuery = {
    offset: {
      offset: 0,
      limit: limit || 2147483647,
    },
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const {queryKey, queryFn} = ItemAdmSeekApi.query.findProductRdos({...query});

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ProductRdo[]>> = useQuery(
    {
      queryKey,
      queryFn,
    }
  );

  const changeCurrentPage = (offset: number) => {
    //
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: {...prev.offset, offset},
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
          offset: {offset: 0, limit},
        };
      }
      return prev;
    });
  };

  const changeSearchProperties = (
    key: keyof FindProductRdosAdmQuery,
    value: any,
  ) => {
    //
    setSearchQuery((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const fetchByNewQuery = (
    key?: keyof FindProductRdosAdmQuery,
    value?: string | number | boolean | undefined
  ) => {
    setSearchQuery((prev) => {
      let newSearchQuery = {
        ...searchQuery,
        offset: initialQuery.offset,
      };
      newSearchQuery = !!key ? {...newSearchQuery, [key]: value} : newSearchQuery;
      setQuery(newSearchQuery);
      return newSearchQuery;
    });
  };

  const resetQuery = () => {
    //
    setSearchQuery(() => {
      return {
        offset: initialQuery.offset,
      };
    });
    setQuery(() => {
      return {
        offset: initialQuery.offset,
      };
    });
  };

  return {
    query: searchQuery,
    productRdos: data?.result || [],
    total: data?.offset.totalCount || 0,
    offset: data?.offset.offset || 0,
    limit: data?.offset.limit || 10,
    changeCurrentPage,
    changePageLimit,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetch,
    isLoading,
  };
};
