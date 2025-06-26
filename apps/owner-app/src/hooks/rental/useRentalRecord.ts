import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindRentalRecordOwnQuery, RentalOwnSeekApi, RentalRecord, QueryResponse} from '@beribturing/api-stub';

const mockRentalRecord: RentalRecord = {
  id: 'mock-rental-1',
  status: 'Active',
  totalPrice: 150.00,
  createdAt: new Date('2024-01-15T10:00:00Z'),
  rentalPeriod: {
    startDate: new Date('2024-01-20T00:00:00Z'),
    endDate: new Date('2024-01-25T00:00:00Z'),
  },
  lendee: {
    name: 'John Doe',
    phoneNumber: '+1234567890',
  },
  product: {
    id: 'mock-product-1',
    title: 'Professional Camera Kit',
    category: {
      id: 'mock-category-1',
      name: 'Photography Equipment',
    },
    productVariant: {
      id: 'mock-variant-1',
      name: 'Standard Kit',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
        },
      ],
      price: {
        currency: {
          amount: 30.00,
          currency: 'USD',
        },
      },
    },
  },
};

export const useRentalRecord = (rentalRecordId: string) => {
  //
  const query: FindRentalRecordOwnQuery = {
    rentalRecordId
  };

  const {queryKey, queryFn} = RentalOwnSeekApi.query.findRentalRecord(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<RentalRecord>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!rentalRecordId,
    }
  );

  return {
    rentalRecord: data?.result || mockRentalRecord,
    refetch,
    isLoading,
  };
};