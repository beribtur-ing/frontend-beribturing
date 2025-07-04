import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindReservationsOwnQuery, QueryResponse, RentalOwnSeekApi, ReservationRdo } from '@beribturing/api-stub';
import { useState } from 'react';

const mockData: ReservationRdo[] = [
  {
    id: '1',
    ownerName: 'John Smith',
    requesterName: 'Alice Johnson',
    period: {
      startDateTime: new Date('2024-02-01T09:00:00Z'),
      endDateTime: new Date('2024-02-03T17:00:00Z'),
    },
    status: 'Pending',
    productId: 'product-001',
    productName: 'Designer Suit',
    variantId: 'variant-001',
    variantBrand: 'Hugo Boss',
    variantModel: 'Classic Fit',
    variantColor: 'Navy Blue',
    variantSize: {
      label: 'M',
      measureUnit: 'metric',
    },
  },
  {
    id: '2',
    ownerName: 'Emily Davis',
    requesterName: 'Michael Brown',
    period: {
      startDateTime: new Date('2024-02-05T08:00:00Z'),
      endDateTime: new Date('2024-02-07T18:00:00Z'),
    },
    status: 'Approved',
    productId: 'product-002',
    productName: 'Professional Camera',
    variantId: 'variant-002',
    variantBrand: 'Canon',
    variantModel: 'EOS R5',
    variantColor: 'Black',
    variantSize: {
      width: 13.8,
      height: 9.8,
      depth: 8.8,
      weight: 0.738,
      measureUnit: 'metric',
    },
  },
  {
    id: '3',
    ownerName: 'David Wilson',
    requesterName: 'Sarah Miller',
    period: {
      startDateTime: new Date('2024-02-10T10:00:00Z'),
      endDateTime: new Date('2024-02-12T16:00:00Z'),
    },
    status: 'Rejected',
    productId: 'product-003',
    productName: 'Evening Dress',
    variantId: 'variant-003',
    variantBrand: 'Versace',
    variantModel: 'Cocktail',
    variantColor: 'Red',
    variantSize: {
      label: 'S',
      measureUnit: 'metric',
    },
  },
  {
    id: '4',
    ownerName: 'Jessica Taylor',
    requesterName: 'Robert Anderson',
    period: {
      startDateTime: new Date('2024-02-15T09:30:00Z'),
      endDateTime: new Date('2024-02-17T15:30:00Z'),
    },
    status: 'Pending',
    productId: 'product-004',
    productName: 'Hiking Boots',
    variantId: 'variant-004',
    variantBrand: 'Salomon',
    variantModel: 'X Ultra 4',
    variantColor: 'Brown',
    variantSize: {
      label: '42',
      measureUnit: 'metric',
    },
  },
  {
    id: '5',
    ownerName: 'Christopher Lee',
    requesterName: 'Amanda White',
    period: {
      startDateTime: new Date('2024-02-20T07:00:00Z'),
      endDateTime: new Date('2024-02-22T19:00:00Z'),
    },
    status: 'Approved',
    productId: 'product-005',
    productName: 'Laptop',
    variantId: 'variant-005',
    variantBrand: 'MacBook',
    variantModel: 'Pro 14"',
    variantColor: 'Space Gray',
    variantSize: {
      width: 31.26,
      height: 2.21,
      depth: 22.12,
      weight: 1.6,
      measureUnit: 'metric',
    },
  },
  {
    id: '6',
    ownerName: 'Lisa Garcia',
    requesterName: 'Kevin Martinez',
    period: {
      startDateTime: new Date('2024-02-25T11:00:00Z'),
      endDateTime: new Date('2024-02-27T14:00:00Z'),
    },
    status: 'Approved',
    productId: 'product-006',
    productName: 'Formal Handbag',
    variantId: 'variant-006',
    variantBrand: 'Chanel',
    variantModel: 'Classic Flap',
    variantColor: 'Black',
    variantSize: {
      width: 25.0,
      height: 15.0,
      depth: 6.5,
      weight: 0.6,
      measureUnit: 'metric',
    },
  },
];

export const useReservationRdosPaginated = () => {
  //
  const initialQuery: FindReservationsOwnQuery = {
    offset: {
      offset: 0,
      limit: 10,
      sortDirection: 'DESCENDING',
    },
  };
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { queryKey, queryFn } = RentalOwnSeekApi.query.findReservationRdos({ ...query });

  const { isLoading, data, refetch }: UseQueryResult<QueryResponse<ReservationRdo[]>> = useQuery({
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

  const changeSearchProperties = (
    key: keyof FindReservationsOwnQuery,
    value: string | number | boolean | undefined,
  ) => {
    //
    setSearchQuery((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const fetchByNewQuery = (key?: keyof FindReservationsOwnQuery, value?: string | number | boolean | undefined) => {
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
    reservationRdos: ((!!data?.result && data.result.length > 0) ? data.result : mockData) as ReservationRdo[],
    refetchReservationRdos: refetch,
    reservationRdosAreLoading: isLoading,
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
