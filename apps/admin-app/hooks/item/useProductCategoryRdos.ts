import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindProductCategoryRdosAdmQuery, ItemAdmSeekApi, ProductCategoryRdo, QueryResponse} from '@beribturing/api-stub';
import {useState} from 'react';


export const useProductCategoryRdos = ({limit}: { limit?: number }) => {
  //
  const initialQuery: FindProductCategoryRdosAdmQuery = {
    offset: {
      offset: 0,
      limit: limit || 2147483647,
    },
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const {queryKey, queryFn} = ItemAdmSeekApi.query.findProductCategoryRdos({...query});

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ProductCategoryRdo[]>> = useQuery(
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
    key: keyof FindProductCategoryRdosAdmQuery,
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
    key?: keyof FindProductCategoryRdosAdmQuery,
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
    productCategoryRdos: data?.result || [],
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
