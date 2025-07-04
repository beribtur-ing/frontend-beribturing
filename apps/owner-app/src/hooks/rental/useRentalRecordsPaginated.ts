import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { RentalOwnSeekApi, RentalRecordRdo, QueryResponse, FindRentalRecordsOwnQuery } from '@beribturing/api-stub';
import { useState } from 'react';

const mockData = [
  {
    id: 'uuid-12345',
    lendee: {
      id: 'lendee-12345',
      name: 'John Doe',
      phoneNumber: '+1234567890',
      email: '',
    },
    period: {
      startDateTime: new Date('2023-01-01T10:00:00Z').toISOString(),
      endDateTime: new Date('2023-01-10T10:00:00Z').toISOString(),
    },
    rentedAt: new Date('2023-01-01T10:00:00Z').toISOString(),
    returnedAt: new Date('2023-01-10T10:00:00Z').toISOString(),
    productRentalRecordRdo: {
      amount: 100,
      currency: 'USD',
      productId: 'product-12345',
      title: 'Mountain Bike',
      description: 'A sturdy mountain bike for all terrains.',
      categoryId: 'category-12345',
      name: 'Bikes',
      productVariantId: 'variant-12345',
      model: 'Mountain Bike - Large',
      unit: 'DAILY',
    },
    fee: {
      amount: 10,
      currency: 'USD',
    },
    rentalDeposit: {
      id: 'deposit-12345',
      amount: 50,
      currency: 'USD',
    },
    status: 'ACTIVE',
  },
];

export const useRentalRecordsPaginated = () => {
  //
  const initialQuery: FindRentalRecordsOwnQuery = {
    offset: {
      offset: 0,
      limit: 10,
      sortDirection: 'DESCENDING',
    },
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { queryKey, queryFn } = RentalOwnSeekApi.query.findRentalRecords({ ...query });

  const { isLoading, data, refetch }: UseQueryResult<QueryResponse<RentalRecordRdo[]>> = useQuery({
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
    rentalRecords: ((!!data?.result && data.result.length > 0) ? data.result : mockData) as RentalRecordRdo[],
    refetchRentalRecords: refetch,
    rentalRecordsAreLoading: isLoading,
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
